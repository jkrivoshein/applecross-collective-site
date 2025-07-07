// src/lib/utils.tsx

import { ScrapedLink } from './types';

const normalizationCache = new Map<string, string>();

/**
 * Resolves shortened or redirecting URLs (e.g. bit.ly, on.soundcloud.com).
 * Uses HEAD requests to minimize data transfer.
 */
export async function resolveRedirect(url: string): Promise<string> {
  if (normalizationCache.has(url)) {
    return normalizationCache.get(url)!;
  }

  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
    });

    const finalUrl = res.url || url;
    normalizationCache.set(url, finalUrl);
    return finalUrl;
  } catch {
    return url;
  }
}

/**
 * Normalizes a URL for deduplication by:
 * - Resolving redirects (e.g. bit.ly, hyped.it)
 * - Stripping www
 * - Lowercasing hostname and path
 * - Removing trailing slash
 * - Ignoring query and hash
 */
export async function normalizeUrl(url: string): Promise<string> {
  try {
    const resolved = await resolveRedirect(url);
    const u = new URL(resolved);
    const hostname = u.hostname.replace(/^www\./, '').toLowerCase();
    const pathname = u.pathname.replace(/\/$/, '').toLowerCase();
    return `${hostname}${pathname}`;
  } catch {
    return url.toLowerCase().replace(/^www\./, '').replace(/\/$/, '');
  }
}

/**
 * Removes any links from `primary` that also appear in `secondary`,
 * comparing based on normalized and resolved URL.
 */
export async function dedupeLinks(
  primary: ScrapedLink[],
  secondary: ScrapedLink[]
): Promise<ScrapedLink[]> {
  const seen = new Set<string>(
    await Promise.all(secondary.map((link) => normalizeUrl(link.url)))
  );

  const result: ScrapedLink[] = [];

  for (const link of primary) {
    const normalized = await normalizeUrl(link.url);
    if (!seen.has(normalized)) {
      result.push(link);
    }
  }

  return result;
}

/**
 * Cleans a label by trimming whitespace and removing extraneous characters.
 */
export function cleanLabel(label: string): string {
  return label.trim().replace(/^\W+|\W+$/g, '');
}

/**
 * Groups links by hostname-derived platform label.
 */
export function groupLinksByPlatform(
  links: ScrapedLink[]
): Record<string, ScrapedLink[]> {
  const groups: Record<string, ScrapedLink[]> = {};

  for (const link of links) {
    try {
      const url = new URL(link.url);
      const key = url.hostname.replace(/^www\./, '').toLowerCase();

      if (!groups[key]) groups[key] = [];
      groups[key].push(link);
    } catch {
      if (!groups.unknown) groups.unknown = [];
      groups.unknown.push(link);
    }
  }

  return groups;
}

/**
 * Returns an emoji for a platform based on the URL.
 */
export function getPlatformEmoji(url: string): string {
  const u = url.toLowerCase();
  if (u.includes('spotify')) return '🎧';
  if (u.includes('soundcloud')) return '🔊';
  if (u.includes('bandcamp')) return '💿';
  if (u.includes('youtube')) return '📺';
  if (u.includes('instagram')) return '📸';
  if (u.includes('twitter') || u.includes('x.com')) return '🐦';
  if (u.includes('facebook')) return '📘';
  if (u.includes('tiktok')) return '🎵';
  if (u.includes('linktr.ee')) return '🌲';
  if (u.includes('hypeddit')) return '🚀';
  return '🔗';
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
