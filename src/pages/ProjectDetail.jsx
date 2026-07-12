import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, X, ChevronLeft, ChevronRight, Globe, Code2 } from 'lucide-react';
import allProjects from '../data/projects';

// ── Fade Up helper ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

// ── Image Lightbox ─────────────────────────────────────────────────────────
const Lightbox = ({ images, index, onClose }) => {
  const [current, setCurrent] = useState(index);
  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2.5 rounded-full z-10 transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-sm font-mono px-4 py-1.5 rounded-full"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#A1A1AA' }}>
        {current + 1} / {images.length}
      </div>

      {/* Main image */}
      <div className="relative w-full max-w-5xl px-16" onClick={e => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Screenshot ${current + 1}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-2xl object-contain max-h-[70vh]"
            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
          />
        </AnimatePresence>

        {/* Prev/Next */}
        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}>
              <ChevronLeft size={20} />
            </button>
            <button onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}>
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-6 px-4" onClick={e => e.stopPropagation()}>
          {images.map((img, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0"
              style={{
                width: 64, height: 48,
                border: i === current ? '2px solid #7C5CFF' : '2px solid rgba(255,255,255,0.1)',
                opacity: i === current ? 1 : 0.5,
                boxShadow: i === current ? '0 0 16px rgba(124,92,255,0.4)' : 'none',
              }}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────
const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = allProjects.find(p => p.id === parseInt(id));
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  if (!project) return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-black text-white mb-4">Project not found</p>
        <button onClick={() => navigate('/projects')} className="text-sm" style={{ color: '#7C5CFF' }}>← Back to Projects</button>
      </div>
    </main>
  );

  const showcaseImages = project.figmaImages || project.images || [];
  const accent = project.accentColor || '#7C5CFF';

  return (
    <>
      <main className="relative z-10 min-h-screen">

        {/* Grid background */}
        <div className="fixed inset-0 pointer-events-none z-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative pt-28 md:pt-36 pb-16 px-6 md:px-16 lg:px-24 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
            style={{ background: `radial-gradient(circle, ${accent}20, transparent 70%)` }} />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl mx-auto">
            {/* Back */}
            <motion.button
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/projects')}
              className="flex items-center gap-2 text-sm mb-10 transition-all hover:gap-3 group"
              style={{ color: '#52525B' }}
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </motion.button>

            {/* Type badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: `${accent}15`, border: `1px solid ${accent}30`, color: accent }}>
              {project.type}
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="font-black leading-[0.95] tracking-tight text-white"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
              >
                {project.title}
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.p
                initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="text-xl md:text-2xl font-medium"
                style={{ color: '#52525B' }}
              >
                {project.subtitle}
              </motion.p>
            </div>

            {/* Role badges */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-2 mb-10">
              {project.roles.map(role => (
                <span key={role} className="px-4 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#A1A1AA' }}>
                  {role}
                </span>
              ))}
            </motion.div>

            {/* Metadata grid */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
              {[
                { label: 'Role', value: project.roles[0] },
                { label: 'Timeline', value: project.timeline },
                { label: 'Tools', value: project.stack.slice(0, 2).join(', ') },
                { label: 'Team', value: project.team },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-2xl p-4"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: '#3F3F46' }}>{label}</p>
                  <p className="text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="relative rounded-3xl overflow-hidden cursor-pointer group"
              style={{ boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)` }}
              onClick={() => showcaseImages.length > 0 && setLightboxIndex(0)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ maxHeight: '60vh' }}
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.3)' }}>
                <div className="px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                  style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                  View Gallery
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── SHOWCASE GALLERY (Figma images) ── */}
        {showcaseImages.length > 0 && (
          <section className="py-20 px-6 md:px-16 lg:px-24">
            <div className="max-w-5xl mx-auto">
              <motion.div {...fadeUp(0)} className="mb-10">
                <span className="section-label">Showcase</span>
                <h2 className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Design Preview
                </h2>
              </motion.div>

              {/* Featured full showcase */}
              {showcaseImages.find(img => img.includes('full')) && (
                <motion.div {...fadeUp(0.1)} className="mb-6">
                  <div
                    className="relative rounded-3xl overflow-hidden cursor-pointer group"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
                    onClick={() => setLightboxIndex(showcaseImages.findIndex(img => img.includes('full')))}
                  >
                    <img
                      src={showcaseImages.find(img => img.includes('full'))}
                      alt="Full Showcase"
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: 'rgba(0,0,0,0.25)' }}>
                      <div className="px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                        style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                        Full View
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Grid of other images */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {showcaseImages.filter(img => !img.includes('full')).map((img, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp(0.1 + i * 0.06)}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', aspectRatio: '9/16' }}
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img
                      src={img}
                      alt={`Screen ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                      <span className="text-xs text-white font-medium">Screen {i + 1}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── OVERVIEW ── */}
        <section className="py-20 px-6 md:px-16 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp(0)} className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <span className="section-label">Overview</span>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Tentang Project
                </h2>
                <p className="text-base leading-relaxed" style={{ color: '#A1A1AA', maxWidth: 520 }}>
                  {project.fullDescription}
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#3F3F46' }}>Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="px-4 py-2 rounded-xl text-sm font-medium"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#A1A1AA' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section className="py-20 px-6 md:px-16 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp(0)}>
              <span className="section-label">Challenge</span>
              <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>
                The Problem
              </h2>
            </motion.div>
            <motion.div {...fadeUp(0.1)}
              className="rounded-3xl p-8 md:p-10 mb-8"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#A1A1AA', maxWidth: 700 }}>
                {project.problem}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── SOLUTION ── */}
        <section className="py-20 px-6 md:px-16 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp(0)}>
              <span className="section-label">Approach</span>
              <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight" style={{ fontFamily: 'Syne, sans-serif', color: 'white' }}>
                The Solution
              </h2>
            </motion.div>
            <motion.div {...fadeUp(0.1)}
              className="rounded-3xl p-8 md:p-10"
              style={{ background: `linear-gradient(135deg, ${accent}08, rgba(79,140,255,0.04))`, border: `1px solid ${accent}20` }}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#A1A1AA', maxWidth: 700 }}>
                {project.solution}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── KEY INSIGHTS ── */}
        <section className="py-20 px-6 md:px-16 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp(0)} className="mb-10">
              <span className="section-label">Learnings</span>
              <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Key Insights
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-4">
              {project.insights.map((insight, i) => (
                <motion.div key={i} {...fadeUp(0.1 + i * 0.08)}
                  className="rounded-3xl p-6 flex flex-col gap-4"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
                    style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}25` }}>
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>{insight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="py-20 px-6 md:px-16 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp(0)} className="mb-12">
              <span className="section-label">Methodology</span>
              <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Design Process
              </h2>
            </motion.div>

            <div className="relative">
              {/* Line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-[19px] top-2 bottom-2 w-px origin-top hidden md:block"
                style={{ background: `linear-gradient(to bottom, ${accent}, rgba(79,140,255,0.3), transparent)` }}
              />

              <div className="space-y-4">
                {project.process.map((step, i) => (
                  <motion.div key={i} {...fadeUp(0.1 + i * 0.08)}
                    className="flex gap-6 items-start">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 z-10"
                      style={{ background: `${accent}15`, border: `1px solid ${accent}25`, color: accent }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 rounded-2xl p-5"
                      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <p className="font-bold text-white mb-1">{step.phase}</p>
                      <p className="text-sm leading-relaxed" style={{ color: '#71717A' }}>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-6 md:px-16 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp(0)}
              className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {/* Glow */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-80 h-80 rounded-full blur-[100px]"
                  style={{ background: `radial-gradient(circle, ${accent}15, transparent 70%)` }} />
              </div>

              <p className="section-label text-center">Ready to explore?</p>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                See it in action
              </h2>
              <p className="text-base mb-10 mx-auto" style={{ color: '#71717A', maxWidth: 400 }}>
                Lihat hasil akhir project ini secara langsung.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                {project.demo && (
                  <motion.a
                    href={project.demo} target="_blank" rel="noreferrer"
                    whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${accent}40` }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white transition-all"
                    style={{ background: `linear-gradient(135deg, ${accent}, #4F8CFF)`, boxShadow: `0 0 24px ${accent}30` }}
                  >
                    <Globe size={16} /> View Live Project
                  </motion.a>
                )}
                {project.repo && (
                  <motion.a
                    href={project.repo} target="_blank" rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#A1A1AA' }}
                  >
                    <Code2 size={16} /> {project.stack.includes('Figma') ? 'View in Figma' : 'Source Code'}
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Next project */}
            <motion.div {...fadeUp(0.2)} className="mt-8 flex justify-between items-center">
              <button onClick={() => navigate('/projects')}
                className="flex items-center gap-2 text-sm transition-all hover:gap-3 group"
                style={{ color: '#52525B' }}>
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                All Projects
              </button>
              {(() => {
                const nextProject = allProjects.find(p => p.id === project.id + 1) || allProjects[0];
                return (
                  <button onClick={() => navigate(`/projects/${nextProject.id}`)}
                    className="flex items-center gap-2 text-sm transition-all hover:gap-3 group"
                    style={{ color: '#52525B' }}>
                    Next: {nextProject.title}
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                );
              })()}
            </motion.div>
          </div>
        </section>

      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={showcaseImages.length > 0 ? showcaseImages : [project.image]}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
