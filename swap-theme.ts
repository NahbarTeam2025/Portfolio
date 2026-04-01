import fs from 'fs';
import path from 'path';

function walk(dir: string, callback: (filepath: string) => void) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else {
      callback(filepath);
    }
  }
}

walk('./src', (filepath) => {
  if (!filepath.endsWith('.tsx') && !filepath.endsWith('.ts')) return;
  
  let content = fs.readFileSync(filepath, 'utf-8');
  let original = content;

  // Swap white and black in tailwind classes
  content = content.replace(/\b(text|bg|border|from|via|to|ring)-(white|black)(?:\/([0-9]+))?\b/g, (match, type, color, opacity) => {
    const newColor = color === 'white' ? 'black' : 'white';
    return opacity ? `${type}-${newColor}/${opacity}` : `${type}-${newColor}`;
  });

  // Swap grays
  content = content.replace(/\b(text|bg|border|from|via|to|ring)-gray-([0-9]+)(?:\/([0-9]+))?\b/g, (match, type, shade, opacity) => {
    const shadeNum = parseInt(shade);
    let newShade = shadeNum;
    if (shadeNum === 100) newShade = 900;
    else if (shadeNum === 200) newShade = 800;
    else if (shadeNum === 300) newShade = 700;
    else if (shadeNum === 400) newShade = 600;
    else if (shadeNum === 600) newShade = 400;
    else if (shadeNum === 700) newShade = 300;
    else if (shadeNum === 800) newShade = 200;
    else if (shadeNum === 900) newShade = 100;
    
    return opacity ? `${type}-gray-${newShade}/${opacity}` : `${type}-gray-${newShade}`;
  });

  // Specific dark hex colors
  content = content.replace(/bg-\[\#050505\]/g, 'bg-white');
  content = content.replace(/bg-\[\#0a0a0a\]/g, 'bg-white');
  content = content.replace(/bg-\[\#111111\]/g, 'bg-white');

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf-8');
  }
});
