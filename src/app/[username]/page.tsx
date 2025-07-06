// src/app/[username]/page.tsx
import { notFound } from 'next/navigation';
import { getArtistBySlug } from '@/lib/artist.config';
import ArtistClientPage from '@/components/ArtistClientPage';

export default function Page({ params }: { params: { username: string } }) {
  const { username } = params;

  const artist = getArtistBySlug(username);
  if (!artist) return notFound();

  return <ArtistClientPage artist={artist} slug={username} />;
}
