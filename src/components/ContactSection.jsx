import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Globe, Link, Mail } from 'lucide-react';

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Pesan terkirim! (Fitur ini memerlukan backend)');
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-6 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">Mari Berkolaborasi</h2>
          <p className="text-gray-400 mb-8">
            Saya sedang terbuka untuk proyek baru. Apakah Anda punya ide cemerlang? Mari kita wujudkan bersama.
          </p>
          <div className="flex flex-col gap-4 mb-8">
            <a href="mailto:emailkamu@example.com" className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="p-3 bg-accent/20 text-accent rounded-lg"><Mail /></div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-medium">hello@emailkamu.com</p>
              </div>
            </a>
          </div>
          <div className="flex gap-4">
            {[X, Globe, Link, Mail].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1, y: -5 }}
                className="p-3 bg-white/5 rounded-full hover:bg-accent hover:text-white transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nama</label>
            <input type="text" name="name" value={formState.name} onChange={handleChange} required
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-accent transition-colors"
              placeholder="Siapa namamu?" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input type="email" name="email" value={formState.email} onChange={handleChange} required
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-accent transition-colors"
              placeholder="email@anda.com" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Pesan</label>
            <textarea name="message" value={formState.message} onChange={handleChange} required rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-accent transition-colors"
              placeholder="Ceritakan proyekmu..." />
          </div>
          <motion.button type="submit" disabled={isSubmitting}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
