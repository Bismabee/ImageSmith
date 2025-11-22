import React from 'react';
import { Zap, ArrowRight, Play, CheckCircle2, Crown, ImageIcon } from 'lucide-react';
import FAQItem from '../components/FAQitem.jsx';

const LandingPage = ({ setView, activateGodMode, isDarkMode }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold mb-6 border border-pink-500/20"><Zap className="w-3 h-3" /> V 2.0 NOW LIVE</div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">Bulk Compress.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">Zero Quality Loss.</span></h1>
          <p className={`text-lg mb-8 leading-relaxed max-w-xl mx-auto md:mx-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>The privacy-first bulk image compressor for pros. Drag & drop 50+ images and crush them in seconds using your own GPU.</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button onClick={() => setView('app')} className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 glow-cta">Start Now <ArrowRight className="w-5 h-5" /></button>
            <button className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg border transition-all flex items-center justify-center gap-2 ${isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'}`}><Play className="w-4 h-4 fill-current" /> Watch Demo</button>
          </div>
        </div>
        <div className="flex-1 w-full relative group"><div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div><div className={`relative rounded-[2rem] p-4 border aspect-square flex flex-col gap-4 overflow-hidden ${isDarkMode ? 'bg-[#1a1a2e] border-white/10' : 'bg-white border-gray-200'}`}><div className={`h-8 w-full rounded-full flex items-center px-4 gap-2 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}><div className="w-2 h-2 rounded-full bg-red-500"/><div className="w-2 h-2 rounded-full bg-yellow-500"/><div className="w-2 h-2 rounded-full bg-green-500"/></div><div className="flex-1 grid grid-cols-2 gap-4 p-4"><div className={`rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} flex items-center justify-center`}><ImageIcon className="w-8 h-8 opacity-20" /></div><div className={`rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} flex items-center justify-center`}><ImageIcon className="w-8 h-8 opacity-20" /></div><div className={`rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} flex items-center justify-center`}><ImageIcon className="w-8 h-8 opacity-20" /></div><div className={`rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex flex-col items-center justify-center text-white`}><span className="text-2xl font-bold">50+</span><span className="text-xs">Images</span></div></div></div></div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
         <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simple Pricing</h2>
         <p className={`text-center mb-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pay once, own it forever. No subscriptions.</p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className={`p-8 rounded-3xl border flex flex-col ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}><h3 className="text-xl font-bold mb-2">Starter</h3><div className="text-4xl font-extrabold mb-6">$0</div><ul className="space-y-4 mb-8 flex-1"><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500"/> Single Image Compression</li><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500"/> Basic Quality Slider</li><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500"/> No Watermarks</li></ul><button onClick={() => setView('app')} className={`w-full py-3 rounded-xl font-bold border transition-all ${isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-black/10 hover:bg-gray-50'}`}>Use Free</button></div>
            <div className="relative p-8 rounded-3xl border border-yellow-500/30 bg-gradient-to-b from-yellow-500/10 to-transparent flex flex-col shadow-2xl"><div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">BEST VALUE</div><div className="flex justify-between items-center mb-2"><h3 className="text-xl font-bold text-yellow-500 flex items-center gap-2"><Crown className="w-5 h-5 fill-current"/> God Mode</h3></div><div className="text-4xl font-extrabold mb-6">$3 <span className="text-sm font-normal opacity-60">/ lifetime</span></div><ul className="space-y-4 mb-8 flex-1"><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-yellow-500"/> <strong>Bulk Compression</strong> (Unlimited)</li><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-yellow-500"/> Priority Support</li><li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-yellow-500"/> Early Access</li></ul><button onClick={() => { activateGodMode && activateGodMode(); setView('app'); }} className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all">FREE For Now</button></div>
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
    </div>
  );
};

export default LandingPage;