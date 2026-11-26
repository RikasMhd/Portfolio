import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Download, ArrowDown, ChevronRight } from 'lucide-react';
import { Github, Linkedin } from './ui/Icons';
import { personal, socialLinks } from '../data/portfolioData';
import ParticleCanvas from './ui/ParticleCanvas';

const roles = personal.roles;

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    if (isPaused) {
      timerRef.current = setTimeout(() => {
        setIsPaused(false);
        setDeleting(true);
      }, 2000);
      return;
    }
    if (!deleting) {
      if (displayed.length < currentRole.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(currentRole.slice(0, displayed.length + 1));
        }, 60);
      } else {
        setIsPaused(true);
      }
    } else {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 35);
      } else {
        setDeleting(false);
        setRoleIndex(i => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [displayed, deleting, isPaused, roleIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const iconMap: Record<string, React.ReactNode> = {
    Github: <Github size={18} />,
    Linkedin: <Linkedin size={18} />,
    Mail: <Mail size={18} />,
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '6.5rem 1.5rem 3.5rem',
      }}
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Atmospheric glowing orbs */}
      <div className="orb orb-blue" style={{ width: 600, height: 600, top: '-20%', left: '-15%', opacity: 0.45 }} />
      <div className="orb orb-cyan" style={{ width: 500, height: 500, bottom: '-10%', right: '-10%', opacity: 0.35 }} />
      <div className="orb orb-purple" style={{ width: 400, height: 400, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.18 }} />

      {/* Grid background */}
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }} />

      <div className="container-max" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center',
        }}>
          {/* Left: Text & Information */}
          <div>
            {/* Greeting badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.4rem 1rem',
                background: 'rgba(99, 107, 47, 0.16)',
                border: '1px solid var(--border-accent)',
                borderRadius: 20,
                marginBottom: '1.5rem',
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>👋</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--accent)',
                fontWeight: 500,
              }}>
                Hello, I'm Mohammed Rikas
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                lineHeight: 1.12,
                marginBottom: '1rem',
                color: 'var(--text-primary)',
              }}
            >
              Building the{' '}
              <span className="gradient-text">Future</span>
              <br />with Code & AI
            </motion.h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: 600,
                color: 'var(--accent)',
                marginBottom: '1.5rem',
                display: 'flex', alignItems: 'center', gap: '0.25rem',
                fontFamily: 'var(--font-mono)',
                minHeight: '2rem',
              }}
            >
              <ChevronRight size={18} style={{ opacity: 0.7 }} />
              <span>{displayed}</span>
              <span className="typing-cursor" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                maxWidth: 480,
                lineHeight: 1.8,
                marginBottom: '2.5rem',
              }}
            >
              {personal.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('projects')}
                className="btn-primary"
              >
                <span>View Projects</span>
                <ChevronRight size={16} />
              </motion.button>

              <motion.a
                href={personal.cvUrl}
                download
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline"
              >
                <Download size={15} />
                <span>Download CV</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('contact')}
                className="btn-ghost"
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}
            >
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                find me on
              </span>
              {socialLinks.map(link => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.icon !== 'Mail' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 40, height: 40,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 10,
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  aria-label={link.name}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-card)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  {iconMap[link.icon]}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Profile Image (Prominent & Clean, No extra circles/badges) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 'clamp(320px, 34vw, 420px)',
                height: 'clamp(320px, 34vw, 420px)',
                borderRadius: '28px',
                padding: '6px',
                background: 'linear-gradient(135deg, var(--moss-deep), var(--accent), var(--border-card))',
                boxShadow: 'var(--shadow-hover)',
                position: 'relative',
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* Fallback monogram behind image */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '6rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  opacity: 0.5,
                  background: 'var(--bg-card)',
                  userSelect: 'none',
                }}>
                  R
                </div>

                {/* Actual Profile Image */}
                <img
                  src={personal.profileImage}
                  alt={personal.name}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{
            position: 'absolute',
            bottom: '-2.5rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '0.4rem', cursor: 'pointer',
          }}
          onClick={() => scrollTo('about')}
        >
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            SCROLL DOWN
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: 'var(--accent)' }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
