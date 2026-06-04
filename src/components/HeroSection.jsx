import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Typed from 'typed.js';

const HeroSection = () => {
  const typedRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Frontend Developer', 'UI/UX Design', 'Creative Coder', 'Vibes Coder'],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen flex flex-col justify-center items-center px-6 text-center relative overflow-hidden">
      <motion.div style={{ y, opacity }}>

        {/* Currently Widget */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span style={{ color: 'var(--text-secondary)' }}>
            Currently: <span style={{ color: 'var(--text-primary)' }}>Open to work</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="text-5xl md:text-8xl font-bold mb-4 leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Membangun Dunia <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Digital.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-accent font-medium mb-6 tracking-widest uppercase text-sm h-6"
        >
          <span ref={typedRef} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="max-w-lg mx-auto mb-8 text-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.button
            onClick={() => navigate('/projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-magnetic
            className="bg-accent text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-600 transition-colors"
          >
            Lihat Project <ArrowRight size={18} />
          </motion.button>
          <motion.button
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-magnetic
            className="px-8 py-3 rounded-full font-bold transition-colors"
            style={{ border: '1px solid var(--border)', color: 'var(--text-primary)', background: 'var(--bg-card)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
          >
            Hubungi Saya
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ color: 'var(--text-muted)' }}
      >
        <div className="w-6 h-10 rounded-full flex justify-center p-1" style={{ border: '2px solid var(--text-muted)' }}>
          <div className="w-1 h-2 rounded-full" style={{ background: 'var(--text-muted)' }} />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
