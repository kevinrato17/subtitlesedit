/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  transpilePackages: ["next-mdx-remote"],
  async redirects() {
    return [
      {
        source: "/meet-subtitles-edit-your-free-online-subtitle-toolkit",
        destination: "/",
        permanent: true,
      },
      {
        source: "/srt-vs-vtt-format-whats-the-difference-and-which-should-you-use",
        destination:
          "/blog/srt-vs-vtt-format-whats-the-difference-and-which-should-you-use",
        permanent: true,
      },
      {
        source: "/srt-vs-vtt",
        destination:
          "/blog/srt-vs-vtt-format-whats-the-difference-and-which-should-you-use",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "subtitlesedit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "subtitlesedit.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "subtitlesedit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "subtitlesedit.com",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
