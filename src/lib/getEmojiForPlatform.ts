export function getEmojiForPlatform(url: string): string {
  if (url.includes('soundcloud.com')) return '🎧';
  if (url.includes('spotify.com')) return '🎵';
  if (url.includes('bandcamp.com')) return '💿';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return '📺';
  if (url.includes('apple.com')) return '🍎';
  if (url.includes('instagram.com')) return '📸';
  if (url.includes('tiktok.com')) return '🎤';
  if (url.includes('facebook.com')) return '👥';
  if (url.includes('twitter.com') || url.includes('x.com')) return '🐦';
  if (url.includes('linktr.ee')) return '🌳';
  if (url.includes('hypeddit.com')) return '🚀';
  if (url.includes('dropbox.com')) return '📦';
  if (url.startsWith('mailto:')) return '✉️';
  if (url.startsWith('http')) return '🌐';
  return '🌀'; // fallback
}
