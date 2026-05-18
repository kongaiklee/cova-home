import { Head } from 'vite-react-ssg';

export const SITE_URL = 'https://covarage.com';
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo.png`;

interface SeoProps {
  title: string;
  description: string;
  /** Site-absolute path, e.g. /blog or /comparison/tied-agent-vs-ifa. */
  path: string;
  /** Absolute URL or site-relative path. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  /** A schema.org object rendered as JSON-LD. */
  jsonLd?: Record<string, unknown>;
}

function absolute(url: string): string {
  if (url.startsWith('http')) return url;
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

/** Per-page <head>: title, description, canonical, Open Graph, Twitter, JSON-LD. */
export default function Seo({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  jsonLd,
}: SeoProps) {
  const canonical = absolute(path);
  const ogImage = absolute(image || DEFAULT_IMAGE);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content="Covarage" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  );
}
