/**
 * Script para optimizar y renombrar imágenes de modelos
 * - Optimiza imágenes sin perder calidad
 * - Elimina espacios en blanco de nombres
 * - Organiza en estructura limpia
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const MODELOS_DIR = path.join(__dirname, '../public/modelos');
const OUTPUT_DIR = path.join(__dirname, '../public/modelos-optimized');

// Configuración de modelos
const MODELS = {
  'LOUISIANA MODEL PROFESIONAL': {
    folder: 'louisiana',
    prefix: 'louisiana',
    maxWidth: 1920,
    quality: 85,
  },
  'VIANA': {
    folder: 'viana',
    prefix: 'viana',
    maxWidth: 1920,
    quality: 85,
  },
  'DELANIE MODEL PROFESIONAL': {
    folder: 'delanie',
    prefix: 'delanie',
    maxWidth: 1920,
    quality: 85,
  },
  'LANGDON MODEL PROFESIONAL': {
    folder: 'langdon',
    prefix: 'langdon',
    maxWidth: 1920,
    quality: 85,
  },
  'EMELIA MODEL PROFESIONAL': {
    folder: 'emelia',
    prefix: 'emelia',
    maxWidth: 1920,
    quality: 85,
  },
};

/**
 * Normaliza nombres de archivo: elimina espacios y caracteres especiales
 */
function normalizeFileName(fileName, prefix, index) {
  const ext = path.extname(fileName).toLowerCase();
  const normalized = `${prefix}-${String(index).padStart(3, '0')}${ext}`;
  return normalized;
}

/**
 * Optimiza una imagen
 */
async function optimizeImage(inputPath, outputPath, config) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const width = Math.min(metadata.width, config.maxWidth);
    
    let pipeline = sharp(inputPath);

    // Redimensionar si es necesario
    if (metadata.width > config.maxWidth) {
      pipeline = pipeline.resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }

    // Aplicar optimización según formato
    const ext = path.extname(outputPath).toLowerCase();
    
    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({
        quality: config.quality,
        mozjpeg: true,
        progressive: true,
      });
    } else if (ext === '.png') {
      pipeline = pipeline.png({
        quality: config.quality,
        compressionLevel: 9,
        adaptiveFiltering: true,
      });
    }

    await pipeline.toFile(outputPath);
    
    const originalStats = await fs.stat(inputPath);
    const optimizedStats = await fs.stat(outputPath);
    const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
    
    return {
      success: true,
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
 * Procesa una carpeta de modelo
 */
async function processModelFolder(modelFolder, config) {
  const inputPath = path.join(MODELOS_DIR, modelFolder);
  const outputPath = path.join(OUTPUT_DIR, config.folder);

  // Crear directorio de salida
  await fs.mkdir(outputPath, { recursive: true });

  try {
    const files = await fs.readdir(inputPath);
    const imageFiles = files.filter(
      (file) =>
        /\.(jpg|jpeg|png|webp)$/i.test(file) &&
        !file.startsWith('.')
    );

    console.log(`\n📁 Procesando ${modelFolder}...`);
    console.log(`   Encontradas ${imageFiles.length} imágenes`);

    const results = [];
    let index = 1;

    for (const file of imageFiles.sort()) {
      const inputFile = path.join(inputPath, file);
      const normalizedName = normalizeFileName(file, config.prefix, index);
      const outputFile = path.join(outputPath, normalizedName);

      // Determinar extensión optimizada (convertir PNG a JPG si es posible)
      let ext = path.extname(file).toLowerCase();
      if (ext === '.png') {
        // Intentar convertir PNG a JPG para mejor compresión
        ext = '.jpg';
        const jpgOutputFile = outputFile.replace(/\.png$/i, '.jpg');
        
        const result = await optimizeImage(inputFile, jpgOutputFile, config);
        if (result.success) {
          results.push({
            original: file,
            optimized: path.basename(jpgOutputFile),
            ...result,
          });
          console.log(`   ✓ ${file} → ${path.basename(jpgOutputFile)} (${result.reduction} reducción)`);
        } else {
          // Si falla, mantener PNG
          const result = await optimizeImage(inputFile, outputFile, config);
          results.push({
            original: file,
            optimized: path.basename(outputFile),
            ...result,
          });
          console.log(`   ✓ ${file} → ${path.basename(outputFile)} (${result.reduction} reducción)`);
        }
      } else {
        const result = await optimizeImage(inputFile, outputFile, config);
        results.push({
          original: file,
          optimized: path.basename(outputFile),
          ...result,
        });
        
        if (result.success) {
          console.log(`   ✓ ${file} → ${path.basename(outputFile)} (${result.reduction} reducción)`);
        } else {
          console.log(`   ✗ ${file} - Error: ${result.error}`);
        }
      }
      
      index++;
    }

    // Generar archivo de mapeo (JSON)
    const mappingFile = path.join(outputPath, 'mapping.json');
    const mapping = results
      .filter((r) => r.success)
      .map((r) => ({
        original: r.original,
        optimized: r.optimized,
      }));
    
    await fs.writeFile(mappingFile, JSON.stringify(mapping, null, 2));
    console.log(`   📝 Mapeo guardado en mapping.json`);

    return results;
  } catch (error) {
    console.error(`Error processing folder ${modelFolder}:`, error.message);
    return [];
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando optimización de imágenes de modelos...\n');

  // Crear directorio de salida
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const allResults = {};

  for (const [modelFolder, config] of Object.entries(MODELS)) {
    const results = await processModelFolder(modelFolder, config);
    allResults[config.folder] = results;
  }

  // Resumen final
  console.log('\n📊 RESUMEN DE OPTIMIZACIÓN:');
  console.log('═'.repeat(50));

  let totalOriginal = 0;
  let totalOptimized = 0;
  let totalImages = 0;

  for (const [model, results] of Object.entries(allResults)) {
    const successful = results.filter((r) => r.success);
    if (successful.length > 0) {
      const original = successful.reduce((sum, r) => sum + r.originalSize, 0);
      const optimized = successful.reduce((sum, r) => sum + r.optimizedSize, 0);
      const reduction = ((1 - optimized / original) * 100).toFixed(1);

      totalOriginal += original;
      totalOptimized += optimized;
      totalImages += successful.length;

      console.log(`\n${model.toUpperCase()}:`);
      console.log(`   Imágenes: ${successful.length}`);
      console.log(`   Original: ${(original / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Optimizado: ${(optimized / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Reducción: ${reduction}%`);
    }
  }

  console.log('\n' + '═'.repeat(50));
  console.log('\nTOTAL:');
  console.log(`   Imágenes procesadas: ${totalImages}`);
  console.log(`   Tamaño original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Tamaño optimizado: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(
    `   Reducción total: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`
  );
  console.log(`   Espacio ahorrado: ${((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2)} MB`);

  console.log('\n✅ Optimización completada!');
  console.log(`\n📁 Imágenes optimizadas en: ${OUTPUT_DIR}`);
  console.log(
    '\n💡 Siguiente paso: Revisa las imágenes y luego reemplaza la carpeta /modelos con /modelos-optimized'
  );
}

// Ejecutar
main().catch((error) => {
  console.error('Error fatal:', error);
  process.exit(1);
});

