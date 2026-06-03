const universidades = [
  { sigla: 'UBA',     nombre: 'Universidad de Buenos Aires',       weight: 'font-black',     size: 'text-[22px]' },
  { sigla: 'ITBA',    nombre: 'Inst. Tecnológico Buenos Aires',    weight: 'font-black',     size: 'text-[22px]' },
  { sigla: 'UdeSA',   nombre: 'Universidad de San Andrés',         weight: 'font-bold',      size: 'text-[15px]' },
  { sigla: 'UP',      nombre: 'Universidad de Palermo',            weight: 'font-black',     size: 'text-[22px]' },
  { sigla: 'UTDT',    nombre: 'Torcuato Di Tella',                 weight: 'font-bold',      size: 'text-[15px]' },
  { sigla: 'UADE',    nombre: 'Univ. Argentina de la Empresa',     weight: 'font-black',     size: 'text-[22px]' },
  { sigla: 'UCA',     nombre: 'Univ. Católica Argentina',          weight: 'font-bold',      size: 'text-[15px]' },
  { sigla: 'UNC',     nombre: 'Univ. Nacional de Córdoba',         weight: 'font-black',     size: 'text-[20px]' },
  { sigla: 'UTN',     nombre: 'Univ. Tecnológica Nacional',        weight: 'font-black',     size: 'text-[22px]' },
  { sigla: 'UNLP',    nombre: 'Univ. Nacional de La Plata',        weight: 'font-bold',      size: 'text-[15px]' },
  { sigla: 'UNL',     nombre: 'Univ. Nacional del Litoral',        weight: 'font-bold',      size: 'text-[15px]' },
  { sigla: 'Austral', nombre: 'Universidad Austral',               weight: 'font-bold',      size: 'text-[17px]' },
  { sigla: 'USAL',    nombre: 'Universidad del Salvador',          weight: 'font-black',     size: 'text-[20px]' },
  { sigla: 'Belgrano',nombre: 'Universidad de Belgrano',           weight: 'font-bold',      size: 'text-[16px]' },
  { sigla: 'UCEMA',   nombre: 'Universidad del CEMA',              weight: 'font-black',     size: 'text-[20px]' },
  { sigla: 'Favaloro',nombre: 'Universidad Favaloro',              weight: 'font-bold',      size: 'text-[16px]' },
];

export default function LogoBanner() {
  return (
    <section
      id="carreras"
      className="py-6 md:py-8 overflow-hidden select-none relative border-t border-slate-100"
      style={{ background: '#ffffff' }}
    >
      {/* Fading masks */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center">

          <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 mb-5 text-center select-none leading-relaxed">
            Cruzamos tu perfil con{' '}
            <span className="font-semibold text-slate-500">+130 carreras</span>
            {' '}de universidades argentinas
          </p>

          <div className="w-full relative overflow-hidden py-1">
            <div className="flex w-max marquee-container">
              {[1, 2].map((track) => (
                <div
                  key={track}
                  className="animate-slow-marquee flex items-center gap-10 md:gap-14 pr-10 md:pr-14 shrink-0"
                  aria-hidden={track === 2 ? 'true' : undefined}
                >
                  {universidades.map((u) => (
                    <span
                      key={`${u.sigla}-t${track}`}
                      className={`font-display ${u.weight} ${u.size} text-slate-300 hover:text-slate-500 transition-colors duration-200 shrink-0 tracking-tight leading-none`}
                      title={u.nombre}
                    >
                      {u.sigla}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
