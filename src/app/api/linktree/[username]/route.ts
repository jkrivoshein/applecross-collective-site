// src/app/api/linktree/[username]/route.ts

import { getLinksForArtist } from '@/lib/scraper';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const { searchParams } = new URL(request.url);
  const refresh = searchParams.get('refresh') === '1';

  try {
    const data = await getLinksForArtist(params.username, { refresh });
    return Response.json({ links: data });
  } catch (e) {
    console.error(e);
    return new Response('Failed to fetch links', { status: 500 });
  }
}
