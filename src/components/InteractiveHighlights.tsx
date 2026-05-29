import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Sparkles, Users2, Globe, Award, TrendingUp, HelpCircle } from 'lucide-react';

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
  trigger?: boolean;
}

function CountUp({ to, duration = 1200, suffix = "", trigger = true }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = to;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration;
    const startTime = performance.now();
    let animationFrame: number;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / totalMiliseconds, 1);
      
      // Smooth easeOutQuad
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * (end - start) + start);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [to, duration, trigger]);

  return <span>{count}{suffix}</span>;
}

// ============================================
// ANIMATED INTERACTIVE SUB-COMPONENTS
// ============================================

// CARD 1: Interactive Growth Chart Component
function GrowthChartAnimation({ isHovered }: { isHovered: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.6 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    // Curve equation simulating beautiful growth: y = (1 - x^2)
    const y = 0.85 - (0.7 * Math.pow(x, 1.8));
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]/90 flex items-end"
    >
      {/* Dynamic Grid Background with parallax */}
      <div 
        className="absolute inset-0 opacity-10 transition-transform duration-500"
        style={{
          backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          transform: isHovered ? `scale(1.05) translate(${(mousePos.x - 0.5) * 10}px, ${(mousePos.y - 0.5) * 10}px)` : 'scale(1)'
        }}
      />

      <svg className="w-full h-full absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAC775" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FAC775" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#D85A30" />
            <stop offset="100%" stopColor="#FAC775" />
          </linearGradient>
        </defs>

        {/* Backdrop Area Fill */}
        <motion.path 
          d={`M 0 160 Q 70 ${140 - (mousePos.x * 40)} 150 ${110 - (mousePos.x * 60)} T 300 ${40 + (mousePos.y * 30)} L 300 240 L 0 240 Z`}
          fill="url(#chartGradient)"
          className="transition-all duration-300 ease-out"
        />

        {/* Dynamic Connected Bezier Path */}
        <motion.path 
          d={`M 0 160 Q 70 ${140 - (mousePos.x * 40)} 150 ${110 - (mousePos.x * 60)} T 300 ${40 + (mousePos.y * 30)}`}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />

        {/* Glowing Anchor Point */}
        <motion.g
          animate={{
            x: mousePos.x * 260 + 20,
            y: mousePos.y * 160 + 40,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          <circle r="12" fill="#FAC775" opacity="0.25" className="animate-ping" />
          <circle r="7" fill="#FAC775" />
          <circle r="3.5" fill="#FFFFFF" />
        </motion.g>
      </svg>

      {/* Dynamic interactive HUD helper */}
      <div className="absolute top-4 left-6 z-10 pointer-events-none">
        <span className="text-[9px] font-mono tracking-wider text-[#FAC775]/70 bg-white/5 border border-white/10 rounded px-2 py-0.5">
          ROI DYNAMICS: {Math.round(mousePos.x * 120)}%
        </span>
      </div>
    </div>
  );
}

// CARD 2: Interactive Gravity Field Particles
function LeadsFunnelAnimation({ isHovered }: { isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Create randomized particle points
    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.6 + 0.3,
        color: Math.random() > 0.4 ? '#FAC775' : '#D85A30'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw elegant container target center
      const centerX = width / 2;
      const centerY = height / 2 + 20;

      // Draw database database graphic
      ctx.strokeStyle = 'rgba(216, 90, 48, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, isHovered ? 45 : 35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = isHovered ? 'rgba(250, 199, 117, 0.08)' : 'rgba(250, 199, 117, 0.02)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, isHovered ? 25 : 18, 0, Math.PI * 2);
      ctx.fill();

      // Loop & compute particle updates with cursor gravity or flow
      particles.forEach(p => {
        // Standard wander
        p.x += p.vx;
        p.y += p.vy;

        // Bounce from boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Apply interactive micro gravity to either cursor position or center depending on hover state
        let targetX = centerX;
        let targetY = centerY;

        if (isHovered && cursorPos.x > 0) {
          targetX = cursorPos.x;
          targetY = cursorPos.y;
        }

        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Funnel attraction rule
        if (distance < 150) {
          const force = (150 - distance) / 1200;
          p.vx += (dx / distance) * force;
          p.vy += (dy / distance) * force;
          
          // Cap velocity
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 2.8) {
            p.vx = (p.vx / speed) * 2.8;
            p.vy = (p.vy / speed) * 2.8;
          }
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = isHovered ? 6 : 0;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Trace subtle connection line if hovered
        if (isHovered && distance < 75) {
          ctx.strokeStyle = `rgba(250, 199, 117, ${0.15 * (1 - distance / 75)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(targetX, targetY);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Handle Resize
    const resizeObserver = new ResizeObserver(() => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isHovered, cursorPos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCursorPos({ x: -1000, y: -1000 })}
      className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]/90 flex items-center justify-center cursor-crosshair"
    >
      <canvas ref={canvasRef} className="w-full h-full block absolute inset-0" />
      <div className="absolute bottom-4 right-6 z-10 pointer-events-none">
        <span className="text-[9px] font-mono tracking-wider text-[#D85A30]/70 bg-white/5 border border-white/10 rounded px-2 py-0.5">
          {isHovered ? "PULLING INCOMING LEADS" : "HOVER TO ATTRACT"}
        </span>
      </div>
    </div>
  );
}

// CARD 3: Geocoordinates India Hub concentric waves Map
function RegionHubsAnimation({ isHovered }: { isHovered: boolean }) {
  const [activeHub, setActiveHub] = useState<number | null>(null);

  // Simulated coordinate network mapping NCR, Pune, Mumbai, Ahmedabad, South
  const hubs = [
    { x: '45%', y: '32%', name: 'Delhi NCR', label: '180+ Attendees' },
    { x: '35%', y: '68%', name: 'Pune Hub', label: '140+ Attendees' },
    { x: '32%', y: '62%', name: 'Mumbai HQ', label: '110+ Attendees' },
    { x: '25%', y: '50%', name: 'Ahmedabad', label: '80+ Attendees' },
    { x: '55%', y: '82%', name: 'South India', label: '90+ Attendees' }
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]/90 flex items-center justify-center">
      {/* Abstract outline shape reminiscent of geographic field */}
      <svg className="w-full h-[220px] max-w-[240px] opacity-15" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 50 10 L 80 30 L 90 60 L 70 85 L 50 95 L 30 85 L 10 60 L 20 30 Z" stroke="#E1E0CC" strokeWidth="0.77" />
        <path d="M 50 25 L 70 40 L 75 60 L 60 75 L 50 80 L 40 75 L 25 60 L 30 40 Z" stroke="#E1E0CC" strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

      {/* Hub dots coordinates */}
      {hubs.map((hub, i) => (
        <div 
          key={i} 
          className="absolute z-10"
          style={{ left: hub.x, top: hub.y }}
          onMouseEnter={() => setActiveHub(i)}
          onMouseLeave={() => setActiveHub(null)}
        >
          <div className="relative flex items-center justify-center cursor-pointer">
            {/* Concentric rings */}
            <span className={`absolute inline-flex rounded-full bg-[#FAC775] transition-all duration-1000 ${
              isHovered || activeHub === i ? 'h-8 w-8 opacity-25 animate-ping' : 'h-3 w-3 opacity-0'
            }`} />
            <span className={`absolute inline-flex rounded-full bg-[#D85A30] transition-all duration-700 ${
              activeHub === i ? 'h-12 w-12 opacity-15 animate-ping' : 'h-0 w-0'
            }`} />

            {/* Core point */}
            <div className={`rounded-full transition-all duration-300 ${
              activeHub === i || (isHovered && i === 1)
                ? 'w-3 h-3 bg-[#FAC775] scale-125 border border-white' 
                : 'w-2 h-2 bg-[#D85A30] scale-100'
            }`} />

            {/* Micro HUD popup badge */}
            <AnimatePresence>
              {(activeHub === i || (isHovered && i === 1 && activeHub === null)) && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: -28, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-5 bg-[#141414] border border-[#FAC775]/20 px-2.5 py-1 rounded-lg text-center shadow-lg whitespace-nowrap z-20 pointer-events-none"
                >
                  <p className="text-[10px] font-sans font-extrabold text-white">{hub.name}</p>
                  <p className="text-[8px] font-mono text-[#FAC775]">{hub.label}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
      
      <div className="absolute top-4 right-6 z-10 pointer-events-none">
        <span className="text-[9px] font-mono tracking-wider text-[#FAC775]/70 bg-white/5 border border-white/10 rounded px-2 py-0.5">
          STAKEHOLDER MAP
        </span>
      </div>
    </div>
  );
}

// CARD 4: Interactive global routes mapping India to regions
function GlobalConnectorAnimation({ isHovered }: { isHovered: boolean }) {
  const [activeCountry, setActiveCountry] = useState<number | null>(null);

  const locations = [
    { name: 'Iran', arc: 'M 100 120 Q 90 80 75 55', flag: '🇮🇷' },
    { name: 'Italy', arc: 'M 100 120 Q 75 75 40 45', flag: '🇮🇹' },
    { name: 'Turkey', arc: 'M 100 120 Q 80 80 55 45', flag: '🇹🇷' },
    { name: 'Russia', arc: 'M 100 120 Q 105 60 115 25', flag: '🇷🇺' },
    { name: 'Morocco', arc: 'M 100 120 Q 55 90 20 70', flag: '🇲🇦' },
    { name: 'Nigeria', arc: 'M 100 120 Q 50 110 25 105', flag: '🇳🇬' }
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]/90 flex items-center justify-center">
      
      {/* Flight line tracks */}
      <svg className="w-[200px] h-[200px] opacity-80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {locations.map((loc, i) => {
          const isActive = activeCountry === i || (isHovered && activeCountry === null && i === 3);
          return (
            <g key={i}>
              {/* Target connection curve */}
              <motion.path 
                d={loc.arc}
                stroke={isActive ? '#FAC775' : 'rgba(255,255,255,0.06)'}
                strokeWidth={isActive ? '2' : '1'}
                strokeDasharray={isActive ? 'none' : '2 2'}
                className="transition-all duration-300"
              />
              
              {/* Bullet animation tracer along the vector path */}
              {isActive && (
                <motion.circle 
                  r="3.5" 
                  fill="#D85A30"
                  animate={{
                    offsetDistance: ["0%", "100%"]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    motionPath: `path('${loc.arc}')`
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Core center: INDIA */}
        <circle cx="100" cy="120" r="6" fill="#D85A30" />
        <circle cx="100" cy="120" r="1.5" fill="#FFFFFF" />
        <circle cx="100" cy="120" r="14" stroke="#FAC775" strokeWidth="1" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: '8s' }} />
      </svg>

      {/* Grid of country chips on hover */}
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-1 z-10">
        {locations.map((loc, i) => (
          <button
            key={i}
            onMouseEnter={() => setActiveCountry(i)}
            onMouseLeave={() => setActiveCountry(null)}
            className={`px-1.5 py-0.5 text-[9px] font-mono border rounded flex items-center gap-1 transition-all justify-center ${
              activeCountry === i 
                ? 'bg-[#FAC775] text-[#2c1a04] border-[#FAC775]' 
                : 'bg-black/40 text-gray-400 border-white/5 hover:border-white/20'
            }`}
          >
            <span>{loc.flag}</span>
            <span>{loc.name}</span>
          </button>
        ))}
      </div>
      
      <div className="absolute top-4 left-6 z-10 pointer-events-none">
        <span className="text-[9px] font-mono tracking-wider text-[#D85A30]/70 bg-white/5 border border-white/10 rounded px-2 py-0.5">
          FLIGHT ARCS: INDIA ORIGIN
        </span>
      </div>
    </div>
  );
}

// ============================================
// PRIMARY PARENT EXPORT SECTION
// ============================================
export default function InteractiveHighlights() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-105px' });

  // Hover states indexed for each of the stats cards
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stats = [
    {
      id: 'stat-experience',
      value: 2,
      suffix: '+',
      label: 'Years of Full-Stack B2B Marketing',
      description: 'Handling complete digital strategy, campaigns, paid ops & corporate lead generation workflows.',
      badge: 'B2B SCALEUP',
      accent: '#FAC775',
      animation: (hovered: boolean) => <GrowthChartAnimation isHovered={hovered} />
    },
    {
      id: 'stat-exhibitions',
      value: 100,
      suffix: '+',
      label: 'Qualified Leads from Field Events',
      description: 'Acquired at leading expos, fully tracked using custom on-site capture workflows.',
      badge: 'LEAD RETRIEVAL',
      accent: '#D85A30',
      animation: (hovered: boolean) => <LeadsFunnelAnimation isHovered={hovered} />
    },
    {
      id: 'stat-dealer-meets',
      value: 5,
      suffix: '',
      label: 'Dealer meets, 500+ attendees',
      description: 'Organised and executed 5 regional dealer conferences with top vendor coordination.',
      badge: 'ACTIVE ACTIVATION',
      accent: '#FAC775',
      animation: (hovered: boolean) => <RegionHubsAnimation isHovered={hovered} />
    },
    {
      id: 'stat-global',
      value: 8,
      suffix: '',
      label: 'International Markets Executed',
      description: 'Coordinated brand representation in Russia, Turkey, Iran, Italy, Nigeria, and Morocco.',
      badge: 'GLOBAL EXPANSION',
      accent: '#D85A30',
      animation: (hovered: boolean) => <GlobalConnectorAnimation isHovered={hovered} />
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#050505] border-y border-white/5 py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden select-none"
    >
      {/* Glowing backdrop elements */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-[#D85A30]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header content mapping VK's professional values */}
        <div className="text-center sm:text-left mb-16 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-primary font-bold uppercase">
                Proven Impact &amp; Metrics
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans tracking-tight text-[#E1E0CC] font-bold">
              THE HARD NUMBERS <span className="italic font-serif text-[#FAC775]">OF SCALE</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#E0DEC8]/60 font-mono tracking-wider max-w-sm text-left leading-relaxed">
            Combining on-ground field execution with dynamic vector automation pipelines to drive verified corporate conversions. Hover over any card to interact with the system live.
          </p>
        </div>

        {/* Bento Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const isHovered = hoveredCard === idx;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative h-[400px] rounded-[2rem] overflow-hidden border border-white/5 bg-[#0e0e0e] flex flex-col justify-between p-6 cursor-pointer shadow-3xl transition-all duration-300 hover:border-[#FAC775]/20 hover:shadow-[0_20px_50px_rgba(250,199,117,0.03)]"
              >
                {/* Embedded Interactive Vector Animation system */}
                {stat.animation(isHovered)}

                {/* Cover visual overlay to preserve baseline readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/92 opacity-90 pointer-events-none z-[1]" />

                {/* Small Badge */}
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#E1E0CC]/50 border border-white/10 rounded-full px-2.5 py-0.5 bg-[#101010]/90 backdrop-blur-sm group-hover:border-[#FAC775]/20 group-hover:text-primary transition-all duration-300">
                    {stat.badge}
                  </span>
                </div>

                {/* Numeric block aligned bottom */}
                <div className="relative z-10 mt-auto space-y-2.5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-sans tracking-tight font-extrabold text-[#E1E0CC] group-hover:text-primary transition-colors duration-300">
                      <CountUp to={stat.value} duration={1200} suffix={stat.suffix} trigger={inView} />
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-[13px] font-mono font-bold uppercase tracking-wider text-[#FAC775]">
                      {stat.label}
                    </h3>
                    <p className="text-[11px] font-sans text-[#E1E0CC]/60 group-hover:text-gray-300 transition-colors duration-300 leading-normal">
                      {stat.description}
                    </p>
                  </div>
                </div>

                {/* Glowing border outline bottom bar */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-primary rounded-full transition-all duration-300 group-hover:w-4/5 z-10" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
