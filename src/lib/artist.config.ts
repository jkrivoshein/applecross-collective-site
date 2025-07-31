import { Artist } from './types';

export const artists: Record<string, Artist> = {
  'applecross-collective': {
    slug: 'applecross-collective',
    name: 'Applecross Collective',
    photoUrl: '/images/applecross.jpg',
    about: 'A musical collective from the Pacific Northwest.',
    artistUrl: 'https://linktr.ee/applecrosscollective',
    music: [
      'https://soundcloud.com/applecrosscollective/eoa001-minimix-taylor',
      'https://soundcloud.com/applecrosscollective/applecross-mix-series-007-patrick-skyler',
      'https://soundcloud.com/applecrosscollective/applecross-mix-series-006-quartzzion-opulence-in-all-of-us'
    ]
  },

  intranaut: {
    slug: 'intranaut',
    name: 'Intranaut',
    photoUrl: '/images/intranaut.jpg',
    about: 'Intranaut is an experimental bass music producer and DJ from the Pacific Northwest.',
    artistUrl: 'https://linktr.ee/intranaut',
    music: [
      'https://soundcloud.com/intranautmusic/traveler-chronicles-001',
      'https://www.youtube.com/watch?v=ViJiHaomqWw'
    ]
  },

  ourfriendgus: {
    slug: 'ourfriendgus',
    name: 'OurFriendGus',
    photoUrl: '/images/other-dj.jpg',
    about: 'Applecross Collective Admin, DJ and Producer. Also half of the group Pantry Raid.',
    artistUrl: 'https://ourfriendgus.com',
    music: [
      'https://open.spotify.com/track/6wFtTMn2fRCGi5cMjsiX3C?si=0128acb86c7843c5',
      'https://soundcloud.com/ourfriendgus/applecross-2024-performance',
      'https://bandcamp.com/EmbeddedPlayer/album=2784637789/size=large/bgcol=ffffff/linkcol=0687f5/track=1/transparent=true/'
    ]
  },

  kfish: {
    slug: 'kfish',
    name: 'K Fish',
    photoUrl: '/images/other-dj.jpg',
    about: 'A bass music producer and DJ from the PNW. Also one third of Meh.',
    artistUrl: 'https://linktr.ee/kfishbeats',
    music: [
      'https://soundcloud.com/kfishbeats/boyfriend_forever_remix',
      'https://soundcloud.com/kfishbeats/mac-miller-cold-feet-k-fish-remix',
      'https://open.spotify.com/track/5G6MfowqL6y2uhoffyw1Hj?si=3295cd288bec42e1'
    ]
  },

  'gr33n-p13ce': {
    slug: 'gr33n-p13ce',
    name: 'GR33N P13CE',
    photoUrl: '/images/other-dj.jpg',
    about: 'A DJ and bass music producer in the PNW.',
    artistUrl: 'https://linktr.ee/gr33np13ce',
    music: [
      'https://soundcloud.com/gr33np13cemusic/emergence',
      'https://soundcloud.com/gr33np13cemusic/housewife-birthday-slice',
      'https://soundcloud.com/gr33np13cemusic/413ce-o-p13wip'
    ]
  },

  'hello-ego': {
    slug: 'hello-ego',
    name: 'Hello Ego',
    photoUrl: '/images/other-dj.jpg',
    about: 'A bass music producer and DJ from SoCal.',
    artistUrl: 'https://linktr.ee/helloego',
    music: [
      'https://soundcloud.com/helloego/birdman-lil-wayne-stuntin-like-my-daddy-hello-ego-flip',
      'https://soundcloud.com/helloego/paramoredecodeflip',
      'https://open.spotify.com/track/1f16QfxGjXAq1WLjjBh2GM?si=3a10a0f7d0d44f06'
    ]
  },

  'neon-spellcraft': {
    slug: 'neon-spellcraft',
    name: 'Neon Spellcraft',
    photoUrl: '/images/other-dj.jpg',
    about: 'A bass music producer and DJ from SoCal.',
    artistUrl: 'https://linktr.ee/neonspellcraft',
    music: [
      'https://open.spotify.com/track/41vheDeeZGFFfdV6zwulwT?si=b85e87343bd745d2',
      'https://soundcloud.com/neonspellcraft/boba-fett',
      'https://bandcamp.com/EmbeddedPlayer/album=715130692/size=large/bgcol=ffffff/linkcol=0687f5/track=1/transparent=true/'
    ]
  },

  lodestone: {
    slug: 'lodestone',
    name: 'Lodestone',
    photoUrl: '/images/lodestone.jpg',
    about: 'A bass music producer in the PNW. Also one half of the group Pantry Raid.',
    artistUrl: 'https://linktr.ee/djlodestone',
    calendarUrl: 'https://calendar.google.com/calendar/ical/ba31e3f26c5db41d15922d39748ee2d727239c3752f17d1004fd5dca72129d2d%40group.calendar.google.com/public/basic.ics',
    music: [
      'https://open.spotify.com/track/3Eejy6AwqzAGe102HOmiPK?si=868ef389ef8241dc',
      'https://soundcloud.com/djlodestone/id20-wip',
      'https://www.youtube.com/watch?v=SpHfv765_9s'
    ]
  }
};

export function getAllArtists(): Artist[] {
  return Object.values(artists);
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists[slug];
}
