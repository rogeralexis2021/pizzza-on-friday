// Vercel serverless route: POST /api/chat
const { answer } = require('./_frai');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const out = await answer(body);
    res.status(out.status).json(out.json);
  } catch (e) {
    res.status(500).json({ error: 'server' });
  }
};
