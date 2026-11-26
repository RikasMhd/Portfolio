import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag, ArrowRight, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/portfolioData';
import Reveal from './ui/Reveal';

const Blog: React.FC = () => {
  return (
    <section id="blog" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="orb orb-cyan" style={{ width: 400, height: 400, bottom: 0, left: 0, opacity: 0.1 }} />

      <div className="container-max">
        <Reveal>
          <p className="section-label">Blog & Articles</p>
          <h2 className="section-title">
            Thoughts & Insights<br />
            <span className="gradient-text">from the Trenches</span>
          </h2>
          <p className="section-subtitle">
            Deep dives into AI/ML, web development, and the technology shaping our world.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                className="glass-card"
                style={{
                  overflow: 'hidden',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Color header strip */}
                <div style={{
                  height: 4,
                  background: 'linear-gradient(90deg, var(--moss-deep), var(--accent))',
                }} />

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Category + Read time */}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      background: 'rgba(99, 107, 47, 0.22)',
                      color: 'var(--accent)',
                      border: '1px solid var(--border-accent)',
                      borderRadius: 8, fontSize: '0.72rem', fontWeight: 700,
                    }}>
                      {post.category}
                    </span>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '0.25rem',
                      fontSize: '0.75rem', color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                  <p style={{ margin: '0 0 1rem', fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {post.tags.map(tag => (
                      <span key={tag} style={{
                        display: 'flex', alignItems: 'center', gap: '0.2rem',
                        fontSize: '0.7rem', color: 'var(--text-muted)',
                      }}>
                        <Tag size={9} /> {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-card)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {post.date}
                    </span>
                    <button style={{
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '0.82rem', fontWeight: 600,
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-sans)',
                    }}>
                      Read More <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}

          {/* Coming Soon card */}
          <Reveal delay={0.3}>
            <motion.div
              whileHover={{ y: -6 }}
              className="glass-card"
              style={{
                border: '1px dashed var(--border-card)',
                padding: '2rem',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', gap: '1rem',
                minHeight: 240,
                cursor: 'default',
              }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 12,
                background: 'rgba(99, 107, 47, 0.2)',
                border: '1px solid var(--border-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)',
              }}>
                <BookOpen size={22} />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: 'var(--text-secondary)', margin: '0 0 0.25rem' }}>More articles coming soon</p>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0 }}>Stay tuned for new posts on AI, development and design</p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Blog;
