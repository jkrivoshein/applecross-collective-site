/** @type {import('next').NextConfig} */
const nextConfig = {
  // …other config…
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linktr.ee',
        port: '',
        pathname: '/og/image/**',
      },
      // any other hosts…
    ],
  },
}

module.exports = nextConfig;
