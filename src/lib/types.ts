// src/lib/types.ts

export type Show = {
  date: string;
  location: string;
};

export type Artist = {
  name: string;
  slug: string;
  photoUrl?: string;
  artwork?: string;
  about?: string;
  shows?: Show[];
  music?: string[];
  socials?: string[];
};

export type ScrapedLink = {
  url: string;
  label?: string;
  artwork?: string;
  featured?: boolean;
};
