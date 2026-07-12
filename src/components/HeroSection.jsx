import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react';

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));

const Particle = ({ x, y, size, duration, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: Math.random() > 0.5 ? 'rgba(124,92,252,0.6)' : 'rgba(0,229,255,0.4)',
    }}
    animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const blobX = useTransform(springX, [-300, 300], [-30, 30]);
  const blobY = useTransform(springY, [-300, 300], [-20, 20]);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center overflow-hidden">

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Animated blobs */}
      <motion.div className="absolute pointer-events-none" style={{ x: blobX, y: blobY, top: '10%', left: '55%' }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #7C5CFC, #4F8CFF)' }}
        />
      </motion.div>
      <motion.div className="absolute pointer-events-none" style={{ bottom: '10%', left: '5%' }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="w-[300px] h-[300px] rounded-full blur-[100px] opacity-10"
          style={{ background: 'radial-gradient(circle, #00E5FF, #4F8CFF)' }}
        />
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => <Particle key={p.id} {...p} />)}
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full px-6 md:px-16 lg:px-24 pt-20">
        <div className="max-w-7xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium mb-8"
            style={{ background: 'rgba(124,92,252,0.1)', border: '1px solid rgba(124,92,252,0.25)', color: '#a78bfa' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            Available for Freelance
          </motion.div>

          {/* Heading */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-[clamp(2.8rem,8vw,6rem)] font-black leading-[0.95] tracking-tight"
              style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}
            >
              Frontend Developer
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="text-[clamp(2.8rem,8vw,6rem)] font-black leading-[0.95] tracking-tight gradient-text"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              & UI/UX Designer
            </motion.h1>
          </div>

          {/* Description + CTA */}
          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base md:text-lg max-w-md leading-relaxed"
              style={{ color: '#9CA3AF' }}
            >
              Saya membangun pengalaman digital yang premium, interaktif, dan berkesan — dari desain hingga kode.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                onClick={() => navigate('/projects')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #7C5CFC, #4F8CFF)', boxShadow: '0 0 30px rgba(124,92,252,0.35)' }}
              >
                View Projects <ArrowRight size={15} />
              </motion.button>
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'white', background: 'rgba(255,255,255,0.04)' }}
              >
                <Mail size={15} /> Contact Me
              </motion.button>
            </motion.div>
          </div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-6 mt-10"
          >
            <a href="https://github.com/hmzahas" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-xs font-medium transition-colors hover:text-white"
              style={{ color: '#6B7280' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              hmzahas
            </a>
            <span style={{ color: '#374151' }}>·</span>
            <a href="mailto:hamzahcandra38@gmail.com"
              className="flex items-center gap-2 text-xs font-medium transition-colors hover:text-white"
              style={{ color: '#6B7280' }}
            >
              <Mail size={14} />
              hamzahcandra38@gmail.com
            </a>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: '#4B5563' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(124,92,252,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
