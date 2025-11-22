
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
                Haiii sayangkuuu {partnerName} 💙
            </h1>
            <p className="text-blue-500 mb-8 max-w-md">
                Ada kue spesial buat kamu, tapi harus ditiup dulu lilinnya... 
            </p>
            <button 
                onClick={handleStart}
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold text-xl shadow-xl transform hover:scale-105 transition-all animate-bounce"
            >
                Mulai Yuk! 🎉
            </button>
        </div>
    );
  }

  // Screen 2: The Cake
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-sky-50 z-50 overflow-hidden">
      <style>{`
        /* Flame Animation */
        .flame {
          width: 14px;
          height: 35px;
          background: linear-gradient(to bottom, #ffeb3b 0%, #ff9800 50%, #ff5722 100%);
          border-radius: 50% 50% 35% 35%;
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          animation: flicker 0.5s infinite alternate ease-in-out;
          box-shadow: 0 0 15px rgba(255, 152, 0, 0.7), 0 0 30px rgba(255, 87, 34, 0.4);
          z-index: 20;
        }
        
        @keyframes flicker {
          0% { transform: translateX(-50%) scaleY(1) rotate(-2deg); opacity: 0.9; }
          100% { transform: translateX(-50%) scaleY(1.1) rotate(2deg); opacity: 1; }
        }

        /* Smoke Animation */
        .smoke {
          width: 10px;
          height: 30px;
          background: rgba(150, 150, 150, 0.4);
          border-radius: 50%;
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          animation: smokeRise 2s forwards ease-out;
        }

        @keyframes smokeRise {
          0% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-100px) scale(4); }
        }

        /* Blue Cake CSS */
        .cake-layer-top {
            background: radial-gradient(circle at 40% 40%, #e0f2fe, #7dd3fc); /* sky-100 to sky-300 */
            border-radius: 50%;
        }
        .cake-side {
            background: linear-gradient(to right, #3b82f6, #2563eb, #3b82f6); /* blue-500 to blue-600 */
        }
        .cake-frosting {
             background: #60a5fa; /* blue-400 */
             border-radius: 0 0 20px 20px;
             box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .candle-number {
             font-family: 'Lobster', cursive;
             text-shadow: 1px 1px 0px rgba(0,0,0,0.2);
        }
      `}</style>

      <div className="text-center mb-24 z-10 px-4 relative top-10">
        <h1 className="text-3xl md:text-5xl font-lobster text-blue-600 mb-4 drop-shadow-sm">
          Make a Wish! ✨
        </h1>
        <p className="text-blue-400 text-lg mt-2 font-medium">
          {audioPermission === false
            ? "" 
            : ""}
        </p>
        {audioPermission === false && (
             <button 
                onClick={() => handleBlow()}
                className="mt-4 px-6 py-2 bg-blue-300 text-white rounded-full font-bold hover:bg-blue-400 shadow-md"
            >
                Tiup Lilin 🌬️
            </button>
        )}
      </div>

      {/* Aesthetic 3D Blue Cake Container */}
      <div className="relative mt-8 transform hover:scale-105 transition-transform duration-500 pt-12">
        
        {/* Candles Container */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex gap-8 z-20">
            {partnerAge.toString().split('').map((digit, idx) => (
                 <div key={idx} className="relative w-10 h-24 flex flex-col items-center">
                    {/* Flame */}
                    {!candlesBlown ? <div className="flame"></div> : <div className="smoke"></div>}
                    
                    {/* Wick */}
                    <div className="w-1 h-3 bg-gray-800 -mt-1"></div>
                    
                    {/* Candle Body (Number Style) */}
                    <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden relative border-2 border-blue-100 flex items-center justify-center">
                         {/* Striped Pattern Background */}
                         <div className="absolute inset-0 opacity-20" style={{
                             background: 'repeating-linear-gradient(45deg, #bfdbfe, #bfdbfe 10px, #fff 10px, #fff 20px)'
                         }}></div>
                         
                         {/* The Number Text */}
                         <span className="text-4xl font-bold text-blue-600 z-10 candle-number">{digit}</span>
                    </div>
                    
                    {/* Candle Base */}
                    <div className="w-12 h-3 bg-gray-200 rounded-full -mt-1 shadow-md opacity-50"></div>
                 </div>
            ))}
        </div>

        {/* Top Decor: Blueberries/Cream */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-64 h-12 z-10 flex justify-around px-2">
             <div className="w-10 h-10 bg-indigo-600 rounded-full shadow-inner border-b-4 border-indigo-800 transform -translate-y-2"></div>
             <div className="w-10 h-10 bg-white rounded-full shadow-inner transform translate-y-1 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
             </div>
             <div className="w-10 h-10 bg-indigo-600 rounded-full shadow-inner border-b-4 border-indigo-800 transform -translate-y-4"></div>
             <div className="w-10 h-10 bg-white rounded-full shadow-inner transform translate-y-1 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
             </div>
             <div className="w-10 h-10 bg-indigo-600 rounded-full shadow-inner border-b-4 border-indigo-800 transform -translate-y-2"></div>
        </div>

        {/* Top Face of Cake */}
        <div className="w-72 h-36 cake-layer-top relative z-10 shadow-md border-b-4 border-blue-200">
             {/* Text on top */}
             <div className="absolute inset-0 flex items-center justify-center pt-8">
                <span className="font-lobster text-blue-500 text-2xl opacity-60 rotate-[-5deg]">Happy Birthday</span>
             </div>
        </div>

        {/* Dripping Frosting */}
        <div className="absolute top-20 left-0 w-72 flex justify-center z-10 pointer-events-none px-4">
            {[...Array(8)].map((_, i) => (
                <div 
                    key={i} 
                    className="cake-frosting w-8 transform" 
                    style={{ 
                        height: `${Math.random() * 30 + 30}px`,
                        background: i % 2 === 0 ? '#93c5fd' : '#60a5fa',
                        marginLeft: '-4px'
                    }}
                ></div>
            ))}
        </div>

        {/* Side of Cake (Body) */}
        <div className="w-72 h-40 cake-side -mt-20 rounded-b-[45%] relative z-0 shadow-2xl flex flex-col items-center justify-center">
            {/* Sprinkles */}
            {[...Array(15)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute rounded-full opacity-80 shadow-sm"
                    style={{
                        width: '8px',
                        height: '8px',
                        background: ['#fff', '#c7d2fe', '#e0f2fe'][i % 3],
                        top: `${Math.random() * 50 + 40}%`,
                        left: `${Math.random() * 80 + 10}%`,
                    }}
                ></div>
            ))}
            
            <div className="w-full h-full bg-gradient-to-b from-transparent to-black opacity-20 rounded-b-[45%] absolute top-0 left-0 pointer-events-none"></div>
        </div>
        
        {/* Plate */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-96 h-12 bg-white rounded-[50%] shadow-xl border-b-4 border-gray-300 -z-10"></div>
      </div>
    </div>
  );
};

export default CakeSplashScreen;
