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

const socials = [
  { label: 'GitHub', href: 'https://github.com/hmzahas' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hamzah-candra-yusuf-613773350/' },
  { label: 'Instagram', href: 'https://www.instagram.com/img_jah/' },
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

  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-40 px-6 md:px-16 lg:px-24 py-4 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-xl font-black tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="gradient-text">Zahhfolio.</span>
          </NavLink>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            {links.map(({ to, label }) => (
              <NavLink
                key={to} to={to} end={to === '/'}
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
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, rgba(124,92,255,0.15), rgba(79,140,255,0.1))', border: '1px solid rgba(124,92,255,0.25)', color: '#a78bfa' }}
          >
            Hire Me ✨
          </a>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-2xl transition-all z-50 relative"
            style={{ background: isOpen ? 'rgba(124,92,255,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isOpen ? 'rgba(124,92,255,0.3)' : 'rgba(255,255,255,0.08)'}`, color: 'white' }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={17} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={17} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[39] md:hidden flex flex-col"
            style={{ background: '#050505' }}
          >
            {/* Subtle radial glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(124,92,255,0.08) 0%, transparent 70%)',
            }} />
            {/* Grid texture */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />

            {/* Top bar spacer */}
            <div className="h-[72px] flex-shrink-0" />

            {/* Nav links — vertically centered */}
            <div className="flex-1 flex flex-col justify-center px-6" style={{ maxWidth: 320, margin: '0 auto', width: '100%' }}>
              <nav className="flex flex-col" style={{ gap: 4 }}>
                {links.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className="group flex items-center justify-between py-4 transition-all duration-200"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className="font-semibold tracking-tight transition-all duration-200"
                            style={{
                              fontFamily: 'Syne, sans-serif',
                              fontSize: 'clamp(1.9rem, 8vw, 2.2rem)',
                              lineHeight: 1.1,
                              letterSpacing: '-0.03em',
                              color: isActive ? '#7C5CFF' : '#3F3F46',
                              textShadow: isActive ? '0 0 24px rgba(124,92,255,0.4)' : 'none',
                            }}
                          >
                            {label}
                          </span>
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: '#7C5CFF', boxShadow: '0 0 8px rgba(124,92,255,0.8)' }}
                              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="px-6 pb-10 flex-shrink-0"
              style={{ maxWidth: 320, margin: '0 auto', width: '100%' }}
            >
              <a
                href="mailto:hamzahcandra38@gmail.com"
                className="block text-sm mb-5 transition-colors hover:text-white"
                style={{ color: 'rgba(161,161,170,0.7)', fontSize: 14 }}
              >
                hamzahcandra38@gmail.com
              </a>
              <div className="flex items-center gap-5">
                {socials.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                    style={{ color: 'rgba(82,82,91,0.8)', fontSize: 13 }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
