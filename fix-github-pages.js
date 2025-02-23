const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ファイルパス設定
const viteConfigPath = path.join(__dirname, "vite.config.mts");
const indexHtmlPath = path.join(__dirname, "index.html");
const mainTsPath = path.join(__dirname, "src", "main.ts");
const publicPath = path.join(__dirname, "public");
const live2dCorePath = path.join(__dirname, "Framework", "src", "Live2DCubismCore", "live2dcubismcore.js");
const targetLive2dCorePath = path.join(publicPath, "live2dcubismcore.js");

// 1️⃣ `vite.config.mts` の `base` を統一し、rollupOptions.external を設定
console.log("🔧 `vite.config.mts` の修正中...");
let viteConfig = fs.readFileSync(viteConfigPath, "utf8");

// `base` 設定を統一
viteConfig = viteConfig.replace(/base:\s*["'].*?["']/g, 'base: "/live2d-web-demo/"');

// `rollupOptions.external` に `live2dcubismcore.js` を追加
if (!viteConfig.includes("build.rollupOptions.external")) {
  viteConfig = viteConfig.replace(
    "defineConfig({",
    `defineConfig({
  build: {
    rollupOptions: {
      external: ["/live2d-web-demo/live2dcubismcore.js"]
    }
  },`
  );
}

fs.writeFileSync(viteConfigPath, viteConfig, "utf8");
console.log("✅ `vite.config.mts` を修正しました！");

// 2️⃣ `public` に `live2dcubismcore.js` をコピー
console.log("🔧 Live2DCubismCore.js を配置...");
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath, { recursive: true });
}

if (fs.existsSync(live2dCorePath)) {
  fs.copyFileSync(live2dCorePath, targetLive2dCorePath);
  console.log("✅ `live2dcubismcore.js` を `public/` にコピーしました！");
} else {
  console.log("⚠️ `live2dcubismcore.js` が見つかりません！");
}

// 3️⃣ `index.html` に `<script>` タグを追加
console.log("🔧 `index.html` の修正中...");
let indexHtml = fs.readFileSync(indexHtmlPath, "utf8");

if (!indexHtml.includes('<script src="/live2d-web-demo/live2dcubismcore.js"></script>')) {
  indexHtml = indexHtml.replace(
    "</body>",
    '  <script src="/live2d-web-demo/live2dcubismcore.js"></script>\n</body>'
  );
  fs.writeFileSync(indexHtmlPath, indexHtml, "utf8");
  console.log("✅ `index.html` に `live2dcubismcore.js` の `<script>` タグを追加しました！");
} else {
  console.log("⚠️ `index.html` は既に修正済みです！");
}

// 4️⃣ `main.ts` の `import` を削除 (CDN ロードに統一)
console.log("🔧 `main.ts` の修正中...");
let mainTs = fs.readFileSync(mainTsPath, "utf8");

if (mainTs.includes('import "/live2d-web-demo/live2dcubismcore.js";')) {
  mainTs = mainTs.replace('import "/live2d-web-demo/live2dcubismcore.js";\n', "");
  fs.writeFileSync(mainTsPath, mainTs, "utf8");
  console.log("✅ `main.ts` から `live2dcubismcore.js` の `import` を削除しました！");
} else {
  console.log("⚠️ `main.ts` は既に修正済みです！");
}

// 5️⃣ Vite ビルドを実行
console.log("🚀 Vite のビルドを実行中...");
try {
  execSync("npx vite build", { stdio: "inherit" });
  console.log("🎉 ビルドが完了しました！");
} catch (error) {
  console.error("❌ ビルドに失敗しました:", error);
  process.exit(1);
}

// 6️⃣ GitHub にプッシュ
console.log("🚀 GitHub にプッシュ中...");
try {
  execSync("git add . && git commit -m 'Fix GitHub Pages issues' && git push", { stdio: "inherit" });
  console.log("✅ GitHub にプッシュしました！");
} catch (error) {
  console.error("❌ GitHub へのプッシュに失敗しました:", error);
  process.exit(1);
}

console.log("🎉 修正スクリプトが完了しました！");
