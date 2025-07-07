import { ScrapedLink } from './types';

const blockedDomains = ['linktr.ee', 'cookiepedia.co.uk', 'onetrust.com'];

export function filterUnwantedLinks(links: ScrapedLink[]): ScrapedLink[] {
  return links.filter((link) => {
    try {
      const { hostname } = new URL(link.url);
      return !blockedDomains.some((blocked) => hostname.includes(blocked));
    } catch {
      return false; // Remove malformed URLs
    }
  });
}
