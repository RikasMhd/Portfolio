import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 200);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div style={{ textAlign: 'center' }}>
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
            style={{
              width: 80, height: 80,
              borderRadius: 20,
              background: 'linear-gradient(135deg, var(--moss-deep), var(--moss-dark))',
              border: '1px solid var(--border-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 2rem',
              fontSize: '2rem', fontWeight: 700, color: 'var(--accent)',
              boxShadow: 'var(--shadow-hover)',
            }}
          >
            R
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              marginBottom: '1.5rem',
            }}
          >
            initializing portfolio...
          </motion.p>

          {/* Progress bar */}
          <div style={{
            width: 240, height: 3,
            background: 'rgba(186, 192, 149, 0.15)',
            borderRadius: 2,
            overflow: 'hidden',
            margin: '0 auto',
          }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--moss-deep), var(--accent))',
                borderRadius: 2,
                width: `${Math.min(progress, 100)}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent)',
              fontSize: '0.75rem',
              marginTop: '0.75rem',
            }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
