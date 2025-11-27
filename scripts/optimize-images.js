const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../public/img');
const testimonialsDir = path.join(__dirname, '../public/img/testimonios');

// Configuración de optimización
const config = {
  jpg: {
    quality: 85, // Calidad 85 es un buen balance entre tamaño y calidad
    mozjpeg: true, // Usa mozjpeg para mejor compresión
  },
  png: {
    quality: 90,
    compressionLevel: 9, // Máxima compresión
    palette: true, // Intenta usar paleta de colores si es posible
  },
  webp: {
    quality: 85,
    effort: 6, // Esfuerzo de compresión (0-6, más alto = mejor compresión pero más lento)
  },
};

// Tamaño máximo recomendado para imágenes web (1920px de ancho es suficiente para la mayoría)
const maxWidth = 1920;
const maxHeight = 1920;

/**
 * Formatea bytes a formato legible
 */
const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

/**
 * Obtiene el tamaño del archivo en formato legible
 */
const getFileSize = (filePath) => {
  const stats = fs.statSync(filePath);
  return formatBytes(stats.size);
};

/**
 * Optimiza una imagen JPG
 */
const optimizeJPG = async (inputPath, outputPath) => {
  const metadata = await sharp(inputPath).metadata();
  let pipeline = sharp(inputPath);

  // Redimensionar si es muy grande
  if (metadata.width > maxWidth || metadata.height > maxHeight) {
    pipeline = pipeline.resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  await pipeline
    .jpeg({
      quality: config.jpg.quality,
      mozjpeg: config.jpg.mozjpeg,
    })
    .toFile(outputPath);
};

/**
 * Optimiza una imagen PNG
 */
const optimizePNG = async (inputPath, outputPath) => {
  const metadata = await sharp(inputPath).metadata();
  let pipeline = sharp(inputPath);

  // Redimensionar si es muy grande
  if (metadata.width > maxWidth || metadata.height > maxHeight) {
    pipeline = pipeline.resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  await pipeline
    .png({
      quality: config.png.quality,
      compressionLevel: config.png.compressionLevel,
      palette: config.png.palette,
    })
    .toFile(outputPath);
};

/**
 * Optimiza una imagen convirtiéndola a WebP (opcional, mejor compresión)
 */
const optimizeToWebP = async (inputPath, outputPath) => {
  const metadata = await sharp(inputPath).metadata();
  let pipeline = sharp(inputPath);

  // Redimensionar si es muy grande
  if (metadata.width > maxWidth || metadata.height > maxHeight) {
    pipeline = pipeline.resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  await pipeline
    .webp({
      quality: config.webp.quality,
      effort: config.webp.effort,
    })
    .toFile(outputPath);
};

/**
 * Procesa un archivo de imagen
 */
const processImage = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const dir = path.dirname(filePath);
  const nameWithoutExt = path.basename(filePath, ext);

  // Obtener tamaño original
  const originalSize = fs.statSync(filePath).size;

  try {
    let outputPath;
    let optimized = false;

    if (ext === '.jpg' || ext === '.jpeg') {
      // Para JPG, optimizar manteniendo el formato
      outputPath = path.join(dir, `${nameWithoutExt}_optimized${ext}`);
      await optimizeJPG(filePath, outputPath);
      optimized = true;
    } else if (ext === '.png') {
      // Para PNG, intentar optimizar primero
      outputPath = path.join(dir, `${nameWithoutExt}_optimized${ext}`);
      await optimizePNG(filePath, outputPath);
      optimized = true;
    } else {
      console.log(`⚠️  Saltando ${fileName} (formato no soportado: ${ext})`);
      return null;
    }

    if (optimized) {
      const newSize = fs.statSync(outputPath).size;
      const reduction = ((originalSize - newSize) / originalSize) * 100;
      const saved = originalSize - newSize;

      // Si la optimización redujo el tamaño significativamente, reemplazar
      if (newSize < originalSize) {
        // Hacer backup del original
        const backupPath = path.join(dir, `${nameWithoutExt}_backup${ext}`);
        fs.copyFileSync(filePath, backupPath);

        // Reemplazar original con optimizado
        fs.renameSync(outputPath, filePath);

        return {
          fileName,
          originalSize,
          newSize,
          reduction,
          saved,
          backupPath,
        };
      } else {
        // Si no mejoró, eliminar el archivo optimizado
        fs.unlinkSync(outputPath);
        console.log(`⚠️  ${fileName} no mejoró con la optimización, manteniendo original`);
        return null;
      }
    }
  } catch (error) {
    console.error(`❌ Error procesando ${fileName}:`, error.message);
    return null;
  }
};

/**
 * Encuentra todas las imágenes en un directorio
 */
const findImages = (dir) => {
  const files = fs.readdirSync(dir);
  const images = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Procesar subdirectorios recursivamente
      images.push(...findImages(filePath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        images.push(filePath);
      }
    }
  }

  return images;
};

/**
 * Función principal
 */
const optimizeImages = async () => {
  console.log('🚀 Iniciando optimización de imágenes...\n');

  // Encontrar todas las imágenes
  const images = findImages(imgDir);
  console.log(`📸 Encontradas ${images.length} imágenes para optimizar\n`);

  const results = [];
  let totalOriginalSize = 0;
  let totalNewSize = 0;

  // Procesar cada imagen
  for (let i = 0; i < images.length; i++) {
    const imagePath = images[i];
    const fileName = path.basename(imagePath);
    console.log(`[${i + 1}/${images.length}] Procesando ${fileName}...`);

    const result = await processImage(imagePath);
    if (result) {
      results.push(result);
      totalOriginalSize += result.originalSize;
      totalNewSize += result.newSize;

      console.log(
        `  ✓ Optimizado: ${formatBytes(result.originalSize)} → ${formatBytes(result.newSize)} (${result.reduction.toFixed(1)}% reducción)`
      );
    }
  }

  // Mostrar resumen
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE OPTIMIZACIÓN');
  console.log('='.repeat(60));
  console.log(`Total de imágenes optimizadas: ${results.length}`);
  console.log(`Tamaño original total: ${formatBytes(totalOriginalSize)}`);
  console.log(`Tamaño optimizado total: ${formatBytes(totalNewSize)}`);
  console.log(
    `Reducción total: ${formatBytes(totalOriginalSize - totalNewSize)} (${((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1)}%)`
  );
  console.log('\n✅ Optimización completada!');

  // Mostrar archivos más grandes optimizados
  if (results.length > 0) {
    console.log('\n📋 Top 5 imágenes con mayor reducción:');
    results
      .sort((a, b) => b.saved - a.saved)
      .slice(0, 5)
      .forEach((result, index) => {
        console.log(
          `  ${index + 1}. ${result.fileName}: ${formatBytes(result.originalSize)} → ${formatBytes(result.newSize)} (${result.reduction.toFixed(1)}%)`
        );
      });
  }

  console.log('\n💡 Nota: Los archivos originales se guardaron como backup con sufijo "_backup"');
  console.log('   Puedes eliminarlos después de verificar que todo funciona correctamente.');
};

// Ejecutar
optimizeImages().catch((error) => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});

