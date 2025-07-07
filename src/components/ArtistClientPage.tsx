'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Artist } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { dedupeLinks, filterUnwantedLinks, getPlatformEmoji } from '@/lib/utils';
import EmbeddedPlayer from './EmbeddedPlayer';

type Props = {
  artist: Artist;
  scrapedLinks: { url: string; label: string }[];
};

export default function ArtistClientPage({ artist, scrapedLinks }: Props) {
  const [links, setLinks] = useState<{ url: string; label: string }[]>([]);

  useEffect(() => {
    const filtered = filterUnwantedLinks(scrapedLinks);
    const deduped = dedupeLinks(filtered);
    setLinks(deduped);
  }, [scrapedLinks]);

  return (
    <div className="px-4 md:px-10 py-6 max-w-3xl mx-auto text-white">
      {/* Header */}
      <div className="text-center mb-6">
        {artist.photoUrl && (
          <Image
            src={artist.photoUrl}
            alt={artist.name}
            width={150}
            height={150}
            className="rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h1 className="text-2xl font-bold">{artist.name}</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="flex justify-center mb-4 flex-wrap gap-2">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="shows">Upcoming Shows</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
        </TabsList>

        {/* About Tab */}
        <TabsContent value="about">
          {artist.about && (
            <div className="mb-6 text-center whitespace-pre-wrap">{artist.about}</div>
          )}
          {links.length > 0 && (
            <ul className="space-y-4">
              {links.map(({ url, label }) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 rounded bg-zinc-800 hover:bg-zinc-700 transition text-center"
                  >
                    {getPlatformEmoji(url)} {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        {/* Shows Tab */}
        <TabsContent value="shows">
          {artist.shows?.length ? (
            <ul className="space-y-3 text-center">
              {artist.shows.map((show) => (
                <li key={show.date}>
                  <strong>{show.date}</strong> — {show.location}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-zinc-400">No upcoming shows listed.</p>
          )}
        </TabsContent>

        {/* Music Tab */}
        <TabsContent value="music">
          {artist.music?.length ? (
            <div className="space-y-6">
              {artist.music.map((url) => (
                <EmbeddedPlayer key={url} url={url} />
              ))}
            </div>
          ) : (
            <p className="text-center text-zinc-400">No music links yet.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
