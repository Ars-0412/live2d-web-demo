const fs = require('fs');
const path = require('path');

// 修正対象のファイル
const indexHtmlPath = path.join(__dirname, 'index.html');
const tsconfigPath = path.join(__dirname, 'tsconfig.json');
const viteConfigPath = path.join(__dirname, 'vite.config.mts');

// 1. index.html の <script> タグを修正
if (fs.existsSync(indexHtmlPath)) {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    // live2dcubismcore.js に type="module" を追加
    indexHtml = indexHtml.replace('<script src="./Core/live2dcubismcore.js">', '<script type="module" src="./Core/live2dcubismcore.js">');
    // main.js に type="module" を追加
    indexHtml = indexHtml.replace('<script src="./main.js">', '<script type="module" src="./main.js">');
    
    if (!indexHtml.includes('<script type="module" src="Core/live2dcubismcore.js"></script>')) {
        indexHtml = indexHtml.replace('</body>', '<script type="module" src="Core/live2dcubismcore.js"></script>\n</body>');
    }
    
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    console.log('✅ index.html 修正完了');
} else {
    console.log('⚠️ index.html が見つかりません');
}

// 2. tsconfig.json の paths を修正
if (fs.existsSync(tsconfigPath)) {
    let tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    tsconfig.compilerOptions.paths = {
        "@framework/*": ["Framework/src/*"],
        "Live2DCubismCore": ["./Core/Live2DCubismCore/live2dcubismcore"]
    };
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf8');
    console.log('✅ tsconfig.json 修正完了');
} else {
    console.log('⚠️ tsconfig.json が見つかりません');
}

// 3. vite.config.mts の rollupOptions を追加
if (fs.existsSync(viteConfigPath)) {
    let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
    if (!viteConfig.includes('rollupOptions')) {
        viteConfig += '\nexport default defineConfig({\n  build: {\n    rollupOptions: { output: { format: "es" } }\n  }\n});\n';
        fs.writeFileSync(viteConfigPath, viteConfig, 'utf8');
        console.log('✅ vite.config.mts 修正完了');
    } else {
        console.log('✅ vite.config.mts はすでに修正済み');
    }
} else {
    console.log('⚠️ vite.config.mts が見つかりません');
}

console.log('🚀 修正完了！手動で `npm run build` を実行してください');