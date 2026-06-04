import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2 } from 'lucide-react';

const stats = [
  { value: 12, label: 'Projects', suffix: '+' },
  { value: 3, label: 'Years Exp', suffix: '+' },
  { value: 100, label: 'Passion', suffix: '%' },
];

const skills = [
  { name: 'React JS', color: 'text-cyan-400' },
  { name: 'TypeScript', color: 'text-blue-400' },
  { name: 'Tailwind', color: 'text-teal-400' },
  { name: 'Node JS', color: 'text-green-400' },
  { name: 'Framer Motion', color: 'text-purple-400' },
  { name: 'Figma', color: 'text-pink-400' },
];

const timeline = [
  { year: '2022', title: 'Mulai Belajar Web Dev', desc: 'HTML, CSS, JavaScript dasar' },
  { year: '2023', title: 'React & Ekosistemnya', desc: 'Next.js, Tailwind, TypeScript' },
  { year: '2024', title: 'Freelance Projects', desc: 'Mengerjakan proyek klien pertama' },
  { year: '2025', title: 'Open to Work', desc: 'Siap bergabung tim profesional' },
];

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(value / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const AboutSection = () => (
  <section id="about" className="min-h-screen py-20 px-6 flex flex-col justify-center">
    <div className="max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="text-4xl font-bold mb-4"
      >
        Tentang Saya
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 mb-12 max-w-xl"
      >
        Hai! Saya seorang pengembang web yang passionate terhadap desain UI/UX dan interaksi animasi.
      </motion.p>

      {/* Stats Counter */}
      <div className="grid grid-cols-3 gap-6 mb-16">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
          >
            <p className="text-4xl font-bold text-accent mb-1">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="text-gray-400 text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Tech Stack */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white/80">Tech Stack</h3>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.05, x: 5 }}
                data-magnetic
                className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl"
              >
                <span className={`w-2 h-2 rounded-full bg-current ${skill.color}`} />
                <span className={`text-sm font-medium ${skill.color}`}>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white/80">Journey</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-12 pb-8 last:pb-0"
              >
                <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-accent border-2 border-dark" />
                <p className="text-accent text-xs font-mono mb-1">{item.year}</p>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
