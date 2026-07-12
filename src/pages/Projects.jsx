import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Code2, Globe } from 'lucide-react';
import allProjects from '../data/projects';

const filters = ['All', 'Mobile', 'Desktop'];

// ── Modal ──────────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100]"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-2xl mx-auto rounded-3xl z-[101] overflow-hidden"
          style={{ background: '#0E0E10', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,92,255,0.1)' }}
        >
          {/* Preview */}
          <div className="relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {project.demo ? (
              <iframe
                src={project.demo}
                title={project.title}
                className="w-full h-52 border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="relative h-48" style={{ background: '#141416' }}>
                {project.image && (
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0E0E10, transparent)' }} />
              </div>
            )}
            {/* Gradient overlay bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to top, #0E0E10, transparent)' }} />
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full transition-all hover:scale-110 z-10"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
          >
            <X size={16} />
          </button>

          <div className="p-7">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.category.map(cat => (
                <span key={cat} className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ background: 'rgba(124,92,255,0.12)', border: '1px solid rgba(124,92,255,0.25)', color: '#a78bfa' }}>
                  {cat}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-black mb-2 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{project.title}</h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#A1A1AA' }}>{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map(tech => (
                <span key={tech} className="text-xs px-3 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#71717A' }}>
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #7C5CFF, #4F8CFF)', boxShadow: '0 0 20px rgba(124,92,255,0.3)' }}>
                  <Globe size={14} /> Live Demo
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#A1A1AA' }}>
                  <Code2 size={14} /> Source Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

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
  const [selected, setSelected] = useState(null);
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
                <ProjectCard key={project.id} project={project} index={index} onClick={setSelected} />
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Projects;
