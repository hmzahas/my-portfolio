import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiReact, SiTailwindcss, SiFramer, SiHtml5, SiCss, SiJavascript, SiNodedotjs,SiFigma, SiGit, SiGithub, SiVite, SiVscodium, SiVercel, SiPhp, SiMysql, SiBootstrap, SiLaravel } from 'react-icons/si';

const categories = [
  {
    id: 'frontend',
    label: 'Frontend',
    desc: 'UI & pengalaman pengguna',
    color: '#6366f1',
    skills: [
      { name: 'React JS',       Icon: SiReact,        color: '#61DAFB', desc: 'Library utama untuk membangun UI interaktif' },
      { name: 'Tailwind CSS',   Icon: SiTailwindcss,  color: '#06B6D4', desc: 'Utility-first CSS framework yang cepat' },
      { name: 'Framer Motion',  Icon: SiFramer,       color: '#ffffff', desc: 'Animasi dan transisi yang smooth & powerful' },
      { name: 'JavaScript',     Icon: SiJavascript,   color: '#F7DF1E', desc: 'Bahasa pemrograman utama web modern' },
      { name: 'HTML5',          Icon: SiHtml5,        color: '#E34F26', desc: 'Struktur dan semantik halaman web' },
      { name: 'CSS3',           Icon: SiCss,          color: '#1572B6', desc: 'Styling dan layout halaman web' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    desc: 'Server & database',
    color: '#10b981',
    skills: [
      { name: 'Node.js',      Icon: SiNodedotjs,   color: '#339933', desc: 'Runtime JavaScript di sisi server' },
      { name: 'PHP',          Icon: SiPhp,          color: '#3178C6', desc: 'Server-side scripting' },
      { name: 'MySQL',        Icon: SiMysql,  color: '#00758F', desc: 'Database relasional yang powerful' },
      { name: 'Laravel',      Icon: SiLaravel,  color: '#00758F', desc: 'Framework PHP yang bersifat open-source' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    desc: 'Workflow & desain',
    color: '#a855f7',
    skills: [
      { name: 'Figma',    Icon: SiFigma,              color: '#F24E1E', desc: 'Desain UI/UX dan prototyping kolaboratif' },
      { name: 'Git',      Icon: SiGit,                color: '#F05032', desc: 'Version control untuk manajemen kode' },
      { name: 'GitHub',   Icon: SiGithub,             color: '#ffffff', desc: 'Platform kolaborasi dan hosting kode' },
      { name: 'Vite',     Icon: SiVite,               color: '#646CFF', desc: 'Build tool yang sangat cepat untuk development' },
      { name: 'VS Code',  Icon: SiVscodium,   color: '#007ACC', desc: 'Editor kode utama dengan ekstensi lengkap' },
      { name: 'Bootstrap', Icon: SiBootstrap,             color: '#ffffff', desc: 'Platform deployment frontend yang seamless' },
      { name: 'Vercel',   Icon: SiVercel,             color: '#ffffff', desc: 'Platform deployment frontend yang seamless' },
    ],
  },
];

const SkillCard = ({ skill, color, index }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    whileHover={{ y: -4 }}
    className="group rounded-2xl p-5 cursor-default transition-all duration-300"
    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = `${color}40`;
      e.currentTarget.style.boxShadow = `0 8px 24px ${color}15, var(--shadow-md)`;
      e.currentTarget.style.background = 'var(--bg-card-hover)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      e.currentTarget.style.background = 'var(--bg-card)';
    }}
  >
    <div className="flex items-center gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}12`, border: `1px solid ${color}25` }}
      >
        <skill.Icon size={20} style={{ color: skill.color }} />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--text-primary)' }}>{skill.name}</p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{skill.desc}</p>
      </div>
    </div>
  </motion.div>
);

const Skills = () => {
  const [active, setActive] = useState('frontend');
  const current = categories.find(c => c.id === active);

  return (
    <main className="relative z-10 pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <p className="text-accent text-sm tracking-widest uppercase mb-3">Kemampuan</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Tech{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Stack</span>
          </h1>
          <p className="text-lg max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Teknologi dan tools yang saya gunakan sehari-hari untuk membangun produk digital.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">

          {/* Left — Category Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:w-56 flex-shrink-0 flex flex-row md:flex-col gap-3"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                whileHover={{ x: active === cat.id ? 0 : 4 }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full text-left rounded-2xl px-5 py-4 transition-all duration-300 overflow-hidden"
                style={active === cat.id ? {
                  background: `${cat.color}12`,
                  border: `1px solid ${cat.color}35`,
                  boxShadow: `0 4px 20px ${cat.color}15`,
                } : {
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {active === cat.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
                    style={{ background: cat.color }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <p className="font-semibold text-sm mb-0.5" style={{ color: active === cat.id ? cat.color : 'var(--text-primary)' }}>
                  {cat.label}
                </p>
                <p className="text-xs hidden md:block" style={{ color: 'var(--text-muted)' }}>{cat.desc}</p>
                <p className="text-xs mt-1 font-mono" style={{ color: active === cat.id ? `${cat.color}80` : 'var(--text-muted)' }}>
                  {cat.skills.length} skills
                </p>
              </motion.button>
            ))}

            <div className="hidden md:block rounded-2xl px-5 py-4 mt-2" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Total Skills</p>
              <p className="text-2xl font-black mt-1" style={{ color: 'var(--text-primary)' }}>
                {categories.reduce((acc, c) => acc + c.skills.length, 0)}
              </p>
            </div>
          </motion.div>

          {/* Right — Skill Grid */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active + '-header'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="w-2 h-2 rounded-full" style={{ background: current.color, boxShadow: `0 0 8px ${current.color}` }} />
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{current.label}</p>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: `${current.color}15`, color: current.color }}>
                  {current.skills.length}
                </span>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>— {current.desc}</p>
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
