const SITE_URL = 'https://www.imagesmith.store';

// ── SOFTWARE APPLICATION ───────────────────────────────────────────────────

export function buildSoftwareApplicationSchema(overrides?: {
  name?: string;
  url?: string;
  description?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: overrides?.name ?? 'ImageSmith',
    url: overrides?.url ?? SITE_URL,
    description:
      overrides?.description ??
      'Free image compressor built for Telegram, WhatsApp & Discord users. Compress images before messaging apps shrink them — browser-based, zero uploads, zero ads.',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1247',
    },
    featureList: [
      'Telegram image compression',
      'WhatsApp image optimizer',
      'Discord image size reducer',
      'Browser-based, zero server uploads',
      'Bulk image compression',
      'No ads, no signup, 100% free',
      'Supports JPEG, PNG, WebP, GIF, HEIC, AVIF, TIFF, BMP',
    ],
    browserRequirements: 'Requires JavaScript. Modern browser recommended.',
    softwareVersion: '2.0',
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    screenshot: `${SITE_URL}/hero.png`,
    image: `${SITE_URL}/og-image.svg`,
    author: { '@type': 'Organization', name: 'ImageSmith' },
  };
}

// ── FAQ PAGE ──────────────────────────────────────────────────────────────────

export function buildFAQSchema(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

// ── BREADCRUMB LIST ───────────────────────────────────────────────────────────

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── HOW-TO ────────────────────────────────────────────────────────────────────

export function buildHowToSchema(guide: {
  title: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.description,
    step: guide.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
    tool: [{ '@type': 'HowToTool', name: 'ImageSmith Free Image Compressor' }],
  };
}

// ── ARTICLE ───────────────────────────────────────────────────────────────────

export function buildArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished ?? '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'ImageSmith' },
    publisher: {
      '@type': 'Organization',
      name: 'ImageSmith',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
  };
}

// ── WEB APPLICATION ───────────────────────────────────────────────────────────

export function buildWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Image Compressor — ImageSmith',
    url: SITE_URL,
    description:
      'Compress images online for free with no ads. Bulk image compression tool for JPEG, PNG, and WebP formats.',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}
