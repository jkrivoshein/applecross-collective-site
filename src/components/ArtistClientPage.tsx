'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Artist, ScrapedLink } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import LinktreeList from './LinktreeList';
import UpcomingShows from './UpcomingShows';
import EmbeddedPlayer from './EmbeddedPlayer';

type Props = {
  artist: Artist;
  featuredLinks: ScrapedLink[];
  socialLinks: ScrapedLink[];
};

export default function ArtistClientPage({ artist, featuredLinks, socialLinks }: Props) {
  const [tab, setTab] = useState<'about' | 'shows' | 'music'>('about');

  return (
    <div className="max-w-2xl mx-auto p-4 text-white">
      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="w-full">
        <TabsList className="flex space-x-2 border-b border-zinc-800 mb-4">
          <TabsTrigger value="about" className={tab === 'about' ? 'border-b-2 border-white' : ''}>
            About
          </TabsTrigger>
          <TabsTrigger value="shows" className={tab === 'shows' ? 'border-b-2 border-white' : ''}>
            Upcoming Shows
          </TabsTrigger>
          <TabsTrigger value="music" className={tab === 'music' ? 'border-b-2 border-white' : ''}>
            Music
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          {artist.photoUrl && (
            <Image
              src={artist.photoUrl}
              alt={`${artist.name} photo`}
              width={600}
              height={600}
              className="rounded-md mb-4"
            />
          )}

          {artist.about && <p className="mb-4 text-sm text-zinc-300">{artist.about}</p>}

          {featuredLinks.length === 0 && socialLinks.length === 0 ? (
            <p className="text-sm text-zinc-400">No links available.</p>
          ) : (
            <LinktreeList featuredLinks={featuredLinks} socialLinks={socialLinks} />
          )}
        </TabsContent>

        <TabsContent value="shows">
          <UpcomingShows shows={artist.shows || []} />
        </TabsContent>

        <TabsContent value="music">
          {Array.isArray(artist.music) && artist.music.length > 0 ? (
            artist.music.map((url) => (
              <EmbeddedPlayer key={url} url={url} className="mb-4" />
            ))
          ) : (
            <p className="text-sm text-zinc-400">No music links yet.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
