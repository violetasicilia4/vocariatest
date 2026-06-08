import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import LogoIcon from './ui/LogoIcon';

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Resultado',      href: '#preview'       },
    { label: 'Preguntas',     href: '#faq'           },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md py-2.5 sm:py-4 shadow-sm border-b border-slate-100 text-slate-900'
          : 'bg-transparent py-3 sm:py-6 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className={`flex items-center gap-2.5 group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime focus-visible:ring-offset-2 ${scrolled ? 'text-slate-900 focus-visible:ring-offset-white' : 'text-white focus-visible:ring-offset-transparent'}`}>
          <LogoIcon size={28} />
          <div className="flex flex-col">
            <span className={`font-display font-bold text-[15px] tracking-tight leading-none ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              Vocaria
            </span>
            <span className={`hidden md:block text-[9px] font-medium tracking-wide leading-none mt-0.5 ${scrolled ? 'text-slate-400' : 'text-white/40'}`}>
              Test vocacional · Argentina
            </span>
          </div>
        </a>

        {/* Nav desktop */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-display text-xs font-semibold tracking-wide transition-colors hover:opacity-70 ${
                scrolled ? 'text-slate-700' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex">
          <button
            onClick={onContactClick}
            className="px-5 py-2.5 bg-brand-lime text-slate-950 rounded-full text-xs font-bold tracking-widest hover:bg-white hover:text-slate-950 hover:scale-[1.02] active:scale-[0.97] transition-[background-color,color,transform] duration-200"
          >
            Empezar test
          </button>
        </div>

        {/* Hamburguesa mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-1 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime ${scrolled ? 'text-slate-900' : 'text-white'}`}
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú mobile */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl py-6 px-6 text-slate-900 flex flex-col gap-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-sm font-semibold text-slate-800 hover:text-slate-500 py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => { setMobileMenuOpen(false); onContactClick(); }}
            className="w-full bg-[#07111F] text-white font-bold text-xs tracking-widest py-3.5 rounded-full mt-2 hover:bg-brand-lime hover:text-slate-950 transition-all duration-200"
          >
            Empezar test
          </button>
        </div>
      )}
    </header>
  );
}
