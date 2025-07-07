import fs from 'fs/promises';
import path from 'path';
import { load } from 'cheerio';
import puppeteer from 'puppeteer';
import { ScrapedLink } from './types';

const CACHE_PATH = path.resolve(process.cwd(), 'linktree-cache.json');
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

type CacheEntry = {
  timestamp: number;
  links: ScrapedLink[];
};

type Cache = Record<string, CacheEntry>;

async function loadCache(): Promise<Cache> {
  try {
    const raw = await fs.readFile(CACHE_PATH, 'utf-8');
    return JSON.parse(raw) as Cache; // ✅ Fixed: cast to Cache type
  } catch {
    return {};
  }
}

async function saveCache(cache: Cache) {
  await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf-8');
}

async function scrapeWithPuppeteer(url: string): Promise<ScrapedLink[]> {
  const browser = await puppeteer.launch({
    headless: true, // ✅ Fixed: compatible with older Puppeteer versions
    args: ['--no-sandbox'],
    timeout: 30000,
    slowMo: 30,
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    const links = await page.$$eval('a[href^="http"]', (elements) =>
      elements.map((el) => ({
        url: el.getAttribute('href') || '',
        label: el.textContent?.trim() || '',
      }))
    );

    return links.filter((link) => link.url);
  } finally {
    await browser.close();
  }
}

async function scrapeWithCheerio(url: string): Promise<ScrapedLink[]> {
  const res = await fetch(url);
  const html = await res.text();
  const $ = load(html);

  const links: ScrapedLink[] = [];

  $('a[href^="http"]').each((_, el) => {
    const href = $(el).attr('href');
    const label = $(el).text().trim();
    if (href) links.push({ url: href, label });
  });

  return links;
}

export async function scrapeLinktreeLinks(
  artistUrl: string,
  opts: { refresh: boolean }
): Promise<ScrapedLink[]> {
  const cache = await loadCache();
  const cached = cache[artistUrl];

  if (!opts.refresh && cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.links;
  }

  let links: ScrapedLink[] = [];

  try {
    links = await scrapeWithPuppeteer(artistUrl);
  } catch (err) {
    console.warn('[scraper] Puppeteer failed, falling back to Cheerio:', err);
    try {
      links = await scrapeWithCheerio(artistUrl);
    } catch (err2) {
      console.error('[scraper] Cheerio also failed:', err2);
      throw new Error('Failed to scrape linktree links');
    }
  }

  cache[artistUrl] = {
    timestamp: Date.now(),
    links,
  };

  await saveCache(cache);

  return links;
}

export async function getLinksForArtist(artistSlug: string, artistUrl: string, refresh = false) {
  return scrapeLinktreeLinks(artistUrl, { refresh });
}
