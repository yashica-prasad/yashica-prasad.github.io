import type { NextConfig } from "next";

const repoName = "yashica-prasad.github.io";
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubActions ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "",
  assetPrefix: undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
