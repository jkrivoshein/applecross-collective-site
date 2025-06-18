"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Artist } from "@/lib/types";

export default function ArtistClientPage({ artist }: { artist: Artist }) {
  const [tab, setTab] = useState("about");

  return (
    <div className="w-full">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="shows">Upcoming Shows</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <div className="flex flex-col items-center space-y-6">
            {artist.artwork && (
              <Image
                src={artist.artwork}
                alt={`${artist.name} artwork`}
                width={800}
                height={800}
                className="rounded-2xl shadow-xl object-cover"
              />
            )}
            <p className="max-w-2xl text-center text-white text-base leading-relaxed whitespace-pre-line">
              {artist.about}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="shows">
          <div className="space-y-4">
            {Array.isArray(artist.shows) && artist.shows.length > 0 ? (
              artist.shows.map((show, index) => (
                <Card key={index} className="bg-zinc-900 text-white">
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

        <TabsContent value="music">
          <div className="space-y-6">
            {artist.music?.map((url, index) => {
              try {
                if (url.includes("spotify")) {
                  return (
                    <iframe
                      key={index}
                      className="w-full h-20"
                      src={`https://open.spotify.com/embed${new URL(url).pathname}`}
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  );
                }
                if (url.includes("soundcloud")) {
                  return (
                    <iframe
                      key={index}
                      className="w-full h-[166px]"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`}
                    />
                  );
                }
                if (url.includes("bandcamp")) {
                  const albumMatch = url.match(/album=(\d+)/);
                  if (albumMatch) {
                    const albumId = albumMatch[1];
                    return (
                      <iframe
                        key={index}
                        style={{ border: 0, width: "100%", height: "120px" }}
                        src={`https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/`}
                        seamless
                      />
                    );
                  }
                  return (
                    <iframe
                      key={index}
                      style={{ border: 0, width: "100%", height: "120px" }}
                      src={`${url}?embed=true`}
                      seamless
                    />
                  );
                }
                if (url.includes("youtube.com") || url.includes("youtu.be")) {
                  let youtubeId = "";
                  const parsed = new URL(url);
                  if (parsed.hostname === "youtu.be") {
                    youtubeId = parsed.pathname.slice(1);
                  } else {
                    youtubeId = parsed.searchParams.get("v") || "";
                  }
                  if (!youtubeId) return <p key={index}>Invalid YouTube URL</p>;
                  return (
                    <iframe
                      key={index}
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                }
                return (
                  <p key={index} className="text-sm text-zinc-400">
                    Unknown or unsupported media link: {url}
                  </p>
                );
              } catch {
                return (
                  <p key={index} className="text-sm text-red-400">
                    Malformed music URL: {url}
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
