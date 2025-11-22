import React, { useState } from 'react';
import { Zap, ArrowRight, Play, CheckCircle2, Crown, ImageIcon, X } from 'lucide-react';
import FAQItem from '../components/FAQitem.jsx';

const LandingPage = ({ setView, activateGodMode, isDarkMode, demoUrl = null }) => {
  const [showDemo, setShowDemo] = useState(false);

  const getEmbedUrl = (input) => {
    if (!input) return null;
    try {
      const asString = String(input).trim();
      // If user pasted full iframe embed code, extract the src attribute
      const iframeMatch = asString.match(/<iframe[^>]+src=["']([^"']+)["']/i);
      if (iframeMatch && iframeMatch[1]) {
        return iframeMatch[1];
      }

      // Otherwise treat as a normal URL and convert to an embed URL with sensible params
      const u = new URL(asString, window.location.href);
      let id = null;
      if (u.hostname === 'youtu.be') {
        id = u.pathname.slice(1);
      } else if (u.hostname.includes('youtube.com')) {
        // If it's already an /embed/ URL, preserve it but ensure params
        if (u.pathname.includes('/embed/')) {
          const params = new URLSearchParams(u.search);
          if (!params.has('autoplay')) params.set('autoplay', '1');
          if (!params.has('rel')) params.set('rel', '0');
          if (!params.has('modestbranding')) params.set('modestbranding', '1');
          if (!params.has('playsinline')) params.set('playsinline', '1');
          u.search = params.toString() ? `?${params.toString()}` : '';
          return u.toString();
        }
        id = u.searchParams.get('v');
        if (!id) {
          const parts = u.pathname.split('/').filter(Boolean);
          id = parts.pop();
        }
      }

      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1` : null;
    } catch (err) {
      return null;
    }
  };
  const embedUrl = getEmbedUrl(demoUrl);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
        <section className="pt-24 pb-16 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left flex flex-col justify-center order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold mb-6 border border-pink-500/20"><Zap className="w-3 h-3" /> V 2.0 NOW LIVE</div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">Bulk Compress.<br /><span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-violet-600">Zero Quality Loss.</span></h1>
          <p className={`text-lg mb-8 leading-relaxed max-w-xl mx-auto md:mx-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>The privacy-first bulk image compressor for pros. Drag & drop 50+ images and crush them in seconds using your own GPU.</p>
          <div className="hidden md:flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button onClick={() => setView('app')} className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 glow-cta">Start Now <ArrowRight className="w-5 h-5" /></button>
            <div className="flex items-center gap-3">
              <a href={demoUrl || '/'} target="_blank" rel="noopener noreferrer" className={`w-full sm:w-auto inline-flex px-8 py-4 rounded-full font-bold text-lg border transition-all items-center justify-center gap-2 ${isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'}`}>
                <Play className="w-4 h-4 fill-current" /> Watch Demo
              </a>
            </div>
          </div>
        </div>
          <div className="flex-1 w-full relative group order-1 md:order-2">
            <div className="absolute -inset-1 bg-linear-to-r from-pink-500 to-violet-500 rounded-4xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className={`relative rounded-4xl p-4 border flex flex-col gap-4 overflow-hidden min-h-[300px] ${isDarkMode ? 'bg-[#1a1a2e] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className={`h-8 w-full rounded-full flex items-center px-4 gap-2 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
              <div className="w-2 h-2 rounded-full bg-red-500"/>
              <div className="w-2 h-2 rounded-full bg-yellow-500"/>
              <div className="w-2 h-2 rounded-full bg-green-500"/>
            </div>
              <div className="flex-1 grid grid-cols-2 gap-4 p-0 items-center">
                <img src='/hero.png' className="w-full h-auto object-cover rounded-xl shadow-lg col-span-2" alt="Hero Demo" />
              </div>
              {/* Mobile CTAs: show immediately under hero on small screens */}
              <div className="flex md:hidden flex-col items-center gap-3 mt-4 w-full px-4">
                <button onClick={() => setView('app')} className="w-full px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 glow-cta">Start Now <ArrowRight className="w-5 h-5" /></button>
                <a href={demoUrl || '/'} target="_blank" rel="noopener noreferrer" className={`w-full px-8 py-4 rounded-full font-bold text-lg border transition-all inline-flex items-center justify-center gap-2 ${isDarkMode ? 'border-white/20 hover:bg-white/10 text-white' : 'border-black/10 hover:bg-black/5 text-gray-800'}`}>
                  <Play className="w-4 h-4 fill-current" /> Watch Demo
                </a>
              </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
         <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simple Pricing</h2>
         <p className={`text-center mb-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pay once, own it forever. No subscriptions.</p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className={`p-8 rounded-3xl border flex flex-col ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}><h3 className="text-xl font-bold mb-2">Starter</h3><div className="text-4xl font-extrabold mb-6">$0</div><ul className="space-y-4 mb-8 flex-1"><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500"/> Single Image Compression</li><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500"/> Basic Quality Slider</li><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500"/> No Watermarks</li></ul><button onClick={() => setView('app')} className={`w-full py-3 rounded-xl font-bold border transition-all ${isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-black/10 hover:bg-gray-50'}`}>Use Free</button></div>
            <div className="relative p-8 rounded-3xl border border-yellow-500/30 bg-linear-to-b from-yellow-500/10 to-transparent flex flex-col shadow-2xl"><div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-yellow-500 to-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">BEST VALUE</div><div className="flex justify-between items-center mb-2"><h3 className="text-xl font-bold text-yellow-500 flex items-center gap-2"><Crown className="w-5 h-5 fill-current"/> God Mode</h3></div><div className="text-4xl font-extrabold mb-6">$3 <span className="text-sm font-normal opacity-60">/ lifetime</span></div><ul className="space-y-4 mb-8 flex-1"><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-yellow-500"/> <strong>Bulk Compression</strong> (Unlimited)</li><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-yellow-500"/> Priority Support</li><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-yellow-500"/> Early Access</li></ul><button onClick={() => { activateGodMode && activateGodMode(); setView('app'); }} className="w-full py-3 rounded-xl font-bold bg-linear-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all">FREE For Now</button></div>
         </div>
      </section>

      {/* FAQ */}
      <section className={`py-20 px-6 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-2">
             <FAQItem isDarkMode={isDarkMode} question="Is this really free?" answer="Yes! The core single-image tool is 100% free forever. We only charge for God Mode (Bulk Upload)." />
             <FAQItem isDarkMode={isDarkMode} question="Is my data secure?" answer="Absolutely. ImageSmith runs entirely in your browser. Your images never leave your device." />
             <FAQItem isDarkMode={isDarkMode} question="Do you offer refunds?" answer="Since it's a digital product with instant access, we generally don't. But if it doesn't work for you, email us!" />
          </div>
        </div>
      </section>
      {showDemo && (
        <div className="fixed inset-0 z-50 bg-black/90">
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-transparent' : 'bg-transparent'}`}></div>
          <button onClick={() => setShowDemo(false)} aria-label="Close demo" className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/30 hover:bg-black/40 text-white">
            <X className="w-6 h-6" />
          </button>
          <div className="w-full h-full flex items-center justify-center">
            {embedUrl ? (
              <iframe className="w-full h-full" src={embedUrl} title="ImageSmith Demo" frameBorder="0" allowFullScreen />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-8 text-center text-white">No demo URL provided.</div>
            )}
          </div>
        </div>
      )}
        
    </div>
  );
};

export default LandingPage;