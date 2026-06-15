const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{ padding: '40px 0', borderTop: '1px solid rgba(139, 92, 246, 0.15)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="font-mono text-xs text-muted-silver order-3 md:order-1">
            Crafted with code & creativity | Building scalable solutions
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 order-1 md:order-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="font-mono text-xs text-muted-silver hover:text-electric-violet transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="font-mono text-xs text-muted-silver hover:text-electric-violet transition-colors order-2 md:order-3"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
