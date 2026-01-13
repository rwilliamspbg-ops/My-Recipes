import type { NextConfig } from 'next';

const nextConfig = {
  // Add this line to prevent Next.js from bundling the library
  serverExternalPackages: ["pdf-parse"],
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { 
      fs: false, 
      path: false, 
      canvas: false 
    };
    return config;
  },
};

export default nextConfig;


