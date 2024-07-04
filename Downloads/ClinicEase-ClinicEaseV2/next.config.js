 /** @type {import('next').NextConfig} */
 const nextConfig = {
    experimental: {
        serverActions: true,
      },
      reactStrictMode: true, // Optional: Enables React Strict Mode for development
      swcMinify: true, // Optional: Enables SWC-based minification for faster builds
 };

 module.exports = nextConfig