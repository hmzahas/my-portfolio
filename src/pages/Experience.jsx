import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    role: 'Frontend Developer Intern',
    company: 'Magang Pertama',
    date: '2025',
    type: 'Internship',
    color: '#7C5CFC',
    description: 'Mengerjakan proyek magang pertama — membangun fitur frontend, berkolaborasi dengan tim, dan menerapkan best practices dalam pengembangan web modern.',
    stack: ['React', 'Tailwind CSS', 'Laravel', 'MySQL'],
  },
  {
    role: 'UI/UX Design Training',
    company: 'Pelatihan Desain',
    date: '2024',
    type: 'Training',
    color: '#4F8CFF',
    description: 'Mengikuti pelatihan intensif UI/UX Design yang memperkuat pemahaman dalam proses desain, user research, wireframing, dan prototyping.',
    stack: ['Figma', 'Prototyping', 'User Research', 'Design System'],
  },
  {
    role: 'Self-taught Developer',
    company: 'Independent Learning',
    date: '2024',
    type: 'Learning',
    color: '#00E5FF',
    description: 'Mempelajari PHP, Tailwind CSS, Node.js, dan Git secara mandiri. Membangun berbagai proyek untuk memperkuat skill programming.',
    stack: ['PHP', 'Tailwind', 'Node.js', 'GitHub'],
  },
  {
    role: 'Web Development Basics',
    company: 'SMK RPL',
    date: '2023',
    type: 'Education',
    color: '#a78bfa',
    description: 'Memulai perjalanan di dunia web development — belajar HTML, CSS, dan JavaScript dasar sebagai fondasi karir sebagai developer.',
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
];

const TimelineItem = ({ exp, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="relative flex gap-6 md:gap-10 items-start"
    >
      {/* Dot */}
      <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: 20 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-4 h-4 rounded-full mt-1 z-10 relative"
          style={{ background: exp.color, boxShadow: `0 0 16px ${exp.color}60` }}
        />
      </div>

      {/* Card */}
      <div
        className="flex-1 rounded-3xl p-6 md:p-8 mb-8 transition-all duration-500 hover:scale-[1.01]"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid rgba(255,255,255,0.07)`,
          backdropFilter: 'blur(10px)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${exp.color}30`;
          e.currentTarget.style.boxShadow = `0 0 30px ${exp.color}10`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <span
              className="text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full font-medium mb-3 inline-block"
              style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}25` }}
            >
              {exp.type}
            </span>
            <h3 className="text-xl font-black" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>{exp.role}</h3>
            <p className="text-sm mt-1" style={{ color: '#9CA3AF' }}>{exp.company}</p>
          </div>
          <span className="text-sm font-mono px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', color: '#6B7280', border: '1px solid rgba(255,255,255,0.07)' }}>
            {exp.date}
          </span>
        </div>

        <p className="text-sm leading-relaxed mb-5" style={{ color: '#9CA3AF' }}>{exp.description}</p>

        <div className="flex flex-wrap gap-2">
          {exp.stack.map(tech => (
            <span key={tech} className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#6B7280' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => (
  <main className="relative z-10 pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
    <div className="max-w-3xl mx-auto">

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
        <p className="text-sm tracking-widest uppercase mb-4 gradient-text font-medium">Journey</p>
        <h1 className="text-5xl md:text-7xl font-black mb-6" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>
          Experience
        </h1>
        <p className="text-lg max-w-xl" style={{ color: '#9CA3AF' }}>
          Perjalanan belajar dan pengalaman yang membentuk saya sebagai developer.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[9px] top-2 bottom-2 w-px origin-top"
          style={{ background: 'linear-gradient(to bottom, #7C5CFC, #4F8CFF, rgba(0,229,255,0.3), transparent)' }}
        />

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <TimelineItem key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>

    </div>
  </main>
);

export default Experience;
