import { motion } from 'motion/react';

const testimonios = [
  {
    etiqueta: 'ENCONTRÓ: DISEÑO UX / UI',
    frase:
      '"Pensaba que para diseñar interfaces tenía que saber programar. El test me ordenó las ideas y me mostró que lo mío era puramente visual y de usabilidad."',
    nombre: 'Sofía, 20',
    dato: 'Diseño Multimedial · UADE',
    iniciales: 'SD',
    dotColor: 'bg-brand-sky',
  },
  {
    etiqueta: 'REORIENTÓ: ADMINISTRACIÓN',
    frase:
      '"Estaba frustrado en abogacía memorizando leyes sin sentido práctico. Acá descubrí que mi verdadero fuerte era la gestión y optimización de proyectos."',
    nombre: 'Mateo, 23',
    dato: 'Cambio de Abogacía a Lic. en Administración · UBA',
    iniciales: 'MZ',
    dotColor: 'bg-slate-500',
  },
  {
    etiqueta: 'ENCONTRÓ: BUSINESS & TECH',
    frase:
      '"Me apasionaba la tecnología pero no me veía codeando todo el día. El test me guio exactamente hacia negocios digitales, donde conecto ambos mundos."',
    nombre: 'Camila, 19',
    dato: 'Lic. en Negocios de Tecnología · San Andrés',
    iniciales: 'CT',
    dotColor: 'bg-emerald-500',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── ENCABEZADO ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-brand-lime text-slate-950 text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 shrink-0" />
            Historias Vocaria
          </span>

          {/* Heading */}
          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#0e1118] tracking-tight leading-[1.1] mb-4">
            Testigos de su propio mapa
          </h2>

          {/* Subtítulo */}
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Casos reales de jóvenes que cambiaron la incertidumbre<br className="hidden sm:block" />
            {' '}por un enfoque vocacional claro y con futuro.
          </p>
        </motion.div>

        {/* ── CARDS ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonios.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between"
              style={{ boxShadow: '0 1px 8px rgba(30,50,80,0.05)' }}
            >
              {/* Contenido principal */}
              <div>
                {/* Etiqueta */}
                <span className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-slate-400 mb-5">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.dotColor}`} />
                  {t.etiqueta}
                </span>

                {/* Frase */}
                <p className="font-display font-medium text-[15px] sm:text-base text-slate-800 leading-relaxed">
                  {t.frase}
                </p>
              </div>

              {/* Footer de la card */}
              <div className="border-t border-slate-100 pt-5 mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-[11px] tracking-wide text-slate-600">
                    {t.iniciales}
                  </span>
                </div>
                <div>
                  <span className="font-display font-bold text-[13px] text-slate-800 block leading-snug">
                    {t.nombre}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium leading-snug block mt-0.5">
                    {t.dato}
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
