import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PLATFORMS } from '@/lib/data/platforms';
import { FORMATS } from '@/lib/data/formats';
import { buildPlatformMetadata } from '@/lib/seo/metadata';
import {
  generatePlatformH1,
  generatePlatformIntro,
  getRelatedFormatLinks,
  getRelatedPlatformLinks,
} from '@/lib/content/generators';
import { buildSoftwareApplicationSchema, buildFAQSchema } from '@/lib/seo/schema';
import SchemaScript from '@/components/seo/SchemaScript';
import BreadcrumbNav from '@/components/seo/BreadcrumbNav';
import RelatedLinks from '@/components/seo/RelatedLinks';
import LandingFAQ from '@/components/landing/LandingFAQ';
import DashboardClient from '@/components/dashboard/DashboardClient';

interface Props {
  params: Promise<{ platform: string }>;
}

export async function generateStaticParams() {
  return PLATFORMS.map((p) => ({ platform: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform: platformSlug } = await params;
  const platform = PLATFORMS.find((p) => p.slug === platformSlug);
  if (!platform) return {};
  return buildPlatformMetadata(platform);
}

export default async function PlatformPage({ params }: Props) {
  const { platform: platformSlug } = await params;
  const platform = PLATFORMS.find((p) => p.slug === platformSlug);
  if (!platform) notFound();

  const relatedFormats = getRelatedFormatLinks('', FORMATS, 4);
  const otherPlatforms = getRelatedPlatformLinks(
    PLATFORMS.filter((p) => p.slug !== platformSlug),
    6
  );

  const schemas = [
    buildSoftwareApplicationSchema({ description: generatePlatformIntro(platform) }),
    buildFAQSchema(platform.faqItems),
  ];

  return (
    <>
      <SchemaScript schemas={schemas} />

      <div className="pt-28 max-w-6xl mx-auto px-6">
        <BreadcrumbNav
          items={[
            { name: 'Home', href: '/' },
            { name: `Compress for ${platform.displayName}`, href: `/compress-images-for/${platformSlug}` },
          ]}
        />

        <h1 className="text-3xl md:text-4xl font-extrabold mt-6 mb-4">
          {generatePlatformH1(platform)}
        </h1>
        <p className="text-lg opacity-70 mb-8 max-w-3xl">
          {generatePlatformIntro(platform)}
        </p>

        {/* Platform specs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <p className="text-xs opacity-50 uppercase font-bold mb-1">Max File Size</p>
            <p className="font-bold">{platform.maxFileSizeKB.toLocaleString()} KB</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <p className="text-xs opacity-50 uppercase font-bold mb-1">Recommended Format</p>
            <p className="font-bold">{platform.recommendedFormat}</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <p className="text-xs opacity-50 uppercase font-bold mb-1">Dimensions</p>
            <p className="font-bold text-sm">{platform.recommendedDimensions}</p>
          </div>
        </div>

        {/* Compression tips */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">
            {platform.displayName} Compression Tips
          </h2>
          <ul className="space-y-2">
            {platform.compressionTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm opacity-80">
                <span className="text-pink-500 font-bold mt-0.5">{i + 1}.</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Embedded tool */}
      <div className="max-w-6xl mx-auto px-6">
        <DashboardClient defaultMode="size" defaultTargetKB={platform.maxFileSizeKB} />
      </div>

      {/* Related formats */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6">Compress by Format</h2>
        <RelatedLinks links={relatedFormats} columns={4} />
      </section>

      {/* Other platforms */}
      {otherPlatforms.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Other Platform Optimizers</h2>
          <RelatedLinks links={otherPlatforms} columns={3} />
        </section>
      )}

      <LandingFAQ
        faqs={platform.faqItems}
        title={`${platform.displayName} Image Optimization FAQ`}
      />
    </>
  );
}
