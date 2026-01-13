import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Force pdf-parse to be treated as a server-side only package
  serverExternalPackages: ["pdf-parse"],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, canvas: false };
    return config;
  },
};

export default nextConfig;

