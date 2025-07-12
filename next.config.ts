import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.lotustradersmachinery.com'],
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
    optimizePackageImports: ['@mui/icons-material', 'react-icons'],
    turbo: {
      resolveAlias: {
        '@/*': './src/*'
      }
    }
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (err: any) => {
    console.error('Next.js build error:', err);
  },
  webpack: (config, { dev, isServer }) => {
    // Only run CSS optimization in production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization?.splitChunks,
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
