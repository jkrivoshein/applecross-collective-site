import { headers } from 'next/headers';
import ArtistClientPage from '@/components/ArtistClientPage';
import { artists } from '@/lib/artist.config';

const domainDefaults: Record<string, string> = {
  'djlodestone.com': 'lodestone',
  'www.djlodestone.com': 'lodestone',
  'applecross-collective-site.vercel.app': 'applecross-collective',
  'www.applecross-collective-site.vercel.app': 'applecross-collective',
};

export default async function Page() {
  const headersList = await headers(); // ✅ now legal
  const host = headersList.get('host')?.toLowerCase() || '';

  const fallbackSlug = 'applecross-collective';
  const defaultSlug = domainDefaults[host] || fallbackSlug;

  const validSlugs = Object.keys(artists);
  const safeSlug = validSlugs.includes(defaultSlug) ? defaultSlug : fallbackSlug;

  return <ArtistClientPage defaultArtistSlug={safeSlug} />;
}
