const fs = require('fs');
const path = require('path');

const modelosPath = path.join(__dirname, '../public/modelos-optimized');

// Función para determinar si una imagen es de exterior
const isExteriorImage = (fileName) => {
  const lowerFileName = fileName.toLowerCase();
  return lowerFileName.startsWith('ex');
};

// Función para organizar imágenes de un modelo
const organizeModelImages = (modelFolder) => {
  const modelPath = path.join(modelosPath, modelFolder);
  
  if (!fs.existsSync(modelPath)) {
    console.log(`⚠️  Carpeta ${modelFolder} no existe, saltando...`);
    return;
  }

  const exteriorPath = path.join(modelPath, 'exterior');
  const interiorPath = path.join(modelPath, 'interior');

  // Crear subcarpetas si no existen
  if (!fs.existsSync(exteriorPath)) {
    fs.mkdirSync(exteriorPath, { recursive: true });
    console.log(`✅ Creada carpeta: ${modelFolder}/exterior`);
  }
  if (!fs.existsSync(interiorPath)) {
    fs.mkdirSync(interiorPath, { recursive: true });
    console.log(`✅ Creada carpeta: ${modelFolder}/interior`);
  }

  // Leer archivos en la carpeta del modelo
  const files = fs.readdirSync(modelPath);
  let movedExterior = 0;
  let movedInterior = 0;
  let skipped = 0;

  files.forEach((file) => {
    const filePath = path.join(modelPath, file);
    const stat = fs.statSync(filePath);

    // Solo procesar archivos (no carpetas) y excluir mapping.json
    if (stat.isFile() && file !== 'mapping.json' && file.endsWith('.webp')) {
      const targetPath = isExteriorImage(file)
        ? path.join(exteriorPath, file)
        : path.join(interiorPath, file);

      // Solo mover si el archivo no existe en el destino
      if (!fs.existsSync(targetPath)) {
        fs.renameSync(filePath, targetPath);
        if (isExteriorImage(file)) {
          movedExterior++;
        } else {
          movedInterior++;
        }
      } else {
        skipped++;
      }
    }
  });

  console.log(`📦 ${modelFolder}: ${movedExterior} exterior, ${movedInterior} interior, ${skipped} saltados`);
};

// Lista de modelos a procesar
const models = ['aurora', 'delanie', 'emelia', 'langdon', 'louisiana', 'viana', 'duplex'];

console.log('🚀 Iniciando reorganización de imágenes...\n');

models.forEach((model) => {
  organizeModelImages(model);
});

console.log('\n✅ Reorganización completada!');

