// Branch-proof harness for composeAck (api/request.js) - the FOUNDER WELCOME, DESIGNED EMAILER
// build (CMO template file + doc row 28; subject = Kong's short-form ruling w5 00:5x; footer =
// the ruled 20 Cecil address). Proves each merge/order/escape rule without an HTTP round trip.
// Run BEFORE pushing any edit to api/request.js. Exit 1 on any miss.
import { composeAck } from '../api/request.js';

const MID = String.fromCharCode(183); // the footer separator, built without an escape literal
let failures = 0;
function check(label, cond) {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}`);
  if (!cond) failures++;
}

const full = composeAck({ name: 'Tan Mei Ling', email: 'mei.ling@example.com' });

check('subject is the short form, exact (tagline in signature only)', full.subject === 'Welcome to Covarage');
check('greeting merges the name as captured', full.text.startsWith('Hi Tan Mei Ling,'));
check('no receipt remnants - no data playback', !full.text.includes('Here is what you sent') && !full.text.includes('reached us at'));
check('the mission paragraphs verbatim', full.text.includes('I started Covarage because too many business owners are left to manage insurance on their own.') && full.text.includes('I believe every business deserves someone in its corner.'));
check('the onboarding paragraph verbatim', full.text.includes("That begins with a short onboarding call. We'll learn about your business, understand what you currently hold and help bring your policies, certificates and renewal dates together in one place."));
check('24-hour line verbatim with ASCII hyphen', full.text.includes('I will call you within 24 hours - or pick a time that suits you here:'));
check('24-hour promise stands AHEAD of the booking CTA', full.text.indexOf('24 hours') < full.text.indexOf('cal.com'));
check('booking link carries prefill params, encoded', full.text.includes('https://cal.com/kongaiklee/30min?name=Tan+Mei+Ling&email=mei.ling%40example.com'));
check('text part carries the URL itself (complete on its own)', /Book your onboarding call: https:\/\/cal\.com/.test(full.text));
check('Kong signs: Warmly / Kong / Founder, Covarage', /Warmly,\n\nKong\nFounder, Covarage/.test(full.text));
check('the tagline closes the signature', full.text.includes('Your insurance team, without the insurance department.'));
check('footer: the RULED 20 Cecil address with middot separators', full.text.includes(`Covarage Pte. Ltd. ${MID} UEN 202531227H ${MID} 20 Cecil Street, #22-00, PLUS Building, Singapore 049705`));
check('footer: the old 143 Cecil is GONE', !full.text.includes('143 Cecil') && !full.html.includes('143 Cecil'));
check('footer: disclosure character for character', full.text.includes('Covarage is a technology platform. We are not a licensed insurance broker regulated by the Monetary Authority of Singapore (MAS) and do not provide any financial advice.'));
check('footer: the copyright line', full.text.includes('(c) Covarage 2026') && full.html.includes('&copy; Covarage 2026'));

// The designed emailer - template markers, not paragraphs.
check('html is the card emailer: outer ground + white card', full.html.includes('background-color:#f4f2ee') && full.html.includes('border-radius:8px;'));
check('html header: logo disc + wordmark', full.html.includes('assets/logo.png') && full.html.includes('>Covarage</span>'));
check('html CTA: the Teak button links the booking URL', full.html.includes('background-color:#423226; border-radius:6px;') && full.html.includes('href="https://cal.com/kongaiklee/30min?name=Tan+Mei+Ling&amp;email=mei.ling%40example.com"') && full.html.includes('>Book your onboarding call</a>'));
check('html: 24-hour promise bolded ahead of the button', full.html.indexOf('<strong>I will call you within 24 hours</strong>') > 0 && full.html.indexOf('24 hours') < full.html.indexOf('cal.com'));
check('html signature: italic tagline in the muted tone', full.html.includes('font-style:italic') && full.html.includes('#8a7c6c'));
check('html footer: template address line with entities', full.html.includes('Covarage Pte. Ltd. &middot; UEN 202531227H &middot; 20 Cecil Street, #22-00, PLUS Building, Singapore 049705'));

// Empty name: `Hi,` never `Hi ,`, param dropped, bare URL keeps working.
const anon = composeAck({ name: '', email: 'x@y.co' });
check('empty name greets Hi, never Hi ,', anon.text.startsWith('Hi,\n') && !anon.text.includes('Hi ,'));
check('empty name drops its URL param', anon.text.includes('30min?email=x%40y.co') && !anon.text.includes('name='));
const bare = composeAck({ name: '', email: '' });
check('no params leaves the bare booking URL', bare.text.includes('call: https://cal.com/kongaiklee/30min\n'));

// Escaping: user input never injects markup; text stays raw; URL params encoded.
const hostile = composeAck({ name: '<b>K&"Q"</b>', email: 'a+b@x.com' });
check('html escapes the hostile name', hostile.html.includes('Hi &lt;b&gt;K&amp;&quot;Q&quot;&lt;/b&gt;,') && !hostile.html.includes('<b>K'));
check('text keeps the raw name', hostile.text.startsWith('Hi <b>K&"Q"</b>,'));
check('plus-tagged email is URL-encoded in the link', hostile.text.includes('email=a%2Bb%40x.com'));

console.log(failures ? `\n${failures} FAILED` : '\nALL PASS');
process.exit(failures ? 1 : 0);
