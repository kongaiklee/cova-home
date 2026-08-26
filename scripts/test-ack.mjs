// Branch-proof harness for composeAck (api/request.js) - the FOUNDER WELCOME (CMO s15 row 28,
// Kong's draft). Proves each merge/order/escape rule without an HTTP round trip. Exit 1 on any miss.
import { composeAck } from '../api/request.js';

let failures = 0;
function check(label, cond) {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}`);
  if (!cond) failures++;
}

const full = composeAck({ name: 'Tan Mei Ling', email: 'mei.ling@example.com' });

check('subject is Kong\'s, exact', full.subject === 'Welcome to Covarage - Your insurance team, without the insurance department');
check('greeting merges the name as captured', full.text.startsWith('Hi Tan Mei Ling,'));
check('no receipt remnants - no data playback', !full.text.includes('Here is what you sent') && !full.text.includes('reached us at'));
check('the mission paragraphs verbatim', full.text.includes('I started Covarage because too many business owners are left to manage insurance on their own.') && full.text.includes('I believe every business deserves someone in its corner.'));
check('the onboarding paragraph verbatim', full.text.includes("That begins with a short onboarding call. We'll learn about your business, understand what you currently hold and help bring your policies, certificates and renewal dates together in one place."));
check('24-hour line verbatim with ASCII hyphen', full.text.includes('I will call you within 24 hours - or pick a time that suits you here:'));
check('24-hour promise stands AHEAD of the booking CTA', full.text.indexOf('24 hours') < full.text.indexOf('cal.com'));
check('booking link carries prefill params, encoded', full.text.includes('https://cal.com/kongaiklee/30min?name=Tan+Mei+Ling&email=mei.ling%40example.com'));
check('text part carries the URL itself (complete on its own)', /Book your onboarding call: https:\/\/cal\.com/.test(full.text));
check('nothing-to-prepare paragraph verbatim', full.text.includes("There's nothing you need to prepare. If you have your existing policies nearby, that's helpful - but we'll guide you through everything together."));
check('Kong signs: Warmly / Kong / Founder, Covarage in order', /Warmly,\n\nKong\n\nFounder, Covarage/.test(full.text));
check('the tagline closes the body', full.text.includes('Your insurance team, without the insurance department.'));
check('disclosure character for character', full.text.includes('Covarage is a technology platform. We are not a licensed insurance broker regulated by the Monetary Authority of Singapore (MAS) and do not provide any financial advice.'));
check('registered line renders middots at runtime', full.text.includes('Covarage Pte. Ltd. \u00b7 UEN 202531227H \u00b7 143 Cecil Street, #03-01, GB Building, Singapore 069542 \u00b7 Data protection: dpo@covarage.com'));
check('html CTA is a labeled link to the booking URL', full.html.includes('>Book your onboarding call</a>') && full.html.includes('href="https://cal.com/kongaiklee/30min?name=Tan+Mei+Ling&amp;email=mei.ling%40example.com"'));
check('html tagline is emphasised', full.html.includes('<em>Your insurance team, without the insurance department.</em>'));
check('body is pure ASCII apart from the runtime middots', [...full.text].every((ch) => ch.charCodeAt(0) < 127 || ch === '\u00b7'));

// Empty name: `Hi,` never `Hi ,` (s15 merge rule), and the booking link still works.
const anon = composeAck({ name: '', email: 'x@y.co' });
check('empty name greets Hi, never Hi ,', anon.text.startsWith('Hi,\n') && !anon.text.includes('Hi ,'));
check('empty name drops its URL param', anon.text.includes('30min?email=x%40y.co') && !anon.text.includes('name='));

// Both empty: bare booking URL, no dangling ?.
const bare = composeAck({ name: '', email: '' });
check('no params leaves the bare booking URL', bare.text.includes('call: https://cal.com/kongaiklee/30min\n'));

// HTML escaping: user input must never inject markup; text stays raw; the URL param is encoded.
const hostile = composeAck({ name: '<b>K&"Q"</b>', email: 'a+b@x.com' });
check('html escapes the hostile name', hostile.html.includes('Hi &lt;b&gt;K&amp;&quot;Q&quot;&lt;/b&gt;,') && !hostile.html.includes('<b>K'));
check('text keeps the raw name', hostile.text.startsWith('Hi <b>K&"Q"</b>,'));
check('plus-tagged email is URL-encoded in the link', hostile.text.includes('email=a%2Bb%40x.com'));

console.log(failures ? `\n${failures} FAILED` : '\nALL PASS');
process.exit(failures ? 1 : 0);
