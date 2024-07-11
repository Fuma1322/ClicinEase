 /** @type {import('next').NextConfig} */
 const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
    experimental: {
        serverActions: true,
      },
      reactStrictMode: true, // Optional: Enables React Strict Mode for development
      swcMinify: true, // Optional: Enables SWC-based minification for faster builds
 };

 module.exports = nextConfig