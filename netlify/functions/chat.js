// Netlify function, routed from /api/chat in netlify.toml
const { answer } = require('../../api/_frai');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: '{"error":"method"}' };
  try {
    const out = await answer(JSON.parse(event.body || '{}'));
    return { statusCode: out.status, headers: { 'content-type': 'application/json' }, body: JSON.stringify(out.json) };
  } catch (e) {
    return { statusCode: 500, body: '{"error":"server"}' };
  }
};
