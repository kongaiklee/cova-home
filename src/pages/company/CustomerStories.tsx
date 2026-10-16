import type { Components } from 'react-markdown';
import Seo from '../../components/Seo';
import LanderHeader from '../landing/LanderHeader';
import LandingFooter from '../landing/LandingFooter';
import { WRAP } from '../landing/Sections';
import { REQUEST_ANCHOR } from '../landing/data';
import {
  anchorFor,
  readEditablePage,
  setting,
} from '../../content/editable-page';
import { EditableMarkdown, InlineMarkdown } from './EditableMarkdown';
import raw from '../../content/customer-stories.md?raw';

const FILE = 'src/content/customer-stories.md';
const PAGE = readEditablePage(raw, FILE);
const say = (name: string) => setting(PAGE, name, FILE);

interface Story {
  id: string;
  title: string;
  body: string;
}

/** Each `## title` in the file is one story's card, in the file's order. */
const STORIES: Story[] = (() => {
  const taken = new Set<string>();
  const stories: Story[] = [];
  for (const line of PAGE.body.split('\n')) {
    const head = /^##\s+(.+?)\s*$/.exec(line);
    if (head)
      stories.push({ id: anchorFor(head[1], taken), title: head[1], body: '' });
    else if (stories.length) stories[stories.length - 1].body += `${line}\n`;
    else if (line.trim())
      throw new Error(
        `${FILE}: "${line.trim()}" sits above the first story - start a story with a "## title" line`
      );
  }
  return stories.map((s) => ({ ...s, body: s.body.trim() }));
})();

/** A story's words: numbered steps, a quote, and an italic line on its own as the card's small print. */
const storyParts: Components = {
  ol: ({ children }) => (
    <ol className="m-0 list-none p-0 [counter-reset:step]">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="relative border-t border-border-primary py-4 pl-9 text-base/[1.65] [counter-increment:step] first:border-t-0 first:pt-0 last:pb-0 before:absolute before:left-0 before:text-[12px]/[1.65] before:font-semibold before:tracking-[0.12em] before:text-primary before:content-[counter(step,decimal-leading-zero)] lg:pl-14">
      {children}
    </li>
  ),
  ul: ({ children }) => (
    <ul className="m-0 mt-4 list-disc pl-5 text-base/[1.65] first:mt-0">
      {children}
    </ul>
  ),
  p: ({ node, children }) => {
    const only = node?.children.length === 1 ? node.children[0] : null;
    if (only?.type === 'element' && only.tagName === 'em') {
      return (
        <p className="m-0 mt-6 border-t border-border-primary pt-4 text-sm/[1.6] [&_em]:not-italic">
          {children}
        </p>
      );
    }
    return <p className="m-0 mt-4 text-base/[1.65] first:mt-0">{children}</p>;
  },
  blockquote: ({ children }) => (
    <blockquote className="m-0 mt-6 border-l-2 border-primary pl-5 first:mt-0 [&>p:first-child]:font-serif [&>p:first-child]:text-[21px]/[1.4] [&>p+p]:text-sm">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
};

/**
 * /customer-stories - recent requests told step by step, from the first call to the policy in place.
 * Every word is in content/customer-stories.md, the one file a non-designer edits; this file is the page's dress only.
 * Where each word comes from: content/customer-stories.sources.md, never read by the page.
 * One card a story; under them what every customer gets, the small print, and the way to request a call.
 */
export default function CustomerStories() {
  const promises = PAGE.settings.promise ?? [];
  return (
    <div className="bg-background-primary text-text-primary">
      <Seo
        title={say('title')}
        description={say('description')}
        path="/customer-stories"
      />
      <LanderHeader />
      <main className={`${WRAP} pt-12 pb-16 lg:pt-[88px] lg:pb-[120px]`}>
        <p className="m-0 text-[12px] font-semibold tracking-[0.12em] uppercase">
          {say('eyebrow')}
        </p>
        <h1 className="m-0 mt-3 max-w-[22ch] font-serif text-4xl/[1.12] tracking-[-1.2px] text-balance lg:text-[48px]/[1.08] lg:tracking-[-1.4px]">
          {say('headline')}
        </h1>
        <p className="m-0 mt-4 max-w-[52ch] text-[17px]/[1.65] lg:mt-5 lg:text-lg/[1.6]">
          <InlineMarkdown>{say('lede')}</InlineMarkdown>
        </p>

        <div className="mt-10 grid gap-5 lg:mt-14 lg:gap-6">
          {STORIES.map((story) => (
            <article
              key={story.id}
              id={story.id}
              className="scroll-mt-8 rounded-xl border border-border-primary bg-white px-[22px] pt-6 pb-7 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-16 lg:p-10"
            >
              <h2 className="m-0 max-w-[18ch] font-serif text-[24px]/[1.2] tracking-[-0.6px] text-primary-extended lg:text-[30px]/[1.15] lg:tracking-[-0.8px]">
                {story.title}
              </h2>
              <div className="mt-5 lg:mt-1.5">
                <EditableMarkdown components={storyParts}>
                  {story.body}
                </EditableMarkdown>
              </div>
            </article>
          ))}
        </div>

        {promises.length > 0 && (
          <section className="mt-14 border-t border-border-primary pt-10 lg:mt-24 lg:pt-12">
            <h2 className="m-0 font-serif text-[28px]/[1.2] tracking-[-0.5px] lg:text-[34px]/[1.2]">
              {say('promises-heading')}
            </h2>
            <ul className="m-0 mt-6 grid list-none gap-5 p-0 lg:mt-8 lg:grid-cols-3 lg:gap-10">
              {promises.map((promise) => (
                <li
                  key={promise}
                  className="border-t-2 border-primary pt-4 text-base/[1.65] [&_strong]:font-semibold"
                >
                  <InlineMarkdown>{promise}</InlineMarkdown>
                </li>
              ))}
            </ul>
          </section>
        )}
        {PAGE.settings.footnote?.[0] && (
          <p className="m-0 mt-8 text-[13px]/[1.6] lg:mt-10">
            <InlineMarkdown>{PAGE.settings.footnote[0]}</InlineMarkdown>
          </p>
        )}

        <div className="mt-12 flex flex-col gap-3 border-t border-border-primary pt-8 sm:flex-row sm:items-center sm:gap-6 lg:mt-16 lg:pt-10">
          <a
            href={`/${REQUEST_ANCHOR}`}
            className="block rounded-sm bg-primary-extended px-[26px] py-3.5 text-center text-[15px] font-medium text-white transition hover:opacity-90 sm:inline-block sm:shrink-0"
          >
            {say('button')}
          </a>
          {PAGE.settings['under-button']?.[0] && (
            <p className="m-0 text-[15px]/[1.6]">
              <InlineMarkdown>
                {PAGE.settings['under-button'][0]}
              </InlineMarkdown>
            </p>
          )}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
