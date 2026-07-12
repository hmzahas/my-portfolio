import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiReact, SiTailwindcss, SiFramer, SiHtml5, SiCss, SiJavascript, SiNodedotjs, SiFigma, SiGit, SiGithub, SiVite, SiVscodium, SiVercel, SiPhp, SiMysql, SiBootstrap, SiLaravel } from 'react-icons/si';

const categories = [
  {
    id: 'frontend', label: 'Frontend', desc: 'UI & pengalaman pengguna', color: '#7C5CFF',
    skills: [
      { name: 'React JS',      Icon: SiReact,       color: '#61DAFB', desc: 'Library utama untuk membangun UI interaktif' },
      { name: 'Tailwind CSS',  Icon: SiTailwindcss, color: '#06B6D4', desc: 'Utility-first CSS framework yang cepat' },
      { name: 'Framer Motion', Icon: SiFramer,      color: '#ffffff', desc: 'Animasi dan transisi yang smooth & powerful' },
      { name: 'JavaScript',    Icon: SiJavascript,  color: '#F7DF1E', desc: 'Bahasa pemrograman utama web modern' },
      { name: 'HTML5',         Icon: SiHtml5,       color: '#E34F26', desc: 'Struktur dan semantik halaman web' },
      { name: 'CSS3',          Icon: SiCss,         color: '#1572B6', desc: 'Styling dan layout halaman web' },
    ],
  },
  {
    id: 'backend', label: 'Backend', desc: 'Server & database', color: '#22C55E',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933', desc: 'Runtime JavaScript di sisi server' },
      { name: 'PHP',     Icon: SiPhp,       color: '#777BB4', desc: 'Server-side scripting yang powerful' },
      { name: 'MySQL',   Icon: SiMysql,     color: '#00758F', desc: 'Database relasional yang powerful' },
      { name: 'Laravel', Icon: SiLaravel,   color: '#FF2D20', desc: 'Framework PHP yang bersifat open-source' },
    ],
  },
  {
    id: 'tools', label: 'Tools', desc: 'Workflow & desain', color: '#4F8CFF',
    skills: [
      { name: 'Figma',     Icon: SiFigma,    color: '#F24E1E', desc: 'Desain UI/UX dan prototyping kolaboratif' },
      { name: 'Git',       Icon: SiGit,      color: '#F05032', desc: 'Version control untuk manajemen kode' },
      { name: 'GitHub',    Icon: SiGithub,   color: '#ffffff', desc: 'Platform kolaborasi dan hosting kode' },
      { name: 'Vite',      Icon: SiVite,     color: '#646CFF', desc: 'Build tool yang sangat cepat' },
      { name: 'VS Code',   Icon: SiVscodium, color: '#007ACC', desc: 'Editor kode utama dengan ekstensi lengkap' },
      { name: 'Bootstrap', Icon: SiBootstrap,color: '#7952B3', desc: 'CSS framework yang populer' },
      { name: 'Vercel',    Icon: SiVercel,   color: '#ffffff', desc: 'Platform deployment frontend yang seamless' },
    ],
  },
];

const SkillCard = ({ skill, color, index }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.35, delay: index * 0.04 }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="group rounded-2xl p-5 cursor-default transition-all duration-300"
    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = `${color}35`;
      e.currentTarget.style.boxShadow = `0 8px 32px ${color}12, 0 0 0 1px ${color}20`;
      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
    }}
  >
    <div className="flex items-center gap-4">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{ background: `${color}10`, border: `1px solid ${color}20` }}
      >
        <skill.Icon size={20} style={{ color: skill.color }} />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-sm mb-0.5 text-white">{skill.name}</p>
        <p className="text-xs leading-relaxed" style={{ color: '#52525B' }}>{skill.desc}</p>
      </div>
    </div>
  </motion.div>
);

const Skills = () => {
  const [active, setActive] = useState('frontend');
  const current = categories.find(c => c.id === active);
  const total = categories.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <main className="relative z-10 pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <span className="section-label">Kemampuan</span>
          <h1 className="text-5xl md:text-7xl font-black mb-4" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>
            Tech Stack
          </h1>
          <p className="text-lg max-w-xl" style={{ color: '#A1A1AA' }}>
            Teknologi dan tools yang saya gunakan sehari-hari untuk membangun produk digital.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Category selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:w-56 flex-shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto pb-1"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                whileTap={{ scale: 0.97 }}
                className="relative w-full text-left rounded-2xl px-5 py-4 transition-all duration-300 overflow-hidden"
                style={active === cat.id ? {
                  background: `${cat.color}10`,
                  border: `1px solid ${cat.color}30`,
                  boxShadow: `0 4px 24px ${cat.color}12`,
                } : {
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {active === cat.id && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
                    style={{ background: cat.color }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <p className="font-bold text-sm mb-0.5" style={{ color: active === cat.id ? cat.color : '#71717A' }}>
                  {cat.label}
                </p>
                <p className="text-xs hidden md:block" style={{ color: '#3F3F46' }}>{cat.desc}</p>
                <p className="text-xs mt-1 font-mono" style={{ color: active === cat.id ? `${cat.color}80` : '#3F3F46' }}>
                  {cat.skills.length} skills
                </p>
              </motion.button>
            ))}

            <div className="hidden md:block rounded-2xl px-5 py-4 mt-2" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs mb-1" style={{ color: '#52525B' }}>Total Skills</p>
              <p className="text-3xl font-black gradient-text" style={{ fontFamily: 'Syne, sans-serif' }}>{total}</p>
            </div>
          </motion.div>

          {/* Skill grid */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active + '-header'}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-2 h-2 rounded-full" style={{ background: current.color, boxShadow: `0 0 10px ${current.color}` }} />
                <p className="font-bold text-white">{current.label}</p>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: `${current.color}15`, color: current.color }}>
                  {current.skills.length}
                </span>
                <p className="text-sm" style={{ color: '#52525B' }}>— {current.desc}</p>
              </motion.div>
            </AnimatePresence>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {current.skills.map((skill, i) => (
                  <SkillCard key={active + skill.name} skill={skill} color={current.color} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Skills;
