import React, { useState, useEffect, useRef } from 'react';
import AkvLogo from './AkvLogo';

/**
 * BrandIntroSplash coordinates the cinematic preloader and flight animation:
 * 1. Stage 'boot' (0ms - 1100ms): Centered large logo with blinking yellow square.
 * 2. Stage 'glide' (1100ms - 1850ms): Logo glides and scales to navbar target position.
 * 3. Stage 'docked' (1850ms - 2500ms): Logo lands in navbar; wordmark slides out.
 * 4. Stage 'done' (> 2500ms): Unmounts overlay completely.
 */
export default function BrandIntroSplash({ onDocked, onComplete }) {
  const [stage, setStage] = useState('boot'); // 'boot' | 'glide' | 'docked' | 'done'
  const [targetPos, setTargetPos] = useState(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Scroll bypass: if visitor scrolls, immediately skip to done
    const handleScrollBypass = () => {
      if (window.scrollY > 20) {
        setStage('done');
        onDocked?.();
        onComplete?.();
      }
    };
    window.addEventListener('scroll', handleScrollBypass, { passive: true });

    // Step 1 -> Step 2: Boot -> Glide
    const glideTimer = setTimeout(() => {
      const targetEl = document.getElementById('navbar-brand-logo-slot');
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        setTargetPos({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
      setStage('glide');
    }, 1200);

    // Step 2 -> Step 3: Glide -> Docked (wordmark slide triggers)
    const dockTimer = setTimeout(() => {
      setStage('docked');
      onDocked?.();
    }, 1950);

    // Step 3 -> Step 4: Docked -> Complete unmount
    const doneTimer = setTimeout(() => {
      setStage('done');
      onComplete?.();
    }, 2600);

    return () => {
      clearTimeout(glideTimer);
      clearTimeout(dockTimer);
      clearTimeout(doneTimer);
      window.removeEventListener('scroll', handleScrollBypass);
    };
  }, [onDocked, onComplete]);

  if (stage === 'done') {
    return null;
  }

  const isGliding = stage === 'glide' || stage === 'docked';

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] pointer-events-none transition-opacity duration-700 ease-out ${
        isGliding ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Fullscreen Dark Navy Backdrop */}
      <div className="absolute inset-0 bg-navy pointer-events-auto" />

      {/* Flying / Centered Logo Container */}
      <div
        ref={logoRef}
        className="fixed z-[101] pointer-events-none"
        style={
          isGliding && targetPos
            ? {
                top: `${targetPos.top}px`,
                left: `${targetPos.left}px`,
                width: `${targetPos.width}px`,
                height: `${targetPos.height}px`,
                transform: 'none',
                transition: 'all 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
              }
            : {
                top: '50%',
                left: '50%',
                width: '80px',
                height: '80px',
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
              }
        }
      >
        <AkvLogo
          className="w-full h-full object-contain drop-shadow-[0_0_24px_rgba(242,169,59,0.35)]"
          isBlinking={stage === 'boot'}
        />
      </div>

      {/* Booting Subtext (Fades out when gliding) */}
      <div
        className={`absolute bottom-16 left-0 right-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
          stage === 'boot' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-ping" />
          <span className="font-mono text-xs tracking-widest text-amber/90 uppercase">
            INITIALIZING AV-OS
          </span>
        </div>
        <span className="font-mono text-[10px] text-white/40 mt-1.5 tracking-wider">
          AUTONOMOUS DEFENSE SYSTEMS
        </span>
      </div>
    </div>
  );
}
