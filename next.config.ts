import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'o.remove.bg',
        port: '',
        pathname: '/downloads/**',
      },
    ],
  },
};

export default nextConfig;
