const fs = require('fs');

const publicResources = [
  {src: './Core', dst: './dist/Core'},
  {src: './Resources', dst: './dist/Resources'},
];

publicResources.forEach((e) => {
  if (!fs.existsSync(e.src)) {
    console.error(`Error: ${e.src} does not exist!`);
    return;
  }
  if (fs.existsSync(e.dst)) fs.rmSync(e.dst, { recursive: true });
  fs.cpSync(e.src, e.dst, { recursive: true });
});
