import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, ExternalLink, Calendar, Zap } from 'lucide-react';

const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      {certificate && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100]"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-3xl mx-auto rounded-3xl z-[101] overflow-hidden"
            style={{ background: '#0E0E10', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.7)' }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full transition-all z-20"
              style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            >
              <X size={16} />
            </motion.button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Image */}
              <div className="relative h-72 md:h-auto overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(124,92,255,0.1), rgba(79,140,255,0.05))' }}>
                {certificate.image ? (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="p-10 rounded-2xl"
                    style={{ background: 'rgba(124,92,255,0.1)', border: '1px solid rgba(124,92,255,0.2)' }}
                  >
                    <Award size={72} style={{ color: '#7C5CFF' }} />
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-5 left-5 px-3 py-1.5 rounded-full flex items-center gap-2"
                  style={{ background: 'rgba(124,92,255,0.15)', border: '1px solid rgba(124,92,255,0.3)', backdropFilter: 'blur(8px)' }}
                >
                  <Zap size={12} className="text-yellow-400" />
                  <span className="text-xs font-semibold text-white">Terverifikasi</span>
                </motion.div>
              </div>

              {/* Right: Content */}
              <div className="p-7 md:p-8 flex flex-col justify-between">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <div className="flex items-start gap-4 mb-5">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                      className="p-3 rounded-2xl flex-shrink-0"
                      style={{ background: 'rgba(124,92,255,0.1)', border: '1px solid rgba(124,92,255,0.2)' }}
                    >
                      <Award size={22} style={{ color: '#7C5CFF' }} />
                    </motion.div>
                    <div className="flex-1">
                      <h2 className="text-xl font-black text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {certificate.title}
                      </h2>
                      <p className="text-sm font-semibold gradient-text">{certificate.issuer}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-5 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <Calendar size={14} style={{ color: '#7C5CFF' }} />
                    <span className="text-sm" style={{ color: '#A1A1AA' }}>Diperoleh pada {certificate.date}</span>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-5">
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#52525B' }}>Keterampilan</p>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill, idx) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        whileHover={{ y: -3 }}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                        style={{ background: 'rgba(124,92,255,0.1)', border: '1px solid rgba(124,92,255,0.2)', color: '#a78bfa' }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {certificate.description && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="mb-5 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#52525B' }}>Tentang Sertifikat</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>{certificate.description}</p>
                  </motion.div>
                )}

                <motion.a
                  href={certificate.credential} target="_blank" rel="noreferrer"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #7C5CFF, #4F8CFF)', boxShadow: '0 0 24px rgba(124,92,255,0.3)' }}
                >
                  <Award size={15} /> Lihat Kredensial <ExternalLink size={13} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;
