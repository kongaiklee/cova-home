/**
 * POST /api/request - the request-a-call form's only destination.
 *
 * Posts one message to Slack and sends one email through Resend. Creates nothing else: every
 * account is opened by the team after the call. All destinations come from environment
 * variables set in the Vercel project - nothing here names a channel, an address or a key.
 *
 *   SLACK_WEBHOOK_URL   incoming webhook for the notification channel
 *   RESEND_API_KEY      Resend API key
 *   REQUEST_MAIL_FROM   verified sender, e.g. "Covarage <requests@covarage.com>"
 *   REQUEST_MAIL_TO     comma-separated recipients
 *
 * With none configured the endpoint answers 503 and the form shows its error line, so the button
 * cannot silently swallow a request.
 */
const LIMITS = { name: 120, company: 160, number: 40, trade: 40 };
const HIDDEN = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'policy', 'industry', 'agency', 'page'];

function clean(v, max) {
  return typeof v === 'string' ? v.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max) : '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method' });
  }
  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {};
  if (clean(body.website, 10)) return res.status(200).json({ ok: true }); // honeypot: pretend

  const name = clean(body.name, LIMITS.name);
  const company = clean(body.company, LIMITS.company);
  const number = clean(body.number, LIMITS.number);
  const trade = clean(body.trade, LIMITS.trade);
  if (!name || !company || !number || !/[0-9]{6,}/.test(number.replace(/\D/g, ''))) {
    return res.status(400).json({ ok: false, error: 'fields' });
  }
  const extras = HIDDEN.map((k) => [k, clean(body[k], 160)]).filter(([, v]) => v);

  const slack = process.env.SLACK_WEBHOOK_URL;
  const resend = process.env.RESEND_API_KEY;
  const to = (process.env.REQUEST_MAIL_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
  const from = process.env.REQUEST_MAIL_FROM;
  if (!slack && !(resend && to.length && from)) {
    return res.status(503).json({ ok: false, error: 'unconfigured' });
  }

  const when = new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore', hour12: false });
  const lines = [`Name: ${name}`, `Company: ${company}`, `Number: ${number}`, `Trade: ${trade || '-'}`, ...extras.map(([k, v]) => `${k}: ${v}`), `Received: ${when} SGT`];

  const results = await Promise.allSettled([
    slack
      ? fetch(slack, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ text: `New request for a call\n${lines.join('\n')}` }),
        })
      : Promise.resolve(null),
    resend && to.length && from
      ? fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { authorization: `Bearer ${resend}`, 'content-type': 'application/json' },
          body: JSON.stringify({ from, to, subject: `Request for a call: ${company}`, text: lines.join('\n') }),
        })
      : Promise.resolve(null),
  ]);
  const delivered = results.some((r) => r.status === 'fulfilled' && r.value && r.value.ok);
  if (!delivered) {
    const why = results.map((r) => (r.status === 'rejected' ? String(r.reason).slice(0, 80) : r.value ? `${r.value.status}` : 'skipped'));
    console.error('request: no delivery', why);
    return res.status(502).json({ ok: false, error: 'delivery' });
  }
  return res.status(200).json({ ok: true });
}

function safeJson(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
