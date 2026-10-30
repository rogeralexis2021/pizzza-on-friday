(function () {
  const { products, markets, frai, contact } = window.ANDARA;
  const ART = window.ANDARA_ART;

  /* ---------- state ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  };
  const urlMarket = new URLSearchParams(location.search).get('m');
  let mk = markets[urlMarket] ? urlMarket : store.get('andara.market', 'nz');
  if (!markets[mk]) mk = 'nz';
  const T = () => markets[mk];

  let bag = store.get('andara.bag.' + mk, []);
  let chat = null;           // per-market chat log, reset on switch
  let apiDown = !/^https?:$/.test(location.protocol);
  let ff = null;             // FitFinder state

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const prod = (id) => products.find(p => p.id === id);

  /* ---------- formatting ---------- */
  const money = (n) => mk === 'nz'
    ? 'NZ$' + (Number.isInteger(n) ? n.toLocaleString('en-NZ') : n.toLocaleString('en-NZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    : Math.round(n).toLocaleString('hu-HU').replace(/\s/g, ' ') + ' Ft';
  const num = (n) => n.toLocaleString(mk === 'nz' ? 'en-NZ' : 'hu-HU', { maximumFractionDigits: 1 });
  const sizeLabel = (s) => `${T().sizeSystem} ${num(s)}`;

  /* ---------- images: local photo, else drawn fallback ---------- */
  const img = (name, alt, cls = '') =>
    `<img class="${cls}" src="images/${name}.jpg" alt="${esc(alt)}" loading="lazy" data-art="${name}">`;
  document.addEventListener('error', (e) => {
    const el = e.target;
    if (el.tagName === 'IMG' && el.dataset.art && !el.dataset.fell) {
      el.dataset.fell = '1';
      el.src = ART.get(el.dataset.art);
    }
  }, true);

  const flag = (code) => code === 'nz'
    ? '<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#012169"/><path d="M0 0L15 10M15 0L0 10" stroke="#fff" stroke-width="2.4"/><path d="M0 0L15 10M15 0L0 10" stroke="#C8102E" stroke-width="1"/><path d="M7.5 0V10M0 5H15" stroke="#fff" stroke-width="3"/><path d="M7.5 0V10M0 5H15" stroke="#C8102E" stroke-width="1.6"/><g fill="#C8102E" stroke="#fff" stroke-width=".5"><circle cx="22" cy="5" r="1.1"/><circle cx="19.5" cy="10" r="1.1"/><circle cx="25" cy="9" r="1"/><circle cx="22" cy="15.5" r="1.2"/></g></svg>'
    : '<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="6.67" fill="#CE2939"/><rect y="6.67" width="30" height="6.67" fill="#fff"/><rect y="13.33" width="30" height="6.67" fill="#477050"/></svg>';

  /* ---------- chrome: announce bar, header, footer ---------- */
  function renderChrome() {
    const t = T();
    document.documentElement.lang = t.htmlLang;
    $('#announce').innerHTML = t.announce.map(a => `<span>${esc(a)}</span>`).join('<i aria-hidden="true">·</i>');

    const links = [['home', '#/'], ['ai', '#/ai'], ['strategy', '#/strategy'], ['market', '#/market']]
      .map(([k, h]) => `<a href="${h}" data-route="${k}">${esc(t.nav[k])}</a>`).join('');
    $('#nav').innerHTML = links;
    $('#drawer-nav').innerHTML = links;
    $('#menu-btn').textContent = t.menu;

    const sw = ['nz', 'hu'].map(c => `<button type="button" data-market="${c}" aria-pressed="${c === mk}" title="${esc(markets[c].label)}">${flag(c)}<span class="long">${esc(markets[c].label)}</span><span class="short">${c.toUpperCase()}</span></button>`).join('');
    $('#switch').innerHTML = sw;
    $('#switch').setAttribute('aria-label', t.marketSwitch);
    $('#drawer-switch').innerHTML = sw;
    updateBagCount();

    $('#footer').innerHTML = `
      <div class="wrap footer-grid">
        <div class="footer-brand">
          <div class="logo logo--light"><span class="logo-word">ANDARA</span><span class="logo-sub">Leather shoes · Handmade in Colombia</span></div>
          <p>${esc(t.footerText)}</p>
        </div>
        <div>
          <h4>${esc(t.footerHelp)}</h4>
          <ul>${Object.entries(t.legalLinks).map(([k, v]) => `<li><button type="button" class="link" data-legal="${k}">${esc(v)}</button></li>`).join('')}</ul>
        </div>
        <div>
          <h4>${esc(t.footerContact)}</h4>
          <ul>
            <li><a href="mailto:${contact.email}">${contact.email}</a></li>
            <li><a href="${contact.whatsappLink}" target="_blank" rel="noopener">WhatsApp ${contact.whatsapp}</a></li>
            <li>${esc(contact.city[mk])}</li>
          </ul>
        </div>
        <div>
          <h4>${esc(t.footerPay)}</h4>
          <ul class="pay-list">${t.payments.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="wrap footer-base"><span>${esc(t.copyright)}</span><span>${esc(t.credits)}</span></div>`;
  }

  function updateBagCount() {
    const n = bag.length;
    $('#bag-btn').textContent = `${T().bag} (${n})`;
  }

  /* ---------- views ---------- */
  function stars(r) {
    return `<span class="stars" aria-label="${r} / 5"><span style="width:${(r / 5) * 100}%"></span></span>`;
  }

  function viewHome() {
    const t = T(), h = t.home;
    return `
    <section class="hero">
      ${img('hero', 'Trail in the Andes', 'hero-img')}
      <div class="hero-shade"></div>
      <div class="wrap hero-inner">
        <h1 class="display">${h.title}</h1>
        <p class="hero-sub">${esc(h.sub)}</p>
        <div class="btn-row">
          <a class="btn btn--light" href="#/" data-scroll="collection">${esc(h.ctaShop)}</a>
          <a class="btn btn--ghost-light" href="#/ai?p=trail" data-anchor="fitfinder">${esc(h.ctaSize)}</a>
        </div>
      </div>
    </section>
    <div class="hero-facts wrap">${h.facts.map(f => `<span>${esc(f)}</span>`).join('')}<span>${esc(t.sizeRange)}</span></div>

    <section class="wrap section" id="collection">
      <div class="section-head">
        <h2 class="h2">${esc(h.gridTitle)}</h2>
        <span class="note">${esc(h.gridNote)}</span>
      </div>
      <div class="grid3">
        ${products.map(p => `
        <article class="card">
          <div class="card-frame">
            <button type="button" class="card-media" data-pdp="${p.id}" aria-label="${esc(p.name)}">
              ${img(p.img, p.name)}
              ${p.bestseller ? `<span class="tag">${esc(h.bestseller)}</span>` : ''}
            </button>
            <a class="card-hover" href="#/ai?p=${p.id}" data-anchor="fitfinder">${esc(h.hover)}</a>
          </div>
          <div class="card-body">
            <div class="card-row"><h3><button type="button" class="link" data-pdp="${p.id}">${esc(p.name)}</button></h3><span class="price">${money(p.price[mk])}</span></div>
            <p class="muted">${esc(t.product[p.id].type)} · ${esc(t.product[p.id].color)}</p>
            <p class="rating">${stars(p.rating)} <span>${num(p.rating)} (${p.reviews[mk]})</span></p>
          </div>
        </article>`).join('')}
      </div>
    </section>

    <section class="stats">
      <div class="wrap stats-grid">
        ${h.stats.map(([a, b]) => `<div><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join('')}
      </div>
    </section>

    <section class="wrap section about">
      <div class="about-media">${img('about', 'Workshop in Bucaramanga')}</div>
      <div class="about-text">
        <span class="kicker">${esc(h.aboutKicker)}</span>
        <h2 class="h2"><em>${esc(h.aboutTitle)}</em></h2>
        ${h.about.map(p => `<p>${p}</p>`).join('')}
      </div>
    </section>`;
  }

  function pageHead(k) {
    return `<header class="page-head wrap">
      <span class="kicker">${esc(k.kicker)}</span>
      <h1 class="display display--dark">${k.title}</h1>
      <p class="lead">${esc(k.intro)}</p>
    </header>`;
  }

  function viewAI() {
    const a = T().ai, f = a.ff, c = a.frai;
    return `
    ${pageHead(a)}
    <section class="wrap tool" id="fitfinder">
      <div class="tool-head"><span class="kicker">${esc(a.tool)} 01</span><h2 class="h2">${esc(f.title)}</h2><p>${esc(f.desc)}</p></div>
      <div class="ff">
        <form class="ff-form" id="ff-form" onsubmit="return false">
          ${seg('mode', f.mode, [['shoe', f.modeShoe], ['foot', f.modeFoot]])}
          ${seg('gender', f.fit, [['m', f.men], ['w', f.women]])}
          <div class="ff-shoe">
            <label class="field"><span>${esc(f.brand)}</span>
              <select name="brand">${['Nike', 'Adidas', 'Vans', 'Converse', 'Dr. Martens', 'Timberland', 'Other'].map(b => `<option value="${b}">${b === 'Other' ? esc(f.other) : b}</option>`).join('')}</select>
            </label>
            <div class="field-pair">
              <label class="field"><span>${esc(f.system)}</span>
                <select name="system"><option>UK</option><option>US</option><option>EU</option></select>
              </label>
              <label class="field"><span>${esc(f.size)}</span><input name="size" type="number" step="0.5" inputmode="decimal"></label>
            </div>
          </div>
          <label class="field ff-foot"><span>${esc(f.foot)}</span><input name="foot" type="number" step="0.1" min="20" max="33" inputmode="decimal"></label>
          ${seg('pref', f.pref, [['snug', f.snug], ['regular', f.regular], ['roomy', f.roomy]])}
          ${seg('width', f.width, [['narrow', f.narrow], ['regular', f.regular], ['wide', f.wide]])}
          <label class="field"><span>${esc(f.product)}</span>
            <select name="product">${products.map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select>
          </label>
        </form>
        <div class="ff-result" aria-live="polite">
          <span class="kicker">${esc(f.result)}</span>
          <div class="ff-big" id="ff-big"></div>
          <div class="ff-alt" id="ff-alt"></div>
          <div class="conf"><div class="conf-bar"><span id="ff-bar"></span></div><p><strong id="ff-conf"></strong><span id="ff-conf-txt"></span></p></div>
          <p class="ff-note" id="ff-note"></p>
          <button type="button" class="btn btn--dark btn--block" id="ff-add"></button>
        </div>
      </div>
    </section>

    <section class="wrap tool" id="frai">
      <div class="tool-head"><span class="kicker">${esc(a.tool)} 02</span><h2 class="h2">${esc(c.title)}</h2><p>${esc(c.desc)}</p></div>
      <div class="chat">
        <p class="chat-notice">${esc(c.notice)}</p>
        <div class="chat-log" id="chat-log" aria-live="polite"></div>
        <div class="chat-quick" id="chat-quick">${c.quick.map(q => `<button type="button" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>
        <form class="chat-form" id="chat-form">
          <input id="chat-input" type="text" autocomplete="off" placeholder="${esc(c.placeholder)}" aria-label="${esc(c.placeholder)}">
          <button class="btn btn--dark" type="submit">${esc(c.send)}</button>
        </form>
      </div>
    </section>

    <section class="wrap section split">
      <div><span class="kicker">03</span><h2 class="h2">${esc(a.flowTitle)}</h2><p class="muted">${esc(a.flowNote)}</p></div>
      <ol class="steps">${a.flow.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
    </section>

    <section class="wrap section">
      <div class="section-head"><h2 class="h2">${esc(a.buildTitle)}</h2></div>
      <div class="cols4">${a.build.map(([h, p], i) => `<div><span class="kicker">0${i + 1}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
    </section>`;
  }

  function seg(name, label, opts) {
    return `<fieldset class="seg"><legend>${esc(label)}</legend><div>${opts.map(([v, l]) =>
      `<label><input type="radio" name="${name}" value="${v}"><span>${esc(l)}</span></label>`).join('')}</div></fieldset>`;
  }

  function viewStrategy() {
    const s = T().strategy;
    return `
    ${pageHead(s)}
    <section class="wrap section">
      <div class="ptable" role="table">
        <div class="ptable-row ptable-head" role="row">
          <span role="columnheader"></span>
          <span role="columnheader">${flag('nz')}${esc(s.heads[0])}</span>
          <span role="columnheader">${flag('hu')}${esc(s.heads[1])}</span>
        </div>
        ${s.rows.map(([k, a, b]) => `
        <div class="ptable-row" role="row">
          <span class="ptable-k" role="rowheader">${esc(k)}</span>
          <span role="cell">${esc(a)}</span>
          <span role="cell">${esc(b)}</span>
        </div>`).join('')}
      </div>
    </section>`;
  }

  function viewMarket() {
    const m = T().market;
    return `
    ${pageHead(m)}
    <section class="wrap section charts">
      ${m.charts.map((c, i) => `
      <figure class="chart">
        <figcaption><span class="kicker">${flag(i ? 'hu' : 'nz')} 0${i + 1}</span><h2 class="h3">${esc(c.title)}</h2></figcaption>
        <div class="bars">
          ${c.bars.map(([l, v]) => `
          <div class="bar">
            <span class="bar-l">${esc(l)}</span>
            <span class="bar-t"><span style="--w:${v}%"></span></span>
            <span class="bar-v">${num(v)}%</span>
          </div>`).join('')}
        </div>
        <p class="source"><a href="${c.url}" target="_blank" rel="noopener">${esc(c.source)}</a></p>
      </figure>`).join('')}
    </section>`;
  }

  /* ---------- router ---------- */
  const routes = { '': ['home', viewHome], ai: ['ai', viewAI], strategy: ['strategy', viewStrategy], market: ['market', viewMarket] };

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, '');
    const [path, q] = raw.split('?');
    return { path: routes[path] ? path : '', params: new URLSearchParams(q || '') };
  }

  function render(keepScroll) {
    const { path, params } = parseHash();
    const [key, view] = routes[path];
    const main = $('#main');
    main.innerHTML = view();
    main.dataset.view = key;
    $$('[data-route]').forEach(a => a.setAttribute('aria-current', a.dataset.route === key ? 'page' : 'false'));
    document.title = key === 'home' ? 'ANDARA — Leather shoes, handmade in Colombia' : `${T().nav[key]} — ANDARA`;
    if (key === 'ai') { initFitFinder(params.get('p')); initChat(); }
    if (key === 'market') requestAnimationFrame(() => $$('.bar-t span').forEach(b => b.classList.add('in')));
    const target = params.get('to');
    if (target && $('#' + target)) $('#' + target).scrollIntoView();
    else if (!keepScroll) window.scrollTo(0, 0);
    closeDrawer();
  }

  window.addEventListener('hashchange', () => render(false));

  /* ---------- FitFinder ---------- */
  const BRAND_OFFSET = { Vans: -0.5, Converse: -0.5, Timberland: -0.5 };
  const toUK = (size, sys, g) => sys === 'UK' ? size : sys === 'EU' ? size - 33 : size - (g === 'm' ? 1 : 2);
  const fromUK = (uk, sys, g) => sys === 'UK' ? uk : sys === 'EU' ? uk + 33 : uk + (g === 'm' ? 1 : 2);

  function fitCalc(s) {
    let uk = s.mode === 'foot'
      ? Math.round(1.5 * (s.foot + 1.5)) - 33
      : toUK(s.size, s.system, s.gender) + (BRAND_OFFSET[s.brand] || 0);
    if (s.pref === 'snug') uk -= 0.5;
    if (s.pref === 'roomy') uk += 0.5;
    if (s.width === 'wide') uk += 0.5;
    const eu = Math.round(uk + 33);
    const ukF = eu - 33;
    const us = ukF + (s.gender === 'm' ? 1 : 2);
    const conf = 93 - ((s.mode === 'foot' || s.brand === 'Other') ? 5 : 0) - (s.width === 'wide' ? 4 : 0) - (s.pref !== 'regular' ? 2 : 0);
    const note = s.width === 'wide' ? 'wide' : s.pref === 'snug' ? 'snug' : s.pref === 'roomy' ? 'roomy' : 'normal';
    return { eu, uk: ukF, us, conf, note, inRange: eu >= 39 && eu <= 46 };
  }

  function initFitFinder(pid) {
    const defSys = mk === 'nz' ? 'UK' : 'EU';
    if (!ff || ff.market !== mk) {
      ff = { market: mk, mode: 'shoe', gender: 'm', brand: 'Nike', system: defSys, size: T().defaultSize, foot: 27, pref: 'regular', width: 'regular', product: 'trail' };
    }
    if (pid && prod(pid)) ff.product = pid;
    const form = $('#ff-form');
    Object.entries(ff).forEach(([k, v]) => {
      const els = form.elements[k];
      if (!els) return;
      if (els instanceof RadioNodeList) els.forEach(r => { r.checked = r.value === v; });
      else els.value = v;
    });
    form.addEventListener('input', onFF);
    form.addEventListener('change', onFF);
    $('#ff-add').addEventListener('click', () => {
      const r = fitCalc(ff);
      addToBag(ff.product, mk === 'nz' ? r.uk : r.eu);
      flash($('#ff-add'), T().pdp.added);
    });
    drawFF();
  }

  function onFF(e) {
    const form = $('#ff-form');
    const name = e.target.name;
    if (name === 'system') {
      // keep the same foot when switching size systems
      const uk = toUK(ff.size, ff.system, ff.gender);
      ff.system = form.elements.system.value;
      ff.size = fromUK(uk, ff.system, ff.gender);
      form.elements.size.value = ff.size;
    } else if (name) {
      const v = form.elements[name].value;
      ff[name] = (name === 'size' || name === 'foot') ? parseFloat(String(v).replace(',', '.')) : v;
    }
    drawFF();
  }

  function drawFF() {
    const f = T().ai.ff;
    $('#ff-form').dataset.mode = ff.mode;
    const valid = ff.mode === 'foot' ? ff.foot > 15 && ff.foot < 40 : ff.size > 0;
    const r = valid ? fitCalc(ff) : null;
    if (!r) { $('#ff-big').textContent = '—'; $('#ff-alt').textContent = ''; return; }
    const sizes = { UK: r.uk, EU: r.eu, US: r.us };
    const main = mk === 'nz' ? 'UK' : 'EU';
    $('#ff-big').textContent = `${main} ${num(sizes[main])}`;
    $('#ff-alt').innerHTML = Object.keys(sizes).filter(k => k !== main).map(k => `<span>${k} ${num(sizes[k])}${k === 'US' ? (ff.gender === 'm' ? ' M' : ' W') : ''}</span>`).join('');
    $('#ff-bar').style.width = r.conf + '%';
    $('#ff-conf').textContent = r.conf;
    $('#ff-conf-txt').textContent = f.confidence;
    $('#ff-note').textContent = f.notes[r.note] + (r.inRange ? '' : ' ' + f.range);
    $('#ff-add').textContent = f.add(prod(ff.product).name, `${main} ${num(sizes[main])}`);
    $('#ff-add').disabled = !r.inRange;
  }

  /* ---------- Frai chat ---------- */
  const norm = (s) => ' ' + s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') + ' ';

  function fallbackAnswer(q) {
    const n = norm(q);
    const hit = frai.topics.find(t => t.keys.some(k => n.includes(k)));
    return frai.answers[mk][hit ? hit.id : 'other'];
  }

  function initChat() {
    if (!chat || chat.market !== mk) {
      chat = { market: mk, log: [{ role: 'assistant', content: T().ai.frai.greeting, meta: 'kb' }] };
    }
    drawChat();
    $('#chat-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const v = $('#chat-input').value.trim();
      if (v) { $('#chat-input').value = ''; ask(v); }
    });
    $('#chat-quick').addEventListener('click', (e) => {
      const b = e.target.closest('[data-q]');
      if (b) ask(b.dataset.q);
    });
  }

  function drawChat(typing) {
    const log = $('#chat-log');
    if (!log) return;
    const c = T().ai.frai;
    log.innerHTML = chat.log.map(m => `
      <div class="msg msg--${m.role === 'user' ? 'me' : 'bot'}">
        ${m.role === 'user' ? '' : `<span class="msg-meta">${esc(m.meta === 'ai' ? c.metaAi : c.metaKb)}</span>`}
        <p>${esc(m.content)}</p>
      </div>`).join('') +
      (typing ? `<div class="msg msg--bot"><span class="msg-meta">${esc(c.typing)}</span><p class="dots"><i></i><i></i><i></i></p></div>` : '');
    log.scrollTop = log.scrollHeight;
  }

  let busy = false;
  async function ask(q) {
    if (busy) return;
    busy = true;
    const market = mk;
    chat.log.push({ role: 'user', content: q });
    drawChat(true);
    let reply = null, meta = 'kb';
    if (!apiDown) {
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 9000);
        const res = await fetch('api/chat', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal,
          body: JSON.stringify({ market, messages: chat.log.filter(m => m.role === 'user' || m.meta === 'ai').map(m => ({ role: m.role, content: m.content })).slice(-10) })
        });
        clearTimeout(timer);
        const data = res.ok ? await res.json() : null;
        if (data && data.reply) { reply = data.reply; meta = 'ai'; }
        else if (!res.ok) apiDown = true; // no backend or no key: stay on quick answers
      } catch (e) { /* offline or timeout: fall back for this message */ }
    }
    if (!reply) {
      await new Promise(r => setTimeout(r, 450));
      reply = fallbackAnswer(q);
    }
    busy = false;
    if (market !== mk) return;
    chat.log.push({ role: 'assistant', content: reply, meta });
    drawChat(false);
  }

  /* ---------- product detail ---------- */
  function openPDP(id) {
    const p = prod(id), t = T();
    let chosen = null;
    const html = `
      <div class="pdp">
        <div class="pdp-media">${img(p.img, p.name)}</div>
        <div class="pdp-info">
          ${p.bestseller ? `<span class="kicker">${esc(t.home.bestseller)}</span>` : ''}
          <h2 class="h2" id="modal-title">${esc(p.name)}</h2>
          <p class="muted">${esc(t.product[p.id].type)} · ${esc(t.product[p.id].color)}</p>
          <p class="rating">${stars(p.rating)} <span>${num(p.rating)} · ${p.reviews[mk]} ${esc(t.reviewsWord)}</span></p>
          <p class="pdp-price">${money(p.price[mk])}</p>
          <p class="small">${esc(t.pdp.payNote(money(p.price[mk] / 4)))}</p>
          <div class="pdp-sizes"><span class="label">${esc(t.pdp.size)}</span><div>${t.sizes.map(s => `<button type="button" data-size="${s}">${num(s)}</button>`).join('')}</div></div>
          <button type="button" class="btn btn--dark btn--block" id="pdp-add">${esc(t.pdp.pick)}</button>
          <a class="link-arrow" href="#/ai?p=${p.id}" data-anchor="fitfinder">${esc(t.pdp.findSize)}</a>
          <p class="small muted">${esc(t.pdp.made)}</p>
        </div>
      </div>`;
    openModal(html, 'modal--wide');
    const add = $('#pdp-add');
    $('.pdp-sizes').addEventListener('click', (e) => {
      const b = e.target.closest('[data-size]');
      if (!b) return;
      $$('.pdp-sizes [data-size]').forEach(x => x.setAttribute('aria-pressed', x === b));
      chosen = parseFloat(b.dataset.size);
      add.textContent = `${t.pdp.add} · ${sizeLabel(chosen)}`;
    });
    add.addEventListener('click', () => {
      if (chosen == null) { $('.pdp-sizes').classList.add('shake'); setTimeout(() => $('.pdp-sizes').classList.remove('shake'), 400); return; }
      addToBag(p.id, chosen);
      flash(add, t.pdp.added);
    });
  }

  /* ---------- bag ---------- */
  function addToBag(id, size) {
    bag.push({ id, size });
    store.set('andara.bag.' + mk, bag);
    updateBagCount();
    const b = $('#bag-btn');
    b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  }

  function flash(btn, text) {
    const old = btn.textContent;
    btn.textContent = text;
    btn.disabled = true;
    setTimeout(() => { btn.textContent = old; btn.disabled = false; }, 1400);
  }

  function openBag(step = 'bag') {
    const t = T(), b = t.bagPanel;
    const total = bag.reduce((s, i) => s + prod(i.id).price[mk], 0);
    let body;
    if (step === 'done') {
      body = `<p class="done">${esc(b.done)}</p>`;
    } else if (!bag.length) {
      body = `<p class="muted">${esc(b.empty)}</p>`;
    } else if (step === 'pay') {
      body = `
        <span class="label">${esc(b.payWith)}</span>
        <div class="pay-opts">${t.payments.map((p, i) => `<label><input type="radio" name="pay" value="${esc(p)}" ${i === 0 && mk === 'hu' ? 'checked' : ''}${mk === 'nz' && p === 'Afterpay' ? 'checked' : ''}><span>${esc(p)}${mk === 'nz' && p === 'Afterpay' ? ` <em>${esc(b.afterpay)} ${money(total / 4)}</em>` : ''}</span></label>`).join('')}</div>
        <div class="bag-total"><span>${esc(b.subtotal)}</span><strong>${money(total)}</strong></div>
        <button type="button" class="btn btn--dark btn--block" data-bag="done">${esc(b.place)}</button>
        <button type="button" class="link" data-bag="bag">${esc(b.back)}</button>`;
    } else {
      body = `
        <ul class="bag-list">${bag.map((i, n) => {
          const p = prod(i.id);
          return `<li>${img(p.img, p.name)}<div><strong>${esc(p.name)}</strong><span class="muted">${esc(sizeLabel(i.size))}</span><button type="button" class="link small" data-remove="${n}">${esc(b.remove)}</button></div><span>${money(p.price[mk])}</span></li>`;
        }).join('')}</ul>
        <div class="bag-total"><span>${esc(b.subtotal)}</span><strong>${money(total)}</strong></div>
        <p class="small muted">${esc(b.duties)}</p>
        <button type="button" class="btn btn--dark btn--block" data-bag="pay">${esc(b.checkout)}</button>
        <p class="small muted pay-inline">${t.payments.map(esc).join(' · ')}</p>`;
    }
    openModal(`<div class="bag"><h2 class="h3" id="modal-title">${esc(b.title)}</h2>${body}</div>`, 'modal--side');
    const m = $('#modal');
    m.onclick = (e) => {
      const r = e.target.closest('[data-remove]');
      if (r) { bag.splice(+r.dataset.remove, 1); store.set('andara.bag.' + mk, bag); updateBagCount(); openBag('bag'); return; }
      const s = e.target.closest('[data-bag]');
      if (s) {
        if (s.dataset.bag === 'done') { bag = []; store.set('andara.bag.' + mk, bag); updateBagCount(); }
        openBag(s.dataset.bag);
      }
    };
  }

  /* ---------- legal ---------- */
  function openLegal(k) {
    const l = T().legal[k];
    openModal(`<div class="legal"><span class="kicker">${esc(T().footerHelp)}</span><h2 class="h2" id="modal-title">${esc(l.title)}</h2>${l.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>`);
  }

  /* ---------- modal + drawer ---------- */
  let lastFocus = null;
  function openModal(html, cls = '') {
    const m = $('#modal');
    if (m.hidden) lastFocus = document.activeElement;
    m.className = 'modal ' + cls;
    m.onclick = null;
    $('#modal-body').innerHTML = html;
    m.hidden = false;
    document.body.classList.add('locked');
    $('#modal-close').setAttribute('aria-label', T().close);
    $('#modal-close').focus();
  }
  function closeModal() {
    const m = $('#modal');
    if (m.hidden) return;
    m.hidden = true;
    document.body.classList.remove('locked');
    if (lastFocus) lastFocus.focus();
  }
  function closeDrawer() { $('#drawer').hidden = true; $('#menu-btn').setAttribute('aria-expanded', 'false'); }

  /* ---------- global events ---------- */
  document.addEventListener('click', (e) => {
    const t = e.target;
    const sw = t.closest('[data-market]');
    if (sw) { setMarket(sw.dataset.market); return; }
    const pdp = t.closest('[data-pdp]');
    if (pdp) { openPDP(pdp.dataset.pdp); return; }
    const legal = t.closest('[data-legal]');
    if (legal) { openLegal(legal.dataset.legal); return; }
    const sc = t.closest('[data-scroll]');
    if (sc) {
      e.preventDefault();
      if (parseHash().path !== '') location.hash = '#/';
      setTimeout(() => { const el = $('#' + sc.dataset.scroll); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 30);
      return;
    }
    const an = t.closest('[data-anchor]');
    if (an) {
      e.preventDefault();
      closeModal();
      const href = an.getAttribute('href');
      const target = href + (href.includes('?') ? '&' : '?') + 'to=' + an.dataset.anchor;
      if (location.hash === target) render(true); else location.hash = target;
      return;
    }
    if (t.closest('#bag-btn')) { openBag(); return; }
    if (t.closest('#modal-close') || t.id === 'modal') { closeModal(); return; }
    if (t.closest('#menu-btn')) {
      const d = $('#drawer'); d.hidden = !d.hidden;
      $('#menu-btn').setAttribute('aria-expanded', String(!d.hidden));
    }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); closeDrawer(); } });

  function setMarket(code) {
    if (!markets[code] || code === mk) return;
    mk = code;
    store.set('andara.market', mk);
    bag = store.get('andara.bag.' + mk, []);
    try {
      const u = new URL(location.href);
      u.searchParams.set('m', mk);
      history.replaceState(null, '', u);
    } catch (e) { /* sandboxed preview: keep the URL as is */ }
    closeModal();
    renderChrome();
    render(true);
  }

  renderChrome();
  render(false);
})();
