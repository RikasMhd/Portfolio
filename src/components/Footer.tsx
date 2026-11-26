import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './ui/Icons';
import { personal, socialLinks } from '../data/portfolioData';

const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Blog', 'Contact'];

const iconMap: Record<string, React.ReactNode> = {
  Github:   <Github size={17} />,
  Linkedin: <Linkedin size={17} />,
  Mail:     <Mail size={17} />,
};

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border-card)',
      padding: '3rem 1.5rem 2rem',
      position: 'relative',
    }}>
      <div className="container-max">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: 'linear-gradient(135deg, var(--moss-deep), var(--moss-dark))',
                border: '1px solid var(--border-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, color: 'var(--accent)', fontSize: '1rem',
              }}>
                R
              </div>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                Mohammed Rikas
              </span>
            </div>
            <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 260 }}>
              CS undergraduate building intelligent, beautiful digital experiences with AI and modern web tech.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              QUICK LINKS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navItems.map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '0.875rem', color: 'var(--text-secondary)',
                    textAlign: 'left', padding: 0,
                    transition: 'color 0.2s',
                    fontFamily: 'var(--font-sans)',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              CONNECT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socialLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.icon !== 'Mail' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    fontSize: '0.875rem', color: 'var(--text-secondary)',
                    textDecoration: 'none', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {iconMap[link.icon]}
                  {link.name === 'Email' ? personal.email : link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          borderTop: '1px solid var(--border-card)',
          paddingTop: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontSize: '0.82rem', color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            margin: 0,
          }}>
            © {new Date().getFullYear()} Mohammed Rikas. Built with{' '}
            <Heart size={13} style={{ color: '#ef4444' }} />{' '}
            using React, Vite & Framer Motion.
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.92 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.5rem 1rem',
              background: 'rgba(99, 107, 47, 0.22)',
              border: '1px solid var(--border-accent)',
              borderRadius: 10,
              cursor: 'pointer',
              fontSize: '0.78rem', fontWeight: 600,
              color: 'var(--accent)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <ArrowUp size={13} /> Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
