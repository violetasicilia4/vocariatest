import { ArrowUpRight } from 'lucide-react';
import { IMAGES } from '../data';

interface CTABannerProps {
  onGetStartedClick: () => void;
}

export default function CTABanner({ onGetStartedClick }: CTABannerProps) {
  return (
    <section className="py-10 sm:py-20 bg-white relative overflow-hidden px-6">
      <div
        className="max-w-6xl mx-auto rounded-[32px] sm:rounded-[40px] overflow-hidden relative shadow-2xl min-h-[380px] h-auto py-10 sm:py-0 flex items-center bg-cover bg-center border border-slate-100"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(14, 17, 24, 0.95) 40%, rgba(37, 142, 249, 0.4) 100%), url(${IMAGES.heroClouds})`,
        }}
      >
        {/* Absolute dark pattern */}
        <div className="absolute inset-0 bg-[#0e1118]/80 pointer-events-none" />

        <div className="p-6 sm:p-12 md:p-16 relative z-10 w-full text-left max-w-3xl">
          <span className="text-brand-lime font-mono text-[9px] font-bold tracking-widest uppercase block mb-3">
            • JOIN THE REVOLUTION
          </span>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-4">
            We combine human insight <br className="hidden sm:inline" />
            with artificial intelligence
          </h2>

          <p className="text-white/85 text-xs sm:text-sm leading-relaxed mb-8 max-w-xl">
            Our consulting team bridges strategic thinking and advanced technologies to help companies streamline processes, improve decision-making, and create intelligent digital experiences.
          </p>

          <button
            onClick={onGetStartedClick}
            className="px-8 py-4 bg-brand-lime hover:bg-white text-slate-900 font-display text-xs font-bold tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-xl w-fit"
          >
            GET STARTED
            <span className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:bg-brand-sky group-hover:text-white transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
