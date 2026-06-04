import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LETTERS = 'HAMZAH'.split('');

const DNAStrand = ({ progress }) => {
  const points = 18;
  const width = 320;
  const height = 200;
  const amplitude = 38;
  const freq = Math.PI * 2;

  const strand1 = Array.from({ length: points }, (_, i) => {
    const t = i / (points - 1);
    const x = t * width;
    const y = height / 2 + Math.sin(t * freq + progress * 6) * amplitude;
    return `${x},${y}`;
  }).join(' ');

  const strand2 = Array.from({ length: points }, (_, i) => {
    const t = i / (points - 1);
    const x = t * width;
    const y = height / 2 - Math.sin(t * freq + progress * 6) * amplitude;
    return `${x},${y}`;
  }).join(' ');

  // Cross bridges
  const bridges = Array.from({ length: 9 }, (_, i) => {
    const t = (i / 8);
    const x = t * width;
    const y1 = height / 2 + Math.sin(t * freq + progress * 6) * amplitude;
    const y2 = height / 2 - Math.sin(t * freq + progress * 6) * amplitude;
    const opacity = 0.15 + Math.abs(Math.sin(t * freq + progress * 6)) * 0.4;
    return { x, y1, y2, opacity };
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="strand1grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="strand2grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#6366f1" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Bridges */}
      {bridges.map((b, i) => (
        <line
          key={i}
          x1={b.x} y1={b.y1}
          x2={b.x} y2={b.y2}
          stroke="rgba(168,85,247,0.3)"
          strokeWidth="1"
          strokeOpacity={b.opacity}
        />
      ))}

      {/* Strand 1 */}
      <polyline
        points={strand1}
        fill="none"
        stroke="url(#strand1grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#glow)"
      />

      {/* Strand 2 */}
      <polyline
        points={strand2}
        fill="none"
        stroke="url(#strand2grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#glow)"
      />

      {/* Nodes on strand 1 */}
      {Array.from({ length: 9 }, (_, i) => {
        const t = i / 8;
        const x = t * width;
        const y = height / 2 + Math.sin(t * freq + progress * 6) * amplitude;
        return (
          <circle key={i} cx={x} cy={y} r="3.5"
            fill="#a855f7" filter="url(#glow)"
            opacity={0.6 + Math.abs(Math.sin(t * freq + progress * 6)) * 0.4}
          />
        );
      })}

      {/* Nodes on strand 2 */}
      {Array.from({ length: 9 }, (_, i) => {
        const t = i / 8;
        const x = t * width;
        const y = height / 2 - Math.sin(t * freq + progress * 6) * amplitude;
        return (
          <circle key={i} cx={x} cy={y} r="3.5"
            fill="#6366f1" filter="url(#glow)"
            opacity={0.6 + Math.abs(Math.sin(t * freq + progress * 6)) * 0.4}
          />
        );
      })}
    </svg>
  );
};

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('dna');   // dna → name → exit
  const rafRef = useRef(null);
  const startRef = useRef(null);

  // Animate DNA rotation
  useEffect(() => {
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      setProgress(elapsed);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Phase transitions
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('name'), 1600);
    const t2 = setTimeout(() => setPhase('exit'), 3200);
    const t3 = setTimeout(() => onComplete(), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'exit' ? 0 : 1 }}
        transition={{ duration: 1 }}
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="flex flex-col items-center gap-8">

        {/* DNA Animation */}
        <motion.div
          animate={{
            opacity: phase === 'exit' ? 0 : 1,
            scale: phase === 'name' ? 0.85 : 1,
            y: phase === 'name' ? -10 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <DNAStrand progress={progress} />
        </motion.div>

        {/* Name reveal */}
        <AnimatePresence>
          {phase !== 'dna' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase === 'exit' ? 0 : 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Divider line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="w-64 h-px"
                style={{ background: 'linear-gradient(to right, transparent, rgba(168,85,247,0.5), transparent)' }}
              />

              {/* Letters */}
              <div className="flex gap-1.5">
                {LETTERS.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.07,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="text-5xl md:text-7xl font-black tracking-tight"
                    style={{
                      color: 'white',
                      textShadow: '0 0 30px rgba(168,85,247,0.4)',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-xs tracking-[0.4em] uppercase"
                style={{ color: 'rgba(168,85,247,0.7)' }}
              >
                Frontend Developer
              </motion.p>

              {/* Bottom divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="w-64 h-px"
                style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.5), transparent)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Exit — split wipe */}
      <AnimatePresence>
        {phase === 'exit' && (
          <>
            <motion.div
              className="absolute left-0 right-0 top-0 origin-top"
              style={{ background: '#0a0a0a', bottom: '50%' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              className="absolute left-0 right-0 bottom-0 origin-bottom"
              style={{ background: '#0a0a0a', top: '50%' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;
