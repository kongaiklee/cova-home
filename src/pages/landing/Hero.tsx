import { useState } from 'react';
import { IMG, REQUEST_ANCHOR, TRADES } from './data';
import RequestCard from './RequestCard';
import { requestClick } from './requestFraming';

const WASH = 'linear-gradient(160deg, rgba(95,136,174,0.28) 0%, rgba(194,212,226,0.18) 100%)';

/**
 * Split hero. Copy left; the right half IS the trade photograph, full-bleed, with the request
 * card centred on it. The photo follows the trade select. Default F&B. Phone: copy, then the
 * photo tile, then the card - nothing hidden. ONE card in the DOM: the layout is CSS-only so the
 * anchor, the form and the select exist exactly once at every breakpoint.
 */
export default function Hero() {
  const [trade, setTrade] = useState(TRADES[0].id);
  const hero = TRADES.find((t) => t.id === trade)?.hero ?? 'fnb';
  const photo = { backgroundImage: `${WASH}, url(${IMG}/pg-hero-${hero}.jpg)` };

  return (
    <section className="border-b border-border-primary">
      <div className="grid lg:min-h-[680px] lg:grid-cols-2">
        <div className="flex items-center px-5 pt-9 pb-6 sm:px-8 lg:py-[72px] lg:pr-14 lg:pl-[100px]">
          <div>
            <h1 className="m-0 mb-3 font-serif text-4xl/[1.06] tracking-[-1.2px] text-balance text-text-primary lg:mb-[18px] lg:text-[56px]/[1.04] lg:tracking-[-1.8px]">
              Fortune 500 companies have a team for insurance. Now you do.
            </h1>
            <h2 className="m-0 mb-3 font-serif text-[21px]/[1.25] tracking-[-0.5px] text-balance text-primary lg:mb-[18px] lg:text-[26px]/[1.2] lg:tracking-[-0.6px]">
              The insurance team you thought you were too small for.
            </h2>
            <p className="m-0 max-w-[46ch] text-base/[1.5] text-text-primary lg:mb-[30px] lg:text-lg">
              A named adviser who knows your company, a review at every renewal, and someone who chases so you never have to.
            </p>
            <a href={REQUEST_ANCHOR} onClick={requestClick} className="hidden rounded-sm bg-primary-extended px-[26px] py-[13px] text-[15px] font-medium text-white transition hover:opacity-90 lg:inline-block">
              Request access
            </a>
          </div>
        </div>

        {/* phone: photo tile, card below. desktop: the photo fills the half, the card floats on it. */}
        <div className="relative px-4 pb-7 lg:min-h-[680px] lg:p-0">
          <div
            className="h-60 rounded-xl bg-cover bg-center motion-safe:transition-[background-image] lg:absolute lg:inset-0 lg:h-auto lg:rounded-none"
            style={photo}
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
