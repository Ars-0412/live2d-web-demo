const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Vite 設定ファイル
const viteConfigPath = path.join(__dirname, "vite.config.mts");

// 修正ループの最大回数
const MAX_RETRIES = 5;
let retryCount = 0;

console.log("🔧 GitHub Pages 向けの修正を開始...");

// 🔹 Step 1: vite.config.mts の修正
function fixViteConfig() {
    console.log("✅ vite.config.mts の修正中...");
    let viteConfig = fs.readFileSync(viteConfigPath, "utf-8");

    // `base` の設定を修正
    if (!viteConfig.includes(`base: "/live2d-web-demo/"`)) {
        viteConfig = viteConfig.replace(
            "export default defineConfig({",
            `export default defineConfig({\n  base: "/live2d-web-demo/",`
        );
    }

    // `publicDir` の設定を追加
    if (!viteConfig.includes("publicDir:")) {
        viteConfig = viteConfig.replace(
            "export default defineConfig({",
            `export default defineConfig({\n  publicDir: "public",`
        );
    }

    // 重複する `assetsInclude` を削除して修正
    viteConfig = viteConfig.replace(/assetsInclude: \[.*?\],/gs, "");
    viteConfig = viteConfig.replace(
        "export default defineConfig({",
        `export default defineConfig({\n  assetsInclude: ["**/*.js", "**/*.wasm"],`
    );

    fs.writeFileSync(viteConfigPath, viteConfig);
    console.log("✅ vite.config.mts を修正しました！");
}

// 🔹 Step 2: Live2D Cubism Core の修正
function fixLive2DCubismCore() {
    console.log("✅ Live2DCubismCore の配置を修正中...");

    const corePath = path.join(__dirname, "Framework", "src", "Live2DCubismCore", "live2dcubismcore.js");
    const publicPath = path.join(__dirname, "public", "live2dcubismcore.js");

    if (fs.existsSync(corePath)) {
        fs.copyFileSync(corePath, publicPath);
        console.log("✅ live2dcubismcore.js を public/ にコピーしました！");
    } else {
        console.error("⚠️ live2dcubismcore.js が見つかりません！");
    }
}

// 🔹 Step 3: `index.html` の修正
function fixIndexHtml() {
    console.log("✅ index.html の修正中...");
    const indexPath = path.join(__dirname, "index.html");
    let indexHtml = fs.readFileSync(indexPath, "utf-8");

    // `<script>` のパスを `/live2d-web-demo/live2dcubismcore.js` に修正
    indexHtml = indexHtml.replace(
        `src="live2dcubismcore.js"`,
        `src="/live2d-web-demo/live2dcubismcore.js"`
    );

    fs.writeFileSync(indexPath, indexHtml);
    console.log("✅ index.html の修正が完了しました！");
}

// 🔹 Step 4: ビルドを実行
function buildProject() {
    console.log("🚀 Vite のビルドを実行中...");
    try {
        execSync("npx vite build", { stdio: "inherit" });
        console.log("🎉 ビルドが完了しました！");
    } catch (error) {
        console.error("❌ ビルドに失敗しました:", error);
    }
}

// 🔹 Step 5: GitHub にプッシュ
function pushToGitHub() {
    console.log("🚀 GitHub にプッシュ中...");
    try {
        execSync("git add . && git commit -m 'Fix GitHub Pages issues' && git push", { stdio: "inherit" });
        console.log("✅ GitHub に修正をプッシュしました！");
    } catch (error) {
        console.error("❌ GitHub へのプッシュに失敗しました:", error);
    }
}

// 🔹 Step 6: 自動修正ループ
function autoFix() {
    while (retryCount < MAX_RETRIES) {
        console.log(`🔄 修正試行 ${retryCount + 1}/${MAX_RETRIES} 回目...`);
        fixViteConfig();
        fixLive2DCubismCore();
        fixIndexHtml();
        buildProject();
        pushToGitHub();

        console.log("⌛ 反映待ち... (約10秒後に再試行)");

        retryCount++;
        execSync("timeout 10", { stdio: "inherit" }); // 10秒待機

        console.log(`🔄 再試行: ${retryCount} 回目`);
    }
    console.log("🚀 修正スクリプトが完了しました！");
}

// スクリプト実行
autoFix();
