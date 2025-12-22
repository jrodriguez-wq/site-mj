#!/usr/bin/env node

/**
 * Script específico para optimizar y estandarizar testimonios
 * Convierte PNGs/JPGs en public/recursos/clientes/ a WebP
 * y los renombra como testimonio-X.webp de forma secuencial
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const CLIENTES_DIR = path.join(__dirname, '../public/recursos/clientes');

// Configuración de optimización
const CONFIG = {
  webp: { 
    quality: 90,        // Alta calidad para fotos
    effort: 6,          // Máximo esfuerzo de compresión
    smartSubsample: true // Mejor calidad en áreas con mucho detalle
  },
  maxWidth: 2560,
  maxHeight: 2560,
};

// Encontrar el último número de testimonio
function getLastTestimonioNumber() {
  const files = fs.readdirSync(CLIENTES_DIR);
  const testimonioFiles = files
    .filter(f => f.startsWith('testimonio-') && f.endsWith('.webp'))
    .map(f => {
      const match = f.match(/testimonio-(\d+)\.webp/);
      return match ? parseInt(match[1], 10) : 0;
    });
  
  return testimonioFiles.length > 0 ? Math.max(...testimonioFiles) : 0;
}

// Optimizar y convertir imagen
async function optimizeTestimonial(inputPath, outputPath) {
  try {
    const inputStats = fs.statSync(inputPath);
    console.log(`  Tamaño original: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`);
    
    // Obtener metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`  Dimensiones: ${metadata.width}x${metadata.height}`);
    
    let pipeline = sharp(inputPath);
    
    // Redimensionar si es muy grande
    if (metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight) {
      const ratio = Math.min(CONFIG.maxWidth / metadata.width, CONFIG.maxHeight / metadata.height);
      const newWidth = Math.round(metadata.width * ratio);
      const newHeight = Math.round(metadata.height * ratio);
      console.log(`  Redimensionando a: ${newWidth}x${newHeight}`);
      pipeline = pipeline.resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Convertir a WebP
    await pipeline
      .webp(CONFIG.webp)
      .toFile(outputPath);
    
    const outputStats = fs.statSync(outputPath);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    console.log(`  Tamaño WebP: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Reducción: ${reduction}%\n`);
    
    return {
      success: true,
      originalSize: inputStats.size,
      optimizedSize: outputStats.size,
      reduction: parseFloat(reduction)
    };
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}\n`);
    return { success: false, error: error.message };
  }
}

// Función principal
async function main() {
  console.log('🔍 Buscando imágenes para optimizar en clientes...\n');
  
  const files = fs.readdirSync(CLIENTES_DIR);
  
  // Encontrar imágenes que NO son testimonios ya nombrados
  const imagesToProcess = files
    .filter(f => {
      const ext = path.extname(f).toLowerCase();
      const isImage = ['.png', '.jpg', '.jpeg'].includes(ext);
      const isNotTestimonio = !f.startsWith('testimonio-');
      const isNotLogo = !f.includes('logo');
      return isImage && isNotTestimonio && isNotLogo;
    })
    .sort(); // Ordenar alfabéticamente para mantener consistencia
  
  if (imagesToProcess.length === 0) {
    console.log('✓ No se encontraron imágenes para procesar.');
    console.log('  Todas las imágenes ya están optimizadas y nombradas correctamente.\n');
    return;
  }
  
  console.log(`Encontradas ${imagesToProcess.length} imagen(es) para procesar:\n`);
  imagesToProcess.forEach(f => {
    const stats = fs.statSync(path.join(CLIENTES_DIR, f));
    console.log(`  - ${f} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
  });
  console.log('');
  
  const lastNumber = getLastTestimonioNumber();
  console.log(`Último testimonio encontrado: testimonio-${lastNumber}.webp\n`);
  console.log('Iniciando optimización y conversión...\n');
  
  let successCount = 0;
  let currentNumber = lastNumber + 1;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const imageFile of imagesToProcess) {
    const inputPath = path.join(CLIENTES_DIR, imageFile);
    const outputFile = `testimonio-${currentNumber}.webp`;
    const outputPath = path.join(CLIENTES_DIR, outputFile);
    
    console.log(`[${currentNumber - lastNumber}/${imagesToProcess.length}] Procesando ${imageFile}...`);
    console.log(`  → ${outputFile}`);
    
    const result = await optimizeTestimonial(inputPath, outputPath);
    
    if (result.success) {
      successCount++;
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
      
      // Eliminar archivo original
      try {
        fs.unlinkSync(inputPath);
        console.log(`  ✓ Archivo original eliminado\n`);
      } catch (err) {
        console.log(`  ⚠️  No se pudo eliminar el archivo original: ${err.message}\n`);
      }
      
      currentNumber++;
    } else {
      console.log(`  ✗ No se pudo procesar\n`);
    }
  }
  
  // Resumen
  console.log('='.repeat(60));
  console.log('✅ OPTIMIZACIÓN COMPLETADA');
  console.log('='.repeat(60));
  console.log(`📊 Estadísticas:`);
  console.log(`   • Procesadas: ${successCount}/${imagesToProcess.length}`);
  
  if (totalOriginalSize > 0) {
    const totalReduction = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
    console.log(`   • Tamaño original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   • Tamaño optimizado: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   • Ahorro total: ${totalReduction}%`);
  }
  
  if (successCount > 0) {
    console.log(`\n📝 Nuevos testimonios creados:`);
    for (let i = lastNumber + 1; i < currentNumber; i++) {
      console.log(`   • testimonio-${i}.webp`);
    }
    console.log(`\n💡 Próximo paso: Actualiza el componente happy-families-gallery.tsx`);
    console.log(`   para incluir las nuevas imágenes.\n`);
  } else {
    console.log(`\n⚠️  No se procesaron imágenes. Revisa los errores arriba.\n`);
    process.exit(1);
  }
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});

