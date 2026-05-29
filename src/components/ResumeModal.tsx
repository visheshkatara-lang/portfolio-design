import { motion } from 'motion/react';
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, Briefcase, Award, GraduationCap, Sparkles } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md print:bg-white print:p-0">
      
      {/* Hidden layout helpers for print settings */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          nav, footer, button, .no-print {
            display: none !important;
          }
          .print-full-width {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          /* Ensure text is dark and background is white when printing */
          .print-black {
            color: #000000 !important;
          }
          .print-muted {
            color: #4b5563 !important;
          }
          .print-border {
            border-color: #e5e7eb !important;
          }
        }
      `}</style>

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl h-full sm:h-[90vh] bg-[#0c0c0c] border border-white/5 rounded-none sm:rounded-2xl shadow-3xl flex flex-col overflow-hidden print-full-width print:h-auto print:bg-white"
      >
        
        {/* Modal Header Actions (Invisible on Print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#101010]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FAC775]" />
            <span className="text-[10px] font-mono tracking-widest text-[#E1E0CC]/60 uppercase font-semibold">
              Interactive Resume Viewer
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Print Button */}
            <button 
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[#E1E0CC] border border-white/10 rounded-lg text-xs font-mono transition-all duration-200"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 rounded-lg transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Curriculum Vitae Document */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-12 print-full-width print:overflow-visible print:p-0">
          
          <div id="printable-resume" className="max-w-3xl mx-auto text-[#E1E0CC] print:text-black">
            
            {/* Header: Title, Subtitle, Contact Grid */}
            <header className="border-b border-[#D85A30]/40 pb-6 mb-8 print-border print:pb-4 print:mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-sans tracking-tight font-bold text-[#E1E0CC] print-black uppercase">
                    Vishesh Katara
                  </h1>
                  <p className="text-sm font-mono tracking-wider text-[#FAC775] print-black uppercase font-semibold mt-1">
                    Marketing & Events Specialist
                  </p>
                </div>
                <div className="text-left sm:text-right text-xs text-gray-400 font-mono space-y-1 print-muted">
                  <p>Delhi NCR, India</p>
                  <p>+91 82872 90206</p>
                  <p>Visheshkatara2411@gmail.com</p>
                </div>
              </div>

              {/* Links strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs font-sans text-[#E1E0CC]/80 print-muted">
                <a href="mailto:Visheshkatara2411@gmail.com" className="hover:text-[#FAC775] flex items-center gap-1.5 hover:underline">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Visheshkatara2411@gmail.com</span>
                </a>
                <a href="tel:+918287290206" className="hover:text-[#FAC775] flex items-center gap-1.5 hover:underline">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 82872 90206</span>
                </a>
                <a href="https://linkedin.com/in/visheshkatara" target="_blank" rel="noopener noreferrer" className="hover:text-[#FAC775] flex items-center gap-1.5 hover:underline">
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>linkedin.com/in/visheshkatara</span>
                </a>
              </div>
            </header>

            {/* Resume Content Body Grid */}
            <div className="space-y-8 print:space-y-6">
              
              {/* Professional Summary */}
              <section>
                <h2 className="text-xs font-mono tracking-widest text-[#D85A30] uppercase font-bold border-b border-white/5 pb-1 mb-3 print-black print-border">
                  Professional Summary
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed print-black font-sans">
                  Marketing and Events Specialist with 3+ years of experience across B2B technology and manufacturing sectors. Proven track record managing Rs. 3 Crore+ international exhibition budgets across 6 countries, executing 10+ events end-to-end, and driving a 112% increase in organic traffic. Experienced in running full-funnel digital marketing including paid ads, SEO, automation, and content with hands-on expertise in both on-ground execution and data-driven campaign management.
                </p>
              </section>

              {/* Core Capabilities */}
              <section>
                <h2 className="text-xs font-mono tracking-widest text-[#D85A30] uppercase font-bold border-b border-white/5 pb-1 mb-3 print-black print-border">
                  Core Capabilities
                </h2>
                <div className="flex flex-wrap gap-2 print:gap-1">
                  {[
                    "Brand & Social Media Growth", "B2B Exhibition & Event Management", "Performance Marketing",
                    "SEO & Organic Growth", "Demand Generation", "Marketing Automation (n8n, Make.ai)",
                    "Campaign Analytics & Dashboards", "Vendor & Budget Management", "International Marketing", "GTM Strategy"
                  ].map((cap, i) => (
                    <span key={i} className="text-[10px] sm:text-xs bg-white/5 text-[#E1E0CC]/90 border border-white/10 px-2.5 py-1 rounded-md print:bg-transparent print:border-none print:p-0 print:mr-3 print:text-black font-medium">
                      {cap}{i < 9 ? <span className="hidden print:inline"> ·</span> : null}
                    </span>
                  ))}
                </div>
              </section>

              {/* Experience List */}
              <section className="space-y-6">
                <h2 className="text-xs font-mono tracking-widest text-[#D85A30] uppercase font-bold border-b border-white/5 pb-1 mb-4 print-black print-border">
                  Professional Experience
                </h2>

                {/* Job 1 */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#E1E0CC] print-black flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-[#D85A30] shrink-0 print:hidden" />
                        <span>Brand & Growth Executive</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-medium print-black">
                        ManpraX Software LLP — Delhi, India
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#FAC775] print-muted mt-1 sm:mt-0">
                      Jun 2025 – Present
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-[13px] text-gray-300 space-y-1.5 pl-1 leading-relaxed print-black font-sans">
                    <li>Lead end-to-end marketing strategy and brand communication for a B2B software consulting firm as a one-person marketing function.</li>
                    <li>Planned and executed 2 industry expos — DIDAC and CSR Box — in the education domain, managing booth logistics, collateral, and on-ground lead capture.</li>
                    <li>Built inbound demand channels through SEO, Google Ads, LinkedIn campaigns, and content marketing.</li>
                    <li>Designed automation workflows using n8n and Make.ai, improving campaign execution efficiency.</li>
                    <li>Developed marketing dashboards providing leadership with real-time campaign performance visibility.</li>
                    <li>Introduced AI-driven content and video production tools, accelerating campaign turnaround times.</li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#E1E0CC] print-black flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-[#D85A30] shrink-0 print:hidden" />
                        <span>Marketing Executive</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-medium print-black">
                        Automat Industries Pvt. Ltd. — Delhi, India
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#FAC775] print-muted mt-1 sm:mt-0">
                      Jun 2024 – May 2025
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-[13px] text-gray-300 space-y-1.5 pl-1 leading-relaxed print-black font-sans">
                    <li>Independently managed a Rs. 3 Crore+ international exhibition budget, representing the brand across Russia, Turkey, Iran, Italy, Nigeria, and Morocco — coordinating vendors, logistics, booth design, and live product demonstrations.</li>
                    <li>Delivered 3 international trade exhibitions in the agriculture and irrigation sector, compiling contacts and managing vendor payments and on-ground execution from scratch.</li>
                    <li>Organised and executed 5 dealer and trader meets across India, each drawing 500+ attendees — managing venue, collateral, speaker coordination, and brand experience end-to-end.</li>
                    <li>Generated 100+ qualified business connections through structured post-event lead capture and follow-up workflows.</li>
                    <li>Managed Rs. 15 lakh/year in paid advertising across Google Ads and Meta, driving lead generation for international markets.</li>
                    <li>Grew organic traffic by 112% (Aug 2024 – Feb 2025) through a structured SEO overhaul covering keyword research, on-page optimisation, and content improvements.</li>
                  </ul>
                </div>

                {/* Job 3 */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#E1E0CC] print-black flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-[#D85A30] shrink-0 print:hidden" />
                        <span>Digital Marketing Intern</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-medium print-black">
                        News24 — India
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#FAC775] print-muted mt-1 sm:mt-0">
                      Jul 2023 – Aug 2023
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-[13px] text-gray-300 space-y-1.5 pl-1 leading-relaxed print-black font-sans">
                    <li>Improved content discoverability through SEO optimisation and social media distribution strategies.</li>
                    <li>Analysed campaign data to refine ad targeting and improve return on digital advertising spend.</li>
                  </ul>
                </div>

                {/* Job 4 */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#E1E0CC] print-black flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-[#D85A30] shrink-0 print:hidden" />
                        <span>Paid Ads Associate</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 font-medium print-black">
                        A-One Fibers — India
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#FAC775] print-muted mt-1 sm:mt-0">
                      Jan 2023 – Apr 2023
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-[13px] text-gray-300 space-y-1.5 pl-1 leading-relaxed print-black font-sans">
                    <li>Executed and optimised Google Ads and IndiaMART acquisition campaigns to drive qualified traffic and leads.</li>
                  </ul>
                </div>
              </section>

              {/* Education */}
              <section className="space-y-4">
                <h2 className="text-xs font-mono tracking-widest text-[#D85A30] uppercase font-bold border-b border-white/5 pb-1 mb-3 print-black print-border">
                  Education
                </h2>

                {/* Edu 1 */}
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#E1E0CC] print-black flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#D85A30] shrink-0 print:hidden" />
                      <span>PG Diploma in Digital Marketing & Communication</span>
                    </h3>
                    <p className="text-xs text-gray-400 font-medium print-black pl-0 sm:pl-5">
                      MICA — The School of Ideas, Ahmedabad
                    </p>
                    <p className="text-[10px] sm:text-xs text-[#FAC775] print-muted italic pl-0 sm:pl-5">
                      Specialisations: Generative AI, Marketing Leadership, Marketing Analytics
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#FAC775] print-muted shrink-0 text-left sm:text-right mt-1 sm:mt-0">
                    Apr 2025 – Jan 2026
                  </span>
                </div>

                {/* Edu 2 */}
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#E1E0CC] print-black flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#D85A30] shrink-0 print:hidden" />
                      <span>Bachelor of Journalism & Mass Communication</span>
                    </h3>
                    <p className="text-xs text-gray-400 font-medium print-black pl-0 sm:pl-5">
                      Bharatiya Vidyapeeth University · <span className="text-white/80 print-black">CGPA: 8.4</span>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#FAC775] print-muted shrink-0 text-left sm:text-right mt-1 sm:mt-0">
                    Nov 2021 – Sep 2024
                  </span>
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h2 className="text-xs font-mono tracking-widest text-[#D85A30] uppercase font-bold border-b border-white/5 pb-1 mb-3 print-black print-border">
                  Certifications
                </h2>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 print-black font-sans">
                  <Award className="w-4 h-4 text-[#D85A30] shrink-0 print:hidden" />
                  <span>Google Analytics Certified | HubSpot SEO & SMO Certified | AI-Powered Marketing Mastery</span>
                </div>
              </section>

              {/* Tech & Marketing Stack */}
              <section className="space-y-3">
                <h2 className="text-xs font-mono tracking-widest text-[#D85A30] uppercase font-bold border-b border-white/5 pb-1 mb-3 print-black print-border">
                  Technology & Marketing Stack
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-[13px] text-gray-300 print-black font-sans">
                  <div><strong className="text-white print-black font-mono font-bold text-[10px] uppercase tracking-wider block mb-0.5">Advertising</strong> Google Ads, Meta Ads, LinkedIn Ads</div>
                  <div><strong className="text-white print-black font-mono font-bold text-[10px] uppercase tracking-wider block mb-0.5">Analytics</strong> Google Analytics 4, Search Console, SEMrush / Ahrefs, Dashboards</div>
                  <div><strong className="text-white print-black font-mono font-bold text-[10px] uppercase tracking-wider block mb-0.5">Automation</strong> n8n, Make.ai, CRM Automation, HubSpot</div>
                  <div><strong className="text-white print-black font-mono font-bold text-[10px] uppercase tracking-wider block mb-0.5">Design</strong> Canva, Figma, Adobe tools, AI Content & Video Tools</div>
                  <div className="sm:col-span-2"><strong className="text-white print-black font-mono font-bold text-[10px] uppercase tracking-wider block mb-0.5">Other</strong> Email Marketing (Mailchimp), WordPress, SEO Auditing, GTM Strategy</div>
                </div>
              </section>

            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
