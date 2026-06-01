import { motion } from 'motion/react';
import { ArrowUpRight, Calendar, Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onPostSelect: (post: BlogPost) => void;
}

export default function BlogSection({ onPostSelect }: BlogSectionProps) {
  return (
    <section id="blog" className="py-12 sm:py-24 bg-slate-50 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Blog Header in Grid layout with right aligned VIEW ALL button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16 max-w-5xl mx-auto">
          <div className="text-left">
            <div className="bg-slate-200 px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 mb-4 w-fit border border-slate-300/30">
              <span className="w-1.5 h-1.5 bg-brand-sky rounded-full animate-pulse" />
              <span className="font-display text-[10px] font-extrabold text-slate-500 uppercase tracking-widest leading-none">
                • BLOG AND ARTICLES
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#0e1118] tracking-tight mb-2">
              Latest insights and trends
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md">
              Hone your knowledge with articles crafted by our active data science partners and strategic thinkers.
            </p>
          </div>

          <div className="flex justify-start">
            <button className="px-6 py-3 bg-brand-dark hover:bg-brand-sky text-white font-display text-xs font-bold tracking-widest rounded-full transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:shadow-md">
              VIEW ALL
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Column Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onPostSelect(post)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
            >
              
              {/* Cover photo */}
              <div className="h-48 overflow-hidden relative border-b border-slate-50">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-brand-dark text-white font-mono text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Text metadata and title */}
              <div className="p-6 text-left flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono font-bold mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-brand-sky transition-colors leading-snug mb-6">
                    {post.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-brand-sky flex items-center gap-1 transition-colors">
                    Read article
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
