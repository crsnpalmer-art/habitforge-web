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
  outputFileTracingIncludes: {
    "/blog/\\[slug\\]": ["./content/posts/**/*"],
  },
  outputFileTracingExcludes: {
    "/**": [
      "./public/**/*.mp4",
      "./public/**/*.png",
      "./public/**/*.jpg",
      "./trailer/**/*",
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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
