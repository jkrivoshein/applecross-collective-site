'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Artist } from '@/lib/types';
import UpcomingShows from './UpcomingShows';
import EmbeddedPlayer from './EmbeddedPlayer';

type Props = {
  artist: Artist;
};

export default function ArtistClientPage({ artist }: Props) {
  const [tab, setTab] = useState('about');

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-10">
      <Tabs value={tab} onValueChange={(val: string) => setTab(val)} className="w-full">
        <TabsList className="flex justify-center gap-2 border-b border-gray-700 pb-2 relative">
          <TabsTrigger
            value="about"
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              tab === 'about' ? 'underline underline-offset-4' : ''
            }`}
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="shows"
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              tab === 'shows' ? 'underline underline-offset-4' : ''
            }`}
          >
            Upcoming Shows
          </TabsTrigger>
          <TabsTrigger
            value="music"
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              tab === 'music' ? 'underline underline-offset-4' : ''
            }`}
          >
            Music
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          {artist.photoUrl && (
            <div className="mb-4 text-center">
              <Image
                src={artist.photoUrl}
                alt={artist.name}
                width={160}
                height={160}
                className="rounded-full mx-auto shadow-md"
              />
            </div>
          )}
          {artist.artwork && (
            <div className="mb-4 text-center">
              <Image
                src={artist.artwork}
                alt={`${artist.name} Artwork`}
                width={300}
                height={300}
                className="mx-auto rounded-xl shadow-md"
              />
            </div>
          )}
          {artist.about && (
            <p className="text-center text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
              {artist.about}
            </p>
          )}
          {artist.artistUrl && (
            <div className="mt-6 text-center">
              <a
                href={artist.artistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl bg-black px-5 py-3 text-white font-semibold shadow-md hover:bg-gray-800 transition"
              >
                Visit Artist Site
              </a>
            </div>
          )}
        </TabsContent>

        <TabsContent value="shows" className="mt-6">
          <UpcomingShows shows={artist.shows} />
        </TabsContent>

        <TabsContent value="music" className="mt-6 space-y-4">
          {artist.music?.map((url, i) => (
            <EmbeddedPlayer key={i} url={url} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
