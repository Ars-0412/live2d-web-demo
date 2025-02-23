const { execSync } = require("child_process");
const fs = require("fs");

console.log("🔧 Live2D Web プロジェクトのエラー修正 & 実行スクリプト");

// ** Vite 開発サーバーを起動 **
function runVite() {
    try {
        console.log("🚀 Vite を実行中...");
        execSync("npx vite", { stdio: "inherit" });
    } catch (error) {
        console.error("❌ Vite の実行中にエラー発生:", error.message);
        fixErrors(error.message);
    }
}

// ** エラーメッセージを解析して修正 **
function fixErrors(errorMsg) {
    let fixed = false;

    if (errorMsg.includes("Live2DCubismCore is not defined")) {
        console.log("🛠 修正: Live2DCubismCore を import に追加");
        const mainTsPath = "src/main.ts";
        let mainTsCode = fs.readFileSync(mainTsPath, "utf8");

        if (!mainTsCode.includes('import "/live2dcubismcore.js";')) {
            mainTsCode = `import "/live2dcubismcore.js";\n` + mainTsCode;
            fs.writeFileSync(mainTsPath, mainTsCode);
            fixed = true;
        }
    }

    if (errorMsg.includes("Could not resolve './style.css'")) {
        console.log("🛠 修正: style.css を src に作成");
        const stylePath = "src/style.css";
        if (!fs.existsSync(stylePath)) {
            fs.writeFileSync(stylePath, "/* 自動生成されたスタイル */");
            fixed = true;
        }
    }

    if (errorMsg.includes("Failed to load resource: the server responded with a status of 404 (Not Found)")) {
        console.log("🛠 修正: favicon.ico を public に追加");
        const faviconPath = "public/favicon.ico";
        if (!fs.existsSync(faviconPath)) {
            fs.writeFileSync(faviconPath, ""); // 空のファイルを作成
            fixed = true;
        }
    }

    if (fixed) {
        console.log("✅ 修正完了！再度 Vite を実行します...");
        runVite();
    } else {
        console.log("⚠️ これ以上の自動修正はできません。手動でエラーを確認してください。");
    }
}

// ** 最初の実行 **
runVite();
