import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    // Placeholder: acá iría la integración real (ej: Mailchimp, Brevo, etc.)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleClose = () => {
    setEmail('');
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Fondo oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Contenedor del modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-white rounded-[28px] w-full max-w-md border border-slate-100 shadow-2xl relative overflow-hidden z-10"
          >
            {/* Línea de acento superior */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-brand-lime pointer-events-none" />

            {/* Botón cerrar */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Encabezado */}
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">
                      Pronto disponible
                    </p>
                    <h3 className="text-xl font-display font-extrabold text-[#0e1118] leading-snug">
                      Estamos terminando el test.
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      Dejá tu mail y te avisamos cuando esté listo. Sin spam, sin suscripciones automáticas.
                    </p>
                  </div>

                  {/* Input email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="waitlist-email"
                      className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block uppercase"
                    >
                      Tu mail
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@mail.com"
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-brand-sky focus:ring-1 focus:ring-brand-sky/20 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none transition-all placeholder-slate-400"
                    />
                  </div>

                  {/* Botón enviar */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#07111F] text-white font-bold text-xs tracking-widest py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-brand-lime hover:text-slate-950 transition-all duration-200 shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      'Avisame cuando esté listo'
                    )}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    Solo te escribimos cuando el test esté disponible.
                  </p>

                </form>
              ) : (
                /* Pantalla de confirmación */
                <div className="py-6 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-brand-lime/20 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>

                  <h3 className="text-xl font-display font-black text-slate-950 mb-2">
                    ¡Listo!
                  </h3>

                  <p className="text-sm text-slate-500 max-w-xs leading-relaxed mb-7">
                    Te mandamos un mail a{' '}
                    <strong className="text-slate-800">{email}</strong>{' '}
                    cuando el test esté disponible.
                  </p>

                  <button
                    onClick={handleClose}
                    className="px-8 py-3 bg-slate-900 hover:bg-brand-lime hover:text-slate-950 text-white font-display text-xs font-bold tracking-widest rounded-full transition-all duration-200"
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
