import { defineConfig } from "vite";
import * as path from "path"; // 修正: "node:path" ではなく "path" を使用

export default defineConfig(({ command }) => ({
  assetsInclude: ["**/*.js", "**/*.wasm"],

  publicDir: "public",
  base: command === "build" ? "/live2d-web-demo/" : "./", // GitHub Pages では "/live2d-web-demo/"、ローカルでは "./"

  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html", // 修正: "src/main.ts" ではなく "index.html"
      output: {
        entryFileNames: "assets/[name].js",
      },
    },
  },

  resolve: {
    alias: {
      "@framework": path.resolve(process.cwd(), "Framework/src"), // 修正: "__dirname" の代わりに "process.cwd()"
    },
  },
}));
