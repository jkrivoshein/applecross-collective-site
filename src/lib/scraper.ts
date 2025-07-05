import * as cheerio from 'cheerio';
import type { Element } from 'domhandler';
import { ScrapedLink } from './types';
import { getArtistBySlug } from './artist.config';
import path from 'path';
import fs from 'fs';

const CACHE_FILE = path.resolve(process.cwd(), '.cache', 'linktree.json');
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

type CacheEntry = {
  links: ScrapedLink[];
  timestamp: number;
};

type CacheMap = Record<string, CacheEntry>;

let memoryCache: CacheMap = {};

function loadCache(): CacheMap {
  try {
    const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
    return JSON.parse(raw) as CacheMap;
  } catch {
    return {};
  }
}

function saveCache(cache: CacheMap) {
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

function isCacheValid(entry?: CacheEntry): boolean {
  return !!entry && Date.now() - entry.timestamp < CACHE_DURATION_MS;
}

async function fetchWithTimeout(url: string, timeout = 10000): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return await res.text();
  } catch {
    throw new Error(`Timeout or fetch error for ${url}`);
  } finally {
    clearTimeout(timer);
  }
}

function parseLinksFromHtml(html: string): ScrapedLink[] {
  const $ = cheerio.load(html);
  const links: ScrapedLink[] = [];

  $('a').each((_: unknown, el: Element) => {
    const url = $(el).attr('href');
    const label = $(el).text().trim();
    if (url && /^https?:\/\//.test(url)) {
      links.push({ url, label });
    }
  });

  return links;
}

export async function getLinksForArtist(
  slug: string,
  { refresh = false }: { refresh?: boolean } = {}
): Promise<ScrapedLink[]> {
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
