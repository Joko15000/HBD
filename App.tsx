
import React, { useState } from 'react';
import MainContent from './components/MainContent';
import FloatingParticles from './components/FloatingParticles';
import CakeSplashScreen from './components/CakeSplashScreen';

// --- Placeholders ---
const PARTNER_NAME = "Putri Aulia Az-zahra"; 
const PARTNER_AGE = 24; 

const App: React.FC = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  
  // Dipanggil otomatis setelah lilin ditiup
  const handleCandlesBlown = () => {
    setShowMainContent(true);
  };
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-50 text-gray-700 antialiased">
      
      {showMainContent && <FloatingParticles particle='💙' count={15} />}

      {showMainContent ? (
        <MainContent 
          partnerName={PARTNER_NAME} 
          partnerAge={PARTNER_AGE} 
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
