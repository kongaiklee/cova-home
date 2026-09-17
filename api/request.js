/**
 * POST /api/request - the request-a-call form's only destination.
 *
 * Posts one Slack message as the team's alert (the internal email to REQUEST_MAIL_TO is a
 * FALLBACK that fires only when the Slack leg fails - KONG w5: one email per submission), then -
 * only once internal delivery has succeeded - the founder welcome to the lead (copy: CMO s15
 * row 28 + the approved template, Kong's own draft; behaviour: CD handoff s9.2). Creates nothing
 * else: every account is opened by the team after the call. All destinations come from
 * environment variables set in the Vercel project - nothing here names a channel, an address or
 * a key.
 *
 *   SLACK_WEBHOOK_URL   incoming webhook for the notification channel
 *   RESEND_API_KEY      Resend API key
 *   REQUEST_MAIL_FROM   verified sender, e.g. "Covarage <requests@covarage.com>"
 *   REQUEST_MAIL_TO     comma-separated recipients
 *   SLACK_ER2027_WEBHOOK_URL  the Emerging Risks 2027 signup's OWN webhook - a private channel, if ever used
 *   ER2027_MAIL_TO            the ER2027 signup's own recipients - Kong + Zul (Kong 2026-09-14: "send it
 *                             to me and zul's emails")
 *
 * With none configured the endpoint answers 503 and the form shows its error line, so the button
 * cannot silently swallow a request. An ER2027 signup reads ONLY its own two variables and never
 * falls back to the lead channel or the team inbox: its form promises the signup reaches no one
 * else, including the licensed brokers writing the report (COO s2.3), and the lead channel is read
 * by an AWFA adviser (hub /check #9 w20). Unset, it answers 503 rather than post somewhere public.
 */
const LIMITS = { name: 120, company: 160, email: 160, number: 40, trade: 40, question: 240, source: 24, role: 80, option: 32, consent: 40 };
/** The Emerging Risks 2027 signup's two options (Kong 2026-09-14, CMO's build notes). */
const ER2027_OPTIONS = ['report', 'report_and_participate'];
const HIDDEN = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'policy', 'industry', 'agency', 'page', 'from'];

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
  // The in-article enquiry block posts here too (CMO spec s2): the reader's own question, and
  // the source that says which form they used. Everything else about the submission is the same.
  const question = clean(body.question, LIMITS.question);
  const source = clean(body.source, LIMITS.source);
  const fromArticle = source === 'article';
  // The Emerging Risks 2027 signup (2026-09-14) - a report request, not a lead. Its shape is Kong's
  // (CMO's build notes): `report` needs an email only; `report_and_participate` also needs name,
  // company and role, and routes to Kong for manual scheduling. COO's consent conditions
  // (COO's consent clearance v1.0, s2): this Slack message is the ONLY
  // consent record, so it carries the option, the time and the version of the line shown - and a
  // submission that cannot say which line it agreed to is refused rather than recorded.
  const er2027 = source === 'er2027';
  const option = clean(body.option, LIMITS.option);
  const role = clean(body.role, LIMITS.role);
  const consent = clean(body.consent_version, LIMITS.consent);
  const participate = option === 'report_and_participate';
  if (er2027) {
    if (!ER2027_OPTIONS.includes(option)) return res.status(400).json({ ok: false, error: 'option' });
    if (!consent) return res.status(400).json({ ok: false, error: 'consent' });
    if (!email || (participate && (!name || !company || !role))) {
      return res.status(400).json({ ok: false, error: 'fields' });
    }
  } else if (!name || !company || (!email && !number)) {
    // Presence only for human-read fields (KONG w6: the number's format rule comes off - a human
    // calls it back and can read a country code, spaces, an extension). Never validate more
    // strictly than the thing that consumes the value.
    // A reader on an article is asked for ONE way to reach them, not two (CMO spec s2 slot C:
    // "one of the two required"), because they are giving an address for an answer rather than a
    // number for a call. The homepage form asks for all four but marks the number optional
    // (CMO's signup-rate finding s6, 2026-09-17: the test of a lighter form), so it relies on this
    // same rule.
    return res.status(400).json({ ok: false, error: 'fields' });
  }
  // Email is machine-read, so it gets a shape check - but a LOOSE one: exactly one @, a dot
  // somewhere after it, no whitespace. A strict regex rejects real addresses and every
  // rejection is a lost lead.
  const at = email.indexOf('@');
  if (email && (at < 1 || at !== email.lastIndexOf('@') || !email.slice(at + 1).includes('.') || /\s/.test(email))) {
    return res.status(400).json({ ok: false, error: 'email' });
  }
  const extras = HIDDEN.map((k) => [k, clean(body[k], 160)]).filter(([, v]) => v);

  // An ER2027 signup has its own destinations and no other (see the header): fail closed, never open.
  const slack = er2027 ? process.env.SLACK_ER2027_WEBHOOK_URL : process.env.SLACK_WEBHOOK_URL;
  const resend = process.env.RESEND_API_KEY;
  const to = ((er2027 ? process.env.ER2027_MAIL_TO : process.env.REQUEST_MAIL_TO) || '').split(',').map((s) => s.trim()).filter(Boolean);
  const from = process.env.REQUEST_MAIL_FROM;
  if (!slack && !(resend && to.length && from)) {
    return res.status(503).json({ ok: false, error: 'unconfigured' });
  }

  const when = new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore', hour12: false });
  const lines = er2027
    ? [
        `Option: ${option}`,
        `Email: ${email}`,
        ...(participate ? [`Name: ${name}`, `Company: ${company}`, `Role: ${role}`] : []),
        `Consent: ${consent}`,
        `Consent at: ${new Date().toISOString()}`,
        ...extras.map(([k, v]) => `${k}: ${v}`),
        `Received: ${when} SGT`,
      ]
    : [`Name: ${name}`, `Company: ${company}`, `Email: ${email || '-'}`, `Number: ${number || '-'}`, `Trade: ${trade || '-'}`, ...(question ? [`Question: ${question}`] : []), ...extras.map(([k, v]) => `${k}: ${v}`), `Received: ${when} SGT`];
  // Kong reads leads in Slack; the first line should say which door they came through. An ER2027
  // participant is Kong's to schedule by hand (his ruling) - the headline says so.
  const headline = er2027
    ? (participate ? 'Emerging Risks 2027 - wants to take part (for Kong to schedule)' : 'Emerging Risks 2027 - report signup')
    : fromArticle ? 'New question from a guide' : 'New request for a call';

  // ONE email per submission (KONG w5 ~02:0x: "can we only fire one?" - the plain internal alert
  // was landing beside the lead's welcome, because the team inbox is his). Slack is the team's
  // alert channel; the internal email is a FALLBACK that fires only when the Slack leg fails, so
  // the redundancy that protects lead capture survives without doubling inboxes normally.
  let slackOk = false;
  if (slack) {
    try {
      const r = await fetch(slack, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text: `${headline}\n${lines.join('\n')}` }),
      });
      slackOk = r.ok;
      if (!r.ok) console.warn('request: slack failed', r.status);
    } catch (e) {
      console.warn('request: slack failed', String(e).slice(0, 80));
    }
  }
  let mailOk = false;
  if (!slackOk && resend && to.length && from) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${resend}`, 'content-type': 'application/json' },
        body: JSON.stringify({ from, to, subject: company ? `${headline}: ${company}` : headline, text: lines.join('\n') }),
      });
      mailOk = r.ok;
      if (r.ok) console.warn('request: internal mail fallback fired (slack leg failed)');
      else console.warn('request: internal mail fallback failed', r.status);
    } catch (e) {
      console.warn('request: internal mail fallback failed', String(e).slice(0, 80));
    }
  }
  const delivered = slackOk || mailOk;
  if (!delivered) {
    console.error('request: no delivery', { slackOk, mailOk });
    return res.status(502).json({ ok: false, error: 'delivery' });
  }

  // The founder welcome to the lead - fires ONLY after internal delivery succeeded, so a lead
  // is never told we have their request when we do not (s9.2.1). Awaited, because a Vercel
  // function may freeze the moment the response is sent; its failure is logged and never changes
  // the response (s9.2.3) - the submission itself DID succeed and the team WAS notified.
  // ONE LEAD FLOW, whichever door they came through - KONG, 2026-09-09: "lets sync everything to
  // the same flow first, founders welcome + onboarding call". This seat had suppressed the
  // welcome for guide readers because it thanks someone for requesting access; the concern was
  // raised and he ruled, so it fires for every lead. Any rewording of that one sentence is CMO's
  // and changes no flow. Still requires an address: a reader who left only a mobile cannot be
  // emailed, and the team calls them instead.
  // An Emerging Risks 2027 signup gets NO founder welcome: it thanks the reader for requesting
  // ACCESS and offers an onboarding call - a purpose COO's cleared consent line does not name
  // (COO s2.5: the acknowledgement must match the option chosen and add no purpose). It gets ITS
  // OWN acknowledgement instead (CMO's copy; Kong 2026-09-14 11:2x via the hub, "ok good to go lets
  // send the email"). A reply goes to the signup's own recipients, so a participant's answer
  // reaches the same two people as the signup did and no one else.
  if (er2027) {
    if (resend && from) {
      const ack = composeEr2027Ack({ name, participate });
      try {
        const sent = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { authorization: `Bearer ${resend}`, 'content-type': 'application/json' },
          body: JSON.stringify({ from, to: [email], ...(to.length ? { reply_to: to } : {}), subject: ack.subject, text: ack.text, html: ack.html }),
        });
        if (sent.ok) console.log('request: er2027 ack sent');
        else console.warn('request: er2027 ack failed', sent.status);
      } catch (e) {
        console.warn('request: er2027 ack failed', String(e).slice(0, 80));
      }
    } else {
      console.warn('request: er2027 ack skipped (mail unconfigured)');
    }
  } else if (resend && from && email) {
    const ack = composeAck({ name, email, number });
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
  } else if (!email) {
    console.log('request: ack skipped (no email given - mobile only)');
  } else {
    console.warn('request: ack skipped (mail unconfigured)');
  }
  return res.status(200).json({ ok: true });
}

/** The legal block every outbound email carries: the site footer, unchanged. */
const DISCLOSURE = 'Covarage is a technology platform. We are not a licensed insurance broker regulated by the Monetary Authority of Singapore (MAS) and do not provide any financial advice.';
// The registered line carries the RULED address (KONG ~00:5x w5, via COO's records: the office
// moved May 2026, ACRA-acknowledged) - the template file carries it. The estate-wide sweep of
// the stale pre-move address was plan item 22, executed w6.
const REGISTERED = 'Covarage Pte. Ltd. · UEN 202531227H · 20 Cecil Street, #22-00, PLUS Building, Singapore 049705';

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
// The founder welcome's one branching sentence (CMO no-number branch v1.0 s3, 2026-09-18): the number
// is optional on the homepage form, and a person who gave none cannot be called.
export function composeAck({ name, email, number }) {
  const reach = number ? 'I will call you within 24 hours' : 'I will be in touch by email within 24 hours';
  const params = new URLSearchParams();
  if (name) params.set('name', name);
  if (email) params.set('email', email);
  const q = params.toString();
  const booking = q ? `https://cal.com/kongaiklee/30min?${q}` : 'https://cal.com/kongaiklee/30min';
  const greet = name ? `Hi ${name},` : 'Hi,';
  const disclosure = DISCLOSURE;
  const registered = REGISTERED;
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
    `${reach} - or pick a time that suits you here:`,
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
    'Founder, Covarage',
    'Your insurance team, without the insurance department.',
    '',
    '--',
    registered,
    disclosure,
    '(c) Covarage 2026',
  ].join('\n');
  // The HTML part IS CMO's template file, verbatim (../working/CMO_EMAIL_TEMPLATE_s15_founder.html
  // - the designed card emailer Kong approved in his inbox), with the two merge fields resolved.
  const body = (s, extra) => `<p style="font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.7; color:#1f1a14; margin:${extra || '0 0 18px 0'};">${s}</p>`;
  const html = [
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f2ee; margin:0; padding:0;">',
    '  <tr>',
    '    <td align="center" style="padding:40px 16px;">',
    '      <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; width:100%; background-color:#ffffff; border:1px solid #e6e1d8; border-radius:8px;">',
    '        <tr>',
    '          <td style="padding:32px 40px 0 40px;">',
    '            <img src="https://covarage.com/assets/logo.png" width="22" height="22" alt="" style="vertical-align:middle; margin-right:8px; background-color:#423226; border-radius:50%;">',
    '            <span style="font-family:Arial,Helvetica,sans-serif; font-size:17px; font-weight:800; color:#423226; vertical-align:middle;">Covarage</span>',
    '          </td>',
    '        </tr>',
    '        <tr>',
    '          <td style="padding:28px 40px 32px 40px;">',
    body(esc(greet)),
    body('Thank you for requesting access to Covarage.'),
    body('I started Covarage because too many business owners are left to manage insurance on their own. Keeping track of policies, chasing for replies, and wondering whether their cover still fits the business they have today.'),
    body('I believe every business deserves someone in its corner. A team that knows the company, keeps things organised and makes sure nothing important is quietly overlooked.'),
    body("That begins with a short onboarding call. We'll learn about your business, understand what you currently hold and help bring your policies, certificates and renewal dates together in one place."),
    body(`<strong>${reach}</strong> - or pick a time that suits you here:`, '0 0 10px 0'),
    '            <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;"><tr><td style="background-color:#423226; border-radius:6px;">',
    `              <a href="${esc(booking)}" style="display:inline-block; padding:11px 22px; font-family:Arial,Helvetica,sans-serif; font-size:14px; font-weight:700; color:#fdfbf9; text-decoration:none;">Book your onboarding call</a>`,
    '            </td></tr></table>',
    body("There's nothing you need to prepare. If you have your existing policies nearby, that's helpful - but we'll guide you through everything together."),
    body("Thank you for trusting us with this part of your business. I'm genuinely glad to have you with us.", '0 0 24px 0'),
    body('Warmly,', '0'),
    '            <p style="font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.7; color:#1f1a14; margin:12px 0 0 0;">Kong<br>',
    '            <span style="font-size:13px; color:#8a7c6c;">Founder, Covarage</span><br>',
    '            <span style="font-size:13px; font-style:italic; color:#8a7c6c;">Your insurance team, without the insurance department.</span></p>',
    '          </td>',
    '        </tr>',
    '        <tr>',
    '          <td style="padding:20px 40px 28px 40px; border-top:1px solid #eee9e0;">',
    '            <p style="font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:1.6; color:#a39684; margin:0 0 8px 0;">Covarage Pte. Ltd. &middot; UEN 202531227H &middot; 20 Cecil Street, #22-00, PLUS Building, Singapore 049705</p>',
    `            <p style="font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:1.6; color:#a39684; margin:0 0 8px 0;">${disclosure}</p>`,
    '            <p style="font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:1.6; color:#a39684; margin:0;">&copy; Covarage 2026</p>',
    '          </td>',
    '        </tr>',
    '      </table>',
    '    </td>',
    '  </tr>',
    '</table>',
  ].join('\n');
  // Subject: KONG'S SHORT-FORM RULING (w5 00:5x, recorded in the template header) - the tagline
  // lives in the body signature only, never in the subject. Supersedes row 28's composite.
  return { subject: 'Welcome to Covarage', text, html };
}

/**
 * The Emerging Risks 2027 acknowledgement - CMO's copy verbatim (strings v1.0 s4), sent on Kong's
 * word (2026-09-14 11:2x, via the hub: "ok good to go lets send the email"). The founder welcome's
 * card and legal footer, signed by Kong as that one is. It names only the two purposes COO's
 * consent line names - the report, and the conversation for option 2 only - and repeats the
 * withdrawal route (COO s2.5). No booking link: the conversation is arranged by hand.
 */
export function composeEr2027Ack({ name, participate }) {
  const greet = name ? `Hi ${name},` : 'Hi,';
  const page = 'https://covarage.com/emerging-risks-2027';
  const paras = [
    'Thank you for signing up for Emerging Risks 2027: Singapore Edition.',
    'We are talking to business leaders across Singapore about the risks they expect next year, from AI fraud to heat stress, and what they have done about each one. The report publishes in January 2027, and we will email you a copy when it does.',
    ...(participate ? ['You also asked to take part. I will email you to find a time for our 30-minute conversation.'] : []),
  ];
  const until = 'Until then, everything we have already published on these risks is at';
  const withdraw = 'You can withdraw and ask us to delete your details at any time at';
  const text = [
    greet,
    '',
    ...paras.flatMap((p) => [p, '']),
    `${until} ${page}`,
    '',
    `${withdraw} dpo@covarage.com.`,
    '',
    'Warmly,',
    '',
    'Kong',
    'Founder, Covarage',
    '',
    '--',
    REGISTERED,
    DISCLOSURE,
    '(c) Covarage 2026',
  ].join('\n');
  const body = (s, extra) => `<p style="font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.7; color:#1f1a14; margin:${extra || '0 0 18px 0'};">${s}</p>`;
  const link = (href, label) => `<a href="${href}" style="color:#423226;">${label}</a>`;
  const html = [
    '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f2ee; margin:0; padding:0;">',
    '  <tr>',
    '    <td align="center" style="padding:40px 16px;">',
    '      <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; width:100%; background-color:#ffffff; border:1px solid #e6e1d8; border-radius:8px;">',
    '        <tr>',
    '          <td style="padding:32px 40px 0 40px;">',
    '            <img src="https://covarage.com/assets/logo.png" width="22" height="22" alt="" style="vertical-align:middle; margin-right:8px; background-color:#423226; border-radius:50%;">',
    '            <span style="font-family:Arial,Helvetica,sans-serif; font-size:17px; font-weight:800; color:#423226; vertical-align:middle;">Covarage</span>',
    '          </td>',
    '        </tr>',
    '        <tr>',
    '          <td style="padding:28px 40px 32px 40px;">',
    body(esc(greet)),
    ...paras.map((p) => body(p)),
    body(`${until} ${link(page, page)}`),
    body(`${withdraw} ${link('mailto:dpo@covarage.com', 'dpo@covarage.com')}.`, '0 0 24px 0'),
    body('Warmly,', '0'),
    '            <p style="font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.7; color:#1f1a14; margin:12px 0 0 0;">Kong<br>',
    '            <span style="font-size:13px; color:#8a7c6c;">Founder, Covarage</span></p>',
    '          </td>',
    '        </tr>',
    '        <tr>',
    '          <td style="padding:20px 40px 28px 40px; border-top:1px solid #eee9e0;">',
    '            <p style="font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:1.6; color:#a39684; margin:0 0 8px 0;">Covarage Pte. Ltd. &middot; UEN 202531227H &middot; 20 Cecil Street, #22-00, PLUS Building, Singapore 049705</p>',
    `            <p style="font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:1.6; color:#a39684; margin:0 0 8px 0;">${DISCLOSURE}</p>`,
    '            <p style="font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:1.6; color:#a39684; margin:0;">&copy; Covarage 2026</p>',
    '          </td>',
    '        </tr>',
    '      </table>',
    '    </td>',
    '  </tr>',
    '</table>',
  ].join('\n');
  return { subject: 'You are on the list for Emerging Risks 2027', text, html };
}

function esc(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function safeJson(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
