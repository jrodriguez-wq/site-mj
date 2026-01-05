#!/usr/bin/env node

/**
 * Script para optimizar y renombrar nuevas imágenes PNG del modelo Emelia
 * Convierte PNG a WebP y las renombra siguiendo la secuencia: emelia-XXX.webp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const EMELIA_INTERIOR_DIR = path.join(__dirname, '../public/modelos-optimized/emelia/interior');
const EMELIA_EXTERIOR_DIR = path.join(__dirname, '../public/modelos-optimized/emelia/exterior');

/**
 * Encuentra el último número de imagen en la carpeta interior
 */
function getLastInteriorNumber() {
  if (!fs.existsSync(EMELIA_INTERIOR_DIR)) {
    return 1;
  }
  
  const files = fs.readdirSync(EMELIA_INTERIOR_DIR);
  const emeliaFiles = files
    .filter(f => f.startsWith('emelia-') && f.endsWith('.webp'))
    .map(f => {
      const match = f.match(/emelia-(\d+)\.webp/);
      return match ? parseInt(match[1], 10) : 0;
    });
  
  return emeliaFiles.length > 0 ? Math.max(...emeliaFiles) : 1;
}

/**
 * Encuentra el último número de imagen en la carpeta exterior
 */
function getLastExteriorNumber() {
  if (!fs.existsSync(EMELIA_EXTERIOR_DIR)) {
    return 0;
  }
  
  const files = fs.readdirSync(EMELIA_EXTERIOR_DIR);
  const exFiles = files
    .filter(f => f.startsWith('ex') && f.endsWith('.webp'))
    .map(f => {
      const match = f.match(/ex(\d+)\.webp/);
      return match ? parseInt(match[1], 10) : 0;
    });
  
  return exFiles.length > 0 ? Math.max(...exFiles) : 0;
}

/**
 * Convierte PNG a WebP optimizado
 */
async function convertPngToWebp(inputPath, outputPath) {
  try {
    console.log(`📸 Procesando ${path.basename(inputPath)}...`);
    
    const metadata = await sharp(inputPath).metadata();
    console.log(`   Dimensiones: ${metadata.width}x${metadata.height}`);
    
    const maxDimension = 2560;
    let pipeline = sharp(inputPath);
    
    if (metadata.width > maxDimension || metadata.height > maxDimension) {
      const ratio = Math.min(maxDimension / metadata.width, maxDimension / metadata.height);
      const newWidth = Math.round(metadata.width * ratio);
      const newHeight = Math.round(metadata.height * ratio);
      console.log(`   Redimensionando a: ${newWidth}x${newHeight}`);
      pipeline = pipeline.resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    await pipeline
      .webp({ 
        quality: 90,
        effort: 6,
        smartSubsample: true
      })
      .toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    console.log(`✅ Convertido: ${path.basename(outputPath)}`);
    console.log(`   Tamaño original: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Tamaño WebP: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Reducción: ${reduction}%\n`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error procesando ${path.basename(inputPath)}:`);
    console.error(`   ${error.message}\n`);
    return false;
  }
}

/**
 * Determina si una imagen es exterior basándose en su nombre
 */
function isExteriorImage(fileName) {
  const lowerName = fileName.toLowerCase();
  return lowerName.includes('exterior') || lowerName.includes('exterior');
}

/**
 * Función principal
 */
async function main() {
  console.log('🔍 Buscando imágenes PNG nuevas en Emelia...\n');
  
  // Procesar imágenes de interior
  if (!fs.existsSync(EMELIA_INTERIOR_DIR)) {
    console.log('❌ No se encontró la carpeta interior de Emelia\n');
    return;
  }
  
  const interiorFiles = fs.readdirSync(EMELIA_INTERIOR_DIR);
  const pngFiles = interiorFiles
    .filter(f => f.toLowerCase().endsWith('.png'))
    .sort();
  
  if (pngFiles.length === 0) {
    console.log('✅ No se encontraron archivos PNG nuevos en interior/\n');
  } else {
    console.log(`📋 Encontrados ${pngFiles.length} archivo(s) PNG en interior/:\n`);
    pngFiles.forEach(f => {
      const stats = fs.statSync(path.join(EMELIA_INTERIOR_DIR, f));
      console.log(`   - ${f} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
    });
    console.log('');
    
    const lastNumber = getLastInteriorNumber();
    console.log(`📊 Última imagen interior: emelia-${lastNumber}.webp\n`);
    console.log('🚀 Iniciando conversión y optimización...\n');
    
    let successCount = 0;
    let currentNumber = lastNumber + 1;
    
    // Separar imágenes de interior y exterior
    const interiorImages = pngFiles.filter(f => !isExteriorImage(f));
    const exteriorImages = pngFiles.filter(f => isExteriorImage(f));
    
    // Procesar imágenes de interior
    for (const pngFile of interiorImages) {
      const inputPath = path.join(EMELIA_INTERIOR_DIR, pngFile);
      const outputFile = `emelia-${String(currentNumber).padStart(3, '0')}.webp`;
      const outputPath = path.join(EMELIA_INTERIOR_DIR, outputFile);
      
      const success = await convertPngToWebp(inputPath, outputPath);
      
      if (success) {
        successCount++;
        currentNumber++;
      }
    }
    
    // Procesar imágenes de exterior (mover a carpeta exterior)
    if (exteriorImages.length > 0) {
      if (!fs.existsSync(EMELIA_EXTERIOR_DIR)) {
        fs.mkdirSync(EMELIA_EXTERIOR_DIR, { recursive: true });
      }
      
      const lastExNumber = getLastExteriorNumber();
      let exCurrentNumber = lastExNumber + 1;
      
      for (const pngFile of exteriorImages) {
        const inputPath = path.join(EMELIA_INTERIOR_DIR, pngFile);
        const outputFile = `ex${exCurrentNumber}.webp`;
        const outputPath = path.join(EMELIA_EXTERIOR_DIR, outputFile);
        
        const success = await convertPngToWebp(inputPath, outputPath);
        
        if (success) {
          successCount++;
          exCurrentNumber++;
        }
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`✅ Conversión completada: ${successCount}/${pngFiles.length} archivos convertidos`);
    console.log('='.repeat(60));
    
    if (successCount === pngFiles.length) {
      console.log('\n🎉 ¡Todas las imágenes se optimizaron exitosamente!');
      console.log(`📝 Nuevas imágenes interiores: emelia-${lastNumber + 1}.webp hasta emelia-${currentNumber - 1}.webp`);
      
      if (exteriorImages.length > 0) {
        const lastExNumber = getLastExteriorNumber();
        console.log(`📝 Nuevas imágenes exteriores: ex${lastExNumber - exteriorImages.length + 1}.webp hasta ex${lastExNumber}.webp`);
      }
      
      console.log('\n💡 Próximos pasos:');
      console.log('   1. Actualiza lib/models/model-images.ts con las nuevas imágenes');
      console.log('   2. Opcional: Elimina los archivos PNG originales si ya no los necesitas');
      console.log('   3. Ejecuta: npm run validate-images\n');
    } else {
      console.log('\n⚠️  Algunos archivos no se pudieron convertir.');
      console.log('   Revisa los errores arriba.\n');
      process.exit(1);
    }
  }
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});

