import React from 'react';

/**
 * Reusable vector logo component for AkashVahini.
 * Supports blinking amber square during system boot preloader.
 */
export default function AkvLogo({
  className = 'w-8 h-8',
  isBlinking = false,
  squareClassName = '',
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="168 88 163 175"
      className={className}
      role="img"
      aria-label="AkashVahini Emblem"
    >
      {/* Outer White Contour Frame */}
      <path
        d="M169.6 89.6 L328.9 89.6 L328.9 211.2 L278.7 211.5 L278.2 260.4 L169.6 261.4 Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinejoin="miter"
      />

      {/* Yellow/Amber Corner Square */}
      <polygon
        fill="#FFDE59"
        points="289.2,219.1 289.1,259.6 324.6,259.8 324.8,219.2"
        className={`${isBlinking ? 'animate-pulse' : ''} ${squareClassName}`}
        style={
          isBlinking
            ? {
                animation: 'akv-square-blink 0.5s ease-in-out infinite',
                transformOrigin: '307px 239px',
              }
            : undefined
        }
      />

      {/* Stylized "av." Monogram in Yellow/Amber */}
      <g fill="#FFDE59" fillRule="evenodd">
        {/* a */}
        <path d="M206.2 135.1 L206 140.4 L207 141.5 L207 144.4 L208.5 145.9 L231.5 145.9 L231.9 146.5 L230.4 148 L207.5 148 L205.4 149.1 L204 151.5 L204 155.4 L203 156.5 L203 162.4 L202 163.5 L202.2 170.8 L203.5 171.9 L236.8 171.6 L239.9 167.4 L239.9 162.5 L240.9 161.4 L240.9 154.5 L241.9 153.4 L241.9 147.5 L242.9 146.4 L242.6 136.1 L241.4 135 Z M213.9 159.5 L229.4 158.9 L230 160.4 L214.5 161 Z" />
        {/* v */}
        <path d="M244.4 135 L248 141.5 L249 155.4 L250 156.5 L250 162.4 L251 163.5 L251 167.4 L252.1 170.6 L254.5 171.9 L277.8 171.6 L279.9 168.4 L280.9 156.5 L281.9 155.4 L281.9 149.5 L282.9 148.4 L282.9 142.5 L283.9 141.4 L283.9 138.5 L281.4 135 L273.1 135.2 L273 141.4 L272 142.5 L272 148.4 L271 149.5 L270 160.4 L261.5 161 L257.9 137.5 L255.4 135 Z" />
        {/* . */}
        <path d="M296.8 161.2 L289.5 161 L287.1 162.2 L285 166.5 L285.1 171.6 L293.8 171.6 L295.9 168.4 Z" />
      </g>
    </svg>
  );
}

