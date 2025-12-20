const fs = require('fs');
const path = require('path');

const testimonialsDir = path.join(__dirname, '../public/recursos/clientes');
const mappingFile = path.join(__dirname, '../testimonial-renaming-mapping.json');

// Get all .webp files
const files = fs.readdirSync(testimonialsDir)
  .filter(file => file.toLowerCase().endsWith('.webp'))
  .map(file => ({
    oldName: file,
    fullPath: path.join(testimonialsDir, file),
    stats: fs.statSync(path.join(testimonialsDir, file))
  }))
  // Sort by modification time (newest first) or by name
  .sort((a, b) => {
    // First, prioritize files that are already named t1-t6 (testimonials)
    const aIsTestimonial = /^t\d+\.webp$/i.test(a.oldName);
    const bIsTestimonial = /^t\d+\.webp$/i.test(b.oldName);
    
    if (aIsTestimonial && !bIsTestimonial) return -1;
    if (!aIsTestimonial && bIsTestimonial) return 1;
    
    // Then sort by modification time (newest first)
    return b.stats.mtimeMs - a.stats.mtimeMs;
  });

console.log(`Found ${files.length} WebP images to rename\n`);

const mapping = {};
const renamedFiles = [];

// Rename files
files.forEach((file, index) => {
  const newName = `testimonio-${index + 1}.webp`;
  const newPath = path.join(testimonialsDir, newName);
  
  // Skip if already has the correct name
  if (file.oldName === newName) {
    console.log(`✓ ${file.oldName} - Already correctly named`);
    mapping[newName] = file.oldName;
    return;
  }
  
  // Check if target file already exists
  if (fs.existsSync(newPath)) {
    console.log(`⚠ ${newName} already exists, skipping ${file.oldName}`);
    return;
  }
  
  try {
    fs.renameSync(file.fullPath, newPath);
    mapping[newName] = file.oldName;
    renamedFiles.push({ old: file.oldName, new: newName });
    console.log(`✓ Renamed: ${file.oldName} → ${newName}`);
  } catch (error) {
    console.error(`✗ Error renaming ${file.oldName}:`, error.message);
  }
});

// Save mapping
fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));

console.log(`\n✅ Renaming complete!`);
console.log(`   - Total files processed: ${files.length}`);
console.log(`   - Files renamed: ${renamedFiles.length}`);
console.log(`   - Mapping saved to: ${mappingFile}`);

