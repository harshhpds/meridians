import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/data/content';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-header py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link to="/" className="group flex items-center gap-2">
            <span className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-8" />
            <span className="font-display text-xl font-medium tracking-wide text-ivory sm:text-2xl">
              Meridians <span className="text-gold">Exports</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group relative text-sm font-medium tracking-wide text-ivory/80 transition-colors hover:text-gold"
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="border border-gold/60 px-6 py-2.5 text-sm font-medium tracking-wide text-gold transition-all duration-300 hover:bg-gold hover:text-obsidian"
            >
              Export Enquiry
            </Link>
          </div>

          <button
            className="text-ivory lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-40 overflow-hidden bg-obsidian/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-2 px-6 pb-8 pt-24">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`border-b border-ivory/10 py-4 font-display text-2xl transition-colors ${
                      active ? 'text-gold' : 'text-ivory hover:text-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="mt-4 border border-gold/60 px-6 py-3 text-center text-sm font-medium tracking-wide text-gold transition-all hover:bg-gold hover:text-obsidian"
              >
                Export Enquiry
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
