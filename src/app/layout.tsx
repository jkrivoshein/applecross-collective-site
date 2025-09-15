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
    <html lang="en" className="text-white">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 bg-black border-b border-zinc-800">
          <ArtistSelector artists={artists} />
        </header>

        {/* Full-viewport tiled background */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0
                     bg-[url('/images/logo-tile.svg')] bg-repeat bg-center sm:bg-left-top
                     bg-[length:160px_160px] opacity-10 invert"
        />

        <main className="relative z-10 max-w-4xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
