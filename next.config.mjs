/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  transpilePackages: ["next-mdx-remote"],
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
        hostname: "www.subtitlesedit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.subtitlesedit.com",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
