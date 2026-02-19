import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "quitarfondoonline.com" }],
        destination: "https://www.quitarfondoonline.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
