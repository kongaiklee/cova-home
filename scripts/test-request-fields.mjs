/**
 * scripts/test-request-fields.mjs - what /api/request actually puts in front of a human.
 *
 * The handler is the one place a lead becomes a Slack message, and its field list is data, not
 * code: HIDDEN decides what rides along. This harness calls the exported handler directly with
 * fetch intercepted, so it can read the Slack payload AND the outbound email without either
 * leaving the machine - a test that can send a real founder welcome to a real address is not a
 * test anyone should run twice.
 *
 * Built at the origin capture (w12): `page` had been the constant `/` on every lead ever taken,
 * so no enquiry could name the guide that produced it. Extended at the in-article enquiry block,
 * which posts to this same endpoint with fewer fields and must not trigger the welcome written
 * for someone who asked for access.
 *
 *   node scripts/test-request-fields.mjs
 */
import handler from '../api/request.js';

const sent = { slack: null, mail: [] };
globalThis.fetch = async (url, opts) => {
  const u = String(url);
  const body = opts && opts.body ? JSON.parse(opts.body) : {};
  if (u.includes('/hook')) { sent.slack = body.text; return new Response('ok', { status: 200 }); }
  if (u.includes('api.resend.com')) { sent.mail.push(body); return new Response('{}', { status: 200 }); }
  throw new Error(`unexpected outbound call: ${u}`);
};
process.env.SLACK_WEBHOOK_URL = 'https://example.invalid/hook';
process.env.RESEND_API_KEY = 'test-key';
process.env.REQUEST_MAIL_FROM = 'Covarage <requests@example.invalid>';
process.env.REQUEST_MAIL_TO = 'team@example.invalid';

function mockRes() {
  const o = { code: 0, body: null };
  o.status = (c) => { o.code = c; return o; };
  o.json = (j) => { o.body = j; return o; };
  o.setHeader = () => {};
  return o;
}

async function post(body) {
  sent.slack = null;
  sent.mail = [];
  const res = mockRes();
  await handler({ method: 'POST', body }, res);
  const text = sent.slack || '';
  return {
    code: res.code,
    text,
    mail: sent.mail,
    lines: text ? text.split('\n') : [],
    field: (name) => (text.split('\n').find((l) => l.startsWith(`${name}: `)) || '').slice(name.length + 2),
    has: (name) => text.split('\n').some((l) => l.startsWith(`${name}: `)),
  };
}

const LEAD = { name: 'Test Lead', company: 'Test Pte Ltd', email: 'a@b.com', number: '+65 9000 0000', trade: 'construction' };
const ARTICLE = 'https://covarage.com/guides/licensing/bca-builders-licensing-scheme-insurance';

let pass = 0;
const fails = [];
async function check(label, fn) {
  try {
    const why = await fn();
    if (why) { fails.push(`${label}: ${why}`); console.log(`FAIL  ${label}  -> ${why}`); }
    else { pass++; console.log(`PASS  ${label}`); }
  } catch (e) {
    fails.push(`${label}: threw ${e}`);
    console.log(`FAIL  ${label}  -> threw ${String(e).slice(0, 90)}`);
  }
}

// The lead names its origin - the whole point of the change.
await check('a lead from an article carries that article as from', async () => {
  const r = await post({ ...LEAD, page: '/', from: ARTICLE });
  if (r.code !== 200) return `status ${r.code}`;
  if (r.field('from') !== ARTICLE) return `from = ${JSON.stringify(r.field('from'))}`;
  if (r.field('page') !== '/') return 'page missing';
  return null;
});

// BREAK: an absent origin must be absent, not an empty line pretending to be data.
await check('a direct visit adds no from line at all', async () => {
  const r = await post({ ...LEAD, page: '/' });
  if (r.code !== 200) return `status ${r.code}`;
  return r.has('from') ? 'a from line was emitted for an empty referrer' : null;
});

// BREAK: the referrer is attacker-controlled text arriving in a human-read channel.
await check('a referrer with newlines cannot forge a second field line', async () => {
  const evil = `https://covarage.com/a\nName: Forged\nEmail: evil@x.com`;
  const r = await post({ ...LEAD, page: '/', from: evil });
  const forged = r.lines.some((l) => l.startsWith('Name: Forged') || l.startsWith('Email: evil@x.com'));
  if (forged) return 'a forged field line reached the message';
  if (!r.field('from').includes('Name: Forged')) return 'the value was dropped rather than flattened';
  return null;
});

// BREAK: an unbounded referrer must not flood the channel.
await check('an over-long from is capped at 160 characters', async () => {
  const r = await post({ ...LEAD, page: '/', from: `https://covarage.com/guides/${'x'.repeat(400)}` });
  const n = r.field('from').length;
  return n === 160 ? null : `from length ${n}`;
});

// The fields that were already load-bearing keep arriving - this harness is the regression net
// for the whole HIDDEN list, not only for the field that prompted it.
await check('the existing hidden fields still ride along', async () => {
  const r = await post({ ...LEAD, page: '/', ref: 'partner-x', utm_source: 'google', industry: 'construction' });
  for (const [k, v] of [['ref', 'partner-x'], ['utm_source', 'google'], ['industry', 'construction']]) {
    if (r.field(k) !== v) return `${k} = ${JSON.stringify(r.field(k))}`;
  }
  return null;
});

// BREAK: the honeypot still swallows a bot before any of this runs.
await check('the honeypot still returns ok and posts nothing', async () => {
  const r = await post({ ...LEAD, page: '/', from: ARTICLE, form_meta: 'bot' });
  if (r.code !== 200) return `status ${r.code}`;
  return r.text ? 'a honeypot submission reached the channel' : null;
});

// ---- the in-article enquiry block (CMO spec s2) posts to this same endpoint ----

const GUIDE = { name: 'Guide Reader', company: '(from article)', trade: 'construction', source: 'article', page: '/guides/licensing/bca-builders-licensing-scheme-insurance' };

await check('a guide reader who leaves only an email is accepted', async () => {
  const r = await post({ ...GUIDE, email: 'reader@example.com', question: 'About: BCA Builders Licensing Scheme' });
  if (r.code !== 200) return `status ${r.code}`;
  if (r.field('Question') !== 'About: BCA Builders Licensing Scheme') return `question = ${JSON.stringify(r.field('Question'))}`;
  if (r.field('Number') !== '-') return 'an absent number was not shown as absent';
  return null;
});

await check('a guide reader who leaves only a mobile is accepted', async () => {
  const r = await post({ ...GUIDE, number: '+65 9000 0000', question: 'What must my firm carry?' });
  if (r.code !== 200) return `status ${r.code}`;
  return r.field('Email') === '-' ? null : 'an absent email was not shown as absent';
});

// BREAK: widening "both required" to "either" must not become "neither".
await check('a submission with neither an email nor a mobile is refused', async () => {
  const r = await post({ ...GUIDE, question: 'no way to reach me' });
  return r.code === 400 ? null : `status ${r.code}`;
});

// BREAK: the loose email check still has to run on the address that IS given.
await check('a malformed email is still refused', async () => {
  const r = await post({ ...GUIDE, email: 'not an address' });
  return r.code === 400 ? null : `status ${r.code}`;
});

await check('the question is capped at 240 characters', async () => {
  const r = await post({ ...GUIDE, email: 'reader@example.com', question: 'x'.repeat(600) });
  const n = r.field('Question').length;
  return n === 240 ? null : `question length ${n}`;
});

await check('the Slack message names which door the lead came through', async () => {
  const guide = await post({ ...GUIDE, email: 'reader@example.com', question: 'a question' });
  const home = await post({ ...LEAD, page: '/' });
  if (!guide.text.startsWith('New question from a guide')) return `guide headline: ${guide.text.split('\n')[0]}`;
  if (!home.text.startsWith('New request for a call')) return `homepage headline: ${home.text.split('\n')[0]}`;
  return null;
});

// The founder welcome says "thank you for requesting access" and offers an onboarding call. A
// guide reader asked a question. Sending it would answer something they did not ask.
await check('a guide reader is NOT sent the founder welcome', async () => {
  const r = await post({ ...GUIDE, email: 'reader@example.com', question: 'a question' });
  const welcome = r.mail.find((m) => m.subject === 'Welcome to Covarage');
  return welcome ? 'the founder welcome was sent to a guide reader' : null;
});

await check('a homepage lead IS still sent the founder welcome', async () => {
  const r = await post({ ...LEAD, page: '/' });
  const welcome = r.mail.find((m) => m.subject === 'Welcome to Covarage');
  if (!welcome) return 'the founder welcome stopped firing for the homepage form';
  return welcome.to[0] === LEAD.email ? null : `welcome addressed to ${welcome.to}`;
});

console.log(`\n${pass}/${pass + fails.length} passed`);
if (fails.length) { console.error('FAILURES:\n' + fails.join('\n')); process.exitCode = 1; }
