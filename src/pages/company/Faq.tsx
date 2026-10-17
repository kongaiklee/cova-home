import { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Seo from '../../components/Seo';
import LanderHeader from '../landing/LanderHeader';
import LandingFooter from '../landing/LandingFooter';
import { WRAP } from '../landing/Sections';
import {
  anchorFor,
  plainText,
  readEditablePage,
  setting,
} from '../../content/editable-page';
import { EditableMarkdown, InlineMarkdown } from './EditableMarkdown';
import raw from '../../content/faq.md?raw';

const FILE = 'src/content/faq.md';
const PAGE = readEditablePage(raw, FILE);
const say = (name: string) => setting(PAGE, name, FILE);

interface Question {
  id: string;
  question: string;
  answer: string;
}
interface Topic {
  id: string;
  title: string;
  questions: Question[];
}

/** `## topic` starts a group, `### question?` a question, and the lines under it are its answer. */
const TOPICS: Topic[] = (() => {
  const taken = new Set<string>();
  const topics: Topic[] = [];
  let question: Question | null = null;
  for (const line of PAGE.body.split('\n')) {
    const topic = /^##\s+(.+?)\s*$/.exec(line);
    const asked = /^###\s+(.+?)\s*$/.exec(line);
    if (topic) {
      topics.push({
        id: anchorFor(topic[1], taken),
        title: topic[1],
        questions: [],
      });
      question = null;
    } else if (asked) {
      if (!topics.length)
        throw new Error(
          `${FILE}: the question "${asked[1]}" needs a "## topic" line above it`
        );
      question = {
        id: anchorFor(asked[1], taken),
        question: asked[1],
        answer: '',
      };
      topics[topics.length - 1].questions.push(question);
    } else if (question) {
      question.answer += `${line}\n`;
    } else if (line.trim()) {
      throw new Error(
        `${FILE}: "${line.trim()}" sits outside any question - put it under a "### question" line`
      );
    }
  }
  return topics
    .map((t) => ({
      ...t,
      questions: t.questions.map((q) => ({ ...q, answer: q.answer.trim() })),
    }))
    .filter((t) => t.questions.length > 0);
})();

/** The same questions and answers as structured data, for search engines and answer engines. */
const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: TOPICS.flatMap((t) =>
    t.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: plainText(q.answer) },
    }))
  ),
};

const inlineLinks =
  '[&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary [&_strong]:font-semibold';

/**
 * /faq - the questions businesses ask, grouped by topic; each answer opens under its question.
 * Every word is in content/faq.md, the one file a non-designer edits; this file is the page's dress only.
 * Where each word comes from: content/faq.sources.md, never read by the page.
 * The answers are in the served HTML, closed, so search reads them and the browser's find opens them.
 */
export default function Faq() {
  // A link to one question (/faq#who-places-my-cover) opens its answer.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target instanceof HTMLDetailsElement) {
      target.open = true;
      target.scrollIntoView();
    }
  }, []);

  return (
    <div className="bg-background-primary text-text-primary">
      <Seo
        title={say('title')}
        description={say('description')}
        path="/faq"
        jsonLd={FAQ_LD}
      />
      <LanderHeader />
      <main className={`${WRAP} pt-12 pb-16 lg:pt-[88px] lg:pb-[120px]`}>
        <h1 className="m-0 max-w-[22ch] font-serif text-4xl/[1.12] tracking-[-1.2px] text-balance lg:text-[48px]/[1.08] lg:tracking-[-1.4px]">
          {say('headline')}
        </h1>
        <p
          className={`m-0 mt-4 max-w-[60ch] text-[17px]/[1.65] lg:mt-5 lg:text-lg/[1.6] ${inlineLinks}`}
        >
          <InlineMarkdown>{say('lede')}</InlineMarkdown>
        </p>

        <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-x-20">
          <nav
            aria-label="Topics"
            className="border-b border-border-primary pb-6 lg:sticky lg:top-10 lg:border-b-0 lg:pb-0"
          >
            <p className="m-0 text-[12px] font-semibold tracking-[0.12em] uppercase">
              Topics
            </p>
            <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 lg:mt-4 lg:block lg:space-y-3">
              {TOPICS.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="text-[15px] font-medium text-text-primary underline-offset-2 hover:text-primary hover:underline"
                  >
                    {t.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 lg:mt-0">
            {TOPICS.map((t) => (
              <section
                key={t.id}
                id={t.id}
                aria-labelledby={`${t.id}-heading`}
                className="scroll-mt-8 pt-10 first:pt-0 lg:pt-14"
              >
                <h2
                  id={`${t.id}-heading`}
                  className="m-0 font-serif text-[26px]/[1.2] tracking-[-0.5px] lg:text-[30px]/[1.2]"
                >
                  {t.title}
                </h2>
                <div className="mt-4 border-t border-border-primary">
                  {t.questions.map((q) => (
                    <details
                      key={q.id}
                      id={q.id}
                      className="group scroll-mt-8 border-b border-border-primary"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[17px]/[1.45] font-semibold hover:text-primary-extended focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                        <span>{q.question}</span>
                        <ChevronDown
                          aria-hidden="true"
                          className="mt-0.5 size-5 shrink-0 transition-transform group-open:rotate-180"
                          strokeWidth={1.75}
                        />
                      </summary>
                      <div className="article-body max-w-[64ch] pb-6">
                        <EditableMarkdown>{q.answer}</EditableMarkdown>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
