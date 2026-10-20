import { motion } from 'framer-motion';
import { FileText, Download, FileDown } from 'lucide-react';
import { Reveal, StaggerGroup, StaggerItem, ParallaxImage } from '@/components/animations';
import { DOWNLOADS, IMAGES } from '@/data/content';

function DownloadsHero() {
  return (
    <section className="relative flex h-[55vh] min-h-[420px] items-end overflow-hidden">
      <ParallaxImage
        src={IMAGES.grainTexture}
        alt="Grain texture"
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
          Resources
        </motion.p>
        <StaggerGroup delay={0.4}>
          <h1 className="font-display text-5xl font-light leading-[1.05] text-ivory sm:text-7xl lg:text-8xl">
            <StaggerItem>
              <span className="block">Brochures</span>
            </StaggerItem>
            <StaggerItem>
              <span className="block italic text-gold">& specifications.</span>
            </StaggerItem>
          </h1>
        </StaggerGroup>
      </div>
    </section>
  );
}

function DownloadsGrid() {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-olive">
            Download Center
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mb-6 font-display text-4xl font-light text-obsidian sm:text-5xl">
            Everything you need, <span className="italic text-olive">in one place.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mb-16 max-w-2xl text-base leading-relaxed text-obsidian/70">
            Download our company profile and product brochures for detailed specifications,
            grades, packaging options, and sourcing information. All documents are PDF
            format and open in a new tab.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DOWNLOADS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full items-start gap-5 border border-obsidian/10 bg-white/40 p-8 transition-all duration-500 hover:border-gold hover:shadow-xl"
              >
                <div className="shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center border border-gold/30 bg-obsidian text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-obsidian">
                    <FileText size={22} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-medium text-obsidian">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-obsidian/60">
                    {item.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                    <Download size={14} />
                    {item.label}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 flex items-center gap-4 border border-obsidian/10 bg-obsidian/5 p-6">
            <FileDown className="shrink-0 text-gold" size={22} />
            <p className="text-sm text-obsidian/70">
              Need a custom specification or a document tailored to your market?{' '}
              <a
                href="/contact"
                className="font-medium text-gold underline underline-offset-4 hover:text-gold-600"
              >
                Contact our team
              </a>{' '}
              and we'll prepare it for you.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Downloads() {
  return (
    <div className="bg-obsidian">
      <DownloadsHero />
      <DownloadsGrid />
    </div>
  );
}
