import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // /home and /hy/home → / (hy is default locale)
      { source: '/home', destination: '/', permanent: true },
      { source: '/hy/home', destination: '/', permanent: true },
      // /en/home → /en, /ru/home → /ru
      { source: '/en/home', destination: '/en', permanent: true },
      { source: '/ru/home', destination: '/ru', permanent: true },
    ]
  },
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'agrotech.elvs.dev',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
