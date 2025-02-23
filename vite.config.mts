import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  assetsInclude: ["**/*.js", "**/*.wasm"],
  publicDir: "public",
  base: "/live2d-web-demo/",
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
      "@framework": path.resolve(__dirname, "Framework/src"),
    },
  },
});
