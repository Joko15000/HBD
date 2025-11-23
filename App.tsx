
import React, { useState, useRef, useEffect } from 'react';
import MainContent from './components/MainContent';
import FloatingParticles from './components/FloatingParticles';
import CakeSplashScreen from './components/CakeSplashScreen';

// --- Placeholders ---
// Ganti dengan nama dan umur pacar Anda
const PARTNER_NAME = "Putri Aulia Az-zahra"; 
const PARTNER_AGE = 24; 

// --- GANTI BACKSOUND DISINI ---
// Cara pakai file sendiri:
// 1. Simpan file MP3 kamu di folder "public" project ini.
// 2. Ubah nama file di bawah sesuai nama file kamu (contoh: "/lagu-kita.mp3").
// Catatan: Jika pakai link online, pastikan linknya direct (akhiran .mp3).
const BACKSOUND_URL = "/assets/audio/HBD.mp3";

const App: React.FC = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleCandlesBlown = () => {
    setShowMainContent(true);
    // Play background music when candles are blown (user interaction occurred)
    if (audioRef.current) {
      audioRef.current.volume = 0.8; // Set default volume
      audioRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });
    }
  };

  // Fungsi untuk mengecilkan/membesarkan backsound saat VN diputar
  const handleVoiceNoteState = (isPlaying: boolean) => {
    if (audioRef.current) {
      if (isPlaying) {
        // Kecilkan volume (ducking)
        audioRef.current.volume = 0.1; 
      } else {
        // Kembalikan ke normal
        audioRef.current.volume = 0.8;
      }
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
        <source src={BACKSOUND_URL} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

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