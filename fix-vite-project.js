const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("🔧 Live2D Web プロジェクトの修正を開始...");

const publicDir = path.join(__dirname, 'public');
const assetsDir = path.join(__dirname, 'src', 'assets');
const live2DCorePath = path.join(assetsDir, 'Live2DCubismCore.js');
const publicLive2DCorePath = path.join(publicDir, 'Live2DCubismCore.js');
const viteConfigPath = path.join(__dirname, 'vite.config.mts');
const indexHtmlPath = path.join(__dirname, 'index.html');
const faviconPath = path.join(publicDir, 'favicon.ico');

// 1. Live2DCubismCore.js を public にコピー
if (fs.existsSync(live2DCorePath) && !fs.existsSync(publicLive2DCorePath)) {
    fs.copyFileSync(live2DCorePath, publicLive2DCorePath);
    console.log("✅ Live2DCubismCore.js を public フォルダにコピーしました");
} else if (!fs.existsSync(live2DCorePath)) {
    console.log("⚠️ Live2DCubismCore.js が見つかりません！");
}

// 2. vite.config.mts に assetsInclude を追加
if (fs.existsSync(viteConfigPath)) {
    let configContent = fs.readFileSync(viteConfigPath, 'utf8');
    if (!configContent.includes('assetsInclude')) {
        configContent = configContent.replace(/export default defineConfig\({/, `export default defineConfig({\n  assetsInclude: [\"**/*.js\", \"**/*.wasm\"],`);
        fs.writeFileSync(viteConfigPath, configContent, 'utf8');
        console.log("✅ vite.config.mts に assetsInclude を追加しました");
    } else {
        console.log("✅ vite.config.mts は既に修正済みです");
    }
} else {
    console.log("⚠️ vite.config.mts が見つかりません");
}

// 3. favicon.ico を確認、無ければ index.html から削除
if (!fs.existsSync(faviconPath)) {
    if (fs.existsSync(indexHtmlPath)) {
        let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
        indexHtml = indexHtml.replace(/<link rel=\"icon\".*?>/g, '');
        fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
        console.log("✅ favicon.ico の参照を index.html から削除しました");
    } else {
        console.log("⚠️ index.html が見つかりません");
    }
} else {
    console.log("✅ favicon.ico は存在しています");
}

// 4. Vite のビルドを実行
try {
    console.log("🚀 Vite のビルドを実行中...");
    execSync('npx vite build', { stdio: 'inherit' });
    console.log("🎉 ビルドが完了しました！");
} catch (error) {
    console.error("❌ Vite のビルドに失敗しました！", error);
}

console.log("✅ 修正スクリプトが完了しました！");
