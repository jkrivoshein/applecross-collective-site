'use client';

import { useEffect, useState } from 'react';

type EmbeddedPlayerProps = {
  url: string;
};

interface OEmbedResponse {
  html: string;
  [key: string]: unknown;
}

export default function EmbeddedPlayer({ url }: EmbeddedPlayerProps) {
  const [embedHtml, setEmbedHtml] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmbed = async () => {
      try {
        const oEmbedProviders = [
          'soundcloud.com',
          'youtube.com',
          'youtu.be',
          'bandcamp.com',
          'spotify.com',
          'facebook.com',
          'instagram.com',
          'hypeddit.com',
        ];

        const shouldTryOEmbed = oEmbedProviders.some((provider) =>
          url.includes(provider)
        );

        if (shouldTryOEmbed) {
          let endpoint = '';
          if (url.includes('soundcloud.com')) {
            endpoint = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(
              url
            )}`;
          } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
            endpoint = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
              url
            )}`;
          } else if (url.includes('bandcamp.com')) {
            endpoint = `https://bandcamp.com/oembed?format=json&url=${encodeURIComponent(
              url
            )}`;
          } else if (url.includes('spotify.com')) {
            endpoint = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
          } else if (url.includes('facebook.com')) {
            endpoint = `https://www.facebook.com/plugins/video/oembed.json/?url=${encodeURIComponent(
              url
            )}`;
          } else if (url.includes('instagram.com')) {
            endpoint = `https://graph.facebook.com/v12.0/instagram_oembed?url=${encodeURIComponent(
              url
            )}`;
          } else if (url.includes('hypeddit.com')) {
            // Hypeddit does not support oEmbed — fallback to preview
            setEmbedHtml(null);
            return;
          }

          const response = await fetch(endpoint);
          if (response.ok) {
            const data = (await response.json()) as OEmbedResponse;
            if (
              typeof data.html === 'string' &&
              !data.html.includes('onetrust.com')
            ) {
              setEmbedHtml(data.html);
              return;
            }
          }
        }

        // fallback to link preview / no embed
        setEmbedHtml(null);
      } catch {
        setEmbedHtml(null);
      }
    };

    void fetchEmbed();
  }, [url]);

  if (!embedHtml) return null;

  return (
    <div
      className="my-4"
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
}
