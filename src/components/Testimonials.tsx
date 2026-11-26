import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/portfolioData';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './ui/Reveal';

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding" style={{ position: 'relative' }}>
      <div className="container-max">
        <Reveal>
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">
            What People<br />
            <span className="gradient-text">Say About Me</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{
            maxWidth: 680,
            margin: '3rem auto 0',
            position: 'relative',
          }}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="glass-card"
              style={{
                padding: '2.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: 48, height: 48,
                background: 'linear-gradient(135deg, var(--moss-deep), var(--moss-dark))',
                border: '1px solid var(--border-accent)',
                borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--accent)',
              }}>
                <Quote size={22} />
              </div>

              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.85,
                fontStyle: 'italic',
                marginBottom: '2rem',
              }}>
                "{t.text}"
              </p>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--moss-deep), var(--moss-dark))',
                  border: '1px solid var(--border-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, color: 'var(--accent)', fontSize: '1.1rem',
                }}>
                  {t.name[0]}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{t.name}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem', alignItems: 'center' }}>
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--text-secondary)',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-card)'; }}
              >
                <ChevronLeft size={18} />
              </motion.button>

              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === current ? 'var(--accent)' : 'var(--border-card)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s',
                    padding: 0,
                  }}
                />
              ))}

              <motion.button
                onClick={next}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--text-secondary)',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-card)'; }}
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>

            <p style={{
              textAlign: 'center', marginTop: '1.5rem',
              fontSize: '0.78rem', color: 'var(--text-muted)',
              fontStyle: 'italic',
            }}>
              * Placeholder testimonials — update with real ones in portfolioData.ts
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
