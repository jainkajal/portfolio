import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import QuantumTextReveal from '@/components/QuantumTextReveal';

gsap.registerPlugin(ScrollTrigger);

// Initialize EmailJS (Replace with your Public Key)
emailjs.init('GbxtSZwX0JGEG5Npy');

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !formRef.current) return;

    const fields = formRef.current.querySelectorAll('.form-field');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    tl.from(fields, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
    });

    return () => { tl.kill(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage(null);

    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_4rzxv99', // Your Service ID
        'template_3hmzn1f', // Your Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );

      setSubmitMessage({ type: 'success', text: '✓ Message sent! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to send. Please try again.';
      setSubmitMessage({ type: 'error', text: `✗ Error: ${errorMsg}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: '120px 0', borderTop: '1px solid rgba(139, 92, 246, 0.15)' }}
    >
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <div style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2 }}>
          <QuantumTextReveal
            text="Let's Build Something"
            className="font-display font-bold text-pure-white"
            delay={0.3}
          />
          <QuantumTextReveal
            text="Together"
            className="font-display font-bold text-pure-white"
            delay={0.5}
          />
        </div>

        {/* Seeking Badge */}
        <div className="font-mono text-sm text-electric-violet mt-4">
          Currently seeking: Software Engineer | Backend Engineer | Full Stack Developer | Mobile Engineer | Node.js Developer
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 max-w-[600px] mx-auto text-left space-y-6">
          <div className="form-field relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3.5 rounded-lg bg-[rgba(15,23,42,0.5)] border border-[rgba(139,92,246,0.15)] text-pure-white font-mono text-sm focus:border-electric-violet focus:shadow-glow-sm outline-none transition-all peer"
              placeholder=" "
              required
            />
            <label className="absolute left-4 top-3.5 font-mono text-xs text-muted-silver transition-all duration-200 pointer-events-none peer-focus:-translate-y-7 peer-focus:text-electric-violet peer-[:not(:placeholder-shown)]:-translate-y-7">
              Name
            </label>
          </div>

          <div className="form-field relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3.5 rounded-lg bg-[rgba(15,23,42,0.5)] border border-[rgba(139,92,246,0.15)] text-pure-white font-mono text-sm focus:border-electric-violet focus:shadow-glow-sm outline-none transition-all peer"
              placeholder=" "
              required
            />
            <label className="absolute left-4 top-3.5 font-mono text-xs text-muted-silver transition-all duration-200 pointer-events-none peer-focus:-translate-y-7 peer-focus:text-electric-violet peer-[:not(:placeholder-shown)]:-translate-y-7">
              Email
            </label>
          </div>

          <div className="form-field relative">
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3.5 rounded-lg bg-[rgba(15,23,42,0.5)] border border-[rgba(139,92,246,0.15)] text-pure-white font-mono text-sm focus:border-electric-violet focus:shadow-glow-sm outline-none transition-all peer resize-none"
              rows={5}
              placeholder=" "
              required
            />
            <label className="absolute left-4 top-3.5 font-mono text-xs text-muted-silver transition-all duration-200 pointer-events-none peer-focus:-translate-y-7 peer-focus:text-electric-violet peer-[:not(:placeholder-shown)]:-translate-y-7">
              Message
            </label>
          </div>

          <div className="form-field">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {submitMessage && (
            <div className={`p-3 rounded-lg text-sm font-mono ${
              submitMessage.type === 'success' 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {submitMessage.text}
            </div>
          )}
        </form>

        {/* Social Links */}
        <div className="mt-10 flex justify-center gap-6">
          {[
            { name: 'LinkedIn', href: 'https://www.linkedin.com/in/kajal-jain-software-engineer/' },
            { name: 'GitHub', href: 'https://github.com/jainkajal' },
            { name: 'Email', href: 'mailto:kjain5899@gmail.com' },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-lg glass-card flex items-center justify-center transition-all duration-200 group-hover:border-electric-violet group-hover:shadow-glow-sm">
                {social.name === 'LinkedIn' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-muted-silver group-hover:text-electric-violet transition-colors">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )}
                {social.name === 'GitHub' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-muted-silver group-hover:text-electric-violet transition-colors">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                )}
                {social.name === 'Email' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-silver group-hover:text-electric-violet transition-colors">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                )}
              </div>
              <span className="font-mono text-xs text-muted-silver group-hover:text-electric-violet transition-colors">
                {social.name}
              </span>
            </a>
          ))}
        </div>

        {/* Resume CTA */}
        <div className="mt-8">
          <button
            onClick={() => alert('Resume download coming soon!')}
            className="px-6 py-3 rounded-full border border-[rgba(139,92,246,0.15)] font-mono font-bold text-sm text-pure-white transition-all duration-200 hover:bg-electric-violet hover:border-electric-violet"
          >
            Download Resume ↓
          </button>
        </div>
      </div>
    </section>
  );
}
