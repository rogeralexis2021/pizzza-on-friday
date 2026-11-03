// Temporary helper: saves the chosen Unsplash photos into public/images.
import { writeFileSync } from 'node:fs';
const PICK = {
  hero: ['1464822759023-fed622ff2c3b', 2000],
  trail: ['1638609348722-aa2a3a67db26', 1400],
  chelsea: ['1608629601270-a0007becead3', 1400],
  ciudad: ['1603808033192-082d6919d3e1', 1400],
  about: ['1573227896778-8f378c4029d4', 1600]
};
for (const [name, [id, w]] of Object.entries(PICK)) {
  const r = await fetch(`https://images.unsplash.com/photo-${id}?w=${w}&q=80&fm=jpg`);
  if (!r.ok) throw new Error(`${name} ${r.status}`);
  writeFileSync(`public/images/${name}.jpg`, Buffer.from(await r.arrayBuffer()));
  console.log('saved', name);
}
