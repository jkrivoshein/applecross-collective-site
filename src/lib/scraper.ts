import fs from 'fs/promises';
import path from 'path';
import { load } from 'cheerio';
import { Artist, ScrapedLink } from './types';

const CACHE_PATH = path.resolve('.cache/linktree.json');

type CacheData = Record<
  string,
  { featuredLinks: ScrapedLink[]; socialLinks: ScrapedLink[]; timestamp: number }
>;

async function loadCache(): Promise<CacheData> {
  try {
    const data = await fs.readFile(CACHE_PATH, 'utf8');
    return JSON.parse(data) as CacheData;
  } catch {
    return {};
  }
}

async function saveCache(cache: CacheData): Promise<void> {
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2));
}

export async function scrapeArtistLinks(url: string): Promise<ScrapedLink[]> {
  const res = await fetch(url);
  const html = await res.text();
  const $ = load(html);
  const links: ScrapedLink[] = [];

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    const label = new URL(href || '').hostname;
    if (href && label) {
      links.push({ url: href, label });
    }
  });

  return links;
}

function groupLinks(links: ScrapedLink[]): {
  featuredLinks: ScrapedLink[];
  socialLinks: ScrapedLink[];
} {
  const featuredLinks: ScrapedLink[] = [];
  const socialLinks: ScrapedLink[] = [];

  for (const link of links) {
    const url = link.url.toLowerCase();
    if (
      url.includes('spotify') ||
      url.includes('bandcamp') ||
      url.includes('soundcloud.com') ||
      url.includes('youtube') ||
      url.includes('hypeddit.com')
    ) {
      featuredLinks.push({ ...link, featured: true });
    } else {
      socialLinks.push(link);
    }
  }

  return { featuredLinks, socialLinks };
}

export async function getLinksForArtist(
  artist: Artist,
  refresh = false
): Promise<{ featuredLinks: ScrapedLink[]; socialLinks: ScrapedLink[] }> {
  const slug = artist.slug;
  const url = artist.artistUrl;

  if (!slug || !url) {
    console.warn(`⚠️ Missing slug or artistUrl for artist: ${artist.name}`);
    return { featuredLinks: [], socialLinks: [] };
  }

  const cache = await loadCache();
  const cached = cache[slug];
  const fresh = Date.now() - (cached?.timestamp || 0) < 1000 * 60 * 60 * 24;

  if (cached && !refresh && fresh) {
    console.log(`🧠 Using cached links for ${slug}`);
    return {
      featuredLinks: cached.featuredLinks,
      socialLinks: cached.socialLinks,
    };
  }

  console.log(`🔄 Forcing refresh for ${slug}`);
  const rawLinks = await scrapeArtistLinks(url);
  const { featuredLinks, socialLinks } = groupLinks(rawLinks);
  console.log(`✅ Scraped links for ${slug} :`, [...featuredLinks, ...socialLinks]);

  cache[slug] = { featuredLinks, socialLinks, timestamp: Date.now() };
  await saveCache(cache);
  return { featuredLinks, socialLinks };
}
