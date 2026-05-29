import { motion } from 'motion/react';

export function MarqueeTicker() {
  const items = [
    'DEMAND GENERATION',
    'MARKETING AUTOMATION',
    'BRAND COMMUNICATIONS',
    'EVENT MARKETING',
    'SEO & SEM',
    'MARKETING ANALYTICS',
    'AI WORKFLOWS',
    'PAID MEDIA',
    'GTM STRATEGY',
    'FIELD MARKETING',
  ];

  const multipliedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-primary py-3 md:py-4 -rotate-1 select-none z-10 border-y border-black/20 font-sans">
      <motion.div
        className="flex whitespace-nowrap gap-12 text-[10px] sm:text-xs tracking-[0.15em] text-black font-bold"
        animate={{ x: [0, -800] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 25,
        }}
      >
        {multipliedItems.map((item, idx) => (
          <span key={idx} className="flex items-center gap-6">
            <span>{item}</span>
            <span className="text-black/30">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
