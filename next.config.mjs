/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"]
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
