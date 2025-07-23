import { getArtistBySlug } from '@/lib/artist.config';
import ArtistClientPage from '@/components/ArtistClientPage';

export default async function Page(context: { params: { username: string } }) {
  const { params } = await Promise.resolve(context); // ✅ satisfies Next.js param requirement

  const artist = getArtistBySlug(params.username);

  if (!artist) {
    return <div className="text-center py-10">Artist not found.</div>;
  }

  return <ArtistClientPage artist={artist} />;
}
