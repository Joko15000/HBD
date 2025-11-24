
import React, { useState, useRef, useEffect } from 'react';

interface TapeRecorderProps {
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const TapeRecorder: React.FC<TapeRecorderProps> = ({ 
  onPlayStateChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Menggunakan Path Langsung
  // File fisik: public/assets/audio/voice.mp3
  // URL akses: /assets/audio/voice.mp3
  const audioSrc = "/assets/audio/voice.mp3";
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (onPlayStateChange) onPlayStateChange(false);
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsPlaying(true);
                    if (onPlayStateChange) onPlayStateChange(true);
                })
                .catch(err => {
                    console.log("Tape playback error:", err.message);
                    alert("Gagal memutar pesan suara. Pastikan file 'voice.mp3' ada di folder '/assets/audio/'.");
                    setIsPlaying(false);
                });
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (onPlayStateChange) onPlayStateChange(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto mt-8">
      
      {/* Cassette Body */}
      <div className={`relative w-full bg-blue-400 rounded-3xl p-4 shadow-xl border-b-8 border-blue-600 transform transition-transform duration-300 ${isPlaying ? 'scale-105' : ''}`}>
        
        {/* Screws */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center"><div className="w-full h-0.5 bg-gray-500 rotate-45"></div></div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center"><div className="w-full h-0.5 bg-gray-500 rotate-45"></div></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center"><div className="w-full h-0.5 bg-gray-500 rotate-45"></div></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center"><div className="w-full h-0.5 bg-gray-500 rotate-45"></div></div>

        {/* Label Area */}
        <div className="bg-white rounded-2xl p-4 mx-4 mb-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-blue-200 opacity-50"></div>
            <div className="text-center font-lobster text-xl text-blue-600 mb-2">
                "Special Message" 🎵
            </div>
            
            {/* Tape Window */}
            <div className="bg-gray-800 h-24 rounded-xl relative flex items-center justify-center gap-8 overflow-hidden px-8 border-4 border-gray-300">
                {/* Left Spool */}
                <div className={`w-16 h-16 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center relative ${isPlaying ? 'animate-spin-slow' : ''}`}>
                    <div className="w-12 h-12 border-4 border-dashed border-gray-400 rounded-full"></div>
                    <div className="absolute w-full h-full flex items-center justify-center">
                        <div className="w-2 h-full bg-transparent border-l-2 border-r-2 border-white"></div>
                        <div className="h-2 w-full bg-transparent border-t-2 border-b-2 border-white absolute"></div>
                    </div>
                </div>

                {/* Tape Connection (Visual only) */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-gray-900 z-0"></div>

                {/* Right Spool */}
                <div className={`w-16 h-16 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center relative ${isPlaying ? 'animate-spin-slow' : ''}`}>
                     <div className="w-12 h-12 border-4 border-dashed border-gray-400 rounded-full"></div>
                     <div className="absolute w-full h-full flex items-center justify-center">
                        <div className="w-2 h-full bg-transparent border-l-2 border-r-2 border-white"></div>
                        <div className="h-2 w-full bg-transparent border-t-2 border-b-2 border-white absolute"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Controls Bottom */}
        <div className="bg-blue-500 rounded-b-xl mx-8 h-12 flex items-center justify-center gap-4 shadow-inner relative">
            {/* Play Button */}
            <button 
                onClick={togglePlay}
                className={`w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-colors absolute -top-4 border-4 border-blue-300 hover:bg-gray-100`}
                title="Putar"
            >
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
            </button>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        src={audioSrc}
      />

      <p className="mt-4 font-medium text-sm text-blue-500">
        {isPlaying ? "Sedang memutar..." : "Klik tombol play ya!"}
      </p>

      <style>{`
        .animate-spin-slow {
            animation: spin 3s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TapeRecorder;
