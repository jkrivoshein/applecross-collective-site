'use client';

import { useState } from 'react';
import type { Artist } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UpcomingShows from './UpcomingShows';
import EmbeddedPlayer from './EmbeddedPlayer';
import Image from 'next/image';

interface Props {
  artist: Artist;
}

export default function ArtistClientPage({ artist }: Props) {
  const [tab, setTab] = useState('about');

  return (
    <div className="px-4 py-6">
      <Tabs value={tab} onValueChange={(val) => setTab(val)} className="w-full">
        <TabsList className="flex justify-center space-x-2 mb-6">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="shows">Upcoming Shows</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <div className="max-w-2xl mx-auto text-center text-gray-300 space-y-6">
            {artist.photoUrl && (
              <div className="flex justify-center">
                <Image
                  src={artist.photoUrl}
                  alt={`${artist.name} photo`}
                  width={300}
                  height={300}
                  className="rounded-xl object-cover"
                />
              </div>
            )}

            {artist.about && <p className="text-base">{artist.about}</p>}

            {artist.artistUrl && (
              <div className="pt-4">
                <a
                  href={artist.artistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
                >
                  Visit Artist Site
                </a>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="shows">
          <UpcomingShows artist={artist} />
        </TabsContent>

        <TabsContent value="music">
          <div className="max-w-2xl mx-auto text-center text-gray-300">
            {artist.music?.length ? (
              <div className="space-y-6">
                {artist.music.map((url, idx) => (
                  <EmbeddedPlayer key={idx} url={url} />
                ))}
              </div>
            ) : (
              <p>No music links available.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
