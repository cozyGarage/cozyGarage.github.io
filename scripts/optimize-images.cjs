#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'public', 'projects');
const outDir = path.join(__dirname, '..', 'public', 'optimized', 'projects');
const widths = [400, 800, 1200];
const formats = ['avif', 'webp'];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function processImage(file) {
  const name = path.parse(file).name;
  const ext = path.parse(file).ext.toLowerCase();
  const input = path.join(srcDir, file);

  if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
    console.log(`Skipping unsupported file ${file}`);
    return;
  }

  await Promise.all(
    formats.map(async (fmt) => {
      await Promise.all(
        widths.map(async (w) => {
          const outFile = path.join(outDir, `${name}-${w}.${fmt}`);
          await sharp(input)
            .resize({ width: w })
            [fmt]({ quality: 80 })
            .toFile(outFile);
          console.log(`Wrote ${outFile}`);
        })
      );
    })
  );
}

async function main() {
  try {
    if (!fs.existsSync(srcDir)) {
      console.warn(`Source directory ${srcDir} does not exist. Nothing to optimize.`);
      return;
    }

    await ensureDir(outDir);

    const files = await fs.promises.readdir(srcDir);
    const images = files.filter((f) => /\.(png|jpe?g)$/i.test(f));

    if (images.length === 0) {
      console.warn(`No images found in ${srcDir}.`);
      return;
    }

    for (const file of images) {
      await processImage(file);
    }

    console.log('Image optimization complete.');
  } catch (err) {
    console.error('Error optimizing images:', err);
    process.exit(1);
  }
}

main();