/** Format an ISO date (2026-05-04) as a Singapore-style date (4 May 2026). */
export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-SG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Estimated reading time from a word count, at ~220 words per minute. */
export function readingTime(wordCount: number): string {
  return `${Math.max(1, Math.round(wordCount / 220))} min read`;
}
