/**
 * Script para optimizar imágenes de planos de modelos
 * - Convierte PNG a JPG/WebP optimizado
 * - Reduce tamaño manteniendo calidad
 * - Organiza en estructura limpia
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public/modelos-optimized/planos');
const OUTPUT_DIR = path.join(__dirname, '../public/modelos-optimized/planos');

// Mapeo de archivos de planos a claves de modelos
const FLOORPLAN_MAPPING = {
  'Aurora.png': 'aurora',
  'aur.png': 'aurora', // Alias
  'Viena.png': 'viana',
  'Louisiana.png': 'louisiana',
  'Langdon.png': 'langdon',
  'Emelia.png': 'emelia',
  'Duplex.png': 'duplex',
  'Delanie.png': 'delanie',
};

// Configuración de optimización
const OPTIMIZATION_CONFIG = {
  maxWidth: 2400, // Ancho máximo para planos (más grande que fotos normales)
  quality: 90, // Alta calidad para planos (necesitan ser legibles)
  format: 'jpg', // Convertir a JPG para mejor compresión
};

/**
 * Optimiza un plano
 */
async function optimizeFloorplan(inputPath, outputPath, modelKey) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const width = Math.min(metadata.width, OPTIMIZATION_CONFIG.maxWidth);
    
    let pipeline = sharp(inputPath);

    // Redimensionar si es necesario
    if (metadata.width > OPTIMIZATION_CONFIG.maxWidth) {
      pipeline = pipeline.resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }

    // Convertir a JPG con alta calidad
    const jpgOutputPath = outputPath.replace(/\.png$/i, '.jpg');
    pipeline = pipeline.jpeg({
      quality: OPTIMIZATION_CONFIG.quality,
      mozjpeg: true,
      progressive: true,
    });

    await pipeline.toFile(jpgOutputPath);
    
    const originalStats = await fs.stat(inputPath);
    const optimizedStats = await fs.stat(jpgOutputPath);
    const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
    
    return {
      success: true,
      modelKey,
      originalFile: path.basename(inputPath),
      optimizedFile: path.basename(jpgOutputPath),
      originalSize: originalStats.size,
      optimizedSize: optimizedStats.size,
      reduction: `${reduction}%`,
    };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando optimización de planos...\n');

  try {
    const files = await fs.readdir(INPUT_DIR);
    const pngFiles = files.filter(
      (file) => /\.png$/i.test(file) && !file.startsWith('.')
    );

    console.log(`📁 Encontrados ${pngFiles.length} archivos PNG\n`);

    const results = [];
    const processedModels = new Set();

    for (const file of pngFiles) {
      // Buscar el modelo correspondiente
      const modelKey = FLOORPLAN_MAPPING[file];
      
      if (!modelKey) {
        console.log(`⚠️  Archivo sin mapeo: ${file} - Saltando...`);
        continue;
      }

      // Evitar procesar duplicados (ej: aur.png y Aurora.png)
      if (processedModels.has(modelKey)) {
        console.log(`⚠️  Modelo ${modelKey} ya procesado - Saltando ${file}...`);
        continue;
      }

      const inputPath = path.join(INPUT_DIR, file);
      const outputPath = path.join(OUTPUT_DIR, `${modelKey}-floorplan.jpg`);

      console.log(`📐 Procesando ${file} → ${modelKey}-floorplan.jpg...`);
      
      const result = await optimizeFloorplan(inputPath, outputPath, modelKey);
      
      if (result.success) {
        results.push(result);
        processedModels.add(modelKey);
        console.log(`   ✓ Optimizado: ${(result.originalSize / 1024 / 1024).toFixed(2)} MB → ${(result.optimizedSize / 1024 / 1024).toFixed(2)} MB (${result.reduction} reducción)`);
      } else {
        console.log(`   ✗ Error: ${result.error}`);
      }
    }

    // Resumen final
    console.log('\n' + '═'.repeat(60));
    console.log('📊 RESUMEN DE OPTIMIZACIÓN:');
    console.log('═'.repeat(60));

    if (results.length > 0) {
      const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
      const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
      const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);

      console.log(`\n✅ Planos procesados: ${results.length}`);
      console.log(`📦 Tamaño original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
      console.log(`📦 Tamaño optimizado: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
      console.log(`💾 Reducción total: ${totalReduction}%`);
      console.log(`💾 Espacio ahorrado: ${((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2)} MB`);

      console.log('\n📋 Planos optimizados:');
      results.forEach((r) => {
        console.log(`   • ${r.modelKey}: ${r.optimizedFile}`);
      });
    } else {
      console.log('\n⚠️  No se procesaron planos');
    }

    console.log('\n' + '═'.repeat(60));
    console.log('\n✅ Optimización completada!');
    console.log(`\n📁 Planos optimizados en: ${OUTPUT_DIR}`);
    console.log('\n💡 Los planos están listos para usar en las páginas de modelos');
  } catch (error) {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  }
}

// Ejecutar
main().catch((error) => {
  console.error('Error fatal:', error);
  process.exit(1);
});

