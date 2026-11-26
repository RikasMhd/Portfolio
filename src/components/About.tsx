import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Brain, Code2, Palette, Zap, Users, Target, School } from 'lucide-react';
import { about, education, personal } from '../data/portfolioData';
import Reveal from './ui/Reveal';

const iconMap: Record<string, React.ReactNode> = {
  Brain:         <Brain size={20} />,
  Code2:         <Code2 size={20} />,
  Palette:       <Palette size={20} />,
  Zap:           <Zap size={20} />,
  Users:         <Users size={20} />,
  Target:        <Target size={20} />,
  GraduationCap: <GraduationCap size={22} />,
  School:        <School size={22} />,
};

const About: React.FC = () => {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="orb orb-purple" style={{ width: 400, height: 400, top: 0, right: 0, opacity: 0.15 }} />

      <div className="container-max">
        {/* Header */}
        <Reveal>
          <p className="section-label">About Me</p>
          <h2 className="section-title">
            Crafting Digital Experiences<br />
            <span className="gradient-text">with Passion & Precision</span>
          </h2>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginTop: '3rem',
          alignItems: 'start',
        }}>
          {/* Bio */}
          <Reveal delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {about.bio.map((paragraph, i) => (
                <p key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.98rem' }}>
                  {paragraph}
                </p>
              ))}

              <div style={{
                padding: '1rem 1.25rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 12,
                borderLeft: '3px solid var(--accent)',
              }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                  📍 <strong style={{ color: 'var(--text-primary)' }}>{personal.location}</strong> · Available for freelance &amp; collaboration
                </p>
              </div>
            </div>
          </Reveal>

          {/* Strengths grid */}
          <Reveal delay={0.2}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Core Strengths
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
            }}>
              {about.strengths.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="glass-card"
                  style={{
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: 8,
                    background: 'rgba(99, 107, 47, 0.2)',
                    border: '1px solid var(--border-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                    flexShrink: 0,
                  }}>
                    {iconMap[s.icon]}
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Education Timeline */}
        <Reveal delay={0.1} style={{ marginTop: '5rem' }}>
          <p className="section-label" style={{ marginTop: '4rem' }}>Education</p>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '2.5rem', color: 'var(--text-primary)' }}>
            Academic Background
          </h3>
        </Reveal>

        <div style={{ position: 'relative', maxWidth: 700 }}>
          {/* Timeline vertical line */}
          <div style={{
            position: 'absolute',
            left: 20,
            top: 0, bottom: 0,
            width: 2,
            background: 'linear-gradient(180deg, var(--moss-deep), var(--accent), transparent)',
            borderRadius: 1,
          }} />

          {education.map((edu, i) => (
            <Reveal key={edu.id} delay={i * 0.15} direction="left">
              <motion.div
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex', gap: '1.5rem',
                  marginBottom: '2rem',
                  paddingLeft: '1rem',
                }}
              >
                {/* Dot */}
                <div style={{
                  width: 42, height: 42, flexShrink: 0,
                  borderRadius: '50%',
                  background: edu.current
                    ? 'linear-gradient(135deg, var(--moss-deep), var(--moss-dark))'
                    : 'var(--bg-card)',
                  border: '2px solid ' + (edu.current ? 'var(--border-accent)' : 'var(--border-card)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: edu.current ? 'var(--accent)' : 'var(--text-secondary)',
                  position: 'relative', zIndex: 1,
                  marginLeft: '-21px',
                }}>
                  {iconMap[edu.icon]}
                </div>

                {/* Content */}
                <div className="glass-card" style={{
                  flex: 1,
                  padding: '1.25rem 1.5rem',
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {edu.degree}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {edu.current && (
                        <span style={{
                          padding: '0.2rem 0.6rem',
                          background: 'rgba(99, 107, 47, 0.25)',
                          border: '1px solid var(--border-accent)',
                          borderRadius: 10,
                          fontSize: '0.7rem',
                          color: 'var(--accent)',
                          fontWeight: 600,
                        }}>
                          Current
                        </span>
                      )}
                      <span style={{
                        fontSize: '0.78rem',
                        color: 'var(--accent)',
                        fontFamily: 'var(--font-mono)',
                      }}>
                        {edu.period}
                      </span>
                    </div>
                  </div>
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
                    {edu.institution}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
