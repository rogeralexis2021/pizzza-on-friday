// Temporary helper: searches Unsplash for free (non-Unsplash+) photos and saves
// thumbnails + metadata to scratch/candidates so they can be reviewed.
import { mkdirSync, writeFileSync } from 'node:fs';

const SLOTS = {
  trail: ['brown leather lace up boots', 'leather hiking boots', 'cognac leather boots'],
  chelsea: ['chelsea boots', 'brown chelsea boot', 'leather chelsea boots'],
  ciudad: ['brown leather sneakers', 'leather sneakers minimal', 'tan leather sneaker'],
  about: ['shoemaker', 'cobbler workshop', 'leather craft hands']
};

const out = {};
for (const [slot, queries] of Object.entries(SLOTS)) {
  mkdirSync(`scratch/candidates/${slot}`, { recursive: true });
  const seen = new Set();
  out[slot] = [];
  for (const q of queries) {
    try {
      const res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(q)}&per_page=15`, { headers: { 'accept': 'application/json' } });
      if (!res.ok) { console.log(slot, q, res.status); continue; }
      const data = await res.json();
      for (const r of data.results || []) {
        if (r.premium || r.plus || seen.has(r.id)) continue;
        const m = (r.urls.raw || '').match(/photo-([0-9a-f-]+)/);
        if (!m) continue;
        seen.add(r.id);
        const n = out[slot].length;
        const img = await fetch(`${r.urls.raw}&w=360&q=60&fm=jpg`);
        if (!img.ok) continue;
        writeFileSync(`scratch/candidates/${slot}/${String(n).padStart(2, '0')}.jpg`, Buffer.from(await img.arrayBuffer()));
        out[slot].push({ n, photo: m[1], slug: r.slug || r.id, user: r.user && r.user.name, alt: r.alt_description, w: r.width, h: r.height });
      }
    } catch (e) { console.log(slot, q, e.message); }
  }
  console.log(slot, out[slot].length);
}
writeFileSync('scratch/candidates/index.json', JSON.stringify(out, null, 1));
