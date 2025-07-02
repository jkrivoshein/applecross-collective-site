"use client";

import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { artists as td } from "@/lib/artist.config";
import type { Artist } from "@/lib/types";
import { LinktreeList, LinktreeData } from "./LinktreeList";

export default function ArtistClientPage({
  defaultArtistSlug,
}: {
  defaultArtistSlug: string;
}) {
  type Tab = "about" | "shows" | "music";

  const [selected, setSelected] = useState(defaultArtistSlug);
  const artist: Artist = td[selected as keyof typeof td];
  const artistSlugs = Object.keys(td);
  const [tab, setTab] = useState<Tab>("about");

  // derive the Linktree username (if any)
  const username = artist.linktreeUrl
    ? new URL(artist.linktreeUrl).pathname.slice(1)
    : null;

  // fetch both the links and the profileImage
  const { data: lt } = useSWR<LinktreeData>(
    username ? `/api/linktree/${username}` : null,
    (url) => fetch(url).then((r) => r.json())
  );

  // choose heroImage: Linktree’s header image → configured photoUrl → fallback
  const heroImage =
    lt?.profileImage ?? artist.photoUrl ?? "/images/other-dj.jpg";

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* artist selector */}
      <div className="mb-6">
        <label htmlFor="artist" className="text-sm font-semibold">
          Select Artist
        </label>
        <select
          id="artist"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-xl py-2 px-3 focus:outline-none focus:ring focus:ring-zinc-500"
        >
          {artistSlugs.map((slug) => (
            <option key={slug} value={slug}>
              {td[slug].name}
            </option>
          ))}
        </select>
      </div>

      {/* tabs */}
      <Tabs
        value={tab}
        onValueChange={(v: string) => setTab(v as Tab)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="shows">Upcoming Shows</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
        </TabsList>

        {/* ABOUT */}
        <TabsContent value="about">
          <div className="flex flex-col items-center space-y-6">
            {heroImage && (
              <Image
                src={heroImage}
                alt={`${artist.name} profile`}
                width={400}
                height={400}
                className="rounded-full shadow-lg object-cover"
              />
            )}
            <p className="max-w-2xl text-center text-white text-base leading-relaxed whitespace-pre-line">
              {artist.about}
            </p>
            {artist.linktreeUrl && username && (
              <div className="mt-6 w-full max-w-2xl">
                <h2 className="text-xl font-semibold">Featured Links</h2>
                <LinktreeList username={username} />
              </div>
            )}
          </div>
        </TabsContent>

        {/* SHOWS */}
        <TabsContent value="shows">
          <div className="space-y-4">
            {Array.isArray(artist.shows) && artist.shows.length > 0 ? (
              artist.shows.map((show, idx) => (
                <Card key={idx} className="bg-zinc-900 text-white">
                  <CardContent className="py-4 px-6">
                    <p className="text-lg font-semibold">{show.date}</p>
                    <p className="text-sm text-zinc-400">{show.location}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-white text-sm">No upcoming shows.</p>
            )}
          </div>
        </TabsContent>

        {/* MUSIC */}
        <TabsContent value="music">
          <div className="space-y-6">
            {artist.music?.map((link, idx) => {
              try {
                if (link.includes("spotify.com")) {
                  const path = new URL(link).pathname;
                  return (
                    <iframe
                      key={idx}
                      className="w-full h-20"
                      src={`https://open.spotify.com/embed${path}`}
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  );
                }
                if (link.includes("soundcloud.com")) {
                  return (
                    <iframe
                      key={idx}
                      className="w-full h-[166px]"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                        link
                      )}`}
                    />
                  );
                }
                if (link.includes("bandcamp.com")) {
                  return (
                    <iframe
                      key={idx}
                      style={{ border: 0, width: "100%", height: "120px" }}
                      src={link}
                      seamless
                    />
                  );
                }
                if (
                  link.includes("youtube.com") ||
                  link.includes("youtu.be")
                ) {
                  const url = new URL(link);
                  const vid =
                    url.hostname === "youtu.be"
                      ? url.pathname.slice(1)
                      : url.searchParams.get("v");
                  if (!vid) return <p key={idx}>Invalid YouTube URL</p>;
                  return (
                    <iframe
                      key={idx}
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${vid}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                }
                return (
                  <p key={idx} className="text-sm text-zinc-400">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {link}
                    </a>
                  </p>
                );
              } catch {
                return (
                  <p key={idx} className="text-sm text-red-400">
                    Malformed URL: {link}
                  </p>
                );
              }
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
