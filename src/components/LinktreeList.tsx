import Image from 'next/image';
import { ScrapedLink } from '@/lib/types';
import { getPlatformEmoji, cleanLabel } from '@/lib/utils';

type Props = {
  featuredLinks: ScrapedLink[];
  socialLinks: ScrapedLink[];
  fallbackImage?: string;
};

export default function LinktreeList({ featuredLinks, socialLinks, fallbackImage }: Props) {
  const dedupe = (arr: ScrapedLink[]) => {
    const seen = new Set<string>();
    return arr.filter((link) => {
      const norm = link.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      if (seen.has(norm)) return false;
      seen.add(norm);
      return true;
    });
  };

  const all = dedupe([...featuredLinks, ...socialLinks]);

  const groupLinksByPlatform = (links: ScrapedLink[]) => {
    const featured: ScrapedLink[] = [];
    const social: ScrapedLink[] = [];
    const other: ScrapedLink[] = [];

    for (const link of links) {
      const url = link.url.toLowerCase();
      if (
        url.includes('bandcamp.com') ||
        url.includes('soundcloud.com') ||
        url.includes('open.spotify.com') ||
        url.includes('youtube.com') ||
        url.includes('on.soundcloud.com') ||
        url.includes('hypeddit.com')
      ) {
        featured.push(link);
      } else if (
        url.includes('instagram.com') ||
        url.includes('facebook.com') ||
        url.includes('twitter.com') ||
        url.includes('tiktok.com') ||
        url.includes('discord.gg') ||
        url.includes('patreon.com')
      ) {
        social.push(link);
      } else {
        other.push(link);
      }
    }

    return { featured, social, other };
  };

  const { featured, social, other } = groupLinksByPlatform(all);

  const renderGroup = (label: string, emoji: string, links: ScrapedLink[]) =>
    links.length > 0 && (
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-2">{emoji} {label}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-zinc-800 hover:bg-zinc-700 transition rounded-md p-2"
            >
              {link.artwork || fallbackImage ? (
                <Image
                  src={link.artwork || fallbackImage!}
                  alt={link.label || 'link'}
                  width={40}
                  height={40}
                  className="rounded object-cover"
                />
              ) : null}
              <span className="text-sm text-white">
                {getPlatformEmoji(link.url)} {cleanLabel(link.label || link.url)}
              </span>
            </a>
          ))}
        </div>
      </div>
    );

  return (
    <div className="mt-4">
      {renderGroup('Featured Links', '🎧', featured)}
      {renderGroup('Social Links', '🔗', social)}
      {renderGroup('Other', '📦', other)}
    </div>
  );
}
