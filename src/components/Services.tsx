import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Brain, Palette, Smartphone, Zap, Eye } from 'lucide-react';
import { services } from '../data/portfolioData';
import Reveal from './ui/Reveal';

const iconMap: Record<string, React.ReactNode> = {
  Monitor:    <Monitor size={26} />,
  Brain:      <Brain size={26} />,
  Palette:    <Palette size={26} />,
  Smartphone: <Smartphone size={26} />,
  Zap:        <Zap size={26} />,
  Eye:        <Eye size={26} />,
};

const Services: React.FC = () => {
  return (
    <section id="services" className="section-padding" style={{ position: 'relative' }}>
      <div className="orb orb-blue" style={{ width: 500, height: 500, bottom: 0, right: '-5%', opacity: 0.12 }} />

      <div className="container-max">
        <Reveal>
          <p className="section-label">What I Do</p>
          <h2 className="section-title">
            Services I Offer<br />
            <span className="gradient-text">for Your Projects</span>
          </h2>
          <p className="section-subtitle">
            From concept to deployment, I deliver end-to-end solutions across AI, web development, and design.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                className="glass-card"
                style={{
                  padding: '2rem 1.75rem',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background gradient glow */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 'inherit',
                  background: 'var(--grad-card)',
                  pointerEvents: 'none',
                }} />

                {/* Icon */}
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: 'rgba(99, 107, 47, 0.22)',
                  border: '1px solid var(--border-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)',
                  marginBottom: '1.25rem',
                  position: 'relative',
                }}>
                  {iconMap[service.icon]}
                </div>

                <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', position: 'relative' }}>
                  {service.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75, position: 'relative' }}>
                  {service.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
