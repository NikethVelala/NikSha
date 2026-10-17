import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "/**", search: "" },
      // Refresh the three replaced story photos without renaming the supplied assets.
      ...["03-ten-became-four", "04a-charminar", "04c-kayaking"].map((name) => ({
        pathname: `/images/story/${name}.webp`, search: "?v=2",
      })),
    ],
  },
};

export default nextConfig;
