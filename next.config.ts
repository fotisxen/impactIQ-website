import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Silences a Turbopack warning: it detects a stray package-lock.json up in
  // the user's home folder (unrelated to this project) and needs telling
  // explicitly where this project's own root actually is.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
