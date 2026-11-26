import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Trophy, Users, Cloud, Award, Briefcase } from 'lucide-react';
import { experience, certifications } from '../data/portfolioData';
import Reveal from './ui/Reveal';

const expIconMap: Record<string, React.ReactNode> = {
  FlaskConical: <FlaskConical size={18} />,
  Trophy:       <Trophy size={18} />,
  Users:        <Users size={18} />,
  Cloud:        <Cloud size={18} />,
  Award:        <Award size={18} />,
  Briefcase:    <Briefcase size={18} />,
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="section-padding" style={{ position: 'relative', background: 'var(--bg-secondary)' }}>
      <div className="orb orb-purple" style={{ width: 400, height: 400, top: '30%', right: 0, opacity: 0.12 }} />

      <div className="container-max">
        {/* Experience Header */}
        <Reveal>
          <p className="section-label">Experience</p>
          <h2 className="section-title">
            My Journey &<br />
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Hackathons, research projects, workshops, and real-world experience shaping my developer journey.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
          marginTop: '3rem',
        }}>
          {experience.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass-card"
                style={{ padding: '1.5rem', height: '100%' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(99, 107, 47, 0.22)',
                    border: '1px solid var(--border-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                  }}>
                    {expIconMap[exp.icon] || <Briefcase size={18} />}
                  </div>
                  <span style={{
                    padding: '0.2rem 0.6rem',
                    background: 'rgba(99, 107, 47, 0.18)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 8,
                    fontSize: '0.7rem', fontWeight: 700,
                    color: 'var(--accent)',
                    letterSpacing: '0.05em',
                  }}>
                    {exp.type.toUpperCase()}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {exp.title}
                </h3>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600 }}>
                  {exp.organization}
                </p>
                <p style={{
                  margin: '0 0 0.875rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {exp.period}
                </p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {exp.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ marginTop: '5rem' }}>
          <Reveal>
            <p className="section-label">Certifications</p>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Credentials & Learning
            </h3>
            <p className="section-subtitle">
              Continuous learning through online courses and professional certifications.
            </p>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginTop: '2.5rem',
          }}>
            {certifications.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    display: 'flex', flexDirection: 'column', gap: '0.75rem',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'rgba(99, 107, 47, 0.22)',
                    border: '1px solid var(--border-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>
                    🏅
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {cert.title}
                    </h4>
                    <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                      {cert.issuer}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {cert.date}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {cert.tags.map(tag => <span key={tag} className="tag" style={{ fontSize: '0.7rem' }}>{tag}</span>)}
                  </div>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent)',
                      textDecoration: 'none', marginTop: 'auto',
                    }}
                  >
                    <Award size={13} /> View Certificate
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
