import { useRef, ReactNode, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, ArrowRight, FileText } from 'lucide-react';
import ResumeModal from './ResumeModal';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <section id="contact" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 scroll-mt-20">
      <div 
        ref={containerRef} 
        className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-primary/20 pb-4"
      >
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-[#E1E0CC]"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          CONNECT
        </motion.h2>
        <motion.span 
          className="text-xs font-mono tracking-widest text-primary/60 mt-2 md:mt-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          06 / CONTACT DETAILS
        </motion.span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
        {/* Left Side Quote - Modern Cohesive dark theme with coral accents */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0c0c0c] border-r border-white/5 p-10 sm:p-14 flex flex-col justify-between text-[#E1E0CC]"
        >
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#D85A30] uppercase font-bold block mb-4">
              COLLABORATION OUTLOOK
            </span>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-sans tracking-tight leading-[0.95] font-medium text-[#E1E0CC] mb-8 uppercase">
              LET'S
              <br />
              WORK
              <br />
              TOGETHER<span className="text-[#D85A30]">.</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mb-12 font-sans">
              Looking for Brand & Marketing Strategy, B2B Growth, Demand Generation, or marketing executive roles in structured environments where creativity meets analytical performance.
            </p>
          </div>

          <div className="border-l-2 border-[#D85A30] pl-6 py-3 bg-black/40 rounded-r-xl max-w-sm border-t border-b border-white/5">
            <p className="text-sm sm:text-base italic font-sans font-medium text-[#E1E0CC]/90">
              "I take brands from screen to stage."
            </p>
          </div>
        </motion.div>

        {/* Right Side Links - Custom Modern Visual Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#101010] p-10 sm:p-14 flex flex-col justify-center gap-8"
        >
          <div className="space-y-6">
            <ContactLink
              label="Email"
              href="mailto:Visheshkatara2411@gmail.com"
              value="Visheshkatara2411@gmail.com"
              icon={<Mail className="w-4 h-4 text-primary/60" />}
            />
            <ContactLink
              label="Phone"
              href="tel:+918287290206"
              value="+91 82872 90206"
              icon={<Phone className="w-4 h-4 text-primary/60" />}
            />
            <ContactLink
              label="LinkedIn"
              href="https://linkedin.com/in/Visheshkatara"
              value="linkedin.com/in/Visheshkatara"
              icon={<Linkedin className="w-4 h-4 text-primary/60" />}
              external
            />
            <div className="flex flex-col gap-1.5 pb-4 border-b border-white/5">
              <span className="text-[10px] font-mono tracking-widest text-[#D85A30] uppercase font-bold">
                Location
              </span>
              <div className="flex items-center gap-2 text-sm sm:text-base text-[#E1E0CC] font-sans font-medium">
                <MapPin className="w-4 h-4 text-[#D85A30]" />
                <span>Ghaziabad, Delhi NCR · Remote-friendly</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:Visheshkatara2411@gmail.com"
              className="w-full bg-[#FAC775] text-[#412402] font-sans text-xs sm:text-sm font-bold tracking-widest py-4 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#F1EFE8] hover:text-black transition-all duration-300 shadow-xl"
            >
              <span>HIRE ME</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsResumeOpen(true)}
              className="w-full bg-white/5 text-[#E1E0CC] hover:bg-white/10 font-sans text-xs sm:text-sm font-bold tracking-widest py-4 rounded-xl flex items-center justify-center gap-1.5 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
            >
              <FileText className="w-4 h-4 text-[#D85A30]" />
              <span>RESUME</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Render ResumeModal to enable downloading/printing */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}

function ContactLink({
  label,
  href,
  value,
  icon,
  external = false,
}: {
  label: string;
  href: string;
  value: string;
  icon: ReactNode;
  external?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 pb-4 border-b border-white/5 group">
      <span className="text-[10px] font-mono tracking-widest text-primary/50 group-hover:text-[#FAC775] transition-colors duration-300 uppercase font-bold">
        {label}
      </span>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-2.5 text-sm sm:text-base text-[#E1E0CC] group-hover:text-[#FAC775] transition-colors duration-300 font-sans font-medium hover:underline"
      >
        {icon}
        <span>{value}</span>
      </a>
    </div>
  );
}
