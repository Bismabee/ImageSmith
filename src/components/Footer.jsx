import React from 'react';
import { Sparkles, Github, Twitter, Heart } from 'lucide-react';

const Footer = ({ isDarkMode }) => (
  <footer className={`w-full backdrop-blur-md border-t pt-16 pb-20 transition-colors duration-300 mt-20 ${isDarkMode ? 'bg-black/40 border-white/10 text-gray-300' : 'bg-white/60 border-gray-200 text-gray-600'}`}>
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gradient-to-tr from-pink-500 to-violet-500 p-1.5 rounded-lg"><Sparkles className="text-white w-4 h-4" /></div>
          <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>ImageSmith</span>
        </div>
        <p className="text-sm leading-relaxed mb-4 opacity-80">Privacy-first compression for modern creators.</p>
        <div className="flex gap-4"><a href="#" className="hover:text-pink-500 transition-colors"><Github className="w-5 h-5" /></a><a href="https://x.com/shakirdmr" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors"><Twitter className="w-5 h-5" /></a></div>
      </div>
      <div><h3 className="font-bold mb-4">Product</h3><ul className="space-y-2 text-sm opacity-80"><li>Features</li><li>Pricing</li><li>God Mode</li></ul></div>
      <div><h3 className="font-bold mb-4">Legal</h3><ul className="space-y-2 text-sm opacity-80"><li>Privacy</li><li>Terms</li><li>Refunds</li></ul></div>
    </div>
    <div className={`max-w-6xl mx-auto px-6 pt-8 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'} flex justify-between items-center gap-4 text-sm`}>
      <p>© 2024 ImageSmith.</p>
      <div className="flex items-center gap-4">
        <p className="flex items-center gap-1.5 font-medium opacity-90">Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by <a href="https://x.com/shakirdmr" target="_blank" rel="noopener noreferrer" className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 hover:opacity-80">@shakirdmr</a></p>
        <div className="flex items-center gap-3">
          <span className="text-sm opacity-90">Enjoying ImageSmith?</span>
          <a href="https://x.com/shakirdmr" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-full bg-pink-500 text-white font-semibold hover:opacity-90 text-sm">Say Thanks</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;