import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-96 h-96 rounded-full blur-[120px] opacity-10" style={{ background: 'radial-gradient(circle, #7C5CFF, #4F8CFF)' }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
        <div className="relative mb-8 select-none">
          <motion.h1
            animate={{ x: [-2, 2, -2, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
            className="text-[8rem] md:text-[14rem] font-black leading-none"
            style={{ fontFamily: 'Syne, sans-serif', color: 'rgba(255,255,255,0.04)' }}
          >
            404
          </motion.h1>
          <motion.h1
            animate={{ x: [2, -2, 2, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4, delay: 0.05 }}
            className="absolute inset-0 text-[8rem] md:text-[14rem] font-black leading-none gradient-text"
            style={{ fontFamily: 'Syne, sans-serif', opacity: 0.15 }}
          >
            404
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl"
            >
              🌌
            </motion.span>
          </div>
        </div>

        <h2 className="text-2xl md:text-4xl font-black mb-3 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
          Halaman Tidak Ditemukan
        </h2>
        <p className="mb-10 max-w-md mx-auto text-sm leading-relaxed" style={{ color: '#71717A' }}>
          Sepertinya kamu tersesat di luar angkasa. Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>

        <div className="flex gap-3 justify-center">
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#A1A1AA' }}
          >
            <ArrowLeft size={15} /> Kembali
          </motion.button>
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #7C5CFF, #4F8CFF)', boxShadow: '0 0 24px rgba(124,92,255,0.3)' }}
          >
            <Home size={15} /> Ke Home
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
};

export default NotFound;
