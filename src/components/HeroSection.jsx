import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
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
    <section ref={sectionRef} className="h-screen flex flex-col justify-start pt-32 md:pt-56 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      <motion.div style={{ y, opacity }}>

        {/* Currently Widget */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-6"
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
          className="text-[2.8rem] leading-[1] md:text-9xl font-bold tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Membangun <br />
          Dunia Digital.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-accent font-medium tracking-widest uppercase text-xs md:text-sm h-5 mt-6"
        >
          <span ref={typedRef} />
        </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-3 flex-wrap mt-8"
          >
            <motion.button
              onClick={() => navigate('/projects')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-magnetic
              className="bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-indigo-600 transition-colors"
            >
              Lihat Project <ArrowRight size={16} />
            </motion.button>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-magnetic
              className="px-6 py-3 rounded-full text-sm font-semibold transition-colors"
              style={{ border: '1px solid var(--border)', color: 'var(--text-primary)', background: 'var(--bg-card)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
            >
              Hubungi Saya
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-4 mt-6"
          >
            <a
              href="https://github.com/hmzahas"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm transition-colors hover:text-accent"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              hmzahas
            </a>
            <span style={{ color: 'var(--border)' }}>·</span>
            <a
              href="mailto:hamzahcandrayusuf@gmail.com"
              className="flex items-center gap-2 text-sm transition-colors hover:text-accent"
              style={{ color: 'var(--text-muted)' }}
            >
              <Mail size={16} />
              hamzahcandrayusuf@gmail.com
            </a>
          </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-8 md:left-16 lg:left-24"
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
