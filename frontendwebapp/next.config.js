/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
}

module.exports = nextConfig
