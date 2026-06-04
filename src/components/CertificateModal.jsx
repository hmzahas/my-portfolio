import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, ExternalLink, Calendar, Zap } from 'lucide-react';

const CertificateModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      {certificate && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-3xl mx-auto rounded-3xl z-[101] overflow-hidden"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', boxShadow: '0 50px 100px rgba(0,0,0,0.5)' }}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full transition-all z-20"
              style={{ background: 'rgba(99,102,241,0.2)', color: '#6366f1' }}
            >
              <X size={20} />
            </motion.button>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Certificate Image */}
              <div className="relative h-96 md:h-auto bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-transparent overflow-hidden flex items-center justify-center">
                {certificate.image && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-full object-cover rounded-xl md:rounded-none"
                    style={{
                      boxShadow: '0 20px 60px rgba(99,102,241,0.2)',
                    }}
                  />
                )}
                {!certificate.image && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="p-12 rounded-2xl"
                    style={{ background: 'rgba(99,102,241,0.15)' }}
                  >
                    <Award size={80} className="text-accent" />
                  </motion.div>
                )}
                
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-6 left-6 px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2"
                  style={{
                    background: 'rgba(99,102,241,0.2)',
                    border: '1px solid rgba(99,102,241,0.4)',
                  }}
                >
                  <Zap size={14} className="text-yellow-400" />
                  <span className="text-sm font-semibold text-white">Terverifikasi</span>
                </motion.div>
              </div>

              {/* Right: Content */}
              <div className="p-8 md:p-10 flex flex-col justify-between">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="p-4 rounded-2xl flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))',
                        border: '1px solid rgba(99,102,241,0.3)',
                      }}
                    >
                      <Award size={28} className="text-accent" />
                    </motion.div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {certificate.title}
                      </h2>
                      <p className="text-lg font-semibold" style={{ color: '#6366f1' }}>
                        {certificate.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
                    <Calendar size={18} style={{ color: '#6366f1' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Diperoleh pada {certificate.date}
                    </span>
                  </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
                    Keterampilan yang Diperoleh
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {certificate.skills.map((skill, idx) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        whileHover={{ y: -4 }}
                        className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                        style={{
                          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))',
                          border: '1px solid rgba(99,102,241,0.3)',
                          color: '#6366f1',
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Description */}
                {certificate.description && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8 pb-8 border-b"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                      Tentang Sertifikat
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {certificate.description}
                    </p>
                  </motion.div>
                )}

                {/* Credential Button */}
                <motion.a
                  href={certificate.credential}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    boxShadow: '0 10px 30px rgba(99,102,241,0.3)',
                  }}
                >
                  <Award size={18} />
                  Lihat Kredensial Resmi
                  <ExternalLink size={16} />
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
