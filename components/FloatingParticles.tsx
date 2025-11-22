
import React from 'react';

interface FloatingParticlesProps {
  count?: number;
  particle?: string;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 20, particle = '💙' }) => {
  const particles = Array.from({ length: count }).map((_, i) => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}%`,
      animationName: 'float',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationDuration: `${Math.random() * 15 + 10}s`, // 10s to 25s
      animationDelay: `-${Math.random() * 10}s`, // Start at different times
      fontSize: `${Math.random() * 1.5 + 0.5}rem`, // 0.5rem to 2rem
    };
    return (
      <div key={i} className="absolute top-full opacity-0" style={style}>
        {particle}
      </div>
    );
  });

  return <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">{particles}</div>;
};

export default FloatingParticles;
