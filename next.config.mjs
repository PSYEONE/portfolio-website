/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.mp4': {
          loaders: ['file-loader'],
        },
      },
    },
  },
};

export default nextConfig;
