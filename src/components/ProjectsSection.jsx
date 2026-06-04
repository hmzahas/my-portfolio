import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import ProjectModal from './ProjectModal';

const projects = [
  {
    id: 1, title: 'E-Commerce App', category: 'Next.js',
    color: 'from-blue-500 to-cyan-500',
    description: 'Platform e-commerce modern dengan fitur cart, payment gateway, dan dashboard admin.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma', 'Stripe'],
    demo: '#', repo: '#',
  },
  {
    id: 2, title: 'Portfolio V1', category: 'React',
    color: 'from-purple-500 to-pink-500',
    description: 'Portfolio pertama dengan animasi scroll dan desain minimalis.',
    stack: ['React', 'Framer Motion', 'Tailwind'],
    demo: '#', repo: '#',
  },
  {
    id: 3, title: 'Finance Dashboard', category: 'TypeScript',
    color: 'from-green-500 to-emerald-500',
    description: 'Dashboard keuangan dengan chart interaktif dan laporan real-time.',
    stack: ['React', 'TypeScript', 'Recharts', 'Zustand'],
    demo: '#', repo: '#',
  },
  {
    id: 4, title: 'Crypto Tracker', category: 'API Integration',
    color: 'from-yellow-500 to-orange-500',
    description: 'Aplikasi tracking harga crypto dengan data live dari CoinGecko API.',
    stack: ['React', 'CoinGecko API', 'Chart.js', 'Tailwind'],
    demo: '#', repo: '#',
  },
  {
    id: 5, title: 'Mobile App Mockup A', category: 'UI/UX',
    color: 'from-indigo-500 to-purple-500',
    description: 'Mockup tampilan aplikasi mobile — konsep UI/UX dan visual presentation.',
    stack: ['Figma', '3D Mockup'],
    demo: '#', repo: '#', image: '/mockups/mockup-1.jpg',
  },
  {
    id: 6, title: 'Mobile App Mockup B', category: 'UI/UX',
    color: 'from-emerald-500 to-teal-400',
    description: 'Mockup presentasi UI untuk project e-commerce dan showcase produk.',
    stack: ['Figma', 'Blender'],
    demo: '#', repo: '#', image: '/mockups/mockup-2.jpg',
  },
];

const ProjectCard = ({ project, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    onClick={() => onClick(project)}
    className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-white/10"
  >
    {project.image && (
      <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover z-0" />
    )}
    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 group-hover:opacity-50 transition-all duration-500 z-10`} />
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all z-10" />
    <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
      <div className="flex justify-between items-start">
        <span className="px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-xs font-medium border border-white/10">
          {project.category}
        </span>
        <ExternalLink className="text-white/30 group-hover:text-white transition-colors" size={18} />
      </div>
      <div>
        <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
        <p className="text-white/40 text-sm group-hover:text-white/70 transition-colors">Klik untuk melihat detail</p>
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section id="projects" className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold"
            >
              Proyek Pilihan
            </motion.h2>
            <span className="text-gray-400 hidden md:block font-mono text-sm">0{projects.length} Projects</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onClick={setSelected} />
            ))}
          </div>
        </div>
      </section>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default ProjectsSection;
