import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2 } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-2xl mx-auto rounded-2xl z-[101] overflow-hidden"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}
        >
          <div className={`relative h-48 bg-gradient-to-br ${project.color} overflow-hidden`}>
            {project.image && (
              <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-70" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full transition-colors"
            style={{ background: 'rgba(0,0,0,0.4)', color: 'white' }}
          >
            <X size={18} />
          </button>
          <div className="p-8">
            <span className="text-xs text-accent px-3 py-1 rounded-full" style={{ border: '1px solid rgba(99,102,241,0.3)' }}>{project.category}</span>
            <h2 className="text-3xl font-bold mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>{project.title}</h2>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <span key={tech} className="text-xs px-3 py-1 rounded-full" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{tech}</span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors">
                <ExternalLink size={15} /> Live Demo
              </a>
              <a href={project.repo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <Code2 size={15} /> Source Code
              </a>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default ProjectModal;
