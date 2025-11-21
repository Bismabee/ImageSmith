import React from 'react';
import { Sparkles, Star } from 'lucide-react';

const GlowingStarsLoader = ({ text = "UPLOADING" }) => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-3xl overflow-hidden bg-black/60 backdrop-blur-md transition-all duration-500">
      <div className="relative">
         <div className="w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
         <Sparkles className="w-12 h-12 text-pink-400 animate-bounce relative z-10" />
      </div>
      <div className="mt-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-violet-300 font-bold text-xl animate-pulse tracking-widest">
        {text}
      </div>
      {[...Array(6)].map((_, i) => (
         <Star 
           key={i}
           className="absolute text-yellow-200 fill-yellow-200 w-4 h-4 animate-bounce"
           style={{
             top: `${20 + Math.random() * 60}%`,
             left: `${20 + Math.random() * 60}%`,
             animationDuration: `${1 + Math.random()}s`,
             animationDelay: `${Math.random()}s`,
             opacity: 0.6
           }}
         />
      ))}
    </div>
  );
};

export default GlowingStarsLoader;