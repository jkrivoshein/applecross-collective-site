import { notFound } from 'next/navigation';
import ArtistClientPage from '@/components/ArtistClientPage';
import { getArtistBySlug } from '@/lib/artist.config';
import { getLinksForArtist } from '@/lib/scraper';

export default async function Page({ params }: { params: { username: string } }) {
  const { username } = params;
  const artist = getArtistBySlug(username);
  if (!artist) return notFound();

  let scrapedLinks: { url: string; label: string }[] = [];

  if (artist.artistUrl) {
    try {
      scrapedLinks = await getLinksForArtist(username, artist.artistUrl);
    } catch (e) {
      console.error('Failed to scrape links:', e);
    }
  }

  return <ArtistClientPage artist={artist} scrapedLinks={scrapedLinks} />;
}
