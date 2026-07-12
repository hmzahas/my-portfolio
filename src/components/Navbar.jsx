import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 w-full z-40 px-6 md:px-16 lg:px-24 py-4 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <NavLink to="/" className="font-bold text-lg tracking-tighter" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>
            <span className="gradient-text">ZHF.</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-1 text-sm">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition-all duration-200 font-medium ${isActive ? 'text-white' : 'text-gray-500 hover:text-white'}`
                }
                style={({ isActive }) => isActive ? {
                  background: 'rgba(124,92,252,0.15)',
                  border: '1px solid rgba(124,92,252,0.3)',
                } : {}}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <a
            href="mailto:hamzahcandra38@gmail.com"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{ background: 'rgba(124,92,252,0.15)', border: '1px solid rgba(124,92,252,0.3)', color: '#7C5CFC' }}
          >
            Hire Me
          </a>

          <button className="md:hidden" style={{ color: 'white' }} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[65px] inset-x-0 z-40 p-4 md:hidden"
            style={{ background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl mb-1 transition-colors text-sm font-medium ${isActive ? 'text-white bg-accent/10' : 'text-gray-400'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
