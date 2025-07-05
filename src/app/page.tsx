import { redirect } from 'next/navigation';
import { defaultArtistSlug } from '@/lib/getArtistBySlug'; // ✅ FIXED export

export default function HomePage() {
  redirect(`/${defaultArtistSlug}`);
}
