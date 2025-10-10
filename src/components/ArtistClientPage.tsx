'use client';

import React from 'react';
import Image from 'next/image';
import Shows from './Shows';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import EmbeddedPlayer from './EmbeddedPlayer';
import type { Artist, Show } from '@/lib/types';

type Track = { title?: string; url: string };

export default function ArtistClientPage({ artist }: { artist: Artist }) {
  const shows: Show[] = Array.isArray(artist.shows) ? artist.shows : [];

  const music: Track[] = Array.isArray(artist.music)
    ? (artist.music as unknown[]).map((m) =>
        typeof m === 'string' ? { url: m } : (m as Track)
      )
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4">
        {artist.photoUrl ? (
          <Image
            src={artist.photoUrl}
            alt={artist.name ?? artist.slug}
            width={1200}
            height={800}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="rounded-lg"
            priority
          />
        ) : null}
        <h1 className="text-2xl font-semibold">{artist.name ?? artist.slug}</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about" className="mt-6">
        <TabsList className="w-full flex justify-center gap-2">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="shows">Shows</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          <div className="mx-auto max-w-prose text-center">
            {artist.about ? (
              <p className="text-sm leading-6 text-neutral-300">{artist.about}</p>
            ) : (
              <p className="text-sm text-neutral-400">No bio yet.</p>
            )}
          </div>

          {artist.artistUrl ? (
            <div className="mt-6 text-center">
              <a
                href={artist.artistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
              >
                Visit Artist Site
              </a>
            </div>
          ) : null}

          {artist.slug === 'applecross-collective' && (
            <div className="mt-4 text-center">
              <a
                href="https://www.brownpapertickets.com/event/6711276"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-indigo-700 px-4 py-2 text-white hover:bg-indigo-600"
              >
                Applecross Summit PNW Tickets
              </a>
            </div>
          )}
        </TabsContent>

        <TabsContent value="shows" className="mt-6">
          <div className="mx-auto max-w-xl">
            <Shows shows={shows} />
          </div>
        </TabsContent>

        <TabsContent value="music" className="mt-6">
          {music.length > 0 ? (
            <ul className="mx-auto max-w-2xl space-y-5">
              {music.map((m) => (
                <li key={m.url} className="rounded-xl border border-neutral-800 p-3">
                  <EmbeddedPlayer url={m.url} />
                  {m.title ? (
                    <div className="mt-2 text-center text-sm text-neutral-300">{m.title}</div>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm text-neutral-400">No music added.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
