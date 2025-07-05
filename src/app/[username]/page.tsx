import { getArtistBySlug } from '@/lib/artist.config';
import { getLinksForArtist } from '@/lib/scraper';
import ArtistClientPage from '@/components/ArtistClientPage';

export default async function Page({ params }: { params: { username: string } }) {
  const username = params.username;
  const artist = getArtistBySlug(username);

  if (!artist) {
    return <div>Artist not found</div>;
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
