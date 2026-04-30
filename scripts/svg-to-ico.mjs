import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const svgBuf = readFileSync('public/favicon-v2.svg');
const sizes = [16, 32, 48];

const pngs = await Promise.all(
  sizes.map(s => sharp(svgBuf).resize(s, s).png().toBuffer())
);

// Build ICO: 6-byte header + 16-byte directory entry per size + appended PNG data.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);

const dirEntries = [];
let offset = 6 + sizes.length * 16;
for (let i = 0; i < sizes.length; i++) {
  const dim = sizes[i];
  const png = pngs[i];
  const e = Buffer.alloc(16);
  e.writeUInt8(dim === 256 ? 0 : dim, 0);
  e.writeUInt8(dim === 256 ? 0 : dim, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  dirEntries.push(e);
  offset += png.length;
}

const ico = Buffer.concat([header, ...dirEntries, ...pngs]);
writeFileSync('public/favicon.ico', ico);
console.log('Wrote public/favicon.ico:', ico.length, 'bytes,', sizes.length, 'sizes');
