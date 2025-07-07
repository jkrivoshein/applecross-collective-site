import type { ScrapedLink } from './types';

// Returns an emoji based on the link's domain
export function getPlatformEmoji(url: string): string {
  const u = url.toLowerCase();
  if (u.includes('bandcamp')) return '💿';
  if (u.includes('spotify')) return '🎧';
  if (u.includes('youtube')) return '📺';
  if (u.includes('soundcloud')) return '🔊';
  if (u.includes('facebook')) return '📘';
  if (u.includes('instagram')) return '📸';
  if (u.includes('tiktok')) return '🎵';
  if (u.includes('x.com') || u.includes('twitter')) return '🐦';
  if (u.includes('dropbox')) return '📁';
  if (u.includes('hypeddit')) return '🚀';
  return '🔗';
}

// Simplifies link labels for display
export function cleanLabel(label: string): string {
  return label
    .replace(/(https?:\/\/)?(www\.)?/, '')
    .replace(/\/$/, '')
    .replace(/^([a-z]+\.)?([a-z]+\.)?/, '')
    .trim();
}

// Groups links by normalized domain
export function groupLinksByPlatform(links: ScrapedLink[]): Record<string, ScrapedLink[]> {
  return links.reduce((groups: Record<string, ScrapedLink[]>, link) => {
    try {
      const host = new URL(link.url).hostname.replace(/^www\./, '');
      if (!groups[host]) groups[host] = [];
      groups[host].push(link);
    } catch {
      if (!groups['unknown']) groups['unknown'] = [];
      groups['unknown'].push(link);
    }
    return groups;
  }, {});
}

// Filters out links from known unwanted domains
export function filterUnwantedLinks(links: ScrapedLink[]): ScrapedLink[] {
  const blockedDomains = ['onetrust.com', 'fonts.googleapis.com', 'assets.linktr.ee', 'linktr.ee'];

  return links.filter((link) => {
    try {
      const host = new URL(link.url).hostname.toLowerCase();
      return !blockedDomains.some((blocked) => host.includes(blocked));
    } catch {
      return false;
    }
  });
}

// Deduplicates links by normalizing URLs
export function dedupeLinks(links: ScrapedLink[]): ScrapedLink[] {
  const seen = new Set<string>();

  const normalize = (url: string): string => {
    try {
      const parsed = new URL(url.trim().toLowerCase());
      parsed.hash = '';
      parsed.search = '';
      parsed.hostname = parsed.hostname.replace(/^www\./, '');
      return parsed.toString().replace(/\/+$/, '');
    } catch {
      return url.trim().toLowerCase();
    }
  };

  const result: ScrapedLink[] = [];

  for (const link of links) {
    const norm = normalize(link.url);
    if (!seen.has(norm)) {
      seen.add(norm);
      result.push(link);
    }
  }

  return result;
}
