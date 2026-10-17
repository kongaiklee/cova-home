/**
 * The pages a non-designer edits (/faq, and the stories pages when they land) keep every word in one Markdown file in
 * this folder - a text edit and a redeploy, never a JSX edit, as content/careers.md is for /careers.
 * Each file has three parts, in this order:
 *
 *   1. how to edit it - everything above the first `---` line; never shown;
 *   2. the page's settings - `name: value` lines between the first two `---` lines; a name written
 *      on several lines is a list, in the order written;
 *   3. the page itself - Markdown from the second `---` line to the end.
 *
 * Where each word comes from sits beside it in `<page>.sources.md`, which no page imports: an imported file is
 * sent to every browser whole, so nothing that is not on the page belongs in it.
 *
 * Square brackets that are not a link (`[like this]`) are a placeholder: the build stops on one, so
 * a draft never reaches the live site. A link (`[text](/path)`) and a tick box (`[ ]`, `[x]`) are not.
 */
export interface EditablePage {
  settings: Record<string, string[]>;
  body: string;
}

const PLACEHOLDER = /\[(?![ xX]\])[^\]\n]+\](?![([])/;

export function readEditablePage(raw: string, file: string): EditablePage {
  const lines = raw.replace(/\r\n?/g, '\n').split('\n');
  const fences = lines
    .flatMap((line, i) => (line.trim() === '---' ? [i] : []))
    .slice(0, 2);
  if (fences.length < 2) {
    throw new Error(
      `${file}: the page's settings need a line "---" above them and another below them`
    );
  }
  const settings: Record<string, string[]> = {};
  for (const line of lines.slice(fences[0] + 1, fences[1])) {
    if (!line.trim()) continue;
    const m = /^([a-z][a-z-]*):\s*(.*)$/i.exec(line.trim());
    if (!m)
      throw new Error(
        `${file}: a settings line reads "name: value" - not "${line.trim()}"`
      );
    (settings[m[1].toLowerCase()] ??= []).push(m[2].trim());
  }
  const body = lines
    .slice(fences[1] + 1)
    .join('\n')
    .trim();

  const hit = PLACEHOLDER.exec(
    [...Object.values(settings).flat(), body].join('\n')
  );
  if (hit && import.meta.env.PROD) {
    throw new Error(
      `${file}: "${hit[0]}" is a placeholder - write the words, or take the line out`
    );
  }
  return { settings, body };
}

/** One setting the page cannot do without; a missing one stops the build with its name. */
export function setting(
  page: EditablePage,
  name: string,
  file: string
): string {
  const value = page.settings[name]?.[0];
  if (!value)
    throw new Error(`${file}: the setting "${name}:" is missing or empty`);
  return value;
}

/** An anchor for a heading: "Who places my cover?" -> who-places-my-cover. Unique within `taken`. */
export function anchorFor(text: string, taken: Set<string>): string {
  const base =
    text
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60)
      .replace(/-+$/, '') || 'section';
  let id = base;
  for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
  taken.add(id);
  return id;
}

/** Markdown down to the words a reader sees: for search engines' structured data, never for the page. */
export function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, '')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
