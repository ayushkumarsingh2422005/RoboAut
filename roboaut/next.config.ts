import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'hospitable-luck-01caa08430.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
