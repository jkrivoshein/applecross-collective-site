import { artists } from './artist.config';

export function getArtistBySlug(slug: string) {
  return artists[slug];
}

export const defaultArtistSlug = 'applecross-collective';
