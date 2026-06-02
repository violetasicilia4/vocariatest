interface MapGlyphProps {
  className?: string;
}

export default function MapGlyph({ className = '' }: MapGlyphProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Path lines — two routes converging, then diverging */}
      <line x1="12" y1="75" x2="65" y2="25"  stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="12" y1="75" x2="90" y2="112" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="65" y1="25"  x2="150" y2="52" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="90" y1="112" x2="150" y2="52" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="150" y1="52" x2="198" y2="28" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="150" y1="52" x2="218" y2="92" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />

      {/* Waypoint nodes */}
      <circle cx="65"  cy="25"  r="2.5" fill="currentColor" />
      <circle cx="90"  cy="112" r="2.5" fill="currentColor" />
      <circle cx="198" cy="28"  r="3"   fill="currentColor" />
      <circle cx="218" cy="92"  r="3"   fill="currentColor" />

      {/* Origin — filled + outer ring */}
      <circle cx="12" cy="75" r="4" fill="currentColor" />
      <circle cx="12" cy="75" r="9" stroke="currentColor" strokeWidth="0.7" fill="none" />

      {/* Convergence — filled + dashed orbit ring */}
      <circle cx="150" cy="52" r="5"  fill="currentColor" />
      <circle cx="150" cy="52" r="12" stroke="currentColor" strokeWidth="0.7" fill="none" strokeDasharray="2.5 2" />
    </svg>
  );
}
