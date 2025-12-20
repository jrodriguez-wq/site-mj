#!/usr/bin/env node

/**
 * Script completo de optimización de imágenes
 * 
 * Este script:
 * 1. Identifica todas las imágenes en /public
 * 2. Las optimiza (reduce tamaño, convierte a WebP cuando es apropiado)
 * 3. Renombra las imágenes con nombres normalizados
 * 4. Busca y actualiza todas las referencias en el código
 * 5. Elimina las imágenes antiguas (solo si son diferentes)
 * 
 * Uso: pnpm run optimize-all
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '../public');
const MAPPING_FILE = path.join(__dirname, '../image-optimization-mapping.json');

// Configuración de optimización
const CONFIG = {
  jpg: { quality: 85, mozjpeg: true },
  png: { quality: 90, compressionLevel: 9 },
  webp: { quality: 85, effort: 6 },
  maxWidth: 2560,
  maxHeight: 2560,
  // No convertir a WebP estos archivos (logos, iconos, favicons)
  keepOriginalFormat: ['logo', 'icon', 'favicon', 'apple-touch', 'android-chrome'],
};

// Mapeo de imágenes antiguas a nuevas
const imageMapping = {};
const processedImages = [];

/**
 * Normaliza el nombre de archivo para web
 */
function normalizeFileName(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const fileName = baseName.toLowerCase();
  
  // Verificar si debemos mantener el formato original
  const shouldKeepFormat = CONFIG.keepOriginalFormat.some(keyword => 
    fileName.includes(keyword)
  );
  
  // Normalizar nombre: eliminar espacios, caracteres especiales
  const normalized = baseName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Determinar extensión optimizada
  let optimizedExt = ext;
  if (!shouldKeepFormat) {
    if (ext === '.jpg' || ext === '.jpeg') {
      optimizedExt = '.webp';
    } else if (ext === '.png' && !fileName.includes('logo') && !fileName.includes('icon') && !fileName.includes('favicon')) {
      optimizedExt = '.webp';
    }
  }
  
  return path.join(dir, `${normalized}${optimizedExt}`);
}

/**
 * Optimiza una imagen
 */
async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = await fs.promises.stat(inputPath);
    const ext = path.extname(inputPath).toLowerCase();
    const outputExt = path.extname(outputPath).toLowerCase();
    
    let sharpInstance = sharp(inputPath);
    const metadata = await sharpInstance.metadata();
    
    // Redimensionar si es muy grande
    if (metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight) {
      sharpInstance = sharpInstance.resize(CONFIG.maxWidth, CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    
    // Aplicar optimización según formato de salida
    if (outputExt === '.webp') {
      await sharpInstance.webp(CONFIG.webp).toFile(outputPath);
    } else if (outputExt === '.png') {
      await sharpInstance.png(CONFIG.png).toFile(outputPath);
    } else if (outputExt === '.jpg' || outputExt === '.jpeg') {
      await sharpInstance.jpeg(CONFIG.jpg).toFile(outputPath);
    } else {
      await fs.promises.copyFile(inputPath, outputPath);
    }
    
    const newStats = await fs.promises.stat(outputPath);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
    
    return {
      originalSize: stats.size,
      optimizedSize: newStats.size,
      savings: parseFloat(savings),
      success: true,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Encuentra todas las imágenes recursivamente
 */
function findImages(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          if (!file.startsWith('.') && file !== 'node_modules' && file !== '.next') {
            findImages(filePath, fileList);
          }
        } else {
          const ext = path.extname(file).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            fileList.push(filePath);
          }
        }
      } catch (err) {
        // Ignorar errores de acceso
      }
    });
  } catch (err) {
    // Ignorar errores de lectura
  }
  
  return fileList;
}

/**
 * Busca referencias a una imagen en el código
 */
function findReferences(imagePath) {
  const relativePath = imagePath.replace(PUBLIC_DIR, '').replace(/\\/g, '/');
  const escapedPath = relativePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const references = new Set();
  
  try {
    const result = execSync(
      `grep -rl "${escapedPath}" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.json" ${path.join(__dirname, '..')} 2>/dev/null || true`,
      { encoding: 'utf-8', cwd: path.join(__dirname, '..'), maxBuffer: 10 * 1024 * 1024 }
    );
    
    if (result.trim()) {
      result.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && fs.existsSync(trimmed)) {
          references.add(trimmed);
        }
      });
    }
  } catch (error) {
    // Ignorar errores
  }
  
  return Array.from(references);
}

/**
 * Actualiza referencias en archivos
 */
async function updateReferences(oldPath, newPath) {
  const oldRelative = oldPath.replace(PUBLIC_DIR, '').replace(/\\/g, '/');
  const newRelative = newPath.replace(PUBLIC_DIR, '').replace(/\\/g, '/');
  
  // Si son iguales, no hay nada que actualizar
  if (oldRelative === newRelative) {
    return 0;
  }
  
  const escapedOld = oldRelative.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const files = findReferences(oldPath);
  let updatedCount = 0;
  
  for (const file of files) {
    try {
      let content = await fs.promises.readFile(file, 'utf-8');
      const originalContent = content;
      
      // Reemplazar todas las ocurrencias (con y sin barra inicial)
      const patterns = [
        new RegExp(escapedOld.replace(/\//g, '\\/'), 'g'),
        new RegExp(escapedOld.replace(/\//g, '\\/').replace(/^\//, ''), 'g'),
      ];
      
      patterns.forEach(pattern => {
        content = content.replace(pattern, newRelative);
      });
      
      if (content !== originalContent) {
        await fs.promises.writeFile(file, content, 'utf-8');
        updatedCount++;
      }
    } catch (error) {
      // Ignorar errores de archivos individuales
    }
  }
  
  return updatedCount;
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando optimización completa de imágenes...\n');
  
  // Encontrar todas las imágenes
  console.log('🔍 Buscando imágenes en /public...');
  const images = findImages(PUBLIC_DIR);
  console.log(`   ✓ Encontradas ${images.length} imágenes\n`);
  
  if (images.length === 0) {
    console.log('⚠️  No se encontraron imágenes para optimizar.');
    return;
  }
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processed = 0;
  let skipped = 0;
  let errors = 0;
  
  // Procesar cada imagen
  for (let i = 0; i < images.length; i++) {
    const imagePath = images[i];
    const relativePath = path.relative(PUBLIC_DIR, imagePath);
    const outputPath = normalizeFileName(imagePath);
    
    process.stdout.write(`[${i + 1}/${images.length}] 📸 ${relativePath}... `);
    
    // Si ya está optimizado, saltar
    if (imagePath === outputPath && path.extname(imagePath) === '.webp') {
      console.log('⏭️  Ya optimizado');
      skipped++;
      continue;
    }
    
    // Crear directorio de salida si no existe
    await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
    
    // Optimizar
    const result = await optimizeImage(imagePath, outputPath);
    
    if (!result.success) {
      console.log(`❌ Error: ${result.error}`);
      errors++;
      continue;
    }
    
    totalOriginalSize += result.originalSize;
    totalOptimizedSize += result.optimizedSize;
    processed++;
    
    const oldRelative = path.relative(PUBLIC_DIR, imagePath).replace(/\\/g, '/');
    const newRelative = path.relative(PUBLIC_DIR, outputPath).replace(/\\/g, '/');
    
    console.log(`✓ ${(result.originalSize / 1024).toFixed(1)}KB → ${(result.optimizedSize / 1024).toFixed(1)}KB (${result.savings > 0 ? '-' : '+'}${Math.abs(result.savings)}%)`);
    
    // Guardar mapeo
    if (oldRelative !== newRelative) {
      imageMapping[oldRelative] = newRelative;
      processedImages.push({
        old: oldRelative,
        new: newRelative,
        savings: result.savings,
      });
      
      // Actualizar referencias
      const updated = await updateReferences(imagePath, outputPath);
      if (updated > 0) {
        console.log(`   🔄 ${updated} archivo(s) actualizado(s)`);
      }
      
      // Eliminar imagen antigua solo si es diferente
      try {
        await fs.promises.unlink(imagePath);
      } catch (err) {
        // Ignorar si no se puede eliminar
      }
    }
  }
  
  // Guardar mapeo
  if (Object.keys(imageMapping).length > 0) {
    await fs.promises.writeFile(MAPPING_FILE, JSON.stringify(imageMapping, null, 2), 'utf-8');
  }
  
  // Resumen
  console.log('\n' + '='.repeat(70));
  console.log('✅ OPTIMIZACIÓN COMPLETADA');
  console.log('='.repeat(70));
  console.log(`📊 Estadísticas:`);
  console.log(`   • Procesadas: ${processed}`);
  console.log(`   • Omitidas: ${skipped}`);
  console.log(`   • Errores: ${errors}`);
  if (totalOriginalSize > 0) {
    console.log(`   • Tamaño original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   • Tamaño optimizado: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   • Ahorro total: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
  }
  if (Object.keys(imageMapping).length > 0) {
    console.log(`   • Mapeo guardado en: ${MAPPING_FILE}`);
  }
  console.log('\n💡 Siguiente paso: Revisa los cambios y prueba el sitio.');
  console.log('   Ejecuta: pnpm dev\n');
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
