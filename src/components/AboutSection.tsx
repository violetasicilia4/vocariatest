import { motion } from 'motion/react';
import { ArrowUpRight, HelpCircle, HeartHandshake, Globe, Lightbulb } from 'lucide-react';
import { IMAGES, TESTIMONIALS } from '../data';

export default function AboutSection() {
  const images = [
    IMAGES.avatar1,
    IMAGES.avatar2,
    IMAGES.avatar3,
  ];

  return (
    <section id="about" className="py-12 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* About Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
          <div className="bg-slate-100 px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 mb-4 border border-slate-200/50">
            <span className="w-1.5 h-1.5 bg-brand-sky rounded-full animate-pulse" />
            <span className="font-display text-[10px] font-extrabold text-slate-500 uppercase tracking-widest leading-none">
              ABOUT US
            </span>
          </div>

          {/* Heading with high-fidelity inline custom badges */}
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0e1118] tracking-tight leading-[1.25] sm:leading-[1.15] max-w-4xl">
            A global consulting partner <br className="hidden sm:inline" />
            dedicated to building{' '}
            <span className="inline-flex items-center gap-1 bg-[#e0f2fe] text-[#0284c7] px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-xs sm:text-lg md:text-2xl font-extrabold align-middle my-1 border border-[#bae6fd]">
              <Globe className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-brand-sky animate-spin-slow" />
              smarter
            </span>
            {' '}and{' '}
            <span className="inline-block align-middle my-1">
              <span className="inline-flex items-center gap-1 bg-[#fef08a] text-[#854d0e] px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full text-xs sm:text-lg md:text-2xl font-extrabold border border-[#fef08a]/60">
                <Lightbulb className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-500 fill-amber-300" />
                more adaptive
              </span>
            </span>
            {' '}enterprises.
          </h2>
        </div>

        {/* Dynamic Bento-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto items-stretch">
          
          {/* Card 1: 120+ Collaborating Partners overlay with image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between overflow-hidden relative shadow-sm min-h-[340px] group transition-all hover:shadow-md"
          >
            {/* Background Sky Image overlay */}
            <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-slate-50/95 via-transparent to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80"
              alt="Collaborative work"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            
            <div className="relative z-20 self-start bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/60">
              <span className="font-mono text-[9px] font-extrabold text-slate-400 block mb-1">PARTNERS</span>
              <h3 className="text-4xl font-display font-black text-slate-950">120+</h3>
            </div>

            <div className="relative z-20 mt-auto bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-xs font-semibold leading-relaxed text-slate-800">
                Collaborating with leading AI and cloud technology providers worldwide to build future-proof workflows.
              </p>
            </div>
          </motion.div>

          {/* Card 2: 100% Commitment quote with avatars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col justify-between shadow-sm min-h-[340px] transition-all hover:shadow-md"
          >
            <div>
              <span className="font-mono text-[9px] font-extrabold text-slate-400 block uppercase tracking-wider mb-2">Commitment to measurable</span>
              <h3 className="text-5xl font-display font-extrabold text-slate-950 mb-4">100%</h3>

              <div className="flex -space-x-2 mb-4">
                {images.map((avatar, i) => (
                  <img
                    key={i}
                    src={avatar}
                    alt="Faculties"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            </div>

            <p className="text-xs font-medium text-slate-600 italic leading-relaxed border-t border-slate-100 pt-4">
              "Their automation strategy completely reshaped how we work. It's efficient, intelligent, and seamless."
            </p>
          </motion.div>

          {/* Column layout containing Card C (Lime Stats) and Card D (Dark Continents) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Card 3: 520k+ Data Points Bright Lime Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-lime rounded-3xl p-6 shadow-sm border border-[#c6ef1d] flex flex-col justify-between flex-grow min-h-[160px] cursor-pointer hover:shadow-md transition-shadow"
            >
              <div>
                <span className="font-mono text-[9px] font-bold text-slate-600 block uppercase tracking-wider">DATA POINTS</span>
                <h3 className="text-4xl font-display font-black text-slate-950 mt-1 mb-2">520k+</h3>
              </div>
              <p className="text-[11px] font-bold text-slate-800 leading-snug">
                Analyzed monthly to power smarter business strategies and automated pipelines.
              </p>
            </motion.div>

            {/* Card 4: Continents Card in Dark Slate */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-brand-dark rounded-3xl p-6 shadow-md border border-slate-900 flex items-center justify-between min-h-[120px] hover:shadow-lg transition-all"
            >
              <div className="text-left">
                <span className="font-mono text-[9px] font-bold text-brand-lime block uppercase tracking-wider">REACH</span>
                <h3 className="text-4xl font-display font-extrabold text-white">20+</h3>
                <span className="text-[10px] text-slate-400 font-semibold block mt-1">Continents & regions</span>
              </div>
              
              <div className="w-12 h-12 rounded-full bg-brand-lime/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-brand-lime" />
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
