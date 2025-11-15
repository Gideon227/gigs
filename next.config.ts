/** @type {import('next').NextConfig} */

import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  compress: true,
  swcMinify: true,

  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production',
  // },
  compiler: { removeConsole: false },

  optimizeFonts: true,

  async rewrites() {
    return [
      {
        source: "/blog",
        destination: "https://uximjvcbkz.blogbowl.app",
      },
      {
        source: "/blog/:any*",
        destination: "https://uximjvcbkz.blogbowl.app/:any*",
      },
    ];
  },
};

// export with sentry wrapper
export default withSentryConfig(nextConfig, {
  org: "gideon-3p",
  project: "gigs-tech",

  silent: !process.env.CI,

  widenClientFileUpload: true,

  tunnelRoute: "/monitoring",

  disableLogger: true,

  automaticVercelMonitors: true,
});
