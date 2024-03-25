/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  images: {
    domains: [
      "res.cloudinary.com",
      "192.168.10.12"
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  }
}

module.exports = nextConfig