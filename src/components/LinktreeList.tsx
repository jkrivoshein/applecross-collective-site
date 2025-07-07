'use client';

import { useEffect, useState } from 'react';
import { dedupeLinks, groupLinksByPlatform, getPlatformEmoji, cleanLabel } from '@/lib/utils';
import type { ScrapedLink } from '@/lib/types';

type Props = {
  links: ScrapedLink[];
};

export default function LinktreeList({ links }: Props) {
  const [grouped, setGrouped] = useState<{
    featured: ScrapedLink[];
    social: ScrapedLink[];
    other: ScrapedLink[];
  }>({ featured: [], social: [], other: [] });

  useEffect(() => {
    const processLinks = async () => {
      const featured: ScrapedLink[] = [];
      const social: ScrapedLink[] = [];
      const other: ScrapedLink[] = [];

      for (const link of links) {
        const lower = link.url.toLowerCase();
        if (
          lower.includes('spotify') ||
          lower.includes('bandcamp') ||
          lower.includes('youtube') ||
          lower.includes('soundcloud')
        ) {
          featured.push(link);
        } else if (
          lower.includes('instagram') ||
          lower.includes('facebook') ||
          lower.includes('tiktok') ||
          lower.includes('x.com') ||
          lower.includes('twitter')
        ) {
          social.push(link);
        } else {
          other.push(link);
        }
      }

      const dedupedFeatured = await dedupeLinks(featured, social);
      const dedupedSocial = await dedupeLinks(social, featured);
      const dedupedOther = await dedupeLinks(other, [...featured, ...social]);

      setGrouped({
        featured: dedupedFeatured,
        social: dedupedSocial,
        other: dedupedOther,
      });
    };

    void processLinks();
  }, [links]);

  const renderGroup = (title: string, group: ScrapedLink[]) => {
    if (group.length === 0) return null;

    const groupedByHost = groupLinksByPlatform(group);

    return (
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
        <ul className="space-y-2">
          {Object.entries(groupedByHost).map(([host, links]) => (
            <li key={host} className="space-y-2">
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
                    {getPlatformEmoji(link.url)} {cleanLabel(link.label ?? '')}
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
    <div className="mt-4">
      {renderGroup('Social Links', grouped.social)}
      {renderGroup('Featured Links', grouped.featured)}
      {renderGroup('Other', grouped.other)}
    </div>
  );
}
