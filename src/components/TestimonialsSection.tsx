import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-12 sm:py-24 bg-white relative overflow-hidden border-t border-slate-100">
      
      {/* Decorative accent dots */}
      <div className="absolute top-12 left-1/4 w-[2px] h-12 bg-gradient-to-b from-brand-sky to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Testimonials Header with Nav Arrows right beside headings */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-16 max-w-4xl mx-auto">
          <div className="text-left">
            <div className="bg-slate-100 px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 mb-4 w-fit border border-slate-200/60">
              <span className="w-1.5 h-1.5 bg-brand-sky rounded-full animate-pulse" />
              <span className="font-display text-[10px] font-extrabold text-slate-500 uppercase tracking-widest leading-none">
                • TESTIMONIALS
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#0e1118] tracking-tight mb-2">
              What they say about us?
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Here’s what they shared about their experience working with our consulting partners.
            </p>
          </div>

          {/* Interactive Arrow keys matching Image 5/5 navigation indicators */}
          <div className="flex gap-2.5">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-800 transition-all focus:outline-none"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-800 transition-all focus:outline-none"
              aria-label="Next Testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Big Interactive Quote Display Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-slate-50 border border-slate-100 rounded-[32px] p-6 sm:p-12 md:p-16 text-left shadow-sm min-h-[300px] sm:min-h-[360px] flex flex-col justify-between overflow-hidden">
            
            {/* Background absolute Quote Icon */}
            <div className="absolute right-8 top-8 opacity-5 text-slate-900 pointer-events-none">
              <Quote className="w-40 h-40" />
            </div>

            {/* Carousel Content AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between h-full relative z-10"
              >
                <div>
                  {/* Rating indicator */}
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-[#d5ff3f] text-[#d5ff3f]" />
                    ))}
                  </div>

                  {/* Quote sentence */}
                  <blockquote className="font-display font-medium text-lg sm:text-fd text-slate-850 sm:leading-relaxed mb-10 max-w-2xl leading-relaxed">
                    "{TESTIMONIALS[activeIndex].quote}"
                  </blockquote>
                </div>

                {/* Profile Card details */}
                <div className="flex items-center gap-4 border-t border-slate-200/50 pt-6">
                  <img
                    src={TESTIMONIALS[activeIndex].avatar}
                    alt={TESTIMONIALS[activeIndex].author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md focus:outline-none"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-slate-900">
                      {TESTIMONIALS[activeIndex].author}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      {TESTIMONIALS[activeIndex].role} — <span className="text-brand-sky font-bold font-mono">{TESTIMONIALS[activeIndex].company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation bullet dots at the bottom progress */}
            <div className="absolute bottom-12 right-12 z-20 hidden sm:flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i ? 'w-6 bg-brand-sky' : 'w-1.5 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
