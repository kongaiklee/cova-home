/**
 * scripts/test-request-fields.mjs - what /api/request actually puts in front of a human.
 *
 * The handler is the one place a lead becomes a Slack message, and its field list is data, not
 * code: HIDDEN decides what rides along. This harness calls the exported handler directly against
 * a throwaway webhook and reads the posted text, so a field that stops arriving fails here rather
 * than in a Slack channel nobody is watching at the time.
 *
 * Built at the origin capture (w12): `page` had been the constant `/` on every lead ever taken,
 * so no enquiry could name the guide that produced it. `from` is that fix and this proves it -
 * including the two cases that matter more than the happy one: a direct visit must add NO from
 * line at all (an absent origin is honest; an empty one is noise), and a referrer carrying
 * newlines must not be able to forge a second field line in the message.
 *
 *   node scripts/test-request-fields.mjs
 */
import http from 'node:http';
import handler from '../api/request.js';

const captured = [];
const srv = http.createServer((req, res) => {
  let b = '';
  req.on('data', (c) => (b += c));
  req.on('end', () => { captured.push(JSON.parse(b).text); res.writeHead(200).end('ok'); });
});
await new Promise((r) => srv.listen(0, r));
process.env.SLACK_WEBHOOK_URL = `http://localhost:${srv.address().port}/hook`;
delete process.env.RESEND_API_KEY;

function mockRes() {
  const o = { code: 0, body: null };
  o.status = (c) => { o.code = c; return o; };
  o.json = (j) => { o.body = j; return o; };
  o.setHeader = () => {};
  return o;
}

async function post(body) {
  captured.length = 0;
  const res = mockRes();
  await handler({ method: 'POST', body }, res);
  const text = captured[0] || '';
  return {
    code: res.code,
    text,
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

srv.close();
console.log(`\n${pass}/${pass + fails.length} passed`);
if (fails.length) { console.error('FAILURES:\n' + fails.join('\n')); process.exitCode = 1; }
