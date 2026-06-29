import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-40 px-6 md:px-16 lg:px-24 py-5"
        style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <NavLink to="/" className="font-bold text-xl tracking-tighter" style={{ color: 'var(--text-primary)' }}>
            PORTFOLIO.
          </NavLink>

          <div className="hidden md:flex gap-1 text-sm font-medium">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-accent/10 text-accent' : ''}`
                }
                style={({ isActive }) => isActive ? {} : { color: 'var(--text-secondary)' }}
                onMouseEnter={e => { if (!e.currentTarget.classList.contains('text-accent')) e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={e => { if (!e.currentTarget.classList.contains('text-accent')) e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <button className="md:hidden" style={{ color: 'var(--text-primary)' }} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[65px] inset-x-0 z-40 p-4 md:hidden"
            style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg mb-1 transition-colors text-sm font-medium ${isActive ? 'text-accent bg-accent/10' : ''}`
                }
                style={({ isActive }) => isActive ? {} : { color: 'var(--text-secondary)' }}
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
