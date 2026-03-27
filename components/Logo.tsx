export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C5CFC" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
      </defs>

      {/* Outer hexagon */}
      <polygon
        points="20,2 35,11 35,29 20,38 5,29 5,11"
        fill="url(#grad)"
        opacity="0.15"
      />
      <polygon
        points="20,2 35,11 35,29 20,38 5,29 5,11"
        stroke="url(#grad)"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Inner graduation cap shape */}
      {/* Board */}
      <rect x="12" y="18" width="16" height="2" rx="1" fill="url(#grad)" />
      {/* Hat top diamond */}
      <polygon points="20,10 28,15 20,18 12,15" fill="url(#grad)" />
      {/* Tassel */}
      <line x1="28" y1="15" x2="28" y2="22" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="23" r="1.5" fill="#00D4FF" />

      {/* Bottom arc — open book */}
      <path
        d="M13 22 Q20 28 27 22"
        stroke="url(#grad)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
