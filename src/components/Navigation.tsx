import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) => {
      const id = link.href.replace('#', '');
      return document.getElementById(id);
    }).filter(Boolean);

    sections.forEach((section) => {
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (sections.includes(t.trigger as HTMLElement)) {
          t.kill();
        }
      });
    };
  }, []);

  useEffect(() => {
    if (!activeSection || !indicatorRef.current) return;
    const activeIndex = navLinks.findIndex((l) => l.href === `#${activeSection}`);
    const activeLink = linksRef.current[activeIndex];
    if (!activeLink) return;

    const navRect = navRef.current?.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    if (!navRect) return;

    gsap.to(indicatorRef.current, {
      x: linkRect.left - navRect.left + linkRect.width / 2 - 20,
      duration: 0.3,
      ease: 'power3.out',
    });
  }, [activeSection]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#050508]/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
        style={{ padding: '20px 32px' }}
      >
        {/* Logo - Left */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-3">
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid rgba(139, 92, 246, 0.15)',
              backdropFilter: 'blur(10px)',
              background: 'rgba(15, 23, 42, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="font-display font-bold text-sm text-pure-white">KJ</span>
          </div>
          <div>
            <div className="font-mono text-xs tracking-[0.08em] uppercase text-muted-silver">
              KAJAL JAIN
            </div>
          </div>
        </div>

        {/* Desktop Nav - Right */}
        <div className="hidden md:flex items-center justify-end gap-8 relative">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => { linksRef.current[i] = el; }}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`font-mono text-sm transition-all duration-200 ${
                activeSection === link.href.replace('#', '')
                  ? 'text-electric-violet'
                  : 'text-muted-silver hover:text-electric-violet'
              }`}
              style={{
                textShadow:
                  activeSection === link.href.replace('#', '')
                    ? '0 0 12px rgba(139, 92, 246, 0.4)'
                    : 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <div
            ref={indicatorRef}
            className="absolute -bottom-2 left-0 w-10 h-1 bg-electric-violet rounded-sm"
            style={{ opacity: activeSection ? 1 : 0, transition: 'opacity 0.3s' }}
          />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-pure-white transition-all duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-pure-white transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-pure-white transition-all duration-300 ${
              mobileOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: '#0A0E27', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-12">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-display font-bold text-2xl text-pure-white hover:text-electric-violet transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
