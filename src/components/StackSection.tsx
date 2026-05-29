import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Image as ImageIcon, CheckCircle, ExternalLink, HelpCircle } from 'lucide-react';
import { STACK_DATA } from '../data';

export default function StackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInViewRef(containerRef);
  const [showFullMap, setShowFullMap] = useState<boolean>(false);

  return (
    <section id="stack" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 scroll-mt-20">
      <div 
        ref={containerRef} 
        className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-primary/20 pb-4"
      >
        <div>
          <span className="text-xs font-mono tracking-widest text-primary/60 block mb-1">
            05 / TOOLS &amp; TECH
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-[#E1E0CC]">
            THE STACK
          </h2>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={() => setShowFullMap(!showFullMap)}
            className="text-xs font-mono tracking-wider text-black bg-primary px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-[#F1EFE8] transition-all cursor-pointer shadow-lg"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            {showFullMap ? "HIDE VISUAL TOOL MAP" : "VIEW FULL LOGO LANDSCAPE"}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showFullMap ? (
          <motion.div
            key="logo-map"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mb-10 w-full rounded-3xl border border-white/10 bg-[#0f0f0f] p-4 flex flex-col items-center gap-4"
          >
            <div className="text-center max-w-lg mt-2">
              <span className="text-[10px] font-mono tracking-widest text-[#D85A30] font-bold uppercase block mb-1">GROWTH ECOSYSTEM</span>
              <p className="text-xs text-gray-400">
                Below is the full custom graphic map of my tech stack. I have hands-on, end-to-end campaign and workflow setup expertise in each segment.
              </p>
            </div>
            
            <div className="relative w-full overflow-hidden rounded-2xl bg-[#141414] border border-white/5 flex justify-center items-center">
              <img 
                src="/input_file_2.png" 
                alt="Growth Stack Master Ecosystem Map"
                className="max-h-[700px] w-auto object-contain p-2 hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex flex-col border border-white/5 rounded-2xl overflow-hidden bg-[#101010] divide-y divide-white/5 shadow-2xl">
        {STACK_DATA.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-stretch group animate-fade-in"
          >
            {/* Left Header - Label */}
            <div className="md:w-64 bg-black/40 px-6 py-6 md:py-8 border-b md:border-b-0 md:border-r border-white/5 flex items-center justify-between md:justify-start gap-3 flex-shrink-0 transition-colors duration-300 group-hover:bg-black/60">
              <span className="text-xs sm:text-sm font-mono tracking-[0.14em] text-primary/70 uppercase font-bold group-hover:text-primary transition-colors duration-300">
                {cat.label}
              </span>
              <Cpu className="w-4 h-4 text-primary/20 group-hover:text-primary/60 group-hover:rotate-12 transition-all duration-300" />
            </div>

            {/* Right Flow - Pills */}
            <div className="flex-1 px-6 py-6 sm:py-8 flex flex-wrap gap-2 md:gap-3 items-center bg-transparent">
              {cat.pills.map((pill) => (
                <ToolPill key={pill} pill={pill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Helper to resolve clean simple-icons slugs and URLs
const getLogoUrl = (name: string) => {
  const mapping: { [key: string]: string } = {
    'Buffer': 'buffer',
    'Hootsuite': 'hootsuite',
    'Sprout Social': 'sproutsocial',
    'ChatGPT': 'chatgpt',
    'Claude': 'claude',
    'Jasper': 'openai', // Fallback to OpenAI as engine
    'Writesonic': 'openai', // Fallback to OpenAI
    'Perplexity': 'perplexity',
    'Figma': 'figma',
    'Canva': 'canva',
    'Adobe Express': 'adobe',
    'Ahrefs': 'ahrefs',
    'SEMrush': 'semrush',
    'Surfer': 'surfer',
    'Google Search Console': 'google', // Use canonical Google brand logo
    'Google Analytics': 'googleanalytics',
    'HubSpot': 'hubspot',
    'Mailchimp': 'mailchimp',
    'Apollo': 'apollographql', 
    'n8n': 'n8n',
    'Make': 'integromat', // Make.com's canonical brand asset is hosted under Integromat
    'Zapier': 'zapier'
  };

  const key = name.trim();
  const slug = mapping[key] || key.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `https://cdn.simpleicons.org/${slug}`;
};

// Elegant ToolPill with brand icon and error fallback
const ToolPill: React.FC<{ pill: string }> = ({ pill }) => {
  const [imgError, setImgError] = useState(false);
  const logoUrl = getLogoUrl(pill);

  // Return a beautiful category matching icon if img fails
  const getFallbackIcon = (name: string) => {
    const item = name.toLowerCase();
    
    // AI Content / Copywriting
    if (item.includes('chat') || item.includes('claude') || item.includes('jasper') || item.includes('writesonic') || item.includes('perplexity')) {
      return (
        <svg className="w-3.5 h-3.5 text-[#FAC775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      );
    }
    // No-Code & Automation
    if (item.includes('n8n') || item.includes('make') || item.includes('zapier')) {
      return (
        <svg className="w-3.5 h-3.5 text-[#D85A30]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12Z" />
          <path d="M22 6a2 2 0 0 0-2-2h-2" />
          <path d="M6 22a2 2 0 0 0 2-2v-2" />
          <path d="M18 14h2a2 2 0 0 0 2-2V8" />
        </svg>
      );
    }
    // Design & Creative
    if (item.includes('figma') || item.includes('canva') || item.includes('adobe')) {
      return (
        <svg className="w-3.5 h-3.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
          <path d="M12 8A4 4 0 1 0 12 16 A4 4 0 1 0 12 8Z" />
        </svg>
      );
    }
    // Default fallback dot / custom bullet
    return <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />;
  };

  return (
    <motion.span
      whileHover={{ scale: 1.04 }}
      className="px-4 py-2 text-xs font-mono tracking-wide rounded-full border border-white/10 text-gray-300 bg-white/[0.03] cursor-default transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 flex items-center gap-2.5 shadow-sm"
    >
      {!imgError ? (
        <img
          src={logoUrl}
          alt={`${pill} logo`}
          className="w-4 h-4 object-contain filter brightness-105 contrast-105 saturate-105"
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        getFallbackIcon(pill)
      )}
      <span>{pill}</span>
    </motion.span>
  );
};

// Inline small hook because useInView is loaded from motion/react
function useInViewRef(ref: React.RefObject<HTMLDivElement>) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return isInView;
}
