import type { ImageFormat } from '../data/formats';
import type { Platform } from '../data/platforms';
import type { TargetSize } from '../data/sizes';
import type { ImageDimension } from '../data/dimensions';
import type { AspectRatio } from '../data/ratios';
import type { RotationOption } from '../data/rotations';
import type { ImageFilter } from '../data/imageFilters';

const SITE_URL = 'https://www.imagesmith.store';

// ── FORMAT HUB PAGES ──────────────────────────────────────────────────────────

export function generateFormatPageTitle(format: ImageFormat): string {
  return `Free ${format.label} Compressor Online — Reduce ${format.label} File Size | ImageSmith`;
}

export function generateFormatPageDescription(format: ImageFormat): string {
  return (
    `Free online ${format.label} compressor. Reduce ${format.extension} file size by up to 90% without visible quality loss. ` +
    `Best for ${format.bestFor.slice(0, 2).join(' and ')}. No ads, no uploads, 100% browser-based.`
  );
}

export function generateFormatH1(format: ImageFormat): string {
  return `Compress ${format.label} Images Online — Free & Ad-Free`;
}

export function generateFormatIntro(format: ImageFormat): string {
  return (
    `${format.description} ` +
    `ImageSmith's free ${format.label} compressor reduces file sizes by 60–90% using ` +
    `${format.lossless ? 'lossless' : 'advanced lossy'} compression, entirely in your browser. ` +
    `${format.compressionNote}`
  );
}

export function generateFormatFAQs(format: ImageFormat): Array<{ q: string; a: string }> {
  return [
    {
      q: `How do I compress a ${format.label} image online for free?`,
      a: `Upload your ${format.label} image to ImageSmith, set your target file size or quality percentage, and click Compress. ` +
         `Your compressed ${format.label} downloads instantly — no account, no watermark, no ads required.`,
    },
    {
      q: `Does compressing ${format.label} images reduce quality?`,
      a: format.lossless
        ? `${format.label} uses lossless compression — every pixel is preserved exactly. ` +
          `ImageSmith typically converts ${format.label} to WebP for significant size reduction without any quality loss whatsoever.`
        : `${format.label} is a lossy format. ImageSmith's quality slider lets you precisely control the quality-to-size trade-off. ` +
          `Quality settings of 75–85 are imperceptible to most viewers while reducing file size by 60–80%.`,
    },
    {
      q: `What is the best way to compress ${format.label} images?`,
      a: `${format.compressionNote} ` +
         `ImageSmith uses a binary search algorithm to automatically find the highest quality setting that achieves your target file size.`,
    },
    {
      q: `Is ${format.label} compression safe? Are my images uploaded anywhere?`,
      a: `Completely safe. ImageSmith runs entirely in your browser using the Canvas API. ` +
         `Your ${format.label} images never leave your device — zero server uploads.`,
    },
    {
      q: `Is there a file size limit for ${format.label} compression?`,
      a: `There is no file size limit. ImageSmith processes ${format.label} images of any size locally in your browser. ` +
         `Larger images may take slightly longer, but there is no upload size cap imposed by our servers.`,
    },
  ];
}

export function generateFormatBenefitsIntro(format: ImageFormat): string {
  return `Compressing ${format.label} images before uploading to your website, social media, or email significantly ` +
    `reduces bandwidth usage, improves page load speed, and lowers storage costs — ` +
    `without any visible reduction in image quality for your visitors.`;
}

// ── PLATFORM HUB PAGES ───────────────────────────────────────────────────────

export function generatePlatformPageTitle(platform: Platform): string {
  return `Compress Images for ${platform.displayName} — Free, Instant, No Uploads | ImageSmith`;
}

export function generatePlatformPageDescription(platform: Platform): string {
  return (
    `${platform.displayName} compresses and degrades images automatically — use ImageSmith first to stay in control. ` +
    `Free browser-based optimizer. Target: under ${platform.maxFileSizeKB.toLocaleString()}KB at ${platform.recommendedDimensions}. ` +
    `No signup, no watermarks, no ads.`
  );
}

export function generatePlatformH1(platform: Platform): string {
  return `Compress Images for ${platform.displayName} — Keep Quality, Beat the Limit`;
}

export function generatePlatformIntro(platform: Platform): string {
  return (
    `${platform.description} ` +
    `Use ImageSmith to compress your ${platform.displayName} images before sending — ` +
    `free, instant, and entirely in your browser. ` +
    `No account needed, no watermarks, no ads. ` +
    `Target under ${platform.maxFileSizeKB.toLocaleString()}KB for best results on ${platform.displayName}.`
  );
}

export function generatePlatformTipsSection(platform: Platform): string {
  return `Here are the key compression guidelines for ${platform.displayName}: ` +
    platform.compressionTips.map((tip, i) => `${i + 1}. ${tip}`).join(' ');
}

// ── SIZE SPOKE PAGES ─────────────────────────────────────────────────────────

export function generateSizePageTitle(format: ImageFormat, size: TargetSize): string {
  return `Compress ${format.label} to ${size.label} — Free Online Image Reducer | ImageSmith`;
}

export function generateSizePageDescription(format: ImageFormat, size: TargetSize): string {
  return (
    `Compress ${format.label} images to exactly ${size.label} file size. ` +
    `Free ${format.label}-to-${size.label} compression tool — ideal for ${size.useCases.slice(0, 2).join(' and ')}. ` +
    `Browser-based processing, no server uploads, no ads.`
  );
}

export function generateSizeH1(format: ImageFormat, size: TargetSize): string {
  return `Compress ${format.label} Images to ${size.label}`;
}

export function generateSizeIntro(format: ImageFormat, size: TargetSize): string {
  return (
    `Need to compress a ${format.label} image to exactly ${size.label}? ` +
    `ImageSmith's binary search algorithm automatically finds the highest quality setting ` +
    `that fits your ${size.label} file size target. ` +
    `${size.description}. ` +
    `This size is perfect for: ${size.useCases.join(', ')}.`
  );
}

export function generateSizeFAQs(format: ImageFormat, size: TargetSize): Array<{ q: string; a: string }> {
  return [
    {
      q: `How do I compress a ${format.label} image to ${size.label}?`,
      a: `Upload your ${format.label} image to ImageSmith, switch to "Size" mode, set the target to ${size.valueKB}KB, and click Compress. ` +
         `ImageSmith automatically finds the optimal quality setting to achieve ${size.label}.`,
    },
    {
      q: `Can I compress ${format.label} to exactly ${size.label}?`,
      a: `ImageSmith targets ${size.label} using binary search over quality settings. Results are typically within 5–10% of the target. ` +
         `The exact achievable size depends on image content — highly detailed images may not compress as far as simple graphics.`,
    },
    {
      q: `Why would I need a ${format.label} file at exactly ${size.label}?`,
      a: `${size.description}. Common use cases include: ${size.useCases.join(', ')}.`,
    },
    {
      q: `Is ${size.label} a good size for ${format.label} images?`,
      a: `${size.description}. For ${format.label} specifically, ` +
         (format.lossless
           ? `lossless compression means ${size.label} is achieved by converting to a more efficient format like WebP.`
           : `quality settings of 70–85 typically achieve ${size.label} for most standard photographs.`),
    },
  ];
}

// ── RESIZE TOOL PAGES ─────────────────────────────────────────────────────────

export function generateResizeFormatPageTitle(format: ImageFormat): string {
  return `Resize ${format.label} Images Online — Free ${format.label} Resizer | ImageSmith`;
}

export function generateResizeFormatPageDescription(format: ImageFormat): string {
  return (
    `Free online ${format.label} image resizer. Resize ${format.extension} images to any dimension — ` +
    `1080×1080, 1920×1080, custom sizes. No uploads, browser-based, no ads.`
  );
}

export function generateResizeFormatH1(format: ImageFormat): string {
  return `Resize ${format.label} Images Online — Free & Instant`;
}

export function generateResizeFormatIntro(format: ImageFormat): string {
  return (
    `Need to resize a ${format.label} image? ImageSmith lets you compress and optimize ${format.label} images ` +
    `to precise file size targets — perfect for any platform's dimension requirements. ` +
    `${format.description} ` +
    `Process your ${format.label} files entirely in the browser — no server uploads, completely private.`
  );
}

export function generateResizeFormatFAQs(format: ImageFormat): Array<{ q: string; a: string }> {
  return [
    {
      q: `How do I resize a ${format.label} image online for free?`,
      a: `Upload your ${format.label} image to ImageSmith and use the compression tool to reduce it to any target file size. ` +
         `The tool processes images entirely in your browser — no account or upload required.`,
    },
    {
      q: `What is the best size for ${format.label} images?`,
      a: `The ideal size depends on your use case. For web: under 200KB. For social media: under 1MB. For email: under 100KB. ` +
         `ImageSmith helps you hit any target size while maximizing ${format.label} quality.`,
    },
    {
      q: `Does resizing reduce ${format.label} image quality?`,
      a: `${format.lossless
        ? `${format.label} uses lossless compression — quality is fully preserved when targeting smaller file sizes.`
        : `ImageSmith optimizes quality settings to minimize visible quality loss during ${format.label} file size reduction.`}`,
    },
    {
      q: `What dimensions are best for ${format.label} images on social media?`,
      a: `For Instagram: 1080×1080 (square) or 1080×1350 (portrait). For Twitter: 1200×675. For Facebook: 1200×630. ` +
         `ImageSmith compresses ${format.label} images to the file sizes required by each platform.`,
    },
  ];
}

export function generateResizeDimensionPageTitle(format: ImageFormat, dim: ImageDimension): string {
  return `Resize ${format.label} to ${dim.label} — Free ${dim.name} ${format.label} Tool | ImageSmith`;
}

export function generateResizeDimensionPageDescription(format: ImageFormat, dim: ImageDimension): string {
  return (
    `Resize and optimize ${format.label} images for ${dim.label} (${dim.name}). ` +
    `Free browser-based tool — ideal for ${dim.useCases.slice(0, 2).join(' and ')}. ` +
    `No server uploads, no watermarks.`
  );
}

export function generateResizeDimensionH1(format: ImageFormat, dim: ImageDimension): string {
  return `Resize ${format.label} Images to ${dim.label} (${dim.name})`;
}

export function generateResizeDimensionIntro(format: ImageFormat, dim: ImageDimension): string {
  return (
    `${dim.description} ` +
    `When preparing ${format.label} images for ${dim.label} display, proper compression is essential — ` +
    `optimized files load faster, look sharper, and use less bandwidth. ` +
    `Use ImageSmith to compress your ${format.label} images to the ideal file size for ${dim.width}×${dim.height} display: ` +
    `${dim.useCases.join(', ')}.`
  );
}

export function generateResizeDimensionFAQs(format: ImageFormat, dim: ImageDimension): Array<{ q: string; a: string }> {
  return [
    {
      q: `What is the ideal file size for a ${format.label} image at ${dim.label}?`,
      a: `For ${dim.label} ${format.label} images, target under 200KB for web use, under 100KB for email, ` +
         `and under 500KB for high-quality photography. ImageSmith optimizes to any target size automatically.`,
    },
    {
      q: `What is ${dim.label} (${dim.name}) used for?`,
      a: `${dim.description} Common use cases: ${dim.useCases.join(', ')}.`,
    },
    {
      q: `How do I compress a ${format.label} image for ${dim.label} displays?`,
      a: `Upload your ${format.label} image to ImageSmith, set a target file size (e.g., 200KB for web use), and compress. ` +
         `The tool optimizes quality settings to deliver the best possible image at your target size.`,
    },
    {
      q: `What format is best alongside ${format.label} for ${dim.label} images?`,
      a: `${format.label} ${format.lossless ? 'offers lossless quality preservation' : 'provides excellent lossy compression'} at ${dim.label}. ` +
         `WebP is also a strong alternative — 25–35% smaller than JPEG at equivalent visual quality.`,
    },
  ];
}

// ── CONVERT TOOL PAGES ────────────────────────────────────────────────────────

export function generateConvertFormatPageTitle(fromFormat: ImageFormat): string {
  return `Convert ${fromFormat.label} Images Online — Free ${fromFormat.label} Converter | ImageSmith`;
}

export function generateConvertFormatPageDescription(fromFormat: ImageFormat): string {
  return (
    `Convert ${fromFormat.label} images to WebP, JPEG, PNG, and more. ` +
    `Free online ${fromFormat.label} converter — browser-based, no uploads, no ads. ` +
    `Reduce file size up to 90% during conversion.`
  );
}

export function generateConvertFormatH1(fromFormat: ImageFormat): string {
  return `Convert ${fromFormat.label} to Any Format — Free Online Converter`;
}

export function generateConvertFormatIntro(fromFormat: ImageFormat): string {
  return (
    `${fromFormat.description} ` +
    `ImageSmith converts ${fromFormat.label} images to any web format including WebP, JPEG, PNG, and AVIF ` +
    `directly in your browser — no server uploads, no accounts, completely private. ` +
    `Converting ${fromFormat.label} to a more efficient format can reduce file size by up to 90%.`
  );
}

export function generateConvertPairPageTitle(fromFormat: ImageFormat, toFormat: ImageFormat): string {
  return `Convert ${fromFormat.label} to ${toFormat.label} Online — Free & Instant | ImageSmith`;
}

export function generateConvertPairPageDescription(fromFormat: ImageFormat, toFormat: ImageFormat): string {
  return (
    `Convert ${fromFormat.label} to ${toFormat.label} free online. ` +
    `Batch convert ${fromFormat.extension} files to ${toFormat.extension} in your browser — ` +
    `no uploads, no sign-up, no ads. Instant ${fromFormat.label}→${toFormat.label} conversion.`
  );
}

export function generateConvertPairH1(fromFormat: ImageFormat, toFormat: ImageFormat): string {
  return `Convert ${fromFormat.label} to ${toFormat.label} — Free Online`;
}

export function generateConvertPairIntro(fromFormat: ImageFormat, toFormat: ImageFormat): string {
  return (
    `Converting ${fromFormat.label} to ${toFormat.label} is one of the most effective ways to optimize your images. ` +
    `${toFormat.description} ` +
    `ImageSmith handles the conversion entirely in your browser — compress and convert your ` +
    `${fromFormat.label} files to ${toFormat.label} in seconds, with no quality loss.`
  );
}

export function generateConvertPairFAQs(fromFormat: ImageFormat, toFormat: ImageFormat): Array<{ q: string; a: string }> {
  return [
    {
      q: `How do I convert ${fromFormat.label} to ${toFormat.label} for free?`,
      a: `Upload your ${fromFormat.label} image to ImageSmith and compress/optimize it. ` +
         `The tool processes images using browser Canvas API — free, private, and instant.`,
    },
    {
      q: `Why convert ${fromFormat.label} to ${toFormat.label}?`,
      a: `${toFormat.description} ` +
         `Converting from ${fromFormat.label} to ${toFormat.label} can reduce file sizes significantly ` +
         `while ${toFormat.lossless ? 'preserving every pixel of quality.' : 'maintaining excellent visual quality.'}`,
    },
    {
      q: `Does converting ${fromFormat.label} to ${toFormat.label} lose quality?`,
      a: `${toFormat.lossless
        ? `${toFormat.label} is lossless — converting to it preserves full image quality.`
        : `${toFormat.label} is a lossy format, but at quality 80+ the difference from the original is imperceptible for most images.`}`,
    },
    {
      q: `What is the size difference between ${fromFormat.label} and ${toFormat.label}?`,
      a: `File sizes vary by image content. WebP is typically 25–35% smaller than JPEG. ` +
         `AVIF can be 50% smaller than JPEG. PNG is lossless and typically larger than JPEG for photographs.`,
    },
  ];
}

// ── CROP TOOL PAGES ───────────────────────────────────────────────────────────

export function generateCropFormatPageTitle(format: ImageFormat): string {
  return `Crop ${format.label} Images Online — Free ${format.label} Crop Tool | ImageSmith`;
}

export function generateCropFormatPageDescription(format: ImageFormat): string {
  return (
    `Free online ${format.label} image crop tool. Crop ${format.extension} images to any aspect ratio — ` +
    `1:1, 16:9, 4:5, custom. No uploads, browser-based, instant download.`
  );
}

export function generateCropFormatH1(format: ImageFormat): string {
  return `Crop ${format.label} Images Online — Free & Instant`;
}

export function generateCropFormatIntro(format: ImageFormat): string {
  return (
    `Cropping ${format.label} images to the right aspect ratio is essential for social media, print, ` +
    `and web publishing. ${format.description} ` +
    `ImageSmith optimizes your ${format.label} images to the exact file sizes required for any aspect ratio — ` +
    `process everything directly in your browser without any uploads.`
  );
}

export function generateCropRatioPageTitle(format: ImageFormat, ratio: AspectRatio): string {
  return `Crop ${format.label} to ${ratio.label} (${ratio.name}) — Free Online Tool | ImageSmith`;
}

export function generateCropRatioPageDescription(format: ImageFormat, ratio: AspectRatio): string {
  return (
    `Crop ${format.label} images to ${ratio.label} ${ratio.name} ratio online. ` +
    `Free browser-based tool — perfect for ${ratio.useCases.slice(0, 2).join(' and ')}. ` +
    `No server uploads. Optimize and download instantly.`
  );
}

export function generateCropRatioH1(format: ImageFormat, ratio: AspectRatio): string {
  return `Crop ${format.label} Images to ${ratio.label} (${ratio.name})`;
}

export function generateCropRatioIntro(format: ImageFormat, ratio: AspectRatio): string {
  return (
    `The ${ratio.label} ${ratio.name} ratio is used for: ${ratio.useCases.join(', ')}. ` +
    `${ratio.description} ` +
    `When preparing ${format.label} images in ${ratio.label} format, optimize file size alongside the crop — ` +
    `ImageSmith compresses your ${format.label} to the perfect size for any platform. ` +
    `Common ${ratio.label} dimensions: ${ratio.exampleDimensions}.`
  );
}

export function generateCropRatioFAQs(format: ImageFormat, ratio: AspectRatio): Array<{ q: string; a: string }> {
  return [
    {
      q: `What is the ${ratio.label} aspect ratio used for?`,
      a: `${ratio.description} Common use cases include: ${ratio.useCases.join(', ')}.`,
    },
    {
      q: `What pixel dimensions should a ${format.label} image be at ${ratio.label} ratio?`,
      a: `Common ${ratio.label} dimensions include: ${ratio.exampleDimensions}. ` +
         `Choose the size that matches your target platform's requirements.`,
    },
    {
      q: `How do I optimize a ${format.label} image in ${ratio.label} format?`,
      a: `Upload your ${format.label} image to ImageSmith and set a target file size. ` +
         `The tool compresses to any size while maximizing quality — browser-only, no uploads.`,
    },
    {
      q: `What format is best for ${ratio.label} ${format.label} images?`,
      a: `${format.label} ${format.lossless ? 'is lossless and great for graphics.' : 'works well for photographs.'} ` +
         `WebP is often 25–35% smaller for the same ${ratio.label} image content.`,
    },
  ];
}

// ── WATERMARK TOOL PAGES ──────────────────────────────────────────────────────

export function generateWatermarkFormatPageTitle(format: ImageFormat): string {
  return `Watermark ${format.label} Images Online — Free Tool | ImageSmith`;
}

export function generateWatermarkFormatPageDescription(format: ImageFormat): string {
  return (
    `Add a watermark to ${format.label} images online — free browser-based tool. ` +
    `Protect your ${format.extension} files and compress them in one step. No uploads, no ads.`
  );
}

export function generateWatermarkFormatH1(format: ImageFormat): string {
  return `Watermark & Protect ${format.label} Images — Free Online`;
}

export function generateWatermarkFormatIntro(format: ImageFormat): string {
  return (
    `Protecting your ${format.label} images with a watermark prevents unauthorized use and ensures proper attribution. ` +
    `${format.description} ` +
    `ImageSmith lets you compress and optimize ${format.label} images for the web, ` +
    `making them ready for sharing while keeping file sizes small. ` +
    `All processing happens in your browser — your ${format.label} files are never uploaded.`
  );
}

export function generateWatermarkFAQs(format: ImageFormat): Array<{ q: string; a: string }> {
  return [
    {
      q: `How do I add a watermark to a ${format.label} image?`,
      a: `ImageSmith focuses on compression and optimization. To add watermarks, you can use tools like Canva or Adobe Express alongside ImageSmith for compression. ` +
         `Compress your ${format.label} first with ImageSmith, then add your watermark before final publishing.`,
    },
    {
      q: `What size should watermarked ${format.label} images be?`,
      a: `Watermarked images for social media should be under 1MB. For web use, target under 200KB. ` +
         `ImageSmith compresses ${format.label} images to any target size while preserving watermark visibility.`,
    },
    {
      q: `Does watermarking affect ${format.label} file size?`,
      a: `Adding watermarks to ${format.label} images slightly increases file size due to the additional pixels. ` +
         `After watermarking, use ImageSmith to re-compress to your target file size for optimal distribution.`,
    },
    {
      q: `What format is best for watermarked images?`,
      a: `PNG is best for watermarked images that need transparency. JPEG works well for photographs with text watermarks. ` +
         `WebP offers 25–35% smaller files and supports both transparent and opaque watermarks.`,
    },
  ];
}

// ── REMOVE METADATA TOOL PAGES ────────────────────────────────────────────────

export function generateRemoveMetadataFormatPageTitle(format: ImageFormat): string {
  return `Remove Metadata from ${format.label} Images — Free EXIF Remover | ImageSmith`;
}

export function generateRemoveMetadataFormatPageDescription(format: ImageFormat): string {
  return (
    `Remove EXIF data and metadata from ${format.label} images online. ` +
    `Strip GPS location, camera info, and personal data from ${format.extension} files — ` +
    `free, browser-based, private. No uploads.`
  );
}

export function generateRemoveMetadataFormatH1(format: ImageFormat): string {
  return `Remove EXIF Metadata from ${format.label} Images — Free & Private`;
}

export function generateRemoveMetadataFormatIntro(format: ImageFormat): string {
  return (
    `${format.label} images often contain hidden EXIF metadata — including GPS location, device information, ` +
    `camera settings, and personal timestamps. Sharing images without stripping this metadata can unintentionally ` +
    `reveal private information. ` +
    `ImageSmith processes your ${format.label} images entirely in the browser using the Canvas API, ` +
    `which naturally strips EXIF metadata during compression — keeping your images and privacy fully protected.`
  );
}

export function generateRemoveMetadataFAQs(format: ImageFormat): Array<{ q: string; a: string }> {
  return [
    {
      q: `Does ${format.label} contain EXIF metadata?`,
      a: `${format.label === 'JPEG' || format.label === 'HEIC' || format.label === 'TIFF'
        ? `Yes — ${format.label} images commonly embed EXIF data including GPS coordinates, camera model, lens info, date taken, and copyright information.`
        : `${format.label} images can contain metadata, though the exact fields vary by application. EXIF is most commonly embedded in JPEG and TIFF files.`}`,
    },
    {
      q: `How do I remove EXIF data from ${format.label} images?`,
      a: `ImageSmith removes EXIF metadata automatically during compression — the Canvas API used for processing strips all embedded metadata. ` +
         `Upload your ${format.label} file, compress it, and the downloaded file will have no EXIF data.`,
    },
    {
      q: `Why should I remove metadata from ${format.label} images?`,
      a: `EXIF data in ${format.label} images can reveal your exact GPS location, the device you used, and when the photo was taken. ` +
         `Remove metadata before sharing images publicly to protect your privacy.`,
    },
    {
      q: `Does removing metadata reduce ${format.label} image quality?`,
      a: `No — removing EXIF metadata has zero impact on visual image quality. ` +
         `Metadata is stored separately from pixel data in ${format.label} files. ` +
         `Stripping it only makes the file slightly smaller.`,
    },
    {
      q: `Is it safe to strip metadata from ${format.label} images in a browser?`,
      a: `Yes — ImageSmith processes ${format.label} images entirely in your browser. ` +
         `Your files are never sent to any server. The Canvas API naturally strips metadata during re-encoding.`,
    },
  ];
}

// ── COMPRESS FORMAT × PLATFORM PAGES ─────────────────────────────────────────

export function generateFormatPlatformPageTitle(format: ImageFormat, platform: Platform): string {
  return `Compress ${format.label} for ${platform.displayName} — Free Optimizer | ImageSmith`;
}

export function generateFormatPlatformPageDescription(format: ImageFormat, platform: Platform): string {
  return (
    `Compress ${format.label} images for ${platform.displayName} in seconds. ` +
    `Recommended size: ${platform.recommendedDimensions}. ` +
    `Free browser-based ${format.label} compressor — no uploads, no ads.`
  );
}

export function generateFormatPlatformH1(format: ImageFormat, platform: Platform): string {
  return `Compress ${format.label} Images for ${platform.displayName}`;
}

export function generateFormatPlatformIntro(format: ImageFormat, platform: Platform): string {
  return (
    `${platform.description} ` +
    `${format.description} ` +
    `Use ImageSmith to compress your ${format.label} images to the ideal file size for ${platform.displayName} — ` +
    `target under ${platform.maxFileSizeKB.toLocaleString()}KB for optimal performance. ` +
    `Processing is fully browser-based — no server uploads, no privacy risk.`
  );
}

export function generateFormatPlatformFAQs(format: ImageFormat, platform: Platform): Array<{ q: string; a: string }> {
  return [
    {
      q: `What is the best ${format.label} file size for ${platform.displayName}?`,
      a: `${platform.displayName} works best with images under ${platform.maxFileSizeKB.toLocaleString()}KB. ` +
         `Recommended dimensions: ${platform.recommendedDimensions}. ` +
         `ImageSmith can compress ${format.label} images to any target size in seconds.`,
    },
    {
      q: `Is ${format.label} supported on ${platform.displayName}?`,
      a: `${platform.supportedFormats.includes(format.slug)
        ? `Yes — ${platform.displayName} supports ${format.label}. Recommended format: ${platform.recommendedFormat}.`
        : `${platform.displayName} primarily supports ${platform.supportedFormats.join(', ').toUpperCase()}. Converting to ${platform.recommendedFormat} is recommended for best compatibility.`}`,
    },
    {
      q: `How do I compress ${format.label} images for ${platform.displayName}?`,
      a: `Upload your ${format.label} image to ImageSmith, set a target size under ${platform.maxFileSizeKB.toLocaleString()}KB, and compress. ` +
         `${platform.compressionTips[0]}`,
    },
    ...platform.faqItems.slice(0, 2),
  ];
}

// ── INTERNAL LINKING HELPERS ─────────────────────────────────────────────────

export function getSizeSpokesForFormat(
  formatSlug: string,
  sizes: TargetSize[]
): Array<{ slug: string; label: string; href: string }> {
  return sizes.map((s) => ({
    slug: s.slug,
    label: s.label,
    href: `/compress/${formatSlug}/${s.slug}`,
  }));
}

export function getRelatedFormatLinks(
  currentSlug: string,
  formats: ImageFormat[],
  count = 4,
  prefix = 'Compress',
  hrefBase = '/compress'
): Array<{ label: string; href: string }> {
  return formats
    .filter((f) => f.slug !== currentSlug)
    .slice(0, count)
    .map((f) => ({
      label: `${prefix} ${f.label}`,
      href: `${hrefBase}/${f.slug}`,
    }));
}

export function getRelatedPlatformLinks(
  platforms: Platform[],
  count = 4
): Array<{ label: string; href: string }> {
  return platforms.slice(0, count).map((p) => ({
    label: `For ${p.displayName}`,
    href: `/compress-images-for/${p.slug}`,
  }));
}

export function getSiblingSpokes(
  formatSlug: string,
  currentSizeSlug: string,
  sizes: TargetSize[]
): Array<{ label: string; href: string }> {
  return sizes
    .filter((s) => s.slug !== currentSizeSlug)
    .map((s) => ({
      label: `To ${s.label}`,
      href: `/compress/${formatSlug}/${s.slug}`,
    }));
}

export function getResizeDimensionLinks(
  formatSlug: string,
  dimensions: ImageDimension[],
  count = 8
): Array<{ label: string; href: string }> {
  return dimensions.slice(0, count).map((d) => ({
    label: d.label,
    href: `/resize/${formatSlug}/${d.slug}`,
  }));
}

export function getConvertTargetLinks(
  fromSlug: string,
  formats: ImageFormat[],
  count = 6
): Array<{ label: string; href: string }> {
  return formats
    .filter((f) => f.slug !== fromSlug)
    .slice(0, count)
    .map((f) => ({
      label: `To ${f.label}`,
      href: `/convert/${fromSlug}/to/${f.slug}`,
    }));
}

export function getCropRatioLinks(
  formatSlug: string,
  ratios: AspectRatio[],
  count = 8
): Array<{ label: string; href: string }> {
  return ratios.slice(0, count).map((r) => ({
    label: `${r.label} ${r.name}`,
    href: `/crop/${formatSlug}/${r.slug}`,
  }));
}

export function buildCanonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// ── ROTATE PAGES ──────────────────────────────────────────────────────────────

export function generateRotateFormatPageTitle(format: ImageFormat): string {
  return `Rotate ${format.label} Online Free — Rotate & Flip ${format.label} Images | ImageSmith`;
}
export function generateRotateFormatPageDescription(format: ImageFormat): string {
  return `Rotate ${format.label} images 90°, 180°, 270° or flip horizontally and vertically — free, instant, no uploads required. Works entirely in your browser.`;
}
export function generateRotateFormatH1(format: ImageFormat): string {
  return `Rotate & Flip ${format.label} Images Online — Free`;
}
export function generateRotateFormatIntro(format: ImageFormat): string {
  return `Rotate ${format.label} images instantly in your browser with no quality loss. Supports 90°, 180°, 270° clockwise rotation plus horizontal and vertical flipping. No server uploads, no signup, completely free.`;
}
export function generateRotateFormatFAQs(format: ImageFormat): Array<{ q: string; a: string }> {
  return [
    { q: `How do I rotate a ${format.label} image online?`, a: `Upload your ${format.label} image to ImageSmith's rotate tool, click the rotation button (90°, 180°, or 270°), and download the result instantly. No account or signup required.` },
    { q: `Does rotating a ${format.label} image reduce quality?`, a: `No. ImageSmith re-renders the image on an HTML5 canvas at full resolution. The output is a fresh ${format.label} encode at 95% quality — visually lossless.` },
    { q: `Can I flip a ${format.label} image instead of rotating?`, a: `Yes. ImageSmith supports both horizontal flip (mirror left-right) and vertical flip (mirror top-bottom) in addition to rotation.` },
    { q: `Why is my ${format.label} photo showing sideways?`, a: `Most phone cameras embed orientation data (EXIF) that some apps ignore. Rotating the image and saving it overrides the EXIF, ensuring it displays correctly everywhere.` },
  ];
}
export function getRotationLinks(
  formatSlug: string,
  rotations: RotationOption[]
): Array<{ label: string; href: string }> {
  return rotations.map((r) => ({ label: r.name, href: `/rotate/${formatSlug}/${r.slug}` }));
}

export function generateRotationSpokePageTitle(format: ImageFormat, rotation: RotationOption): string {
  return `${rotation.name} ${format.label} Online Free | ImageSmith`;
}
export function generateRotationSpokePageDescription(format: ImageFormat, rotation: RotationOption): string {
  return `${rotation.name} your ${format.label} images instantly in the browser — free, no upload, no quality loss. ${rotation.description}`;
}
export function generateRotationSpokeH1(format: ImageFormat, rotation: RotationOption): string {
  return `${rotation.name} ${format.label} Images — Free Online Tool`;
}
export function generateRotationSpokeIntro(format: ImageFormat, rotation: RotationOption): string {
  return `${rotation.description} ImageSmith processes your ${format.label} image directly in your browser using the HTML5 Canvas API — no server uploads, no watermarks, zero cost.`;
}
export function generateRotationSpokeFAQs(format: ImageFormat, rotation: RotationOption): Array<{ q: string; a: string }> {
  return [
    { q: `How do I ${rotation.name.toLowerCase()} a ${format.label} image?`, a: `Upload your ${format.label} to ImageSmith, click "${rotation.name}", and download the result. It takes under 5 seconds, no account needed.` },
    { q: `Is there quality loss when I ${rotation.name.toLowerCase()} a ${format.label}?`, a: `Minimal. ImageSmith re-encodes at 95% quality. For PNG images, quality is fully lossless. For JPEG, the difference is imperceptible.` },
    { q: `What are common uses for ${rotation.name.toLowerCase()}?`, a: rotation.useCases.join(', ') + '.' },
  ];
}

// ── FILTER PAGES ──────────────────────────────────────────────────────────────

export function generateFilterFormatPageTitle(format: ImageFormat): string {
  return `${format.label} Image Filters Online Free — Grayscale, Sepia & More | ImageSmith`;
}
export function generateFilterFormatPageDescription(format: ImageFormat): string {
  return `Apply grayscale, sepia, blur, brightness, contrast, and invert filters to ${format.label} images — free, instant, entirely in your browser. No uploads, no ads.`;
}
export function generateFilterFormatH1(format: ImageFormat): string {
  return `Apply Filters to ${format.label} Images Online — Free`;
}
export function generateFilterFormatIntro(format: ImageFormat): string {
  return `Transform your ${format.label} images with professional-grade filters — grayscale, sepia, blur, brightness, contrast, and color inversion. Everything runs in your browser using the HTML5 Canvas API. No server uploads, no signup, 100% free.`;
}
export function generateFilterFormatFAQs(format: ImageFormat): Array<{ q: string; a: string }> {
  return [
    { q: `How do I apply a filter to a ${format.label} image?`, a: `Upload your ${format.label} to ImageSmith's filter tool, select a filter (grayscale, sepia, blur, etc.), adjust the intensity slider, and click Apply. Download your result instantly.` },
    { q: `Does applying a filter reduce ${format.label} image quality?`, a: `Filters are applied via the canvas API and re-encoded at 95% quality. The result is visually lossless for most filters. Blur intentionally softens the image as designed.` },
    { q: `Can I convert a ${format.label} to black and white?`, a: `Yes — use the Grayscale filter at 100% intensity to convert your ${format.label} image to black and white instantly.` },
    { q: `What is the sepia filter?`, a: `Sepia applies a warm brown tone reminiscent of vintage photography. It's popular for travel photos, portraits, and artistic social media content.` },
  ];
}
export function getFilterSpokeLinks(
  formatSlug: string,
  filters: ImageFilter[]
): Array<{ label: string; href: string }> {
  return filters.map((f) => ({ label: f.label, href: `/filters/${formatSlug}/${f.slug}` }));
}

export function generateFilterSpokePageTitle(format: ImageFormat, filter: ImageFilter): string {
  return `${filter.label} Filter for ${format.label} Online Free | ImageSmith`;
}
export function generateFilterSpokePageDescription(format: ImageFormat, filter: ImageFilter): string {
  return `Apply ${filter.label.toLowerCase()} filter to ${format.label} images online — ${filter.description.slice(0, 100)}. Free, instant, browser-based.`;
}
export function generateFilterSpokeH1(format: ImageFormat, filter: ImageFilter): string {
  return `${filter.label} ${format.label} Images Online — Free Filter Tool`;
}
export function generateFilterSpokeIntro(format: ImageFormat, filter: ImageFilter): string {
  return `${filter.description} Apply the ${filter.label.toLowerCase()} filter to your ${format.label} images in seconds — no server upload required, no watermarks, completely free.`;
}
export function generateFilterSpokeFAQs(format: ImageFormat, filter: ImageFilter): Array<{ q: string; a: string }> {
  return [
    { q: `How do I apply ${filter.label.toLowerCase()} to a ${format.label} image?`, a: `Upload your ${format.label} to ImageSmith, select the ${filter.label} filter, adjust the intensity, click Apply, and download. The whole process takes under 10 seconds.` },
    { q: `What is the ${filter.label.toLowerCase()} filter used for?`, a: filter.useCases.join(', ') + '.' },
    { q: `Is applying ${filter.label.toLowerCase()} to ${format.label} destructive?`, a: `The original file is never modified. ImageSmith processes a copy in your browser and gives you a new file to download.` },
  ];
}

// ── IMAGE TO PDF PAGES ────────────────────────────────────────────────────────

export function generateImageToPdfPageTitle(format: ImageFormat): string {
  return `Convert ${format.label} to PDF Online Free — ${format.label} to PDF | ImageSmith`;
}
export function generateImageToPdfPageDescription(format: ImageFormat): string {
  return `Convert ${format.label} images to PDF online for free — single or multiple images, browser-based, instant download. No server uploads, no signup.`;
}
export function generateImageToPdfH1(format: ImageFormat): string {
  return `Convert ${format.label} to PDF Online — Free & Instant`;
}
export function generateImageToPdfIntro(format: ImageFormat): string {
  return `Turn your ${format.label} images into a PDF document in seconds. Upload one or multiple ${format.label} files, arrange the order, and download a perfectly formatted PDF — all in your browser, no signup required.`;
}
export function generateImageToPdfFAQs(format: ImageFormat): Array<{ q: string; a: string }> {
  return [
    { q: `How do I convert ${format.label} to PDF?`, a: `Upload your ${format.label} images to ImageSmith's PDF converter, arrange them in the desired order, click Convert to PDF, and download your file instantly.` },
    { q: `Can I combine multiple ${format.label} images into one PDF?`, a: `Yes. ImageSmith's image-to-PDF tool supports multiple images — each image becomes a separate page in the PDF, sized to fit the image dimensions.` },
    { q: `Is my ${format.label} data uploaded to a server?`, a: `No. All conversion happens entirely in your browser using the jsPDF library. Your images never leave your device.` },
    { q: `What PDF quality will my ${format.label} images be?`, a: `The PDF embeds your ${format.label} images at their original resolution, so quality matches the source file exactly.` },
  ];
}

// ── CIRCLE CROP PAGES ─────────────────────────────────────────────────────────

export function generateCircleCropPageTitle(format: ImageFormat): string {
  return `Crop ${format.label} to Circle Online Free — Circle Image Crop | ImageSmith`;
}
export function generateCircleCropPageDescription(format: ImageFormat): string {
  return `Crop ${format.label} images into a circle online for free — perfect for profile pictures, avatars, and logos. Exports as transparent PNG. Browser-based, instant.`;
}
export function generateCircleCropH1(format: ImageFormat): string {
  return `Crop ${format.label} to Circle — Free Online Tool`;
}
export function generateCircleCropIntro(format: ImageFormat): string {
  return `Crop your ${format.label} image into a perfect circle for use as a profile picture, avatar, logo, or social media icon. The result is exported as a transparent PNG so it looks great on any background. Runs 100% in your browser — no upload, no watermark, no cost.`;
}
export function generateCircleCropFAQs(format: ImageFormat): Array<{ q: string; a: string }> {
  return [
    { q: `How do I crop a ${format.label} image into a circle?`, a: `Upload your ${format.label} to ImageSmith's circle crop tool and click "Crop to Circle". The image is centred, squared, then clipped to a perfect circle. Download the PNG instantly.` },
    { q: `Why does circle crop export as PNG instead of ${format.label}?`, a: `Circles have transparent corners. JPEG doesn't support transparency, so ImageSmith always exports a PNG to preserve the transparent background around the circle.` },
    { q: `What is circle crop used for?`, a: `Profile pictures on LinkedIn, Twitter, and Instagram; website avatars; team member photos; app icons; brand logos — any context where a circular image is required.` },
    { q: `Will the circle crop center my image?`, a: `Yes. ImageSmith crops to the largest centred square of your image, then clips it to a circle. This ensures balanced framing regardless of your original aspect ratio.` },
  ];
}

// ── A4 PRINT LAYOUT PAGES ──────────────────────────────────────────────────────

export function generateA4PrintPageTitle(format: ImageFormat): string {
  return `Fit ${format.label} to A4 Page Online Free — A4 Print Layout | ImageSmith`;
}
export function generateA4PrintPageDescription(format: ImageFormat): string {
  return `Place and resize a ${format.label} image on a virtual A4 canvas, then download a print-ready PNG or PDF. Drag to position, drag corners to resize. Browser-based, no upload, free.`;
}
export function generateA4PrintH1(format: ImageFormat): string {
  return `Fit ${format.label} to A4 — Free Online Print Layout Tool`;
}
export function generateA4PrintIntro(format: ImageFormat): string {
  return `Place your ${format.label} image onto a virtual A4 canvas and position it exactly where you want it before printing. Drag the image to move it, drag the corner handles to resize (aspect ratio is preserved), then download a print-ready PNG or PDF at 150 DPI — no bleed, no upload, no watermark.`;
}
export function generateA4PrintFAQs(format: ImageFormat): Array<{ q: string; a: string }> {
  return [
    { q: `How do I fit a ${format.label} photo on an A4 page?`, a: `Upload your ${format.label} to ImageSmith's A4 print layout tool. The image appears centred on a virtual A4 canvas. Drag it to reposition, drag the corner handles to resize, then click "Download PNG" or "Download PDF" to get a print-ready file.` },
    { q: `What resolution does the A4 download use?`, a: `The exported PNG and PDF are rendered at 150 DPI — 1240 × 1754 pixels — which is crisp for home and office printing. For professional print work (300 DPI) you may need further upscaling.` },
    { q: `Does the A4 layout tool change my original ${format.label} image?`, a: `No. ImageSmith only places your image on a white A4 canvas. Your original file is never modified, uploaded, or stored on any server.` },
    { q: `Can I download the A4 layout as a PDF?`, a: `Yes. Click "Download PDF" to get a portrait A4 PDF with your image positioned exactly as you set it. The PDF is generated entirely in your browser using jsPDF.` },
    { q: `Why use this instead of Word or Google Docs?`, a: `ImageSmith's A4 layout tool is instant — no software to install, no account needed, and you get a pixel-accurate PNG as well as a PDF. Ideal for quickly centering a photo before printing.` },
  ];
}
