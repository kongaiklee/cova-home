/**
 * The pack-link VERIFICATION key, and the token format both sides agree on.
 *
 * WHY THIS FILE IS PUBLIC AND THAT IS THE POINT (CD DIRECTION_onboarding-pack.md s7.2):
 * `/pack` is statically prerendered and personalised CLIENT-SIDE, so anything the page needs to
 * check a token ships to the browser. A shared secret would therefore be READABLE by anyone who
 * views the bundle, and forging would resume while the page looked fixed - the dangerous failure,
 * because it passes a casual review.
 *
 * So the signature is ASYMMETRIC. This is the PUBLIC half: it can VERIFY a link and it CANNOT
 * MINT one. The private half never leaves `.pack-signing-key` (gitignored) and is read only by
 * `scripts/make-pack-link.mjs`, an offline team tool. Possession of everything we serve to the
 * browser is not enough to produce a valid link - that is the property being bought.
 *
 * ECDSA P-256 / SHA-256 rather than Ed25519: both are sound, but P-256 is supported by WebCrypto
 * in every browser we serve, while Ed25519 support is recent and uneven. The choice is about
 * reach, not strength.
 *
 * ROTATION (no key without a stated replacement route):
 *   1. node scripts/make-pack-link.mjs --genkey     (writes .pack-signing-key, prints the public key)
 *   2. paste the printed value over PACK_PUBLIC_KEY_SPKI_B64 below
 *   3. rebuild and deploy
 * Every link minted under the old key stops verifying at step 3 and lands in the existing
 * `This link needs a refresh.` state. That is a re-send, not an incident - but it is why rotation
 * is a deliberate act and not routine hygiene.
 */

/** SPKI, base64. Public by design - see the header. */
export const PACK_PUBLIC_KEY_SPKI_B64 =
  'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEP5loyHjtT6aep0d/U3DEDhpHdEmlneipLfnKpUfFdmle0ofEBOVBA6eXm8U+wbm09Y7J+eKSAnq4sm6cclOzQg==';

/**
 * `<payload>.<signature>`, both base64url. The payload is the SAME base64url JSON the link has
 * always carried, so the payload-stays-in-the-link architecture is untouched (s7.1, binding) -
 * the signature goes AROUND it. The signature covers the payload's base64url BYTES, so any edit
 * to the payload, and any signature lifted from a different link, fails verification.
 */
export const PACK_TOKEN_SEPARATOR = '.';

export const PACK_SIGN_ALGO = { name: 'ECDSA', namedCurve: 'P-256' } as const;
export const PACK_VERIFY_ALGO = { name: 'ECDSA', hash: 'SHA-256' } as const;
