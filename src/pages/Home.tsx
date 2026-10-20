import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations';
import { COMMODITIES, IMAGES } from '@/data/content';

const HERO_SLIDES = [
  IMAGES.heroField,
  IMAGES.spiceFlatlay,
  IMAGES.cargoShip,
];

/* ------------------------------------------------------------------ */
/* 1. Cinematic crossfading hero with film grain + vignette           */
/* ------------------------------------------------------------------ */
function HeroFilm() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex h-screen min-h-[680px] items-center justify-center overflow-hidden bg-obsidian"
    >
      {/* Crossfading image stack (absolute — no layout shift) */}
      <motion.div style={{ y }} className="absolute inset-0">
        {HERO_SLIDES.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            aria-hidden={i !== index}
            className="absolute inset-0 h-full w-full object-cover"
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        {/* Cinematic gradient + vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/30 to-obsidian/95" />
        <div className="absolute inset-0 [box-shadow:inset_0_0_180px_60px_rgba(0,0,0,0.7)]" />
        {/* Film grain overlay */}
        <div className="grain-overlay absolute inset-0 opacity-[0.18] mix-blend-overlay" />
      </motion.div>

      {/* Headline + intro */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mb-7 text-[11px] font-semibold uppercase tracking-[0.45em] text-gold"
        >
          <span className="mr-3 inline-block h-px w-8 align-middle bg-gold/60" />
          Agricultural Commodity Exports
          <span className="ml-3 inline-block h-px w-8 align-middle bg-gold/60" />
        </motion.p>

        <MaskedHeadline />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.9 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ivory/85 sm:text-lg"
        >
          Agricultural trade with a global outlook — connecting quality-focused
          sourcing with international opportunity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.55, duration: 0.9 }}
          className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <MagneticLink href="/products" variant="solid">
            Explore Our Commodities
          </MagneticLink>
          <MagneticLink href="/contact" variant="outline">
            Start an Enquiry
          </MagneticLink>
        </motion.div>
      </motion.div>

      {/* Rotating brand emblem */}
      <RotatingEmblem />

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-gold" />
        </motion.div>
      </motion.div>

    </section>
  );
}

/* Staggered clip-path mask reveal headline */
function MaskedHeadline() {
  const lines = ['From fertile origins.', 'To global markets.'];
  return (
    <h1 className="font-display text-5xl font-light leading-[1.04] text-ivory sm:text-7xl lg:text-[5.5rem]">
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{
              delay: 1.7 + i * 0.18,
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {i === 0 ? <span className="italic">{line}</span> : line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Rotating circular SVG brand emblem                               */
/* ------------------------------------------------------------------ */
function RotatingEmblem() {
  const text = 'MERIDIANS EXPORTS • PREMIUM GLOBAL TRADE • ';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.8, duration: 1 }}
      className="absolute bottom-28 right-6 z-20 hidden lg:block"
    >
      <div className="relative h-32 w-32">
        <motion.svg
          viewBox="0 0 200 200"
          className="h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          <defs>
            <path
              id="emblemCircle"
              d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
              fill="none"
            />
          </defs>
          <text className="fill-gold text-[12px] uppercase tracking-[0.18em]">
            <textPath href="#emblemCircle" startOffset="0">
              {text}
            </textPath>
          </text>
        </motion.svg>
        {/* Center mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-obsidian/40 backdrop-blur-sm">
            <span className="font-display text-xl text-gold">M</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Infinite global marquee                                          */
/* ------------------------------------------------------------------ */
const MARQUEE_ITEMS = [
  'Premium Spices',
  'Agricultural Commodities',
  'Global Logistics',
  'ISO Certified',
  'Direct Sourcing',
];

function GlobalMarquee() {
  return (
    <section className="relative z-10 border-y border-gold/15 bg-obsidian py-7">
      <div className="flex overflow-hidden">
        <MarqueeTrack />
        <MarqueeTrack aria-hidden />
      </div>
    </section>
  );
}

function MarqueeTrack() {
  return (
    <motion.div
      className="flex shrink-0 items-center gap-8 pr-8"
      animate={{ x: '-50%' }}
      transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
    >
      {[0, 1].map((dup) => (
        <div key={dup} className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={dup === 1}>
          {MARQUEE_ITEMS.map((item) => (
            <span key={item} className="flex shrink-0 items-center gap-8">
              <span className="font-display text-2xl font-light tracking-wide text-gold sm:text-3xl">
                {item}
              </span>
              <span className="text-xl text-gold/50">✦</span>
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Layered parallax storytelling + magnetic button                  */
/* ------------------------------------------------------------------ */
function LayeredStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const yField = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const ySpice = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yStamp = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ivory py-32 lg:py-44"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Layered overlapping images */}
          <div className="relative h-[460px] sm:h-[560px] lg:h-[620px]">
            <motion.div
              style={{ y: yField }}
              className="absolute left-0 top-0 h-[78%] w-[80%] overflow-hidden"
            >
              <img
                src={IMAGES.indiaFields}
                alt="Agricultural fields at harvest"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-obsidian/10" />
            </motion.div>
            <motion.div
              style={{ y: ySpice }}
              className="absolute bottom-0 right-0 h-[58%] w-[62%] overflow-hidden border-8 border-ivory shadow-2xl"
            >
              <img
                src={IMAGES.spiceFlatlay}
                alt="Premium spices flatlay"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              style={{ y: yStamp }}
              className="absolute -bottom-4 left-2 z-10 border border-gold/40 bg-obsidian/90 px-6 py-4 backdrop-blur-sm"
            >
              <p className="font-display text-2xl text-ivory">Est. India</p>
              <p className="text-[10px] tracking-[0.25em] text-gold">ORIGIN · MARKET</p>
            </motion.div>
          </div>

          {/* Copy */}
          <div>
            <Reveal>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-olive">
                Who We Are
              </p>
            </Reveal>
            <StaggerGroup>
              <h2 className="font-display text-4xl font-light leading-[1.1] text-obsidian sm:text-5xl lg:text-6xl">
                <StaggerItem>
                  <span className="block">More than moving</span>
                </StaggerItem>
                <StaggerItem>
                  <span className="block italic text-olive">commodities.</span>
                </StaggerItem>
                <StaggerItem>
                  <span className="block">Connecting origins</span>
                </StaggerItem>
                <StaggerItem>
                  <span className="block">to opportunity.</span>
                </StaggerItem>
              </h2>
            </StaggerGroup>

            <Reveal delay={0.3}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-obsidian/70">
                Meridians Exports is a global agricultural trading house rooted in
                India's most fertile regions. We source, refine, and export premium
                spices, grains, oilseeds, and pulses — bridging the distance between
                the farmer's field and the world's markets with uncompromising
                quality.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10">
                <MagneticLink href="/products" variant="solid-dark">
                  Explore Our Commodities
                </MagneticLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Featured commodities showcase (retained + polished)                 */
/* ------------------------------------------------------------------ */
function FeaturedShowcase() {
  const featured = COMMODITIES.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-obsidian py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
                Featured Commodities
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-light leading-tight text-ivory sm:text-5xl lg:text-6xl">
                A preview of <span className="italic text-gold">what we move.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold transition-colors hover:text-gold-300"
            >
              View All Products
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1}>
              <Link to="/products" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                      {item.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-ivory">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-ivory/60">{item.origin}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Discover
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA band (retained)                                                 */
/* ------------------------------------------------------------------ */
function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-olive py-28">
      <div className="gold-line absolute top-0 left-0 h-px w-full opacity-40" />
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-4xl font-light leading-tight text-ivory sm:text-5xl lg:text-6xl">
            Let's take your next{' '}
            <span className="italic text-gold">opportunity global.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-base text-ivory/70">
            Whether you're sourcing a single container or building a long-term
            supply line, we'd like to hear from you.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex justify-center">
            <MagneticLink href="/contact" variant="outline">
              Get in Touch
            </MagneticLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic link primitive (href-based, works as <a>)                  */
/* ------------------------------------------------------------------ */
function MagneticLink({
  children,
  href,
  variant = 'solid',
}: {
  children: ReactNode;
  href: string;
  variant?: 'solid' | 'outline' | 'ghost' | 'solid-dark';
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles: Record<string, string> = {
    solid: 'bg-gold text-obsidian hover:bg-gold-400',
    'solid-dark': 'bg-obsidian text-gold hover:bg-obsidian-800 border border-gold/30',
    outline: 'border border-ivory/30 text-ivory hover:border-gold hover:text-gold',
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-300 ${styles[variant]}`}
    >
      <span className="relative z-10">{children}</span>
      <ArrowUpRight
        size={16}
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function Home() {
  return (
    <div className="bg-obsidian">
      <HeroFilm />
      <GlobalMarquee />
      <LayeredStory />
      <FeaturedShowcase />
      <CtaBand />
    </div>
  );
}
