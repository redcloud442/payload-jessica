import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */

const nextConfig = {
  // Your Next.js config here

  images: {
    domains: ["picsum.photos", "placehold.co", "media.jessicalleonablog.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
    serverComponentsExternalPackages: [
      'fluent-ffmpeg',
      '@ffmpeg-installer/ffmpeg',
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.ignoreWarnings = [
      w =>
        typeof w.message === 'string' &&
        w.message.includes('Critical dependency')
    ]
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };

    return webpackConfig;
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
