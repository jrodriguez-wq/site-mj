#!/usr/bin/env node

/**
 * Script para convertir imágenes PNG a WebP optimizadas
 * Convierte archivos PNG en public/recursos/clientes/ a WebP con numeración secuencial
 * Optimiza las imágenes para web manteniendo alta calidad
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const CLIENTES_DIR = path.join(__dirname, '../public/recursos/clientes');

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

// Convertir PNG a WebP optimizado
async function convertPngToWebp(inputPath, outputPath) {
  try {
    console.log(`Procesando ${path.basename(inputPath)}...`);
    
    // Obtener metadata de la imagen original
    const metadata = await sharp(inputPath).metadata();
    console.log(`  Dimensiones: ${metadata.width}x${metadata.height}`);
    console.log(`  Formato original: ${metadata.format}`);
    
    // Optimizar y convertir a WebP
    // Redimensionar si es muy grande (máximo 2560px en el lado más largo)
    const maxDimension = 2560;
    let pipeline = sharp(inputPath);
    
    if (metadata.width > maxDimension || metadata.height > maxDimension) {
      const ratio = Math.min(maxDimension / metadata.width, maxDimension / metadata.height);
      const newWidth = Math.round(metadata.width * ratio);
      const newHeight = Math.round(metadata.height * ratio);
      console.log(`  Redimensionando a: ${newWidth}x${newHeight}`);
      pipeline = pipeline.resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    await pipeline
      .webp({ 
        quality: 90,        // Alta calidad
        effort: 6,         // Máximo esfuerzo de compresión
        smartSubsample: true // Mejor calidad en áreas con mucho detalle
      })
      .toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    console.log(`✓ Convertido: ${path.basename(outputPath)}`);
    console.log(`  Tamaño original: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Tamaño WebP: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Reducción: ${reduction}%\n`);
    
    return true;
  } catch (error) {
    console.error(`✗ Error procesando ${path.basename(inputPath)}:`);
    console.error(`  ${error.message}\n`);
    return false;
  }
}

// Función principal
async function main() {
  console.log('🔍 Buscando archivos PNG...\n');
  
  const files = fs.readdirSync(CLIENTES_DIR);
  const pngFiles = files
    .filter(f => f.toLowerCase().endsWith('.png'))
    .sort(); // Ordenar alfabéticamente para mantener consistencia
  
  if (pngFiles.length === 0) {
    console.log('No se encontraron archivos PNG para convertir.');
    console.log('Coloca los archivos PNG en: public/recursos/clientes/\n');
    return;
  }
  
  console.log(`Encontrados ${pngFiles.length} archivo(s) PNG:\n`);
  pngFiles.forEach(f => {
    const stats = fs.statSync(path.join(CLIENTES_DIR, f));
    console.log(`  - ${f} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
  });
  console.log('');
  
  const lastNumber = getLastTestimonioNumber();
  console.log(`Último testimonio encontrado: testimonio-${lastNumber}.webp\n`);
  console.log('Iniciando conversión y optimización...\n');
  
  let successCount = 0;
  let currentNumber = lastNumber + 1;
  
  for (const pngFile of pngFiles) {
    const inputPath = path.join(CLIENTES_DIR, pngFile);
    const outputFile = `testimonio-${currentNumber}.webp`;
    const outputPath = path.join(CLIENTES_DIR, outputFile);
    
    const success = await convertPngToWebp(inputPath, outputPath);
    
    if (success) {
      successCount++;
      currentNumber++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Conversión completada: ${successCount}/${pngFiles.length} archivos convertidos`);
  console.log('='.repeat(50));
  
  if (successCount === pngFiles.length) {
    console.log('\n🎉 ¡Todas las imágenes se convirtieron exitosamente!');
    console.log(`📝 Nuevas imágenes creadas: testimonio-${lastNumber + 1}.webp hasta testimonio-${currentNumber - 1}.webp`);
    console.log('\n💡 Próximos pasos:');
    console.log('   1. Actualiza el componente happy-families-gallery.tsx');
    console.log('   2. Agrega las nuevas imágenes al array familyImages');
    console.log('   3. Opcional: Elimina los archivos PNG originales si ya no los necesitas\n');
  } else {
    console.log('\n⚠️  Algunos archivos no se pudieron convertir.');
    console.log('   Revisa los errores arriba.\n');
    process.exit(1);
  }
}

// Ejecutar
main().catch(error => {
  console.error('Error fatal:', error);
  process.exit(1);
});

