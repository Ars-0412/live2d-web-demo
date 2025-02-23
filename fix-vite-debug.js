const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("\n🔎 Vite ビルドデバッグスクリプトを実行中...\n");

// 1. プロジェクトのルートディレクトリを出力
console.log("📂 現在のプロジェクトディレクトリ:", __dirname);

// 2. `index.html` の存在チェック
const indexPath = path.join(__dirname, 'index.html');
if (!fs.existsSync(indexPath)) {
    console.error("❌ `index.html` が見つかりません！");
} else {
    console.log("✅ `index.html` が存在します。");
}

// 3. `src/main.ts` の存在チェック
const mainTsPath = path.join(__dirname, 'src', 'main.ts');
if (!fs.existsSync(mainTsPath)) {
    console.error("❌ `src/main.ts` が見つかりません！");
} else {
    console.log("✅ `src/main.ts` が存在します。");
}

// 4. `vite.config.mts` の存在チェック
const viteConfigPath = path.join(__dirname, 'vite.config.mts');
if (!fs.existsSync(viteConfigPath)) {
    console.error("❌ `vite.config.mts` が見つかりません！");
} else {
    console.log("✅ `vite.config.mts` が存在します。");
}

// 5. `dist/assets/main.js` が出力されているかチェック
const distMainJsPath = path.join(__dirname, 'dist', 'assets', 'main.js');
if (!fs.existsSync(distMainJsPath)) {
    console.error("❌ `dist/assets/main.js` がビルドされていません！");
} else {
    console.log("✅ `dist/assets/main.js` が存在します。");
}

// 6. `index.html` 内の `<script>` タグが正しいかチェック
if (fs.existsSync(indexPath)) {
    let indexHtml = fs.readFileSync(indexPath, 'utf8');
    if (indexHtml.includes('<script type="module" src="./dist/assets/main.js">')) {
        console.log("✅ `index.html` の `<script>` タグは正しく設定されています。");
    } else {
        console.error("❌ `index.html` の `<script>` タグが正しくありません！");
    }
}

// 7. Vite の環境変数を確認
console.log("\n🌍 環境変数 (Vite の PATH を含む) をチェック...");
console.log(process.env.PATH.split(';').filter(p => p.includes('npm') || p.includes('node')).join('\n'));

// 8. Vite のバージョンを取得
try {
    const viteVersion = execSync('npx vite --version').toString().trim();
    console.log(`✅ Vite のバージョン: ${viteVersion}`);
} catch (error) {
    console.error("❌ Vite が正しくインストールされていない可能性があります。");
}

// 9. Vite のビルドコマンドを試す (エラーが出るか確認)
console.log("\n🚀 Vite のビルドを試行中...");
try {
    execSync('npx vite build --mode development', { stdio: 'inherit' });
    console.log("✅ Vite のビルドが成功しました！");
} catch (error) {
    console.error("❌ Vite のビルドに失敗しました！");
}

console.log("\n🔍 デバッグ完了！結果を確認してください。\n");
