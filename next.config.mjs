/ @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // پذیرش هر hostname
      },
    ],
  },
};

export default nextConfig;