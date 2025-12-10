const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración de optimización
const config = {
  jpg: {
    quality: 85,
    mozjpeg: true,
    progressive: true,
  },
  png: {
    quality: 90,
    compressionLevel: 9,
    palette: true,
  },
};

// Tamaño máximo recomendado para imágenes web
const maxWidth = 1920;
const maxHeight = 1920;

// Tamaño mínimo en bytes para considerar optimizar (1MB)
const MIN_SIZE_TO_OPTIMIZE = 1024 * 1024;

/**
 * Formatea bytes a formato legible
 */
const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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
      progressive: config.jpg.progressive,
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
 * Procesa un archivo de imagen
 */
const processImage = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const dir = path.dirname(filePath);
  
  // Obtener tamaño original
  const stats = fs.statSync(filePath);
  const originalSize = stats.size;

  // Solo optimizar si es suficientemente grande
  if (originalSize < MIN_SIZE_TO_OPTIMIZE) {
    return null;
  }

  try {
    // Crear archivo temporal para la optimización
    const tempPath = path.join(dir, `${fileName}.tmp`);

    if (ext === '.jpg' || ext === '.jpeg') {
      await optimizeJPG(filePath, tempPath);
    } else if (ext === '.png') {
      await optimizePNG(filePath, tempPath);
    } else {
      console.log(`⚠️  Saltando ${fileName} (formato no soportado: ${ext})`);
      return null;
    }

    const newStats = fs.statSync(tempPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize) * 100;
    const saved = originalSize - newSize;

    // Si la optimización redujo el tamaño significativamente, reemplazar
    if (newSize < originalSize && reduction > 5) {
      // Hacer backup del original (opcional, comentado para ahorrar espacio)
      // const backupPath = path.join(dir, `${fileName}.backup`);
      // fs.copyFileSync(filePath, backupPath);

      // Reemplazar original con optimizado
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);

      return {
        fileName,
        originalSize,
        newSize,
        reduction,
        saved,
        path: filePath,
      };
    } else {
      // Si no mejoró significativamente, eliminar el archivo temporal
      fs.unlinkSync(tempPath);
      if (reduction <= 5) {
        console.log(`⚠️  ${fileName} no mejoró significativamente (${reduction.toFixed(1)}%), manteniendo original`);
      }
      return null;
    }
  } catch (error) {
    console.error(`❌ Error procesando ${fileName}:`, error.message);
    // Limpiar archivo temporal si existe
    const tempPath = path.join(dir, `${fileName}.tmp`);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    return null;
  }
};

/**
 * Encuentra todas las imágenes en un directorio recursivamente
 */
const findImages = (dir, images = []) => {
  if (!fs.existsSync(dir)) {
    return images;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    
    try {
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Procesar subdirectorios recursivamente
        findImages(filePath, images);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          images.push(filePath);
        }
      }
    } catch (error) {
      console.error(`Error accediendo a ${filePath}:`, error.message);
    }
  }

  return images;
};

/**
 * Función principal
 */
const optimizeAllImages = async () => {
  console.log('🚀 Iniciando optimización de todas las imágenes pesadas...\n');

  const publicDir = path.join(__dirname, '../public');
  
  // Encontrar todas las imágenes
  const allImages = findImages(publicDir);
  
  // Filtrar solo las imágenes grandes
  const largeImages = allImages
    .map(imgPath => {
      try {
        const stats = fs.statSync(imgPath);
        return { path: imgPath, size: stats.size };
      } catch {
        return null;
      }
    })
    .filter(img => img && img.size >= MIN_SIZE_TO_OPTIMIZE)
    .sort((a, b) => b.size - a.size);

  console.log(`📸 Encontradas ${largeImages.length} imágenes grandes para optimizar (>= ${formatBytes(MIN_SIZE_TO_OPTIMIZE)})\n`);

  if (largeImages.length === 0) {
    console.log('✅ No se encontraron imágenes grandes para optimizar.');
    return;
  }

  // Mostrar las 10 más grandes
  console.log('📋 Top 10 imágenes más pesadas:');
  largeImages.slice(0, 10).forEach((img, index) => {
    console.log(`  ${index + 1}. ${path.relative(publicDir, img.path)} - ${formatBytes(img.size)}`);
  });
  console.log('');

  const results = [];
  let totalOriginalSize = 0;
  let totalNewSize = 0;

  // Procesar cada imagen
  for (let i = 0; i < largeImages.length; i++) {
    const imagePath = largeImages[i].path;
    const fileName = path.basename(imagePath);
    const relativePath = path.relative(publicDir, imagePath);
    
    console.log(`[${i + 1}/${largeImages.length}] Procesando ${relativePath}...`);

    const result = await processImage(imagePath);
    if (result) {
      results.push(result);
      totalOriginalSize += result.originalSize;
      totalNewSize += result.newSize;

      console.log(
        `  ✓ Optimizado: ${formatBytes(result.originalSize)} → ${formatBytes(result.newSize)} (${result.reduction.toFixed(1)}% reducción, ahorro: ${formatBytes(result.saved)})`
      );
    } else {
      console.log(`  - Sin cambios necesarios`);
    }
  }

  // Mostrar resumen
  console.log('\n' + '='.repeat(70));
  console.log('📊 RESUMEN DE OPTIMIZACIÓN');
  console.log('='.repeat(70));
  console.log(`Total de imágenes procesadas: ${largeImages.length}`);
  console.log(`Imágenes optimizadas: ${results.length}`);
  if (results.length > 0) {
    console.log(`Tamaño original total: ${formatBytes(totalOriginalSize)}`);
    console.log(`Tamaño optimizado total: ${formatBytes(totalNewSize)}`);
    console.log(
      `Reducción total: ${formatBytes(totalOriginalSize - totalNewSize)} (${((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1)}%)`
    );
  }

  // Mostrar archivos más grandes optimizados
  if (results.length > 0) {
    console.log('\n📋 Top 10 imágenes con mayor reducción:');
    results
      .sort((a, b) => b.saved - a.saved)
      .slice(0, 10)
      .forEach((result, index) => {
        const relativePath = path.relative(publicDir, result.path);
        console.log(
          `  ${index + 1}. ${relativePath}: ${formatBytes(result.originalSize)} → ${formatBytes(result.newSize)} (${result.reduction.toFixed(1)}%, ahorro: ${formatBytes(result.saved)})`
        );
      });
  }

  console.log('\n✅ Optimización completada!');
  console.log(`\n💡 Las imágenes originales fueron reemplazadas por las optimizadas.`);
};

// Ejecutar
optimizeAllImages().catch((error) => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});

