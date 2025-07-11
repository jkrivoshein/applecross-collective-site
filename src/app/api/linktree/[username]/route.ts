import { scrapeLinktreeLinks } from '@/lib/scraper';
import { getArtistBySlug } from '@/lib/artist.config';
import { NextResponse } from 'next/server';
import { filterUnwantedLinks } from '@/lib/utils';

export async function GET(
  _req: Request,
  context: { params: { username: string } }
) {
  // ✅ Fully await context.params as required in Next.js 15
  const { params } = await Promise.resolve(context);
  const username = params.username;

  const artist = getArtistBySlug(username);
  if (!artist || !artist.artistUrl) {
    return NextResponse.json({ error: 'Artist not found or missing artistUrl' }, { status: 404 });
  }

  const url = new URL(_req.url);
  const shouldRefresh = url.searchParams.get('refresh') === '1';

  try {
    const links = await scrapeLinktreeLinks(artist.artistUrl, { refresh: shouldRefresh });
    const filtered = filterUnwantedLinks(links ?? []);
    return NextResponse.json(filtered);
  } catch (error) {
    console.error('[API ERROR]', error);
    return NextResponse.json({ error: 'Failed to scrape linktree links' }, { status: 500 });
  }
}
