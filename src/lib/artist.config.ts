import { Artist } from './types';

export const artists: Record<string, Artist> = {
  'applecross-collective': {
    slug: 'applecross-collective',
    name: 'Applecross Collective',
    photoUrl: '/images/applecross.jpg',
    artwork: '/images/applecross-artwork.jpg',
    about: 'A musical collective from the Pacific Northwest.',
    artistUrl: 'https://linktr.ee/applecrosscollective',
    shows: [
      { date: '2025-08-01', location: 'Seattle, WA' },
      { date: '2025-09-10', location: 'Portland, OR' }
    ],
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
    artwork: '/images/intranaut-artwork.jpg',
    about: 'Intranaut is an experimental bass music producer and DJ from the Pacific Northwest.',
    artistUrl: 'https://linktr.ee/intranaut',
    shows: [
      { date: '2025-06-01', location: 'Portland, OR' },
      { date: '2025-07-15', location: 'Seattle, WA' }
    ],
    music: [
      'https://soundcloud.com/intranautmusic/traveler-chronicles-001',
      'https://www.youtube.com/watch?v=ViJiHaomqWw'
    ]
  },

  ourfriendgus: {
    slug: 'ourfriendgus',
    name: 'OurFriendGus',
    photoUrl: '/images/other-dj.jpg',
    artwork: '/images/other-artwork.jpg',
    about: 'Applecross Collective Admin, DJ and Producer. Also half of the group Pantry Raid.',
    artistUrl: 'https://ourfriendgus.com',
    shows: [
      { date: '2025-06-20', location: 'Vancouver, CA' },
      { date: '2025-09-22', location: 'Denver, CO' }
    ],
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
    artwork: '/images/other-artwork.jpg',
    about: 'A bass music producer and DJ from the PNW. Also one third of Meh.',
    artistUrl: 'https://linktr.ee/kfishbeats',
    shows: [
      { date: '2025-09-10', location: 'Boise, ID' },
      { date: '2025-09-22', location: 'Denver, CO' }
    ],
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
    artwork: '/images/other-artwork.jpg',
    about: 'A DJ and bass music producer in the PNW.',
    artistUrl: 'https://linktr.ee/gr33np13ce',
    shows: [
      { date: '2025-09-10', location: 'Bend, OR' },
      { date: '2025-09-22', location: 'Denver, CO' }
    ],
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
    artwork: '/images/other-artwork.jpg',
    about: 'A bass music producer and DJ from SoCal.',
    artistUrl: 'https://linktr.ee/helloego',
    shows: [
      { date: '2025-09-10', location: 'Los Angeles, CA' },
      { date: '2025-09-22', location: 'Denver, CO' }
    ],
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
    artwork: '/images/other-artwork.jpg',
    about: 'A bass music producer and DJ from SoCal.',
    artistUrl: 'https://linktr.ee/neonspellcraft',
    shows: [
      { date: '2025-07-27', location: 'San Francisco, CA' },
      { date: '2025-08-10', location: 'Los Angeles, CA' }
    ],
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
    artwork: '/images/lodestone-artwork.jpg',
    about: 'A bass music producer in the PNW. Also one half of the group Pantry Raid.',
    artistUrl: 'https://linktr.ee/djlodestone',
    shows: [
      { date: '2025-09-10', location: 'Boise, ID' },
      { date: '2025-09-22', location: 'Denver, CO' }
    ],
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
