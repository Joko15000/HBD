import React, { useState, useEffect, useRef } from 'react';

interface CakeProps {
  onFinished: () => void;
  partnerName: string;
  partnerAge: number;
}

const CakeSplashScreen: React.FC<CakeProps> = ({ onFinished, partnerName, partnerAge }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null);
  const animationFrameRef = useRef<number>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const handleStart = async () => {
    setHasStarted(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioPermission(true);
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      microphone.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      microphoneRef.current = microphone;

      detectBlow();
    } catch (error) {
      console.log("Microphone access denied or not supported.");
      setAudioPermission(false);
    }
  };

  const detectBlow = () => {
    if (!analyserRef.current || candlesBlown) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate average volume
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    const average = sum / bufferLength;

    // Threshold for "blowing"
    if (average > 50) { 
      handleBlow();
    } else {
      animationFrameRef.current = requestAnimationFrame(detectBlow);
    }
  };

  const handleBlow = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    
    // Wait for smoke animation then finish
    setTimeout(() => {
      onFinished();
    }, 2000);
  };

  // Screen 1: Request Permission / Start
  if (!hasStarted) {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-blue-50 z-50 px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-lobster text-blue-600 mb-4">
                Haiii sayangkuuu {partnerName}ku 💙
            </h1>
            <p className="text-blue-500 mb-8 max-w-md">
                Ari sayang banget sama kamu. 
            </p>
            <button 
                onClick={handleStart}
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold text-xl shadow-xl transform hover:scale-105 transition-all animate-bounce"
            >
                klik disini jangan klik yang lain 🎉
            </button>
        </div>
    );
  }

  // Screen 2: The Cake
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-blue-100 z-50 overflow-hidden">
      <style>{`
        .flame {
          width: 15px;
          height: 35px;
          background: radial-gradient(ellipse at bottom, #ffd700 0%, #ff4500 60%, transparent 100%);
          border-radius: 50% 50% 20% 20%;
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          animation: flicker 0.5s infinite alternate;
          transform-origin: center bottom;
          box-shadow: 0 0 10px #ff4500;
        }
        
        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1); opacity: 1; }
          100% { transform: translateX(-50%) scale(1.1) rotate(2deg); opacity: 0.8; }
        }

        .smoke {
          width: 10px;
          height: 30px;
          background: rgba(100, 100, 100, 0.1);
          border-radius: 50%;
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          animation: smokeRise 1.5s forwards ease-out;
        }

        @keyframes smokeRise {
          0% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-50px) scale(3); }
        }
      `}</style>

      <div className="text-center mb-12 z-10 px-4">
        <h1 className="text-3xl md:text-5xl font-lobster text-blue-600 mb-4">
          Happy Birthday ke-{partnerAge} ya sayangkuuu
        </h1>
        <p className="text-blue-400 text-lg mt-2 font-medium">
          {audioPermission === false
            ? "" 
            : ""}
        </p>
        {audioPermission === false && (
             <button 
                onClick={() => handleBlow()}
                className="mt-4 px-4 py-2 bg-blue-300 text-white rounded-full text-sm hover:bg-blue-400"
            >
                (Klik ini kalau nggak bisa tiup)
            </button>
        )}
      </div>

      {/* Cake Container */}
      <div className="relative mt-8 transform hover:scale-105 transition-transform duration-500">
        
        {/* Candles */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex gap-4">
            {partnerAge.toString().split('').map((digit, idx) => (
                 <div key={idx} className="relative w-8 h-16 bg-sky-300 border-2 border-white rounded-md flex items-center justify-center shadow-md">
                    <span className="font-bold text-white text-xl shadow-sm">{digit}</span>
                    <div className="absolute -top-2 left-1/2 w-1 h-2 bg-gray-700 -translate-x-1/2"></div>
                    {!candlesBlown ? (
                        <div className="flame"></div>
                    ) : (
                        <div className="smoke"></div>
                    )}
                 </div>
            ))}
        </div>

        {/* Cake Layers - Blue Theme */}
        <div className="w-64 h-24 bg-blue-300 rounded-t-full relative z-10 border-b-4 border-blue-400">
            <div className="absolute top-full w-full flex">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-8 h-6 bg-blue-300 rounded-b-full -mt-1"></div>
                ))}
            </div>
        </div>
        
        <div className="w-64 h-32 bg-white rounded-b-2xl shadow-xl relative -z-10 flex items-center justify-center border-b-8 border-gray-100">
             <div className="text-blue-300 font-lobster text-2xl opacity-50">
                {partnerName}
             </div>
        </div>
        
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-80 h-6 bg-gray-200 rounded-full shadow-lg -z-20"></div>
      </div>
    </div>
  );
};

export default CakeSplashScreen;