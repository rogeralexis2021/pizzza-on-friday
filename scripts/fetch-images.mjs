// Downloads the Unsplash photos into public/images at build time.
// Files that already exist are kept, so to use your own photo just drop
// trail.jpg, chelsea.jpg, ciudad.jpg, hero.jpg or about.jpg into public/images.
// Never fails the build: if a photo can't be fetched the site shows a drawn fallback.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Unsplash photo IDs (the part after "photo-" in an images.unsplash.com URL).
// Several candidates per slot; the first one that downloads wins.
const PHOTOS = {
  hero:    { w: 2000, ids: ['1464822759023-fed622ff2c3b', '1506905925346-21bda4d32df4'] },
  trail:   { w: 1200, ids: ['1520639888713-7851133b1ed0', '1605812860427-4024433a70fd'] },
  chelsea: { w: 1200, ids: ['1608256246200-53e635b5b65f', '1638247025967-b4e38f787b76'] },
  ciudad:  { w: 1200, ids: ['1549298916-b41d501d3772', '1525966222134-fcfa99b8ae77'] },
  about:   { w: 1400, ids: ['1531310197839-ccf54634509e', '1556906781-9a412961c28c'] }
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
