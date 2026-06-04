import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="relative mb-6 select-none">
          <motion.h1
            animate={{ x: [-2, 2, -2, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
            className="text-[10rem] md:text-[16rem] font-black leading-none"
            style={{ color: 'var(--border)' }}
          >
            404
          </motion.h1>
          <motion.h1
            animate={{ x: [2, -2, 2, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3, delay: 0.05 }}
            className="absolute inset-0 text-[10rem] md:text-[16rem] font-black leading-none text-accent/20"
          >
            404
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🌌</span>
          </div>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Halaman Tidak Ditemukan</h2>
        <p className="mb-10 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Sepertinya kamu tersesat di luar angkasa. Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>

        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-card)' }}
          >
            <ArrowLeft size={16} /> Kembali
          </motion.button>
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors"
          >
            <Home size={16} /> Ke Home
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
};

export default NotFound;
