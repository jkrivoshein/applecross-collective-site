import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { getArtistBySlug } from '@/lib/artist.config';
import ArtistClientPage from '@/components/ArtistClientPage';
import { scrapeLinktreeLinks } from '@/lib/scraper';
import type { ScrapedLink } from '@/lib/types';

type Props = {
  params: { username: string };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: params.username,
  };
}

export default async function Page({ params }: Props) {
  const username = params.username;

  const artist = getArtistBySlug(username);
  if (!artist) return notFound();

  let scrapedLinks: ScrapedLink[] = [];

  try {
    if (artist.artistUrl) {
      const result = await scrapeLinktreeLinks(artist.artistUrl, { refresh: false });
      if (Array.isArray(result)) {
        scrapedLinks = result;
      }
    }
  } catch (e) {
    console.error('Failed to scrape links:', e);
  }

  return <ArtistClientPage artist={artist} scrapedLinks={scrapedLinks} />;
}
