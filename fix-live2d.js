const { execSync } = require("child_process");
const fs = require("fs");

console.log("🔧 Live2D Cubism Core の修正を開始...");

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

// ** Step 2: index.html に <script> タグを追加 **
const indexPath = "index.html";
let indexHtml = fs.readFileSync(indexPath, "utf8");

if (!indexHtml.includes('<script src="/live2dcubismcore.js"></script>')) {
    indexHtml = indexHtml.replace("</head>", '    <script src="/live2dcubismcore.js"></script>\n</head>');
    fs.writeFileSync(indexPath, indexHtml);
    console.log("✅ index.html に <script> タグを追加しました！");
}

// ** Step 3: main.ts に import を追加 **
const mainTsPath = "src/main.ts";
let mainTsCode = fs.readFileSync(mainTsPath, "utf8");

if (!mainTsCode.includes('import "/live2dcubismcore.js";')) {
    mainTsCode = `import "/live2dcubismcore.js";\n` + mainTsCode;
    fs.writeFileSync(mainTsPath, mainTsCode);
    console.log("✅ main.ts に import を追加しました！");
}

// ** Step 4: Vite のビルドを再実行 **
console.log("🚀 Vite のビルドを実行中...");
execSync("npx vite build", { stdio: "inherit" });

console.log("🎉 修正スクリプトが完了しました！ 再度ブラウザで確認してください！");
