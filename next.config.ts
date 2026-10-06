import type { NextConfig } from "next";
import { shortLinks } from "./src/data/shortLinks";

const nextConfig: NextConfig = {
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  // Short links like minianon.in/resume, minianon.in/chai (see src/data/shortLinks.ts)
  async redirects() {
    return Object.entries(shortLinks).map(([key, destination]) => ({
      source: `/${key}`,
      destination,
      permanent: false,
    }));
  },
};

export default nextConfig;