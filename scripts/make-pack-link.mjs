#!/usr/bin/env node
/**
 * make-pack-link.mjs - mint an onboarding-pack link (plan item 15).
 *
 * The pack page (/pack) is personalised by an opaque token in ?t= - base64url JSON, no store.
 *
 * DELIVERY IS HUMAN, AT THE FOLLOW-UP - not automated at submit (CPO_SPEC_pack-delivery.md,
 * 2026-08-29). The founder welcome (s15) deliberately does NOT carry a pack link: at submit time
 * the token could hold only name+company, which delivers the pack at its emptiest, and the
 * personalisation IS the payoff. Mint after the call, when the trade, the introducer and any
 * renewal dates are actually known, and paste the link into the follow-up email.
 *
 * Usage:
 *   node scripts/make-pack-link.mjs --name "Jane Tan" --company "Tan Logistics" \
 *     --email jane@example.com --trade logistics [--introduced] \
 *     [--renewal "Public liability=2027-03-01"]... [--site https://covarage.com]
 *
 * --trade takes a request-card trade id: fnb, construction, logistics, retail, maritime,
 * professional, tech, startups. Omit anything unknown - the page elides missing fields by
 * contract and never renders broken personalisation.
 */
const args = process.argv.slice(2);
const one = (k) => { const i = args.indexOf(`--${k}`); return i === -1 ? undefined : args[i + 1]; };
const many = (k) => args.flatMap((a, i) => (a === `--${k}` ? [args[i + 1]] : []));

const TRADE_IDS = ['fnb', 'construction', 'logistics', 'retail', 'maritime', 'professional', 'tech', 'startups'];

const trade = one('trade');
if (trade && !TRADE_IDS.includes(trade)) {
  console.error(`unknown trade "${trade}" - one of: ${TRADE_IDS.join(', ')}`);
  process.exit(1);
}

const renewals = many('renewal').map((r) => {
  const i = r.indexOf('=');
  if (i === -1) { console.error(`--renewal wants "policy=date", got "${r}"`); process.exit(1); }
  return { policy: r.slice(0, i), date: r.slice(i + 1) };
});

const data = {
  ...(one('name') ? { name: one('name') } : {}),
  ...(one('company') ? { company: one('company') } : {}),
  ...(one('email') ? { email: one('email') } : {}),
  ...(trade ? { trade } : {}),
  ...(args.includes('--introduced') ? { introduced: true } : {}),
  ...(renewals.length ? { renewals } : {}),
};

const token = Buffer.from(JSON.stringify(data), 'utf8').toString('base64url');
const site = one('site') || 'https://covarage.com';
console.log(`${site}/pack?t=${token}`);
