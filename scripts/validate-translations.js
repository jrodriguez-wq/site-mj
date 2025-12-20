#!/usr/bin/env node

/**
 * Script para validar que todas las claves de traducción usadas en el código
 * existan en los archivos de traducción (en.json y es.json)
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../locales');
const EN_FILE = path.join(LOCALES_DIR, 'en.json');
const ES_FILE = path.join(LOCALES_DIR, 'es.json');

/**
 * Obtiene un valor anidado de un objeto usando dot notation
 */
function getNestedValue(obj, keyPath) {
  return keyPath.split('.').reduce((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      return current[key];
    }
    return undefined;
  }, obj);
}

/**
 * Busca todas las claves de traducción usadas en archivos TypeScript/TSX
 */
function findTranslationKeys(directory = path.join(__dirname, '..')) {
  const translationKeys = new Set();
  const translationPattern = /t\(["']([^"']+)["']\)/g;
  
  function searchInFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let match;
      
      while ((match = translationPattern.exec(content)) !== null) {
        const key = match[1];
        // Filtrar claves que parecen ser traducciones
        // Debe tener al menos un punto, no ser una ruta de archivo, no tener ${}
        // Debe tener al menos 2 caracteres y al menos una letra
        if (key && 
            key.length >= 2 &&
            /[a-zA-Z]/.test(key) && // Debe contener al menos una letra
            key.includes('.') && 
            !key.startsWith('./') && 
            !key.startsWith('../') && 
            !key.startsWith('@/') &&
            !key.includes('${') &&
            !key.includes('/') &&
            key !== '.') { // Excluir punto simple
          translationKeys.add(key);
        }
      }
    } catch (error) {
      // Ignorar errores de lectura
    }
  }
  
  function searchDirectory(dir) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        // Ignorar node_modules, .next, etc.
        if (entry.name.startsWith('.') || 
            entry.name === 'node_modules' || 
            entry.name === '.next' ||
            entry.name === 'dist' ||
            entry.name === 'build' ||
            entry.name === 'scripts') {
          continue;
        }
        
        if (entry.isDirectory()) {
          searchDirectory(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
          searchInFile(fullPath);
        }
      }
    } catch (error) {
      // Ignorar errores
    }
  }
  
  searchDirectory(directory);
  return Array.from(translationKeys).sort();
}

/**
 * Valida que todas las claves existan en ambos archivos de traducción
 */
function validateTranslations() {
  console.log('🔍 Buscando claves de traducción en el código...\n');
  
  const usedKeys = findTranslationKeys();
  console.log(`📋 Encontradas ${usedKeys.length} claves de traducción usadas\n`);
  
  // Cargar archivos de traducción
  let enTranslations, esTranslations;
  try {
    enTranslations = JSON.parse(fs.readFileSync(EN_FILE, 'utf8'));
    esTranslations = JSON.parse(fs.readFileSync(ES_FILE, 'utf8'));
  } catch (error) {
    console.error('❌ Error cargando archivos de traducción:', error.message);
    process.exit(1);
  }
  
  // Validar cada clave
  const missingInEn = [];
  const missingInEs = [];
  const missingInBoth = [];
  const valid = [];
  
  for (const key of usedKeys) {
    const enValue = getNestedValue(enTranslations, key);
    const esValue = getNestedValue(esTranslations, key);
    
    if (!enValue && !esValue) {
      missingInBoth.push(key);
    } else if (!enValue) {
      missingInEn.push(key);
    } else if (!esValue) {
      missingInEs.push(key);
    } else {
      valid.push(key);
    }
  }
  
  // Mostrar resultados
  console.log('='.repeat(70));
  console.log('📊 RESULTADOS DE VALIDACIÓN');
  console.log('='.repeat(70));
  console.log(`✅ Claves válidas en ambos idiomas: ${valid.length}`);
  console.log(`⚠️  Faltantes en inglés: ${missingInEn.length}`);
  console.log(`⚠️  Faltantes en español: ${missingInEs.length}`);
  console.log(`❌ Faltantes en ambos idiomas: ${missingInBoth.length}`);
  console.log('');
  
  // Mostrar detalles de claves faltantes
  if (missingInEn.length > 0) {
    console.log('⚠️  CLAVES FALTANTES EN INGLÉS (en.json):');
    console.log('-'.repeat(70));
    missingInEn.forEach(key => console.log(`   ${key}`));
    console.log('');
  }
  
  if (missingInEs.length > 0) {
    console.log('⚠️  CLAVES FALTANTES EN ESPAÑOL (es.json):');
    console.log('-'.repeat(70));
    missingInEs.forEach(key => console.log(`   ${key}`));
    console.log('');
  }
  
  if (missingInBoth.length > 0) {
    console.log('❌ CLAVES FALTANTES EN AMBOS IDIOMAS:');
    console.log('-'.repeat(70));
    missingInBoth.forEach(key => console.log(`   ${key}`));
    console.log('');
  }
  
  // Resumen final
  console.log('='.repeat(70));
  if (missingInEn.length === 0 && missingInEs.length === 0 && missingInBoth.length === 0) {
    console.log('✅ ¡Todas las traducciones están correctas!');
  } else {
    console.log('⚠️  Se encontraron traducciones faltantes que deben corregirse.');
    process.exit(1);
  }
  console.log('='.repeat(70));
  console.log('');
}

// Ejecutar validación
validateTranslations();

