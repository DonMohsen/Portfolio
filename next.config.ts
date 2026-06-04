import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all hostnames
        port: "", // Leave blank to allow all ports
        pathname: "**", // Allow all paths
      },
    ],
  },
 
};

export default withNextIntl(nextConfig);