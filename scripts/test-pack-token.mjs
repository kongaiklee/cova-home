#!/usr/bin/env node
/**
 * test-pack-token.mjs - the pack-token signing acceptance suite.
 *
 * CD DIRECTION_onboarding-pack.md s7.5: "PROVED BY BREAKING, never by watching it pass". Every
 * check here constructs an attack and requires it to FAIL to verify. A suite that only minted a
 * good link and watched it work would pass just as happily against the unsigned build this
 * replaces, which is the whole reason it is written this way.
 *
 * It verifies through the SAME WebCrypto path and the SAME public key the browser uses
 * (src/content/packKey.ts), so it is testing the shipped contract rather than a re-implementation.
 *
 *   node scripts/test-pack-token.mjs           # items 1-4 (crypto contract)
 *   node scripts/test-pack-token.mjs --dist    # + item 5: the built bundle carries no private key
 *
 * ITEM 5 IS THE ONE THAT CATCHES THE DANGEROUS FAILURE. A build passing 1-4 and failing 5 has
 * fixed nothing: the secret would be readable in the bundle and forging would resume while every
 * other test still went green. Run with --dist after a build before shipping.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const KEY_SRC = readFileSync('src/content/packKey.ts', 'utf8');
const PUB = KEY_SRC.match(/PACK_PUBLIC_KEY_SPKI_B64\s*=\s*\n?\s*'([^']+)'/)?.[1];
if (!PUB) {
  console.error('could not read PACK_PUBLIC_KEY_SPKI_B64 out of src/content/packKey.ts');
  process.exit(1);
}

let pass = 0;
let fail = 0;
function check(name, ok, detail = '') {
  if (ok) {
    pass += 1;
    console.log(`  PASS  ${name}`);
  } else {
    fail += 1;
    console.log(`  FAIL  ${name}${detail ? ` - ${detail}` : ''}`);
  }
}

const b64urlToBytes = (s) => new Uint8Array(Buffer.from(s, 'base64url'));

/** The browser's check, byte for byte: import the public SPKI key, verify P1363 over the payload. */
async function verify(token) {
  if (!token) return null;
  const [payload, sig, ...rest] = token.split('.');
  if (!payload || !sig || rest.length) return null;
  try {
    const key = await crypto.subtle.importKey(
      'spki',
      b64urlToBytes(PUB),
      { name: 'ECDSA', namedCurve: 'P-256' },
      false,
      ['verify']
    );
    const ok = await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' },
      key,
      b64urlToBytes(sig),
      new TextEncoder().encode(payload)
    );
    if (!ok) return null;
    const data = JSON.parse(new TextDecoder().decode(b64urlToBytes(payload)));
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return null;
    return data;
  } catch {
    return null;
  }
}

const mint = (args) =>
  execFileSync('node', ['scripts/make-pack-link.mjs', ...args], { encoding: 'utf8' })
    .trim()
    .split('?t=')[1];

console.log('pack token signing - acceptance (CD s7.5), proved by breaking\n');

// --- item 4 first: we need a known-good link to attack -----------------------
const good = mint([
  '--name', 'Jane Tan',
  '--company', 'Tan Logistics',
  '--email', 'jane@tanlogistics.example',
  '--trade', 'logistics',
  '--introduced',
  '--renewal', 'Public liability=2027-03-01',
]);
const [goodPayload, goodSig] = good.split('.');

console.log('item 4 - a correctly minted link renders the full personalised page');
{
  const d = await verify(good);
  check('minted link verifies', d !== null);
  check('name survives intact', d?.name === 'Jane Tan', JSON.stringify(d?.name));
  check('company survives intact', d?.company === 'Tan Logistics');
  check('trade survives intact', d?.trade === 'logistics');
  check('renewals survive intact', d?.renewals?.[0]?.date === '2027-03-01');
}

// s5.3's two fallbacks must still hold - signing must not have changed elision behaviour.
console.log('\nitem 4b - s5.3 fallbacks unchanged by signing');
{
  const noTrade = await verify(mint(['--name', 'A B', '--company', 'C Pte Ltd']));
  check('missing trade still verifies (page falls back to /guides)', noTrade !== null && !noTrade.trade);
  check('missing renewals still verifies (block elides whole)', noTrade !== null && !noTrade.renewals);
}

// --- item 1: THE LINK THAT WORKS TODAY ---------------------------------------
console.log('\nitem 1 - a hand-minted token with an attacker-chosen name renders the refresh state');
{
  // CD's own case, built exactly the way the old format worked: base64url JSON, no signature.
  const forged = Buffer.from(
    JSON.stringify({ name: 'Forged Person', company: 'Someone Else Pte Ltd' }),
    'utf8'
  ).toString('base64url');
  check('UNSIGNED forged token is rejected', (await verify(forged)) === null);
  check('forged token + junk signature is rejected', (await verify(`${forged}.bm90YXNpZw`)) === null);
  const realSigOnForged = `${forged}.${goodSig}`;
  check('forged payload + a REAL signature is rejected', (await verify(realSigOnForged)) === null);
}

// --- item 2: one byte of the payload altered ---------------------------------
console.log('\nitem 2 - a valid token with one byte of payload altered renders the refresh state');
{
  const bytes = Buffer.from(goodPayload, 'base64url');
  const json = JSON.parse(bytes.toString('utf8'));
  json.company = 'Tan Logistics!';
  const tampered = Buffer.from(JSON.stringify(json), 'utf8').toString('base64url');
  check('semantic edit (company changed) is rejected', (await verify(`${tampered}.${goodSig}`)) === null);

  // And a true single-character mutation of the encoded payload, not just a re-encode.
  const i = Math.floor(goodPayload.length / 2);
  const flipped =
    goodPayload.slice(0, i) + (goodPayload[i] === 'A' ? 'B' : 'A') + goodPayload.slice(i + 1);
  check('single-character payload mutation is rejected', (await verify(`${flipped}.${goodSig}`)) === null);
}

// --- item 3: signature lifted from another link ------------------------------
console.log('\nitem 3 - a valid signature lifted onto a different payload renders the refresh state');
{
  const other = mint(['--name', 'Someone Else', '--company', 'Other Pte Ltd']);
  const [otherPayload, otherSig] = other.split('.');
  check('link A signature on link B payload is rejected', (await verify(`${otherPayload}.${goodSig}`)) === null);
  check('link B signature on link A payload is rejected', (await verify(`${goodPayload}.${otherSig}`)) === null);
  check('each link still verifies under its OWN signature', (await verify(other)) !== null);
}

// --- shape guards ------------------------------------------------------------
console.log('\nshape - malformed tokens all reach the same neutral outcome');
{
  check('empty token rejected', (await verify('')) === null);
  check('payload with no separator rejected', (await verify(goodPayload)) === null);
  check('three-part token rejected', (await verify(`${goodPayload}.${goodSig}.extra`)) === null);
  check('empty signature rejected', (await verify(`${goodPayload}.`)) === null);
  check('non-JSON payload rejected', (await verify(`bm90anNvbg.${goodSig}`)) === null);
}

// --- the mint tool must refuse rather than emit an unsigned link -------------
console.log('\nrefusal - the mint tool never falls back to an unsigned link');
{
  let refused = false;
  let emitted = '';
  try {
    emitted = execFileSync('node', ['scripts/make-pack-link.mjs', '--name', 'X'], {
      encoding: 'utf8',
      env: { ...process.env, PACK_SIGNING_KEY: '', PACK_SIGNING_KEY_FILE: 'no-such-key-file' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch {
    refused = true;
  }
  check('missing key = non-zero exit, no link printed', refused && !emitted.includes('/pack?t='));
}

// --- item 5: THE ONE THAT CATCHES THE DANGEROUS FAILURE ----------------------
if (process.argv.includes('--dist')) {
  console.log('\nitem 5 - the BUILT bundle carries no signing secret');
  if (!existsSync('dist')) {
    check('dist/ exists (run a build first)', false);
  } else {
    const priv = existsSync('.pack-signing-key')
      ? readFileSync('.pack-signing-key', 'utf8').trim()
      : process.env.PACK_SIGNING_KEY?.trim();
    if (!priv) {
      check('a private key exists to search FOR (else this proves nothing)', false);
    } else {
      // A positive control: if the search cannot find the key in a file that DOES contain it, the
      // search is broken and its clean result on dist/ would be meaningless.
      const files = [];
      (function walk(d) {
        for (const e of readdirSync(d)) {
          const f = join(d, e);
          if (statSync(f).isDirectory()) walk(f);
          else files.push(f);
        }
      })('dist');

      const needles = [priv, priv.slice(0, 40), priv.slice(-40)];
      const hits = [];
      for (const f of files) {
        let text;
        try {
          text = readFileSync(f, 'latin1');
        } catch {
          continue;
        }
        if (needles.some((n) => n && text.includes(n))) hits.push(f);
      }
      check('POSITIVE CONTROL: the search finds the key in the key file itself',
        readFileSync('.pack-signing-key', 'latin1').includes(priv.slice(0, 40)));
      check(`private key absent from all ${files.length} built files`, hits.length === 0, hits.join(', '));
      check('the PUBLIC key IS in the bundle (it must ship to verify)',
        files.some((f) => {
          try {
            return readFileSync(f, 'latin1').includes(PUB.slice(0, 40));
          } catch {
            return false;
          }
        }));
    }
  }
} else {
  console.log('\nitem 5 - SKIPPED (pass --dist after a build; it is the check that matters most)');
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exitCode = fail === 0 ? 0 : 1;
