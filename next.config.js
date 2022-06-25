/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'drive.google.com','images.unsplash.com','i.imgur.com'],
  },
}

module.exports = nextConfig
