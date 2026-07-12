import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-40 px-6 md:px-16 lg:px-24 py-4 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(5,5,5,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-xl font-black tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="gradient-text">Zahhfolio.</span>
          </NavLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className="relative px-4 py-2 rounded-full font-medium transition-all duration-200"
                style={({ isActive }) => ({
                  color: isActive ? 'white' : '#71717A',
                  background: isActive ? 'rgba(124,92,255,0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(124,92,255,0.25)' : '1px solid transparent',
                })}
                onMouseEnter={e => { if (!e.currentTarget.style.background.includes('0.12')) e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { if (!e.currentTarget.style.background.includes('0.12')) e.currentTarget.style.color = '#71717A'; }}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <a
            href="mailto:hamzahcandra38@gmail.com"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(124,92,255,0.15), rgba(79,140,255,0.1))',
              border: '1px solid rgba(124,92,255,0.25)',
              color: '#a78bfa',
              boxShadow: '0 0 20px rgba(124,92,255,0.1)',
            }}
          >
            Hire Me ✨
          </a>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[39] md:hidden flex flex-col justify-center px-8"
            style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <nav className="flex flex-col gap-2">
              {links.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className="block py-4 text-4xl font-black transition-all"
                    style={({ isActive }) => ({
                      fontFamily: 'Syne, sans-serif',
                      color: isActive ? 'transparent' : '#3F3F46',
                      background: isActive ? 'linear-gradient(135deg, #7C5CFF, #4F8CFF)' : 'none',
                      WebkitBackgroundClip: isActive ? 'text' : 'unset',
                      WebkitTextFillColor: isActive ? 'transparent' : '#3F3F46',
                    })}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <a href="mailto:hamzahcandra38@gmail.com" className="text-sm" style={{ color: '#52525B' }}>
                hamzahcandra38@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
