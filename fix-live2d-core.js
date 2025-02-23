const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// プロジェクトのルート
const projectRoot = __dirname;

// Live2DCubismCore.js の元のパス
const coreJsPath = path.join(projectRoot, 'Framework', 'src', 'Live2DCubismCore', 'live2dcubismcore.js');

// public/ にコピーするパス
const publicPath = path.join(projectRoot, 'public');

// public/live2dcubismcore.js のパス
const publicCoreJsPath = path.join(publicPath, 'live2dcubismcore.js');

console.log('🔧 Live2D Cubism Core の修正を開始...');

// public フォルダがない場合は作成
if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
    console.log('✅ public/ フォルダを作成しました');
}

// Live2DCubismCore.js を public/ にコピー
if (fs.existsSync(coreJsPath)) {
    fs.copyFileSync(coreJsPath, publicCoreJsPath);
    console.log(`✅ ${coreJsPath} を public/ にコピーしました`);
} else {
    console.error(`❌ ${coreJsPath} が見つかりません！手動で確認してください`);
    process.exit(1);
}

// src/main.ts に import "/live2dcubismcore.js"; を追加
const mainTsPath = path.join(projectRoot, 'src', 'main.ts');
if (fs.existsSync(mainTsPath)) {
    let mainTsContent = fs.readFileSync(mainTsPath, 'utf8');
    
    // すでに import されていない場合のみ追加
    if (!mainTsContent.includes('import "/live2dcubismcore.js";')) {
        mainTsContent = `import "/live2dcubismcore.js";\n` + mainTsContent;
        fs.writeFileSync(mainTsPath, mainTsContent, 'utf8');
        console.log('✅ src/main.ts に Live2DCubismCore の import を追加しました');
    } else {
        console.log('✅ src/main.ts にはすでに Live2DCubismCore の import が追加されています');
    }
} else {
    console.error('❌ src/main.ts が見つかりません！手動で確認してください');
    process.exit(1);
}

// Vite のビルドを実行
console.log('🚀 Vite のビルドを実行中...');
try {
    execSync('npx vite build', { stdio: 'inherit' });
    console.log('🎉 ビルドが完了しました！');
} catch (error) {
    console.error('❌ Vite のビルドに失敗しました:', error);
    process.exit(1);
}

console.log('✅ 修正スクリプトが完了しました！');
