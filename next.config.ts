import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdf-parse"],
  webpack: (config: any, { isServer }) => {
    config.resolve.fallback = { 
      fs: false, 
      path: false, 
      canvas: false 
    };
    return config;
  },
};

export default nextConfig;
