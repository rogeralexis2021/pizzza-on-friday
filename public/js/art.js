/* Drawn fallbacks, used only when a photo in /images is missing.
   Replace the photos and these never show. */
window.ANDARA_ART = (function () {
  const bg = '#ECE9E2', ink = '#171717', leather = '#9C5A33', dark = '#5B321C', forest = '#1F3A2D';

  const frame = (body, w = 400, h = 500, fill = bg) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><rect width="${w}" height="${h}" fill="${fill}"/>${body}</svg>`;

  const shadow = (y) => `<ellipse cx="205" cy="${y}" rx="150" ry="9" fill="#000" opacity=".08"/>`;

  const shoes = {
    trail: frame(
      shadow(392) +
      `<path d="M96 168 L170 160 C182 159 188 168 190 180 L200 258 C232 266 272 280 302 295 C330 309 342 326 340 346 L340 356 L92 356 C86 316 90 240 96 168 Z" fill="${leather}"/>` +
      `<path d="M96 168 L170 160 C182 159 188 168 190 180" fill="none" stroke="${dark}" stroke-width="6"/>` +
      `<path d="M104 300 C170 296 250 300 336 330" fill="none" stroke="${dark}" stroke-width="1.5" stroke-dasharray="4 4"/>` +
      `<path d="M150 170 C160 230 180 270 200 258" fill="none" stroke="${dark}" stroke-width="1.5" stroke-dasharray="4 4"/>` +
      [0, 1, 2, 3, 4, 5].map(i => {
        const x = 180 + i * 4, y = 188 + i * 13;
        return `<circle cx="${x}" cy="${y}" r="2.6" fill="#D9C7A6"/><line x1="${x - 14}" y1="${y + 6}" x2="${x + 12}" y2="${y - 4}" stroke="${ink}" stroke-width="2"/>`;
      }).join('') +
      `<path d="M86 356 L346 356 L346 372 L334 382 L100 382 L86 372 Z" fill="${ink}"/>` +
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<rect x="${100 + i * 24}" y="380" width="14" height="7" fill="${ink}"/>`).join('')
    ),
    chelsea: frame(
      shadow(390) +
      `<path d="M112 170 L192 170 L198 262 C238 270 282 286 306 299 C332 313 340 330 338 348 L338 358 L104 358 C100 300 106 228 112 170 Z" fill="${dark}"/>` +
      `<path d="M134 172 L176 172 L160 268 Z" fill="${forest}"/>` +
      `<path d="M134 172 L160 268 L176 172" fill="none" stroke="#2E1A0E" stroke-width="2"/>` +
      `<rect x="104" y="150" width="16" height="30" fill="none" stroke="${dark}" stroke-width="5"/>` +
      `<path d="M110 330 C180 326 260 326 334 340" fill="none" stroke="#2E1A0E" stroke-width="1.5" stroke-dasharray="4 4"/>` +
      `<path d="M100 358 L342 358 L342 370 L104 370 Z" fill="${ink}"/><rect x="100" y="370" width="64" height="14" fill="${ink}"/>`
    ),
    ciudad: frame(
      shadow(372) +
      `<path d="M72 290 C82 270 120 262 150 256 L186 250 C220 258 252 272 292 288 C322 300 336 312 335 330 L335 340 L66 340 C64 322 66 304 72 290 Z" fill="#B98552"/>` +
      `<path d="M72 290 C90 276 120 270 150 262" fill="none" stroke="${dark}" stroke-width="5"/>` +
      [0, 1, 2, 3, 4].map(i => {
        const x = 170 + i * 12, y = 258 + i * 6;
        return `<circle cx="${x}" cy="${y}" r="2.2" fill="#F4EEE2"/><line x1="${x - 10}" y1="${y + 7}" x2="${x + 10}" y2="${y - 5}" stroke="#F4EEE2" stroke-width="2"/>`;
      }).join('') +
      `<path d="M240 270 C230 300 232 320 245 340" fill="none" stroke="${dark}" stroke-width="1.5" stroke-dasharray="4 4"/>` +
      `<path d="M62 340 L340 340 L340 356 C340 362 334 366 326 366 L74 366 C66 366 62 362 62 356 Z" fill="#F1EBDD" stroke="#D8CFBD"/>` +
      `<path d="M70 352 L332 352" stroke="${dark}" stroke-width="1.2" stroke-dasharray="3 3"/>`
    )
  };

  const ridges = (palette, sky) => frame(
    `<circle cx="1180" cy="190" r="60" fill="#F3EFE6" opacity=".7"/>` +
    `<path d="M0 520 L180 330 L300 430 L470 250 L640 420 L820 290 L1000 440 L1180 300 L1400 470 L1600 360 L1600 900 L0 900 Z" fill="${palette[0]}"/>` +
    `<path d="M0 640 L220 470 L420 600 L650 440 L900 620 L1120 480 L1350 620 L1600 500 L1600 900 L0 900 Z" fill="${palette[1]}"/>` +
    `<path d="M0 760 L300 620 L560 730 L860 610 L1150 750 L1400 650 L1600 720 L1600 900 L0 900 Z" fill="${palette[2]}"/>` +
    `<path d="M520 900 C600 820 700 790 760 760 C800 740 830 735 860 730" fill="none" stroke="#C9BFA9" stroke-width="3" stroke-dasharray="10 12"/>`,
    1600, 900, sky);

  const scenes = {
    hero: ridges(['#6E7F70', '#3E5647', '#1F3A2D'], '#C9CFC6'),
    about: ridges(['#B08A6A', '#8A5F40', '#5B321C'], '#E2D9CB')
  };

  const uri = (svg) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  return { get: (name) => uri(shoes[name] || scenes[name] || frame('')) };
})();
