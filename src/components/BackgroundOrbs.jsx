import { motion } from 'framer-motion';

const BackgroundOrbs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full blur-[100px]"
      style={{ background: 'var(--orb-1)' }}
    />
    <motion.div
      animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      className="absolute bottom-[10%] right-[-5%] w-[30rem] h-[30rem] rounded-full blur-[120px]"
      style={{ background: 'var(--orb-2)' }}
    />
  </div>
);

export default BackgroundOrbs;
