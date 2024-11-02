/** @type {import('next').NextConfig} */
const {cspHeader} = require('./src/consts/csp.ts');

const nextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {not: [...fileLoaderRule.resourceQuery.not, /url/]}, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  async headers() {
    return [
      {
        source: '/(.*)', // Применяем ко всем страницам
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
  publicRuntimeConfig: {
    BACKAPI_URL: process.env.BACKAPI_URL,
  },
};

module.exports = nextConfig;
