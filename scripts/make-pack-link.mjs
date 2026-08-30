#!/usr/bin/env node
/**
 * make-pack-link.mjs - mint an onboarding-pack link (plan item 15).
 *
 * The pack page (/pack) is personalised by an opaque token in ?t= - base64url JSON, no store.
 *
 * THE TOKEN IS SIGNED (Kong ruled 2026-08-30, verbatim "ok sign the token"; CD
 * DIRECTION_onboarding-pack.md s7). Before signing, anyone who worked out the format could mint
 * /pack?t=<base64 JSON> and have covarage.com greet any person at any company in full brand
 * dress, with the real WhatsApp number. Measured, not theorised.
 *
 * The signature is ASYMMETRIC and that is forced by the architecture, not a preference: /pack is
 * prerendered and personalised CLIENT-SIDE, so a shared secret would ship inside the bundle and
 * forging would resume WHILE THE PAGE LOOKED FIXED. This script holds the PRIVATE key; only the
 * public key ships. See src/content/packKey.ts for the format, the algorithm choice and the
 * rotation route.
 *
 * THE PRIVATE KEY IS NOT IN THE REPO. It is read from, in order:
 *   1. $PACK_SIGNING_KEY        (base64 PKCS8 - use this in any automated context)
 *   2. $PACK_SIGNING_KEY_FILE   (path to a file holding the same)
 *   3. ./.pack-signing-key      (the default, gitignored)
 * Missing key = REFUSE TO MINT. This script never falls back to an unsigned link: a tool that
 * quietly emits the exact artefact the signing was meant to kill is worse than one that stops.
 *
 * DELIVERY IS HUMAN, AT THE FOLLOW-UP - not automated at submit (CPO_SPEC_pack-delivery.md,
 * 2026-08-29). The founder welcome (s15) deliberately does NOT carry a pack link: at submit time
 * the token could hold only name+company, which delivers the pack at its emptiest, and the
 * personalisation IS the payoff. Mint after the call, when the trade, the introducer and any
 * renewal dates are actually known, and paste the link into the follow-up email.
 *
 * Usage:
 *   node scripts/make-pack-link.mjs --genkey    # mint a NEW keypair (rotation; see packKey.ts)
 *   node scripts/make-pack-link.mjs --name "Jane Tan" --company "Tan Logistics" \
 *     --email jane@example.com --trade logistics [--introduced] \
 *     [--renewal "Public liability=2027-03-01"]... [--site https://covarage.com]
 *
 * --trade takes a request-card trade id: fnb, construction, logistics, retail, maritime,
 * professional, tech, startups. Omit anything unknown - the page elides missing fields by
 * contract and never renders broken personalisation.
 */
import { createSign, createPrivateKey, generateKeyPairSync } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const args = process.argv.slice(2);

// --genkey: the rotation route named in packKey.ts, in the same tool that signs, so the two
// halves of a keypair can never drift apart across two scripts.
if (args.includes('--genkey')) {
  const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' });
  const priv = privateKey.export({ type: 'pkcs8', format: 'der' }).toString('base64');
  const pub = publicKey.export({ type: 'spki', format: 'der' }).toString('base64');
  writeFileSync('.pack-signing-key', priv + '\n', { mode: 0o600 });
  console.log('private key -> .pack-signing-key (gitignored; never commit it)');
  console.log('');
  console.log('paste this over PACK_PUBLIC_KEY_SPKI_B64 in src/content/packKey.ts, then rebuild:');
  console.log(pub);
  console.log('');
  console.log('EVERY link minted under the old key stops verifying once that deploys.');
  process.exit(0);
}
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

/**
 * Load the PRIVATE key, or refuse. Never returns a fallback - see the header: emitting an
 * unsigned link on a missing key would hand back exactly the artefact this work removes.
 */
function privateKeyOrRefuse() {
  const inline = process.env.PACK_SIGNING_KEY;
  const file = process.env.PACK_SIGNING_KEY_FILE || '.pack-signing-key';
  let b64 = inline;
  if (!b64) {
    try {
      b64 = readFileSync(file, 'utf8').trim();
    } catch {
      console.error(
        `no pack signing key: set $PACK_SIGNING_KEY (base64 PKCS8), or $PACK_SIGNING_KEY_FILE, or\n` +
          `put one at ${file}. Mint a new keypair with:  node scripts/make-pack-link.mjs --genkey\n` +
          'REFUSING to emit an unsigned link - an unsigned token is the defect this signs away.'
      );
      process.exit(1);
    }
  }
  try {
    return createPrivateKey({ key: Buffer.from(b64, 'base64'), format: 'der', type: 'pkcs8' });
  } catch (e) {
    console.error(`pack signing key is not a base64 PKCS8 P-256 key: ${e.message}`);
    process.exit(1);
  }
}

const payload = Buffer.from(JSON.stringify(data), 'utf8').toString('base64url');

// The signature covers the PAYLOAD BYTES as sent, so altering one byte of the payload, or
// pasting a signature taken from another link, both fail verification.
// P1363 (r||s) rather than DER: it is what WebCrypto's verify() expects in the browser.
const sig = createSign('SHA256')
  .update(payload)
  .sign({ key: privateKeyOrRefuse(), dsaEncoding: 'ieee-p1363' })
  .toString('base64url');

const token = `${payload}.${sig}`;
const site = one('site') || 'https://covarage.com';
console.log(`${site}/pack?t=${token}`);
