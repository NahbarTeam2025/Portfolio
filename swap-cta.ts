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

  content = content.replace(/bg-white\/20 border border-blue-500\/50/g, 'bg-blue-500/10 border border-blue-500/50');

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf-8');
  }
});
