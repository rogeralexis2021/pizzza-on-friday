// Shared by the Vercel route (api/chat.js) and the Netlify function.
// Calls the Claude API so the key stays on the server. The site falls back to
// keyword answers whenever this returns an error.

const FACTS = {
  nz: [
    'Products: Frailejón Trail (lace-up leather boot, lug sole, cognac full-grain, NZ$289), Andes Chelsea (pull-on Chelsea boot, dark brown with forest-green elastic, NZ$259), Ciudad Sneaker (low-top leather sneaker, tan, stitched cupsole, NZ$219).',
    'Sizes: UK/AU 6–12, half sizes on request. FitFinder on the AI Proposal page suggests a size from a shoe the customer owns.',
    'Shipping: tracked from Colombia to New Zealand in 8–12 business days. Import GST and duties are calculated at checkout, nothing to pay at the door.',
    'Returns: free size exchange for unworn shoes within 30 days. Faulty products get repair, replacement or refund under the Consumer Guarantees Act.',
    'Payment: Visa, Mastercard, Afterpay (4 interest-free payments), PayPal, Apple Pay, Google Pay.',
    'Leather care: wipe with a damp cloth, dry away from heaters, leather conditioner every 2–3 months.',
    'Each pair is handmade in Bucaramanga by a workshop of eleven shoemakers, about two days per pair, leather from two family tanneries in Santander.',
    'Contact: WhatsApp +57 300 000 0000, hola@andara.co, a person replies within one business day.'
  ],
  hu: [
    'Termékek: Frailejón Trail (fűzős bőrbakancs, profilos talp, konyak színbőr, 49 990 Ft), Andes Chelsea (Chelsea csizma, sötétbarna, erdőzöld gumibetét, 42 990 Ft), Ciudad Sneaker (alacsony szárú bőr sneaker, világosbarna, varrott talp, 34 990 Ft).',
    'Méretek: EU 39–46, fél méretek kérésre. Az MI-javaslat oldalon a FitFinder egy meglévő cipő alapján méretet ajánl.',
    'Szállítás: nyomon követhetően Kolumbiából Magyarországra 7–10 munkanap alatt. A vámot és az áfát a pénztárnál kiszámoljuk.',
    'Visszaküldés: 14 napos indoklás nélküli elállási jog online vásárlásnál; viseletlen cipő ingyenes méretcseréje 30 napon belül.',
    'Fizetés: utánvét a futárnál, bankkártya, Barion, SimplePay.',
    'Bőrápolás: nedves ruhával áttörölni, hőforrástól távol szárítani, 2–3 havonta bőrápoló.',
    'Minden pár kézzel készül Bucaramangában, tizenegy cipészből álló műhelyben, kb. két nap alatt, két santanderi családi cserzőüzem bőréből.',
    'Kapcsolat: WhatsApp +57 300 000 0000, hola@andara.co, egy munkanapon belül válaszolunk.'
  ]
};

function systemPrompt(market) {
  const lang = market === 'hu' ? 'Hungarian for a customer in Hungary' : 'English for a customer in New Zealand';
  return `You are Frai, the AI shopping assistant of ANDARA, a Colombian brand of handmade leather shoes
(Frailejón Trail boot, Andes Chelsea boot, Ciudad Sneaker) made by artisans in Bucaramanga.
Reply only in ${lang}, in 1–3 short, warm, plain sentences. Use only these facts:
- ${FACTS[market].join('\n- ')}
If you don't know something, suggest messaging the team on WhatsApp. Never invent order details.`;
}

async function answer(body) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { status: 503, json: { error: 'no_key' } };

  const market = body && body.market === 'hu' ? 'hu' : 'nz';
  let messages = (Array.isArray(body && body.messages) ? body.messages : [])
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, 800) }))
    .slice(-10);
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (!messages.length) return { status: 400, json: { error: 'no_message' } };

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: process.env.FRAI_MODEL || 'claude-haiku-5-5',
      max_tokens: 300,
      system: systemPrompt(market),
      messages
    })
  });
  if (!res.ok) return { status: 502, json: { error: 'upstream', code: res.status } };
  const data = await res.json();
  const reply = (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('').trim();
  return reply ? { status: 200, json: { reply } } : { status: 502, json: { error: 'empty' } };
}

module.exports = { answer };
