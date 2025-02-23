// 🔹 Step 5: GitHub にプッシュ
function pushToGitHub() {
    console.log("🚀 GitHub にプッシュ中...");
    try {
        execSync("git add .", { stdio: "inherit" });
        execSync('git commit -m "Fix GitHub Pages issues"', { stdio: "inherit" });
        execSync("git push --set-upstream origin main", { stdio: "inherit" });
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
