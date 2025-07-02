// src/app/api/linktree/[username]/route.ts

import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const revalidate = 3600; // cache for 1h

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  try {
    const html = await fetch(`https://linktr.ee/${username}`).then((r) =>
      r.text()
    );
    const $ = cheerio.load(html);

    // 1) scrape all your external links exactly as before
    const allLinks = $("a[href]")
      .map((_, el) => {
        const href = $(el).attr("href")!.trim();
        const text = $(el).text().trim();
        return { label: text, url: href };
      })
      .get()
      .filter((l) => {
        if (!l.url || l.url.startsWith("#") || l.url.startsWith("/")) return false;
        if (l.url.includes("linktr.ee")) return false;
        return true;
      })
      .map((l) => ({
        label: l.label,
        url: /^https?:\/\//.test(l.url) ? l.url : `https://${l.url}`,
      }));

    // 2) pull the og:image meta (this is the profile pic)
    const profileImage =
      $('meta[property="og:image"]').attr("content")?.trim() || null;

    return NextResponse.json(
      {
        links: allLinks,
        profileImage,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { links: [], profileImage: null, error: "Failed to fetch Linktree" },
      { status: 500 }
    );
  }
}
