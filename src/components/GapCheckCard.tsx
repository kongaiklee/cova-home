import { ArrowRight } from 'lucide-react';

export const GAP_CHECK_PATH = '/guides/tools/insurance-gap-check';

/**
 * The gap-check card - one component, every placement.
 *
 * It started as an aside on the article end block. Kong saw it on the w12 preview and asked for
 * it on the lander too, "with the same cta / button" (2026-09-10) - so the copy lives here once
 * and both placements render it, rather than two copies of three strings that drift the first
 * time one of them is reworded.
 *
 * Built for a dark ground (the article band's gradient, the lander's Teak band). The caller
 * places it and says how the click is counted, because the same card means an article CTA on a
 * guide and a homepage CTA on the lander.
 */
export default function GapCheckCard({ onOpen, className = '' }: { onOpen?: () => void; className?: string }) {
  return (
    <aside className={`rounded-xl border border-white/25 px-5 py-5 text-left ${className}`}>
      <p className="m-0 text-sm font-semibold text-white">Not sure what you are missing?</p>
      <p className="m-0 mt-1.5 text-sm/relaxed text-white/85">Run the free gap check - five questions, no sign-up.</p>
      <a
        href={GAP_CHECK_PATH}
        onClick={onOpen}
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white no-underline transition hover:bg-white/25"
      >
        Check my cover
        <ArrowRight className="size-4" />
      </a>
    </aside>
  );
}
