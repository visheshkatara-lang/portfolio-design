import { useRef, CSSProperties, useState, useEffect } from 'react';
import { motion, useInView, MotionValue, useTransform, AnimatePresence } from 'motion/react';

interface Segment {
  text: string;
  className?: string;
}

export function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  delayOffset = 0,
}: {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delayOffset?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const words = text.split(' ');

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: delayOffset + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative inline-block mr-[0.2em] whitespace-nowrap"
          >
            {word}
            {isLastWord && showAsterisk && (
              <span className="absolute top-[0.62em] -right-[0.3em] text-[0.31em] select-none text-primary font-sans">
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
}

export function WordsPullUpMultiStyle({
  segments,
  className = '',
  delayOffset = 0,
  style,
}: {
  segments: Segment[];
  className?: string;
  delayOffset?: number;
  style?: CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  let wordCounter = 0;

  return (
    <div
      ref={containerRef}
      className={`inline-flex flex-wrap ${className.includes('justify-') ? '' : 'justify-center'} ${className}`}
      style={style}
    >
      {segments.map((segment, segIndex) => {
        const words = segment.text.split(' ').filter(w => w !== '');
        return (
          <span key={segIndex} className="inline-flex flex-wrap">
            {words.map((word, wordIndex) => {
              const currentDelay = delayOffset + wordCounter * 0.08;
              wordCounter++;
              return (
                <motion.span
                  key={`${segIndex}-${wordIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.6,
                    delay: currentDelay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`inline-block mr-[0.25em] whitespace-nowrap ${segment.className || ''}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
}

export function AnimatedLetter({
  char,
  index,
  total,
  scrollYProgress,
}: {
  char: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  key?: any;
}) {
  const charProgress = index / total;
  // range [charProgress - 0.1, charProgress + 0.05]
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);

  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {char}
    </motion.span>
  );
}

export function AnimatedWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  key?: any;
}) {
  const wordProgress = index / total;
  // Dynamic window of scroll reveal
  const start = Math.max(0, wordProgress * 0.85 - 0.05);
  const end = Math.min(1, wordProgress * 0.85 + 0.1);

  // Transition opacity smoothly from a subtle, read-safe low opacity to full contrast
  const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1.0]);

  return (
    <motion.span 
      style={{ opacity }} 
      className="inline-block mr-[0.24em] whitespace-nowrap text-[#E1E0CC] hover:text-[#FAC775] transition-colors duration-200 cursor-default"
    >
      {word}
    </motion.span>
  );
}

interface LanguageOption {
  name: string;
  lang: string;
  code: string;
}

export function MultilingualName({
  className = '',
  showAsterisk = false,
}: {
  className?: string;
  showAsterisk?: boolean;
}) {
  const languages: LanguageOption[] = [
    { name: 'Vishesh', lang: 'English', code: 'EN' },
    { name: '维谢什', lang: 'Chinese (Simplified)', code: 'ZH' },
    { name: 'Vishesh', lang: 'Spanish', code: 'ES' },
    { name: 'Вишеш', lang: 'Russian', code: 'RU' },
    { name: 'Vishesh', lang: 'French', code: 'FR' },
    { name: '비셰시', lang: 'Korean', code: 'KO' },
    { name: 'ヴィシェシュ', lang: 'Japanese', code: 'JA' },
    { name: 'विशेष', lang: 'Hindi', code: 'HI' },
    { name: 'ਵਿਸ਼ੇਸ਼', lang: 'Punjabi', code: 'PA' },
    { name: 'విశేష్', lang: 'Telugu', code: 'TE' },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [languages.length]);

  const current = languages[index];

  return (
    <div className="flex flex-col items-start select-none mb-4 sm:mb-5">
      {/* Main name with elegant vertical scroll-up/scroll-down sequence */}
      <div className="relative h-[1.3em] flex items-center overflow-visible">
        <AnimatePresence mode="wait">
          <motion.span
            key={`name-${index}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className={`${className} inline-block leading-none`}
            style={{ margin: 0 }}
          >
            {current.name}
            {showAsterisk && (
              <span className="absolute top-[0.62em] -right-[0.3em] text-[0.31em] select-none text-primary font-sans">
                *
              </span>
            )}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
