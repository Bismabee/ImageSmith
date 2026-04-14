'use client';
import Link from 'next/link';
import {
  Circle,
  Minimize2,
  RefreshCw,
  Crop,
  FileX,
  Sliders,
  FileText,
  Scaling,
  RotateCw,
  Stamp,
  Printer,
  ArrowRight,
} from 'lucide-react';

const TOOLS = [
  {
    href: '/circle-crop/jpeg',
    label: 'Circle Crop',
    icon: Circle,
    color: '#06b6d4',
    desc: 'Crop any image to a perfect circle. Ideal for profile photos and avatars.',
    badge: 'PNG output',
  },
  {
    href: '/compress',
    label: 'Compressor',
    icon: Minimize2,
    color: '#ec4899',
    desc: 'Shrink file size by up to 90% without visible quality loss. Supports batch processing.',
    badge: 'Batch ready',
  },
  {
    href: '/convert/jpeg',
    label: 'Converter',
    icon: RefreshCw,
    color: '#8b5cf6',
    desc: 'Convert between JPEG, PNG, WebP, GIF, AVIF, HEIC, BMP, and TIFF in one click.',
    badge: '8 formats',
  },
  {
    href: '/crop/jpeg',
    label: 'Cropper',
    icon: Crop,
    color: '#f97316',
    desc: 'Crop to exact aspect ratios — 1:1, 16:9, 4:3, and more — or enter custom dimensions.',
    badge: 'Custom ratios',
  },
  {
    href: '/remove-metadata/jpeg',
    label: 'EXIF Strip',
    icon: FileX,
    color: '#f87171',
    desc: 'Erase hidden metadata including GPS coordinates, camera model, and timestamps.',
    badge: 'Privacy tool',
  },
  {
    href: '/filters/jpeg',
    label: 'Filters',
    icon: Sliders,
    color: '#6366f1',
    desc: 'Apply grayscale, sepia, blur, brightness, contrast, and invert effects with a slider.',
    badge: '6 filters',
  },
  {
    href: '/image-to-pdf/jpeg',
    label: 'Image → PDF',
    icon: FileText,
    color: '#34d399',
    desc: 'Combine one or more images into a multi-page PDF. Each page auto-sizes to the image.',
    badge: 'Multi-page',
  },
  {
    href: '/resize/jpeg',
    label: 'Resizer',
    icon: Scaling,
    color: '#fbbf24',
    desc: 'Resize to exact pixel dimensions or choose a preset like 1080p, 4K, or thumbnail.',
    badge: 'Preset sizes',
  },
  {
    href: '/rotate/jpeg',
    label: 'Rotate & Flip',
    icon: RotateCw,
    color: '#38bdf8',
    desc: 'Rotate 90°, 180°, or 270°. Flip horizontally or vertically — no re-upload needed.',
    badge: '5 transforms',
  },
  {
    href: '/watermark/jpeg',
    label: 'Watermark',
    icon: Stamp,
    color: '#a78bfa',
    desc: 'Stamp text or image watermarks at any position, opacity, and size to protect your work.',
    badge: 'Custom text',
  },
  {
    href: '/a4-print/jpeg',
    label: 'A4 Print Layout',
    icon: Printer,
    color: '#f59e0b',
    desc: 'Place any image on a virtual A4 canvas. Drag to position, resize with corner handles, download print-ready PNG or PDF.',
    badge: 'Print ready',
  },
];

export default function ToolsShowcase() {
  return (
    <section id="tools" className="py-20 px-6 max-w-6xl mx-auto" aria-label="All tools">
      {/* Section header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          Everything you need,{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4)' }}
          >
            already here.
          </span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl text-sm">
          10 free image tools. Pick the one you need, use it, done. No account required.
        </p>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map(({ href, label, icon: Icon, color, desc, badge }) => (
          <Link
            key={href}
            href={href}
            className="group relative flex flex-col gap-4 p-5 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
            style={{
              background: `${color}08`,
              border: `1px solid ${color}20`,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = `${color}50`;
              el.style.boxShadow = `0 0 24px ${color}25`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = `${color}20`;
              el.style.boxShadow = 'none';
            }}
          >
            {/* Icon + badge row */}
            <div className="flex items-start justify-between">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}
              >
                <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
              </div>
              <span
                className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
              >
                {badge}
              </span>
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="font-bold text-sm mb-1">{label}</p>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">{desc}</p>
            </div>

            {/* CTA */}
            <div
              className="flex items-center gap-1 text-xs font-semibold mt-1 opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ color }}
            >
              Use free <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
