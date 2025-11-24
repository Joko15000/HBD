
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
    
    // Trigger celebratory confetti!
    const confetti = (window as any).confetti;
    if (confetti) {
        // Center burst
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#60a5fa', '#93c5fd', '#ffffff', '#fbbf24']
        });
        
        // Side cannons
        setTimeout(() => {
             confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
             confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
        }, 200);
    }
    
    // Wait for smoke animation then finish
    setTimeout(() => {
      onFinished();
    }, 2500);
  };

  // Screen 1: Request Permission / Start
  if (!hasStarted) {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-blue-50 z-50 px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-lobster text-blue-600 mb-6 drop-shadow-sm">
                Haiii sayangkuuu {partnerName} 💙
            </h1>
            <p className="text-slate-600 mb-8 max-w-md text-lg leading-relaxed">
               
            </p>
            <button 
                onClick={handleStart}
                className="px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 animate-bounce"
            >
               Klik disini ya jangan klik yang lain
            </button>
        </div>
    );
  }

  // Screen 2: The Cake
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 z-50 overflow-hidden">
      <style>{`
        .flame {
          width: 14px;
          height: 35px;
          background: linear-gradient(to bottom, #fefce8 0%, #fef08a 30%, #fbbf24 60%, #f97316 100%);
          border-radius: 50% 50% 20% 20%;
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          animation: flicker 0.6s infinite alternate ease-in-out;
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.6), 0 0 30px rgba(249, 115, 22, 0.4);
          z-index: 30;
          transform-origin: center bottom;
        }
        
        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1) rotate(-3deg); opacity: 0.9; }
          25% { transform: translateX(-50%) scale(1.1) rotate(3deg); opacity: 1; }
          50% { transform: translateX(-50%) scale(0.9) rotate(-1deg); opacity: 0.8; }
          75% { transform: translateX(-50%) scale(1.05) rotate(2deg); opacity: 1; }
          100% { transform: translateX(-50%) scale(1) rotate(-2deg); opacity: 0.9; }
        }

        .smoke {
          width: 6px;
          height: 15px;
          background: rgba(200, 200, 200, 0.6);
          border-radius: 50%;
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          animation: smokeRise 2.5s forwards ease-out;
        }

        @keyframes smokeRise {
          0% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-100px) scale(4); }
        }

        .cake-plate {
            background: linear-gradient(to right, #f8fafc, #e2e8f0, #cbd5e1);
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }

        .cake-body-gradient {
            background: linear-gradient(to right, #2563eb, #3b82f6 25%, #60a5fa 50%, #3b82f6 75%, #2563eb);
        }
        
        .cake-top-gradient {
            background: radial-gradient(ellipse at center, #f8fafc 0%, #dbeafe 60%, #93c5fd 100%);
        }

        /* Generic Candle Stripes */
        .candle-striped {
            background: repeating-linear-gradient(
              45deg,
              #ffffff,
              #ffffff 5px,
              #f472b6 5px,
              #f472b6 10px
            );
        }
      `}</style>

      <div className="text-center mb-24 z-20 px-4 relative">
        <h1 className="text-4xl md:text-6xl font-lobster text-blue-600 mb-3 drop-shadow-sm animate-pulse">
          Make a Wish ya sayang❤️️️ ✨
        </h1>
        <p className="text-blue-500 text-lg md:text-xl font-medium">
          {audioPermission === false
}
        </p>
        
        {audioPermission === false && (
             <button 
                onClick={() => handleBlow()}
                className="mt-6 px-8 py-3 bg-blue-400 text-white rounded-full font-bold hover:bg-blue-500 shadow-lg transform transition hover:scale-105"
            >
           
            </button>
        )}
      </div>

      {/* 3D CAKE CONTAINER */}
      <div className="relative mt-8 transform hover:scale-105 transition-transform duration-700 ease-in-out">
        
        {/* CANDLES (Standard Striped Candles) */}
        {/* Positioned in an arc along the back of the cake */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-[280px] h-20 z-10 pointer-events-none">
            {[...Array(5)].map((_, i) => (
                <div 
                    key={i} 
                    className="absolute bottom-0 flex flex-col items-center"
                    style={{
                        left: `${(i * 20) + 10}%`, // Distribute horizontally
                        transform: `translateY(${Math.abs(i - 2) * 5}px)` // Arc effect (lower in middle, higher at sides)
                    }}
                >
                    {/* Flame / Smoke */}
                    {!candlesBlown ? (
                        <div className="flame filter blur-[0.5px]"></div>
                    ) : (
                        <div className="smoke"></div>
                    )}
                    
                    {/* Wick */}
                    <div className="w-0.5 h-2 bg-gray-800 mb-[-1px] z-10"></div>
                    
                    {/* Candle Body */}
                    <div className="w-4 h-20 candle-striped rounded-sm shadow-md border border-black/10"></div>
                    
                    {/* Base Reflection */}
                    <div className="w-6 h-1 bg-black/20 rounded-full blur-[1px] -mt-1"></div>
                </div>
            ))}
        </div>

        {/* CAKE TOP SURFACE (The "Topping" area) */}
        <div className="w-[360px] h-[140px] cake-top-gradient rounded-[50%] relative z-20 shadow-inner border-b-2 border-blue-200 flex items-center justify-center overflow-hidden">
             
             {/* WRITING ON THE CAKE */}
             <div className="flex flex-col items-center justify-center transform translate-y-2">
                 <h2 
                    className="font-lobster text-blue-600 text-4xl leading-tight"
                    style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.8), -1px -1px 0px rgba(255,255,255,0.5)' }}
                 >
                    Happy Birthday ke 
                 </h2>
                 <h2 
                    className="font-lobster text-pink-500 text-5xl leading-none mt-1"
                    style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.8), -1px -1px 0px rgba(255,255,255,0.5)' }}
                 >
                    {partnerAge}
                 </h2>
             </div>

             {/* Simple Cream Dollops border */}
             <div className="absolute inset-0 pointer-events-none">
                {[...Array(16)].map((_, i) => {
                    const angle = (i / 16) * Math.PI * 2;
                    const x = 50 + 46 * Math.cos(angle); // 46% radius
                    const y = 50 + 46 * Math.sin(angle); // 46% radius
                    return (
                        <div 
                            key={i}
                            className="absolute w-4 h-4 bg-white rounded-full shadow-sm"
                            style={{
                                top: `${y}%`,
                                left: `${x}%`,
                                transform: 'translate(-50%, -50%)',
                                boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.1)'
                            }}
                        ></div>
                    );
                })}
             </div>
        </div>

        {/* CAKE BODY (SIDE) */}
        <div className="w-[360px] h-[140px] cake-body-gradient -mt-[70px] rounded-b-[50%] relative z-10 shadow-2xl flex flex-col items-center justify-start pt-12 overflow-hidden">
             
             {/* Simple Decoration: Just a ribbon line */}
             <div className="w-full h-12 bg-white/20 absolute bottom-8 backdrop-blur-sm border-t border-b border-white/30"></div>

             {/* Few Sprinkles */}
             {[...Array(15)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute rounded-full opacity-70"
                    style={{
                        width: '5px',
                        height: '5px',
                        background: ['#fff', '#fcd34d'][i % 2],
                        top: `${Math.random() * 60 + 20}%`,
                        left: `${Math.random() * 90 + 5}%`,
                    }}
                ></div>
             ))}
        </div>

        {/* PLATE */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[400px] h-[130px] cake-plate rounded-[50%] -z-10 border-b-8 border-gray-300"></div>
      
      </div>
    </div>
  );
};

export default CakeSplashScreen;
