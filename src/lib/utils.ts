import { ScrapedLink } from './types';

export function cleanLabel(label: string): string {
  return label
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
}

export function getPlatformEmoji(platform: string): string {
  const p = platform.toLowerCase();
  if (p.includes('spotify')) return '🎧';
  if (p.includes('soundcloud')) return '🎵';
  if (p.includes('bandcamp')) return '💿';
  if (p.includes('youtube') || p.includes('youtu.be')) return '📺';
  if (p.includes('facebook')) return '📘';
  if (p.includes('instagram')) return '📸';
  if (p.includes('tiktok')) return '🎶';
  if (p.includes('x.com') || p.includes('twitter')) return '🐦';
  return '🔗';
}

export function groupLinksByPlatform(links: ScrapedLink[]): Record<string, ScrapedLink[]> {
  const grouped: Record<string, ScrapedLink[]> = {};

  for (const link of links) {
    const platform = cleanLabel(link.label);
    if (!grouped[platform]) {
      grouped[platform] = [];
    }
    grouped[platform].push(link);
  }

  return grouped;
}

export function dedupeLinks(a: ScrapedLink[], b: ScrapedLink[]): ScrapedLink[] {
  const seen = new Set(b.map((l) => l.url));
  return a.filter((l) => !seen.has(l.url));
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
