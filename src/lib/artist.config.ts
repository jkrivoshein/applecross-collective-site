export type Artist = {
  name: string;
  photoUrl?: string;
  artwork?: string;
  about?: string;
  shows?: { date: string; location: string }[];
  music?: string[];
};

export const artists: Record<string, Artist> = {
  "applecross-collective": {
    name: "Applecross Collective",
    photoUrl: "/images/applecross.jpg",
    artwork: "/images/applecross-artwork.jpg",
    about: "A collaboration of DJs and producers pushing bass music boundaries.",
    shows: [
      { date: "2025-07-12", location: "Seattle, WA" },
      { date: "2025-08-03", location: "Portland, OR" },
    ],
    music: [
      "https://soundcloud.com/applecrosscollective/applecross-mix-series-007-patrick-skyler",
      "https://bandcamp.com/EmbeddedPlayer/album=2018596207/size=large/bgcol=ffffff/linkcol=0687f5/track=1/transparent=true/",
      "https://www.youtube.com/watch?v=IsafbBop9Ys",
    ],
  },
  lodestone: {
    name: "Lodestone",
    photoUrl: "/images/lodestone.jpg",
    artwork: "/images/lodestone-artwork.jpg",
    about: "A bass music producer in the PNW.",
    shows: [
      { date: "2025-09-10", location: "Boise, ID" },
      { date: "2025-09-22", location: "Denver, CO" },
    ],
    music: [
      "https://open.spotify.com/track/3Eejy6AwqzAGe102HOmiPK?si=868ef389ef8241dc",
      "https://soundcloud.com/djlodestone/id20-wip",
      "https://www.youtube.com/watch?v=SpHfv765_9s",
    ],
  },
  "other-dj": {
    name: "Other DJ",
    photoUrl: "/images/other-dj.jpg",
    artwork: "/images/other-artwork.jpg",
    about: "Other DJ blends footwork, glitch-hop, and experimental club for unpredictable sets.",
    shows: [
      { date: "2025-07-27", location: "San Francisco, CA" },
      { date: "2025-08-10", location: "Los Angeles, CA" },
    ],
    music: [
      "https://soundcloud.com/djlodestone/pantryraid-12of30-v1-wip",
      "https://bandcamp.com/EmbeddedPlayer/album=2000651139/size=large/bgcol=ffffff/linkcol=0687f5/track=1/transparent=true/",
      "https://youtu.be/h2bbFzY61Yc",
    ],
  },
};
