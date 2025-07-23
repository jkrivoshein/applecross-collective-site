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
