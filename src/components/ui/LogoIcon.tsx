interface LogoIconProps {
  size?: number;
  /** En fondos oscuros agrega un anillo sutil para definir el borde del ícono */
  onDark?: boolean;
}

export default function LogoIcon({ size = 28 }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
    </svg>
  );
}
