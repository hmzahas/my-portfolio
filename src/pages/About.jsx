import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Download } from 'lucide-react';
import allProjects from '../data/projects';

const timeline = [
  { year: '2023', title: 'Learn basic Web Dev', desc: 'HTML, CSS, JavaScript dasar sebagai fondasi karir developer.' },
  { year: '2024', title: 'Learning Programming Languages and Tools', desc: 'PHP, Tailwind, NodeJs, Github — memperluas skill stack.' },
  { year: '2025', title: 'Internship', desc: 'Mengerjakan proyek magang pertama bersama tim profesional.' },
  { year: '2026', title: 'Open to Work', desc: 'Siap bergabung tim profesional dan mengerjakan proyek impactful.' },
];

const hobbies = ['Coding 💻', 'Gaming 🎮', 'Music 🎵', 'Coffee ☕'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
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

const GCard = ({ children, className = '', onClick, style = {} }) => (
  <div
    onClick={onClick}
    className={`glass glass-hover rounded-3xl p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    style={style}
  >
    {children}
  </div>
);

const JourneyAccordion = ({ items }) => {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left transition-all"
            style={{ background: open === i ? 'rgba(124,92,255,0.06)' : 'transparent' }}
          >
            <div className="flex items-center gap-6">
              <span className="text-2xl font-black tabular-nums flex-shrink-0" style={{ fontFamily: 'Syne, sans-serif', color: open === i ? '#7C5CFF' : '#3F3F46' }}>
                {item.year}
              </span>
              <span className="text-sm font-semibold" style={{ color: open === i ? 'white' : '#71717A' }}>
                {item.title}
              </span>
            </div>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-lg flex-shrink-0" style={{ color: '#52525B' }}>
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 flex gap-6 items-start">
                  <div className="w-px self-stretch flex-shrink-0" style={{ background: '#7C5CFF', marginLeft: '2.8rem' }} />
                  <p className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>{item.desc}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const About = () => (
  <main className="relative z-10 pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
    <div className="max-w-7xl mx-auto">

      <motion.div {...fadeUp(0)} className="mb-16">
        <span className="section-label">Tentang Saya</span>
        <h1 className="text-5xl md:text-7xl font-black leading-tight" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>
          Kenalan <span style={{ color: '#4F8CFF' }}>Yuk</span>
        </h1>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 items-start">

        {/* LEFT sticky */}
        <motion.div {...fadeUp(0.1)} className="md:w-64 flex-shrink-0 md:sticky md:top-28 space-y-4">
          {/* Avatar */}
          <div className="glass rounded-3xl overflow-hidden">
            <div className="h-20 w-full" style={{ background: 'linear-gradient(135deg, #7C5CFF, #4F8CFF)' }} />
            <div className="px-5 pb-5">
              <div className="relative mx-auto w-20 h-20 rounded-2xl overflow-hidden -mt-10 mb-3 border-2 shadow-lg" style={{ borderColor: 'rgba(124,92,255,0.4)' }}>
                <img src="/profile.jpeg" alt="Hamzah" className="w-full h-full object-cover" />
              </div>
              <p className="font-bold text-sm text-white">HAMZAH CANDRA YUSUF</p>
              <p className="text-xs mt-1" style={{ color: '#71717A' }}>FRESH GRADUATE</p>
              <div className="flex items-center gap-2 mt-4">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                <span className="text-green-400 text-xs">Open to work</span>
              </div>
            </div>
          </div>

          {/* Info */}
          {[{ icon: MapPin, text: 'Indonesia 🇮🇩' }, { icon: Clock, text: 'WIB (UTC+7)' }].map(({ icon: Icon, text }, i) => (
            <div key={i} className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
              <Icon size={13} style={{ color: '#7C5CFF' }} />
              <span className="text-sm" style={{ color: '#A1A1AA' }}>{text}</span>
            </div>
          ))}

          <motion.a
            href="/sertif/CV%20Hamzah%20Candra%20Yusuf%20terbaru.pdf"
            download
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #7C5CFF, #4F8CFF)', boxShadow: '0 0 24px rgba(124,92,255,0.3)' }}
          >
            <Download size={14} /> Download CV
          </motion.a>
        </motion.div>

        {/* RIGHT bento */}
        <div className="flex-1 min-w-0 grid grid-cols-2 gap-4">

          {/* Bio */}
          <motion.div {...fadeUp(0.15)} className="col-span-2">
            <GCard>
              <p className="section-label">Bio</p>
              <p className="leading-relaxed text-sm" style={{ color: '#A1A1AA' }}>
                Saya adalah seorang <span className="text-white font-medium">Freshgraduate</span> SMK jurusan Rekayasa Perangkat Lunak yang tertarik pada bidang Frontend Developer yang passionate terhadap desain UI/UX, dan pengalaman pengguna yang berkesan.
                Dari sana, saya membangun website modern yang responsif, interaktif, dan memberikan pengalaman pengguna yang nyaman.
              </p>
              <p className="leading-relaxed text-sm mt-3" style={{ color: '#A1A1AA' }}>
                Saya percaya bahwa produk digital yang baik bukan hanya berfungsi tapi juga memberikan
                <span className="text-white font-medium"> feeling</span> kepada penggunanya.
              </p>
            </GCard>
          </motion.div>

          {/* Stats */}
          {[
            { value: allProjects.length, suffix: '+', label: 'Projects' },
            { value: 3, suffix: '+', label: 'Years Exp' },
          ].map((s, i) => (
            <motion.div key={i} {...fadeUp(0.2 + i * 0.05)}>
              <GCard className="text-center py-8">
                <p className="text-4xl font-black mb-1 gradient-text" style={{ fontFamily: 'Syne, sans-serif' }}>
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs" style={{ color: '#52525B' }}>{s.label}</p>
              </GCard>
            </motion.div>
          ))}

          {/* Hobbies */}
          <motion.div {...fadeUp(0.3)} className="col-span-2 sm:col-span-1">
            <GCard className="h-full">
              <p className="section-label">Hobi</p>
              <div className="grid grid-cols-2 gap-2">
                {hobbies.map((h, i) => (
                  <div key={i} className="text-sm px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}>
                    {h}
                  </div>
                ))}
              </div>
            </GCard>
          </motion.div>

          {/* Currently */}
          <motion.div {...fadeUp(0.33)} className="col-span-2 sm:col-span-1">
            <GCard className="h-full flex flex-col justify-between">
              <p className="section-label">Currently</p>
              <div className="space-y-3">
                {[
                  { dot: '#22C55E', text: 'Open to Work' },
                  { dot: '#4F8CFF', text: 'Improving Skills' },
                  { dot: '#7C5CFF', text: 'Building a Business' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.dot, boxShadow: `0 0 8px ${item.dot}` }} />
                    <span className="text-sm" style={{ color: '#A1A1AA' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </GCard>
          </motion.div>



        </div>
      </div>
    </div>
  </main>
);

export default About;
