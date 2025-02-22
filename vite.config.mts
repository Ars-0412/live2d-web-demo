import path from 'path';

const _filename = new URL(import.meta.url).pathname;
const _dirname = path.dirname(_filename);

export default {
  base: '/live2d-web-demo/', // GitHub Pages 用にリポジトリ名と一致させる
  resolve: {
    alias: {
      '@framework': path.resolve(_dirname, 'src/framework')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: '',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
};
