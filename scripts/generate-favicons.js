const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '../public/cropped-cropped-favicon-300x300-1.png');
const outputDir = path.join(__dirname, '../public');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon.png', size: 32 },
];

async function generateFavicons() {
  try {
    console.log('Generating favicons from:', sourceFile);
    
    for (const { name, size } of sizes) {
      await sharp(sourceFile)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(path.join(outputDir, name));
      
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (multi-size ICO)
    await sharp(sourceFile)
      .resize(32, 32)
      .png()
      .toFile(path.join(outputDir, 'favicon.ico'));
    
    console.log('✓ Generated favicon.ico');
    console.log('\n✅ All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();

