// src/lib/utils.tsx

import { ScrapedLink } from './types';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(...inputs);
}

export function cleanLabel(label?: string): string {
  return label?.replace(/^https?:\/\//, '')
               .replace(/^www\./, '')
               .replace(/\/$/, '') || '';
}

export function getPlatformEmoji(url: string): string {
  const lowered = url.toLowerCase();
  if (lowered.includes('spotify')) return '🎧';
  if (lowered.includes('soundcloud')) return '🎵';
  if (lowered.includes('bandcamp')) return '💿';
  if (lowered.includes('youtube')) return '📺';
  if (lowered.includes('instagram')) return '📸';
  if (lowered.includes('facebook')) return '👤';
  if (lowered.includes('patreon')) return '💰';
  if (lowered.includes('dropbox')) return '📁';
  return '🔗';
}

export function dedupeLinks(...groups: ScrapedLink[][]): ScrapedLink[] {
  const seen = new Set<string>();
  return groups.flat().filter((link) => {
    const key = new URL(link.url).hostname + new URL(link.url).pathname;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function groupLinksByPlatform(links: ScrapedLink[]) {
  const featured = links.filter((l) => l.featured);
  const social = links.filter(
    (l) =>
      !l.featured &&
      /instagram|facebook|tiktok|x\.com|twitter|patreon/.test(l.url)
  );
  const other = links.filter((l) => !featured.includes(l) && !social.includes(l));
  return { featured, social, other };
}
