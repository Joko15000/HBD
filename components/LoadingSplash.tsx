
import React from 'react';

const LoadingSplash: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-50 text-center">
      {/* Bouncing Heart */}
      <div className="text-6xl animate-bounce mb-6">
        💙
      </div>
      
      {/* Text */}
      <h2 className="text-2xl md:text-3xl font-lobster text-blue-600 mb-4 animate-pulse">
        Memuat cintaku...
      </h2>

      {/* Loading Bar Container */}
      <div className="w-64 h-3 bg-blue-200 rounded-full overflow-hidden shadow-inner relative">
        {/* Moving Progress Bar */}
        <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full animate-fill-bar"></div>
      </div>

      <p className="mt-2 text-sm text-blue-400 font-medium">
        Harap tunggu sebentar ya sayang
      </p>

      {/* Inline styles for the custom animation specific to this component */}
      <style>{`
        @keyframes fill-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-fill-bar {
          animation: fill-bar 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default LoadingSplash;
