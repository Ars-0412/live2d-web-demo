import { defineConfig } from "vite";
import path from "node:path"; // "path" の代わりに "node:path" を使う

export default defineConfig(({ command }) => ({
  assetsInclude: ["**/*.js", "**/*.wasm"],
  publicDir: "public",
  base: command === "build" ? "/live2d-web-demo/" : "./", // GitHubでは"/live2d-web-demo/"、ローカルでは"./"
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
      output: {
        entryFileNames: "assets/[name].js",
      },
    },
  },
  resolve: {
    alias: {
      "@framework": path.resolve(process.cwd(), "Framework/src"), // __dirname の代わりに process.cwd() を使う
    },
  },
}));
