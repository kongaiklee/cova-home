import { useState } from 'react';
import { IMG, REQUEST_ANCHOR, TRADES } from './data';
import RequestCard from './RequestCard';
import { requestClick } from './requestFraming';

const WASH = 'linear-gradient(160deg, rgba(95,136,174,0.28) 0%, rgba(194,212,226,0.18) 100%)';
// The Sailcloth scrim keeps the dark serif headline legible over the photo: 97% -> 0 across 0-76%.
const SCRIM =
  'linear-gradient(90deg, rgba(253,251,249,0.97) 0%, rgba(253,251,249,0.92) 30%, rgba(253,251,249,0.55) 48%, rgba(253,251,249,0.12) 64%, rgba(253,251,249,0) 76%)';

/**
 * Full-bleed hero (Kong 2026-08-28: "go full bleed it looks more cohesive"). Desktop: the trade
 * photograph runs behind the ENTIRE hero at center 30% / cover under the brand wash and scrim;
 * text column and centred card unmoved - the subject lands in the seam between them at every
 * width, no position tracking. The photo follows the trade select. Default F&B. Phone keeps the
 * split: copy, then the photo tile, then the card - nothing hidden. ONE card in the DOM: the
 * layout is CSS-only so the anchor, the form and the select exist exactly once at every breakpoint.
 */
export default function Hero() {
  const [trade, setTrade] = useState(TRADES[0].id);
  const hero = TRADES.find((t) => t.id === trade)?.hero ?? 'fnb';
  const tile = { backgroundImage: `${WASH}, url(${IMG}/pg-hero-${hero}.jpg)` };
  const fullBleed = {
    backgroundImage: `${SCRIM}, ${WASH}, url(${IMG}/pg-hero-${hero}.jpg)`,
    backgroundPosition: '0 0, 0 0, center 30%',
    backgroundSize: 'auto, auto, cover',
  };

  return (
    <section className="relative border-b border-border-primary">
      <div
        className="absolute inset-0 hidden bg-no-repeat motion-safe:transition-[background-image] lg:block"
        style={fullBleed}
        aria-hidden
      />
      <div className="relative grid lg:min-h-[680px] lg:grid-cols-2">
        <div className="flex items-center px-5 pt-9 pb-6 sm:px-8 lg:py-[72px] lg:pr-14 lg:pl-[100px]">
          <div>
            {/* Rev 3n: `Fortune 500 companies have a team for insurance. Now you do.` SURVIVES AND
                MOVES to the proof context (s3 strip area) - its slot and treatment are CD's verdict
                under R19, so it is off the page only until that lands. Do not retire the line. */}
            <h1 className="m-0 mb-3 font-serif text-4xl/[1.06] tracking-[-1.2px] text-balance text-text-primary lg:mb-[18px] lg:text-[56px]/[1.04] lg:tracking-[-1.8px]">
              Insurance comes with questions you did not know to ask.
            </h1>
            <h2 className="m-0 mb-3 font-serif text-[21px]/[1.25] tracking-[-0.5px] text-balance text-primary lg:mb-[18px] lg:text-[26px]/[1.2] lg:tracking-[-0.6px]">
              Your insurance team, without the insurance department.
            </h2>
            <p className="m-0 max-w-[46ch] text-base/[1.5] text-text-primary lg:mb-[30px] lg:text-lg">
              See what businesses like yours commonly carry and what changed. Then meet a licensed adviser who reviews what applies to your business.
            </p>
            <a href={REQUEST_ANCHOR} onClick={requestClick} className="hidden rounded-sm bg-primary-extended px-[26px] py-[13px] text-[15px] font-medium text-white transition hover:opacity-90 lg:inline-block">
              Request access
            </a>
          </div>
        </div>

        {/* phone: photo tile, card below. desktop: a plain positioning box - the photo lives on the section shell. */}
        <div className="relative px-4 pb-7 lg:min-h-[680px] lg:p-0">
          <div
            className="h-60 rounded-xl bg-cover bg-center motion-safe:transition-[background-image] lg:hidden"
            style={tile}
            data-hero-photo={hero}
          />
          <div className="relative pt-3 lg:absolute lg:top-1/2 lg:left-1/2 lg:w-[440px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:pt-0">
            <RequestCard trade={trade} onTrade={setTrade} />
          </div>
        </div>
      </div>
    </section>
  );
}
