import React from 'react';

export default function LogoBanner() {
  const logos = [
    // 1. UBA (Universidad de Buenos Aires) - Minimal Wordmark only
    {
      id: 'uba',
      name: 'Universidad de Buenos Aires',
      element: (
        <svg viewBox="0 0 85 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <text x="2" y="37" fontFamily="'Montserrat', 'Arial Black', sans-serif" fontSize="33" fontWeight="950" letterSpacing="-0.03em">UBA</text>
        </svg>
      )
    },
    // 2. San Andrés (UdeSA)
    {
      id: 'udesa',
      name: 'Universidad de San Andrés',
      element: (
        <svg viewBox="0 0 162 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <g transform="translate(2, 5)" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M4 4h24v16c0 8-12 12-12 12S4 28 4 20V4z" fill="currentColor" fillOpacity="0.1" />
            <path d="M4 4l24 28M28 4L4 32" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
            <circle cx="16" cy="10" r="2.5" fill="currentColor" />
            <circle cx="10" cy="22" r="2.5" fill="currentColor" />
          </g>
          <text x="42" y="23" fontFamily="Georgia, Utopia, serif" fontSize="13.5" fontWeight="bold">Universidad de</text>
          <text x="42" y="39" fontFamily="Georgia, Utopia, serif" fontSize="16.5" fontWeight="bold">SanAndrés</text>
        </svg>
      )
    },
    // 3. UP (Universidad de Palermo)
    {
      id: 'up',
      name: 'Universidad de Palermo',
      element: (
        <svg viewBox="0 0 155 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <rect x="4" y="7" width="36" height="36" rx="5" fill="currentColor" />
          <text x="22" y="32" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="20" fontWeight="900" fill="white" textAnchor="middle">UP</text>
          <text x="46" y="24" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="13" fontWeight="900" letterSpacing="-0.01em">Universidad</text>
          <text x="46" y="38" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="13" fontWeight="900" letterSpacing="-0.01em">de Palermo</text>
        </svg>
      )
    },
    // 4. Universidad Austral - High-Fidelity Serif Wordmark (Sized down to fit gracefully without cutoffs)
    {
      id: 'austral',
      name: 'Universidad Austral',
      element: (
        <svg viewBox="0 0 160 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <text x="4" y="35" fontFamily="Georgia, 'Times New Roman', serif" fontSize="24" fontWeight="bold" letterSpacing="0.08em">AUSTRAL</text>
        </svg>
      )
    },
    // 5. UNLP (Universidad Nacional de La Plata)
    {
      id: 'unlp',
      name: 'Universidad Nacional de La Plata',
      element: (
        <svg viewBox="0 0 200 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <text x="2" y="20" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fontWeight="700" letterSpacing="0.03em">UNIVERSIDAD</text>
          <text x="2" y="33" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fontWeight="700" letterSpacing="0.03em">NACIONAL</text>
          <text x="2" y="46" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fontWeight="700" letterSpacing="0.03em">DE LA PLATA</text>
        </svg>
      )
    },
    // 6. USAL (Universidad del Salvador) - Wordmark only (Improved spacing and sizing to prevent cutoffs)
    {
      id: 'usal',
      name: 'Universidad del Salvador',
      element: (
        <svg viewBox="0 0 115 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <text x="6" y="36" fontFamily="Georgia, Utopia, serif" fontSize="29" fontWeight="900" letterSpacing="0.04em">USAL</text>
        </svg>
      )
    },
    // 8. UNC (Universidad Nacional de Córdoba) - Clean block logo with text
    {
      id: 'unc',
      name: 'Universidad Nacional de Córdoba',
      element: (
        <svg viewBox="0 0 162 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <rect x="4" y="8" width="38" height="34" rx="4" fill="currentColor" />
          <text x="23" y="32" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="17" fontWeight="900" fill="white" textAnchor="middle">UNC</text>
          <text x="46" y="23" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="9.5" fontWeight="800">Universidad Nacional</text>
          <text x="46" y="37" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="11" fontWeight="900">de Córdoba</text>
        </svg>
      )
    },
    // 9. Universidad de Belgrano (UB)
    {
      id: 'belgrano',
      name: 'Universidad de Belgrano',
      element: (
        <svg viewBox="0 0 195 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <text x="4" y="28" fontFamily="Georgia, Utopia, serif" fontSize="28" fontWeight="bold" letterSpacing="-0.02em">Belgrano</text>
          <line x1="4" y1="33" x2="131" y2="33" stroke="currentColor" strokeWidth="2.2" />
          <text x="4" y="44" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="7.5" fontWeight="900" letterSpacing="0.12em">UNIVERSIDAD DE BELGRANO</text>
        </svg>
      )
    },
    // 17. UTN (Universidad Tecnológica Nacional) - Clean Wordmark matching UADE/ITBA style
    {
      id: 'utn',
      name: 'Universidad Tecnológica Nacional',
      element: (
        <svg viewBox="0 0 90 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <text x="2" y="36" fontFamily="'Montserrat', 'Plus Jakarta Sans', 'Arial Black', system-ui, sans-serif" fontSize="34" fontWeight="950" letterSpacing="-0.03em">UTN</text>
        </svg>
      )
    },
    // 10. UNL (Universidad Nacional del Litoral)
    {
      id: 'unl',
      name: 'Universidad Nacional del Litoral',
      element: (
        <svg viewBox="0 0 172 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <circle cx="20" cy="25" r="19" fill="currentColor" />
          <text x="20" y="31" fontFamily="Georgia, Utopia, serif" fontSize="16" fontWeight="900" fill="white" textAnchor="middle">UNL</text>
          <text x="44" y="24" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="11.5" fontWeight="800">Universidad Nacional</text>
          <text x="44" y="38" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="13" fontWeight="800">del Litoral</text>
        </svg>
      )
    },
    // 11. UADE (Universidad Argentina de la Empresa)
    {
      id: 'uade',
      name: 'Universidad Argentina de la Empresa',
      element: (
        <svg viewBox="0 0 110 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <text x="2" y="36" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="34" fontWeight="900" letterSpacing="-0.03em">UADE</text>
        </svg>
      )
    },
    // 12. UCA (Pontificia Universidad Católica Argentina)
    {
      id: 'uca',
      name: 'Pontificia Universidad Católica Argentina',
      element: (
        <svg viewBox="0 0 210 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          {/* Sello circular: doble borde + cruz + ancla */}
          <g transform="translate(1, 1)">
            <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="1.4"/>
            <circle cx="24" cy="24" r="19.5" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 1.5"/>
            <circle cx="24" cy="24" r="16.5" fill="none" stroke="currentColor" strokeWidth="0.4"/>
            {/* Cruz */}
            <line x1="24" y1="9" x2="24" y2="36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="16" y1="17" x2="32" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            {/* Ancla (base del barco) */}
            <path d="M17,30 Q24,38 31,30" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <circle cx="24" cy="30" r="2" fill="none" stroke="currentColor" strokeWidth="1"/>
          </g>
          {/* UCA en serif grande */}
          <text x="54" y="36" fontFamily="Georgia, 'Times New Roman', serif" fontSize="36" fontWeight="700" letterSpacing="-0.02em">UCA</text>
          {/* Nombre completo */}
          <text x="54" y="46" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="600" letterSpacing="0.05em">UNIVERSIDAD CATÓLICA ARGENTINA</text>
        </svg>
      )
    },
    // 13. UTDT (Universidad Torcuato Di Tella)
    {
      id: 'ditella',
      name: 'Universidad Torcuato Di Tella',
      element: (
        <svg viewBox="0 0 152 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <text x="4" y="30" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="29" fontWeight="900" letterSpacing="-0.05em">di tella</text>
          <text x="5" y="42" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="8" fontWeight="805" letterSpacing="0.12em">TORCUATO DI TELLA</text>
        </svg>
      )
    },
    // 14. ITBA (Instituto Tecnológico de Buenos Aires) - Geometric Ultra Bold Sans-Serif (Matches UADE size)
    {
      id: 'itba',
      name: 'Instituto Tecnológico de Buenos Aires',
      element: (
        <svg viewBox="0 0 110 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <text x="2" y="36" fontFamily="'Montserrat', 'Plus Jakarta Sans', 'Arial Black', system-ui, sans-serif" fontSize="34" fontWeight="950" letterSpacing="-0.03em">ITBA</text>
        </svg>
      )
    },
    // 15. Universidad Favaloro — dos F invertidas formando corazón
    {
      id: 'favaloro',
      name: 'Universidad Favaloro',
      element: (
        <svg viewBox="0 0 155 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          {/*
            El símbolo de Favaloro son dos "F" en espejo que forman un corazón.
            F izquierda: barra vertical izquierda + dos brazos hacia la derecha (arriba y medio)
            F derecha (espejo): barra vertical derecha + dos brazos hacia la izquierda
            Juntas forman los dos lóbulos del corazón arriba y el punto abajo.
          */}

          {/* F izquierda — forma el lóbulo izquierdo */}
          <path d="
            M 22,42
            C 14,36 4,27 4,18
            C 4,10 9,6 15,6
            C 18,6 20,8 22,11
            L 22,16
            C 20,14 18,13 15,13
            C 11,13 9,16 9,19
            C 9,26 16,33 22,38
            Z
          "/>

          {/* F derecha (espejo) — forma el lóbulo derecho */}
          <path d="
            M 22,42
            C 30,36 40,27 40,18
            C 40,10 35,6 29,6
            C 26,6 24,8 22,11
            L 22,16
            C 24,14 26,13 29,13
            C 33,13 35,16 35,19
            C 35,26 28,33 22,38
            Z
          "/>

          {/* Brazo medio F izquierda */}
          <path d="M 22,22 L 13,22 L 13,26 L 22,26 Z"/>
          {/* Brazo medio F derecha */}
          <path d="M 22,22 L 31,22 L 31,26 L 22,26 Z"/>

          {/* Texto */}
          <text x="48" y="22" fontFamily="system-ui,-apple-system,sans-serif" fontSize="10" fontWeight="700" letterSpacing="0.04em">UNIVERSIDAD</text>
          <text x="48" y="37" fontFamily="system-ui,-apple-system,sans-serif" fontSize="13.5" fontWeight="900" letterSpacing="0.03em">FAVALORO</text>
        </svg>
      )
    },
    // 16. UCEMA - Double Line Stack (UNIVERSIDAD DEL CEMA | UCEMA)
    {
      id: 'ucema',
      name: 'UCEMA',
      element: (
        <svg viewBox="0 0 162 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <text x="2" y="16" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="0.25em">UNIVERSIDAD DEL CEMA</text>
          <text x="2" y="44" fontFamily="system-ui, -apple-system, sans-serif" fontSize="29" fontWeight="900" letterSpacing="0.03em">UCEMA</text>
        </svg>
      )
    }
  ];

  return (
    <section id="carreras" className="py-7 md:py-10 border-b border-slate-100 overflow-hidden select-none relative" style={{ background: 'linear-gradient(to bottom, #EEF9FF 0%, #F8FEFF 60%, #ffffff 100%)' }}>
      {/* Shared SVG Defs to avoid ID duplication in the DOM slider */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* UCA Seal circular text paths */}
          <path id="uca-text-path-top" d="M 6.5,23 A 16.5,16.5 0 0,1 39.5,23" fill="none" />
          <path id="uca-text-path-bottom" d="M 39.5,23 A 16.5,16.5 0 0,1 6.5,23" fill="none" />
        </defs>
      </svg>

      {/* Visual fading masks on edges for high-end look */}
      <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white to-transparent opacity-100 z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white to-transparent opacity-100 z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center">
          <p className="text-[11px] sm:text-[12px] font-semibold text-slate-700 mb-1 text-center select-none tracking-wide">
            Basado en carreras reales
          </p>
          <p className="text-[10px] sm:text-[10.5px] font-medium text-slate-400 mb-6 text-center select-none leading-relaxed px-4">
            Cruzamos tu perfil con +130 carreras de universidades argentinas
          </p>

          <div className="w-full relative overflow-hidden py-2" id="universities-vector-marquee">
            {/* The marquee-container hosts the identical track pairs */}
            <div className="flex w-max marquee-container">
              {/* Sibling Track 1 */}
              <div className="animate-slow-marquee flex items-center gap-12 md:gap-16 pr-12 md:pr-16 shrink-0">
                {logos.map((logo, index) => (
                  <div
                    key={`${logo.id}-t1-${index}`}
                    className="flex items-center shrink-0 max-w-[280px] pointer-events-none select-none"
                    title={logo.name}
                  >
                    {logo.element}
                  </div>
                ))}
              </div>
              {/* Sibling Track 2 (Identical Copy for mathematically flawless seamless visual transition) */}
              <div className="animate-slow-marquee flex items-center gap-12 md:gap-16 pr-12 md:pr-16 shrink-0" aria-hidden="true">
                {logos.map((logo, index) => (
                  <div
                    key={`${logo.id}-t2-${index}`}
                    className="flex items-center shrink-0 max-w-[280px] pointer-events-none select-none"
                    title={logo.name}
                  >
                    {logo.element}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[12px] text-slate-400 font-medium text-center mt-6 select-none">
            +1.200 perfiles vocacionales generados en Argentina
          </p>
        </div>
      </div>
    </section>
  );
}
