#!/usr/bin/env node

/**
 * Script para optimizar y estandarizar imágenes en carpetas "amo"
 * 
 * 1. Convierte PNG/JPG a WebP optimizado
 * 2. Estandariza nombres: [modelo]-amo-[numero].webp
 * 3. Elimina archivos originales después de optimizar
 * 
 * Uso: node scripts/optimize-amo-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const modelos = ['louisiana', 'viana', 'delanie', 'aurora', 'langdon', 'emelia', 'duplex'];
const basePath = path.join(__dirname, '..', 'public', 'modelos-optimized');

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
 * Procesa las imágenes de una carpeta amo
 */
async function processAmoFolder(modelo) {
  const amoPath = path.join(basePath, modelo, 'amo');
  
  if (!fs.existsSync(amoPath)) {
    return { processed: [], skipped: true };
  }

  console.log(`\n📁 Procesando: ${modelo.toUpperCase()}/amo`);
  console.log('─'.repeat(50));

  // Leer archivos de la carpeta
  const files = fs.readdirSync(amoPath);
  
  // Filtrar solo imágenes (PNG, JPG, JPEG) y excluir WebP ya optimizados
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  });

  // También incluir WebP que no estén estandarizados
  const webpFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    if (ext !== '.webp') return false;
    // Verificar si el nombre ya está estandarizado
    const standardPattern = new RegExp(`^${modelo}-amo-\\d{2}\\.webp$`);
    return !standardPattern.test(file);
  });

  const allFiles = [...imageFiles, ...webpFiles];

  if (allFiles.length === 0) {
    console.log(`   ✓ No hay imágenes para procesar (ya están optimizadas y estandarizadas)`);
    return { processed: [], skipped: false };
  }

  console.log(`   📋 Encontradas ${allFiles.length} imagen(es) para procesar:\n`);

  const processed = [];
  let index = 1;

  // Ordenar archivos para mantener orden consistente
  allFiles.sort();

  for (const file of allFiles) {
    const inputPath = path.join(amoPath, file);
    const ext = path.extname(file).toLowerCase();
    
    // Generar nombre estandarizado
    const standardName = `${modelo}-amo-${index.toString().padStart(2, '0')}.webp`;
    const outputPath = path.join(amoPath, standardName);

    // Si ya existe un archivo con ese nombre y es diferente, encontrar siguiente número
    if (fs.existsSync(outputPath) && outputPath !== inputPath) {
      let nextIndex = index + 1;
      while (fs.existsSync(path.join(amoPath, `${modelo}-amo-${nextIndex.toString().padStart(2, '0')}.webp`))) {
        nextIndex++;
      }
      const finalName = `${modelo}-amo-${nextIndex.toString().padStart(2, '0')}.webp`;
      const finalPath = path.join(amoPath, finalName);
      
      // Si es WebP, solo renombrar
      if (ext === '.webp') {
        fs.renameSync(inputPath, finalPath);
        console.log(`   ✓ ${file} → ${finalName} (renombrado)`);
        processed.push({ original: file, optimized: finalName });
        index = nextIndex + 1;
      } else {
        // Convertir a WebP
        const result = await convertToWebp(inputPath, finalPath);
        if (result.success) {
          // Eliminar original
          fs.unlinkSync(inputPath);
          console.log(`   🗑️  Eliminado: ${file}`);
          processed.push({ original: file, optimized: finalName, savings: result.savings });
          index = nextIndex + 1;
        }
      }
      continue;
    }

    // Si el archivo ya tiene el nombre correcto y es WebP, saltar
    if (file === standardName && ext === '.webp') {
      console.log(`   ✓ ${file} (ya está estandarizado)`);
      index++;
      continue;
    }

    // Si es WebP pero con nombre diferente, solo renombrar
    if (ext === '.webp') {
      fs.renameSync(inputPath, outputPath);
      console.log(`   ✓ ${file} → ${standardName} (renombrado)`);
      processed.push({ original: file, optimized: standardName });
      index++;
      continue;
    }

    // Convertir PNG/JPG a WebP
    const result = await convertToWebp(inputPath, outputPath);
    if (result.success) {
      // Eliminar original
      try {
        fs.unlinkSync(inputPath);
        console.log(`   🗑️  Eliminado: ${file}`);
      } catch (err) {
        console.log(`   ⚠️  No se pudo eliminar ${file}: ${err.message}`);
      }
      processed.push({ original: file, optimized: standardName, savings: result.savings });
      index++;
    }
  }

  return { processed, skipped: false };
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando optimización y estandarización de imágenes AMO...\n');
  console.log('='.repeat(70));

  const allProcessed = {};
  let totalProcessed = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const modelo of modelos) {
    const result = await processAmoFolder(modelo);
    
    if (!result.skipped && result.processed.length > 0) {
      allProcessed[modelo] = result.processed;
      totalProcessed += result.processed.length;
      
      // Calcular ahorro total
      result.processed.forEach(item => {
        if (item.savings) {
          // Estimación basada en el porcentaje de ahorro
          // (no tenemos los tamaños exactos aquí, pero podemos mostrar el porcentaje promedio)
        }
      });
    }
  }

  // Resumen
  console.log('\n' + '='.repeat(70));
  console.log('✅ OPTIMIZACIÓN Y ESTANDARIZACIÓN COMPLETADA');
  console.log('='.repeat(70));
  console.log(`📊 Estadísticas:`);
  console.log(`   • Modelos procesados: ${Object.keys(allProcessed).length}`);
  console.log(`   • Archivos procesados: ${totalProcessed}`);

  if (totalProcessed > 0) {
    console.log(`\n📝 Archivos procesados por modelo:`);
    for (const modelo of Object.keys(allProcessed)) {
      const files = allProcessed[modelo];
      console.log(`\n   📁 ${modelo}:`);
      files.forEach(({ original, optimized, savings }) => {
        const savingsText = savings ? ` (${savings > 0 ? '-' : '+'}${Math.abs(savings)}%)` : '';
        console.log(`      • ${original} → ${optimized}${savingsText}`);
      });
    }
    
    console.log('\n✨ Formato estándar aplicado: [modelo]-amo-[numero].webp');
    console.log('\n📝 Próximos pasos:');
    console.log('   1. Revisa las imágenes optimizadas en las carpetas amo/');
    console.log('   2. Ejecuta el script para agregar las imágenes a model-images.ts');
    console.log('   3. O agrega manualmente las rutas al archivo model-images.ts\n');
  } else {
    console.log('\n✨ Todas las imágenes ya están optimizadas y estandarizadas.\n');
  }
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
