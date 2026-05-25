import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.230"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "va3exm7mqa.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
