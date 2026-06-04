import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Link } from 'lucide-react';
import { BsGithub, BsInstagram, BsWhatsapp } from 'react-icons/bs';
import { submitContactForm } from '../utils/submitForm';


const socials = [
  { icon: BsInstagram, label: 'Instagram', handle: '@img_jah', href: 'https://www.instagram.com/img_jah/' },
  { icon: BsWhatsapp, label: 'Whatsapp', handle: '(62+) 813 8068 0631', href: 'https://wa.me/081380680631' },
  { icon: Link, label: 'LinkedIn', handle: 'Hamzah Candra Yusuf', href: 'https://www.linkedin.com/in/hamzah-candra-yusuf-613773350/' },
  { icon: BsGithub, label: 'Github', handle: 'hmzahas', href: 'https://github.com/hmzahas' },
];

const info = [
  { icon: MapPin, label: 'Lokasi', value: 'Indonesia 🇮🇩' },
  { icon: Clock, label: 'Timezone', value: 'WIB (UTC+7)' },
  { icon: Mail, label: 'Email', value: 'hamzahcandra38@gmail.com', },
];

const inputClass = "w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors";

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyfPdGyYPlhnoai9RNulB2eiZCVGBZMNofBKSI1acI1zU6rrLmUNqjJGz8o50mw1p1/exec';


const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitContactForm(formState, SCRIPT_URL);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert('Gagal mengirim pesan. Silakan coba lagi nanti.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

  const inputStyle = {
    background: 'var(--input-bg)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    boxShadow: 'var(--shadow-sm)',
  };

  return (
    <main className="relative z-10 pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <p className="text-accent text-sm tracking-widest uppercase mb-3">Kontak</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Mari <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Berkolaborasi</span>
          </h1>
          <p className="text-lg max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Punya proyek menarik atau ingin berkolaborasi? Saya selalu terbuka untuk diskusi baru.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 mb-8 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-green-400 text-sm font-medium">Available for new projects</span>
            </div>

            <div className="space-y-4 mb-10">
              {info.map(({ icon: Icon, label, value }, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Temukan Saya Di</p>
            <div className="grid grid-cols-2 gap-3">
              {socials.map(({ icon: Icon, label, handle, href }, i) => (
                <motion.a
                  key={i} href={href} target="_blank" rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-3 rounded-xl p-3 transition-all"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.background = 'var(--bg-card-hover)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
                >
                  <Icon size={16} className="flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
                  <div className="min-w-0">
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{handle}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center rounded-2xl p-12"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Pesan Terkirim!</h3>
                <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Terima kasih! Saya akan membalas dalam 1–2 hari kerja.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-accent text-white rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors"
                >
                  Kirim Pesan Lagi
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Nama</label>
                    <input type="text" name="name" value={formState.name} onChange={handleChange} required placeholder="Nama kamu" className={inputClass} style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Email</label>
                    <input type="email" name="email" value={formState.email} onChange={handleChange} required placeholder="email@kamu.com" className={inputClass} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Subjek</label>
                  <input type="text" name="subject" value={formState.subject} onChange={handleChange} required placeholder="Tentang apa?" className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Pesan</label>
                  <textarea name="message" value={formState.message} onChange={handleChange} required rows={6} placeholder="Ceritakan proyekmu atau sekadar say hi..." className={`${inputClass} resize-none`} style={inputStyle} />
                </div>
                <motion.button
                  type="submit" disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full bg-accent text-white font-semibold py-4 rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      Mengirim...
                    </>
                  ) : (
                    <><Mail size={16} /> Kirim Pesan</>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </main>
  );
};

export default Contact;
