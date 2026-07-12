import { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { ArrowUp } from 'lucide-react';

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
import Experience from './pages/Experience';
import NotFound from './pages/NotFound';
import useSmoothScroll from './hooks/useSmoothScroll';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1px] origin-left z-50"
      style={{ scaleX, background: 'linear-gradient(to right, #7C5CFF, #4F8CFF, #00E5FF)' }}
    />
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/skills', label: 'Skills' },
    { to: '/projects', label: 'Projects' },
    { to: '/experience', label: 'Experience' },
    { to: '/contact', label: 'Contact' },
  ];

  const socials = [
    { label: 'GitHub', href: 'https://github.com/hmzahas' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hamzah-candra-yusuf-613773350/' },
    { label: 'Instagram', href: 'https://www.instagram.com/img_jah/' },
  ];

  return (
    <footer className="relative z-10 px-6 md:px-16 lg:px-24 pt-16 pb-8" style={{ borderTop: '1px solid var(--footer-border)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="text-2xl font-black gradient-text" style={{ fontFamily: 'Syne, sans-serif' }}>Zahhfolio.</span>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: '#52525B' }}>
              Frontend Developer & UI/UX Designer membangun pengalaman digital yang premium.
            </p>
          </div>

          {/* Nav */}
          <div className="flex gap-16">
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#3F3F46' }}>Pages</p>
              <div className="flex flex-col gap-2">
                {navLinks.map(({ to, label }) => (
                  <button key={to} onClick={() => navigate(to)} className="text-sm text-left transition-colors hover:text-white" style={{ color: '#52525B' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#3F3F46' }}>Social</p>
              <div className="flex flex-col gap-2">
                {socials.map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="text-sm transition-colors hover:text-white" style={{ color: '#52525B' }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs" style={{ color: '#3F3F46' }}>© {new Date().getFullYear()} Hamzah Candra Yusuf. All rights reserved.</p>
          <AnimatePresence>
            {showTop && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-xs px-4 py-2 rounded-full transition-all"
                style={{ background: 'rgba(124,92,255,0.1)', border: '1px solid rgba(124,92,255,0.2)', color: '#7C5CFF' }}
              >
                <ArrowUp size={12} /> Back to top
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </footer>
  );
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
};

const isMobile = window.matchMedia('(pointer: coarse)').matches;

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
          style: { background: '#7C5CFF', color: 'white', border: 'none' },
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
          {!isMobile && <CustomCursor />}
          {!isMobile && <CursorTrail />}
          {!isMobile && <NoiseOverlay />}
          <ScrollProgress />
          <Toaster position="bottom-right" toastOptions={{ style: { background: '#141416', border: '1px solid rgba(255,255,255,0.08)', color: 'white' } }} />

          <AnimatePresence>
            {easterEgg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
              >
                <div className="text-white text-center px-12 py-8 rounded-3xl shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #7C5CFF, #4F8CFF)', boxShadow: '0 0 60px rgba(124,92,255,0.4)' }}>
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
