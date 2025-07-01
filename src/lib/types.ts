// src/lib/types.ts

export type Artist = {
  name: string;
  photoUrl?: string;
  artwork?: string;
  about?: string;
  shows?: { date: string; location: string }[];
  music?: string[];
  linktreeUrl?: string;   // ← add this line
};
