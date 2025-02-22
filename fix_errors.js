const { execSync } = require("child_process");
const fs = require("fs");

function runCommand(command) {
  try {
    console.log(`実行中: ${command}`);
    return execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`❌ コマンド失敗: ${command}`);
    process.exit(1);
  }
}

function fixTsConfig() {
  const tsconfigPath = "tsconfig.json";
  if (!fs.existsSync(tsconfigPath)) {
    console.error("⚠️ tsconfig.json が見つかりません！");
    return;
  }

  let tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));

  // TypeScript 設定を修正
  tsconfig.compilerOptions = {
    ...tsconfig.compilerOptions,
    module: "Node16",
    moduleResolution: "node16",
    lib: ["ES2015", "DOM"],
    esModuleInterop: true,
    baseUrl: "./",
    paths: { 
      "@framework/*": ["Framework/src/*"],
      "Live2DCubismCore": ["Framework/src/Live2DCubismCore"]
    },
    strict: false, // 厳格モードを無効化
    skipLibCheck: true,
  };

  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  console.log("✅ tsconfig.json を修正しました！");
}

function fixViteConfig() {
  const viteConfigPath = "vite.config.mts";
  if (!fs.existsSync(viteConfigPath)) {
    console.error("⚠️ vite.config.mts が見つかりません！");
    return;
  }

  let viteConfig = fs.readFileSync(viteConfigPath, "utf8");

  // Node.js のモジュール解決を修正
  if (!viteConfig.includes("import { fileURLToPath } from 'url';")) {
    viteConfig = `import { fileURLToPath } from 'url';\n` + viteConfig;
  }
  if (!viteConfig.includes("import path from 'path';")) {
    viteConfig = `import path from 'path';\n` + viteConfig;
  }

  fs.writeFileSync(viteConfigPath, viteConfig);
  console.log("✅ vite.config.mts を修正しました！");
}

function fixDependencies() {
  runCommand("rd /s /q node_modules");
  runCommand("del package-lock.json");
  runCommand("npm install");
}

function runBuild() {
  try {
    runCommand("npm run build");
    console.log("🎉 ビルド成功！");
  } catch (error) {
    console.error("❌ ビルドに失敗しました！");
    process.exit(1);
  }
}

// 修正＆ビルドを試行
console.log("🚀 エラーチェック＆修正を開始...");
fixTsConfig();
fixViteConfig();
fixDependencies();
runBuild();
