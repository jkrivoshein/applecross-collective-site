export interface Artist {
  name: string;
  photoUrl?: string;
  about?: string;
  shows?: { date: string; location: string }[];
  music?: { title: string; url: string }[];
  contact?: string;
  links?: {
    instagram?: string;
    soundcloud?: string;
  };
}
