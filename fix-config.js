const fs = require('fs');
const path = require('path');

console.log('🔧 Vite 設定修正スクリプトを実行中...');

// `vite.config.mts` の修正
const viteConfigPath = path.join(__dirname, 'vite.config.mts');
if (fs.existsSync(viteConfigPath)) {
    let viteConfig = `
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@framework': path.resolve(__dirname, 'Framework/src')
    }
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.ts')
      },
      output: {
        entryFileNames: "assets/[name].js"
      }
    }
  }
});
    `;
    fs.writeFileSync(viteConfigPath, viteConfig, 'utf8');
    console.log('✅ vite.config.mts を修正しました');
} else {
    console.log('⚠️ vite.config.mts が見つかりません');
}

// `index.html` の `<script>` タグ修正
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
    let indexHtml = fs.readFileSync(indexPath, 'utf8');
    
    // `src/main.ts` を正しく参照するように修正
    indexHtml = indexHtml.replace(
        /<script type="module" src=".*"><\/script>/g,
        '<script type="module" src="./src/main.ts"></script>'
    );

    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log('✅ index.html の <script> タグを修正しました');
} else {
    console.log('⚠️ index.html が見つかりません');
}

console.log('🎉 修正が完了しました！');
