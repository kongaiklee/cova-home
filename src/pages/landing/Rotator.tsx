import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { IMG, REQUEST_ANCHOR, ROTATION } from './data';
import { WRAP } from './Sections';

const PERIOD = 2800;
const FADE = 250;

/**
 * 9. One headline, the word rotates through six frames with a fade. Reduced motion, or no JS:
 * frame one, static. All six frames are in the DOM (hidden) so the copy gate reads them.
 */
export default function Rotator() {
  const [i, setI] = useState(0);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      setFaded(true);
      setTimeout(() => { setI((n) => (n + 1) % ROTATION.length); setFaded(false); }, FADE);
    }, PERIOD);
    return () => clearInterval(t);
  }, []);

  const f = ROTATION[i];
  const cta = 'rounded-sm bg-primary-extended text-[15px] font-medium text-white transition hover:opacity-90';

  return (
    <section className="border-b border-border-primary">
      <div className={`${WRAP} py-[52px] lg:py-24`}>
        <div className="grid overflow-hidden rounded-xl border border-border-primary bg-white lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 lg:p-11">
            <h2 className="m-0 mb-2.5 min-h-[2.25em] max-w-[22ch] font-serif text-[28px]/[1.12] tracking-[-0.9px] text-text-primary lg:mb-3 lg:text-4xl/[1.1] lg:tracking-[-1.1px]">
              Are you carrying what{' '}
              <span className={clsx('inline-block text-primary motion-safe:transition-opacity motion-safe:duration-[250ms]', faded && 'opacity-0')} data-rotating-word>{f.word}</span>
              {' '}requires?
            </h2>
            <p className={clsx('m-0 mb-[22px] min-h-[3.2em] max-w-[50ch] text-[15px]/[1.6] text-text-secondary motion-safe:transition-opacity motion-safe:duration-[250ms] lg:mb-7 lg:text-base', faded && 'opacity-0')}>{f.body}</p>
            <div hidden data-rotation-frames>
              {ROTATION.map((r) => (
                <div key={r.word}><span>Are you carrying what {r.word} requires?</span><span>{r.body}</span></div>
              ))}
            </div>
            <p className="m-0 mb-5 max-w-[50ch] text-[15px]/[1.6] text-text-primary lg:mb-6 lg:text-base/[1.65]">Tell us what you hold. A licensed adviser reads it against what is being asked of you.</p>
            <a href={REQUEST_ANCHOR} className={`${cta} block py-4 text-center lg:inline-block lg:px-[26px] lg:py-[13px]`}>Consult an adviser</a>
            <img src={`${IMG}/pg-img04-documents-ask.jpg`} alt="" className="mt-5 block h-[220px] w-full rounded-xl object-cover lg:hidden" loading="lazy" />
          </div>
          <img src={`${IMG}/pg-img04-documents-ask.jpg`} alt="" className="hidden h-full min-h-[260px] w-full object-cover lg:block" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
