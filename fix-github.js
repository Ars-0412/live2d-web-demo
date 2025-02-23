const fs = require("fs");
const path = require("path");

console.log("🔧 GitHub Pages 向けの修正を開始...");

// ** Step 1: live2dcubismcore.js を public にコピー **
const corePath = "Framework/src/Live2DCubismCore/live2dcubismcore.js";
const publicPath = "public/live2dcubismcore.js";

if (!fs.existsSync(publicPath)) {
    if (fs.existsSync(corePath)) {
        fs.copyFileSync(corePath, publicPath);
        console.log("✅ live2dcubismcore.js を public/ にコピーしました！");
    } else {
        console.error("❌ Framework/src/Live2DCubismCore/live2dcubismcore.js が見つかりません！");
        process.exit(1);
    }
}

// ** Step 2: vite.config.mts の修正 **
const viteConfigPath = "vite.config.mts";
let viteConfig = fs.readFileSync(viteConfigPath, "utf8");

if (!viteConfig.includes('assetsInclude: ["**/*.js"]')) {
    viteConfig = viteConfig.replace(
        "export default defineConfig({",
        `export default defineConfig({
          assetsInclude: ["**/*.js"],`
    );
    fs.writeFileSync(viteConfigPath, viteConfig);
    console.log("✅ vite.config.mts に assetsInclude を追加しました！");
}

// ** Step 3: index.html のパス修正 **
const indexPath = "index.html";
let indexHtml = fs.readFileSync(indexPath, "utf8");

if (!indexHtml.includes('<script src="/live2d-web-demo/live2dcubismcore.js"></script>')) {
    indexHtml = indexHtml.replace(
        "</head>",
        '    <script src="/live2d-web-demo/live2dcubismcore.js"></script>\n</head>'
    );
    fs.writeFileSync(indexPath, indexHtml);
    console.log("✅ index.html に GitHub Pages 用のパスを追加しました！");
}

// ** Step 4: Vite のビルドを再実行 **
console.log("🚀 Vite のビルドを実行中...");
const { execSync } = require("child_process");
execSync("npx vite build", { stdio: "inherit" });

console.log("🎉 修正スクリプトが完了しました！ GitHub にプッシュして、再度確認してください！");
