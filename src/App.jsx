import { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';

import Navbar from './components/Navbar';
import BackgroundOrbs from './components/BackgroundOrbs';
import CustomCursor from './components/CustomCursor';
import CursorTrail from './components/CursorTrail';
import LoadingScreen from './components/LoadingScreen';
import NoiseOverlay from './components/NoiseOverlay';
import CommandPalette from './components/CommandPalette';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import useSmoothScroll from './hooks/useSmoothScroll';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-50" style={{ scaleX }} />;
};

const AppContent = () => {
  useSmoothScroll();
  const location = useLocation();

  return (
    <>
      <CommandPalette />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <footer
        className="py-12 px-6 md:px-16 lg:px-24 text-xs relative z-10"
        style={{ borderTop: '1px solid var(--footer-border)', color: 'var(--text-muted)' }}
      >
        <p style={{ color: 'var(--text-secondary)' }}>Copyright © {new Date().getFullYear()} Hamzah</p>
        <p>All rights reserved.</p>
      </footer>
    </>
  );
};

const AppShell = () => {
  const [loading, setLoading] = useState(true);
  const [easterEgg, setEasterEgg] = useState(false);
  const konamiRef = useRef([]);

  useEffect(() => {
    const handler = (e) => {
      konamiRef.current = [...konamiRef.current, e.key].slice(-10);
      if (konamiRef.current.join(',') === KONAMI.join(',')) {
        setEasterEgg(true);
        toast('🎮 Konami Code! Kamu menemukan easter egg!', {
          duration: 3000,
          style: { background: '#6366f1', color: 'white', border: 'none' },
        });
        setTimeout(() => setEasterEgg(false), 3000);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <BrowserRouter>
          <CustomCursor />
          <CursorTrail />
          <NoiseOverlay />
          <ScrollProgress />
          <Toaster position="bottom-right" />

          <AnimatePresence>
            {easterEgg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
              >
                <div className="bg-accent text-white text-center px-12 py-8 rounded-3xl shadow-2xl">
                  <p className="text-5xl mb-3">🎮</p>
                  <p className="text-2xl font-bold">Konami Code!</p>
                  <p className="text-white/70 mt-1">Kamu menemukan easter egg! 🎉</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="min-h-screen overflow-hidden relative" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>
            <BackgroundOrbs />
            <Navbar />
            <AppContent />
          </div>
        </BrowserRouter>
      )}
    </>
  );
};

const App = () => <AppShell />;

export default App;
