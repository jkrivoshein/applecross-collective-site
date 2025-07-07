import { NextRequest, NextResponse } from 'next/server';
import { getArtistBySlug } from '@/lib/artist.config';
import { scrapeLinktreeLinks } from '@/lib/scraper';
import { filterUnwantedLinks } from '@/lib/filterUnwantedLinks';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;
  const artist = getArtistBySlug(username);

  if (!artist?.artistUrl) {
    return NextResponse.json({ links: [] });
  }

  const shouldRefresh = request.nextUrl.searchParams.get('refresh') === '1';
  let links = await scrapeLinktreeLinks(artist.artistUrl, { refresh: shouldRefresh });

  links = filterUnwantedLinks(links);

  return NextResponse.json({ links });
}
