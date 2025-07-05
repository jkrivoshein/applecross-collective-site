// src/lib/oembed.ts
import fetch from 'node-fetch';

export async function getLinkMetadata(url: string): Promise<{ label?: string; image?: string }> {
  const oembedEndpoints = [
    { match: 'soundcloud.com', endpoint: 'https://soundcloud.com/oembed' },
    { match: 'youtube.com', endpoint: 'https://www.youtube.com/oembed' },
    { match: 'youtu.be', endpoint: 'https://www.youtube.com/oembed' },
    { match: 'bandcamp.com', endpoint: 'https://bandcamp.com/oembed' },
  ];

  const match = oembedEndpoints.find(e => url.includes(e.match));
  if (!match) return {};

  const response = await fetch(`${match.endpoint}?url=${encodeURIComponent(url)}&format=json`);
  if (!response.ok) return {};

  const json = (await response.json()) as { title?: string; thumbnail_url?: string };

  return {
    label: json.title,
    image: json.thumbnail_url,
  };
}
