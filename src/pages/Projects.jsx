import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import allProjects from '../data/projects';

const filters = ['All', 'Mobile', 'Desktop'];

// ── Card ───────────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -6 }}
    onClick={() => onClick(project)}
    className="group relative rounded-3xl overflow-hidden cursor-pointer"
    style={{ border: '1px solid rgba(255,255,255,0.07)', background: '#0E0E10', aspectRatio: '4/3' }}
  >
    {project.image ? (
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
    ) : (
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
    )}

    {/* Overlay */}
    <div className="absolute inset-0 transition-opacity duration-300"
      style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.95) 30%, rgba(5,5,5,0.2) 100%)' }} />
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.98) 40%, rgba(5,5,5,0.4) 100%)' }} />

    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
      <div className="flex justify-between items-start">
        <div className="flex gap-1.5 flex-wrap">
          {project.category.map(cat => (
            <span key={cat} className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}>
              {cat}
            </span>
          ))}
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          style={{ background: 'rgba(124,92,255,0.2)', border: '1px solid rgba(124,92,255,0.4)' }}>
          <ExternalLink size={13} style={{ color: '#a78bfa' }} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-black mb-1.5 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{project.title}</h3>
        <p className="text-xs leading-relaxed line-clamp-2 transition-colors duration-300" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {project.stack.slice(0, 3).map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(124,92,255,0.15)', color: '#a78bfa' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// ── Page ───────────────────────────────────────────────────────────────────
const Projects = () => {
  const [active, setActive] = useState('All');
  const navigate = useNavigate();
  const filtered = active === 'All' ? allProjects : allProjects.filter(p => p.category.includes(active));

  return (
    <>
      <main className="relative z-10 pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <span className="section-label">Portofolio</span>
            <h1 className="text-5xl md:text-7xl font-black mb-4" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>
              Proyek Pilihan
            </h1>
            <p className="text-lg max-w-xl" style={{ color: '#A1A1AA' }}>
              Kumpulan proyek yang telah saya kerjakan. Klik untuk melihat detail.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map(f => (
              <motion.button
                key={f}
                onClick={() => setActive(f)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={active === f ? {
                  background: 'linear-gradient(135deg, rgba(124,92,255,0.2), rgba(79,140,255,0.15))',
                  border: '1px solid rgba(124,92,255,0.35)',
                  color: 'white',
                  boxShadow: '0 0 20px rgba(124,92,255,0.15)',
                } : {
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: '#71717A',
                }}
              >
                {f}
                <span className="ml-2 text-xs opacity-60">
                  {f === 'All' ? allProjects.length : allProjects.filter(p => p.category.includes(f)).length}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={p => navigate(`/projects/${p.id}`)} />
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>
    </>
  );
};

export default Projects;
