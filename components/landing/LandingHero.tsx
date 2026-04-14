'use client';
import Link from 'next/link';
import {
  ArrowRight,
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
} from 'lucide-react';

const TOOL_TILES = [
  { href: '/circle-crop/jpeg', label: 'Circle Crop', icon: Circle,    color: '#06b6d4' },
  { href: '/compress',         label: 'Compressor',  icon: Minimize2,  color: '#ec4899' },
  { href: '/convert/jpeg',     label: 'Converter',   icon: RefreshCw,  color: '#8b5cf6' },
  { href: '/crop/jpeg',        label: 'Cropper',     icon: Crop,       color: '#f97316' },
  { href: '/remove-metadata/jpeg', label: 'EXIF Strip', icon: FileX,  color: '#f87171' },
  { href: '/filters/jpeg',     label: 'Filters',     icon: Sliders,    color: '#6366f1' },
  { href: '/image-to-pdf/jpeg', label: 'Image→PDF',  icon: FileText,  color: '#34d399' },
  { href: '/resize/jpeg',      label: 'Resizer',     icon: Scaling,    color: '#fbbf24' },
  { href: '/rotate/jpeg',      label: 'Rotate',      icon: RotateCw,   color: '#38bdf8' },
  { href: '/watermark/jpeg',   label: 'Watermark',   icon: Stamp,      color: '#a78bfa' },
];

export default function LandingHero() {
  return (
    <section
      aria-label="Hero section"
      className="pt-24 pb-16 px-6 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12"
    >
      {/* ── Left: Copy ─────────────────────────────────────────── */}
      <div className="flex-1 text-center lg:text-left flex flex-col justify-center order-2 lg:order-1">
        {/* Social proof */}
        <div className="inline-flex items-center gap-3 mb-6 self-center lg:self-start">
          {/* Stacked avatars */}
          <div className="flex items-center">
            {[
              { initials: 'AK', bg: '#ec4899' },
              { initials: 'JM', bg: '#8b5cf6' },
              { initials: 'TR', bg: '#06b6d4' },
              { initials: 'SL', bg: '#f97316' },
              { initials: 'NB', bg: '#10b981' },
              { initials: 'YO', bg: '#fbbf24' },
              { initials: 'CW', bg: '#38bdf8' },
            ].map(({ initials, bg }, i) => (
              <div
                key={initials}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{
                  background: bg,
                  border: '2px solid white',
                  marginLeft: i === 0 ? 0 : '-8px',
                  zIndex: i,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                }}
              >
                {initials}
              </div>
            ))}
          </div>

          {/* Stars + text */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="#fbbf24" aria-hidden="true">
                  <path d="M8 1l1.8 3.6L14 5.6l-3 2.9.7 4.1L8 10.5l-3.7 2.1.7-4.1-3-2.9 4.2-.6z" />
                </svg>
              ))}
              <span className="text-xs font-bold ml-1 text-gray-800 dark:text-gray-200">4.9</span>
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-none">Used in 87+ countries</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
          Compress Images.
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4)' }}
          >
            Send Them Sharp.
          </span>
        </h1>

        <p className="text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-gray-600 dark:text-gray-400">
          Every time you hit send on Telegram, WhatsApp, or Discord — your photo gets blurry. ImageSmith compresses it first so it arrives sharp.{' '}
          <span className="text-gray-400 dark:text-gray-500">Free. No account. No ads.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
          <Link
            href="/compress-images-for/telegram"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            aria-label="Compress images for Telegram"
          >
            Compress for Telegram <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <a
            href="#tools"
            className="w-full sm:w-auto inline-flex px-8 py-4 rounded-full font-bold text-base border transition-colors items-center justify-center gap-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 dark:border-white/20 dark:text-white/80 dark:hover:bg-white/5"
          >
            Browse All Tools ↓
          </a>
        </div>
      </div>

      {/* ── Right: Computer window ───────────────────────────────── */}
      <div className="flex-1 w-full order-1 lg:order-2 max-w-lg lg:max-w-none mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden shadow-xl"
          style={{
            border: '1px solid #e2e2ea',
            boxShadow: '0 8px 40px rgba(139,92,246,0.10), 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b"
            style={{ background: '#f5f5f8', borderColor: '#e2e2ea' }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <span className="font-mono text-xs text-black/30 mx-auto">imagesmith.store — toolkit</span>
          </div>

          {/* Window body */}
          <div className="p-6" style={{ background: '#ffffff' }}>
            {/* Grid header */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-[11px] font-semibold text-black/40 uppercase tracking-widest">Your tools</p>
              <span className="text-[11px] font-semibold" style={{ color: '#10b981' }}>● Free forever</span>
            </div>

            {/* Tool grid */}
            <div className="grid grid-cols-5 gap-2.5">
              {TOOL_TILES.map(({ href, label, icon: Icon, color }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 hover:scale-105"
                  style={{
                    background: `${color}12`,
                    border: `1px solid ${color}30`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}70`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px ${color}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <Icon
                    className="w-5 h-5 transition-all"
                    style={{ color }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-[9px] font-mono font-semibold text-center leading-tight opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ color }}
                  >
                    {label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div
              className="mt-6 pt-4 text-[10px] flex items-center justify-between"
              style={{ borderTop: '1px solid #e8e8ee' }}
            >
              <span className="text-black/40">10 free tools</span>
              <span style={{ color: '#10b981' }} className="font-semibold">No signup needed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
