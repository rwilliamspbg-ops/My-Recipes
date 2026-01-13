/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, canvas: false };
    return config;
  },
};

module.exports = nextConfig;

