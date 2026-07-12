import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import ProjectModal from '../components/ProjectModal';
import allProjects from '../data/projects';

const filters = ['All', 'Mobile', 'Desktop'];

const Projects = () => {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState(null);
  const filtered = active === 'All'
    ? allProjects
    : allProjects.filter(p => p.category.includes(active));

  return (
    <>
      <main className="relative z-10 pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
        <div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <p className="text-sm tracking-widest uppercase mb-4 gradient-text font-medium">Portofolio</p>
            <h1 className="text-5xl md:text-7xl font-black mb-6" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>
              Proyek Pilihan
            </h1>
            <p className="text-lg max-w-xl" style={{ color: '#9CA3AF' }}>
              Kumpulan proyek yang telah saya kerjakan. Klik untuk melihat detail.
            </p>
          </motion.div>

          {/* Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {filters.map((f) => (
              <motion.button
                key={f}
                onClick={() => setActive(f)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all"
                style={active === f
                  ? { background: '#6366f1', color: 'white', border: '1px solid #6366f1', boxShadow: 'var(--shadow-sm)' }
                  : { background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', boxShadow: 'var(--shadow-sm)' }
                }
              >
                {f}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id} layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelected(project)}
                  className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
                  style={{ border: '1px solid var(--border)' }}
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {!project.image && (
                    <div className="absolute inset-0" style={{ background: 'var(--bg-card)' }} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-1.5 flex-wrap">
                        {project.category.map(cat => (
                          <span key={cat} className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}>
                            {cat}
                          </span>
                        ))}
                      </div>
                      <ExternalLink className="transition-colors opacity-50 group-hover:opacity-100 flex-shrink-0" size={16} style={{ color: 'white' }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1 text-white">{project.title}</h3>
                      <p className="text-xs line-clamp-2 text-white/60 group-hover:text-white/80 transition-colors">{project.description}</p>
                    </div>
                  </div>
                </motion.div>
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
