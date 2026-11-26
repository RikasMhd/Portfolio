import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'Home',       href: '#hero' },
  { label: 'About',     href: '#about' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Experience',href: '#experience' },
  { label: 'Blog',      href: '#blog' },
  { label: 'Contact',   href: '#contact' },
];

/** Animated theme toggle logo icon */
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.08, rotate: isDark ? -12 : 12 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      style={{
        width: 38,
        height: 38,
        borderRadius: 10,
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--accent)',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-card)';
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isDark ? (
          <motion.div
            key="sun-logo"
            initial={{ y: -16, opacity: 0, rotate: -70 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 16, opacity: 0, rotate: 70 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Light Theme – Click to switch to Dark Theme"
          >
            <Sun size={19} strokeWidth={2.2} />
          </motion.div>
        ) : (
          <motion.div
            key="moon-logo"
            initial={{ y: -16, opacity: 0, rotate: -70 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 16, opacity: 0, rotate: 70 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Dark Theme – Click to switch to Light Theme"
          >
            <Moon size={19} strokeWidth={2.2} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map(n => n.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-max" style={{ padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>

          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('#hero')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}
          >
            <div style={{
              width: 38, height: 38,
              borderRadius: 10,
              background: 'linear-gradient(135deg, var(--moss-deep), var(--moss-dark))',
              border: '1px solid var(--border-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '1.1rem',
              color: 'var(--accent)',
              fontFamily: 'var(--font-heading)',
              boxShadow: 'var(--shadow-card)',
            }}>
              R
            </div>
            <span style={{
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
            }}>
              Mohammed Rikas
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
            {navItems.map(item => (
              <motion.button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 8,
                  fontSize: '0.875rem',
                  fontWeight: active === item.href.slice(1) ? 600 : 500,
                  color: active === item.href.slice(1) ? 'var(--accent)' : 'var(--text-secondary)',
                  transition: 'color 0.2s',
                  fontFamily: 'var(--font-sans)',
                  position: 'relative',
                }}
              >
                {active === item.href.slice(1) && (
                  <motion.span
                    layoutId="nav-pill"
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(99, 107, 47, 0.2)',
                      border: '1px solid var(--border-accent)',
                      borderRadius: 8,
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
              </motion.button>
            ))}

            {/* Theme toggle */}
            <div style={{ marginLeft: '0.6rem' }}>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mobile-only">
            <ThemeToggle />
            <motion.button
              onClick={() => setMenuOpen(o => !o)}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 8,
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-primary)',
              }}
              aria-label="Menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-card)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(item.href)}
                  style={{
                    background: active === item.href.slice(1) ? 'rgba(99, 107, 47, 0.2)' : 'none',
                    border: active === item.href.slice(1) ? '1px solid var(--border-accent)' : 'none',
                    borderRadius: 8,
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: active === item.href.slice(1) ? 'var(--accent)' : 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    fontWeight: active === item.href.slice(1) ? 600 : 500,
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .mobile-only { display: none !important; } }
      `}</style>
    </nav>
  );
};

export default Navbar;
