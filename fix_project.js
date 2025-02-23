const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. TypeScript のインストール・更新
try {
    console.log('📦 TypeScript をインストール・更新中...');
    execSync('npm install typescript@latest --save-dev', { stdio: 'inherit' });
    console.log('✅ TypeScript を更新しました');
} catch (error) {
    console.error('❌ TypeScript のインストールに失敗しました:', error);
}

// 2. tsconfig.json の修正
const tsconfigPath = path.join(__dirname, 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
    let tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    tsconfig.compilerOptions = tsconfig.compilerOptions || {};
    tsconfig.compilerOptions.outDir = "dist";
    tsconfig.compilerOptions.baseUrl = "./";
    tsconfig.compilerOptions.paths = {
        "@framework/*": ["Framework/src/*"],
        "Live2DCubismCore": ["./Core/Live2DCubismCore/live2dcubismcore"]
    };
    tsconfig.compilerOptions.lib = ["ES2020", "DOM"];
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf8');
    console.log('✅ tsconfig.json を修正しました');
} else {
    console.log('⚠️ tsconfig.json が見つかりません');
}

// 3. vite.config.mts の修正
const viteConfigPath = path.join(__dirname, 'vite.config.mts');
if (fs.existsSync(viteConfigPath)) {
    let viteConfig = `import { defineConfig } from 'vite';
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
      input: "src/main.ts",
      output: {
        entryFileNames: "assets/[name].js"
      }
    }
  }
});`;
    fs.writeFileSync(viteConfigPath, viteConfig, 'utf8');
    console.log('✅ vite.config.mts を修正しました');
} else {
    console.log('⚠️ vite.config.mts が見つかりません');
}

// 4. index.html の <script> タグを修正
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
    let indexHtml = fs.readFileSync(indexPath, 'utf8');
    indexHtml = indexHtml.replace('<script src="./main.js">', '<script type="module" src="./dist/assets/main.js">');
    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log('✅ index.html の <script> タグを修正しました');
} else {
    console.log('⚠️ index.html が見つかりません');
}

// 5. Vite キャッシュ削除
const viteCachePath = path.join(__dirname, 'node_modules', '.vite');
if (fs.existsSync(viteCachePath)) {
    try {
        fs.rmSync(viteCachePath, { recursive: true, force: true });
        console.log('✅ Vite キャッシュを削除しました');
    } catch (error) {
        console.error('❌ Vite キャッシュの削除に失敗しました:', error);
    }
} else {
    console.log('⚠️ Vite キャッシュは存在しません');
}

// 6. TypeScript のモジュール解決チェック
try {
    console.log('🛠 TypeScript のモジュール解決を確認中...');
    execSync('tsc --traceResolution', { stdio: 'inherit' });
} catch (error) {
    console.error('❌ TypeScript のコンパイルに失敗しました:', error);
}

// 7. node_modules を削除して再インストール
try {
    console.log('🔄 node_modules を削除して再インストール中...');
    execSync('taskkill /f /im node.exe', { stdio: 'ignore' });
    execSync('taskkill /f /im npm.exe', { stdio: 'ignore' });
    fs.chmodSync(path.join(__dirname, 'node_modules', '@esbuild', '.win32-x64-VDYxmlLW', 'esbuild.exe'), '0666');
    fs.rmSync(path.join(__dirname, 'node_modules'), { recursive: true, force: true });
    fs.rmSync(path.join(__dirname, 'package-lock.json'), { force: true });
    execSync('npm install -g vite', { stdio: 'inherit' });
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ node_modules を再インストールしました');
} catch (error) {
    console.error('❌ node_modules の再インストールに失敗しました:', error);
}

// 8. Vite ビルド実行
try {
    console.log('🚀 Vite のビルドを実行中...');
    execSync('npx vite build --mode development', { stdio: 'inherit' });
    console.log('✅ Vite のビルドが完了しました');
} catch (error) {
    console.error('❌ Vite のビルドに失敗しました:', error);
}

console.log('🎉 修正 & ビルド処理が完了しました！');
