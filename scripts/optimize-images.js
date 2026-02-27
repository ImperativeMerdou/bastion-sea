#!/usr/bin/env node
// =============================================
// GODTIDE: BASTION SEA - Image Optimizer
// =============================================
// Converts all PNG assets to WebP for web distribution.
// Run: npm install sharp && node scripts/optimize-images.js
// =============================================

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error('sharp is not installed. Run: npm install sharp --save-dev');
  process.exit(1);
}

const IMAGES_DIR = path.resolve(__dirname, '../src/assets/images');
const OUTPUT_DIR = path.resolve(__dirname, '../src/assets/images-webp');
const QUALITY = 85;
const SKIP_PATTERNS = [/^ChatGPT Image/]; // Skip unprocessed GPT dumps

async function processDirectory(inputDir, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const entries = fs.readdirSync(inputDir, { withFileTypes: true });
  let totalOriginal = 0;
  let totalConverted = 0;
  let fileCount = 0;
  let skipped = 0;

  for (const entry of entries) {
    const inputPath = path.join(inputDir, entry.name);
    const outputPath = path.join(outputDir, entry.name);

    if (entry.isDirectory()) {
      // Recurse into subdirectories (expressions/, etc.)
      const sub = await processDirectory(inputPath, outputPath);
      totalOriginal += sub.totalOriginal;
      totalConverted += sub.totalConverted;
      fileCount += sub.fileCount;
      skipped += sub.skipped;
      continue;
    }

    // Only process PNG files
    if (!entry.name.toLowerCase().endsWith('.png')) {
      // Copy non-PNG files as-is
      fs.copyFileSync(inputPath, outputPath);
      continue;
    }

    // Skip ChatGPT default named files
    if (SKIP_PATTERNS.some(p => p.test(entry.name))) {
      skipped++;
      console.log(`  SKIP: ${entry.name} (unprocessed GPT dump)`);
      continue;
    }

    const originalSize = fs.statSync(inputPath).size;
    totalOriginal += originalSize;

    // Convert to WebP, keeping the .png extension for code compatibility
    // (getImagePath uses require() which resolves at build time)
    const webpOutputPath = outputPath.replace(/\.png$/i, '.webp');

    try {
      await sharp(inputPath)
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(webpOutputPath);

      const newSize = fs.statSync(webpOutputPath).size;
      totalConverted += newSize;
      fileCount++;

      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      console.log(`  ${entry.name} -> .webp  ${formatBytes(originalSize)} -> ${formatBytes(newSize)} (${savings}% smaller)`);
    } catch (err) {
      console.error(`  ERROR: ${entry.name}: ${err.message}`);
      // Copy original on failure
      fs.copyFileSync(inputPath, outputPath);
      totalConverted += originalSize;
    }
  }

  return { totalOriginal, totalConverted, fileCount, skipped };
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function main() {
  console.log('===========================================');
  console.log('GODTIDE Image Optimizer - PNG to WebP');
  console.log('===========================================');
  console.log(`Source:  ${IMAGES_DIR}`);
  console.log(`Output:  ${OUTPUT_DIR}`);
  console.log(`Quality: ${QUALITY}%`);
  console.log('');

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Image directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const result = await processDirectory(IMAGES_DIR, OUTPUT_DIR);

  console.log('');
  console.log('===========================================');
  console.log('RESULTS');
  console.log('===========================================');
  console.log(`Files converted: ${result.fileCount}`);
  console.log(`Files skipped:   ${result.skipped}`);
  console.log(`Original size:   ${formatBytes(result.totalOriginal)}`);
  console.log(`WebP size:       ${formatBytes(result.totalConverted)}`);
  console.log(`Savings:         ${formatBytes(result.totalOriginal - result.totalConverted)} (${((1 - result.totalConverted / result.totalOriginal) * 100).toFixed(1)}%)`);
  console.log('');
  console.log('Next steps:');
  console.log('1. Review output in src/assets/images-webp/');
  console.log('2. If satisfied, replace src/assets/images/ contents');
  console.log('3. Update images.ts to reference .webp extensions');
  console.log('4. Rebuild and test: npm run build');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
