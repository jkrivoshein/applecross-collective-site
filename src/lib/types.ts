export type Artist = {
  name: string;
  photoUrl?: string;
  artwork?: string;
  about?: string;
  shows?: { date: string; location: string }[];
  music?: string[] | { title: string; url: string }[]; // Supports both formats
};
