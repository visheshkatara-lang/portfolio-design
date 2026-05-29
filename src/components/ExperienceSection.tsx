import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data';

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <motion.section 
      ref={sectionRef}
      id="work" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 scroll-mt-20"
    >
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-primary/20 pb-4">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-[#E1E0CC]"
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          EXPERIENCE
        </motion.h2>
        <motion.span 
          className="text-xs font-mono tracking-widest text-primary/60 mt-2 md:mt-0"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          01 / WORK HISTORY
        </motion.span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXPERIENCE_DATA.map((exp, index) => (
          <ExperienceCard key={exp.id} exp={exp} index={index} triggerInView={isInView} />
        ))}
      </div>
    </motion.section>
  );
}

const getCompanyLogoUrl = (companyName: string) => {
  const mapping: { [key: string]: string } = {
    'ManpraX Software': '/manprax-logo.svg', 
    'Automat Industries': '/automat-logo.svg', 
    'News 24': '/news24-logo.svg', 
    'A-One Fibers': '/a-one-fibers-logo.svg', 
    'Webgross': 'https://cdn.simpleicons.org/webflow/FAC775', 
    'Dainik Pahal · INGLU · Anar': 'https://cdn.simpleicons.org/rss/E1E0CC'
  };

  const key = companyName.trim();
  return mapping[key] || `https://cdn.simpleicons.org/codecov/E1E0CC`;
};

function ExperienceCard({ exp, index, triggerInView }: { exp: any; index: number; triggerInView: boolean; key?: any }) {
  // Dynamically assign theme styling to cards
  const bgClass = 'bg-[#101010] border-white/5 text-[#E1E0CC] hover:bg-black/40';
  let dotColor = 'bg-primary/60';
  let accentTextColor = 'text-primary/70';
  let badgeColor = 'bg-primary/5 text-primary/80 border border-primary/15';
  let hoverBorderClass = 'hover:border-primary/20';

  if (exp.theme === 'black') {
    dotColor = 'bg-[#FAC775]';
    accentTextColor = 'text-[#FAC775]/90';
    badgeColor = 'bg-[#FAC775]/5 text-[#FAC775] border border-[#FAC775]/20';
    hoverBorderClass = 'hover:border-[#FAC775]/35';
  } else if (exp.theme === 'coral') {
    dotColor = 'bg-[#D85A30]';
    accentTextColor = 'text-[#D85A30]';
    badgeColor = 'bg-[#D85A30]/10 text-[#D85A30] border border-[#D85A30]/20';
    hoverBorderClass = 'hover:border-[#D85A30]/40';
  } else if (exp.theme === 'purple') {
    dotColor = 'bg-purple-400';
    accentTextColor = 'text-purple-400';
    badgeColor = 'bg-purple-500/10 text-purple-300 border border-purple-500/20';
    hoverBorderClass = 'hover:border-purple-500/30';
  } else if (exp.theme === 'dark2') {
    dotColor = 'bg-[#FAC775]';
    accentTextColor = 'text-primary/90';
    badgeColor = 'bg-[#FAC775]/5 text-[#FAC775] border border-[#FAC775]/20';
    hoverBorderClass = 'hover:border-[#FAC775]/30';
  }

  return (
    <motion.div
      id={`exp-card-${exp.id}`}
      initial={{ opacity: 0, y: 45, scale: 0.97 }}
      animate={triggerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-primary/2 ${bgClass} ${hoverBorderClass}`}
    >
      <div>
        <div className="flex justify-between items-start gap-2 mb-4">
          <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase font-semibold">
            {exp.num} — {exp.category}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold ${badgeColor}`}>
            {exp.id === 'exp-1' ? 'CURRENT' : 'PREVIOUS'}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-2xl font-bold font-sans tracking-tight text-[#E1E0CC] leading-tight">
            {exp.company}
          </h3>
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center p-2 flex-shrink-0">
            <img 
              src={getCompanyLogoUrl(exp.company)} 
              alt={`${exp.company} logo`}
              className="w-full h-full object-contain filter brightness-110 saturate-100"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        
        <p className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 mb-4 ${accentTextColor}`}>
          <Briefcase className="w-3.5 h-3.5" />
          {exp.role}
        </p>

        <ul className="space-y-2.5 my-6 border-t border-b border-white/5 py-4">
          {exp.points.map((point: string, idx: number) => (
            <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm leading-relaxed text-gray-400">
              <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${dotColor}`} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2 mt-auto flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-gray-500">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-primary/40" />
          {exp.period}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-primary/40" />
          {exp.location}
        </span>
      </div>
    </motion.div>
  );
}
