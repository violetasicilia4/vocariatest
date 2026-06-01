import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Heart, Share2, CornerDownRight } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogDetailModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogDetailModal({ post, onClose }: BlogDetailModalProps) {
  if (!post) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        />

        {/* Modal content area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-[32px] w-full max-w-2xl border border-slate-100 shadow-2xl relative overflow-hidden z-10 max-h-[85vh] flex flex-col"
        >
          {/* Closer button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
            aria-label="Close article"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Banner image with categories overlay */}
          <div className="h-64 relative shrink-0">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-left">
              <span className="bg-brand-lime text-slate-950 text-[9px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white mt-3 leading-tight">
                {post.title}
              </h3>
            </div>
          </div>

          {/* Reading content scroll area */}
          <div className="p-6 sm:p-8 overflow-y-auto text-left space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
            
            {/* Metadata columns */}
            <div className="flex flex-wrap items-center gap-4 text-slate-400 font-mono font-bold border-b border-slate-100 pb-4 text-[10px]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <User className="w-3.5 h-3.5 text-brand-sky" />
                Por Equipo de VOCARIA
              </span>
            </div>

            {/* Simulated detailed context */}
            <p className="font-medium text-slate-800 text-sm leading-relaxed">
              In this strategic whitepaper, we dissect the shifting landscape of automated decision pipeline frameworks across enterprise services. Our analysts outline how pairing expert human consulting partners with robust AI models is delivering unprecedented structural growth of up to 49% within consecutive quarters.
            </p>

            <div className="space-y-4">
              <h4 className="font-display font-extrabold text-slate-900 flex items-center gap-1.5 text-sm uppercase tracking-wide">
                <CornerDownRight className="w-4 h-4 text-brand-sky" />
                1. Defining the Core Artificial Bottlenecks
              </h4>
              <p>
                Many teams rush to deploy complex algorithms without first mapping current physical business processes. Our primary analysis indicates that optimizing the foundational process before automation reduces system errors by more than 60%. Thus, strategic consulting always acts as the prerequisite pillar of intelligent digital pipeline transition.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-display font-extrabold text-slate-900 flex items-center gap-1.5 text-sm uppercase tracking-wide">
                <CornerDownRight className="w-4 h-4 text-brand-sky" />
                2. Unifying Data Points & Multi-source Dashboards
              </h4>
              <p>
                Businesses are flooded with raw data, yet lack structural clarity. When our data architects integrated unified analytics pipelines (scaling above 520k analyzed data points monthly), we recorded an immediate 35% increase in operational velocity. Executives no longer guess; they observe rigorous sparkline curves mapped directly on-canvas.
              </p>
            </div>

            {/* Decorative blockquote */}
            <blockquote className="border-l-4 border-[#d5ff3f] bg-slate-50 p-4 rounded-r-2xl italic font-medium text-slate-800">
              "Technology shouldn't replace the spark of human creativity. Rather, it must amplify it, enabling tactical teams to run frictionless experiments and make deterministic decisions with absolute confidence."
            </blockquote>

            {/* Action buttons footer */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-100">
              <div className="flex gap-2">
                <button className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-rose-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  Like (48)
                </button>
                <button className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-brand-sky transition-colors ml-4">
                  <Share2 className="w-4 h-4" />
                  Share article
                </button>
              </div>

              <span className="text-[10px] font-mono text-slate-300 font-bold uppercase tracking-widest">
                VOCARIA Research Directory // OK
              </span>
            </div>

          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
}
