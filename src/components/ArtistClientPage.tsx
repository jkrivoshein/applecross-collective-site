'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { dedupeLinks, getPlatformEmoji, groupLinksByPlatform, cleanLabel } from '@/lib/utils';
import type { Artist, ScrapedLink } from '@/lib/types';
import EmbeddedPlayer from './EmbeddedPlayer';
import UpcomingShows from './UpcomingShows';

type Props = {
  artist: Artist;
  slug: string;
};

export default function ArtistClientPage({ artist, slug }: Props) {
  const [tab, setTab] = useState('about');
  const [featuredLinks, setFeaturedLinks] = useState<ScrapedLink[]>([]);
  const [socialLinks, setSocialLinks] = useState<ScrapedLink[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(`/api/linktree/${slug}`);
        const json: unknown = await res.json();

        if (
          typeof json === 'object' &&
          json !== null &&
          'links' in json &&
          Array.isArray((json as Record<string, unknown>).links)
        ) {
          const links = (json as { links: ScrapedLink[] }).links;
          const featured: ScrapedLink[] = [];
          const social: ScrapedLink[] = [];

          for (const link of links) {
            const lower = link.url.toLowerCase();
            if (
              lower.includes('spotify') ||
              lower.includes('bandcamp') ||
              lower.includes('youtube') ||
              lower.includes('soundcloud')
            ) {
              featured.push(link);
            } else {
              social.push(link);
            }
          }

          setFeaturedLinks(featured);
          setSocialLinks(social);
        }
      } catch (e) {
        console.error('Failed to load links:', e);
      }
    };

    void fetchLinks();
  }, [slug]);

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
            <li key={platform} className="space-y-2">
              {links.map((link) => (
                <div
                  key={link.url}
                  className="bg-gray-800 rounded-lg px-4 py-2 transition hover:bg-gray-700"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white"
                  >
                    {getPlatformEmoji(link.url)} {cleanLabel(link.label)}
                  </a>
                </div>
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
