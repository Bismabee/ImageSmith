import type { Metadata } from 'next';
import type { ImageFormat } from '../data/formats';
import type { Platform } from '../data/platforms';
import type { TargetSize } from '../data/sizes';
import type { ImageDimension } from '../data/dimensions';
import type { AspectRatio } from '../data/ratios';
import type { RotationOption } from '../data/rotations';
import type { ImageFilter } from '../data/imageFilters';
import {
  generateFormatPageTitle,
  generateFormatPageDescription,
  generatePlatformPageTitle,
  generatePlatformPageDescription,
  generateSizePageTitle,
  generateSizePageDescription,
  generateResizeFormatPageTitle,
  generateResizeFormatPageDescription,
  generateResizeDimensionPageTitle,
  generateResizeDimensionPageDescription,
  generateConvertFormatPageTitle,
  generateConvertFormatPageDescription,
  generateConvertPairPageTitle,
  generateConvertPairPageDescription,
  generateCropFormatPageTitle,
  generateCropFormatPageDescription,
  generateCropRatioPageTitle,
  generateCropRatioPageDescription,
  generateWatermarkFormatPageTitle,
  generateWatermarkFormatPageDescription,
  generateRemoveMetadataFormatPageTitle,
  generateRemoveMetadataFormatPageDescription,
  generateFormatPlatformPageTitle,
  generateFormatPlatformPageDescription,
  generateRotateFormatPageTitle,
  generateRotateFormatPageDescription,
  generateRotationSpokePageTitle,
  generateRotationSpokePageDescription,
  generateFilterFormatPageTitle,
  generateFilterFormatPageDescription,
  generateFilterSpokePageTitle,
  generateFilterSpokePageDescription,
  generateImageToPdfPageTitle,
  generateImageToPdfPageDescription,
  generateCircleCropPageTitle,
  generateCircleCropPageDescription,
  generateA4PrintPageTitle,
  generateA4PrintPageDescription,
} from '../content/generators';

const SITE_URL = 'https://www.imagesmith.store';
const SITE_NAME = 'ImageSmith';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;

function buildBaseMetadata(overrides: {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}): Metadata {
  const { title, description, canonical, ogImage = DEFAULT_OG_IMAGE } = overrides;
  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@imagesmith',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function buildHomeMetadata(): Metadata {
  return buildBaseMetadata({
    title: 'Compress Images for Telegram & Messaging Apps — Free | ImageSmith',
    description:
      'Stop sending blurry images. Compress for Telegram, WhatsApp & Discord in seconds — free, no signup, no ads. Your images never leave your browser.',
    canonical: SITE_URL,
    ogImage: `${SITE_URL}/og-image.svg`,
  });
}

export function buildCompressPageMetadata(): Metadata {
  return buildBaseMetadata({
    title: 'Compress Images Free — Bulk Image Compressor | ImageSmith',
    description:
      'Free bulk image compressor. Compress JPEG, PNG, WebP images directly in your browser — no uploads, no watermarks, no ads. Fast and private.',
    canonical: `${SITE_URL}/compress`,
  });
}

export function buildFormatMetadata(format: ImageFormat): Metadata {
  return buildBaseMetadata({
    title: generateFormatPageTitle(format),
    description: generateFormatPageDescription(format),
    canonical: `${SITE_URL}/compress/${format.slug}`,
  });
}

export function buildPlatformMetadata(platform: Platform): Metadata {
  return buildBaseMetadata({
    title: generatePlatformPageTitle(platform),
    description: generatePlatformPageDescription(platform),
    canonical: `${SITE_URL}/compress-images-for/${platform.slug}`,
  });
}

export function buildSizeMetadata(format: ImageFormat, size: TargetSize): Metadata {
  return buildBaseMetadata({
    title: generateSizePageTitle(format, size),
    description: generateSizePageDescription(format, size),
    canonical: `${SITE_URL}/compress/${format.slug}/${size.slug}`,
  });
}

export function buildGuideMetadata(opts: {
  title: string;
  description: string;
  slug: string;
}): Metadata {
  return buildBaseMetadata({
    title: opts.title,
    description: opts.description,
    canonical: `${SITE_URL}/how-to/${opts.slug}`,
  });
}

export function buildComparisonMetadata(opts: {
  title: string;
  description: string;
  slug: string;
}): Metadata {
  return buildBaseMetadata({
    title: opts.title,
    description: opts.description,
    canonical: `${SITE_URL}/compare/${opts.slug}`,
  });
}

export function buildBlogIndexMetadata(): Metadata {
  return buildBaseMetadata({
    title: 'Blog — Image Compression Guides & Tutorials | ImageSmith',
    description:
      'Guides and deep dives on image compression, format comparisons, and how to get the best quality on Telegram, WhatsApp, Discord, and more.',
    canonical: `${SITE_URL}/blog`,
  });
}

export function buildBlogPostMetadata(opts: {
  title: string;
  description: string;
  slug: string;
}): Metadata {
  return buildBaseMetadata({
    title: opts.title,
    description: opts.description,
    canonical: `${SITE_URL}/blog/${opts.slug}`,
  });
}

// ── RESIZE ────────────────────────────────────────────────────────────────────

export function buildResizeFormatMetadata(format: ImageFormat): Metadata {
  return buildBaseMetadata({
    title: generateResizeFormatPageTitle(format),
    description: generateResizeFormatPageDescription(format),
    canonical: `${SITE_URL}/resize/${format.slug}`,
  });
}

export function buildResizeDimensionMetadata(format: ImageFormat, dim: ImageDimension): Metadata {
  return buildBaseMetadata({
    title: generateResizeDimensionPageTitle(format, dim),
    description: generateResizeDimensionPageDescription(format, dim),
    canonical: `${SITE_URL}/resize/${format.slug}/${dim.slug}`,
  });
}

// ── CONVERT ───────────────────────────────────────────────────────────────────

export function buildConvertFormatMetadata(fromFormat: ImageFormat): Metadata {
  return buildBaseMetadata({
    title: generateConvertFormatPageTitle(fromFormat),
    description: generateConvertFormatPageDescription(fromFormat),
    canonical: `${SITE_URL}/convert/${fromFormat.slug}`,
  });
}

export function buildConvertPairMetadata(fromFormat: ImageFormat, toFormat: ImageFormat): Metadata {
  return buildBaseMetadata({
    title: generateConvertPairPageTitle(fromFormat, toFormat),
    description: generateConvertPairPageDescription(fromFormat, toFormat),
    canonical: `${SITE_URL}/convert/${fromFormat.slug}/to/${toFormat.slug}`,
  });
}

// ── CROP ──────────────────────────────────────────────────────────────────────

export function buildCropFormatMetadata(format: ImageFormat): Metadata {
  return buildBaseMetadata({
    title: generateCropFormatPageTitle(format),
    description: generateCropFormatPageDescription(format),
    canonical: `${SITE_URL}/crop/${format.slug}`,
  });
}

export function buildCropRatioMetadata(format: ImageFormat, ratio: AspectRatio): Metadata {
  return buildBaseMetadata({
    title: generateCropRatioPageTitle(format, ratio),
    description: generateCropRatioPageDescription(format, ratio),
    canonical: `${SITE_URL}/crop/${format.slug}/${ratio.slug}`,
  });
}

// ── WATERMARK ─────────────────────────────────────────────────────────────────

export function buildWatermarkFormatMetadata(format: ImageFormat): Metadata {
  return buildBaseMetadata({
    title: generateWatermarkFormatPageTitle(format),
    description: generateWatermarkFormatPageDescription(format),
    canonical: `${SITE_URL}/watermark/${format.slug}`,
  });
}

// ── REMOVE METADATA ───────────────────────────────────────────────────────────

export function buildRemoveMetadataFormatMetadata(format: ImageFormat): Metadata {
  return buildBaseMetadata({
    title: generateRemoveMetadataFormatPageTitle(format),
    description: generateRemoveMetadataFormatPageDescription(format),
    canonical: `${SITE_URL}/remove-metadata/${format.slug}`,
  });
}

// ── FORMAT × PLATFORM ─────────────────────────────────────────────────────────

export function buildFormatPlatformMetadata(format: ImageFormat, platform: Platform): Metadata {
  return buildBaseMetadata({
    title: generateFormatPlatformPageTitle(format, platform),
    description: generateFormatPlatformPageDescription(format, platform),
    canonical: `${SITE_URL}/compress/${format.slug}/for/${platform.slug}`,
  });
}

// ── ROTATE ────────────────────────────────────────────────────────────────────

export function buildRotateFormatMetadata(format: ImageFormat): Metadata {
  return buildBaseMetadata({
    title: generateRotateFormatPageTitle(format),
    description: generateRotateFormatPageDescription(format),
    canonical: `${SITE_URL}/rotate/${format.slug}`,
  });
}

export function buildRotationSpokeMetadata(format: ImageFormat, rotation: RotationOption): Metadata {
  return buildBaseMetadata({
    title: generateRotationSpokePageTitle(format, rotation),
    description: generateRotationSpokePageDescription(format, rotation),
    canonical: `${SITE_URL}/rotate/${format.slug}/${rotation.slug}`,
  });
}

// ── FILTERS ───────────────────────────────────────────────────────────────────

export function buildFilterFormatMetadata(format: ImageFormat): Metadata {
  return buildBaseMetadata({
    title: generateFilterFormatPageTitle(format),
    description: generateFilterFormatPageDescription(format),
    canonical: `${SITE_URL}/filters/${format.slug}`,
  });
}

export function buildFilterSpokeMetadata(format: ImageFormat, filter: ImageFilter): Metadata {
  return buildBaseMetadata({
    title: generateFilterSpokePageTitle(format, filter),
    description: generateFilterSpokePageDescription(format, filter),
    canonical: `${SITE_URL}/filters/${format.slug}/${filter.slug}`,
  });
}

// ── IMAGE TO PDF ──────────────────────────────────────────────────────────────

export function buildImageToPdfMetadata(format: ImageFormat): Metadata {
  return buildBaseMetadata({
    title: generateImageToPdfPageTitle(format),
    description: generateImageToPdfPageDescription(format),
    canonical: `${SITE_URL}/image-to-pdf/${format.slug}`,
  });
}

// ── CIRCLE CROP ───────────────────────────────────────────────────────────────

export function buildCircleCropMetadata(format: ImageFormat): Metadata {
  return buildBaseMetadata({
    title: generateCircleCropPageTitle(format),
    description: generateCircleCropPageDescription(format),
    canonical: `${SITE_URL}/circle-crop/${format.slug}`,
  });
}

// ── A4 PRINT LAYOUT ───────────────────────────────────────────────────────────

export function buildA4PrintMetadata(format: ImageFormat): Metadata {
  return buildBaseMetadata({
    title: generateA4PrintPageTitle(format),
    description: generateA4PrintPageDescription(format),
    canonical: `${SITE_URL}/a4-print/${format.slug}`,
  });
}

export { buildBaseMetadata };
