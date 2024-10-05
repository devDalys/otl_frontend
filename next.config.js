/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/ru',
      },
      {
        source: '/:path*',
        destination: '/ru/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
