import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ["/live2d-web-demo/live2dcubismcore.js"]
    }
  },
  assetsInclude: ["**/*.js", "**/*.wasm"],
  
  
  
  
  publicDir: "public",
  base: "/live2d-web-demo/",
          
  
  base: "/live2d-web-demo/",
  resolve: {
    alias: {
      '@framework': path.resolve(__dirname, 'Framework/src')
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        entryFileNames: 'assets/[name].js'
      }
    }
  }
});