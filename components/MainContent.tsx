
import React, { useState } from 'react';
import BucinPieChart from './BucinPieChart';
import FloatingParticles from './FloatingParticles';
import { CameraIcon, HugIcon } from './icons';

// --- KONFIGURASI GIF PEMBATAS ---
const DIVIDER_GIFS = [
 "https://media1.tenor.com/m/GlKYFG7ZSxoAAAAC/lilo-stitch.gif", // Divider 1: Greeting -> Gallery
  "https://media.tenor.com/eswzeB0mSGoAAAAi/lilo-and-stitch-animation.gif", // Divider 2: Gallery -> Gombalan
  "https://media.tenor.com/T_AkDBcRsJgAAAAi/ukulele.gif", // Divider 3: Gombalan -> Voice Note
  "https://media.tenor.com/KGV7vd7WiG0AAAAi/stitch.gif", // Divider 4: Voice Note -> Pie Chart
];

interface MainContentProps {
  partnerName: string;
  partnerAge: number;
}

// ==========================================
// KONFIGURASI FOTO (PILIH SALAH SATU)
// ==========================================

// OPSI 1: FOTO DARI GOOGLE DRIVE (Format Thumbnail)
// Pastikan Setting Share di Google Drive sudah: "Anyone with the link" (Siapa saja yang memiliki link)
const localPhotos = [
  'https://drive.google.com/thumbnail?id=1QDbZpHpczXih63mfM0eQtbZyby2YTrJ7&sz=w1000', // 1.jpg
  'https://drive.google.com/thumbnail?id=1TwZ8Bso5FeV-NaLh_k678bRE7AVYUvL3&sz=w1000', // 2.jpg
  'https://drive.google.com/thumbnail?id=1QB3evabvhHhSvLc0O4Uom6Z5ZTfQFEf2&sz=w1000', // 3.jpg
  'https://drive.google.com/thumbnail?id=1ho9p-TytAj27sebuie5cNSSDXh5l1WJn&sz=w1000', // 4.jpg
  'https://drive.google.com/thumbnail?id=1esRAKL6sK6kIha0P3Xl98kPXRGURHilB&sz=w1000', // 5.jpg
  'https://drive.google.com/thumbnail?id=1rJmckDtqt8aCrCzuUZUEe1mVYq2vvOLn&sz=w1000', // 18.jpg
  
  
];

const localMorePhotos = [
  'https://drive.google.com/thumbnail?id=1Ivg6AJaZs4g0LUU12wsFX6_lNVeIEIXN&sz=w1000', // 6.jpg
  'https://drive.google.com/thumbnail?id=1ufU-ooMJOdoiBXmAHq0zX8yQ5HeN57DF&sz=w1000', // 7.jpg
  'https://drive.google.com/thumbnail?id=1Nm1hpCxlitfeDkyGvndyHu3k5n11rjV3&sz=w1000', // 8.jpg
  'https://drive.google.com/thumbnail?id=1cf6Y9Fp-_wPQcQgF-VmAjco1OrqM4eKO&sz=w1000', // 9.jpg
  'https://drive.google.com/thumbnail?id=1uj5sDGiC6o0sHF39eB-AL46xgOIZxMOz&sz=w1000', // 10.jpg
  'https://drive.google.com/thumbnail?id=1g-naY2E8f2ZpKUaAEm4gNKFAFYCLcMvF&sz=w1000', // 11.jpg
  'https://drive.google.com/thumbnail?id=1ezOohvng1j_yxB-XVybNYdiaGnjOjUec&sz=w1000', // 12.jpg
  'https://drive.google.com/thumbnail?id=1IdF4cmsGxE79spVHinb9IDLi-ksiVkmu&sz=w1000', // 13.jpg
  'https://drive.google.com/thumbnail?id=1WLbZT4X65fRnvaguYIyML5SpEYMBrKfQ&sz=w1000', // 14.jpg
  'https://drive.google.com/thumbnail?id=182sWhHF4QgZ4y5ygRvhTM4ky-9ihbLe8&sz=w1000', // 15.jpg
  'https://drive.google.com/thumbnail?id=1iS6NxQTzXVvFyDQFKcJ6lXJ_S2_D5IU0&sz=w1000', // 16.jpg
  'https://drive.google.com/thumbnail?id=14S7Arhyr0H6UYej7xngDJVwr-VS-jzTI&sz=w1000', // 17.jpg
  'https://drive.google.com/thumbnail?id=1HDTV8buHPG5y2wJTGM9RGeO1nuOwKlGK&sz=w1000', // 19.jpg
  'https://drive.google.com/thumbnail?id=1zeitGHA2qbiWm9t5cPRK0qVzqskIo3qE&sz=w1000', // 20.jpg
  'https://drive.google.com/thumbnail?id=1oeH6Tgg5_pGHDdcyqRm9G7UHGq-Q1GCU&sz=w1000', // 21.jpg
  'https://drive.google.com/thumbnail?id=1_It4Pb5_PV4Bm89U-QrL8JhyHrpZUkU-&sz=w1000', // 22.jpg
];

// OPSI 2: FOTO DARI INTERNET / GITHUB (Cadangan)
const githubPhotos = [
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60', 
  'https://images.unsplash.com/photo-1516575334481-f85287c2c81d?w=600&auto=format&fit=crop&q=60', 
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60', 
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60', 
];

const githubMorePhotos = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60',
];

// --- PENGATURAN SUMBER FOTO ---
// Ubah ke 'true' jika ingin menggunakan foto dari githubPhotos
// Ubah ke 'false' jika ingin menggunakan foto dari folder lokal / Google Drive
const USE_ONLINE_PHOTOS = false; 

// Logika pemilihan data
const photos = USE_ONLINE_PHOTOS ? githubPhotos : localPhotos;
const morePhotos = USE_ONLINE_PHOTOS ? githubMorePhotos : localMorePhotos;

interface SectionDividerProps {
  index: number;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ index }) => (
  <div className="w-full flex justify-center my-8 md:my-12 opacity-0 fade-in-up" style={{ animationDelay: '0.2s' }}>
    <img 
      src={DIVIDER_GIFS[index % DIVIDER_GIFS.length]} 
      alt="Section Divider" 
      className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-md"
    />
  </div>
);

const MainContent: React.FC<MainContentProps> = ({ partnerName, partnerAge }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showMorePhotos, setShowMorePhotos] = useState(false); 
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
    const confetti = (window as any).confetti;
    if (confetti) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 9999,
            shapes: ['heart'], 
            colors: ['#3b82f6', '#60a5fa', '#f472b6', '#db2777', '#ffffff']
        });
    }
    setTimeout(() => {
      setShowHug(false);
    }, 3000);
  };

  // FALLBACK IMAGE HANDLER
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const originalSrc = target.src;
    
    // Mencegah loop infinite jika gambar backup juga error
    if (target.dataset.hasError === "true") return;
    target.dataset.hasError = "true";

    // Ganti ke gambar random
    target.src = `https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop&random=${Math.random()}`;
    
    console.warn(
      `[DEBUG] Gagal memuat gambar: "${originalSrc}".\n` +
      `Sistem menggantinya dengan gambar backup.\n` +
      `1. Cek Permission Google Drive (Harus 'Anyone with link').\n` +
      `2. Pastikan file ada di folder "public/assets/img/" jika pakai file lokal.`
    );
  };

  const getPhotoGridClass = (count: number) => {
    if (count === 1) return "grid-cols-1 max-w-sm mx-auto";
    if (count === 2) return "grid-cols-2 max-w-2xl mx-auto";
    if (count === 3) return "grid-cols-1 md:grid-cols-3";
    if (count === 4) return "grid-cols-2 md:grid-cols-4";
    
    // KHUSUS SECTION 1 (6 FOTO) -> 3x2 on Desktop
    if (count === 6) return "grid-cols-2 md:grid-cols-3"; 

    // KHUSUS SECTION 2 (16 FOTO) -> 4x4 on Desktop
    if (count === 16) return "grid-cols-2 md:grid-cols-4";

    if (count >= 5 && count <= 8) return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    return "grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
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
          Hari ini dunia jadi lebih indah karena kamu bertambah TUA. Selamat ulang tahun yang ke-{partnerAge}, my everything! Semoga hari ini seindah senyummu ❤️❤️❤️
          Sehat terus ya sayang, Makin Sayang sama Aku, kurangin ngambekannya, lancar terus rezekinya, apalagi sini aku Aamiinin. Loveyouuu pokoknya ❤️❤️❤️
        </p>
      </section>

      <SectionDivider index={0} />

      {/* 2. Photo Gallery Section 1 */}
      <section className="text-center opacity-0 fade-in-up space-y-6" style={{ animationDelay: '1s' }}>
        <h3 className="text-2xl md:text-4xl font-bold text-sky-500 mb-6">Our Moments~</h3>
        {!showPhotos ? (
           <button
            onClick={handleTakePhoto}
            className="flex items-center gap-3 mx-auto px-8 py-4 bg-indigo-400 text-white font-bold rounded-full shadow-lg hover:bg-indigo-500 transform hover:scale-105 transition-all duration-300"
          >
            <CameraIcon />
            
          </button>
        ) : (
          <div className={`grid gap-4 p-4 bg-white bg-opacity-50 rounded-2xl shadow-lg ${getPhotoGridClass(photos.length)}`}>
            {photos.map((photo, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden shadow-md transform hover:scale-110 hover:rotate-3 transition-transform duration-300 opacity-0 fade-in-up relative group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img 
                  src={photo} 
                  alt={`Foto ${index + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <SectionDivider index={1} />

      {/* 3. Photo Gallery Section 2 */}
      <section className="text-center opacity-0 fade-in-up space-y-6" style={{ animationDelay: '1.1s' }}>
        <h3 className="text-2xl md:text-4xl font-bold text-indigo-500 mb-6">Liat ini deh✨</h3>
        
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-sm border border-blue-100 mb-8 relative overflow-hidden">
             <div className="absolute -top-4 -left-4 text-6xl opacity-10">❝</div>
             <div className="absolute -bottom-4 -right-4 text-6xl opacity-10">❞</div>
             
             <div className="relative z-10 text-gray-700 space-y-4 text-lg font-serif italic">
                <p>
                  "Aku menyisipkan foto-foto ini bukan karena estetik, tapi karena di setiap frame-nya ada cerita tentang betapa bahagianya aku memilikimu."
                </p>
                <p>
                  "Aku menyisipkan foto-foto ini bukan karena estetik, tapi karena di setiap frame-nya kamu itu sangat cantik."
                </p>
                <p>
                  "Jangan pernah bosan ya sama aku, mari buat kenangan sampai rambut kita memutih bersama. Love you❤️❤️❤️"
                </p>
             </div>
        </div>

        {!showMorePhotos ? (
           <button
            onClick={handleShowMorePhotos}
            className="flex items-center gap-3 mx-auto px-8 py-4 bg-blue-400 text-white font-bold rounded-full shadow-lg hover:bg-blue-500 transform hover:scale-105 transition-all duration-300"
          >
            <CameraIcon />
          
          </button>
        ) : (
          <div className={`grid gap-4 p-4 bg-blue-50 bg-opacity-50 rounded-2xl shadow-lg border-2 border-blue-100 ${getPhotoGridClass(morePhotos.length)}`}>
            {morePhotos.map((photo, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden shadow-md transform hover:scale-110 hover:-rotate-2 transition-transform duration-300 opacity-0 fade-in-up relative group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img 
                  src={photo} 
                  alt={`Foto Extra ${index + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={handleImageError}
                  loading="lazy"
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

      {/* 5. Bucin Pie Chart Section */}
      <section className="opacity-0 fade-in-up" style={{ animationDelay: '1.5s' }}>
          <BucinPieChart />
      </section>
      
      <SectionDivider index={0} />

      {/* 6. Closing Section */}
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
        <button
        
          className="mt-8 flex items-center gap-3 mx-auto px-8 py-4 bg-sky-400 text-white font-bold rounded-full shadow-lg hover:bg-sky-500 transform hover:scale-105 transition-all duration-300"
        >
          ✉︎ 
          <a href="https://wa.me/6281410149687?text=Udah%20aku%20baca%20sayang%20Loveyou💕">Hubungi Kami via WhatsApp</a>

        </button>
      </section>
    </main>
  );
};

export default MainContent;
