const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Vite ビルド修正スクリプトを実行中...');

const projectDir = __dirname;
const indexPath = path.join(projectDir, 'index.html');
const viteConfigPath = path.join(projectDir, 'vite.config.mts');
const distPath = path.join(projectDir, 'dist');
const mainTsPath = path.join(projectDir, 'src', 'main.ts');

// 1️⃣ `index.html` の確認と修正
if (fs.existsSync(indexPath)) {
    let indexHtml = fs.readFileSync(indexPath, 'utf8');

    if (!indexHtml.includes('<script type="module" src="./dist/assets/main.js"></script>')) {
        indexHtml = indexHtml.replace(
            /<script.*?src=.*?><\/script>/g,
            '<script type="module" src="./dist/assets/main.js"></script>'
        );
        fs.writeFileSync(indexPath, indexHtml, 'utf8');
        console.log('✅ `index.html` の `<script>` タグを修正しました。');
    } else {
        console.log('✅ `index.html` は正しい形式です。');
    }
} else {
    console.error('❌ `index.html` が見つかりません！');
}

// 2️⃣ `vite.config.mts` の修正
const viteConfigContent = `import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: ".",
  resolve: {
    alias: {
      '@framework': path.resolve(__dirname, 'Framework/src')
    }
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
      output: {
        entryFileNames: "assets/main.js"
      }
    }
  }
});
`;

fs.writeFileSync(viteConfigPath, viteConfigContent, 'utf8');
console.log('✅ `vite.config.mts` を修正しました。');

// 3️⃣ `dist` フォルダを削除
if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
    console.log('✅ `dist` フォルダを削除しました。');
} else {
    console.log('⚠️ `dist` フォルダは存在しません。');
}

// 4️⃣ `src/main.ts` の存在確認
if (!fs.existsSync(mainTsPath)) {
    console.error('❌ `src/main.ts` が見つかりません！Vite はビルドできません。');
    process.exit(1);
}
console.log('✅ `src/main.ts` を確認しました。');

// 5️⃣ Vite のビルド実行
try {
    console.log('🚀 Vite のビルドを実行中...');
    execSync('npx vite build --mode development', { stdio: 'inherit' });
    console.log('✅ Vite のビルドが完了しました！');
} catch (error) {
    console.error('❌ Vite のビルドに失敗しました:', error);
    process.exit(1);
}

// 6️⃣ `dist/assets/main.js` の確認
const builtFilePath = path.join(distPath, 'assets', 'main.js');
if (fs.existsSync(builtFilePath)) {
    console.log('🎉 ビルド成功！`dist/assets/main.js` が作成されました。');
} else {
    console.error('❌ `dist/assets/main.js` が見つかりません！ビルドが失敗した可能性があります。');
    process.exit(1);
}
