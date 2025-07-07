export type Show = {
  date: string;
  location: string;
};

export type Artist = {
  name: string;
  slug: string;
  artistUrl?: string;
  photoUrl?: string;
  artwork?: string;
  about?: string;
  shows?: Show[];
  music?: string[];
};

export type ScrapedLink = {
  url: string;
  label: string;
  oembed?: {
    title?: string;
    html?: string;
    thumbnail_url?: string;
  };
};

export type CacheEntry = {
  links: ScrapedLink[];
  timestamp: number;
};
