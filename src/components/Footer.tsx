import LogoIcon from './ui/LogoIcon';

interface FooterProps {
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  return (
    <footer className="bg-[#07111F] text-white py-10 rounded-t-[28px] mt-0">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 focus:outline-none">
          <LogoIcon size={28} onDark />
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
