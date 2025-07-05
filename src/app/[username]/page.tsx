// src/app/[username]/page.tsx

import { getArtistBySlug } from '@/lib/artist.config';
import { getLinksForArtist } from '@/lib/scraper';
import { notFound } from 'next/navigation';
import ArtistClientPage from '@/components/ArtistClientPage';

interface Props {
  params: {
    username: string;
  };
}

export default async function Page({ params }: Props) {
  const artist = getArtistBySlug(params.username);
  if (!artist) return notFound();

  const links = await getLinksForArtist(params.username);

  return (
    <ArtistClientPage
      artist={artist}
      featuredLinks={links}
      socialLinks={links}
    />
  );
}
