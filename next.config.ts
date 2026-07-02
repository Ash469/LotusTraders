import type { NextConfig } from "next";
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    disable: false,
    register: true,
    skipWaiting: true,
});


// Define your regular Next.js configuration
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.lotustradersmachinery.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizeCss: {
      enableCriticalClientOnlyStyles: false,
    },
    optimizePackageImports: ['@mui/icons-material', 'react-icons']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {},
};
export default withPWA(nextConfig);