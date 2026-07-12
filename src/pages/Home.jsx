import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import Marquee from '../components/Marquee';
import { ArrowUpRight } from 'lucide-react';
import { SiHtml5, SiCss, SiJavascript, SiReact, SiTailwindcss, SiFramer, SiNodedotjs, SiFigma, SiGithub, SiLaravel, SiPhp } from 'react-icons/si';
import allProjects from '../data/projects';

const techStack = [
  { name: 'React',          Icon: SiReact,       color: '#61DAFB' },
  { name: 'JavaScript',     Icon: SiJavascript,  color: '#F7DF1E' },
  { name: 'Tailwind',       Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Framer Motion',  Icon: SiFramer,      color: '#ffffff' },
  { name: 'Node.js',        Icon: SiNodedotjs,   color: '#339933' },
  { name: 'Laravel',        Icon: SiLaravel,     color: '#FF2D20' },
  { name: 'PHP',            Icon: SiPhp,         color: '#777BB4' },
  { name: 'Figma',          Icon: SiFigma,       color: '#F24E1E' },
  { name: 'Github',         Icon: SiGithub,      color: '#FFFFFF' },
  { name: 'HTML5',          Icon: SiHtml5,       color: '#E34F26' },
  { name: 'CSS',            Icon: SiCss,         color: '#1572B6' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const GlassCard = ({ onClick, children, className = '', style = {} }) => (
  <div
    onClick={onClick}
    className={`h-full rounded-3xl transition-all duration-500 ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(10px)',
      ...style,
    }}
    onMouseEnter={e => {
      if (onClick) {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(124,92,252,0.25)';
        e.currentTarget.style.boxShadow = '0 0 40px rgba(124,92,252,0.08)';
      }
    }}
    onMouseLeave={e => {
      if (onClick) {
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.boxShadow = 'none';
      }
    }}
  >
    {children}
  </div>
);

const BentoGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-16 lg:px-24 pt-4 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">

        {/* Status */}
        <motion.div {...fadeUp(0.08)} className="md:col-span-4">
          <GlassCard className="min-h-[140px] md:min-h-[190px] p-7 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              <span className="text-green-400 text-xs tracking-wide">Available now</span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: '#4B5563' }}>Status</p>
              <p className="font-black text-xl leading-tight" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>Open to<br />Work</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Projects CTA */}
        <motion.div {...fadeUp(0.12)} className="md:col-span-4">
          <div
            onClick={() => navigate('/projects')}
            className="group h-full min-h-[140px] md:min-h-[190px] rounded-3xl p-7 cursor-pointer flex flex-col justify-between transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(124,92,252,0.15), rgba(79,140,255,0.08))',
              border: '1px solid rgba(124,92,252,0.2)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,92,252,0.25), rgba(79,140,255,0.15))';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(124,92,252,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,92,252,0.15), rgba(79,140,255,0.08))';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#7C5CFC' }}>Portfolio</span>
            <div className="flex items-end justify-between">
              <p className="font-black text-2xl leading-tight" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>
                {allProjects.length}+<br />Projects
              </p>
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(124,92,252,0.2)', border: '1px solid rgba(124,92,252,0.3)' }}
              >
                <ArrowUpRight size={16} style={{ color: '#7C5CFC' }} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div {...fadeUp(0.16)} className="md:col-span-7">
          <GlassCard onClick={() => navigate('/skills')} className="min-h-[140px] md:min-h-[190px] p-7">
            <div className="flex items-start justify-between mb-5">
              <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#4B5563' }}>Tech Stack</span>
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#7C5CFC' }} />
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                  style={{ color: '#9CA3AF', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <tech.Icon size={11} style={{ color: tech.color }} />
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Years */}
        <motion.div {...fadeUp(0.2)} className="md:col-span-3">
          <GlassCard className="min-h-[100px] md:min-h-[130px] p-7 flex flex-col justify-center">
            <p className="text-4xl font-black mb-1" style={{ fontFamily: 'Syne, sans-serif', color: '#4F8CFF' }}>3+</p>
            <p className="text-xs" style={{ color: '#4B5563' }}>Years Learning</p>
          </GlassCard>
        </motion.div>

        {/* Quote */}
        <motion.div {...fadeUp(0.24)} className="md:col-span-9">
          <GlassCard className="min-h-[100px] md:min-h-[130px] p-7 flex flex-col justify-center gap-2"
            style={{ background: 'rgba(124,92,252,0.04)', border: '1px solid rgba(124,92,252,0.12)' }}
          >
            <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#4B5563' }}>Mantra</p>
            <p className="text-lg md:text-2xl font-bold leading-snug" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>
              "Code is like poetry —{' '}
              <span style={{ color: '#4F8CFF' }}>it should be elegant.</span>"
            </p>
          </GlassCard>
        </motion.div>

        {/* Contact CTA */}
        <motion.div {...fadeUp(0.28)} className="md:col-span-12">
          <GlassCard
            onClick={() => navigate('/contact')}
            className="px-8 py-7 flex items-center justify-between gap-4"
            style={{ background: 'linear-gradient(135deg, rgba(124,92,252,0.08), rgba(0,229,255,0.04))', border: '1px solid rgba(124,92,252,0.15)' }}
          >
            <div>
              <p className="font-black text-xl md:text-2xl mb-1" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>
                Punya proyek menarik?
              </p>
              <p className="text-sm" style={{ color: '#9CA3AF' }}>Mari wujudkan bersama — saya siap berkolaborasi.</p>
            </div>
            <motion.div
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7C5CFC, #4F8CFF)', boxShadow: '0 0 20px rgba(124,92,252,0.3)' }}
            >
              <ArrowUpRight size={18} style={{ color: 'white' }} />
            </motion.div>
          </GlassCard>
        </motion.div>

      </div>
    </section>
  );
};

const Home = () => (
  <main className="relative z-10">
    <HeroSection />
    <Marquee />
    <BentoGrid />
  </main>
);

export default Home;
