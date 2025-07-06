// src/lib/scraper.ts
import fs from 'fs';
import path from 'path';
import { getArtistBySlug } from './artist.config';
import { ScrapedLink, CacheEntry } from './types';
import { parseLinksFromHtml } from './scrape';
import fetch from 'node-fetch';

const CACHE_FILE = path.join(process.cwd(), 'cache', 'linktree.json');

let memoryCache: Record<string, CacheEntry> = {};

function loadCache(): Record<string, CacheEntry> {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const json = fs.readFileSync(CACHE_FILE, 'utf8');
      const parsed = JSON.parse(json) as unknown;
      return parsed as Record<string, CacheEntry>;
    }
  } catch (e) {
    console.error('Failed to load cache:', e);
  }
  return {};
}

function saveCache(cache: Record<string, CacheEntry>) {
  try {
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (e) {
    console.error('Failed to save cache:', e);
  }
}

function isCacheValid(cached: CacheEntry | undefined, ttlMs = 1000 * 60 * 60 * 24): boolean {
  if (!cached || !cached.timestamp || !cached.links?.length) return false;
  return Date.now() - cached.timestamp < ttlMs;
}

async function fetchWithTimeout(url: string, timeout = 10000): Promise<string> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(id);
  }
}

export async function getLinksForArtist(slug: string, refresh = false): Promise<ScrapedLink[]> {
  const artist = getArtistBySlug(slug);
  if (!artist) throw new Error(`Artist not found: ${slug}`);

  const url = artist.socials?.[0];
  if (!url) return [];

  memoryCache = Object.keys(memoryCache).length ? memoryCache : loadCache();
  const cached = memoryCache[slug];

  if (!refresh && isCacheValid(cached)) {
    return cached.links;
  }

  try {
    const html = await fetchWithTimeout(url);
    const links = parseLinksFromHtml(html);
    memoryCache[slug] = { links, timestamp: Date.now() };
    saveCache(memoryCache);
    return links;
  } catch (_e) {
    console.error(`Failed to fetch/scrape links for ${slug}:`, _e);
    return cached?.links || [];
  }
}
