import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  base: '/live2d-web-demo/', // 必ずリポジトリ名と一致させる
  resolve: {
    alias: {
      '@framework': path.resolve(__dirname, 'src/framework')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    mimeTypes: {
      'ts': 'application/javascript'
    }
  }
};
