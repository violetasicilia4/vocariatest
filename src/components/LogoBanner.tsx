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
        <svg viewBox="0 0 190 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <g transform="translate(4, 6)" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="19" cy="19" r="18" />
            <circle cx="19" cy="19" r="14" strokeWidth="0.7" />
            <path d="M19 5v28M5 19h28" strokeWidth="0.7" />
            <path d="M12 12l14 14M26 12L12 26" strokeWidth="0.4" strokeDasharray="1 1" />
          </g>
          <text x="46" y="23" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="10.5" fontWeight="800" letterSpacing="0.02em">UNIVERSIDAD NACIONAL</text>
          <text x="46" y="38" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="14" fontWeight="900" letterSpacing="0.04em">DE LA PLATA</text>
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
    // 12. UCA (Pontificia Universidad Católica Argentina) - High-Fidelity Circular Seal & Serif Typography
    {
      id: 'uca',
      name: 'Pontificia Universidad Católica Argentina',
      element: (
        <svg viewBox="0 0 155 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          {/* Detailed circular seal */}
          <g transform="translate(2, 2)" fill="none" stroke="currentColor" strokeWidth="1.1">
            <circle cx="23" cy="23" r="20" />
            <circle cx="23" cy="23" r="17.5" strokeWidth="0.5" strokeDasharray="1.5 1" />
            <circle cx="23" cy="23" r="15" strokeWidth="0.6" />
            {/* Holy cross and Santa Maria ship cradle emblem */}
            <path d="M23,12 V33" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17,19 H29" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16,28 C16,33 30,33 30,28 C30,26 28.5,26 28.5,28 C28.5,30.5 17.5,30.5 17.5,28 Z" fill="currentColor" fillOpacity="0.15" />
            {/* Small 'SM' and 'BA' symbols flanking the cross */}
            <text x="17.5" y="21.5" fontSize="3.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">S</text>
            <text x="17.5" y="25" fontSize="3.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">M</text>
            <text x="28.5" y="21.5" fontSize="3.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">B</text>
            <text x="28.5" y="25" fontSize="3.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">A</text>
            
            {/* Circular rim texts */}
            <text className="text-[2.6px] font-bold tracking-[0.08em]" fill="currentColor" stroke="none">
              <textPath href="#uca-text-path-top" startOffset="50%" textAnchor="middle">CATOLICA ARGENTINA</textPath>
            </text>
            <text className="text-[2.6px] font-bold tracking-[0.08em]" fill="currentColor" stroke="none">
              <textPath href="#uca-text-path-bottom" startOffset="50%" textAnchor="middle">UNIVERSIDAD</textPath>
            </text>
          </g>
          {/* Prominent Serif "UCA" */}
          <text x="48" y="38" fontFamily="Georgia, 'Times New Roman', serif" fontSize="42" fontWeight="300" letterSpacing="-0.04em">UCA</text>
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
    // 15. Universidad Favaloro
    {
      id: 'favaloro',
      name: 'Universidad Favaloro',
      element: (
        <svg viewBox="0 0 150 50" className="h-7 md:h-8 text-slate-500 hover:text-slate-800 transition-colors" fill="currentColor">
          <g transform="translate(2, 6)">
            <path d="M10 6c-3.5-3.5-9-3.5-9 2.5 0 6 9 12 9 12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M10 6c3.5-3.5 9-2.5 9 2.5s-3.5 5-9 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M10 9v15" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </g>
          <text x="34" y="23" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="11" fontWeight="700" letterSpacing="0.04em">UNIVERSIDAD</text>
          <text x="34" y="39" fontFamily="system-ui, -apple-system, sfont-sans" fontSize="16" fontWeight="900" letterSpacing="0.06em">FAVALORO</text>
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
    <section className="py-7 md:py-10 border-b border-slate-100 overflow-hidden select-none relative" style={{ background: 'linear-gradient(to bottom, #EEF9FF 0%, #F8FEFF 60%, #ffffff 100%)' }}>
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
                    className="flex items-center shrink-0 max-w-[280px] pointer-events-auto cursor-help"
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
                    className="flex items-center shrink-0 max-w-[280px] pointer-events-auto cursor-help"
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
