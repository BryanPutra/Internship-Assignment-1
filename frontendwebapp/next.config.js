/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    modularizeImports: {
      '@mui/material/?(((\\w*)?/?)*)': {
        transform: '@mui/material/{{ matches.[1] }}/{{member}}'
      },
      '@mui/icons-material/?(((\\w*)?/?)*)': {
        transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
      }
    }
  },
  reactStrictMode: true,
  swcMinify: true,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
}

module.exports = nextConfig
