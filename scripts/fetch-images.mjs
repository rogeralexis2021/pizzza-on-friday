// Downloads the Unsplash photos into public/images at build time.
// Files that already exist are kept, so to use your own photo just drop
// trail.jpg, chelsea.jpg, ciudad.jpg, hero.jpg or about.jpg into public/images.
// Never fails the build: if a photo can't be fetched the site shows a drawn fallback.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Unsplash photo IDs (the part after "photo-" in an images.unsplash.com URL).
// Several candidates per slot; the first one that downloads wins.
const PHOTOS = {
  hero:    { w: 2000, ids: ['1464822759023-fed622ff2c3b'] },
  trail:   { w: 1400, ids: ['1638609348722-aa2a3a67db26'] },
  chelsea: { w: 1400, ids: ['1608629601270-a0007becead3'] },
  ciudad:  { w: 1400, ids: ['1603808033192-082d6919d3e1'] },
  about:   { w: 1600, ids: ['1573227896778-8f378c4029d4'] },
  giron:   { w: 1400, ids: ['1614253429340-98120bd6d753'] },
  barichara: { w: 1400, ids: ['1616406432452-07bc5938759d'] },
  chicamocha: { w: 1400, ids: ['1605733160314-4fc7dac4bb16'] }
};

const dir = join(process.cwd(), 'public', 'images');
mkdirSync(dir, { recursive: true });

for (const [name, { w, ids }] of Object.entries(PHOTOS)) {
  const file = join(dir, `${name}.jpg`);
  if (existsSync(file)) { console.log(`keep   ${name}.jpg`); continue; }
  let ok = false;
  for (const id of ids) {
    const url = `https://images.unsplash.com/photo-${id}?w=${w}&q=80&fm=jpg&fit=crop`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      writeFileSync(file, Buffer.from(await res.arrayBuffer()));
      console.log(`saved  ${name}.jpg  <- ${url}`);
      ok = true;
      break;
    } catch (e) {
      console.log(`miss   ${name}  ${id} (${e.message})`);
    }
  }
  if (!ok) console.log(`none   ${name}.jpg — drawn fallback will be used`);
}
