import React from 'react';
import { Sparkles, Star } from 'lucide-react';

const STAR_POSITIONS = (() => {
  return [...Array(6)].map(() => ({
    top: 20 + Math.random() * 60,
    left: 20 + Math.random() * 60,
    duration: 1 + Math.random(),
    delay: Math.random(),
    opacity: 0.6
  }));
})();

const GlowingStarsLoader = ({ text = "UPLOADING" }) => {
  const stars = STAR_POSITIONS;

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-3xl overflow-hidden bg-black/60 backdrop-blur-md transition-all duration-500">
      <div className="relative">
         <div className="w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
         <Sparkles className="w-12 h-12 text-pink-400 animate-bounce relative z-10" />
      </div>
      <div className="mt-6 text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-violet-300 font-bold text-xl animate-pulse tracking-widest">
        {text}
      </div>
      {stars.map((s, i) => (
         <Star 
           key={i}
           className="absolute text-yellow-200 fill-yellow-200 w-4 h-4 animate-bounce"
           style={{
             top: `${s.top}%`,
             left: `${s.left}%`,
             animationDuration: `${s.duration}s`,
             animationDelay: `${s.delay}s`,
             opacity: s.opacity
           }}
         />
      ))}
    </div>
  );
};

export default GlowingStarsLoader;