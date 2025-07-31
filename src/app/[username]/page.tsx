import { getArtistBySlug } from '@/lib/artist.config';
import ArtistClientPage from '@/components/ArtistClientPage';
import { notFound } from 'next/navigation';

export default async function Page(context: { params: { username: string } }) {
  const { params } = await Promise.resolve(context); // ✅ await the context per Next.js 15+ API route rules

  const artist = getArtistBySlug(params.username);

  if (!artist) {
    notFound();
  }

  return <ArtistClientPage artist={artist} />;
}

