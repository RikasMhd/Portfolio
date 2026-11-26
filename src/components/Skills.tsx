import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/portfolioData';
import Reveal from './ui/Reveal';

const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative' }}>
      <div className="orb orb-blue" style={{ width: 500, height: 500, bottom: 0, left: '-10%', opacity: 0.12 }} />

      <div className="container-max">
        {/* Header */}
        <Reveal>
          <p className="section-label">Technical Skills</p>
          <h2 className="section-title">
            My Tech Stack &<br />
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="section-subtitle">
            A curated set of technologies I work with to build intelligent, modern, and scalable applications.
          </p>
        </Reveal>

        {/* Filter tabs */}
        <Reveal delay={0.1}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
            marginTop: '2.5rem', marginBottom: '2.5rem',
          }}>
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: 20,
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border-card)',
                  background: activeCategory === cat ? 'rgba(99, 107, 47, 0.22)' : 'var(--bg-card)',
                  color: activeCategory === cat ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: '0.83rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* Skills Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card"
                style={{ padding: '1.25rem 1rem', cursor: 'default' }}
              >
                {/* Icon + Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.875rem' }}>
                  <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{skill.icon}</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {skill.name}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="skill-bar">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.04, ease: 'easeOut' }}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <p style={{
                  margin: '0.4rem 0 0',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'right',
                }}>
                  {skill.level}%
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
