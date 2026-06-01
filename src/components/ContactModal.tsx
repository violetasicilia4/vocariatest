import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, ShieldAlert, Zap, Compass, FileSpreadsheet } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPlan?: string;
  preselectedPrice?: string;
}

export default function ContactModal({ isOpen, onClose, preselectedPlan = '', preselectedPrice = '' }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [plan, setPlan] = useState(preselectedPlan);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync state if preselected variables update
  useEffect(() => {
    if (preselectedPlan) {
      setPlan(preselectedPlan);
      setMessage(`Hola equipo de VOCARIA, estoy interesado en explorar sus servicios.`);
    } else {
      setPlan('');
      setMessage('');
    }
  }, [preselectedPlan, preselectedPrice, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    // Simulate server side pipeline submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1800);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setPlan('');
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop screen filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-white rounded-[32px] w-full max-w-lg border border-slate-100 shadow-2xl relative overflow-hidden z-10 flex flex-col justify-between"
          >
            {/* Header branding backdrop */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-sky via-brand-lime to-brand-sky pointer-events-none" />

            {/* Modal Closer */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 overflow-hidden w-8 h-8 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content Switcher */}
            <div className="p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  
                  {/* Headline */}
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-[#0e1118]">
                      Establish a collaborative project
                    </h3>
                    <p className="text-slate-500 text-xs mt-1">
                      Our intelligence pipeline will route your contact message directly to an active consulting partner.
                    </p>
                  </div>

                  {/* Preselected indicator if any */}
                  {plan && (
                    <div className="bg-[#fcfdf2] border border-[#d5ff3f]/50 rounded-xl p-3 flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                      <Zap className="w-4 h-4 text-brand-sky" />
                      <span>
                        Interest Rate Configured: <strong className="text-brand-dark uppercase font-extrabold">{plan}</strong> ({preselectedPrice || '/mo'})
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {/* Name input */}
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/20 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none transition-all placeholder-slate-400"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block uppercase">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@innovations.com"
                        className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/20 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none transition-all placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Company input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block uppercase">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Innovations Corp Ltd"
                      className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/20 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none transition-all placeholder-slate-400"
                    />
                  </div>

                  {/* Plan/Inquiry Type selector if generic contact */}
                  {!plan && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block uppercase">
                        Consultation Type
                      </label>
                      <select
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-sky/20 focus:border-brand-sky"
                      >
                        <option value="">General Project Exploration</option>
                        <option value="Starter Plan ($2,500/mo)">Starter Plan ($2,500/mo)</option>
                        <option value="Growth Plan ($8,500/mo)">Growth Plan ($8,500/mo)</option>
                        <option value="Enterprise Plan ($10,500/mo)">Enterprise Plan ($10,500/mo)</option>
                        <option value="Custom Consultation Pipeline">Custom Consultation Estimate</option>
                      </select>
                    </div>
                  )}

                  {/* Long Message block */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block uppercase">
                      Brief Message or Target Outline
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline any bottlenecks, tech deadlines, or business processes you are looking to simplify with strategy and AI..."
                      className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/20 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none transition-all placeholder-slate-400 resize-none"
                    />
                  </div>

                  {/* Security declaration */}
                  <div className="flex items-start gap-2 text-[10px] text-slate-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      Compliance Match: Your data is secure, confidential, and protected under Standard NDAs.
                    </span>
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-950 text-white font-bold text-xs tracking-widest py-3 rounded-full flex items-center justify-center gap-2 hover:bg-brand-sky transition-colors shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ESTABLISHING DEPLOYMENT...
                      </>
                    ) : (
                      <>
                        LAUNCH INQUIRY
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                </form>
              ) : (
                /* Success screen visualization */
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  
                  {/* Glow circle icon */}
                  <div className="w-16 h-16 rounded-full bg-brand-lime/20 flex items-center justify-center text-slate-950 mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 fill-emerald-100" />
                  </div>

                  <h3 className="text-2xl font-display font-black text-slate-950 mb-2">
                    Inquiry Engaged!
                  </h3>
                  
                  <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-8">
                    Hi <strong className="text-slate-900">{name}</strong>, thank you for reaching out from <strong className="text-slate-900">{company || 'your organization'}</strong>. <br />
                    Un asesor de VOCARIA se pondrá en contacto con vos en <strong className="text-brand-sky">{email}</strong> a la brevedad.
                  </p>

                  <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-slate-900 hover:bg-brand-sky text-white font-display text-xs font-bold tracking-widest rounded-full transition-all duration-300 shadow-md"
                  >
                    CONTINUE EXPLORING
                  </button>

                  <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest block mt-8">
                    PIPELINE TASK // RESOLVED
                  </span>

                </div>
              )}
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
