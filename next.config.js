/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/roadmap", destination: "/", permanent: false },
      { source: "/how-we-research", destination: "/blog", permanent: false },
      { source: "/alternatives", destination: "/", permanent: false },
      { source: "/tools", destination: "/", permanent: false },
      { source: "/tools/:path*", destination: "/", permanent: false },
    ];
  },
};
module.exports = nextConfig;
