
import React, { useState, useRef, useEffect } from 'react';
import MainContent from './components/MainContent';
import FloatingParticles from './components/FloatingParticles';
import CakeSplashScreen from './components/CakeSplashScreen';

// --- Placeholders ---
// Ganti dengan nama dan umur pacar Anda
const PARTNER_NAME = "Putri Aulia Az-zahra"; 
const PARTNER_AGE = 24; 

// --- KONFIGURASI AUDIO ---
const BACKSOUND_URL = "/assets/audio/HBD.mp3";

const App: React.FC = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleCandlesBlown = () => {
    setShowMainContent(true);
    // Play background music when candles are blown
    if (audioRef.current) {
      audioRef.current.volume = 0.6; // Set initial volume (60%)
      audioRef.current.play().catch((error) => {
        console.log("Audio play failed (browser policy might require interaction):", error);
      });
    }
  };

  // Fungsi untuk mengecilkan/membesarkan backsound saat VN diputar
  const handleVoiceNoteState = (isPlaying: boolean) => {
    if (audioRef.current) {
      if (isPlaying) {
        // Kecilkan volume (ducking) ke 10%
        // Transisi halus manual
        audioRef.current.volume = 0.1; 
      } else {
        // Kembalikan ke normal 60%
        audioRef.current.volume = 0.6;
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-50 text-gray-700 antialiased">
      
      {/* Global Particles (visible only on main content to avoid distraction on cake) */}
      {showMainContent && <FloatingParticles particle='💙' count={15} />}

      {/* HTML5 Audio Player */}
      <audio ref={audioRef} src={BACKSOUND_URL} loop />

      {showMainContent ? (
        <MainContent 
          partnerName={PARTNER_NAME} 
          partnerAge={PARTNER_AGE} 
          onVoiceNotePlay={handleVoiceNoteState}
        />
      ) : (
        <CakeSplashScreen 
          onFinished={handleCandlesBlown} 
          partnerName={PARTNER_NAME} 
          partnerAge={PARTNER_AGE} 
        />
      )}
    </div>
  );
};

export default App;
