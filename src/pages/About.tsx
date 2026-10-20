import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ShieldCheck, Award } from 'lucide-react';
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
  ParallaxImage,
  MagneticButton,
} from '@/components/animations';
import { PROCESS_STEPS, CERTIFICATIONS, IMAGES, EXPORT_REGIONS } from '@/data/content';

function AboutHero() {
  return (
    <section className="relative flex h-[70vh] min-h-[500px] items-end overflow-hidden">
      <ParallaxImage
        src={IMAGES.indiaFields}
        alt="Indian agricultural fields"
        className="absolute inset-0"
        scaleFrom={1.15}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/50 to-obsidian/90" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-gold"
        >
          About Meridians Exports
        </motion.p>
        <StaggerGroup delay={0.4}>
          <h1 className="font-display text-5xl font-light leading-[1.05] text-ivory sm:text-7xl lg:text-8xl">
            <StaggerItem>
              <span className="block">Rooted in origin.</span>
            </StaggerItem>
            <StaggerItem>
              <span className="block italic text-gold">Built for the world.</span>
            </StaggerItem>
          </h1>
        </StaggerGroup>
      </div>
    </section>
  );
}

function CompanyDeepDive() {
  return (
    <section className="relative overflow-hidden bg-ivory py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-olive">
                Our Story
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-light leading-[1.1] text-obsidian sm:text-5xl">
                A trading house with <span className="italic text-olive">soil under its nails.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <StaggerGroup>
              <StaggerItem>
                <p className="text-base leading-relaxed text-obsidian/75">
                  Meridians Exports began with a simple conviction: that the world's best
                  agricultural produce deserves a trading partner as committed to quality as
                  the farmers who grow it. We are headquartered in Mumbai, India's commercial
                  capital, and work directly with growing regions across the subcontinent.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-6 text-base leading-relaxed text-obsidian/75">
                  Our teams live close to the source — in the spice belts of Gujarat and
                  Rajasthan, the turmeric yards of Tamil Nadu, the grain markets of Madhya
                  Pradesh. That proximity lets us select at harvest, test at origin, and
                  control every step between the field and the container.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-6 text-base leading-relaxed text-obsidian/75">
                  Today we export to over thirty countries, serving food manufacturers,
                  distributors, and retail brands who value consistency, traceability, and
                  a partner who picks up the phone.
                </p>
              </StaggerItem>
            </StaggerGroup>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <Reveal delay={0.2}>
                <div className="border-t border-obsidian/10 pt-4">
                  <p className="font-display text-3xl text-gold">30+</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-obsidian/50">
                    Export Markets
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="border-t border-obsidian/10 pt-4">
                  <p className="font-display text-3xl text-gold">8</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-obsidian/50">
                    Sourcing States
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="border-t border-obsidian/10 pt-4">
                  <p className="font-display text-3xl text-gold">4</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-obsidian/50">
                    Certifications
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OriginToMarket() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-obsidian py-32 lg:py-44">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            Origin to Market
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mb-24 text-center font-display text-4xl font-light leading-tight text-ivory sm:text-5xl lg:text-6xl">
            Every step, <span className="italic text-gold">accounted for.</span>
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ivory/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-gold via-gold to-gold/40"
          />

          <div className="space-y-24">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStep key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`order-2 ${isLeft ? 'lg:order-1 lg:text-right' : 'lg:order-2'}`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {step.label}
        </p>
        <h3 className="mt-3 font-display text-3xl font-light text-ivory sm:text-4xl">
          {step.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-ivory/70">{step.description}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`order-1 ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={step.image}
            alt={step.label}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-obsidian/30" />
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-1/2 top-1/2 z-10 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-obsidian"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      </motion.div>
    </div>
  );
}

function GlobalNetwork() {
  return (
    <section className="relative overflow-hidden bg-obsidian py-32 lg:py-44">
      <div className="absolute inset-0 opacity-20">
        <img src={IMAGES.globalTrade} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-obsidian/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            Our Network
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mb-16 text-center font-display text-4xl font-light leading-tight text-ivory sm:text-5xl lg:text-6xl">
            Local origins. <span className="italic text-gold">Global possibilities.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <WorldMap />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {EXPORT_REGIONS.map((region, i) => (
            <Reveal key={region.label} delay={0.3 + i * 0.1}>
              <div className="border-t border-gold/30 pt-6">
                <h3 className="font-display text-2xl text-ivory">{region.label}</h3>
                <p className="mt-2 text-sm text-ivory/60">
                  Active trade routes with regular container shipments.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorldMap() {
  return (
    <div className="relative mx-auto aspect-[2/1] w-full max-w-4xl">
      <svg viewBox="0 0 900 450" className="h-full w-full">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C8AC70" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C8AC70" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Simplified continents */}
        <g fill="#F4F0E7" fillOpacity="0.08" stroke="#F4F0E7" strokeOpacity="0.15" strokeWidth="0.5">
          {/* North America */}
          <path d="M120,120 Q180,90 240,100 Q280,120 290,170 Q280,220 250,250 Q210,270 180,250 Q140,220 120,180 Z" />
          {/* South America */}
          <path d="M250,270 Q280,260 300,290 Q310,340 290,380 Q270,400 260,380 Q240,340 250,270 Z" />
          {/* Europe */}
          <path d="M470,120 Q510,100 540,120 Q550,160 530,180 Q490,190 470,170 Q460,140 470,120 Z" />
          {/* Africa */}
          <path d="M500,200 Q540,190 560,230 Q570,290 550,340 Q520,360 500,340 Q480,300 480,250 Q490,210 500,200 Z" />
          {/* Asia */}
          <path d="M560,110 Q640,90 720,120 Q780,150 790,200 Q770,240 720,250 Q670,240 620,220 Q580,190 560,150 Z" />
          {/* Australia */}
          <path d="M730,300 Q780,290 810,320 Q800,350 770,360 Q740,350 730,320 Z" />
        </g>

        {/* India origin point */}
        <circle cx={700} cy={235} r="14" fill="url(#nodeGlow)" />
        <motion.circle
          cx={700}
          cy={235}
          r="4"
          fill="#C8AC70"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <text x={700} y={265} fill="#C8AC70" fontSize="11" textAnchor="middle" className="font-sans">
          India
        </text>

        {/* Export routes */}
        {EXPORT_REGIONS.map((region, i) => {
          const midX = (region.fromX + region.x) / 2;
          const midY = Math.min(region.fromY, region.y) - 40;
          return (
            <g key={region.label}>
              <motion.path
                d={`M${region.fromX},${region.fromY} Q${midX},${midY} ${region.x},${region.y}`}
                fill="none"
                stroke="#C8AC70"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.3, ease: 'easeInOut' }}
              />
              <motion.circle
                cx={region.x}
                cy={region.y}
                r="10"
                fill="url(#nodeGlow)"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
              />
              <circle cx={region.x} cy={region.y} r="3" fill="#C8AC70" />
              <text
                x={region.x}
                y={region.y - 15}
                fill="#F4F0E7"
                fillOpacity="0.8"
                fontSize="11"
                textAnchor="middle"
                className="font-sans"
              >
                {region.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function TrustBadges() {
  return (
    <section className="relative overflow-hidden bg-ivory py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.4em] text-olive">
            Certified & Compliant
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mb-16 text-center font-display text-4xl font-light text-obsidian sm:text-5xl">
            Quality you can <span className="italic text-olive">verify.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={cert.code} delay={i * 0.1}>
              <div className="group relative h-full border border-obsidian/10 bg-white/40 p-8 transition-all duration-500 hover:border-gold hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-gold" size={24} />
                  <Award className="text-olive/60" size={20} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium text-obsidian">
                  {cert.code}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-olive">
                  {cert.name}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-obsidian/60">
                  {cert.description}
                </p>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <div className="bg-obsidian">
      <AboutHero />
      <CompanyDeepDive />
      <OriginToMarket />
      <GlobalNetwork />
      <TrustBadges />
    </div>
  );
}
