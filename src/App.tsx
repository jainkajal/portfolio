import { useState, useEffect, lazy, Suspense } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Stats from '@/sections/Stats';
import TechStack from '@/sections/TechStack';
import Experience from '@/sections/Experience';
import Education from '@/sections/Education';
import Projects from '@/sections/Projects';
import Research from '@/sections/Research';
import Certifications from '@/sections/Certifications';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

const CrystallineCore = lazy(() => import('@/components/CrystallineCore'));

function App() {
  const [loaded, setLoaded] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  // Fade out Three.js canvas after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      setHeroVisible(scrollY < heroHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <CustomCursor />
      <Navigation />

      {/* Three.js Background - only visible on hero */}
      {loaded && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            opacity: heroVisible ? 0.15 : 0,
            transition: 'opacity 1s ease',
            pointerEvents: 'none',
          }}
        >
          <Suspense fallback={null}>
            <CrystallineCore />
          </Suspense>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Stats />
        <TechStack />
        <Experience />
        <Education />
        <Projects />
        <Research />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
