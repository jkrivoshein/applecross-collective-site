import { getArtistBySlug } from '@/lib/artist.config';
import { getLinksForArtist } from '@/lib/scraper';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
): Promise<NextResponse> {
  const username = params.username;
  const url = new URL(request.url);
  const refresh = url.searchParams.get('refresh') === '1';

  const artist = getArtistBySlug(username);
  if (!artist) {
    return new NextResponse('Artist not found', { status: 404 });
  }

  const data = await getLinksForArtist(artist, refresh);
  return NextResponse.json(data);
}
