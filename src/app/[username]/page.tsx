import { getArtistBySlug } from '@/lib/artist.config';
import ArtistClientPage from '@/components/ArtistClientPage';
import { notFound } from 'next/navigation';

export default async function Page(context: {
  params: { username: string };
}) {
  const username = (await Promise.resolve(context)).params.username; // ✅ single expression, no destructuring

  const artist = getArtistBySlug(username);
  if (!artist) {
    notFound();
  }

  return <ArtistClientPage artist={artist} />;
}
