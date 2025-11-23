
import React from 'react';
import { GiftIcon } from './icons';

interface SplashScreenProps {
  onEnter: () => void;
  partnerName: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter, partnerName }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-lobster text-blue-500 typewriter-text">
          Happy Birthday {partnerName} 💙
        </h1>
      </div>
      <p className="mt-4 text-lg text-blue-700 opacity-0 fade-in-up" style={{ animationDelay: '3.6s' }}>
        Ada kejutan spesial buat kamu...
      </p>
      <button
        onClick={onEnter}
        className="mt-8 flex items-center gap-2 px-8 py-4 bg-blue-400 text-white font-bold rounded-full shadow-lg hover:bg-blue-500 transform hover:scale-105 transition-all duration-300 opacity-0 fade-in-up"
        style={{ animationDelay: '4s' }}
      >
        <GiftIcon />
        Lihat Kejutan
      </button>
    </div>
  );
};

export default SplashScreen;
