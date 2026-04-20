"use client";

type LogoProps = {
  className?: string;
  showText?: boolean;
  size?: number;
};

export default function Logo({ className = "", showText = true, size = 32 }: LogoProps) {
  const iconSize = size;
  const textHeight = size * 0.55;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0e6ff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#c084fc" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="core-inner" cx="50%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#e9d5ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="streak-purple" x1="0%" y1="100%" x2="50%" y2="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="streak-cyan" x1="100%" y1="100%" x2="50%" y2="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="streak-pink" x1="0%" y1="0%" x2="50%" y2="50%">
            <stop offset="0%" stopColor="#e879f9" stopOpacity="0" />
            <stop offset="40%" stopColor="#d946ef" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f0abfc" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="streak-blue" x1="100%" y1="0%" x2="50%" y2="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Background glow */}
        <circle cx="60" cy="60" r="28" fill="url(#core-glow)" filter="url(#soft-glow)" />

        {/* Energy streaks — four curved lines converging to center */}
        <g filter="url(#glow-filter)">
          {/* Bottom-left purple streak */}
          <path
            d="M 18 102 C 28 82, 42 68, 57 61"
            stroke="url(#streak-purple)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 12 90 C 26 76, 40 66, 56 60"
            stroke="url(#streak-purple)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />

          {/* Bottom-right cyan streak */}
          <path
            d="M 102 102 C 92 82, 78 68, 63 61"
            stroke="url(#streak-cyan)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 108 90 C 94 76, 80 66, 64 60"
            stroke="url(#streak-cyan)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />

          {/* Top-left pink streak */}
          <path
            d="M 18 18 C 28 38, 42 52, 57 59"
            stroke="url(#streak-pink)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 12 30 C 26 44, 40 54, 56 60"
            stroke="url(#streak-pink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />

          {/* Top-right blue streak (was amber) */}
          <path
            d="M 102 18 C 92 38, 78 52, 63 59"
            stroke="url(#streak-blue)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 108 30 C 94 44, 80 54, 64 60"
            stroke="url(#streak-blue)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
        </g>

        {/* Central orb glow */}
        <circle cx="60" cy="60" r="14" fill="url(#core-glow)" />
        <circle cx="60" cy="60" r="7" fill="url(#core-inner)" />
        <circle cx="60" cy="60" r="3.5" fill="white" opacity="0.95" />
      </svg>

      {showText && (
        <span
          style={{ fontSize: textHeight, lineHeight: 1 }}
          className="font-light tracking-wide text-white/90"
        >
          hubfield
        </span>
      )}
    </span>
  );
}
