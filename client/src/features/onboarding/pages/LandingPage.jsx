import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation.jsx';
import { HeroSection } from '../components/Navigation.jsx';
import { FeaturesSection } from '../components/Navigation.jsx';
import { HowItWorks } from '../components/Navigation.jsx';
import { DashboardSection } from '../components/Navigation.jsx';
import { FooterSection } from '../components/Navigation.jsx';

function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          setVisibleSections((prev) => new Set([...prev, section.id]));
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Navigation isScrolled={isScrolled} />
      <HeroSection      isVisible={visibleSections.has('hero')}         />
      <FeaturesSection  isVisible={visibleSections.has('features')}     />
      <HowItWorks       isVisible={visibleSections.has('how-it-works')} />
      <DashboardSection isVisible={visibleSections.has('dashboard')}    />
      <FooterSection    isVisible={visibleSections.has('final-cta')}    />
    </div>
  );
}

export default LandingPage;