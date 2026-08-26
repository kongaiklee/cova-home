/**
 * POST /api/request - the request-a-call form's only destination.
 *
 * Posts one message to Slack and sends one email through Resend to the team, then - only once
 * internal delivery has succeeded - the founder welcome to the lead (copy: CMO s15 row 28,
 * Kong's own draft; behaviour: CD handoff s9.2). Creates nothing else: every account is opened
 * by the team after the call. All destinations come from environment variables set in the
 * Vercel project - nothing here names a channel, an address or a key.
 *
 *   SLACK_WEBHOOK_URL   incoming webhook for the notification channel
 *   RESEND_API_KEY      Resend API key
 *   REQUEST_MAIL_FROM   verified sender, e.g. "Covarage <requests@covarage.com>"
 *   REQUEST_MAIL_TO     comma-separated recipients
 *
 * With none configured the endpoint answers 503 and the form shows its error line, so the button
 * cannot silently swallow a request.
 */
const LIMITS = { name: 120, company: 160, email: 160, number: 40, trade: 40 };
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
  // Honeypot: pretend success so a bot never learns it was caught - but log it, so a silent
  // drop shows in the runtime logs and "no leads today" is distinguishable from "leads dropped
  // today". `website` is the old field name, kept for any page still open from a prior deploy.
  if (clean(body.form_meta, 10) || clean(body.website, 10)) {
    console.warn('request: honeypot', { page: clean(body.page, 160) });
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const company = clean(body.company, LIMITS.company);
  const email = clean(body.email, LIMITS.email);
  const number = clean(body.number, LIMITS.number);
  const trade = clean(body.trade, LIMITS.trade);
  // Presence only for human-read fields (KONG w6: the number's format rule comes off - a human
  // calls it back and can read a country code, spaces, an extension). Never validate more
  // strictly than the thing that consumes the value.
  if (!name || !company || !email || !number) {
    return res.status(400).json({ ok: false, error: 'fields' });
  }
  // Email is machine-read, so it gets a shape check - but a LOOSE one: exactly one @, a dot
  // somewhere after it, no whitespace. A strict regex rejects real addresses and every
  // rejection is a lost lead.
  const at = email.indexOf('@');
  if (at < 1 || at !== email.lastIndexOf('@') || !email.slice(at + 1).includes('.') || /\s/.test(email)) {
    return res.status(400).json({ ok: false, error: 'email' });
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
  const lines = [`Name: ${name}`, `Company: ${company}`, `Email: ${email}`, `Number: ${number}`, `Trade: ${trade || '-'}`, ...extras.map(([k, v]) => `${k}: ${v}`), `Received: ${when} SGT`];

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

  // The founder welcome to the lead - fires ONLY after internal delivery succeeded, so a lead
  // is never told we have their request when we do not (s9.2.1). Awaited, because a Vercel
  // function may freeze the moment the response is sent; its failure is logged and never changes
  // the response (s9.2.3) - the submission itself DID succeed and the team WAS notified.
  if (resend && from) {
    const ack = composeAck({ name, email });
    try {
      const sent = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${resend}`, 'content-type': 'application/json' },
        body: JSON.stringify({ from, to: [email], reply_to: 'support@covarage.com', subject: ack.subject, text: ack.text, html: ack.html }),
      });
      if (sent.ok) console.log('request: ack sent');
      else console.warn('request: ack failed', sent.status);
    } catch (e) {
      console.warn('request: ack failed', String(e).slice(0, 80));
    }
  } else {
    console.warn('request: ack skipped (mail unconfigured)');
  }
  return res.status(200).json({ ok: true });
}

/**
 * The founder welcome - KONG'S OWN DRAFT, worked over (CMO s15 row 28, w5: his verdicts applied,
 * preview observed in his inbox). A welcome, not a receipt: the data playback lives on s16, the
 * page. Merges {{name}} and the booking link ONLY; an empty name greets `Hi,` never `Hi ,`. The
 * 24-hour line stands AHEAD of the booking CTA (his 2026-08-25 ruling), and the booking link
 * carries the lead's name/email as prefill params (the s16 spec). Kong signs - his w5 ruling,
 * and the sender is the one who calls. The legal block is the site footer, unchanged: the
 * counsel-approved disclosure character for character, then the registered line (middot
 * separators as served, written as the \u00b7 escape so the source stays ASCII). Exported so
 * the harness proves each branch without an HTTP round trip.
 */
export function composeAck({ name, email }) {
  const params = new URLSearchParams();
  if (name) params.set('name', name);
  if (email) params.set('email', email);
  const q = params.toString();
  const booking = q ? `https://cal.com/kongaiklee/30min?${q}` : 'https://cal.com/kongaiklee/30min';
  const greet = name ? `Hi ${name},` : 'Hi,';
  const disclosure = 'Covarage is a technology platform. We are not a licensed insurance broker regulated by the Monetary Authority of Singapore (MAS) and do not provide any financial advice.';
  const registered = 'Covarage Pte. Ltd. \u00b7 UEN 202531227H \u00b7 143 Cecil Street, #03-01, GB Building, Singapore 069542 \u00b7 Data protection: dpo@covarage.com';
  const text = [
    greet,
    '',
    'Thank you for requesting access to Covarage.',
    '',
    'I started Covarage because too many business owners are left to manage insurance on their own. Keeping track of policies, chasing for replies, and wondering whether their cover still fits the business they have today.',
    '',
    'I believe every business deserves someone in its corner. A team that knows the company, keeps things organised and makes sure nothing important is quietly overlooked.',
    '',
    "That begins with a short onboarding call. We'll learn about your business, understand what you currently hold and help bring your policies, certificates and renewal dates together in one place.",
    '',
    'I will call you within 24 hours - or pick a time that suits you here:',
    '',
    `Book your onboarding call: ${booking}`,
    '',
    "There's nothing you need to prepare. If you have your existing policies nearby, that's helpful - but we'll guide you through everything together.",
    '',
    "Thank you for trusting us with this part of your business. I'm genuinely glad to have you with us.",
    '',
    'Warmly,',
    '',
    'Kong',
    '',
    'Founder, Covarage',
    '',
    'Your insurance team, without the insurance department.',
    '',
    '--',
    disclosure,
    registered,
  ].join('\n');
  const p = (s) => `<p style="margin:0 0 16px">${s}</p>`;
  const html = [
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1f1a15;max-width:560px">',
    p(esc(greet)),
    p('Thank you for requesting access to Covarage.'),
    p('I started Covarage because too many business owners are left to manage insurance on their own. Keeping track of policies, chasing for replies, and wondering whether their cover still fits the business they have today.'),
    p('I believe every business deserves someone in its corner. A team that knows the company, keeps things organised and makes sure nothing important is quietly overlooked.'),
    p("That begins with a short onboarding call. We'll learn about your business, understand what you currently hold and help bring your policies, certificates and renewal dates together in one place."),
    p('I will call you within 24 hours - or pick a time that suits you here:'),
    `<p style="margin:0 0 16px"><a href="${esc(booking)}" style="display:inline-block;background:#423226;color:#ffffff;padding:12px 22px;border-radius:3px;text-decoration:none;font-weight:500">Book your onboarding call</a></p>`,
    p("There's nothing you need to prepare. If you have your existing policies nearby, that's helpful - but we'll guide you through everything together."),
    p("Thank you for trusting us with this part of your business. I'm genuinely glad to have you with us."),
    p('Warmly,'),
    p('Kong'),
    p('Founder, Covarage'),
    p('<em>Your insurance team, without the insurance department.</em>'),
    '<hr style="border:none;border-top:1px solid #d9d2c7;margin:24px 0 16px">',
    `<p style="margin:0 0 8px;font-size:12px;color:#6b6257">${disclosure}</p>`,
    `<p style="margin:0;font-size:12px;color:#6b6257">${esc(registered)}</p>`,
    '</div>',
  ].join('');
  return { subject: 'Welcome to Covarage - Your insurance team, without the insurance department', text, html };
}

function esc(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function safeJson(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
