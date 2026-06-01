import { motion } from 'motion/react';
import { ArrowUpRight, Target, Lightbulb, Compass, FileSpreadsheet, Play } from 'lucide-react';
import { SERVICES } from '../data';

interface ServicesSectionProps {
  onServiceClick: (serviceTitle: string) => void;
  onGetStartedClick: () => void;
}

export default function ServicesSection({ onServiceClick, onGetStartedClick }: ServicesSectionProps) {
  // Map icons for visual realism
  const icons = [
    <Target className="w-5 h-5 text-[#0f172a]" />,
    <Compass className="w-5 h-5 text-[#0f172a]" />,
    <FileSpreadsheet className="w-5 h-5 text-[#0f172a]" />
  ];

  const iconBgClasses = [
    'bg-[#d5ff3f]',
    'bg-[#fffbeb]',
    'bg-[#f0f9ff]'
  ];

  return (
    <section id="services" className="py-12 sm:py-24 bg-slate-50 relative border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header with Left-Aligned layout & CTA on the right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-16">
          <div className="max-w-2xl text-left">
            <div className="bg-slate-200 px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 mb-4 w-fit">
              <span className="w-1.5 h-1.5 bg-brand-sky rounded-full animate-pulse" />
              <span className="font-display text-[10px] font-extrabold text-slate-500 uppercase tracking-widest leading-none">
                SERVICES
              </span>
            </div>
            
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl text-[#0e1118] leading-[1.25] sm:leading-[1.1] tracking-tight mb-4">
              Comprehensive consulting and <br className="hidden sm:inline" />
              intelligent innovation
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Whether you're optimizing today or building for tomorrow we help you move faster with confidence.
            </p>
          </div>

          <div className="flex justify-start">
            <button
              onClick={onGetStartedClick}
              className="px-8 py-3.5 bg-brand-dark text-white hover:bg-brand-sky font-display text-xs font-bold tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
            >
              GET STARTED
              <span className="w-6 h-6 rounded-full bg-brand-lime text-slate-950 flex items-center justify-center group-hover:bg-white group-hover:text-slate-950 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>

        {/* 3 Column Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
            >
              
              {/* Image Container with high quality photography */}
              <div className="h-56 overflow-hidden relative border-b border-slate-100">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating dynamic icon on image top left */}
                <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${iconBgClasses[index]}`}>
                  {icons[index]}
                </div>
              </div>

              {/* Textual & Interaction details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  {/* Service Tags */}
                  <div className="flex gap-1.5 mb-4">
                    {service.tags.map((tag) => (
                      <span key={tag} className="bg-slate-100 text-slate-600 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display font-extrabold text-xl text-slate-900 mb-3 group-hover:text-brand-sky transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <button
                    onClick={() => onServiceClick(service.title)}
                    className="text-xs font-bold text-slate-800 hover:text-brand-sky flex items-center gap-1 transition-colors"
                  >
                    Learn more & estimate
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  
                  <span className="text-[10px] font-mono text-slate-300 font-bold tracking-widest uppercase">
                    AILINE // #{index + 1}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
