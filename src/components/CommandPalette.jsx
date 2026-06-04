import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, User, Code2, FolderOpen, Mail, X } from 'lucide-react';

const commands = [
  { id: 'home', label: 'Home', icon: Home, path: '/', desc: 'Kembali ke halaman utama' },
  { id: 'about', label: 'About', icon: User, path: '/about', desc: 'Tentang saya' },
  { id: 'skills', label: 'Skills', icon: Code2, path: '/skills', desc: 'Tech stack & kemampuan' },
  { id: 'projects', label: 'Projects', icon: FolderOpen, path: '/projects', desc: 'Proyek pilihan' },
  { id: 'contact', label: 'Contact', icon: Mail, path: '/contact', desc: 'Hubungi saya' },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.desc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setOpen(o => !o); setQuery(''); setSelected(0); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, filtered.length - 1));
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0));
      if (e.key === 'Enter' && filtered[selected]) { navigate(filtered[selected].path); setOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, selected, filtered, navigate]);

  const go = (path) => { navigate(path); setOpen(false); };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[201] rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}
          >
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <Search size={16} className="flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
              <input
                autoFocus value={query}
                onChange={e => { setQuery(e.target.value); setSelected(0); }}
                placeholder="Cari halaman..."
                className="flex-1 bg-transparent text-sm focus:outline-none"
                style={{ color: 'var(--text-primary)' }}
              />
              <button onClick={() => setOpen(false)}>
                <X size={16} style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>
            <div className="p-2 max-h-72 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-center text-sm py-8" style={{ color: 'var(--text-muted)' }}>Tidak ditemukan</p>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    onClick={() => go(cmd.path)}
                    onMouseEnter={() => setSelected(i)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors"
                    style={selected === i
                      ? { background: 'rgba(99,102,241,0.15)', color: 'var(--text-primary)' }
                      : { color: 'var(--text-secondary)' }
                    }
                  >
                    <cmd.icon size={16} style={{ color: selected === i ? '#6366f1' : 'var(--text-muted)' }} />
                    <div>
                      <p className="text-sm font-medium">{cmd.label}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{cmd.desc}</p>
                    </div>
                    {selected === i && (
                      <span className="ml-auto text-xs px-1.5 py-0.5 rounded" style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}>↵</span>
                    )}
                  </button>
                ))
              )}
            </div>
            <div className="px-4 py-2 flex gap-4 text-xs" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <span>↑↓ navigasi</span><span>↵ pilih</span><span>esc tutup</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
