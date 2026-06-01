import { useState } from 'react';
import { motion } from 'motion/react';
import { Network, BarChart2, Zap, Brain, ArrowUpRight, Check, DollarSign, Calendar, Users, Eye, Sparkles } from 'lucide-react';
import { IMAGES } from '../data';

export default function ExpertiseSection() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activePlanTab, setActivePlanTab] = useState<'daily' | 'monthly'>('monthly');

  // Interactive Nodes for Experience Intelligence Graph
  const nodes = [
    { id: '1', name: 'Ann Stanton', role: 'AI Consultant', percent: '+7.8%', cx: 120, cy: 90, color: '#f59e0b', bio: 'Expert in neural networks and process automation.' },
    { id: '2', name: 'Livia Curtis', role: 'Data Architect', percent: '+9.4%', cx: 280, cy: 110, color: '#258ef9', bio: 'Architect of scalable pipelines and big-data repositories.' },
    { id: '3', name: 'Lindsey Press', role: 'Business Strategist', percent: '+11% ', cx: 200, cy: 230, color: '#d5ff3f', bio: 'Pioneered custom AI transformation frameworks globally.' },
  ];

  const jobs = [
    { id: '1', site: 'Vaporisum Ltd', value: '$120.00', status: 'Completed', date: 'May 28' },
    { id: '2', site: 'Voltex Pipeline', value: '$240.00', status: 'Completed', date: 'May 27' },
    { id: '3', site: 'Vaporisum Org', value: '$120.00', status: 'Pending', date: 'May 25' },
  ];

  return (
    <section className="py-12 sm:py-24 bg-white relative overflow-hidden">
      {/* Light gradient highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] spotlight rounded-full opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
          <div className="bg-slate-100 px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 mb-4 border border-slate-200/50">
            <span className="w-1.5 h-1.5 bg-brand-sky rounded-full animate-pulse" />
            <span className="font-display text-[10px] font-extrabold text-slate-500 uppercase tracking-widest leading-none">
              • EXPERTISE
            </span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl text-[#0e1118] tracking-tight leading-[1.25] sm:leading-[1.1] max-w-3xl mb-4">
            Where human insight meets <br className="hidden sm:inline" />
            intelligent technology
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            We help businesses harness technology not to replace human creativity, but to amplify it — enabling smarter decisions and faster, more deterministic execution.
          </p>
        </div>

        {/* 4 Block Bento Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: Automation & Optimization (Left Column, Top Grid) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-6">
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-brand-sky tracking-wider uppercase mb-1 font-mono">
                <Zap className="w-3 h-3" />
                AUTOMATION & OPTIMIZATION
              </span>
              <h3 className="text-xl font-display font-bold text-slate-900 leading-snug">
                Streamline workflows with zero Friction
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Eliminate repetitive processes and boost daily operational productivity in real-time.
              </p>
            </div>

            {/* Simulated Live Admin Panel Dashboard */}
            <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/60 shadow-lg text-slate-900">
              <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold font-mono tracking-wider text-slate-500 uppercase">Live Pipeline</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                  $4,900 / $10,000 GL
                </span>
              </div>

              {/* Stat Ring */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block font-mono">REACHED RATE</span>
                  <div className="text-3xl font-display font-black text-slate-900 mt-0.5">50%</div>
                  <span className="text-[10px] text-slate-500 font-medium block">Monthly revenue target reached</span>
                </div>
                
                {/* Visual Circle gauge */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" className="stroke-slate-100 fill-none" strokeWidth="6" />
                    <circle cx="32" cy="32" r="28" className="stroke-brand-sky fill-none" strokeWidth="6" strokeDasharray="175" strokeDashoffset="87" strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-[11px] font-bold font-mono text-slate-800">50%</span>
                </div>
              </div>

              {/* Jobs Table */}
              <div className="space-y-2 text-left pt-2 border-t border-slate-50">
                <span className="text-[9px] font-bold text-slate-400 font-mono tracking-wider block mb-1">RECENT REVENUE STREAM</span>
                {jobs.map((job) => (
                  <div key={job.id} className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl text-[11px] border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span className="font-semibold text-slate-700">{job.site}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-500">{job.date}</span>
                      <span className="font-extrabold text-slate-900">{job.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Data Analytics & Insights (Right Column, Top Grid) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-6 bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="mb-6">
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-1 font-mono">
                <BarChart2 className="w-3.5 h-3.5" />
                DATA ANALYTICS & INSIGHTS
              </span>
              <h3 className="text-xl font-display font-bold text-slate-900 leading-snug">
                Accelerate clarity in every decision
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Equip your management board with automated reporting insights and multi-source analytics.
              </p>
            </div>

            {/* Smart visual mockup */}
            <div className="bg-brand-dark rounded-2xl p-5 border border-slate-900 text-white shadow-xl relative overflow-hidden min-h-[220px] flex flex-col justify-between">
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block font-mono">DECISION METRIC</span>
                  <div className="text-2xl font-display font-bold text-white mt-1">Algorithmic Match</div>
                </div>
                <div className="bg-brand-lime text-slate-950 px-2.5 py-1 rounded-full text-[10px] font-bold">
                  98.6% Confidence
                </div>
              </div>

              {/* Graphic line chart mockup */}
              <div className="h-28 relative flex items-end pt-4">
                <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
                  {/* Glowing gradient path */}
                  <defs>
                    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#258ef9" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#258ef9" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill Area */}
                  <path d="M 0 100 Q 80 40 160 81 T 320 20 L 400 30 L 400 120 L 0 120 Z" fill="url(#glow)" />
                  
                  {/* Line */}
                  <path d="M 0 100 Q 80 40 160 81 T 320 20 L 400 30" fill="none" stroke="#258ef9" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Glowing Node hover indicator */}
                  <circle cx="320" cy="20" r="6" fill="#d5ff3f" stroke="#0e1118" strokeWidth="2" className="animate-pulse" />
                  
                  <text x="310" y="8" className="fill-brand-lime font-mono text-[9px] font-bold">OPTIMAL ZONE</text>
                </svg>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>YEAR 2024</span>
                <span>YEAR 2025</span>
                <span>YEAR 2026</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Digital Transformation with floating metrics representation (Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-1 font-mono">
                <Brain className="w-3.5 h-3.5" />
                DIGITAL TRANSFORMATION
              </span>
              <h3 className="text-xl font-display font-bold text-slate-900 leading-snug">
                Drive adaptive digital pipelines
              </h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Connect physical targets with automated AI assistants to accelerate project output.
              </p>
            </div>

            {/* Performance card stack */}
            <div className="mt-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-md">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">Business Impact</span>
                <span className="bg-emerald-100 text-emerald-800 font-mono text-[9px] font-black px-2 py-0.5 rounded-full">+2.5%</span>
              </div>
              <div className="text-3xl font-display font-extrabold text-slate-900">49%</div>
              <p className="text-[10px] text-slate-500 mt-1 font-medium">Recorded average expansion index across multiple teams</p>
            </div>
          </motion.div>

          {/* Card 4: Experience Intelligence Pulsing Connected Graph (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 bg-[#0e1118] border border-slate-900 rounded-3xl p-6 flex flex-col justify-between shadow-xl text-white relative min-h-[360px]"
          >
            {/* Background elements */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-brand-sky/5 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="relative z-10">
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-brand-lime tracking-wider uppercase mb-1 font-mono">
                <Network className="w-3.5 h-3.5" />
                EXPERIENCE INTELLIGENCE
              </span>
              <h3 className="text-xl font-display font-bold text-white leading-snug">
                Custom solutions paired with top consultants
              </h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-sm">
                Each company connects dynamically with our expert partners. Let's explore nodes.
              </p>
            </div>

            {/* Graph Node Canvas */}
            <div className="relative w-full h-56 mt-4 border border-slate-800/80 rounded-2xl bg-black/30 overflow-x-auto select-none scrollbar-hide">
              <div className="relative w-full h-full min-w-[340px]">
              
              {/* Dynamic canvas SVG lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {nodes.map((node) => (
                  <g key={node.id}>
                    {/* Pulsing connection line */}
                    <line
                      x1="200"
                      y1="130"
                      x2={node.cx}
                      y2={node.cy}
                      className="stroke-brand-sky/40"
                      strokeWidth="1.5"
                      strokeDasharray="6,4"
                    />
                    {/* Outer glowing focus if hovered */}
                    {hoveredNode === node.id && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="18"
                        className="fill-none stroke-brand-lime/50 animate-ping"
                        strokeWidth="1"
                      />
                    )}
                  </g>
                ))}
                
                {/* Center Core node */}
                <circle cx="200" cy="130" r="26" className="fill-brand-sky/15 stroke-brand-sky/60" strokeWidth="2" />
              </svg>

              {/* Center Emblem node overlay */}
              <div className="absolute top-[104px] left-[174px] w-13 h-13 rounded-full bg-brand-dark border-2 border-brand-sky flex items-center justify-center shadow-lg select-none">
                <span className="font-display font-extrabold text-[11px] text-white tracking-widest">AILINE</span>
              </div>

              {/* Node buttons */}
              {nodes.map((node) => (
                <button
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="absolute p-0 border-0 focus:outline-none focus:ring-0 group cursor-pointer"
                  style={{ left: `${node.cx - 16}px`, top: `${node.cy - 16}px` }}
                >
                  {/* Colored circular bead button */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[9px] font-extrabold text-slate-900 border-2 transition-transform duration-300 group-hover:scale-110 shadow-lg"
                    style={{ backgroundColor: node.color, borderColor: '#0e1118' }}
                  >
                    {node.name.split(' ')[0][0]}
                    {node.name.split(' ')[1][0]}
                  </div>

                  {/* Name dynamic balloon */}
                  <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-2 py-1 rounded-lg shadow-xl text-[9px] font-bold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    {node.name} <span className="text-brand-sky ml-1">{node.percent}</span>
                  </div>
                </button>
              ))}

              {/* Interactive side drawer for active hover details */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-sm border border-slate-800/80 rounded-xl px-4 py-2 flex items-center justify-between pointer-events-none text-left">
                {hoveredNode ? (
                  <div>
                    <span className="text-[10px] font-bold text-brand-lime block font-mono">
                      {nodes.find(n => n.id === hoveredNode)?.name.toUpperCase()} — {nodes.find(n => n.id === hoveredNode)?.role}
                    </span>
                    <p className="text-[9px] text-slate-300 leading-snug mt-0.5">
                      {nodes.find(n => n.id === hoveredNode)?.bio}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
                    <span className="text-[9px] font-bold text-slate-400">Hover person nodes to view consulting stats</span>
                  </div>
                )}
                <span className="text-[9px] font-mono font-bold text-brand-sky bg-brand-sky/10 px-2 py-0.5 rounded-full select-none">
                  INTELLIGENT MATCHING
                </span>
              </div>

            </div>
          </div>
        </motion.div>

        </div>

      </div>
    </section>
  );
}
