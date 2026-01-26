#!/usr/bin/env node

/**
 * Script para agregar automáticamente las imágenes de carpetas "amo" al archivo model-images.ts
 * 
 * Escanea las carpetas amo/ de cada modelo y agrega las rutas al archivo model-images.ts
 * 
 * Uso: node scripts/add-amo-images-to-model-images.js
 */

const fs = require('fs');
const path = require('path');

const modelos = ['louisiana', 'viana', 'delanie', 'aurora', 'langdon', 'emelia', 'duplex'];
const basePath = path.join(__dirname, '..', 'public', 'modelos-optimized');
const modelImagesPath = path.join(__dirname, '..', 'lib', 'models', 'model-images.ts');

/**
 * Obtiene todas las imágenes estandarizadas de una carpeta amo
 */
function getAmoImages(modelo) {
  const amoPath = path.join(basePath, modelo, 'amo');
  
  if (!fs.existsSync(amoPath)) {
    return [];
  }

  const files = fs.readdirSync(amoPath);
  
  // Filtrar solo imágenes WebP con formato estandarizado: [modelo]-amo-[numero].webp
  const amoImages = files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      if (ext !== '.webp') return false;
      
      const standardPattern = new RegExp(`^${modelo}-amo-\\d{2}\\.webp$`);
      return standardPattern.test(file);
    })
    .sort((a, b) => {
      // Ordenar por número
      const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
      const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
      return numA - numB;
    })
    .map(file => `/modelos-optimized/${modelo}/amo/${file}`);

  return amoImages;
}

/**
 * Genera el código TypeScript para MODEL_AMO_IMAGES
 */
function generateAmoImagesCode(amoImagesByModel) {
  let code = '\n// Imágenes amobladas para cada modelo\n';
  code += 'export const MODEL_AMO_IMAGES: Record<string, string[]> = {\n';

  for (const modelo of modelos) {
    const images = amoImagesByModel[modelo] || [];
    
    if (images.length === 0) {
      code += `  ${modelo}: [],\n`;
    } else {
      code += `  ${modelo}: [\n`;
      images.forEach(image => {
        code += `    \`${image}\`,\n`;
      });
      code += `  ],\n`;
    }
  }

  code += '};\n';
  return code;
}

/**
 * Genera las funciones helper para obtener imágenes amobladas
 */
function generateHelperFunctions() {
  return `
/**
 * Obtiene solo las imágenes amobladas de un modelo
 */
export const getModelAmoImages = (modelKey: string): string[] => {
  return MODEL_AMO_IMAGES[modelKey.toLowerCase()] || [];
};
`;
}

/**
 * Función principal
 */
function main() {
  console.log('🚀 Escaneando carpetas amo/ para agregar imágenes a model-images.ts...\n');

  const amoImagesByModel = {};
  let totalImages = 0;

  // Escanear cada modelo
  for (const modelo of modelos) {
    const images = getAmoImages(modelo);
    if (images.length > 0) {
      amoImagesByModel[modelo] = images;
      totalImages += images.length;
      console.log(`   ✓ ${modelo}: ${images.length} imagen(es) encontrada(s)`);
    } else {
      console.log(`   ⚠️  ${modelo}: No se encontraron imágenes estandarizadas`);
    }
  }

  if (totalImages === 0) {
    console.log('\n⚠️  No se encontraron imágenes estandarizadas en las carpetas amo/');
    console.log('   Ejecuta primero: node scripts/optimize-amo-images.js\n');
    return;
  }

  console.log(`\n📊 Total: ${totalImages} imagen(es) encontrada(s)\n`);

  // Leer el archivo actual
  let content = fs.readFileSync(modelImagesPath, 'utf8');

  // Verificar si MODEL_AMO_IMAGES ya existe
  if (content.includes('MODEL_AMO_IMAGES')) {
    console.log('⚠️  MODEL_AMO_IMAGES ya existe en el archivo.');
    console.log('   Actualizando con las nuevas imágenes...\n');
    
    // Reemplazar la sección existente
    const regex = /\/\/ Imágenes amobladas para cada modelo[\s\S]*?export const MODEL_AMO_IMAGES: Record<string, string\[\]> = \{[\s\S]*?\};\n/g;
    const newAmoCode = generateAmoImagesCode(amoImagesByModel);
    content = content.replace(regex, newAmoCode);
  } else {
    // Agregar después de MODEL_EXTERIOR_IMAGES
    const exteriorEndMarker = '};\n';
    const exteriorEndIndex = content.lastIndexOf(exteriorEndMarker);
    
    if (exteriorEndIndex === -1) {
      console.error('❌ No se pudo encontrar el final de MODEL_EXTERIOR_IMAGES');
      return;
    }

    const insertPosition = exteriorEndIndex + exteriorEndMarker.length;
    const newCode = generateAmoImagesCode(amoImagesByModel);
    content = content.slice(0, insertPosition) + newCode + content.slice(insertPosition);
  }

  // Verificar si getModelAmoImages ya existe
  if (!content.includes('getModelAmoImages')) {
    // Agregar la función helper antes de getModelImages
    const getModelImagesMarker = '/**\n * Obtiene todas las imágenes de un modelo';
    const getModelImagesIndex = content.indexOf(getModelImagesMarker);
    
    if (getModelImagesIndex !== -1) {
      const helperFunctions = generateHelperFunctions();
      content = content.slice(0, getModelImagesIndex) + helperFunctions + '\n' + content.slice(getModelImagesIndex);
    }
  } else {
    console.log('   ✓ getModelAmoImages ya existe, no se actualizará');
  }

  // Actualizar getModelImages para incluir imágenes amobladas (opcional, comentado por ahora)
  // El usuario puede decidir si quiere incluirlas en getModelImages o mantenerlas separadas

  // Escribir el archivo actualizado
  fs.writeFileSync(modelImagesPath, content, 'utf8');

  console.log('✅ Archivo model-images.ts actualizado exitosamente!\n');
  console.log('📝 Cambios realizados:');
  console.log('   • Agregada constante MODEL_AMO_IMAGES');
  console.log('   • Agregada función getModelAmoImages()\n');
  console.log('✨ Ahora puedes usar las imágenes amobladas en tu sitio web.\n');
}

// Ejecutar
try {
  main();
} catch (error) {
  console.error('❌ Error fatal:', error);
  process.exit(1);
}
