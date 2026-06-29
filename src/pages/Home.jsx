import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import Marquee from '../components/Marquee';
import GradientBorder from '../components/GradientBorder';
import { ArrowUpRight } from 'lucide-react';
import { SiHtml5, SiCss, SiTailwindcss, SiFramer, SiNodedotjs, SiFigma, SiGithub } from 'react-icons/si';
import allProjects from '../data/projects';

const techStack = [
  { name: 'HTML5',          Icon: SiHtml5,       color: '#E34F26' },
  { name: 'CSS',            Icon: SiCss,         color: '#1572B6' },
  { name: 'Tailwind',       Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Framer Motion',  Icon: SiFramer,      color: '#ffffff' },
  { name: 'Node.js',        Icon: SiNodedotjs,   color: '#339933' },
  { name: 'Figma',          Icon: SiFigma,       color: '#F24E1E' },
  { name: 'Github',         Icon: SiGithub,      color: '#FFFFFF' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const Card = ({ onClick, children, className = '' }) => (
  <div
    onClick={onClick}
    className={`h-full rounded-3xl transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}
    onMouseEnter={e => {
      e.currentTarget.style.border = '1px solid var(--border-hover)';
      e.currentTarget.style.background = 'var(--bg-card-hover)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.border = '1px solid var(--border)';
      e.currentTarget.style.background = 'var(--bg-card)';
      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
    }}
  >
    {children}
  </div>
);

const BentoGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-16 lg:px-24 pt-8 pb-24 md:pb-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

        {/* About */}
        <motion.div {...fadeUp(0)} className="md:col-span-5 md:row-span-2">
          <Card onClick={() => navigate('/about')} className="group min-h-[220px] md:min-h-[400px] p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block text-[11px] uppercase tracking-[0.2em] mb-4 md:mb-8" style={{ color: 'var(--text-muted)' }}>About</span>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3 md:mb-4" style={{ color: 'var(--text-primary)' }}>
                Halo, saya <br />
                <span className="text-accent">Hamzah 👋</span>
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Frontend Developer yang passionate terhadap desain UI/UX, dan pengalaman pengguna yang berkesan.
              </p>
            </div>
            <div className="flex items-center gap-2 text-accent text-sm mt-4 group-hover:gap-3 transition-all duration-300">
              <span>Selengkapnya</span>
              <ArrowUpRight size={15} />
            </div>
          </Card>
        </motion.div>

        {/* Status */}
        <motion.div {...fadeUp(0.08)} className="md:col-span-3">
          <Card className="min-h-[140px] md:min-h-[180px] p-6 md:p-8 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-green-400 text-xs tracking-wide">Available now</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Status</p>
              <p className="font-bold text-lg md:text-xl leading-tight" style={{ color: 'var(--text-primary)' }}>Open to<br />Work 🚀</p>
            </div>
          </Card>
        </motion.div>

        {/* Projects CTA */}
        <motion.div {...fadeUp(0.12)} className="md:col-span-4">
          <GradientBorder className="h-full">
            <div
              onClick={() => navigate('/projects')}
              className="group h-full min-h-[140px] md:min-h-[180px] rounded-3xl p-6 md:p-8 cursor-pointer flex flex-col justify-between"
              style={{ background: 'var(--bg)' }}
            >
              <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Projects</span>
              <div className="flex items-end justify-between">
                <p className="font-bold text-lg md:text-xl leading-tight" style={{ color: 'var(--text-primary)' }}>{allProjects.length}+<br />Proyek</p>
                <motion.div
                  whileHover={{ rotate: 45 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center"
                >
                  <ArrowUpRight size={15} className="text-accent" />
                </motion.div>
              </div>
            </div>
          </GradientBorder>
        </motion.div>

        {/* Skills */}
        <motion.div {...fadeUp(0.16)} className="md:col-span-7">
          <Card onClick={() => navigate('/skills')} className="group min-h-[140px] md:min-h-[180px] p-6 md:p-8">
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Tech Stack</span>
              <ArrowUpRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full transition-colors"
                  style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <tech.Icon size={12} style={{ color: tech.color }} />
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Stats + Quote — stack vertically on mobile */}
        <motion.div {...fadeUp(0.2)} className="md:col-span-4">
          <Card className="min-h-[100px] md:min-h-[140px] p-6 md:p-8 flex flex-col justify-center">
            <p className="text-3xl md:text-4xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>3+</p>
            <p className="text-xs leading-tight" style={{ color: 'var(--text-muted)' }}>Years of Experience</p>
          </Card>
        </motion.div>

        <motion.div {...fadeUp(0.26)} className="md:col-span-8">
          <Card className="min-h-[100px] md:min-h-[140px] p-6 md:p-8 flex flex-col justify-center gap-3" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
            <p className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Quote</p>
            <p className="text-lg md:text-2xl font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
              "Code is like poetry —{' '}
              <span className="text-accent">it should be elegant.</span>"
            </p>
          </Card>
        </motion.div>

        {/* Contact CTA */}
        <motion.div {...fadeUp(0.32)} className="md:col-span-12">
          <Card onClick={() => navigate('/contact')} className="group px-6 md:px-8 py-6 md:py-8 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-lg md:text-2xl" style={{ color: 'var(--text-primary)' }}>Punya proyek menarik?</p>
              <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Mari wujudkan bersama — saya siap berkolaborasi.</p>
            </div>
            <motion.div
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex items-center gap-2 text-accent font-medium text-sm flex-shrink-0"
            >
              <ArrowUpRight size={18} />
            </motion.div>
          </Card>
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
