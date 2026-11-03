// Temporary helper: saves the new product photos into public/images.
import { writeFileSync } from 'node:fs';
const PICK = { giron: '1614253429340-98120bd6d753', barichara: '1616406432452-07bc5938759d', chicamocha: '1605733160314-4fc7dac4bb16' };
for (const [name, id] of Object.entries(PICK)) {
  const r = await fetch(`https://images.unsplash.com/photo-${id}?w=1400&q=80&fm=jpg`);
  if (!r.ok) throw new Error(`${name} ${r.status}`);
  writeFileSync(`public/images/${name}.jpg`, Buffer.from(await r.arrayBuffer()));
  console.log('saved', name);
}
