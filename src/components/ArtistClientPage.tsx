'use client';

import React from 'react';
import Image from 'next/image';
import Shows from './Shows';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import type { Artist } from '@/lib/types';

type Track = { title?: string; url: string };

export default function ArtistClientPage({ artist }: { artist: Artist }) {
  const shows = Array.isArray(artist.shows) ? artist.shows : [];

  const music: Track[] = Array.isArray(artist.music)
    ? (artist.music as unknown[]).map((m) =>
        typeof m === 'string' ? { url: m } : (m as Track)
      )
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="flex flex-col items-center text-center gap-4">
        {artist.photoUrl ? (
          <Image
            src={artist.photoUrl}
            alt={artist.name ?? artist.slug}
            width={160}
            height={160}
            className="rounded-2xl object-cover"
            priority
          />
        ) : null}
        <h1 className="text-2xl font-semibold">{artist.name ?? artist.slug}</h1>
      </div>

      <Tabs defaultValue="about" className="mt-6">
        <TabsList className="flex justify-center gap-2">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="shows">Shows</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          {artist.about ? (
            <p className="text-sm leading-6 text-neutral-300">{artist.about}</p>
          ) : (
            <p className="text-sm text-neutral-400">No bio yet.</p>
          )}
        </TabsContent>

        <TabsContent value="shows" className="mt-6">
          <Shows shows={shows} />
        </TabsContent>

        <TabsContent value="music" className="mt-6">
          {music.length > 0 ? (
            <ul className="space-y-3">
              {music.map((m) => (
                <li key={m.url} className="rounded-xl border border-neutral-800 p-3">
                  <a href={m.url} target="_blank" rel="noreferrer" className="underline">
                    {m.title ?? m.url}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-400">No music added.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
