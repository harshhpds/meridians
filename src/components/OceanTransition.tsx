import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * OceanTransition — "The Global Trade Journey"
 * -------------------------------------------
 * A cinematic, photo-driven page transition for Meridian Exports.
 *
 * Full sequence (~6.0s), played on the first visit of a browsing session:
 *   0.0 – 1.8s  Brand reveal     — deep navy atmosphere, logo entrance + hold
 *   1.8 – 3.5s  Ocean journey    — cargo ship crossing a layered ocean horizon
 *   3.5 – 4.8s  Container approach — camera pushes toward stacked containers
 *   4.8 – 6.0s  Page reveal      — container surface lifts to uncover the page
 *
 * Internal navigation plays a compact ~1.7s version (ocean wipe → reveal).
 *
 * Design notes:
 *   - Uses real, license-free Pexels photography for convincing depth
 *     (no toy-like SVG ships, no generic spinners).
 *   - Logo is text-based ("Meridians Exports") matching the existing brand
 *     (the project has no image logo asset).
 *   - All overlays unmount after completion so they never trap the user.
 *   - Honors prefers-reduced-motion with a calm branded fade.
 *   - Hard 8s fallback guarantees the overlay can never get stuck.
 */

type Phase = 'brand' | 'ocean' | 'approach' | 'reveal' | 'done';

type Props = {
  /** Change this value to (re)play the transition. */
  trigger: string;
  /** First load plays the full ~6s sequence; later plays are short. */
  full: boolean;
  onComplete?: () => void;
};

// High-quality, license-free Pexels photography. Using full-width variants
// for crisp rendering on large screens.
const SHIP_IMG =
  'https://images.pexels.com/photos/36271361/pexels-photo-36271361.jpeg?auto=compress&cs=tinysrgb&w=2400';
const CONTAINER_IMG =
  'https://images.pexels.com/photos/33675681/pexels-photo-33675681.jpeg?auto=compress&cs=tinysrgb&w=2400';

// Cinematic easing — slow in, deliberate out.
const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;
const EASE_DIVE = [0.65, 0, 0.35, 1] as const;

export function OceanTransition({ trigger, full, onComplete }: Props) {
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState<Phase>(full ? 'brand' : 'reveal');
  const reduceMotion = usePrefersReducedMotion();
  const doneRef = useRef<string | null>(null);
  const activeTrigger = useRef(trigger);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    activeTrigger.current = trigger;
    if (doneRef.current === trigger) return;

    clearTimers();
    setActive(true);
    setPhase(full ? 'brand' : 'reveal');

    if (reduceMotion) {
      const t = window.setTimeout(finish, 120);
      timersRef.current.push(t);
      return () => clearTimers();
    }

    if (full) {
      // Full ~6s sequence — deliberate pacing, logo held clearly.
      timersRef.current.push(window.setTimeout(() => setPhase('ocean'), 1800));
      timersRef.current.push(window.setTimeout(() => setPhase('approach'), 3500));
      timersRef.current.push(window.setTimeout(() => setPhase('reveal'), 4800));
      timersRef.current.push(window.setTimeout(finish, 6000));
    } else {
      // Compact ~1.7s internal transition.
      timersRef.current.push(window.setTimeout(() => setPhase('reveal'), 900));
      timersRef.current.push(window.setTimeout(finish, 1700));
    }

    // Hard fallback — never trap the user, even if timers misfire.
    const guard = window.setTimeout(finish, full ? 8000 : 3500);
    timersRef.current.push(guard);

    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, full, reduceMotion]);

  // Cleanup on unmount.
  useEffect(() => () => clearTimers(), []);

  function clearTimers() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  function finish() {
    const t = activeTrigger.current;
    if (doneRef.current === t) return;
    doneRef.current = t;
    setPhase('done');
    setActive(false);
    onComplete?.();
  }

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="ocean-overlay"
          className="fixed inset-0 z-[120] overflow-hidden bg-ocean-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          aria-hidden="true"
          role="presentation"
        >
          {reduceMotion ? (
            <ReducedFallback />
          ) : (
            <Scene phase={phase} full={full} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Scene orchestration                                                 */
/* ------------------------------------------------------------------ */

function Scene({ phase, full }: { phase: Phase; full: boolean }) {
  return (
    <div className="absolute inset-0">
      <AnimatePresence>
        {phase === 'brand' && <BrandReveal key="brand" />}
        {phase === 'ocean' && <OceanJourney key="ocean" />}
        {phase === 'approach' && <ContainerApproach key="approach" />}
        {phase === 'reveal' && <PageReveal key="reveal" full={full} />}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Phase 1 — Brand reveal (0.0 – 1.8s)                                  */
/* ------------------------------------------------------------------ */

function BrandReveal() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-ocean-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
    >
      {/* Ambient oceanic atmosphere */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_44%,rgba(58,92,150,0.32),transparent_64%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,12,29,0.4)_0%,transparent_40%,rgba(3,12,29,0.5)_100%)]" />

      {/* Subtle drifting haze behind the logo */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      >
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,199,232,0.18),transparent_70%)] blur-2xl" />
      </motion.div>

      {/* Logo block */}
      <div className="relative flex flex-col items-center px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE_CINEMATIC, delay: 0.15 }}
          className="mb-8 h-px w-48 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <motion.h1
          initial={{ opacity: 0, y: 18, letterSpacing: '0.6em', scale: 0.96 }}
          animate={{
            opacity: 1,
            y: 0,
            letterSpacing: '0.42em',
            scale: 1,
          }}
          transition={{ duration: 1.1, ease: EASE_CINEMATIC, delay: 0.25 }}
          className="font-display text-4xl font-light text-ivory sm:text-5xl md:text-6xl"
          style={{ textAlign: 'center' }}
        >
          Meridians <span className="text-gradient-gold">Exports</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
          className="mt-6 text-[11px] font-semibold uppercase tracking-[0.5em] text-gold/70 sm:text-xs"
        >
          Origin · Ocean · Market
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE_CINEMATIC, delay: 0.3 }}
          className="mt-8 h-px w-48 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>

      {/* Refined gold light sweep beneath the logo */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-32 -translate-y-1/2"
        style={{
          background:
            'linear-gradient(90deg,transparent 0%,rgba(200,172,112,0.05) 42%,rgba(244,240,231,0.14) 50%,rgba(200,172,112,0.05) 58%,transparent 100%)',
        }}
        initial={{ x: '-70%', opacity: 0 }}
        animate={{ x: '70%', opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.4 }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Phase 2 — Ocean journey (1.8 – 3.5s)                                */
/* ------------------------------------------------------------------ */

function OceanJourney() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <OceanBackdrop />

      {/* Cargo ship drifting across the horizon */}
      <motion.div
        className="absolute left-0 right-0"
        style={{ top: '46%' }}
        initial={{ x: '-8%', opacity: 0, scale: 0.92 }}
        animate={{ x: '24%', opacity: [0, 1, 1], scale: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{
          x: { duration: 1.7, ease: [0.45, 0.05, 0.55, 0.95] },
          opacity: { duration: 0.6, ease: 'easeOut' },
          scale: { duration: 1.7, ease: 'easeOut' },
        }}
      >
        <div className="relative mx-auto h-[18vh] max-h-44 w-[62vw] max-w-[760px] overflow-hidden rounded-sm shadow-[0_18px_40px_rgba(3,12,29,0.6)]">
          <img
            src={SHIP_IMG}
            alt=""
            className="h-full w-full object-cover object-center"
            style={{ filter: 'saturate(1.05) contrast(1.04) brightness(0.96)' }}
            onError={(e) => {
              (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
            }}
          />
          {/* Blend the ship image into the ocean scene */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ocean-950/30 via-transparent to-ocean-900/55" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ocean-950/80 to-transparent" />
        </div>
      </motion.div>

      <Mist />

      <HorizonLabel text="On the water" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Phase 3 — Container approach (3.5 – 4.8s)                           */
/* ------------------------------------------------------------------ */

function ContainerApproach() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Forward camera push toward the containers */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1.42, opacity: [0, 1, 1] }}
        exit={{ opacity: 1 }}
        transition={{
          scale: { duration: 1.3, ease: EASE_DIVE },
          opacity: { duration: 0.5, ease: 'easeOut' },
        }}
      >
        <img
          src={CONTAINER_IMG}
          alt=""
          className="h-full w-full object-cover object-center"
          style={{ filter: 'saturate(0.92) contrast(1.05) brightness(0.82)' }}
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0';
          }}
        />
        {/* Cinematic color grade toward ocean-950 for the reveal surface */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/45 via-ocean-900/30 to-ocean-950/70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,12,29,0.55)_100%)]" />
      </motion.div>

      <Mist subtle />

      <HorizonLabel text="Approaching port" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Phase 4 — Page reveal (4.8 – 6.0s)                                   */
/* ------------------------------------------------------------------ */

function PageReveal({ full }: { full: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Container surface that lifts upward to reveal the page beneath */}
      <motion.div
        className="absolute inset-x-0 top-0 z-10 h-[118%]"
        initial={{ y: '0%' }}
        animate={{ y: '104%' }}
        transition={{ duration: full ? 1.1 : 0.8, ease: EASE_DIVE }}
      >
        {/* Container texture continues as the lift surface */}
        <img
          src={CONTAINER_IMG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'saturate(0.85) contrast(1.05) brightness(0.7)' }}
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/55 via-ocean-900/45 to-ocean-950/85" />

        {/* Wave-edged bottom so the reveal feels like water receding */}
        <div className="absolute inset-x-0 bottom-0 h-[80px] bg-ocean-950 sm:h-[120px]">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute -top-[78px] left-0 h-[80px] w-full sm:-top-[118px] sm:h-[120px]"
          >
            <path
              d="M0,120 L0,70 C180,105 360,20 720,55 C1080,90 1260,15 1440,60 L1440,120 Z"
              fill="#030c1d"
            />
          </svg>
        </div>
      </motion.div>

      {/* Soft light layer that fades out as the page emerges */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0 }}
        transition={{ duration: full ? 0.9 : 0.6, ease: 'easeOut' }}
        style={{
          background:
            'linear-gradient(180deg,rgba(3,12,29,0.4) 0%,transparent 50%,rgba(3,12,29,0.25) 100%)',
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared ocean backdrop — layered sky + water + animated wave bands  */
/* ------------------------------------------------------------------ */

function OceanBackdrop() {
  const bands = useMemo(
    () => [
      { y: 360, dur: 13, amp: 12, color: '#1f4e8c', opacity: 0.45 },
      { y: 410, dur: 10, amp: 18, color: '#143a6e', opacity: 0.65 },
      { y: 470, dur: 8, amp: 26, color: '#0d2a52', opacity: 0.82 },
      { y: 550, dur: 6.5, amp: 34, color: '#091f3f', opacity: 0.95 },
      { y: 650, dur: 5.2, amp: 42, color: '#06162f', opacity: 1 },
    ],
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-ocean-950 via-ocean-900 to-ocean-800" />
      {/* Water base */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-b from-ocean-700 to-ocean-950" />
      {/* Horizon glow */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[radial-gradient(ellipse_at_50%_50%,rgba(168,199,232,0.45),transparent_64%)]" />

      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {bands.map((b, i) => (
          <WaveBand key={i} {...b} />
        ))}
      </svg>

      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
    </div>
  );
}

type Band = { y: number; dur: number; amp: number; color: string; opacity: number };

function WaveBand({ y, dur, amp, color, opacity }: Band) {
  const tile = `M0,0 C160,-${amp} 320,${amp} 480,0 S800,-${amp} 960,0 S1280,${amp} 1440,0 L1440,260 L0,260 Z`;
  return (
    <g transform={`translate(0,${y})`} opacity={opacity}>
      <motion.g
        animate={{ x: [0, -1440] }}
        transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
      >
        <path d={tile} fill={color} />
        <path d={tile} fill={color} transform="translate(1440,0)" />
      </motion.g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Atmospheric mist                                                    */
/* ------------------------------------------------------------------ */

function Mist({ subtle = false }: { subtle?: boolean }) {
  return (
    <>
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-ocean-950/${
          subtle ? '50' : '65'
        } via-ocean-800/20 to-transparent`}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0"
        style={{ top: '34%', height: '32%' }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: subtle ? [0, 0.35, 0.22] : [0, 0.55, 0.35], y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_50%_60%,rgba(168,199,232,0.2),transparent_72%)] blur-md" />
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Horizon caption                                                     */
/* ------------------------------------------------------------------ */

function HorizonLabel({ text }: { text: string }) {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-[18%] flex justify-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: [0, 1, 1, 0], y: 0 }}
      transition={{ duration: 1.3, ease: 'easeOut' }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-gold/70 sm:text-[11px]">
        {text}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Reduced-motion fallback — calm branded fade                         */
/* ------------------------------------------------------------------ */

function ReducedFallback() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-ocean-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="h-px w-36 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <span className="font-display text-2xl font-light tracking-[0.35em] text-ivory">
          Meridians <span className="text-gold">Exports</span>
        </span>
        <span className="h-px w-36 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Hook — prefers-reduced-motion                                        */
/* ------------------------------------------------------------------ */

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduce;
}
