export type Show = {
  date: string;
  location: string;
};

export type Artist = {
  slug: string;
  name: string;
  photoUrl?: string;
  artwork?: string;
  about?: string;
  artistUrl?: string; 
  socials?: string[];
  shows?: Show[];
  music?: string[];
};

export type ScrapedLink = {
  url: string;
  label: string;
  image?: string;
  featured?: boolean;
  artwork?: string;
};
