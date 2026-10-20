import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OceanTransition } from '@/components/OceanTransition';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Products } from '@/pages/Products';
import { Downloads } from '@/pages/Downloads';
import { Contact } from '@/pages/Contact';

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Session-scoped flag: the full 6s cinematic intro plays only once per
// browsing session. Falls back gracefully if sessionStorage is unavailable.
function readSessionFlag(): boolean {
  try {
    return sessionStorage.getItem('meridian_intro_played') === '1';
  } catch {
    return false;
  }
}
function writeSessionFlag() {
  try {
    sessionStorage.setItem('meridian_intro_played', '1');
  } catch {
    /* ignore — storage unavailable */
  }
}

function App() {
  const location = useLocation();

  // First-load detection (session-scoped, not per-mount).
  const alreadyPlayed = useRef(readSessionFlag());
  const [transitionKey, setTransitionKey] = useState(() => location.pathname);
  const [isFull, setIsFull] = useState(!alreadyPlayed.current);

  useEffect(() => {
    if (!alreadyPlayed.current) {
      // Mark the intro as played for this session immediately so that any
      // rapid re-render or in-flight navigation does not replay the full
      // 6-second sequence.
      alreadyPlayed.current = true;
      writeSessionFlag();
      return;
    }
    // Subsequent internal navigation → short transition.
    setIsFull(false);
    setTransitionKey(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <OceanTransition trigger={transitionKey} full={isFull} />
      <ScrollToTop />
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/products"
              element={
                <PageTransition>
                  <Products />
                </PageTransition>
              }
            />
            <Route
              path="/downloads"
              element={
                <PageTransition>
                  <Downloads />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default App;
