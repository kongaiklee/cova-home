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

const sent = { slack: null, slackUrl: null, mail: [] };
globalThis.fetch = async (url, opts) => {
  const u = String(url);
  const body = opts && opts.body ? JSON.parse(opts.body) : {};
  if (u.includes('/hook')) { sent.slack = body.text; sent.slackUrl = u; return new Response('ok', { status: 200 }); }
  if (u.includes('api.resend.com')) { sent.mail.push(body); return new Response('{}', { status: 200 }); }
  throw new Error(`unexpected outbound call: ${u}`);
};
process.env.SLACK_WEBHOOK_URL = 'https://example.invalid/hook';
process.env.RESEND_API_KEY = 'test-key';
process.env.REQUEST_MAIL_FROM = 'Covarage <requests@example.invalid>';
process.env.REQUEST_MAIL_TO = 'team@example.invalid';
const LEAD_HOOK = process.env.SLACK_WEBHOOK_URL;
const ER_HOOK = 'https://example.invalid/hook/er2027-kong-only';
process.env.SLACK_ER2027_WEBHOOK_URL = ER_HOOK;
process.env.ER2027_MAIL_TO = 'kong@example.invalid';

function mockRes() {
  const o = { code: 0, body: null };
  o.status = (c) => { o.code = c; return o; };
  o.json = (j) => { o.body = j; return o; };
  o.setHeader = () => {};
  return o;
}

async function post(body) {
  sent.slack = null;
  sent.slackUrl = null;
  sent.mail = [];
  const res = mockRes();
  await handler({ method: 'POST', body }, res);
  const text = sent.slack || '';
  return {
    code: res.code,
    text,
    mail: sent.mail,
    hook: sent.slackUrl,
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

// ONE LEAD FLOW whichever door they came through - Kong, 2026-09-09: "lets sync everything to
// the same flow first, founders welcome + onboarding call". This seat had suppressed the welcome
// for guide readers and he struck that, so the assertion is INVERTED here rather than deleted:
// the file should show that the rule changed, not look like it never existed.
await check('a guide reader IS sent the founder welcome and the onboarding call', async () => {
  const r = await post({ ...GUIDE, email: 'reader@example.com', question: 'a question' });
  const welcome = r.mail.find((m) => m.subject === 'Welcome to Covarage');
  if (!welcome) return 'no founder welcome was sent to a guide reader';
  if (welcome.to[0] !== 'reader@example.com') return `welcome addressed to ${welcome.to}`;
  return welcome.text.includes('cal.com') ? null : 'the welcome carried no booking link';
});

await check('a homepage lead IS still sent the founder welcome', async () => {
  const r = await post({ ...LEAD, page: '/' });
  const welcome = r.mail.find((m) => m.subject === 'Welcome to Covarage');
  if (!welcome) return 'the founder welcome stopped firing for the homepage form';
  return welcome.to[0] === LEAD.email ? null : `welcome addressed to ${welcome.to}`;
});

// BREAK: a reader who left only a mobile has no address, so there is nothing to send - and the
// submission must still succeed rather than failing on the missing leg.
await check('a mobile-only reader gets no email and the submission still succeeds', async () => {
  const r = await post({ ...GUIDE, number: '+65 9000 0000', question: 'call me' });
  if (r.code !== 200) return `status ${r.code}`;
  return r.mail.length === 0 ? null : `${r.mail.length} email(s) sent with no address given`;
});

// ---- the Emerging Risks 2027 signup (2026-09-14) posts to this same endpoint ----
// COO's consent conditions (nodes/working/COO_CONSENT_er2027-signup_2026-09-14.md s2): the Slack
// message IS the consent record, so it must carry the option, the time and the consent version;
// participants route to Kong; and the acknowledgement must not add a purpose - so no founder
// welcome (it thanks the reader for requesting ACCESS, which a report signup did not do).

const ER = { source: 'er2027', consent_version: 'consent v1.0 2026-09-14', page: '/emerging-risks-2027' };
const ER2027_TEST_OPTIONS = ['report', 'report_and_participate'];
const ER_ACK_SUBJECT = 'You are on the list for Emerging Risks 2027';

await check('er2027: a report signup with only an email is accepted and recorded', async () => {
  const r = await post({ ...ER, option: 'report', email: 'reader@example.com' });
  if (r.code !== 200) return `status ${r.code}`;
  if (!r.text.startsWith('Emerging Risks 2027 - report signup')) return `headline: ${r.lines[0]}`;
  if (r.field('Option') !== 'report') return `option = ${JSON.stringify(r.field('Option'))}`;
  if (r.field('Consent') !== 'consent v1.0 2026-09-14') return `consent = ${JSON.stringify(r.field('Consent'))}`;
  if (!/^\d{4}-\d{2}-\d{2}T/.test(r.field('Consent at'))) return `consent at = ${JSON.stringify(r.field('Consent at'))}`;
  return r.has('Name') ? 'a Name line was emitted for a report-only signup' : null;
});

await check('er2027: a participant carries name, company and role and is flagged for Kong', async () => {
  const r = await post({ ...ER, option: 'report_and_participate', email: 'gm@example.com', name: 'A Person', company: 'A Co', role: 'General manager' });
  if (r.code !== 200) return `status ${r.code}`;
  if (!r.lines[0].includes('take part') || !r.lines[0].includes('Kong')) return `headline: ${r.lines[0]}`;
  for (const [k, v] of [['Name', 'A Person'], ['Company', 'A Co'], ['Role', 'General manager']]) {
    if (r.field(k) !== v) return `${k} = ${JSON.stringify(r.field(k))}`;
  }
  return null;
});

// BREAK: the second option's three fields are required, not optional.
await check('er2027: a participant with no role is refused', async () => {
  const r = await post({ ...ER, option: 'report_and_participate', email: 'gm@example.com', name: 'A Person', company: 'A Co' });
  return r.code === 400 ? null : `status ${r.code}`;
});

// BREAK: an option the page does not offer is not a consent anyone gave.
await check('er2027: an unknown option is refused', async () => {
  const r = await post({ ...ER, option: 'newsletter', email: 'reader@example.com' });
  return r.code === 400 ? null : `status ${r.code}`;
});

// BREAK: a record that cannot say which line was agreed to is not a consent record (COO s2.1).
await check('er2027: a signup without the consent version is refused', async () => {
  const r = await post({ source: 'er2027', option: 'report', email: 'reader@example.com', page: '/emerging-risks-2027' });
  return r.code === 400 ? null : `status ${r.code}`;
});

// BREAK: the report is sent by email, so the email is the one field that is never optional.
await check('er2027: a signup with no email is refused', async () => {
  const r = await post({ ...ER, option: 'report' });
  return r.code === 400 ? null : `status ${r.code}`;
});

// BREAK: the founder welcome would add a purpose the consent line does not name (COO s2.5). The
// signup sent NO email until CMO's copy existed; Kong's 2026-09-14 word sends it, so this assertion
// is INVERTED rather than deleted: its own acknowledgement goes, the founder welcome never does.
await check('er2027: a report signup gets its own acknowledgement, never the founder welcome', async () => {
  const r = await post({ ...ER, option: 'report', email: 'reader@example.com' });
  if (r.mail.some((m) => m.subject === 'Welcome to Covarage')) return 'the founder welcome was sent';
  const ack = r.mail.filter((m) => m.subject === ER_ACK_SUBJECT);
  if (ack.length !== 1) return `${ack.length} acknowledgements`;
  const a = ack[0];
  if (a.to.join(',') !== 'reader@example.com') return `ack addressed to ${a.to}`;
  if (!a.text.startsWith('Hi,\n')) return `greeting: ${a.text.split('\n')[0]}`;
  if (a.text.includes('take part')) return 'the participant sentence reached a report-only signup';
  if (!a.text.includes('dpo@covarage.com') || !a.html.includes('mailto:dpo@covarage.com')) return 'no withdrawal route';
  if (/cal\.com|onboarding|requesting access/i.test(a.text + a.html)) return 'a purpose the consent line does not name';
  return null;
});

// BREAK: option 2's sentence belongs to option 2 only, and a reply must reach only the two
// people the signup itself reached (condition 3, Kong + Zul).
await check('er2027: a participant ack carries the conversation sentence and replies reach only the signup recipients', async () => {
  const r = await post({ ...ER, option: 'report_and_participate', email: 'gm@example.com', name: 'A Person', company: 'A Co', role: 'GM' });
  const a = r.mail.find((m) => m.subject === ER_ACK_SUBJECT);
  if (!a) return 'no acknowledgement';
  if (!a.text.startsWith('Hi A Person,\n')) return `greeting: ${a.text.split('\n')[0]}`;
  const line = 'You also asked to take part. I will email you to find a time for our 30-minute conversation.';
  if (!a.text.includes(line) || !a.html.includes(line)) return 'the participant sentence is missing from a part';
  const rt = [].concat(a.reply_to || []).join(',');
  return rt === 'kong@example.invalid' ? null : `reply_to ${rt}`;
});

// ---- the ER2027 destination (hub /check #9 w20) ----
// The form promises a signup reaches no one else, "including the licensed brokers who write the
// report's commentary" (COO s1/s2.3) - and the lead channel is public with an AWFA adviser in it.
// So an ER2027 signup goes to its OWN destinations and FAILS CLOSED when they are not set.

// BREAK: the live defect itself - a signup landing in the lead channel.
await check('er2027: a signup posts to its own webhook, never the lead channel', async () => {
  for (const option of ER2027_TEST_OPTIONS) {
    const r = await post({ ...ER, option, email: 'gm@example.com', name: 'A Person', company: 'A Co', role: 'GM' });
    if (r.code !== 200) return `${option}: status ${r.code}`;
    if (r.hook !== ER_HOOK) return `${option}: posted to ${r.hook}`;
  }
  return null;
});

await check('an ordinary lead still posts to the lead channel', async () => {
  const r = await post({ ...LEAD, page: '/' });
  return r.hook === LEAD_HOOK ? null : `posted to ${r.hook}`;
});

// BREAK: with its own webhook unset, the signup falls back to ITS OWN mail recipients only.
await check('er2027: with no own webhook, the fallback mail goes to its own recipients only', async () => {
  const saved = process.env.SLACK_ER2027_WEBHOOK_URL;
  delete process.env.SLACK_ER2027_WEBHOOK_URL;
  try {
    const r = await post({ ...ER, option: 'report', email: 'reader@example.com' });
    if (r.code !== 200) return `status ${r.code}`;
    if (r.hook) return `posted to ${r.hook}`;
    const internal = r.mail.filter((m) => m.subject !== ER_ACK_SUBJECT);
    if (internal.length !== 1) return `${internal.length} internal emails`;
    const to = internal[0].to.join(',');
    if (to !== 'kong@example.invalid') return `mailed to ${to}`;
    if (r.mail.some((m) => m.to.includes('team@example.invalid'))) return 'the team inbox was mailed';
    return internal[0].subject === 'Emerging Risks 2027 - report signup' ? null : `subject ${JSON.stringify(internal[0].subject)}`;
  } finally { process.env.SLACK_ER2027_WEBHOOK_URL = saved; }
});

// BREAK: with neither of its own destinations set, it refuses - it never opens onto the lead pipe.
await check('er2027: with neither own destination set, 503 and nothing sent anywhere', async () => {
  const saved = [process.env.SLACK_ER2027_WEBHOOK_URL, process.env.ER2027_MAIL_TO];
  delete process.env.SLACK_ER2027_WEBHOOK_URL;
  delete process.env.ER2027_MAIL_TO;
  try {
    const r = await post({ ...ER, option: 'report_and_participate', email: 'gm@example.com', name: 'A Person', company: 'A Co', role: 'GM' });
    if (r.code !== 503) return `status ${r.code}`;
    if (r.hook) return `posted to ${r.hook}`;
    return r.mail.length ? `${r.mail.length} email(s) sent to ${r.mail[0].to}` : null;
  } finally { [process.env.SLACK_ER2027_WEBHOOK_URL, process.env.ER2027_MAIL_TO] = saved; }
});

console.log(`\n${pass}/${pass + fails.length} passed`);
if (fails.length) { console.error('FAILURES:\n' + fails.join('\n')); process.exitCode = 1; }
