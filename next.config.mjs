/** @type {import('next').NextConfig} */
const nextConfig = {
  config: {
    turbopack: {
      rules: {
        '*.mp4': {
          loaders: ['file-loader'],
        },
      },
    },
  },
};

export default nextConfig;
