
import React, { useState, useRef, useEffect } from 'react';
import MainContent from './components/MainContent';
import FloatingParticles from './components/FloatingParticles';
import CakeSplashScreen from './components/CakeSplashScreen';

// --- Placeholders ---
// Ganti dengan nama dan umur pacar Anda
const PARTNER_NAME = "Putri Aulia Az-zahra"; 
const PARTNER_AGE = 24; 

// --- GANTI ID YOUTUBE DISINI ---
// URL: https://www.youtube.com/watch?v=wqdV1ybjzOE
// Ambil bagian setelah "v=" yaitu: wqdV1ybjzOE
const YOUTUBE_VIDEO_ID = "wqdV1ybjzOE"; 

// Declare global types for YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const App: React.FC = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const playerRef = useRef<any>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Load YouTube API
  useEffect(() => {
    // 1. Load the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // 2. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0', // Hidden player
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          'playsinline': 1,
          'controls': 0,
          'disablekb': 1,
          'fs': 0,
          'loop': 1,
          'playlist': YOUTUBE_VIDEO_ID, // Required for loop to work
          'autoplay': 0 // We handle play manually
        },
        events: {
          'onReady': onPlayerReady,
        }
      });
    };
  }, []);

  const onPlayerReady = (event: any) => {
    setIsPlayerReady(true);
    event.target.setVolume(80); // Default volume 80%
  };

  const handleCandlesBlown = () => {
    setShowMainContent(true);
    // Play background music when candles are blown
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      playerRef.current.playVideo();
    }
  };

  // Fungsi untuk mengecilkan/membesarkan backsound saat VN diputar
  const handleVoiceNoteState = (isPlaying: boolean) => {
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      if (isPlaying) {
        // Kecilkan volume (ducking) ke 10%
        playerRef.current.setVolume(10); 
      } else {
        // Kembalikan ke normal 80%
        playerRef.current.setVolume(80);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-50 text-gray-700 antialiased">
      
      {/* Global Particles (visible only on main content to avoid distraction on cake) */}
      {showMainContent && <FloatingParticles particle='💙' count={15} />}

      {/* Hidden YouTube Player Container */}
      <div id="youtube-player" className="absolute top-0 left-0 opacity-0 pointer-events-none -z-50"></div>

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
