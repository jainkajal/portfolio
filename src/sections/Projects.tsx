import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'RSKPay',
    description: 'Fintech mobile app for recharge & utility payments. Published on Google Play Store & Apple App Store.',
    image: '/portfolio/images/RSKPay.png',
    tech: ['React Native', 'Node.js', 'Spring Boot', 'PostgreSQL'],
    metrics: [
      { value: '100K+', label: 'Downloads' },
      { value: '4.3★', label: 'Rating (628+ reviews)' },
    ],
    link: 'https://www.rskpay.in',
  },
  {
    name: 'OnMarQ360',
    description: 'Enterprise HRMS SaaS platform with governance & operational management.',
    image: '/portfolio/images/OnMarQ360.png',
    tech: ['React.js', 'Java', 'MySQL', 'REST APIs'],
    metrics: [
      { value: '148K+', label: 'Lines of Code' },
      { value: '50+', label: 'Business Modules' },
      { value: '100+', label: 'Organizations' },
    ],
    link: 'https://www.onmarq360.com',
  },
  {
    name: 'PairPinnacle',
    description: 'AI-powered influencer marketplace connecting creators with brands.',
    image: '/portfolio/images/PairPinnacle.png',
    tech: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL'],
    metrics: [
      { value: '5.0★', label: 'Play Store Rating' },
      { value: 'Android & Web', label: 'Platforms' },
    ],
    link: 'https://www.pairpinnacle.com',
  },
];

const companies = [
  { name: 'RSK', full: 'RSK Online Services', link: 'https://rskonlineservices.com' },
  { name: 'PUGARCH', full: 'PugArch Technology', link: 'https://www.pugarch.in' },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      tl.from(
        card,
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        i * 0.2
      );
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ padding: '120px 0' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="label-style mb-4">FEATURED PROJECTS</div>
          <h2
            className="font-display font-bold text-pure-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Products I've Built
          </h2>
        </div>

        {/* Project Cards */}
        <div className="space-y-12">
          {projects.map((project, i) => (
            <div
              key={project.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="glass-card overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[45%_55%]">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center' }}
                    
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27]/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <h3 className="font-display font-bold text-2xl text-pure-white">
                    {project.name}
                  </h3>
                  <p className="font-mono text-sm text-muted-silver mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((t) => (
                      <span key={t} className="skill-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-6 mt-6">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="font-display font-bold text-xl text-ice-blue">
                          {m.value}
                        </div>
                        <div className="font-mono text-xs text-muted-silver">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-sm text-electric-violet inline-flex items-center gap-1 group mt-6"
                  >
                    Visit Website
                    <span className="transition-transform duration-200 group-hover:translate-x-2">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Logo Strip */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {companies.map((company) => (
            <a
              key={company.name}
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 rounded-lg transition-all duration-300 hover:border-electric-violet hover:shadow-glow-sm"
              style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(139, 92, 246, 0.15)',
                minWidth: '140px',
              }}
            >
              <span
                className="font-display font-bold text-sm"
                style={{ color: company.name === 'RSK' ? '#8B5CF6' : '#CBD5E1' }}
              >
                {company.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
