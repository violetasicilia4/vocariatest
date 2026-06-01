import { HeroVersion } from '../types';

interface FooterProps {
  onLayoutChange: (version: HeroVersion) => void;
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  return (
    <footer className="bg-[#07111F] text-white py-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo + nombre */}
        <a href="#home" className="flex items-center gap-2 focus:outline-none">
          <div className="w-2 h-2 rounded-full bg-brand-lime shrink-0" />
          <div className="flex flex-col">
            <span className="font-display font-bold text-[15px] tracking-tight leading-none text-white">
              Vocaria
            </span>
            <span className="text-[9px] font-medium tracking-wide leading-none mt-0.5 text-white/30">
              Test vocacional · Argentina
            </span>
          </div>
        </a>

        {/* Copyright */}
        <p className="text-[11px] text-white/30 font-medium">
          © 2026 Vocaria. Todos los derechos reservados.
        </p>

        {/* Link contacto */}
        <button
          onClick={onContactClick}
          className="text-[11px] font-semibold text-white/40 hover:text-white transition-colors"
        >
          Contacto
        </button>

      </div>
    </footer>
  );
}
