import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  base: '/live2d-web-demo/', // ここを自分のリポジトリ名に変更
  resolve: {
    alias: {
      '@framework': path.resolve(__dirname, 'src/framework')
    }
  }
};

