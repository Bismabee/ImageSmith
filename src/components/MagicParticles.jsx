import React, { useState } from 'react';

const MagicParticles = () => {
  const [particles] = useState(() => [...Array(30)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 1,
    duration: 1 + Math.random() * 2
  })));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-3xl">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-pink-500/30"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `magic-float ${p.duration}s infinite ease-in-out ${p.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default MagicParticles;