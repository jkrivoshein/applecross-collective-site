'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { getAllArtists } from '@/lib/artist.config';

type Props = {
  artists: ReturnType<typeof getAllArtists>;
};

export default function ArtistSelector({ artists }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname?.split('/')[1];
  const [selected, setSelected] = useState(currentSlug || '');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    setSelected(slug);
    router.push(`/${slug}`);
  };

  return (
    <div className="w-full sm:w-auto px-4 py-3 bg-zinc-900">
      <label htmlFor="artist-select" className="sr-only">
        Select Artist
      </label>
      <select
        id="artist-select"
        className="w-full rounded-md px-3 py-2 text-sm bg-zinc-800 text-white"
        value={selected}
        onChange={handleChange}
      >
        {artists.map((a) => (
          <option key={a.slug} value={a.slug}>
            {a.name}
          </option>
        ))}
      </select>
    </div>
  );
}
