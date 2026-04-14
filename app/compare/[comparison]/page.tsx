import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COMPARISONS } from '@/lib/data/comparisons';
import { buildComparisonMetadata } from '@/lib/seo/metadata';
import { buildArticleSchema, buildFAQSchema } from '@/lib/seo/schema';
import SchemaScript from '@/components/seo/SchemaScript';
import BreadcrumbNav from '@/components/seo/BreadcrumbNav';
import RelatedLinks from '@/components/seo/RelatedLinks';
import LandingFAQ from '@/components/landing/LandingFAQ';
import DashboardClient from '@/components/dashboard/DashboardClient';

const BASE_URL = 'https://www.imagesmith.store';

interface Props {
  params: Promise<{ comparison: string }>;
}

export async function generateStaticParams() {
  return COMPARISONS.map((c) => ({ comparison: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comparison: compSlug } = await params;
  const comp = COMPARISONS.find((c) => c.slug === compSlug);
  if (!comp) return {};
  return buildComparisonMetadata({ title: comp.title, description: comp.description, slug: comp.slug });
}

export default async function ComparisonPage({ params }: Props) {
  const { comparison: compSlug } = await params;
  const comp = COMPARISONS.find((c) => c.slug === compSlug);
  if (!comp) notFound();

  const relatedComparisons = COMPARISONS.filter((c) => c.slug !== compSlug)
    .slice(0, 4)
    .map((c) => ({ label: c.h1, href: `/compare/${c.slug}` }));

  const schemas = [
    buildArticleSchema({
      title: comp.title,
      description: comp.description,
      url: `${BASE_URL}/compare/${comp.slug}`,
    }),
    buildFAQSchema(comp.faqs),
  ];

  return (
    <>
      <SchemaScript schemas={schemas} />

      <div className="pt-28 max-w-4xl mx-auto px-6">
        <BreadcrumbNav
          items={[
            { name: 'Home', href: '/' },
            { name: 'Compare', href: '/compare' },
            { name: comp.h1, href: `/compare/${compSlug}` },
          ]}
        />

        <h1 className="text-3xl md:text-4xl font-extrabold mt-6 mb-4">{comp.h1}</h1>
        <p className="text-lg opacity-70 mb-10 max-w-2xl">{comp.description}</p>

        {/* Prose sections */}
        {comp.sections && comp.sections.length > 0 && (
          <div className="mb-12 space-y-10">
            {comp.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold mb-4">{section.heading}</h2>
                <div className="space-y-3">
                  {section.paragraphs.map((para, j) => (
                    <p key={j} className="text-base leading-relaxed opacity-80">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Verdict */}
        <div className="p-6 rounded-2xl border border-pink-500/30 bg-pink-500/5 mb-10">
          <h2 className="text-lg font-bold mb-2">Quick verdict</h2>
          <p className="opacity-80">{comp.verdict}</p>
        </div>

        {/* Key differences table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Key Differences</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left p-4 font-bold opacity-60">Aspect</th>
                  <th className="text-left p-4 font-bold text-pink-500">
                    {comp.formatA.toUpperCase()}
                  </th>
                  <th className="text-left p-4 font-bold text-violet-500">
                    {comp.formatB.toUpperCase()}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comp.keyDifferences.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="p-4 font-medium opacity-70">{row.aspect}</td>
                    <td className="p-4 opacity-80">{row.a}</td>
                    <td className="p-4 opacity-80">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to use */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl border border-pink-500/20 bg-pink-500/5">
            <h2 className="font-bold text-pink-500 mb-3">
              Use {comp.formatA.toUpperCase()} when:
            </h2>
            <p className="text-sm opacity-80">{comp.whenToUseA}</p>
          </div>
          <div className="p-6 rounded-2xl border border-violet-500/20 bg-violet-500/5">
            <h2 className="font-bold text-violet-500 mb-3">
              Use {comp.formatB.toUpperCase()} when:
            </h2>
            <p className="text-sm opacity-80">{comp.whenToUseB}</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <div
          className="rounded-2xl p-8 text-center"
          style={{ border: '1px solid rgba(139,92,246,0.25)', background: 'rgba(139,92,246,0.04)' }}
        >
          <h2 className="text-2xl font-bold mb-2">
            Try it free — compress or convert right here
          </h2>
          <p className="opacity-60 mb-6 max-w-lg mx-auto text-sm">
            No account. No uploads to a server. No ads. Your images never leave your browser.
          </p>
          {comp.ctaLinks && comp.ctaLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {comp.ctaLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2.5 rounded-full font-semibold text-sm bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:opacity-90 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          <p className="text-xs opacity-40">Or use the tool below ↓</p>
        </div>
      </div>

      {/* Embedded tool */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <DashboardClient />
      </div>

      {/* Related comparisons */}
      {relatedComparisons.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">More Comparisons</h2>
          <RelatedLinks links={relatedComparisons} columns={2} />
        </section>
      )}

      <LandingFAQ faqs={comp.faqs} title="Frequently Asked Questions" />
    </>
  );
}
