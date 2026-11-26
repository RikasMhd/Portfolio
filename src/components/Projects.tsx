import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, X, CheckCircle, Zap } from 'lucide-react';
import { Github } from './ui/Icons';
import { projects } from '../data/portfolioData';
import Reveal from './ui/Reveal';

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
type Project = typeof projects[0];

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    whileHover={{ y: -6 }}
    transition={{ duration: 0.4 }}
    onClick={onClick}
    className="glass-card"
    style={{
      overflow: 'hidden',
      cursor: 'pointer',
    }}
  >
    {/* Project visual banner */}
    <div style={{
      height: 190,
      background: 'linear-gradient(135deg, rgba(99, 107, 47, 0.25), rgba(59, 66, 43, 0.4), rgba(181, 187, 160, 0.15))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-card)',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(99, 107, 47, 0.25) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(195, 209, 125, 0.15) 0%, transparent 60%)',
      }} />
      <div style={{
        fontSize: '3.5rem',
        position: 'relative', zIndex: 1,
      }}>
        {project.category === 'AI/ML' ? '🤖' : project.category === 'Mobile' ? '📱' : '💻'}
      </div>

      {/* Category badge */}
      <div style={{
        position: 'absolute', top: '0.75rem', right: '0.75rem',
        padding: '0.25rem 0.65rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-accent)',
        borderRadius: 8,
        fontSize: '0.72rem', fontWeight: 600,
        color: 'var(--accent)',
      }}>
        {project.category}
      </div>
    </div>

    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
        {project.title}
      </h3>
      <p style={{ margin: '0 0 1rem', fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
        {project.tags.slice(0, 4).map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
        {project.tags.length > 4 && (
          <span className="tag">+{project.tags.length - 4}</span>
        )}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.4rem 0.75rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-card)',
              borderRadius: 8,
              fontSize: '0.78rem', fontWeight: 600,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
          >
            <Github size={13} /> Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.4rem 0.75rem',
              background: 'rgba(99, 107, 47, 0.22)',
              border: '1px solid var(--border-accent)',
              borderRadius: 8,
              fontSize: '0.78rem', fontWeight: 600,
              color: 'var(--accent)',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <ExternalLink size={13} /> Demo
          </a>
        )}
        <button
          style={{
            marginLeft: 'auto',
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '0.8rem', fontWeight: 600,
            color: 'var(--accent)',
            padding: '0.4rem 0.5rem',
            fontFamily: 'var(--font-sans)',
          }}
        >
          Details <ArrowRight size={13} />
        </button>
      </div>
    </div>
  </motion.div>
);

// Project Detail Modal
const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 5000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    }}
  >
    <motion.div
      initial={{ scale: 0.9, y: 30 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 30 }}
      onClick={e => e.stopPropagation()}
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-card)',
        borderRadius: 20,
        maxWidth: 680,
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: 'var(--shadow-hover)',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'sticky', top: '1rem', float: 'right', margin: '1rem 1rem 0 0',
          width: 36, height: 36,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-secondary)',
          zIndex: 1,
        }}
      >
        <X size={16} />
      </button>

      {/* Banner */}
      <div style={{
        height: 200,
        background: 'linear-gradient(135deg, rgba(99, 107, 47, 0.35), rgba(59, 66, 43, 0.5))',
        borderRadius: '20px 20px 0 0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '4rem',
        borderBottom: '1px solid var(--border-card)',
      }}>
        {project.category === 'AI/ML' ? '🤖' : project.category === 'Mobile' ? '📱' : '💻'}
      </div>

      <div style={{ padding: '1.75rem 2rem 2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{
            padding: '0.2rem 0.65rem',
            background: 'rgba(99, 107, 47, 0.22)',
            border: '1px solid var(--border-accent)',
            borderRadius: 8, fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600,
          }}>{project.category}</span>
        </div>

        <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          {project.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          {project.longDescription}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.75rem' }}>
          {/* Features */}
          <div>
            <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <Zap size={15} style={{ color: 'var(--accent)' }} /> Key Features
            </h4>
            {project.features.map(f => (
              <div key={f} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                <CheckCircle size={14} style={{ color: 'var(--accent)', marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{f}</span>
              </div>
            ))}
          </div>
          {/* Challenges */}
          <div>
            <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              ⚡ Challenges Solved
            </h4>
            {project.challenges.map(c => (
              <div key={c} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.85rem', flexShrink: 0 }}>›</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textDecoration: 'none' }}>
              <Github size={15} /> View Code
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="orb orb-cyan" style={{ width: 400, height: 400, top: '10%', right: 0, opacity: 0.12 }} />

      <div className="container-max">
        <Reveal>
          <p className="section-label">Featured Work</p>
          <h2 className="section-title">
            Projects That Make<br />
            <span className="gradient-text-2">an Impact</span>
          </h2>
          <p className="section-subtitle">
            A selection of my most meaningful projects — from AI-powered systems to polished full-stack applications.
          </p>
        </Reveal>

        {/* Filter */}
        <Reveal delay={0.1}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2.5rem', marginBottom: '2.5rem' }}>
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: 20,
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border-card)',
                  background: activeCategory === cat ? 'rgba(99, 107, 47, 0.22)' : 'var(--bg-card)',
                  color: activeCategory === cat ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: '0.83rem', fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
