/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linktr.ee',
        pathname: '/og/image/**',
      },
      {
        protocol: 'https',
        hostname: 'i1.sndcdn.com', // SoundCloud artwork
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'f4.bcbits.com', // Bandcamp artwork
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // YouTube thumbnails
        pathname: '/vi/**/hqdefault.jpg',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/djlodestone',
        destination: '/lodestone',
        permanent: true,
      },
      {
        source: '/api/linktree/djlodestone',
        destination: '/api/linktree/lodestone',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
