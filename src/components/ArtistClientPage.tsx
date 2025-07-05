'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { dedupeLinks, getPlatformEmoji, groupLinksByPlatform, cleanLabel } from '@/lib/utils';
import type { Artist, ScrapedLink } from '@/lib/types';
import EmbeddedPlayer from './EmbeddedPlayer';
import UpcomingShows from './UpcomingShows';

type Props = {
  artist: Artist;
  featuredLinks?: ScrapedLink[];
  socialLinks?: ScrapedLink[];
};

export default function ArtistClientPage({ artist, featuredLinks = [], socialLinks = [] }: Props) {
  const [tab, setTab] = useState('about');
  const dedupedFeatured = dedupeLinks(featuredLinks, socialLinks);
  const dedupedSocial = dedupeLinks(socialLinks, featuredLinks);

  const renderLinkListGrouped = (links: ScrapedLink[], sectionTitle: string) => {
    const groups = groupLinksByPlatform(links);
    if (Object.keys(groups).length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-bold">{sectionTitle}</h3>
        <ul className="space-y-2">
          {Object.entries(groups).map(([platform, links]) => (
            <li key={platform}>
              {links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm hover:underline"
                >
                  {getPlatformEmoji(link.url)} {cleanLabel(link.label)}
                </a>
              ))}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Tabs>
        <TabsList>
          <TabsTrigger value="about" onClick={() => setTab('about')}>
            About
          </TabsTrigger>
          <TabsTrigger value="shows" onClick={() => setTab('shows')}>
            Upcoming Shows
          </TabsTrigger>
          <TabsTrigger value="music" onClick={() => setTab('music')}>
            Music
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          {tab === 'about' && (
            <div className="mt-4 space-y-4">
              {artist.photoUrl && (
                <Image
                  src={artist.photoUrl}
                  alt={artist.name}
                  width={600}
                  height={600}
                  className="rounded-lg w-full"
                />
              )}
              <p className="text-sm">{artist.about}</p>

              {dedupedFeatured.length > 0 && renderLinkListGrouped(dedupedFeatured, 'Featured Links')}
              {dedupedSocial.length > 0 && renderLinkListGrouped(dedupedSocial, 'Social Links')}
            </div>
          )}
        </TabsContent>

        <TabsContent value="shows">
          {tab === 'shows' && <UpcomingShows artist={artist} />}
        </TabsContent>

        <TabsContent value="music">
          {tab === 'music' && (
            <div className="mt-4 space-y-4">
              {(artist.music ?? []).map((url) => (
                <EmbeddedPlayer key={url} url={url} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
