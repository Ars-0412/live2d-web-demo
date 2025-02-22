import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  resolve: {
    alias: {
      '@framework': path.resolve(__dirname, 'Framework/src'),
      'Live2DCubismCore': path.resolve(__dirname, 'Framework/src/Live2DCubismCore/live2dcubismcore')
    }
  }
};
