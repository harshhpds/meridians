import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Tractor, FlaskConical, Ship, ArrowUpRight } from 'lucide-react';
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
  ParallaxImage,
  MagneticButton,
} from '@/components/animations';
import { COMMODITIES, IMAGES, type Commodity } from '@/data/content';

const CATEGORIES = ['All', 'Spices', 'Pulses', 'Oilseeds'] as const;
type Category = (typeof CATEGORIES)[number];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
function ProductsHero() {
  return (
    <section className="relative flex h-[55vh] min-h-[420px] items-end overflow-hidden">
      <ParallaxImage
        src={IMAGES.spiceFlatlay}
        alt="Spice flatlay"
        className="absolute inset-0"
        scaleFrom={1.15}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/50 to-obsidian/95" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-gold"
        >
          Our Commodities
        </motion.p>
        <StaggerGroup delay={0.4}>
          <h1 className="font-display text-5xl font-light leading-[1.05] text-ivory sm:text-7xl lg:text-8xl">
            <StaggerItem>
              <span className="block">From the earth,</span>
            </StaggerItem>
            <StaggerItem>
              <span className="block italic text-gold">to your market.</span>
            </StaggerItem>
          </h1>
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 1. "Quality You Can Trust" section                                  */
/* ------------------------------------------------------------------ */
const TRUST_CARDS = [
  {
    icon: Leaf,
    title: '100% Pure',
    text: 'No additives, preservatives, or colours. Pure spice in its most natural form.',
  },
  {
    icon: Tractor,
    title: 'Farm Fresh',
    text: "Directly sourced from India's finest spice-growing regions.",
  },
  {
    icon: FlaskConical,
    title: 'Lab Tested',
    text: 'Rigorously tested for purity, potency, and food safety.',
  },
  {
    icon: Ship,
    title: 'Global Export',
    text: 'Worldwide shipping with full documentation and support.',
  },
] as const;

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function QualityTrust() {
  return (
    <section className="relative bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-olive">
            Why Choose Us
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl font-light leading-tight text-obsidian sm:text-5xl lg:text-6xl">
            Quality You Can Trust
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-obsidian/65 sm:text-lg">
            Every spice meets international standards before reaching your
            doorstep.
          </p>
        </Reveal>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST_CARDS.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={cardItem}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group rounded-2xl border border-obsidian/10 bg-white/60 p-8 shadow-[0_8px_30px_rgba(23,24,20,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(23,24,20,0.12)]"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-olive/10 text-olive transition-colors duration-300 group-hover:bg-gold group-hover:text-obsidian">
                <Icon size={24} strokeWidth={1.6} />
              </div>
              <h3 className="font-display text-2xl font-light text-obsidian">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-obsidian/65">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Animated catalog grid                                            */
/* ------------------------------------------------------------------ */
function CategoryFilter({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full border border-obsidian/10 bg-white/60 p-1 backdrop-blur-sm">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`relative rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
            active === cat
              ? 'text-obsidian'
              : 'text-obsidian/50 hover:text-obsidian'
          }`}
        >
          {active === cat && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 rounded-full bg-gold"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat}</span>
        </button>
      ))}
    </div>
  );
}

function ProductCard({ commodity }: { commodity: Commodity }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 12 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link to="/contact" className="group block h-full">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={commodity.image}
            alt={commodity.name}
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            loading="lazy"
          />
          {/* Darkening gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/25 to-transparent transition-opacity duration-500 group-hover:from-obsidian/[0.98] group-hover:via-obsidian/45" />

          {/* Category chip */}
          <div className="absolute left-5 top-5">
            <span className="border border-gold/40 bg-obsidian/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
              {commodity.category}
            </span>
          </div>

          {/* Base content */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-xs text-gold/80">{commodity.origin}</p>
            <h3 className="mt-1 font-display text-3xl font-light text-ivory">
              {commodity.name}
            </h3>
            <p className="mt-2 text-sm italic text-ivory/70">
              {commodity.tagline}
            </p>

            {/* Sliding glassmorphism "Inquire Now" button */}
            <div className="mt-4 overflow-hidden">
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-ivory backdrop-blur-md"
              >
                Inquire Now
                <ArrowUpRight size={14} className="text-gold" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Catalog() {
  const [active, setActive] = useState<Category>('All');
  const filtered =
    active === 'All'
      ? COMMODITIES.filter((c) => c.category !== 'Grains')
      : COMMODITIES.filter((c) => c.category === active);

  return (
    <section className="relative overflow-hidden bg-obsidian py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            Full Catalog
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl font-light text-ivory sm:text-5xl lg:text-6xl">
            Sixteen commodities.{' '}
            <span className="italic text-gold">One standard.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 mb-12">
            <CategoryFilter active={active} onChange={setActive} />
          </div>
        </Reveal>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <ProductCard key={item.id} commodity={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA                                                                 */
/* ------------------------------------------------------------------ */
function ProductsCta() {
  return (
    <section className="relative overflow-hidden bg-olive py-28">
      <div className="gold-line absolute top-0 left-0 h-px w-full opacity-40" />
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-4xl font-light leading-tight text-ivory sm:text-5xl lg:text-6xl">
            Need a sample or a{' '}
            <span className="italic text-gold">tailored quote?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-base text-ivory/70">
            Send us your specification and target volume. We typically respond
            within one business day with availability, pricing, and lead times.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/contact" variant="solid">
              Request a Quote
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function Products() {
  return (
    <div className="bg-obsidian">
      <ProductsHero />
      <QualityTrust />
      <Catalog />
      <ProductsCta />
    </div>
  );
}
