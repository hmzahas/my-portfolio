import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Coffee, Gamepad2, Music, Code2, Download } from 'lucide-react';
import allProjects from '../data/projects';

const timeline = [
  { year: '2023', title: 'Learn basic Web Dev', desc: 'HTML, CSS, JavaScript dasar' },
  { year: '2024', title: 'Learning Programming Languages ​and Tools', desc: 'PHP, Tailwind, NodeJs, Github' },
  { year: '2025', title: 'Internship', desc: 'Mengerjakan proyek Magang pertama' },
  { year: '2026', title: 'Open to Work', desc: 'Siap bergabung tim profesional' },
];

const hobbies = [
  { icon: Code2, label: 'Coding' },
  { icon: Gamepad2, label: 'Gaming' },
  { icon: Music, label: 'Music' },
  { icon: Coffee, label: 'Coffee' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  
});

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(value / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Reusable bento card
const BCard = ({ children, className = '', style = {}, onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-2xl p-5 transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)', ...style }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--border-hover)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      e.currentTarget.style.background = 'var(--bg-card-hover)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      e.currentTarget.style.background = 'var(--bg-card)';
    }}
  >
    {children}
  </div>
);

const About = () => {
  return (
    <main className="relative z-10 pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-12">
          <p className="text-accent text-sm tracking-widest uppercase mb-3">Tentang Saya</p>
          <h1 className="text-5xl md:text-6xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Kenalan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Yuk 👋
            </span>
          </h1>
        </motion.div>

        {/* Split Layout */}
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* LEFT — Sticky Photo Card */}
          <motion.div
            {...fadeUp(0.1)}
            className="md:w-64 flex-shrink-0 md:sticky md:top-28"
          >
            {/* Avatar Card */}
            <div
              className="rounded-3xl overflow-hidden mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15))',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              {/* Gradient header */}
              <div
                className="h-24 w-full"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)' }}
              />
              {/* Avatar */}
              <div className="px-5 pb-5">
                <div className="relative mx-auto w-50 h-50 rounded-3xl overflow-hidden -mt-12 mb-3 border-4 border-white shadow-lg">
                  <img src="/profile.jpeg" alt="Foto Hamzah" className="w-full h-full object-cover" />
                </div>
                <p className="font-bold text-2" style={{ color: 'var(--text-primary)' }}>HAMZAH CANDRA YUSUF</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>FRESH GRADUATE</p>
                </div>
                <div className="flex items-center gap-1.5 mt-5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  <span className="text-green-400 text-xs">Open to work</span>
                </div>
              </div>
            </div>

            {/* Info pills */}
            <div className="space-y-2 mb-3">
              {[
                { icon: MapPin, text: 'Indonesia 🇮🇩' },
                { icon: Clock, text: 'WIB (UTC+7)' },
              ].map(({ icon: Icon, text }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)',}}
                >
                  <Icon size={14} className="text-accent flex-shrink-0" />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* FILE & Download CV Button */}
            <motion.a
              href="/CV%20Hamzah%20Candra%20Yusuf.pdf"
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}
            >
              <Download size={15} />
              Download CV
            </motion.a>
          </motion.div>

          {/* RIGHT — Bento Grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 gap-4">

              {/* Bio — full width */}
              <motion.div {...fadeUp(0.15)} className="col-span-2">
                <BCard>
                  <p className="text-[11px] uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Bio</p>
                  <p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Saya adalah seorang <span style={{ color: 'var(--text-primary)' }}> Freshgraduate </span> SMK jurusan Rekayasa Perangkat Lunak yang tertarik pada bidang Frontend Developer yang passionate terhadap desain UI/UX, dan pengalaman pengguna yang berkesan.
                    Dari sana, saya membangun website modern yang responsif, interaktif, dan memberikan pengalaman pengguna yang nyaman.
                    Saya juga mengikuti pelatihan dibidang UI/UX Desain yang memperkuat pemahaman dalam proses desain.
                  </p>
                  <p className="leading-relaxed text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>
                    Saya percaya bahwa produk digital yang baik bukan hanya berfungsi tapi juga memberikan
                    <span style={{ color: 'var(--text-primary)' }}> feeling</span> kepada penggunanya.
                  </p>
                </BCard>
              </motion.div>

              {/* Stats — 3 cards */}
              {[
                { value: allProjects.length, suffix: '+', label: 'Projects' },
                { value: 3, suffix: '+', label: 'Years Exp' },
              ].map((s, i) => (
                <motion.div key={i} {...fadeUp(0.2 + i * 0.05)} className={i === 2 ? 'col-span-2 sm:col-span-1' : ''}>
                  <BCard className="text-center py-6">
                    <p className="text-3xl font-black text-accent mb-1">
                      <Counter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                  </BCard>
                </motion.div>
              ))}

{/* Hobbies */}
              <motion.div {...fadeUp(0.35)} className="col-span-2 sm:col-span-1">
                <BCard className="h-full">
                  <p className="text-[11px] uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Hobi</p>
                  <div className="grid grid-cols-2 gap-2">
                    {hobbies.map(({ icon: Icon, label }, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-xl px-3 py-2"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                      >
                        <Icon size={14} className="text-accent" />
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </BCard>
              </motion.div>

              {/* Currently */}
              <motion.div {...fadeUp(0.38)} className="col-span-2 sm:col-span-1">
                <BCard className="h-full flex flex-col justify-between">
                  <p className="text-[11px] uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Currently</p>
                  <div className="space-y-3">
                    {[
                      { dot: 'bg-green-400', text: 'Open to Work' },
                      { dot: 'bg-blue-400', text: 'Improving Skills' },
                      { dot: 'bg-purple-400', text: 'Building a Business' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </BCard>
              </motion.div>

              {/* Timeline — full width */}
              <motion.div {...fadeUp(0.45)} className="col-span-2">
                <BCard>
                  <p className="text-[11px] uppercase tracking-widest mb-6" style={{ color: 'var(--text-muted)' }}>Journey</p>
                  <div className="relative">
                    <div className="absolute left-[7px] top-0 bottom-0 w-px" style={{ background: 'var(--border)' }} />
                    {timeline.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="relative pl-8 pb-6 last:pb-0"
                      >
                        <div
                          className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-accent"
                          style={{ border: '2px solid var(--bg)' }}
                        />
                        <p className="text-accent text-xs font-mono mb-0.5">{item.year}</p>
                        <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </BCard>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default About;
