import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  assetsInclude: ["**/*.js", "**/*.wasm"],
  
  
  
  
  publicDir: "public",
  base: "/live2d-web-demo/",
          
  
  base: './',
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