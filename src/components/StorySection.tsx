import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { STORY_PHASES } from '../data';

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="story" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 scroll-mt-20">
      <div 
        ref={containerRef} 
        className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-primary/20 pb-4"
      >
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-[#E1E0CC]"
          initial={{ opacity: 0, x: -30 }}
          animate={isHeadingInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          THE STORY
        </motion.h2>
        <motion.span 
          className="text-xs font-mono tracking-widest text-primary/60 mt-2 md:mt-0"
          initial={{ opacity: 0 }}
          animate={isHeadingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          03 / PROFESSIONAL ARC
        </motion.span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {STORY_PHASES.map((phase, idx) => {
          const isActive = phase.active; // Phase 2 is the default active scale phase
          const isHovered = hoveredIndex === idx;
          const displayGlow = isHovered || (hoveredIndex === null && isActive);

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative p-8 sm:p-10 rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between h-[360px] ${
                displayGlow 
                  ? 'bg-[#111111] border-primary/30 shadow-2xl shadow-primary/5' 
                  : 'bg-[#101010] border-white/5'
              }`}
            >
              {/* Giant Phase Number Overlay */}
              <div 
                className={`absolute right-6 top-2 text-[8rem] sm:text-[10rem] font-bold font-sans select-none tracking-tighter leading-none transition-colors duration-500 ${
                  displayGlow ? 'text-primary/5' : 'text-white/[0.02]'
                }`}
              >
                {phase.num}
              </div>

              <div className="relative z-10">
                <div className="text-xs font-mono tracking-widest text-[#D85A30] uppercase mb-4 font-semibold">
                  {phase.phase}
                </div>
                
                <h3 className={`text-2xl sm:text-3xl font-bold font-sans tracking-tight mb-4 transition-colors duration-300 ${
                  displayGlow ? 'text-primary' : 'text-[#E1E0CC]'
                }`}>
                  {phase.title}
                </h3>
              </div>

              <p className="relative z-10 text-sm sm:text-base text-gray-400 leading-relaxed font-sans max-w-xs">
                {phase.body}
              </p>

              {/* Infinite ambient status lines */}
              {isActive && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FAC775] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FAC775]"></span>
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#FAC775] uppercase">
                    SCALE EXPERT
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
