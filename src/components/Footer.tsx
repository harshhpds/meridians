import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { CONTACT_INFO, NAV_LINKS } from '@/data/content';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-obsidian px-6 py-20 lg:px-10">
      <div className="gold-line absolute top-0 left-0 h-px w-full opacity-30" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="group flex items-center gap-2">
              <span className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-8" />
              <span className="font-display text-xl font-medium tracking-wide text-ivory">
                Meridians <span className="text-gold">Exports</span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
              Agricultural trade with a global outlook — connecting quality-focused sourcing
              with international opportunity.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/80">
              Navigate
            </h4>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-sm text-ivory/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/80">
              Contact
            </h4>
            <ul className="mt-6 space-y-4 text-sm text-ivory/70">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-gold/70" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-gold">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-gold/70" />
                <a href={`tel:${CONTACT_INFO.phoneHref}`} className="hover:text-gold">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold/70" />
                <span>{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/80">
              Certifications
            </h4>
            <div className="mt-6 flex flex-wrap gap-2">
              {['ISO 22000', 'FSSAI', 'HACCP', 'APEDA'].map((cert) => (
                <span
                  key={cert}
                  className="border border-ivory/15 px-3 py-1.5 text-xs tracking-wide text-ivory/60"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 sm:flex-row">
          <p className="text-xs text-ivory/40">
            © {new Date().getFullYear()} Meridians Exports. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-gold/40" />
            <span className="text-xs tracking-[0.3em] text-ivory/40">ORIGIN · MARKET</span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
        </div>
      </div>
    </footer>
  );
}
