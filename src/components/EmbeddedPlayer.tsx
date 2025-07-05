// src/components/EmbeddedPlayer.tsx

import React from 'react';

type Props = {
  url: string;
  className?: string;
};

export default function EmbeddedPlayer({ url, className }: Props) {
  if (!url) return null;

  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isSoundCloud = url.includes('soundcloud.com');
  const isBandcamp = url.includes('bandcamp.com');
  const isSpotify = url.includes('spotify.com');

  if (isYouTube) {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube player"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className={className || 'w-full aspect-video'}
      />
    );
  }

  if (isSoundCloud) {
    return (
      <iframe
        className={className || 'w-full'}
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23000000&inverse=false&auto_play=false&show_user=true`}
      ></iframe>
    );
  }

  if (isBandcamp) {
    return (
      <iframe
        className={className || ''}
        style={{ border: '0', width: '100%', height: '120px' }}
        src={url}
        seamless
        title="Bandcamp embed"
      ></iframe>
    );
  }

  if (isSpotify) {
    const embedUrl = url.replace('/track/', '/embed/track/');
    return (
      <iframe
        className={className || ''}
        src={embedUrl}
        width="100%"
        height="80"
        frameBorder="0"
        allow="encrypted-media"
        title="Spotify embed"
      />
    );
  }

  return null;
}
