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
  intranaut: {
    name: "Intranaut",
    photoUrl: "/images/other-dj.jpg",
    artwork: "/images/other-artwork.jpg",
    about: "Applecross Collective Admin, DJ and Producer. Also one third of the group Meh.",
    shows: [
      { date: "2025-06-20", location: "The Happening" },
      { date: "2025-09-22", location: "Denver, CO" },
    ],
    music: [
      "https://open.spotify.com/track/41vheDeeZGFFfdV6zwulwT?si=aba214f645674672",
      "https://soundcloud.com/intranautmusic/traveler-chronicles-001",
      "https://www.youtube.com/watch?v=ViJiHaomqWw",
    ],
  },
  ourfriendgus: {
    name: "OurFriendGus",
    photoUrl: "/images/other-dj.jpg",
    artwork: "/images/other-artwork.jpg",
    about: "Applecross Collective Admin, DJ and Producer. Also half of the group Pantry Raid.",
    shows: [
      { date: "2025-06-20", location: "Vancouver, CA" },
      { date: "2025-09-22", location: "Denver, CO" },
    ],
    music: [
      "https://open.spotify.com/track/6wFtTMn2fRCGi5cMjsiX3C?si=0128acb86c7843c5",
      "https://soundcloud.com/ourfriendgus/applecross-2024-performance",
      "https://bandcamp.com/EmbeddedPlayer/album=2784637789/size=large/bgcol=ffffff/linkcol=0687f5/track=1/transparent=true/",
    ],
  },
  kfish: {
    name: "Kfish",
    photoUrl: "/images/other-dj.jpg",
    artwork: "/images/other-artwork.jpg",
    about: "A bass music producer and DJ from the PNW. Also one third of Meh.",
    shows: [
      { date: "2025-09-10", location: "Boise, ID" },
      { date: "2025-09-22", location: "Denver, CO" },
    ],
    music: [
      "https://soundcloud.com/kfishbeats/boyfriend_forever_remix",
      "https://soundcloud.com/kfishbeats/mac-miller-cold-feet-k-fish-remix",
      "https://open.spotify.com/track/5G6MfowqL6y2uhoffyw1Hj?si=3295cd288bec42e1",
    ],
  },
  lodestone: {
    name: "Lodestone",
    photoUrl: "/images/lodestone.jpg",
    artwork: "/images/lodestone-artwork.jpg",
    about: "A bass music producer in the PNW. Also one half of the group Pantry Raid.",
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
      "https://youtu.be/h2bbFzY61Yc",
      "https://bandcamp.com/EmbeddedPlayer/album=2000651139/size=large/bgcol=ffffff/linkcol=0687f5/track=1/transparent=true/",
    ],
  },
};
