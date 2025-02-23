const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src', 'assets');
const mainTsPath = path.join(__dirname, 'src', 'main.ts');

if (fs.existsSync(assetsDir)) {
    let assetFiles = [];

    // src/assets/ 内の全てのファイルを再帰的に取得
    function getFilesRecursively(directory, prefix = '') {
        fs.readdirSync(directory, { withFileTypes: true }).forEach(entry => {
            const fullPath = path.join(directory, entry.name);
            const relativePath = path.join(prefix, entry.name).replace(/\\/g, '/'); // パスを統一

            if (entry.isDirectory()) {
                getFilesRecursively(fullPath, relativePath);
            } else if (/\.(png|jpg|jpeg|gif|mp3|wav|ogg|json|glb|fbx)$/i.test(entry.name)) {
                assetFiles.push(relativePath);
            }
        });
    }

    getFilesRecursively(assetsDir);

    if (assetFiles.length > 0) {
        let importStatements = assetFiles.map(file => `import "./assets/${file}";`).join('\n');

        let mainTsContent = fs.readFileSync(mainTsPath, 'utf8');
        mainTsContent = mainTsContent.replace(/import ".\/assets\/.*?";/g, ''); // 既存のimportを削除
        mainTsContent += `\n${importStatements}`;

        fs.writeFileSync(mainTsPath, mainTsContent, 'utf8');
        console.log('✅ `src/main.ts` に全てのアセットの import を追加しました');
    } else {
        console.warn('⚠️ `src/assets/` に有効なアセットファイルが見つかりません');
    }
} else {
    console.warn('⚠️ `src/assets/` フォルダが存在しません');
}
