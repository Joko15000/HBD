import React from 'react';

interface StitchDecorationProps {
  variant?: 'sitting' | 'dancing' | 'peeking' | 'music';
  className?: string;
}

const StitchDecoration: React.FC<StitchDecorationProps> = ({ variant = 'sitting', className = '' }) => {
  let src = '';
  
  // Using transparent Giphy Stickers for better integration
  switch (variant) {
    case 'sitting':
      // Stitch sitting/waiting cute
      src = "https://media.giphy.com/media/Il9SJMOln1gyY/giphy.gif"; 
      break;
    case 'dancing':
      // Stitch dancing happy
      src = "https://media.giphy.com/media/tS9PMbcUMQcJa/giphy.gif";
      break;
    case 'peeking':
       // Stitch licking screen / peeking
      src = "https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif";
      break;
    case 'music':
      // Stitch with headphones
      src = "https://media.giphy.com/media/wAyl8FfBvl8sM/giphy.gif";
      break;
    default:
      src = "https://media.giphy.com/media/Il9SJMOln1gyY/giphy.gif";
  }

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <img src={src} alt="Stitch Decoration" className="w-full h-full object-contain" />
    </div>
  );
};

export default StitchDecoration;