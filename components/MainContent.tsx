
import React, { useState } from 'react';
import BucinPieChart from './BucinPieChart';
import FloatingParticles from './FloatingParticles';
import TapeRecorder from './TapeRecorder';
import { CameraIcon, HugIcon } from './icons';

// --- KONFIGURASI GIF PEMBATAS ---
// 4 GIF berbeda untuk setiap pembatas section
const DIVIDER_GIFS = [
 "https://media1.tenor.com/m/GlKYFG7ZSxoAAAAC/lilo-stitch.gif", // Divider 1: Greeting -> Gallery
  "https://media.tenor.com/eswzeB0mSGoAAAAi/lilo-and-stitch-animation.gif", // Divider 2: Gallery -> Gombalan
  "https://media.tenor.com/T_AkDBcRsJgAAAAi/ukulele.gif", // Divider 3: Gombalan -> Voice Note
  "https://media.tenor.com/KGV7vd7WiG0AAAAi/stitch.gif", // Divider 4: Voice Note -> Pie Chart
];

interface MainContentProps {
  partnerName: string;
  partnerAge: number;
  onVoiceNotePlay: (isPlaying: boolean) => void;
}

// Foto Galeri Pertama
// PENTING: Simpan foto di folder: public/assets/img/
// Pastikan nama file sesuai dengan yang ada di sini.
// Anda bisa menambahkan berapapun foto di sini, layout akan menyesuaikan otomatis.
const photos = [
  "/assets/img/1.jpg",
  "/assets/img/2.jpg",
  '/assets/img/3.jpg',
  '/assets/img/4.jpg',
  '/assets/img/5.jpg', // Foto tambahan 1
];

// Foto Galeri Kedua (Baru)
const morePhotos = [
  '/assets/img/foto7.jpg',
  '/assets/img/foto8.jpg',
  '/assets/img/foto9.jpg',
  '/assets/img/foto10.jpg',
  '/assets/img/foto11.jpg', // Foto tambahan 3
  '/assets/img/foto12.jpg', // Foto tambahan 4
];

interface SectionDividerProps {
  index: number;
}

// Komponen kecil untuk Divider yang menerima index untuk memilih GIF
const SectionDivider: React.FC<SectionDividerProps> = ({ index }) => (
  <div className="w-full flex justify-center my-8 md:my-12 opacity-0 fade-in-up" style={{ animationDelay: '0.2s' }}>
    <img 
      // Menggunakan modulo agar jika index lebih dari jumlah GIF, dia akan kembali ke awal
      src={DIVIDER_GIFS[index % DIVIDER_GIFS.length]} 
      alt="Section Divider" 
      className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-md"
    />
  </div>
);

const MainContent: React.FC<MainContentProps> = ({ partnerName, partnerAge, onVoiceNotePlay }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showMorePhotos, setShowMorePhotos] = useState(false); // State untuk galeri kedua
  const [showHug, setShowHug] = useState(false);

  const handleTakePhoto = () => {
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
      setShowPhotos(true);
    }, 700);
  };
  
  const handleShowMorePhotos = () => {
      setShowMorePhotos(true);
  };

  const handleVirtualHug = () => {
    setShowHug(true);

    // Trigger Confetti
    const confetti = (window as any).confetti;
    if (confetti) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 9999,
            shapes: ['heart'], // Heart shaped confetti
            colors: ['#3b82f6', '#60a5fa', '#f472b6', '#db2777', '#ffffff'] // Blue, Pink, White mix
        });
    }

    setTimeout(() => {
      setShowHug(false);
    }, 3000);
  };

  // Helper function to handle image error (fallback if file not found)
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/400x400/e2e8f0/1e293b?text=No+Image'; // Fallback image
  };

  return (
    <main className="container mx-auto p-4 md:p-8 pb-32 relative">
      
      {isFlashing && (
        <div className="fixed inset-0 bg-white z-50 camera-flash"></div>
      )}

      {showHug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center fade-in-up">
          <div className="text-center bg-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
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

      <SectionDivider index={0} />

      {/* 2. Photo Gallery Section 1 */}
      <section className="text-center opacity-0 fade-in-up space-y-6" style={{ animationDelay: '1s' }}>
        <h3 className="text-2xl md:text-4xl font-bold text-sky-500 mb-6">Kenangan Manis Kita~</h3>
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
                <img 
                  src={photo} 
                  alt={`Our memory ${index + 1}`} 
                  className="w-full h-full object-cover" 
                  onError={handleImageError}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <SectionDivider index={1} />

      {/* 3. Photo Gallery Section 2 (BARU) */}
      <section className="text-center opacity-0 fade-in-up space-y-6" style={{ animationDelay: '1.1s' }}>
        <h3 className="text-2xl md:text-4xl font-bold text-indigo-500 mb-6">Momen Spesial Lainnya ✨</h3>
        
        {/* Area Kata-kata Baru */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-sm border border-blue-100 mb-8 relative overflow-hidden">
             <div className="absolute -top-4 -left-4 text-6xl opacity-10">❝</div>
             <div className="absolute -bottom-4 -right-4 text-6xl opacity-10">❞</div>
             
             {/* SPACE UNTUK DIISI KATA-KATA */}
             <div className="relative z-10 text-gray-700 space-y-4 text-lg font-serif italic">
                <p>
                  "Aku menyisipkan foto-foto ini bukan karena estetik, tapi karena di setiap frame-nya ada cerita tentang betapa bahagianya aku memilikimu."
                </p>
                <p>
                  "Jangan pernah bosan ya sama aku, mari buat kenangan sampai rambut kita memutih bersama. Love you!"
                </p>
             </div>
        </div>

        {!showMorePhotos ? (
           <button
            onClick={handleShowMorePhotos}
            className="flex items-center gap-3 mx-auto px-8 py-4 bg-blue-400 text-white font-bold rounded-full shadow-lg hover:bg-blue-500 transform hover:scale-105 transition-all duration-300"
          >
            <CameraIcon />
            Lihat Lagi Dong
          </button>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-blue-50 bg-opacity-50 rounded-2xl shadow-lg border-2 border-blue-100">
            {morePhotos.map((photo, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden shadow-md transform hover:scale-110 hover:-rotate-2 transition-transform duration-300 opacity-0 fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img 
                  src={photo} 
                  alt={`Sweet memory ${index + 1}`} 
                  className="w-full h-full object-cover" 
                  onError={handleImageError}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <SectionDivider index={2} />

      {/* 4. Gombalan Section */}
      <section className="text-center opacity-0 fade-in-up px-4" style={{ animationDelay: '1.2s' }}>
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

      <SectionDivider index={3} />

      {/* 5. Voice Note Section */}
      <section className="opacity-0 fade-in-up space-y-6" style={{ animationDelay: '1.3s' }}>
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-500">Ada Pesan Suara Buat Kamu 🎤</h3>
          <p className="text-gray-600 mt-2">Dengerin baik-baik ya...</p>
        </div>
        <TapeRecorder onPlayStateChange={onVoiceNotePlay} />
      </section>

      <SectionDivider index={0} />

      {/* 6. Bucin Pie Chart Section */}
      <section className="opacity-0 fade-in-up" style={{ animationDelay: '1.5s' }}>
          <BucinPieChart />
      </section>
      
      <SectionDivider index={1} />

      {/* 7. Closing Section */}
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
          Peluk Virtual
        </button>
      </section>
    </main>
  );
};

export default MainContent;
