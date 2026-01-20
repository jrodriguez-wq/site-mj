#!/usr/bin/env node

/**
 * Script genérico para optimizar imágenes en una carpeta específica
 * 
 * Convierte imágenes PNG/JPG a WebP optimizado y elimina las versiones antiguas
 * 
 * Uso: 
 *   node scripts/optimize-folder-images.js <ruta-de-carpeta>
 *   Ejemplo: node scripts/optimize-folder-images.js public/modelos-optimized/aurora/optimizar
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Obtener la ruta de la carpeta desde los argumentos
const folderPath = process.argv[2];

if (!folderPath) {
  console.error('❌ Error: Debes proporcionar la ruta de la carpeta a optimizar');
  console.log('\n📖 Uso:');
  console.log('   node scripts/optimize-folder-images.js <ruta-de-carpeta>');
  console.log('\n📝 Ejemplo:');
  console.log('   node scripts/optimize-folder-images.js public/modelos-optimized/aurora/optimizar');
  process.exit(1);
}

// Resolver la ruta absoluta
const absoluteFolderPath = path.isAbsolute(folderPath) 
  ? folderPath 
  : path.join(__dirname, '..', folderPath);

// Verificar que la carpeta existe
if (!fs.existsSync(absoluteFolderPath)) {
  console.error(`❌ Error: La carpeta no existe: ${absoluteFolderPath}`);
  process.exit(1);
}

const stats = fs.statSync(absoluteFolderPath);
if (!stats.isDirectory()) {
  console.error(`❌ Error: La ruta no es una carpeta: ${absoluteFolderPath}`);
  process.exit(1);
}

// Configuración de optimización
const CONFIG = {
  webp: { 
    quality: 90,
    effort: 6,
    smartSubsample: true
  },
  maxWidth: 2560,
  maxHeight: 2560,
};

/**
 * Normaliza el nombre de archivo para web
 */
function normalizeFileName(fileName) {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Convierte una imagen a WebP optimizado
 */
async function convertToWebp(inputPath, outputPath) {
  try {
    const fileName = path.basename(inputPath);
    console.log(`📸 Procesando ${fileName}...`);
    
    const metadata = await sharp(inputPath).metadata();
    console.log(`   Dimensiones originales: ${metadata.width}x${metadata.height}`);
    
    let pipeline = sharp(inputPath);
    
    // Redimensionar si es muy grande
    if (metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight) {
      pipeline = pipeline.resize(CONFIG.maxWidth, CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
      console.log(`   Redimensionando a máximo: ${CONFIG.maxWidth}x${CONFIG.maxHeight}`);
    }
    
    // Convertir a WebP
    await pipeline
      .webp(CONFIG.webp)
      .toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    console.log(`✅ Optimizado: ${path.basename(outputPath)}`);
    console.log(`   Tamaño original: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Tamaño WebP: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Reducción: ${reduction}%\n`);
    
    return {
      success: true,
      originalSize: inputStats.size,
      optimizedSize: outputStats.size,
      savings: parseFloat(reduction),
    };
  } catch (error) {
    console.error(`❌ Error procesando ${path.basename(inputPath)}:`);
    console.error(`   ${error.message}\n`);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando optimización de imágenes...\n');
  console.log(`📁 Carpeta: ${absoluteFolderPath}\n`);
  
  // Leer archivos de la carpeta
  const files = fs.readdirSync(absoluteFolderPath);
  
  // Filtrar solo imágenes PNG y JPG
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  });
  
  if (imageFiles.length === 0) {
    console.log('⚠️  No se encontraron imágenes PNG o JPG para optimizar.');
    return;
  }
  
  console.log(`📋 Encontradas ${imageFiles.length} imagen(es) para optimizar:\n`);
  imageFiles.forEach(file => {
    const filePath = path.join(absoluteFolderPath, file);
    const stats = fs.statSync(filePath);
    console.log(`   - ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
  });
  console.log('');
  
  console.log('🔄 Iniciando conversión a WebP...\n');
  
  let successCount = 0;
  let errorCount = 0;
  let deletedCount = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  const processedFiles = [];
  
  // Procesar cada imagen
  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i];
    const inputPath = path.join(absoluteFolderPath, imageFile);
    
    // Generar nombre de salida
    const ext = path.extname(imageFile);
    const baseName = path.basename(imageFile, ext);
    const normalizedName = normalizeFileName(baseName);
    const outputFileName = `${normalizedName}.webp`;
    const outputPath = path.join(absoluteFolderPath, outputFileName);
    
    // Si el archivo WebP ya existe y es diferente al original, eliminar el original y saltar
    if (fs.existsSync(outputPath) && outputPath !== inputPath) {
      console.log(`⏭️  Saltando ${imageFile} (${outputFileName} ya existe)`);
      // Eliminar el archivo original ya que existe la versión optimizada
      try {
        fs.unlinkSync(inputPath);
        console.log(`🗑️  Eliminado: ${imageFile}\n`);
        deletedCount++;
      } catch (err) {
        console.log(`⚠️  No se pudo eliminar ${imageFile}\n`);
      }
      continue;
    }
    
    // Convertir a WebP
    const result = await convertToWebp(inputPath, outputPath);
    
    if (result.success) {
      successCount++;
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
      processedFiles.push({
        original: imageFile,
        optimized: outputFileName,
        savings: result.savings,
      });
      
      // Eliminar el archivo original después de crear exitosamente el optimizado
      try {
        fs.unlinkSync(inputPath);
        console.log(`🗑️  Eliminado: ${imageFile}\n`);
        deletedCount++;
      } catch (err) {
        console.log(`⚠️  No se pudo eliminar ${imageFile}: ${err.message}\n`);
      }
    } else {
      errorCount++;
    }
  }
  
  // Resumen
  console.log('='.repeat(70));
  console.log('✅ OPTIMIZACIÓN COMPLETADA');
  console.log('='.repeat(70));
  console.log(`📊 Estadísticas:`);
  console.log(`   • Procesadas exitosamente: ${successCount}`);
  console.log(`   • Archivos antiguos eliminados: ${deletedCount}`);
  console.log(`   • Errores: ${errorCount}`);
  if (totalOriginalSize > 0) {
    console.log(`   • Tamaño original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   • Tamaño optimizado total: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   • Ahorro total: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
  }
  
  if (processedFiles.length > 0) {
    console.log(`\n📝 Archivos procesados:`);
    processedFiles.forEach(({ original, optimized, savings }) => {
      console.log(`   • ${original} → ${optimized} (${savings > 0 ? '-' : '+'}${Math.abs(savings)}%)`);
    });
  }
  
  console.log('\n✨ Solo se mantienen las versiones optimizadas en formato WebP.\n');
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});

