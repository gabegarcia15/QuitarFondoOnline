import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "eliminarfondodeunaimagen.com" }],
        destination: "https://www.eliminarfondodeunaimagen.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
