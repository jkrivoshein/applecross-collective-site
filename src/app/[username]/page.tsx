import { getArtistBySlug } from '@/lib/artist.config';
import ArtistClientPage from '@/components/ArtistClientPage';
import { notFound } from 'next/navigation';

export default async function Page(context: {
  params: { username: string };
}) {
  const { params } = await Promise.resolve(context); // ✅ satisfy Next.js API rules
  const { username } = params;

  const artist = getArtistBySlug(username);
  if (!artist) {
    notFound();
  }

  return <ArtistClientPage artist={artist} />;
}
