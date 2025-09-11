/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    dangerouslyAllowSVG: true,
  },
  transpilePackages: ['lucide-react'],
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
}

module.exports = nextConfig