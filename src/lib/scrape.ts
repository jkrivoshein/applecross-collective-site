// src/lib/scrape.ts
import * as cheerio from 'cheerio';
import { ScrapedLink } from './types';

export function parseLinksFromHtml(html: string): ScrapedLink[] {
  const $ = cheerio.load(html);
  const links: ScrapedLink[] = [];

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    const label = $(el).text().trim();

    if (href && !href.startsWith('#')) {
      links.push({
        url: href,
        label: label || href,
      });
    }
  });

  return links;
}
