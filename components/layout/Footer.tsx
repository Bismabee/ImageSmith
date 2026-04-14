'use client';

import Link from 'next/link';
import { Sparkles, Github, Twitter, Heart } from 'lucide-react';
import { useAppContext } from '@/providers/AppProvider';
import { trackEvent } from '@/lib/utils/ga4';

export default function Footer() {
  const { isDarkMode } = useAppContext();

  return (
    <footer
      className={`w-full backdrop-blur-md border-t pt-16 pb-20 transition-colors duration-300 mt-20 ${
        isDarkMode ? 'bg-black/40 border-white/10 text-gray-300' : 'bg-white/60 border-gray-200 text-gray-600'
      }`}
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-tr from-pink-500 to-violet-500 p-1.5 rounded-lg">
              <Sparkles className="text-white w-4 h-4" aria-hidden="true" />
            </div>
            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ImageSmith
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-4 opacity-80">
            Free image compression tool with no ads. Privacy-first bulk image compressor for modern creators.
          </p>
          <div className="flex gap-4" role="list" aria-label="Social media links">
            <a href="#" className="hover:text-pink-500 transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="https://x.com/shakirdmr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
              aria-label="Twitter/X"
            >
              <Twitter className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Product links">
          <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Product</h3>
          <ul className="space-y-2 text-sm opacity-80" role="list">
            <li><Link href="/" className="hover:text-pink-500 transition-colors">Features</Link></li>
            <li><Link href="/#pricing" className="hover:text-pink-500 transition-colors">Pricing</Link></li>
            <li><Link href="/compress" className="hover:text-pink-500 transition-colors">Free Image Compressor</Link></li>
            <li><Link href="/compress-jpeg" className="hover:text-pink-500 transition-colors">Compress JPEG</Link></li>
            <li><Link href="/compress-png" className="hover:text-pink-500 transition-colors">Compress PNG</Link></li>
            <li><Link href="/compress-webp" className="hover:text-pink-500 transition-colors">Compress WebP</Link></li>
          </ul>
        </nav>

        <nav aria-label="Platform links">
          <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Platforms</h3>
          <ul className="space-y-2 text-sm opacity-80" role="list">
            <li><Link href="/compress-images-for-instagram" className="hover:text-pink-500 transition-colors">For Instagram</Link></li>
            <li><Link href="/compress-images-for-wordpress" className="hover:text-pink-500 transition-colors">For WordPress</Link></li>
            <li><Link href="/compress-images-for-shopify" className="hover:text-pink-500 transition-colors">For Shopify</Link></li>
            <li><Link href="/compress-images-for-web" className="hover:text-pink-500 transition-colors">For Web</Link></li>
            <li><Link href="/compress-images-for-email" className="hover:text-pink-500 transition-colors">For Email</Link></li>
          </ul>
        </nav>

        <nav aria-label="Guides links">
          <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Guides</h3>
          <ul className="space-y-2 text-sm opacity-80" role="list">
            <li><Link href="/blog" className="hover:text-pink-500 transition-colors font-medium">Blog</Link></li>
            <li><Link href="/blog/how-to-compress-images-for-telegram" className="hover:text-pink-500 transition-colors">Compress for Telegram</Link></li>
            <li><Link href="/blog/why-messaging-apps-blur-your-photos" className="hover:text-pink-500 transition-colors">Why Apps Blur Photos</Link></li>
            <li><Link href="/compare/jpeg-vs-png" className="hover:text-pink-500 transition-colors">JPEG vs PNG</Link></li>
            <li><Link href="/compare/webp-vs-jpeg" className="hover:text-pink-500 transition-colors">WebP vs JPEG</Link></li>
          </ul>
        </nav>
      </div>

      <div
        className={`max-w-6xl mx-auto px-6 pt-8 border-t ${
          isDarkMode ? 'border-white/10' : 'border-gray-200'
        } flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm`}
      >
        <p>© {new Date().getFullYear()} ImageSmith.</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <p className="flex items-center gap-1.5 font-medium opacity-90">
            Made with{' '}
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by{' '}
            <a
              href="https://x.com/shakirdmr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 hover:opacity-80"
            >
              @shakirdmr
            </a>
          </p>
          <a
            href="https://x.com/shakirdmr"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { try { trackEvent('say_thanks_click', { location: 'footer' }); } catch { /* ignore */ } }}
            className="px-3 py-2 rounded-full bg-pink-500 text-white font-semibold hover:opacity-90 text-sm"
          >
            Say Thanks
          </a>
        </div>
      </div>
    </footer>
  );
}
