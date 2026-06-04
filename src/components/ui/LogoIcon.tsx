interface LogoIconProps {
  size?: number;
  /** En fondos oscuros agrega un anillo sutil para definir el borde del ícono */
  onDark?: boolean;
}

export default function LogoIcon({ size = 28 }: LogoIconProps) {
  return (
    <span
      className="shrink-0 select-none"
      style={{ fontSize: size, lineHeight: 1 }}
      aria-hidden="true"
    >
      🎓
    </span>
  );
}
