export type Show = {
  date: string;
  location: string;
  title?: string;
};

export type Artist = {
  name: string;
  slug: string;
  artistUrl?: string;
  photoUrl?: string;
  about?: string;
  music?: (string | { title?: string; url: string })[];
  shows?: Show[];
  calendarUrl?: string;
};
