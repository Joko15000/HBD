
import React, { useState } from 'react';
import BucinPieChart from './BucinPieChart';
import FloatingParticles from './FloatingParticles';
import TapeRecorder from './TapeRecorder';
import { CameraIcon, HugIcon } from './icons';

// --- KONFIGURASI GIF PEMBATAS ---
// Ganti link di bawah ini dengan link/path file GIF kamu sendiri
const DIVIDER_GIF_URL = "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"; 

interface MainContentProps {
  partnerName: string;
  partnerAge: number;
  onVoiceNotePlay: (isPlaying: boolean) => void;
}

const photos = [
  'https://picsum.photos/seed/love1/400/400',
  'https://picsum.photos/seed/love2/400/400',
  'https://picsum.photos/seed/love3/400/400',
  'https://picsum.photos/seed/love4/400/400',
];

// Komponen kecil untuk Divider
const SectionDivider = () => (
  <div className="w-full flex justify-center my-8 md:my-12 opacity-0 fade-in-up" style={{ animationDelay: '0.2s' }}>
    <img 
      src={DIVIDER_GIF_URL} 
      alt="Section Divider" 
      className="w-3/4 md:w-1/2 h-auto object-contain max-h-24 pointer-events-none"
    />
  </div>
);

const MainContent: React.FC<MainContentProps> = ({ partnerName, partnerAge, onVoiceNotePlay }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showHug, setShowHug] = useState(false);

  const handleTakePhoto = () => {
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
      setShowPhotos(true);
    }, 700);
  };

  const handleVirtualHug = () => {
    setShowHug(true);
    setTimeout(() => {
      setShowHug(false);
    }, 3000);
  };

  return (
    <main className="container mx-auto p-4 md:p-8 pb-32 relative">
      
      {isFlashing && (
        <div className="fixed inset-0 bg-white z-50 camera-flash"></div>
      )}

      {showHug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center fade-in-up">
          <div className="text-center bg-white p-8 rounded-2xl shadow-2xl">
             <div className="text-8xl animate-bounce">🤗</div>
             <p className="text-2xl font-bold text-blue-500 mt-4">Peluk virtual terkirim!</p>
          </div>
        </div>
      )}

      {/* 1. Greeting Section */}
      <section className="text-center opacity-0 fade-in-up space-y-6" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-3xl md:text-5xl font-lobster text-blue-600">
          Hai sayangku {partnerName} 💕
        </h2>
        <p className="text-lg md:text-xl mt-4 text-slate-600 max-w-3xl mx-auto">
          Hari ini dunia jadi lebih indah karena kamu bertambah umur. Selamat ulang tahun yang ke-{partnerAge}, my everything! Semoga hari ini seindah senyummu 😚💐
        </p>
      </section>

      <SectionDivider />

      {/* 2. Photo Gallery Section */}
      <section className="text-center opacity-0 fade-in-up space-y-6" style={{ animationDelay: '1s' }}>
        <h3 className="text-2xl md:text-4xl font-bold text-sky-500 mb-6">Our Lovely Moments~</h3>
        {!showPhotos ? (
           <button
            onClick={handleTakePhoto}
            className="flex items-center gap-3 mx-auto px-8 py-4 bg-indigo-400 text-white font-bold rounded-full shadow-lg hover:bg-indigo-500 transform hover:scale-105 transition-all duration-300"
          >
            <CameraIcon />
            Ambil Foto
          </button>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white bg-opacity-50 rounded-2xl shadow-lg">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden shadow-md transform hover:scale-110 hover:rotate-3 transition-transform duration-300 opacity-0 fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img src={photo} alt={`Our memory ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </section>

      <SectionDivider />

      {/* Gombalan Section */}
      <section className="text-center opacity-0 fade-in-up px-4" style={{ animationDelay: '1.1s' }}>
          <div className="inline-block bg-white border-2 border-blue-200 p-6 rounded-xl shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-300 max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 mb-2 font-medium">
                Tau ngga bedanya kamu sama tukang parkir? 🤔
            </p>
             <p className="text-lg md:text-xl text-gray-600">
                Tukang parkir: <span className="italic">"Terus... Terus..."</span>
            </p>
            <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2 animate-pulse">
                Kalau kamu: Cantik Terus! 😜💙
            </p>
          </div>
      </section>

      <SectionDivider />

      {/* 3. Voice Note Section */}
      <section className="opacity-0 fade-in-up space-y-6" style={{ animationDelay: '1.2s' }}>
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-500">Ada Pesan Suara Buat Lia 🎤</h3>
          <p className="text-gray-600 mt-2">Dengerin baik-baik ya...</p>
        </div>
        <TapeRecorder onPlayStateChange={onVoiceNotePlay} />
      </section>

      <SectionDivider />

      {/* 4. Bucin Pie Chart Section */}
      <section className="opacity-0 fade-in-up" style={{ animationDelay: '1.5s' }}>
          <BucinPieChart />
      </section>
      
      <SectionDivider />

      {/* 5. Closing Section */}
      <section className="relative text-center opacity-0 fade-in-up space-y-6" style={{ animationDelay: '2s' }}>
        <FloatingParticles particle='✨' count={10} />
        <h2 className="text-2xl md:text-4xl font-lobster text-blue-500">
          Terima kasih sudah lahir...
        </h2>
        <p className="text-lg md:text-xl mt-4 text-blue-800 max-w-3xl mx-auto">
          ...dan membuat hidupku seindah ini. I love you more than words can say. 🫶✨
        </p>
        <button
          onClick={handleVirtualHug}
          className="mt-8 flex items-center gap-3 mx-auto px-8 py-4 bg-sky-400 text-white font-bold rounded-full shadow-lg hover:bg-sky-500 transform hover:scale-105 transition-all duration-300"
        >
          <HugIcon />
          Hug Virtual
        </button>
      </section>
    </main>
  );
};

export default MainContent;
