// src/components/LinktreeList.tsx

import React from 'react';
import { ScrapedLink } from '@/lib/types';
import {
  cleanLabel,
  dedupeLinks,
  getPlatformEmoji,
  groupLinksByPlatform,
} from '@/lib/utils';

interface LinktreeListProps {
  featuredLinks?: ScrapedLink[];
  socialLinks?: ScrapedLink[];
}

export default function LinktreeList({
  featuredLinks = [],
  socialLinks = [],
}: LinktreeListProps) {
  const deduped = dedupeLinks(featuredLinks, socialLinks);
  const { featured, social, other } = groupLinksByPlatform(deduped);

  const renderGroup = (title: string, links: ScrapedLink[]) => {
    if (!links.length) return null;

    return (
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">
          {title}
        </h3>
        <div className="flex flex-col gap-2">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded bg-muted text-foreground hover:bg-muted/70 transition-all text-sm font-medium"
            >
              <span className="text-lg">{getPlatformEmoji(link.url)}</span>
              <span>{cleanLabel(link.label || link.url)}</span>
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4">
      {renderGroup('Featured Links', featured)}
      {renderGroup('Social Links', social)}
      {renderGroup('Other', other)}
    </div>
  );
}
