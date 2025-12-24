import React from 'react';
import { Sparkles, Github, Twitter, Heart } from 'lucide-react';
import ga4 from '../utils/ga4.js';

const Footer = ({ isDarkMode }) => (
  <footer className={`w-full backdrop-blur-md border-t pt-16 pb-20 transition-colors duration-300 mt-20 ${isDarkMode ? 'bg-black/40 border-white/10 text-gray-300' : 'bg-white/60 border-gray-200 text-gray-600'}`} aria-label="Site footer">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-linear-to-tr from-pink-500 to-violet-500 p-1.5 rounded-lg"><Sparkles className="text-white w-4 h-4" aria-hidden="true" /></div>
          <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>ImageSmith</span>
        </div>
        <p className="text-sm leading-relaxed mb-4 opacity-80">Free image compression tool with no ads. Privacy-first bulk image compressor for modern creators.</p>
        <div className="flex gap-4" role="list" aria-label="Social media links"><a href="#" className="hover:text-pink-500 transition-colors" aria-label="GitHub"><Github className="w-5 h-5" aria-hidden="true" /></a><a href="https://x.com/shakirdmr" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors" aria-label="Twitter/X"><Twitter className="w-5 h-5" aria-hidden="true" /></a></div>
      </div>
      <nav aria-label="Product links"><h3 className="font-bold mb-4">Product</h3><ul className="space-y-2 text-sm opacity-80" role="list"><li>Features</li><li>Pricing</li><li>Free Image Compressor</li><li>Bulk Compression</li></ul></nav>
      <nav aria-label="Legal links"><h3 className="font-bold mb-4">Legal</h3><ul className="space-y-2 text-sm opacity-80" role="list"><li>Privacy</li><li>Terms</li><li>Refunds</li></ul></nav>
      <div><h3 className="font-bold mb-4">Keywords</h3><ul className="space-y-1 text-xs opacity-70" role="list"><li>Compress images online</li><li>Free image compression</li><li>Ad-free image compressor</li><li>Bulk image optimizer</li></ul></div>
    </div>
    <div className={`max-w-6xl mx-auto px-6 pt-8 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm`}>
      <p className="w-full sm:w-auto">© 2024 ImageSmith.</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
        <p className="w-full sm:w-auto flex items-center gap-1.5 font-medium opacity-90">Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by <a href="https://x.com/shakirdmr" target="_blank" rel="noopener noreferrer" className="font-bold bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-violet-500 hover:opacity-80">@shakirdmr</a></p>
        <div className="w-full sm:w-auto flex items-center justify-start sm:justify-center gap-3">
          <span className="hidden sm:inline text-sm opacity-90">Enjoying ImageSmith?</span>
          <a
            href="https://x.com/shakirdmr"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { try { ga4.trackEvent('say_thanks_click', { location: 'footer' }); } catch {} }}
            className="w-full sm:w-auto px-3 py-2 rounded-full bg-pink-500 text-white font-semibold hover:opacity-90 text-sm text-center"
          >
            Say Thanks
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;