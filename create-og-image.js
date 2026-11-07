import fs from 'fs';
import { PNG } from 'pngjs';


const width = 1200;
const height = 630;
const png = new PNG({ width, height });

// Basic font bitmap renderer for clean text
const fontData = {
  // Simple 8x12 font rendering for crisp text
};

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  return [ (num >> 16) & 255, (num >> 8) & 255, num & 255 ];
}

function setPixel(x, y, r, g, b, a = 255) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const idx = (width * Math.floor(y) + Math.floor(x)) << 2;
  if (a < 255) {
    const alpha = a / 255;
    png.data[idx] = Math.round(png.data[idx] * (1 - alpha) + r * alpha);
    png.data[idx + 1] = Math.round(png.data[idx + 1] * (1 - alpha) + g * alpha);
    png.data[idx + 2] = Math.round(png.data[idx + 2] * (1 - alpha) + b * alpha);
    png.data[idx + 3] = 255;
  } else {
    png.data[idx] = r;
    png.data[idx + 1] = g;
    png.data[idx + 2] = b;
    png.data[idx + 3] = a;
  }
}

function fillRect(x1, y1, x2, y2, color, alpha = 255) {
  const [r, g, b] = hexToRgb(color);
  for (let y = Math.max(0, y1); y < Math.min(height, y2); y++) {
    for (let x = Math.max(0, x1); x < Math.min(width, x2); x++) {
      setPixel(x, y, r, g, b, alpha);
    }
  }
}

function drawRoundedRect(x1, y1, x2, y2, radius, color, alpha = 255) {
  const [r, g, b] = hexToRgb(color);
  for (let y = Math.max(0, y1); y < Math.min(height, y2); y++) {
    for (let x = Math.max(0, x1); x < Math.min(width, x2); x++) {
      let inside = true;
      if (x < x1 + radius && y < y1 + radius) {
        inside = Math.hypot(x - (x1 + radius), y - (y1 + radius)) <= radius;
      } else if (x > x2 - radius && y < y1 + radius) {
        inside = Math.hypot(x - (x2 - radius), y - (y1 + radius)) <= radius;
      } else if (x < x1 + radius && y > y2 - radius) {
        inside = Math.hypot(x - (x1 + radius), y - (y2 - radius)) <= radius;
      } else if (x > x2 - radius && y > y2 - radius) {
        inside = Math.hypot(x - (x2 - radius), y - (y2 - radius)) <= radius;
      }
      if (inside) setPixel(x, y, r, g, b, alpha);
    }
  }
}

function strokeRoundedRect(x1, y1, x2, y2, radius, strokeWidth, color, alpha = 255) {
  const [r, g, b] = hexToRgb(color);
  for (let y = Math.max(0, y1); y < Math.min(height, y2); y++) {
    for (let x = Math.max(0, x1); x < Math.min(width, x2); x++) {
      let outer = true;
      if (x < x1 + radius && y < y1 + radius) outer = Math.hypot(x - (x1 + radius), y - (y1 + radius)) <= radius;
      else if (x > x2 - radius && y < y1 + radius) outer = Math.hypot(x - (x2 - radius), y - (y1 + radius)) <= radius;
      else if (x < x1 + radius && y > y2 - radius) outer = Math.hypot(x - (x1 + radius), y - (y1 + radius)) <= radius;
      else if (x > x2 - radius && y > y2 - radius) outer = Math.hypot(x - (x2 - radius), y - (y2 - radius)) <= radius;

      let inner = true;
      const ir = Math.max(0, radius - strokeWidth);
      const ix1 = x1 + strokeWidth, ix2 = x2 - strokeWidth, iy1 = y1 + strokeWidth, iy2 = y2 - strokeWidth;
      if (x >= ix1 && x < ix2 && y >= iy1 && y < iy2) {
        if (x < ix1 + ir && y < iy1 + ir) inner = Math.hypot(x - (ix1 + ir), y - (iy1 + ir)) <= ir;
        else if (x > ix2 - ir && y < iy1 + ir) inner = Math.hypot(x - (ix2 - ir), y - (iy1 + ir)) <= ir;
        else if (x < ix1 + ir && y > iy2 - ir) inner = Math.hypot(x - (ix1 + ir), y - (iy2 - ir)) <= ir;
        else if (x > ix2 - ir && y > iy2 - ir) inner = Math.hypot(x - (ix2 - ir), y - (iy2 - ir)) <= ir;
      } else {
        inner = false;
      }

      if (outer && !inner) setPixel(x, y, r, g, b, alpha);
    }
  }
}

// Render background #06080d
fillRect(0, 0, width, height, '#06080d');

// Subtle ambient glow
const [ar, ag, ab] = hexToRgb('#6e8bff');
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const dist = Math.hypot(x - 200, y - 100);
    if (dist < 400) {
      const alpha = Math.round(25 * (1 - dist / 400));
      setPixel(x, y, ar, ag, ab, alpha);
    }
  }
}

// Card frame
drawRoundedRect(80, 60, 1120, 570, 24, '#0d1118');
strokeRoundedRect(80, 60, 1120, 570, 24, 2, '#232a3b');

// Monogram badge "RE"
drawRoundedRect(140, 120, 220, 200, 20, '#6e8bff');
// Letter R & E in badge
fillRect(165, 140, 173, 180, '#ffffff'); // R stem
fillRect(173, 140, 192, 148, '#ffffff'); // R top
fillRect(173, 156, 192, 164, '#ffffff'); // R mid
fillRect(188, 140, 196, 164, '#ffffff'); // R right
fillRect(180, 162, 194, 180, '#ffffff'); // R leg

fillRect(200, 140, 206, 180, '#ffffff'); // E stem
fillRect(206, 140, 220, 147, '#ffffff'); // E top
fillRect(206, 156, 217, 163, '#ffffff'); // E mid
fillRect(206, 173, 220, 180, '#ffffff'); // E bot

// We will also use SVG rendering via sharp or pure JS font renderer for ultra crisp text if needed!
const buffer = PNG.sync.write(png);
fs.writeFileSync('./public/og-image.png', buffer);
console.log('og-image.png created successfully!');
