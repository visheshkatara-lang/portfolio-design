import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Menu, X } from 'lucide-react';
import { WordsPullUp, WordsPullUpMultiStyle, AnimatedLetter, AnimatedWord, MultilingualName } from './components/MotionComponents';
import { MarqueeTicker } from './components/MarqueeTicker';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import StackSection from './components/StackSection';
import ContactSection from './components/ContactSection';
import MarketingGames from './components/MarketingGames';
import InteractiveHighlights from './components/InteractiveHighlights';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // References for scrolling to sections
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Scroll logic for Section 2 (About) text reveal
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutSectionRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const aboutIntroText = "Over the last two years, I have worked with international markets, managed large-scale exhibitions, and built end-to-end marketing systems using automation and AI tools. Together with global teams, I have created work that performs both on digital dashboards and in real-world environments.";
  const aboutWords = aboutIntroText.split(' ');

  // Framer-motion options for general section fade ins
  const featuresHeaderRef = useRef<HTMLDivElement>(null);
  const isFeaturesHeaderInView = useInView(featuresHeaderRef, { once: true, margin: '-100px' });

  // Staggered trigger for Section 3 features cards
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const isFeaturesContainerInView = useInView(featuresContainerRef, { once: true, margin: '-100px' });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#E1E0CC] selection:bg-primary selection:text-black custom-scrollbar overflow-x-hidden font-sans relative">
      
      {/* SECTION 1: HERO */}
      <section 
        ref={heroRef}
        className="h-screen w-full p-4 md:p-5 relative select-none"
      >
        <div className="w-full h-full relative rounded-[2.5rem] overflow-hidden bg-[#080808] border border-white/5">
          
          {/* Background Video */}
          <video 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
            autoPlay 
            loop 
            muted 
            playsInline
            onLoadedMetadata={(e) => { e.currentTarget.muted = true; }}
            ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-85 pointer-events-none"
          />

          {/* Cinematic Geometric Gradients */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-black/20 opacity-80 z-0 pointer-events-none" />

          {/* Noise Overlay */}
          <div className="absolute inset-0 noise-overlay opacity-[0.4] mix-blend-overlay pointer-events-none z-10" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40 z-10 pointer-events-none" />



          {/* Desktop Navbar - Hidden on Mobile */}
          <nav className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 z-30 bg-black px-6 sm:px-10 py-3 rounded-b-[2rem] border-x border-b border-white/10 shadow-2xl backdrop-blur-md">
            <ul className="flex items-center gap-3 sm:gap-6 md:gap-10 font-sans font-bold uppercase tracking-[0.2em] text-[10px] sm:text-[11px]">
              <li>
                <button 
                  onClick={() => scrollToSection('work')}
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  className="hover:text-[#E1E0CC] transition-colors duration-150 cursor-pointer"
                >
                  Work
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('projects')}
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  className="hover:text-[#E1E0CC] transition-colors duration-150 cursor-pointer"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('education')}
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  className="hover:text-[#E1E0CC] transition-colors duration-150 cursor-pointer"
                >
                  Education
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('stack')}
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  className="hover:text-[#E1E0CC] transition-colors duration-150 cursor-pointer"
                >
                  Stack
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('games')}
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  className="hover:text-primary transition-colors duration-150 cursor-pointer text-primary/80"
                >
                  Playground
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  className="hover:text-[#E1E0CC] transition-colors duration-150 cursor-pointer text-[#D85A30]"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden absolute top-6 right-6 z-40">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 bg-black/85 hover:bg-black border border-white/10 hover:border-white/25 text-[#E1E0CC] hover:text-white rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-pointer flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Full Screen Menu Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden absolute inset-0 z-30 bg-[#080808]/95 backdrop-blur-2xl px-6 py-12 flex flex-col justify-between"
              >
                {/* Visual grid structure inside menu matching portfolio aesthetic */}
                <div className="flex flex-col gap-6 mt-14">
                  <span className="text-[10px] font-mono tracking-widest text-[#E1E0CC]/40 uppercase border-b border-white/5 pb-2">
                    Navigation Menu
                  </span>
                  <ul className="flex flex-col gap-5 font-sans font-bold uppercase tracking-[0.15em] text-xl">
                    {[
                      { id: 'work', label: 'Work', colorClass: 'text-[#E1E0CC]' },
                      { id: 'projects', label: 'Projects', colorClass: 'text-[#E1E0CC]' },
                      { id: 'education', label: 'Education', colorClass: 'text-[#E1E0CC]' },
                      { id: 'stack', label: 'Stack', colorClass: 'text-[#E1E0CC]' },
                      { id: 'games', label: 'Playground', colorClass: 'text-primary' },
                      { id: 'contact', label: 'Contact', colorClass: 'text-[#D85A30]' }
                    ].map((item, idx) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 + 0.1, duration: 0.4 }}
                      >
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            // small delay for nice state closing transition before scroll
                            setTimeout(() => scrollToSection(item.id), 200);
                          }}
                          className={`hover:text-white transition-colors duration-200 cursor-pointer text-left w-full ${item.colorClass}`}
                        >
                          {item.label}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-white/5 pt-6 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono tracking-widest text-primary/80">
                    VISHESH KATARA
                  </span>
                  <span className="text-[9px] font-mono text-[#E1E0CC]/30">
                    © 2026 BRAND & GROWTH STRATEGY
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Content (Clean, space-efficient left-aligned stack to prevent video occlusion) */}
          <div className="absolute bottom-8 left-8 sm:left-12 max-w-xs sm:max-w-sm md:max-w-md z-20 flex flex-col items-start gap-3 sm:gap-4 select-none text-left">
            <div>
              <MultilingualName 
                showAsterisk={true}
                className="text-4xl sm:text-5xl md:text-6xl font-medium leading-[0.95] tracking-[-0.04em] text-[#E1E0CC] uppercase mb-1.5"
              />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary/70 text-[11px] sm:text-xs leading-relaxed font-sans max-w-[290px]"
              >
                Brand, growth and events executive combining digital strategy with field-level execution. Managed 8+ international markets and engineered automated lead acquisition pipelines.
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => scrollToSection('contact')}
              className="mt-1 bg-primary text-black rounded-full py-1.5 px-3 sm:py-2 sm:px-4 flex items-center gap-2 font-sans font-bold text-[10px] sm:text-xs group transition-all duration-300 hover:bg-[#F1EFE8] shadow-md cursor-pointer"
            >
              <span>GET IN TOUCH</span>
              <div className="bg-black rounded-full w-5.5 h-5.5 sm:w-6 sm:h-6 flex items-center justify-center text-primary group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.button>
          </div>

        </div>
      </section>
      {/* SECTION 3: FEATURES GRID (Studio-Grade Workflows swap) */}
      <section 
        ref={featuresRef}
        className="min-h-screen bg-black py-24 px-4 md:px-8 relative transition-all scroll-mt-20 overflow-hidden"
      >
        {/* Background Milky Way Image Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img 
            src="/src/assets/images/milky_way_sky_1779704825061.png" 
            alt="Milky Way Background" 
            className="w-full h-full object-cover opacity-50 mix-blend-screen"
            referrerPolicy="no-referrer"
          />
          {/* Vignette overlays for deep immersive space and prime legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black to-transparent" />
        </div>

        {/* Subtle Background Noise Overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.12] mix-blend-overlay pointer-events-none z-10" />

        {/* Section Header */}
        <div ref={featuresHeaderRef} className="max-w-4xl mx-auto text-center mb-16 relative z-10 flex flex-col items-center gap-3">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#FAC775]/90 uppercase border border-[#FAC775]/20 px-3 py-1 rounded-full bg-[#FAC775]/5 select-none animate-pulse">
            Scale Architecture
          </span>
          <WordsPullUpMultiStyle
            segments={[
              { text: "Studio-grade ", className: "text-[#E1E0CC] font-bold tracking-tight" },
              { text: "workflows ", className: "italic font-serif text-[#FAC775] font-normal" },
              { text: "engineered ", className: "text-[#E1E0CC] font-medium" },
              { text: "for ", className: "text-[#E1E0CC]/90 font-light" },
              { text: "exponential ", className: "text-[#D85A30] font-extrabold underline decoration-[#D85A30]/40 underline-offset-4" },
              { text: "growth.", className: "italic font-serif text-[#FAC775] font-bold" }
            ]}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans text-center"
          />
          <p className="text-[#E1E0CC]/85 font-sans text-sm sm:text-base md:text-lg mt-4 max-w-xl text-center leading-relaxed">
            Built for pure scaling, powered by <span className="text-[#FAC775] font-mono text-xs border border-[#FAC775]/30 px-2 py-0.5 rounded bg-[#FAC775]/10">AI-driven orchestration</span>.
          </p>
        </div>

        {/* 4-Column Card Grid */}
        <div 
          ref={featuresContainerRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:h-[480px] relative z-10"
        >
          {/* CARD 1: Video Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isFeaturesContainerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] overflow-hidden relative border border-white/5 h-[340px] md:h-auto"
          >
            <video 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay 
              loop 
              muted 
              playsInline
              onLoadedMetadata={(e) => { e.currentTarget.muted = true; }}
              ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
              className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-6 left-6 z-20">
              <p className="text-lg font-bold font-sans text-[#E1E0CC]">
                "I take brands from screen to stage."
              </p>
            </div>
          </motion.div>

          {/* CARD 2: Project Storyboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isFeaturesContainerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] p-6 sm:p-8 relative overflow-hidden bg-[#101010] border border-white/5 flex flex-col justify-between h-[340px] md:h-auto hover:border-primary/20 hover:shadow-lg transition-all"
          >
            {/* Background Video (Automation & AI Workflows) */}
            <video 
              src="/automation-ai-bg.mp4"
              autoPlay 
              loop 
              muted 
              playsInline
              onLoadedMetadata={(e) => { e.currentTarget.muted = true; }}
              ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 pointer-events-none"
            />
            
            {/* Lighter, high-density cinematic gradient overlay to provide perfect contrast and legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80 z-10 pointer-events-none" />

            {/* Premium, readable soft white typography positioned on top */}
            <div className="z-20 relative flex flex-col justify-between h-full w-full">
              <div>
                <h4 className="text-lg font-bold font-sans text-white mb-4 tracking-tight drop-shadow-sm">
                  Automation &amp; AI Workflows
                </h4>
                <ul className="space-y-2.5">
                  <li className="flex gap-2 items-start text-xs">
                    <Check className="w-4 h-4 text-[#FAC775] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 font-medium drop-shadow-sm">n8n &amp; Make workflows cut time by 40%</span>
                  </li>
                  <li className="flex gap-2 items-start text-xs">
                    <Check className="w-4 h-4 text-[#FAC775] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 font-medium drop-shadow-sm">Personalized auto email cadences</span>
                  </li>
                  <li className="flex gap-2 items-start text-xs">
                    <Check className="w-4 h-4 text-[#FAC775] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 font-medium drop-shadow-sm">LinkedIn automated growth engines</span>
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={() => scrollToSection('stack')}
                className="mt-4 flex items-center justify-between text-xs font-mono tracking-wider text-primary hover:underline hover:text-white transition-all text-left group w-full"
              >
                <span className="drop-shadow-sm">LEARN MORE</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white/50" />
              </button>
            </div>
          </motion.div>

          {/* CARD 3: Smart Critiques */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isFeaturesContainerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] p-6 sm:p-8 relative overflow-hidden bg-[#101010] border border-white/5 flex flex-col justify-between h-[340px] md:h-auto hover:border-primary/20 hover:shadow-lg transition-all"
          >
            {/* Background Video (Airplane Flight over Clouds) */}
            <video 
              src="/event-ops-bg.mp4"
              autoPlay 
              loop 
              muted 
              playsInline
              onLoadedMetadata={(e) => { e.currentTarget.muted = true; }}
              ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 pointer-events-none"
            />
            
            {/* Lighter, high-density cinematic gradient overlay to provide perfect contrast and legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80 z-10 pointer-events-none" />

            {/* Premium, readable soft white typography positioned on top */}
            <div className="z-20 relative flex flex-col justify-between h-full w-full">
              <div>
                <h4 className="text-lg font-bold font-sans text-white mb-4 tracking-tight drop-shadow-sm">
                  International Event Ops
                </h4>
                <ul className="space-y-2.5">
                  <li className="flex gap-2 items-start text-xs">
                    <Check className="w-4 h-4 text-[#FAC775] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 font-medium drop-shadow-sm">Managed ₹3Cr+ event portfolios</span>
                  </li>
                  <li className="flex gap-2 items-start text-xs">
                    <Check className="w-4 h-4 text-[#FAC775] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 font-medium drop-shadow-sm">Trade shows across 4 continents</span>
                  </li>
                  <li className="flex gap-2 items-start text-xs">
                    <Check className="w-4 h-4 text-[#FAC775] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 font-medium drop-shadow-sm">Booth logistics &amp; live demos</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => scrollToSection('work')}
                className="mt-4 flex items-center justify-between text-xs font-mono tracking-wider text-primary hover:underline hover:text-white transition-all text-left group w-full"
              >
                <span className="drop-shadow-sm">LEARN MORE</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white/50" />
              </button>
            </div>
          </motion.div>

          {/* CARD 4: Performance Marketing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isFeaturesContainerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] p-6 sm:p-8 relative overflow-hidden bg-[#101010] border border-white/5 flex flex-col justify-between h-[340px] md:h-auto hover:border-primary/20 hover:shadow-lg transition-all"
          >
            {/* Background Video (Performance Marketing) */}
            <video 
              src="/marketing-bg.mp4"
              autoPlay 
              loop 
              muted 
              playsInline
              onLoadedMetadata={(e) => { e.currentTarget.muted = true; }}
              ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 pointer-events-none"
            />
            
            {/* Lighter, high-density cinematic gradient overlay to provide perfect contrast and legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80 z-10 pointer-events-none" />

            {/* Premium, readable soft white typography positioned on top */}
            <div className="z-20 relative flex flex-col justify-between h-full w-full">
              <div>
                <h4 className="text-lg font-bold font-sans text-white mb-4 tracking-tight drop-shadow-sm">
                  Performance Marketing
                </h4>
                <ul className="space-y-2.5">
                  <li className="flex gap-2 items-start text-xs">
                    <Check className="w-4 h-4 text-[#FAC775] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 font-medium drop-shadow-sm">112% organic search traffic growth</span>
                  </li>
                  <li className="flex gap-2 items-start text-xs">
                    <Check className="w-4 h-4 text-[#FAC775] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 font-medium drop-shadow-sm">Managed ₹15L/mo pay-per-click ads</span>
                  </li>
                  <li className="flex gap-2 items-start text-xs">
                    <Check className="w-4 h-4 text-[#FAC775] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 font-medium drop-shadow-sm">GA4 dashboards &amp; attribution</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => scrollToSection('stack')}
                className="mt-4 flex items-center justify-between text-xs font-mono tracking-wider text-primary hover:underline hover:text-white transition-all text-left group w-full"
              >
                <span className="drop-shadow-sm">LEARN MORE</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white/50" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section 
        ref={aboutRef}
        className="bg-black py-28 px-4 md:px-8 flex justify-center items-center relative overflow-hidden"
      >
        {/* Decorative ambient backdrop flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FAC775]/5 rounded-full blur-[140px] pointer-events-none z-0" />
        
        {/* Subtle geometric outline for visual context */}
        <div className="absolute -top-[10%] left-[-5%] w-[40%] aspect-square border border-white/[0.02] rounded-full pointer-events-none" />
        <div className="absolute -bottom-[10%] right-[5%] w-[40%] aspect-square border border-white/[0.02] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, borderColor: "rgba(222, 219, 200, 0.15)", boxShadow: "0 25px 60px -15px rgba(222, 219, 200, 0.04)" }}
          className="bg-[#101010]/95 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-14 md:p-20 text-center max-w-6xl w-full border border-white/5 shadow-3xl relative overflow-hidden transition-all duration-500 z-10"
        >
          {/* Subtle inside gradient reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-transparent pointer-events-none" />
          
          {/* Top Label */}
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 0.8, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] sm:text-xs font-mono tracking-widest text-[#FAC775] uppercase block mb-8 font-bold"
          >
            BRAND &amp; GROWTH PHILOSOPHY
          </motion.span>

          {/* Main Heading Segment */}
          <div className="mb-12">
            <WordsPullUpMultiStyle 
              segments={[
                { text: "I am Vishesh Katara, ", className: "font-normal text-[#E1E0CC]" },
                { text: "a digital marketing expert. ", className: "italic font-serif text-primary" },
                { text: "I build end-to-end marketing systems using automation and AI workloads.", className: "font-normal text-[#E1E0CC]" }
              ]}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[1.1] sm:leading-[1.05] tracking-tight justify-start text-left"
              style={{ textAlign: 'left' }}
            />
          </div>

          {/* Body paragraph with scrolling word reveal */}
          <div 
            ref={aboutSectionRef}
            className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed pt-8 font-sans border-t border-white/5"
          >
            <p className="flex flex-wrap justify-center text-center">
              {aboutWords.map((word, index) => (
                <AnimatedWord 
                  key={index}
                  word={word}
                  index={index}
                  total={aboutWords.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </p>
          </div>

        </motion.div>
      </section>

      {/* INFINITE MARQUEE BAND */}
      <MarqueeTicker />

      {/* INTERACTIVE HIGH-FIDELITY HIGHLIGHTS SECTION */}
      <InteractiveHighlights />

      {/* PORTFOLIO SECTIONS WITH REAL VK DATA */}
      <ExperienceSection />

      <MarketingGames />
      
      <ProjectsSection />

      <EducationSection />

      <StackSection />

      <ContactSection />

      {/* FOOTER */}
      <footer className="bg-black py-8 border-t border-white/5 border-dashed">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1.5 font-sans font-extrabold text-[#E1E0CC] tracking-widest text-lg select-none">
            <span>VK</span>
            <span className="text-[#D85A30]">/</span>
          </div>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest text-center">
            © 2026 Vishesh Katara — GHAZIABAD, DELHI NCR
          </p>
        </div>
      </footer>

    </div>
  );
}
