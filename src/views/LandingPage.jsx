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
        <section aria-label="Hero section" className="pt-24 pb-16 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left flex flex-col justify-center order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold mb-6 border border-pink-500/20" role="status" aria-label="Version announcement"><Zap className="w-3 h-3" aria-hidden="true" /> V 2.0 NOW LIVE</div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">Free Image Compressor.<br /><span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-violet-600">No Ads. No Limits.</span></h1>
          <p className={`text-lg mb-8 leading-relaxed max-w-xl mx-auto md:mx-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Compress images online for free with our ad-free bulk image compression tool. Drag & drop 50+ images and reduce file size by up to 90% - 100% privacy-first, browser-based processing.</p>
          <div className="hidden md:flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button onClick={() => setView('app')} className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 glow-cta" aria-label="Start compressing images now">Start Now <ArrowRight className="w-5 h-5" aria-hidden="true" /></button>
            <div className="flex items-center gap-3">
              <a href={demoUrl || '/'} target="_blank" rel="noopener noreferrer" className={`w-full sm:w-auto inline-flex px-8 py-4 rounded-full font-bold text-lg border transition-all items-center justify-center gap-2 ${isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'}`} aria-label="Watch demonstration video">
                <Play className="w-4 h-4 fill-current" aria-hidden="true" /> Watch Demo
              </a>
            </div>
          </div>
        </div>
          <div className="flex-1 w-full relative group order-1 md:order-2">
            <div className="absolute -inset-1 bg-linear-to-r from-pink-500 to-violet-500 rounded-4xl blur opacity-30 group-hover:opacity-60 transition duration-1000" aria-hidden="true"></div>
            <div className={`relative rounded-4xl p-4 border flex flex-col gap-4 overflow-hidden min-h-[300px] ${isDarkMode ? 'bg-[#1a1a2e] border-white/10' : 'bg-white border-gray-200'}`} role="img" aria-label="Application preview">
            <div className={`h-8 w-full rounded-full flex items-center px-4 gap-2 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} aria-label="Browser window controls">
              <div className="w-2 h-2 rounded-full bg-red-500" aria-label="Close button"/>
              <div className="w-2 h-2 rounded-full bg-yellow-500" aria-label="Minimize button"/>
              <div className="w-2 h-2 rounded-full bg-green-500" aria-label="Maximize button"/>
            </div>
              <div className="flex-1 grid grid-cols-2 gap-4 p-0 items-center">
                <img src='/hero.png' className="w-full h-auto object-cover rounded-xl shadow-lg col-span-2" alt="ImageSmith bulk image compression interface showing drag-and-drop functionality and compressed results" loading="eager" width="800" height="600" />
              </div>
              {/* Mobile CTAs: show immediately under hero on small screens */}
              <div className="flex md:hidden flex-col items-center gap-3 mt-4 w-full px-4">
                <button onClick={() => setView('app')} className="w-full px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 glow-cta" aria-label="Start compressing images now">Start Now <ArrowRight className="w-5 h-5" aria-hidden="true" /></button>
                <a href={demoUrl || '/'} target="_blank" rel="noopener noreferrer" className={`w-full px-8 py-4 rounded-full font-bold text-lg border transition-all inline-flex items-center justify-center gap-2 ${isDarkMode ? 'border-white/20 hover:bg-white/10 text-white' : 'border-black/10 hover:bg-black/5 text-gray-800'}`} aria-label="Watch demonstration video">
                  <Play className="w-4 h-4 fill-current" aria-hidden="true" /> Watch Demo
                </a>
              </div>
          </div>
        </div>
      </section>

      {/* Features Section - SEO Optimized */}
      <section className="py-20 px-6 max-w-6xl mx-auto" aria-label="Key features">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Free Image Compression Tool</h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            The best free online image compressor with no ads, no sign-up required. Compress JPEG, PNG, and WebP images instantly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-pink-500 to-violet-500 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Free, No Ads</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Completely free image compression tool with zero advertisements. No hidden fees, no watermarks, no annoying popups.
            </p>
          </article>
          <article className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-pink-500 to-violet-500 flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold mb-2">Bulk Image Compressor</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Compress multiple images at once. Upload up to 50+ images and reduce file sizes in bulk with our free batch compression tool.
            </p>
          </article>
          <article className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-pink-500 to-violet-500 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold mb-2">Privacy-First Design</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Your images never leave your device. All compression happens locally in your browser for maximum privacy and security.
            </p>
          </article>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <article className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h3 className="text-lg font-bold mb-2">Reduce Image Size</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Reduce image file size by up to 90% without visible quality loss. Perfect for web optimization and faster loading times.
            </p>
          </article>
          <article className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h3 className="text-lg font-bold mb-2">All Image Formats</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Compress JPEG, PNG, WebP, and more. Our online image compressor supports all major image formats.
            </p>
          </article>
          <article className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h3 className="text-lg font-bold mb-2">No File Size Limits</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Unlike other image compression tools, we don't impose arbitrary file size limits. Compress large images freely.
            </p>
          </article>
        </div>
      </section>

      {/* Pricing */}
      <section aria-label="Pricing plans" className="py-20 px-6 max-w-6xl mx-auto">
         <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simple Pricing</h2>
         <p className={`text-center mb-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pay once, own it forever. No subscriptions.</p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <article className={`p-8 rounded-3xl border flex flex-col ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`} aria-label="Starter plan"><h3 className="text-xl font-bold mb-2">Starter</h3><div className="text-4xl font-extrabold mb-6">$0</div><ul className="space-y-4 mb-8 flex-1" role="list"><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true"/> Single Image Compression</li><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true"/> Basic Quality Slider</li><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true"/> No Watermarks</li></ul><button onClick={() => setView('app')} className={`w-full py-3 rounded-xl font-bold border transition-all ${isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-black/10 hover:bg-gray-50'}`} aria-label="Start using free plan">Use Free</button></article>
            <article className="relative p-8 rounded-3xl border border-yellow-500/30 bg-linear-to-b from-yellow-500/10 to-transparent flex flex-col shadow-2xl" aria-label="God Mode premium plan"><div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-yellow-500 to-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg" role="status">BEST VALUE</div><div className="flex justify-between items-center mb-2"><h3 className="text-xl font-bold text-yellow-500 flex items-center gap-2"><Crown className="w-5 h-5 fill-current" aria-hidden="true"/> God Mode</h3></div><div className="text-4xl font-extrabold mb-6">$3 <span className="text-sm font-normal opacity-60">/ lifetime</span></div><ul className="space-y-4 mb-8 flex-1" role="list"><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-yellow-500" aria-hidden="true"/> <strong>Bulk Compression</strong> (Unlimited)</li><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-yellow-500" aria-hidden="true"/> Priority Support</li><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-yellow-500" aria-hidden="true"/> Early Access</li></ul><button onClick={() => { activateGodMode && activateGodMode(); setView('app'); }} className="w-full py-3 rounded-xl font-bold bg-linear-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all" aria-label="Activate God Mode premium plan">FREE For Now</button></article>
         </div>
      </section>

      {/* FAQ */}
      <section className={`py-20 px-6 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`} aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-2" role="list">
             <FAQItem isDarkMode={isDarkMode} question="Is ImageSmith really free?" answer="Yes! ImageSmith is 100% free with no ads, no sign-up required. The core single-image compression tool is free forever. We only charge $3 for God Mode which unlocks bulk compression for unlimited images." />
             <FAQItem isDarkMode={isDarkMode} question="How do I compress images online for free?" answer="Simply visit ImageSmith, drag and drop your images (JPEG, PNG, WebP), adjust the quality slider, and click compress. Your compressed images are ready to download instantly - no registration needed." />
             <FAQItem isDarkMode={isDarkMode} question="Is my data secure? Do you upload my images?" answer="Absolutely secure. ImageSmith runs entirely in your browser using your device's processing power. Your images never leave your computer and are never uploaded to our servers. All compression happens locally for complete privacy." />
             <FAQItem isDarkMode={isDarkMode} question="What image formats can I compress?" answer="ImageSmith supports all major image formats including JPEG, PNG, WebP, and more. You can compress any standard web image format with our free tool." />
             <FAQItem isDarkMode={isDarkMode} question="Is there a file size limit?" answer="No! Unlike other free image compressors, ImageSmith has no file size limits. Compress images of any size for free without restrictions." />
             <FAQItem isDarkMode={isDarkMode} question="Can I compress multiple images at once?" answer="Yes! With God Mode (currently free), you can compress up to 50+ images simultaneously using our bulk image compression feature. Perfect for photographers and web developers." />
             <FAQItem isDarkMode={isDarkMode} question="Will image compression reduce quality?" answer="ImageSmith uses advanced compression algorithms to reduce file size by up to 90% while maintaining excellent visual quality. You can adjust the quality slider to find the perfect balance between size and quality." />
             <FAQItem isDarkMode={isDarkMode} question="Why is ImageSmith ad-free?" answer="We believe in a clean, distraction-free experience. ImageSmith is completely ad-free to provide you with the best free image compression tool without annoying advertisements." />
             <FAQItem isDarkMode={isDarkMode} question="Do you offer refunds?" answer="Since God Mode is a digital product with instant access, we generally don't offer refunds. However, if you experience technical issues, please email us and we'll help resolve them." />
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