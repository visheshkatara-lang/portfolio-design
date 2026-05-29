import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, Award, Tag } from 'lucide-react';
import { PROJECT_DATA } from '../data';

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <motion.section 
      ref={sectionRef}
      id="projects" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#000000] relative scroll-mt-20"
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
          PROJECTS
        </motion.h2>
        <motion.span 
          className="text-xs font-mono tracking-widest text-primary/60 mt-2 md:mt-0"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          02 / SELECTED WORK
        </motion.span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECT_DATA.map((proj, idx) => (
          <ProjectCard key={proj.id} proj={proj} index={idx} triggerInView={isInView} />
        ))}
      </div>
    </motion.section>
  );
}

function ProjectCard({ proj, index, triggerInView }: { proj: any; index: number; triggerInView: boolean; key?: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45, scale: 0.97 }}
      animate={triggerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative p-6 sm:p-8 rounded-2xl bg-[#101010] border border-white/5 transition-all duration-300 hover:bg-black hover:border-primary/30 flex flex-col justify-between cursor-pointer h-full hover:shadow-xl hover:shadow-primary/5"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-mono tracking-widest text-[#D85A30] group-hover:text-[#FAC775] transition-colors duration-300 uppercase">
            {proj.category}
          </span>
          <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-primary/40 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
          </div>
        </div>

        <h3 className="text-2xl font-bold font-sans tracking-tight mb-3 text-[#E1E0CC] group-hover:text-white transition-colors duration-300">
          {proj.title}
        </h3>

        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed mb-6">
          {proj.description}
        </p>
      </div>

      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 group-hover:bg-[#FAC775] group-hover:text-[#412402] group-hover:border-transparent transition-all duration-300 text-xs font-mono mb-6 uppercase font-medium">
          <Award className="w-3.5 h-3.5" />
          {proj.result}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
          {proj.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] font-mono tracking-wider text-gray-500 group-hover:text-primary/70 transition-colors duration-300 px-2 py-0.5 border border-white/5 group-hover:border-primary/10 rounded-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
