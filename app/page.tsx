import type { Metadata } from 'next';
import { buildHomeMetadata } from '@/lib/seo/metadata';
import SchemaScript from '@/components/seo/SchemaScript';
import RelatedLinks from '@/components/seo/RelatedLinks';
import LandingHero from '@/components/landing/LandingHero';
import LandingHowItWorks from '@/components/landing/LandingHowItWorks';
import LandingFeatures from '@/components/landing/LandingFeatures';
import ToolsShowcase from '@/components/landing/ToolsShowcase';
import LandingFAQ from '@/components/landing/LandingFAQ';
import { buildSoftwareApplicationSchema, buildFAQSchema } from '@/lib/seo/schema';
import { FORMATS, FORMAT_SLUGS } from '@/lib/data/formats';
import { PLATFORMS } from '@/lib/data/platforms';

export const metadata: Metadata = buildHomeMetadata();

const homeFAQs = [
  {
    q: 'Why do images look blurry after sending on Telegram?',
    a: 'Telegram automatically compresses images sent as "photos" to reduce bandwidth. To avoid this, either send as a "file" or pre-compress with ImageSmith so the image is already optimized before Telegram can degrade it further.',
  },
  {
    q: 'How do I compress an image for Telegram without losing quality?',
    a: 'Upload your image to ImageSmith, target under 1280KB, and download. ImageSmith uses a browser-based binary-search compression that finds the highest quality at your target size — no server, no signup required.',
  },
  {
    q: 'Does ImageSmith work for WhatsApp and Discord image compression?',
    a: 'Yes. ImageSmith is optimized for Telegram, WhatsApp, Discord, Instagram, and 15+ other platforms. Each platform page pre-sets the recommended dimensions and file size for you.',
  },
  {
    q: 'Does ImageSmith upload my images to a server?',
    a: "No. ImageSmith runs entirely in your browser using the Canvas API. Your images are never uploaded anywhere — they never leave your device.",
  },
  {
    q: 'What image formats and tools does ImageSmith support?',
    a: 'ImageSmith supports JPEG, PNG, WebP, GIF, BMP, HEIC, AVIF, and TIFF across 10 tools: Compressor, Converter, Resizer, Cropper, Rotate & Flip, Filters, Circle Crop, Image to PDF, Watermark, and EXIF Strip.',
  },
];

const formatLinks = FORMAT_SLUGS.map((slug) => {
  const fmt = FORMATS.find((f) => f.slug === slug)!;
  return { label: `Compress ${fmt.label}`, href: `/compress/${slug}` };
});

const PLATFORM_ORDER = ['telegram', 'whatsapp', 'instagram', 'discord', 'shopify', 'wordpress'];
const platformLinks = PLATFORM_ORDER
  .map((slug) => PLATFORMS.find((p) => p.slug === slug))
  .filter(Boolean)
  .map((p) => ({ label: `For ${p!.displayName}`, href: `/compress-images-for/${p!.slug}` }));

export default function HomePage() {
  const schemas = [
    buildSoftwareApplicationSchema(),
    buildFAQSchema(homeFAQs),
  ];

  return (
    <>
      <SchemaScript schemas={schemas} />
      <LandingHero />
      <LandingHowItWorks />
      <LandingFeatures />
      <ToolsShowcase />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Compress by Format</h2>
        <RelatedLinks links={formatLinks} columns={4} />
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Optimize for Platform</h2>
        <RelatedLinks links={platformLinks} columns={3} />
      </section>

      <LandingFAQ faqs={homeFAQs} />
    </>
  );
}
