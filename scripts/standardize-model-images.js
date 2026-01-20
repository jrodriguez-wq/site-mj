#!/usr/bin/env node

/**
 * Script para estandarizar nombres de imágenes de modelos
 * Formato: [modelo]-[interior/exterior]-[numero].webp
 * 
 * Ejemplo: viana-interior-1.webp, louisiana-exterior-1.webp
 */

const fs = require('fs');
const path = require('path');

const modelos = ['louisiana', 'viana', 'delanie', 'aurora', 'langdon', 'emelia', 'duplex'];
const basePath = path.join(__dirname, '..', 'public', 'modelos-optimized');

// Excluir archivos que no deben renombrarse
const excludeFiles = ['duplex-plano.webp']; // Planos y otros archivos especiales

/**
 * Obtiene todos los archivos de una carpeta
 */
function getFiles(folderPath) {
  if (!fs.existsSync(folderPath)) {
    return [];
  }
  return fs.readdirSync(folderPath)
    .filter(file => file.endsWith('.webp') && !excludeFiles.includes(file))
    .map(file => path.join(folderPath, file));
}

/**
 * Genera el nuevo nombre estandarizado
 */
function generateStandardizedName(modelo, tipo, index) {
  return `${modelo}-${tipo}-${index.toString().padStart(2, '0')}.webp`;
}

/**
 * Renombra archivos en una carpeta
 */
function renameFiles(folderPath, modelo, tipo) {
  const files = getFiles(folderPath);
  
  if (files.length === 0) {
    console.log(`   ⚠️  No hay archivos en ${path.basename(folderPath)}`);
    return [];
  }

  // Ordenar archivos para mantener orden consistente
  files.sort();

  const renamed = [];
  let index = 1;

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    const newName = generateStandardizedName(modelo, tipo, index);
    const newPath = path.join(folderPath, newName);

    // Si el nombre ya es correcto, saltar
    if (fileName === newName) {
      console.log(`   ✓ ${fileName} (ya está estandarizado)`);
      index++;
      continue;
    }

    // Verificar si el nuevo nombre ya existe (para evitar conflictos)
    if (fs.existsSync(newPath) && newPath !== filePath) {
      console.log(`   ⚠️  ${fileName} → ${newName} (ya existe, usando siguiente número)`);
      // Encontrar el siguiente número disponible
      let nextIndex = index + 1;
      while (fs.existsSync(path.join(folderPath, generateStandardizedName(modelo, tipo, nextIndex)))) {
        nextIndex++;
      }
      const finalName = generateStandardizedName(modelo, tipo, nextIndex);
      const finalPath = path.join(folderPath, finalName);
      fs.renameSync(filePath, finalPath);
      renamed.push({ old: fileName, new: finalName });
      console.log(`   ✓ ${fileName} → ${finalName}`);
      index = nextIndex + 1;
    } else {
      fs.renameSync(filePath, newPath);
      renamed.push({ old: fileName, new: newName });
      console.log(`   ✓ ${fileName} → ${newName}`);
      index++;
    }
  }

  return renamed;
}

/**
 * Función principal
 */
function main() {
  console.log('🚀 Iniciando estandarización de nombres de imágenes...\n');

  const allRenamed = {};

  for (const modelo of modelos) {
    console.log(`\n📁 Procesando modelo: ${modelo.toUpperCase()}`);
    console.log('─'.repeat(50));

    const modeloPath = path.join(basePath, modelo);
    
    if (!fs.existsSync(modeloPath)) {
      console.log(`   ⚠️  Carpeta no existe: ${modeloPath}`);
      continue;
    }

    // Procesar interior
    const interiorPath = path.join(modeloPath, 'interior');
    if (fs.existsSync(interiorPath)) {
      console.log(`\n   📸 Interior:`);
      const interiorRenamed = renameFiles(interiorPath, modelo, 'interior');
      if (interiorRenamed.length > 0) {
        if (!allRenamed[modelo]) allRenamed[modelo] = {};
        allRenamed[modelo].interior = interiorRenamed;
      }
    }

    // Procesar exterior
    const exteriorPath = path.join(modeloPath, 'exterior');
    if (fs.existsSync(exteriorPath)) {
      console.log(`\n   📸 Exterior:`);
      const exteriorRenamed = renameFiles(exteriorPath, modelo, 'exterior');
      if (exteriorRenamed.length > 0) {
        if (!allRenamed[modelo]) allRenamed[modelo] = {};
        allRenamed[modelo].exterior = exteriorRenamed;
      }
    }
  }

  // Resumen
  console.log('\n' + '='.repeat(70));
  console.log('✅ ESTANDARIZACIÓN COMPLETADA');
  console.log('='.repeat(70));

  let totalRenamed = 0;
  for (const modelo of Object.keys(allRenamed)) {
    const count = (allRenamed[modelo].interior?.length || 0) + (allRenamed[modelo].exterior?.length || 0);
    if (count > 0) {
      console.log(`\n📊 ${modelo}: ${count} archivo(s) renombrado(s)`);
      totalRenamed += count;
    }
  }

  if (totalRenamed === 0) {
    console.log('\n✨ Todas las imágenes ya están estandarizadas.');
  } else {
    console.log(`\n📈 Total: ${totalRenamed} archivo(s) renombrado(s)`);
    console.log('\n📝 Nota: Ahora puedes actualizar el archivo model-images.ts con los nuevos nombres.');
  }

  console.log('\n✨ Formato estándar: [modelo]-[interior/exterior]-[numero].webp\n');
}

// Ejecutar
try {
  main();
} catch (error) {
  console.error('❌ Error fatal:', error);
  process.exit(1);
}

