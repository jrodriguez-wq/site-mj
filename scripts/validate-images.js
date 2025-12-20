#!/usr/bin/env node

/**
 * Script de validación de imágenes
 * 
 * Verifica que todas las imágenes referenciadas en el código existan
 * y que estén usando las versiones optimizadas.
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const MAPPING_FILE = path.join(__dirname, '../image-optimization-mapping.json');

// Cargar mapeo de optimización
let imageMapping = {};
if (fs.existsSync(MAPPING_FILE)) {
  imageMapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));
}

// Obtener todas las rutas de imágenes del mapeo (nuevas)
const optimizedImages = new Set(Object.values(imageMapping));
const oldImages = new Set(Object.keys(imageMapping));

/**
 * Encuentra archivos recursivamente
 */
function findFiles(dir, extensions, files = []) {
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      
      // Saltar node_modules, .next, y archivos ocultos
      if (item === 'node_modules' || item === '.next' || item.startsWith('.')) {
        continue;
      }
      
      try {
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          findFiles(fullPath, extensions, files);
        } else if (stat.isFile()) {
          const ext = path.extname(item).slice(1);
          if (extensions.includes(ext)) {
            files.push(fullPath);
          }
        }
      } catch (err) {
        // Ignorar errores
      }
    }
  } catch (err) {
    // Ignorar errores
  }
  
  return files;
}

/**
 * Encuentra todas las referencias a imágenes en el código
 */
function findImageReferences() {
  const references = new Set();
  
  // Buscar en archivos de código
  const codeFiles = findFiles(
    path.join(__dirname, '..'),
    ['ts', 'tsx', 'js', 'jsx', 'json']
  );
  
  for (const file of codeFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      
      // Buscar patrones de rutas de imágenes
      const patterns = [
        /["'](\/img\/[^"']+\.(webp|jpg|jpeg|png))["']/g,
        /["'](\/recursos\/[^"']+\.(webp|jpg|jpeg|png))["']/g,
        /["'](\/modelos-optimized\/[^"']+\.(webp|jpg|jpeg|png))["']/g,
      ];
      
      patterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          references.add(match[1]);
        }
      });
    } catch (error) {
      // Ignorar errores de lectura
    }
  }
  
  return Array.from(references);
}

/**
 * Verifica si una imagen existe
 */
function imageExists(imagePath) {
  const fullPath = path.join(PUBLIC_DIR, imagePath);
  return fs.existsSync(fullPath);
}

/**
 * Función principal
 */
function main() {
  console.log('🔍 Validando imágenes del sitio...\n');
  
  const references = findImageReferences();
  console.log(`📋 Encontradas ${references.length} referencias a imágenes\n`);
  
  let valid = 0;
  let missing = [];
  let usingOldImages = [];
  let warnings = [];
  
  for (const ref of references) {
    // Verificar si es una imagen antigua
    if (oldImages.has(ref)) {
      usingOldImages.push({
        old: ref,
        new: imageMapping[ref],
      });
      continue;
    }
    
    // Verificar si existe
    if (imageExists(ref)) {
      valid++;
    } else {
      // Verificar si hay una versión optimizada
      const optimized = optimizedImages.has(ref);
      if (!optimized) {
        missing.push(ref);
      } else {
        warnings.push({
          ref,
          note: 'Referencia a imagen optimizada que existe',
        });
      }
    }
  }
  
  // Mostrar resultados
  console.log('='.repeat(70));
  console.log('📊 RESULTADOS DE VALIDACIÓN');
  console.log('='.repeat(70));
  console.log(`✅ Referencias válidas: ${valid}`);
  console.log(`⚠️  Referencias a imágenes antiguas: ${usingOldImages.length}`);
  console.log(`❌ Imágenes faltantes: ${missing.length}`);
  console.log(`ℹ️  Advertencias: ${warnings.length}`);
  console.log('');
  
  // Mostrar imágenes antiguas
  if (usingOldImages.length > 0) {
    console.log('⚠️  REFERENCIAS A IMÁGENES ANTIGUAS (deben actualizarse):');
    console.log('-'.repeat(70));
    usingOldImages.forEach(({ old, new: newPath }) => {
      console.log(`   ${old}`);
      console.log(`   → Debe ser: ${newPath}`);
      console.log('');
    });
  }
  
  // Mostrar imágenes faltantes
  if (missing.length > 0) {
    console.log('❌ IMÁGENES FALTANTES:');
    console.log('-'.repeat(70));
    missing.forEach(ref => {
      console.log(`   ${ref}`);
    });
    console.log('');
  }
  
  // Resumen final
  console.log('='.repeat(70));
  if (usingOldImages.length === 0 && missing.length === 0) {
    console.log('✅ ¡Todas las imágenes están correctamente referenciadas!');
  } else {
    console.log('⚠️  Se encontraron problemas que deben corregirse.');
  }
  console.log('='.repeat(70));
  console.log('');
}

main();
