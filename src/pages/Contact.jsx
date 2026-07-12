import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send } from 'lucide-react';
import { BsGithub, BsInstagram, BsWhatsapp, BsLinkedin } from 'react-icons/bs';
import { submitContactForm } from '../utils/submitForm';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyfPdGyYPlhnoai9RNulB2eiZCVGBZMNofBKSI1acI1zU6rrLmUNqjJGz8o50mw1p1/exec';

const socials = [
  { icon: BsGithub,    label: 'GitHub',    handle: 'hmzahas',              href: 'https://github.com/hmzahas',                                          color: '#ffffff' },
  { icon: BsLinkedin,  label: 'LinkedIn',  handle: 'Hamzah Candra Yusuf',  href: 'https://www.linkedin.com/in/hamzah-candra-yusuf-613773350/',           color: '#0A66C2' },
  { icon: BsInstagram, label: 'Instagram', handle: '@img_jah',             href: 'https://www.instagram.com/img_jah/',                                   color: '#E1306C' },
  { icon: BsWhatsapp,  label: 'WhatsApp',  handle: '+62 813 8068 0631',    href: 'https://wa.me/081380680631',                                           color: '#25D366' },
];

const info = [
  { icon: Mail,   label: 'Email',    value: 'hamzahcandra38@gmail.com' },
  { icon: MapPin, label: 'Lokasi',   value: 'Indonesia 🇮🇩' },
  { icon: Clock,  label: 'Timezone', value: 'WIB (UTC+7)' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContactForm(form, SCRIPT_URL);
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'white',
    borderRadius: 14,
    width: '100%',
    padding: '12px 16px',
    fontSize: 14,
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'Inter, sans-serif',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = 'rgba(124,92,255,0.5)';
    e.target.style.boxShadow = '0 0 0 3px rgba(124,92,255,0.08)';
    e.target.style.background = 'rgba(124,92,255,0.04)';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'rgba(255,255,255,0.03)';
  };

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">

        <motion.div {...fadeUp(0)} className="mb-16">
          <span className="section-label">Kontak</span>
          <h1 className="text-5xl md:text-7xl font-black mb-4" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>
            Mari Berkolaborasi
          </h1>
          <p className="text-lg max-w-xl" style={{ color: '#A1A1AA' }}>
            Punya proyek menarik atau ingin berkolaborasi? Saya selalu terbuka untuk diskusi baru.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Left */}
          <motion.div {...fadeUp(0.1)} className="space-y-6">
            {/* Available badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              <span className="text-sm font-medium text-green-400">Available for new projects</span>
            </div>

            {/* Info */}
            <div className="space-y-3">
              {info.map(({ icon: Icon, label, value }, i) => (
                <motion.div key={i} {...fadeUp(0.15 + i * 0.08)}
                  className="flex items-center gap-4 rounded-2xl px-5 py-4"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(124,92,255,0.1)', border: '1px solid rgba(124,92,255,0.2)' }}>
                    <Icon size={15} style={{ color: '#7C5CFF' }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: '#52525B' }}>{label}</p>
                    <p className="text-sm font-medium text-white">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#3F3F46' }}>Temukan Saya Di</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon: Icon, label, handle, href, color }, i) => (
                  <motion.a key={i} href={href} target="_blank" rel="noreferrer"
                    {...fadeUp(0.3 + i * 0.06)}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="flex items-center gap-3 rounded-2xl p-4 transition-all"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}30`; e.currentTarget.style.background = `${color}08`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}
                  >
                    <Icon size={15} style={{ color, flexShrink: 0 }} />
                    <div className="min-w-0">
                      <p className="text-xs" style={{ color: '#52525B' }}>{label}</p>
                      <p className="text-xs font-medium truncate text-white">{handle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div {...fadeUp(0.2)}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center rounded-3xl p-12"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-black mb-2 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Pesan Terkirim!</h3>
                <p className="mb-6 text-sm" style={{ color: '#A1A1AA' }}>Terima kasih! Saya akan membalas dalam 1–2 hari kerja.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #7C5CFF, #4F8CFF)' }}
                >
                  Kirim Pesan Lagi
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: 'Nama', placeholder: 'Nama kamu', type: 'text' },
                    { name: 'email', label: 'Email', placeholder: 'email@kamu.com', type: 'email' },
                  ].map(({ name, label, placeholder, type }) => (
                    <div key={name}>
                      <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: '#52525B' }}>{label}</label>
                      <input
                        type={type} name={name} value={form[name]} required
                        onChange={e => setForm({ ...form, [name]: e.target.value })}
                        placeholder={placeholder}
                        style={inputStyle}
                        onFocus={handleFocus} onBlur={handleBlur}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: '#52525B' }}>Subjek</label>
                  <input
                    type="text" name="subject" value={form.subject} required
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    placeholder="Tentang apa?"
                    style={inputStyle}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: '#52525B' }}>Pesan</label>
                  <textarea
                    name="message" value={form.message} required rows={6}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Ceritakan proyekmu atau sekadar say hi..."
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={handleFocus} onBlur={handleBlur}
                  />
                </div>
                <motion.button
                  type="submit" disabled={submitting}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                  style={{ background: 'linear-gradient(135deg, #7C5CFF, #4F8CFF)', boxShadow: '0 0 30px rgba(124,92,255,0.25)' }}
                >
                  {submitting ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 rounded-full" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
                      Mengirim...
                    </>
                  ) : (
                    <><Send size={15} /> Kirim Pesan</>
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
