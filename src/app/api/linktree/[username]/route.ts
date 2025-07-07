import { NextRequest } from 'next/server';
import { getLinksForArtist } from '@/lib/scraper';
import { getArtistBySlug } from '@/lib/artist.config';

export async function GET(
  req: NextRequest,
  context: { params: { username: string } }
) {
  const { username } = context.params;
  const refresh = req.nextUrl.searchParams.get('refresh') === '1';

  const artist = getArtistBySlug(username);
  if (!artist) {
    return new Response(JSON.stringify({ error: 'Artist not found' }), {
      status: 404,
    });
  }

  try {
    const links = await getLinksForArtist(username, refresh);
    return Response.json({ links });
  } catch (e) {
    console.error(`API error for ${username}:`, e);
    return new Response(JSON.stringify({ error: 'Failed to fetch links' }), {
      status: 500,
    });
  }
}
