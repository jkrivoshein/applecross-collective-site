import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ArtistSelector from '@/components/ArtistSelector';
import { getAllArtists } from '@/lib/artist.config';
import type { Artist } from '@/lib/types';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Applecross Collective',
  description: 'Artist profiles and mixes',
};

const artistRecord = getAllArtists();
const artists: Artist[] = Object.values(artistRecord);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 bg-black border-b border-zinc-800">
          <ArtistSelector artists={artists} />
        </header>
        <main className="max-w-4xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
