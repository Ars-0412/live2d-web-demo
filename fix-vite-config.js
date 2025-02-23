const fs = require("fs");

const viteConfigPath = "vite.config.mts";
let viteConfig = fs.readFileSync(viteConfigPath, "utf8");

// `assetsInclude` の重複を削除して統合
viteConfig = viteConfig.replace(
  /assetsInclude: \[.*?\],?/gs,
  'assetsInclude: ["**/*.js", "**/*.wasm"],'
);

fs.writeFileSync(viteConfigPath, viteConfig);

console.log("✅ `vite.config.mts` の `assetsInclude` を修正しました！");
