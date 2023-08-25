/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.(txt|csv)$/,
      use: [
        {
          loader: 'file-loader',
          options: {},
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
