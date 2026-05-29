import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, BookOpen, Calendar, GraduationCap } from 'lucide-react';
import { EDUCATION_DATA } from '../data';

const getEducationLogoUrl = (institution: string) => {
  const mapping: { [key: string]: string } = {
    'MICA — Upgrad': '/mica-logo.svg', 
    'Bharatiya Vidyapeeth University': '/bharati-vidyapeeth-logo.svg', 
    'Certifications': 'https://cdn.simpleicons.org/googleanalytics/FAC775', 
    'Always Learning': 'https://cdn.simpleicons.org/gitbook/E1E0CC'
  };

  const key = institution.trim();
  return mapping[key] || `https://cdn.simpleicons.org/codecademy/E1E0CC`;
};

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <motion.section 
      ref={sectionRef}
      id="education" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 scroll-mt-20"
    >
      <div 
        className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-primary/20 pb-4"
      >
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-[#E1E0CC]"
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          EDUCATION
        </motion.h2>
        <motion.span 
          className="text-xs font-mono tracking-widest text-primary/60 mt-2 md:mt-0"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          04 / CREDENTIALS
        </motion.span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EDUCATION_DATA.map((edu, idx) => {
          const bgClass = 'bg-[#101010] border-white/5 text-[#E1E0CC] hover:bg-black/40';
          let itemBulletBg = 'bg-[#D85A30]';
          let secondaryText = 'text-primary/70';
          let yearText = 'text-gray-500';
          let accentBorder = 'hover:border-primary/20';

          if (edu.theme === 'black') {
            itemBulletBg = 'bg-[#FAC775]';
            accentBorder = 'hover:border-[#FAC775]/35';
          } else if (edu.theme === 'coral') {
            itemBulletBg = 'bg-[#D85A30]';
            secondaryText = 'text-[#D85A30]';
            accentBorder = 'hover:border-[#D85A30]/40';
          }

          const isAlwaysLearning = edu.institution === 'Always Learning';

          return (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 45, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-primary/2 ${bgClass} ${accentBorder} ${
                isAlwaysLearning ? '!border-t-[#D85A30] border-t-2' : ''
              }`}
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center p-2 flex-shrink-0">
                      <img 
                        src={getEducationLogoUrl(edu.institution)} 
                        alt={`${edu.institution} logo`}
                        className="w-full h-full object-contain filter brightness-110 saturate-100"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className={`text-xl sm:text-2xl font-bold font-sans tracking-tight text-[#E1E0CC] ${
                        isAlwaysLearning ? 'text-primary' : ''
                      }`}>
                        {edu.institution}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono py-1 px-2.5 bg-black/40 border border-white/5 text-[#E1E0CC]/60 rounded block flex-shrink-0">
                    {edu.id === 'edu-1' ? 'POST-GRAD' : edu.id === 'edu-2' ? 'DEGREE' : isAlwaysLearning ? 'ONGOING' : 'CREDENTIALS'}
                  </span>
                </div>

                <p className={`text-xs sm:text-sm font-semibold italic mb-6 leading-relaxed ${secondaryText}`}>
                  {edu.degree}
                </p>

                <ul className="space-y-3 mb-6 border-t border-b border-white/5 py-4">
                  {edu.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex gap-2.5 items-start text-xs sm:text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${itemBulletBg}`} />
                      <span className="text-gray-400 leading-relaxed font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-2 flex items-center gap-2 text-xs font-mono font-medium text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-primary/40" />
                <span>{edu.year}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
