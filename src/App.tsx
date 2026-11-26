import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

const BackToTop: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem',
        width: 44, height: 44, borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--moss-deep), var(--moss-dark))',
        border: '1px solid var(--border-accent)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 500,
        boxShadow: 'var(--shadow-hover)',
        color: 'var(--accent)', fontSize: '1.2rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.1) translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onDone={() => setLoading(false)} />
        ) : (
          <React.Fragment key="app">
            {/* Global UI elements */}
            <CustomCursor />
            <ScrollProgress />
            <BackToTop />

            {/* Main layout */}
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Services />
              <Experience />
              <Blog />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
          </React.Fragment>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
