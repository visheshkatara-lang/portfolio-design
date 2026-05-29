import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

export default function AtmosphereSlider() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAutoActive, setIsAutoActive] = useState<boolean>(true);
  const autoDirection = useRef<number>(0.2); // Gentle sweep increment

  // Gentle auto sweep animation that stops once the user interacts
  useEffect(() => {
    if (!isAutoActive) return;

    let animFrame: number;
    const update = () => {
      setSliderPos(prev => {
        let next = prev + autoDirection.current;
        if (next > 75) {
          autoDirection.current = -0.15; // slow turn back
        } else if (next < 25) {
          autoDirection.current = 0.15;
        }
        return next;
      });
      animFrame = requestAnimationFrame(update);
    };

    animFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animFrame);
  }, [isAutoActive]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAutoActive(false); // Kill auto-pan on manual drag
    setSliderPos(Number(e.target.value));
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full select-none overflow-hidden"
    >
      {/* 1. Underlying Base: DAY IMAGE (day mode scenery) */}
      <img
        src="/input_file_3.png"
        alt="Creative Workspace - Day View"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-102 filter brightness-[0.95] contrast-[1.05] transition-transform duration-700 hover:scale-105"
        referrerPolicy="no-referrer"
      />

      {/* 2. Top Layer (Clipped): NIGHT IMAGE (night mode scenery) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-75"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <img
          src="/input_file_4.png"
          alt="Creative Workspace - Night View"
          className="absolute inset-0 w-full h-full object-cover scale-102 filter brightness-[0.95] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* 3. Cinematic Color Gradients overlay to blend with Geometric Balance Theme */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/30 z-0 pointer-events-none" />
      
      {/* 4. Sliding Divider & Handle Graphics */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-primary/40 pointer-events-none z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-[45%] -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/80 border border-primary/40 shadow-2xl flex items-center justify-center pointer-events-none backdrop-blur-md">
          {sliderPos < 50 ? (
            <Sun className="w-4 h-4 text-[#FAC775] animate-spin-slow" />
          ) : (
            <Moon className="w-4 h-4 text-blue-300" />
          )}
        </div>
      </div>

      {/* 5. Invisible native range slider for robust touch & drag interactions */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={handleSliderChange}
        className="absolute inset-x-0 w-full h-full opacity-0 hover:cursor-ew-resize z-25"
        style={{ margin: 0 }}
      />

      {/* Floating Indicators of active hemisphere */}
      <div className="absolute top-20 right-6 z-20 hidden md:flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest bg-black/60 border border-white/5 py-1.5 px-3 rounded-full backdrop-blur-sm shadow-lg">
        <span className={sliderPos < 50 ? "text-[#FAC775]" : "text-gray-500"}>DAY</span>
        <span className="text-white/10">|</span>
        <span className={sliderPos >= 50 ? "text-blue-300" : "text-gray-500"}>NIGHT</span>
      </div>

      {/* Tiny hint at the bottom right of the hero frame */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-1.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[#E1E0CC]/50 bg-black/40 px-2.5 py-1 rounded border border-white/5 select-none animate-pulse">
        <Sparkles className="w-3 h-3 text-primary animate-bounce mr-1" />
        Drag across screen to set time of day
      </div>
    </div>
  );
}
