import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, MapPin, Send, CheckCircle, AlertCircle, Loader
} from 'lucide-react';
import { Github, Linkedin } from './ui/Icons';
import { personal, socialLinks } from '../data/portfolioData';
import Reveal from './ui/Reveal';

interface FormState { name: string; email: string; subject: string; message: string; }
type Status = 'idle' | 'loading' | 'success' | 'error';

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.name.trim())        errs.name = 'Name is required';
    if (!form.email.trim())       errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.subject.trim())     errs.subject = 'Subject is required';
    if (!form.message.trim())     errs.message = 'Message is required';
    else if (form.message.trim().length < 20) errs.message = 'Message must be at least 20 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    await new Promise(r => setTimeout(r, 1500));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name as keyof FormState]) setErrors(err => ({ ...err, [name]: undefined }));
  };

  const inputStyle = (hasError?: string) => ({
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'var(--bg-secondary)',
    border: `1px solid ${hasError ? '#ef4444' : 'var(--border-card)'}`,
    borderRadius: 12,
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  });

  const iconMap: Record<string, React.ReactNode> = {
    Github:   <Github size={18} />,
    Linkedin: <Linkedin size={18} />,
    Mail:     <Mail size={18} />,
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="orb orb-blue" style={{ width: 500, height: 500, top: 0, right: '-10%', opacity: 0.12 }} />
      <div className="orb orb-purple" style={{ width: 400, height: 400, bottom: 0, left: '-5%', opacity: 0.12 }} />

      <div className="container-max">
        <Reveal>
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title">
            Let's Build Something<br />
            <span className="gradient-text">Amazing Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind, a collaboration idea, or just want to say hi? I'd love to hear from you.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginTop: '3.5rem',
          alignItems: 'start',
        }}>
          {/* Left: Contact info */}
          <Reveal delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  Contact Information
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.92rem' }}>
                  I'm currently open to freelance projects, collaboration opportunities, and full-time roles. Let's connect!
                </p>
              </div>

              {/* Info items */}
              {[
                { icon: <Mail size={16} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                { icon: <MapPin size={16} />, label: 'Location', value: personal.location, href: null },
              ].map(item => (
                <div key={item.label} className="glass-card" style={{
                  display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
                  padding: '1rem 1.125rem',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 9,
                    background: 'rgba(99, 107, 47, 0.22)',
                    border: '1px solid var(--border-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.1rem', fontSize: '0.73rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  Find me on social media
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {socialLinks.map(link => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target={link.icon !== 'Mail' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: 44, height: 44, borderRadius: 11,
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-card)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-card)';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                      }}
                      aria-label={link.name}
                    >
                      {iconMap[link.icon]}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Contact form */}
          <Reveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
              }}
            >
              {/* Name + Email row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid">
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    style={inputStyle(errors.name)}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderColor = errors.name ? '#ef4444' : 'var(--border-card)')}
                  />
                  {errors.name && <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: '#ef4444' }}>{errors.name}</p>}
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange}
                    placeholder="john@email.com"
                    style={inputStyle(errors.email)}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderColor = errors.email ? '#ef4444' : 'var(--border-card)')}
                  />
                  {errors.email && <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: '#ef4444' }}>{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                  Subject *
                </label>
                <input
                  type="text" name="subject" value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration / Freelance / Say Hi"
                  style={inputStyle(errors.subject)}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = errors.subject ? '#ef4444' : 'var(--border-card)')}
                />
                {errors.subject && <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: '#ef4444' }}>{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                  Message *
                </label>
                <textarea
                  name="message" value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  rows={5}
                  style={{ ...inputStyle(errors.message), resize: 'vertical', minHeight: 120 }}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = errors.message ? '#ef4444' : 'var(--border-card)')}
                />
                {errors.message && <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: '#ef4444' }}>{errors.message}</p>}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status !== 'loading' ? { scale: 1.02, y: -1 } : {}}
                whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                className="btn-primary"
                style={{ justifyContent: 'center', opacity: status === 'loading' ? 0.8 : 1 }}
              >
                {status === 'loading' ? (
                  <><Loader size={16} style={{ animation: 'spin-slow 1s linear infinite' }} /> Sending...</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </motion.button>

              {/* Status messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      padding: '0.875rem 1rem',
                      background: 'rgba(34,197,94,0.1)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      borderRadius: 10,
                      color: '#22c55e', fontSize: '0.875rem',
                    }}
                  >
                    <CheckCircle size={16} />
                    Message sent! I'll get back to you soon.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      padding: '0.875rem 1rem',
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: 10,
                      color: '#ef4444', fontSize: '0.875rem',
                    }}
                  >
                    <AlertCircle size={16} />
                    Something went wrong. Please try again or email directly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) { .form-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default Contact;
