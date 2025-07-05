import { getArtistBySlug } from '@/lib/artist.config';
import { getLinksForArtist } from '@/lib/scraper';
import ArtistClientPage from '@/components/ArtistClientPage';
import { Artist } from '@/lib/types';

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;
  console.log('[Server] Loading profile for:', username);

  const artist: Artist | undefined = getArtistBySlug(username);

  if (!artist || !artist.slug || !artist.artistUrl) {
    console.warn('[Server] Invalid artist config:', artist);
    return <div>Artist not found or missing required fields.</div>;
  }

  const { featuredLinks, socialLinks } = await getLinksForArtist(artist);

  return (
    <ArtistClientPage
      artist={artist}
      featuredLinks={featuredLinks}
      socialLinks={socialLinks}
    />
  );
}
