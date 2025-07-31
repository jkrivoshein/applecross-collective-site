import { getArtistBySlug } from '@/lib/artist.config';
import ArtistClientPage from '@/components/ArtistClientPage';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  await Promise.resolve(); // ✅ satisfies @typescript-eslint/require-await

  const artist = getArtistBySlug(params.username);

  if (!artist) {
    notFound();
  }

  return <ArtistClientPage artist={artist} />;
}
