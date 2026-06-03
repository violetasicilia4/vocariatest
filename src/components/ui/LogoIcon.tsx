interface LogoIconProps {
  size?: number;
  /** En fondos oscuros agrega un anillo sutil para definir el borde del ícono */
  onDark?: boolean;
}

export default function LogoIcon({ size = 28, onDark = false }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 rounded-[7px] ${onDark ? 'ring-1 ring-white/10' : ''}`}
    >
      <rect width="32" height="32" rx="7" fill="#0e1118" />
      <path
        d="M8 9L15.5 22L23 9"
        stroke="#d5ff3f"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24.5" cy="8" r="2.5" fill="#d5ff3f" />
    </svg>
  );
}
