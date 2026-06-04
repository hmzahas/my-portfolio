import { motion } from 'framer-motion';
import { SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiFramer, SiNodedotjs, SiFigma, SiGit, SiVite, SiDocker, SiMongodb, SiPostgresql } from 'react-icons/si';

const items = [
  { Icon: SiReact,       name: 'React',          color: '#61DAFB' },
  { Icon: SiTypescript,  name: 'TypeScript',      color: '#3178C6' },
  { Icon: SiNextdotjs,   name: 'Next.js',         color: '#ffffff' },
  { Icon: SiTailwindcss, name: 'Tailwind CSS',    color: '#06B6D4' },
  { Icon: SiFramer,      name: 'Framer Motion',   color: '#ffffff' },
  { Icon: SiNodedotjs,   name: 'Node.js',         color: '#339933' },
  { Icon: SiFigma,       name: 'Figma',           color: '#F24E1E' },
  { Icon: SiGit,         name: 'Git',             color: '#F05032' },
  { Icon: SiVite,        name: 'Vite',            color: '#646CFF' },
  { Icon: SiDocker,      name: 'Docker',          color: '#2496ED' },
  { Icon: SiMongodb,     name: 'MongoDB',         color: '#47A248' },
  { Icon: SiPostgresql,  name: 'PostgreSQL',      color: '#4169E1' },
];

const Marquee = () => {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-4 my-8"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="absolute inset-y-0 left-0 w-24 z-10" style={{ background: 'linear-gradient(to right, var(--marquee-fade), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10" style={{ background: 'linear-gradient(to left, var(--marquee-fade), transparent)' }} />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 whitespace-nowrap items-center"
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-2 flex-shrink-0">
            <item.Icon size={16} style={{ color: item.color, opacity: 0.8 }} />
            <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              {item.name}
            </span>
            {i < doubled.length - 1 && (
              <span className="ml-4 text-accent opacity-30">·</span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
