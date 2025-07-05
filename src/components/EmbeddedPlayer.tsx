// src/components/EmbeddedPlayer.tsx

import React from 'react';

type Props = {
  url: string;
  className?: string;
};

export default function EmbeddedPlayer({ url, className }: Props) {
  if (url.includes('spotify.com')) {
    return (
      <iframe
        src={`https://open.spotify.com/embed${new URL(url).pathname}`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className={className}
      />
    );
  }

  if (url.includes('soundcloud.com')) {
    return (
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23000000&inverse=false&auto_play=false&show_user=true`}
        className={className}
      />
    );
  }

  if (url.includes('bandcamp.com')) {
    return (
      <iframe
        style={{ border: 0, width: '100%', height: '120px' }}
        src={url}
        seamless
        className={className}
      />
    );
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtube.com')
      ? new URL(url).searchParams.get('v')
      : url.split('/').pop();
    return (
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className}
      />
    );
  }

  return null;
}
