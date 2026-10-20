import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Navigation,
} from 'lucide-react';
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
  ParallaxImage,
} from '@/components/animations';
import { CONTACT_INFO, WEB3FORMS_KEY, COMMODITIES, IMAGES } from '@/data/content';

type Status = 'idle' | 'loading' | 'success' | 'error';

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */
function ContactHero() {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-obsidian py-24 md:min-h-[68vh]">
      <ParallaxImage
        src={IMAGES.spiceMarket}
        alt="Indian spice market"
        className="absolute inset-0"
        scaleFrom={1.15}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/55 to-obsidian/97" />
      <div className="absolute inset-0 [box-shadow:inset_0_0_160px_50px_rgba(0,0,0,0.55)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-10 lg:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.45em] text-gold"
        >
          <span className="inline-block h-px w-8 bg-gold/60" />
          Get in Touch
        </motion.p>

        <StaggerGroup delay={0.4}>
          <h1 className="font-display text-4xl font-light leading-[1.08] text-ivory sm:text-6xl lg:text-7xl">
            <StaggerItem>
              <span className="block">Let's Bring the Finest</span>
            </StaggerItem>
            <StaggerItem>
              <span className="block">
                <span className="italic text-gold">Indian Spices</span> to Your
              </span>
            </StaggerItem>
            <StaggerItem>
              <span className="block">Business.</span>
            </StaggerItem>
          </h1>
        </StaggerGroup>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg"
        >
          Have a question about our premium Indian spices? Whether you're sourcing
          products in bulk, exploring private-label opportunities, or looking for a
          reliable export partner, our team is here to help.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Contact details + map                                           */
/* ------------------------------------------------------------------ */
const DETAILS = [
  {
    icon: Phone,
    label: 'Phone',
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phoneHref}`,
    note: 'Mon–Sat · 9 AM – 6 PM IST',
  },
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    note: 'We reply within one business day',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: CONTACT_INFO.address,
    href: 'https://www.google.com/maps/search/?api=1&query=Parinee+Crescenzo+BKC+Mumbai',
    note: 'Bandra Kurla Complex, Mumbai',
  },
] as const;

function ContactDetails() {
  return (
    <section className="relative bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — details */}
          <div>
            <Reveal>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-olive">
                Contact Information
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-light leading-tight text-obsidian sm:text-4xl lg:text-5xl">
                Reach the team behind{' '}
                <span className="italic text-olive">every shipment.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-obsidian/70">
                Speak directly with our export desk for quotations, product
                specifications, or documentation support. We're based in Mumbai and
                serve buyers across the globe.
              </p>
            </Reveal>

            <div className="mt-12 divide-y divide-obsidian/10 border-y border-obsidian/10">
              {DETAILS.map((d, i) => (
                <Reveal key={d.label} delay={0.2 + i * 0.08}>
                  <a
                    href={d.href}
                    target={d.label === 'Office' ? '_blank' : undefined}
                    rel={d.label === 'Office' ? 'noopener noreferrer' : undefined}
                    className="group flex items-start gap-5 py-6 transition-colors hover:bg-obsidian/[0.02]"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-olive/30 text-olive transition-colors duration-300 group-hover:border-olive group-hover:bg-olive group-hover:text-ivory">
                      <d.icon size={18} strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-olive/70">
                        {d.label}
                      </p>
                      <p className="mt-1.5 break-words font-display text-lg text-obsidian sm:text-xl">
                        {d.value}
                      </p>
                      <p className="mt-1 text-sm text-obsidian/55">{d.note}</p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="mt-1 shrink-0 text-obsidian/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-olive"
                    />
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.45}>
              <div className="mt-8 flex items-center gap-3 text-sm text-obsidian/60">
                <Clock size={16} className="text-olive" strokeWidth={1.6} />
                <span>{CONTACT_INFO.hours}</span>
              </div>
            </Reveal>
          </div>

          {/* Right — map */}
          <Reveal delay={0.2}>
            <div className="flex h-full flex-col">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-olive">
                  Office Location
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Parinee+Crescenzo+BKC+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-olive transition-colors hover:text-gold"
                >
                  <Navigation size={12} strokeWidth={2} />
                  Directions
                </a>
              </div>
              <div className="relative flex-1 overflow-hidden rounded-sm border border-obsidian/10 bg-obsidian/5">
                <iframe
                  title="Meridian Exports office — BKC, Mumbai"
                  src="https://www.google.com/maps?q=Parinee+Crescenzo+Bandra+Kurla+Complex+Mumbai&output=embed"
                  className="absolute inset-0 h-full w-full grayscale contrast-[1.05]"
                  style={{ border: 0, minHeight: '380px' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 flex items-start gap-3 rounded-sm border border-obsidian/10 bg-obsidian/[0.02] px-5 py-4">
                <MapPin size={16} className="mt-0.5 shrink-0 text-olive" strokeWidth={1.6} />
                <p className="text-sm leading-relaxed text-obsidian/70">
                  Parinee Crescenzo, G Block, Bandra Kurla Complex, Bandra East,
                  Mumbai, Maharashtra 400051, India.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Inquiry form                                                     */
/* ------------------------------------------------------------------ */
const labelClass =
  'block text-xs font-medium uppercase tracking-[0.2em] text-gold/80 mb-2';
const inputClass =
  'w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none transition-colors duration-300';

function EnquiryForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_KEY);
    // Lightweight honeypot
    formData.append('botcheck', '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold/10"
            >
              <CheckCircle2 size={28} className="text-gold" />
            </motion.div>
            <h3 className="mt-6 font-display text-3xl text-ivory">Inquiry Sent</h3>
            <p className="mt-3 max-w-md text-sm text-ivory/60">
              Thank you for reaching out. Our team will get back to you within one
              business day.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-8 text-sm font-medium tracking-wide text-gold underline underline-offset-4 transition-colors hover:text-gold-300"
            >
              Send another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-8"
            noValidate
          >
            {/* Honeypot field (hidden from users) */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={inputClass}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className={labelClass}>
                Subject *
              </label>
              <input
                id="subject"
                name="subject"
                required
                className={inputClass}
                placeholder="What is your inquiry about?"
              />
            </div>

            <div>
              <label htmlFor="commodity" className={labelClass}>
                Product of Interest
              </label>
              <select
                id="commodity"
                name="commodity"
                defaultValue=""
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled className="bg-obsidian text-ivory">
                  Select a product
                </option>
                {COMMODITIES.map((c) => (
                  <option key={c.id} value={c.name} className="bg-obsidian text-ivory">
                    {c.name}
                  </option>
                ))}
                <option value="other" className="bg-obsidian text-ivory">
                  Other / Multiple
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Tell us about your requirements, target volume, and destination port..."
              />
            </div>

            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ivory/40">
                We respond within one business day. Your details are never shared.
              </p>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group inline-flex items-center justify-center gap-2 bg-gold px-8 py-4 text-sm font-medium tracking-wide text-obsidian transition-colors duration-300 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300"
              >
                <AlertCircle size={18} className="shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function InquirySection() {
  return (
    <section className="relative overflow-hidden bg-obsidian py-20 lg:py-28">
      {/* Subtle texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_20%_20%,#C8AC70_0,transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Intro */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
                Inquiry Form
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-light leading-tight text-ivory sm:text-4xl lg:text-5xl">
                Send us an{' '}
                <span className="italic text-gold">inquiry.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-ivory/65">
                Share a few details about your sourcing needs and a member of our
                export desk will respond with tailored guidance, pricing, and
                availability.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 hidden border-l border-gold/30 pl-5 lg:block">
                <p className="font-display text-lg text-ivory">Prefer to talk?</p>
                <a
                  href={`tel:${CONTACT_INFO.phoneHref}`}
                  className="mt-1 block text-sm text-gold transition-colors hover:text-gold-300"
                >
                  {CONTACT_INFO.phone}
                </a>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ivory/40">
                  {CONTACT_INFO.hours}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <Reveal delay={0.2}>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Product CTA                                                      */
/* ------------------------------------------------------------------ */
function ProductCta() {
  return (
    <section className="relative overflow-hidden bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative overflow-hidden">
              <ParallaxImage
                src={IMAGES.spiceFlatlay}
                alt="Premium Indian spices flatlay"
                className="aspect-[4/3] w-full"
                scaleFrom={1.1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 to-transparent" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-olive">
                Explore Our Range
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-light leading-[1.12] text-obsidian sm:text-4xl lg:text-5xl">
                Ready to Source Premium{' '}
                <span className="italic text-olive">Indian Spices?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-obsidian/70">
                Explore our range of Indian spices and masala for bulk purchasing,
                export, and business partnerships. Detailed specifications, grades,
                and packaging options for every product.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10">
                <Link
                  to="/products"
                  className="group inline-flex items-center justify-center gap-2 bg-obsidian px-8 py-4 text-sm font-medium tracking-wide text-gold transition-colors duration-300 hover:bg-obsidian-800"
                >
                  Browse Our Products
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export function Contact() {
  return (
    <div className="bg-obsidian">
      <ContactHero />
      <ContactDetails />
      <InquirySection />
      <ProductCta />
    </div>
  );
}
