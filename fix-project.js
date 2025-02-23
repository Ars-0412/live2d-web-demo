const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ログ出力用関数
function log(message) {
    console.log(`> ${message}`);
}

// 1. 不要なファイルの削除
function cleanUp() {
    const filesToDelete = [
        'fix-github-pages.js',
        'fix-github.js',
        'fix-live2d-core.js',
        'fix-live2d.js',
        'fix-vite-build.js',
        'fix-vite-config.js',
        'fix-vite-debug.js',
        'fix-vite-project.js',
        'fix_errors.js',
        'copy_resources.js'
    ];

    filesToDelete.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            log(`削除しました: ${file}`);
        }
    });
}

// 2. vite.config.mts の修正
function fixViteConfig() {
    const viteConfigPath = path.join(__dirname, 'vite.config.mts');
    if (fs.existsSync(viteConfigPath)) {
        let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');

        // 重複する "base" キーと "build" キーを削除
        const basePattern = /base: ".*",\s*/g;
        const buildPattern = /build: \{[\s\S]*?\},\s*/g;
        viteConfig = viteConfig.replace(basePattern, '');
        viteConfig = viteConfig.replace(buildPattern, '');

        // 正しい設定を追加
        const insertIndex = viteConfig.indexOf('resolve: {');
        const newConfig = `
  base: "/live2d-web-demo/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
      output: {
        entryFileNames: "assets/[name].js"
      }
    }
  },`;
        viteConfig = viteConfig.slice(0, insertIndex) + newConfig + viteConfig.slice(insertIndex);

        fs.writeFileSync(viteConfigPath, viteConfig, 'utf8');
        log('vite.config.mts を修正しました！');
    } else {
        log('vite.config.mts が見つかりません！');
    }
}

// 3. live2dcubismcore.js の配置
function copyLive2DCubismCore() {
    const sourcePath = path.join(__dirname, 'Core', 'Live2DCubismCore', 'live2dcubismcore.js');
    const destDir = path.join(__dirname, 'public');
    const destPath = path.join(destDir, 'live2dcubismcore.js');

    if (fs.existsSync(sourcePath)) {
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
        }
        fs.copyFileSync(sourcePath, destPath);
        log('live2dcubismcore.js を public/ にコピーしました！');
    } else {
        log('live2dcubismcore.js が見つかりません！');
    }
}

// 4. index.html の修正
function fixIndexHtml() {
    const indexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexPath)) {
        let indexHtml = fs.readFileSync(indexPath, 'utf8');

        // live2dcubismcore.js のスクリプトタグを追加
        if (!indexHtml.includes('live2dcubismcore.js')) {
            const scriptTag = '<script src="/live2dcubismcore.js"></script>';
            indexHtml = indexHtml.replace('</head>', `  ${scriptTag}\n</head>`);
            fs.writeFileSync(indexPath, indexHtml, 'utf8');
            log('index.html に live2dcubismcore.js の <script> タグを追加しました！');
        } else {
            log('index.html は既に修正済みです！');
        }
    } else {
        log('index.html が見つかりません！');
    }
}

// 5. main.ts の修正
function fixMainTs() {
    const mainTsPath = path.join(__dirname, 'src', 'main.ts');
    if (fs.existsSync(mainTsPath)) {
        let mainTs = fs.readFileSync(mainTsPath, 'utf8');

        // live2dcubismcore.js のインポートを削除
        const importPattern = /import .*live2dcubismcore.*;\s*/g;
        if (importPattern.test(mainTs)) {
            mainTs = mainTs.replace(importPattern, '');
            fs.writeFileSync(mainTsPath, mainTs, 'utf8');
            log('main.ts から live2dcubismcore.js の import を削除しました！');
        } else {
            log('main.ts は既に修正済みです！');
        }
    } else {
        log('main.ts が見つかりません！');
    }
}

// 6. Vite のビルド実行
function buildProject() {
    try {
        log('Vite のビルドを実行中...');
        execSync('npx vite build', { stdio: 'inherit' });
        log('ビルドが成功しました！');
    } catch (error) {
        log('ビルドに失敗しました。エラーメッセージ:');
        console.error(error.message);
    }
}

// スクリプトの実行
cleanUp();
fixViteConfig();
copyLive2DCubismCore();
fixIndexHtml();
fixMainTs();
buildProject();