import React, { useEffect } from 'react';

const Ribbon = ({ style }) => (
  <div className="ribbon" style={style} />
);

const CelebrationOverlay = ({ isOpen, onClose, isDarkMode }) => {
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => onClose && onClose(), 3000);
    return () => clearTimeout(t);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center pointer-events-auto">
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-sm`} />
      <div className="relative z-50 max-w-2xl w-full mx-4 text-center p-6 rounded-2xl">
        <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-[#0b1220]/90 text-white' : 'bg-white text-black'} shadow-2xl`}> 
          <h2 className="text-3xl font-extrabold mb-2">🎉 Congratulations</h2>
          <p className="text-sm opacity-80 mb-4">God Mode unlocked — batch processing is now enabled.</p>
          <button onClick={() => onClose && onClose()} className="mt-2 px-4 py-2 rounded-full bg-pink-500 text-white font-bold">Awesome!</button>
        </div>
      </div>

      {/* Simple falling ribbons (decorative) */}
      <div aria-hidden className="pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <Ribbon key={i} style={{
            position: 'fixed',
            left: `${(i * 8) % 100}vw`,
            top: `-10vh`,
            width: '12px',
            height: '60vh',
            background: i % 2 ? 'linear-gradient(180deg,#ffd54f,#ff80ab)' : 'linear-gradient(180deg,#80d8ff,#b388ff)',
            transform: `rotate(${(i % 5) * 15}deg)`,
            animation: `fall 2.8s linear ${i * 120}ms forwards`
          }} />
        ))}
      </div>

      <style>{`
        @keyframes fall { to { transform: translateY(120vh) rotate(360deg); opacity: 0.9 } }
        .ribbon { border-radius: 6px; opacity: 0.95 }
      `}</style>
    </div>
  );
};

export default CelebrationOverlay;
