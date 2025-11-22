
import React, { useState, useRef, useEffect } from 'react';
import MainContent from './components/MainContent';
import FloatingParticles from './components/FloatingParticles';
import CakeSplashScreen from './components/CakeSplashScreen';

// --- Placeholders ---
// Ganti dengan nama dan umur pacar Anda
const PARTNER_NAME = "Sayang"; 
const PARTNER_AGE = 21; 

const App: React.FC = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleCandlesBlown = () => {
    setShowMainContent(true);
    // Play background music when candles are blown (user interaction occurred)
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });
    }
  };
  
  // Preload audio
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.load();
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-50 text-gray-700 antialiased">
      
      {/* Global Particles (visible only on main content to avoid distraction on cake) */}
      {showMainContent && <FloatingParticles particle='💙' count={15} />}

      {/* Background Music Player */}
      <audio ref={audioRef} loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {showMainContent ? (
        <MainContent partnerName={PARTNER_NAME} partnerAge={PARTNER_AGE} />
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
