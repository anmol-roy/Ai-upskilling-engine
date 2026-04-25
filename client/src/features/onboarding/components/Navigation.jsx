import { ArrowRight, Sparkles, BarChart3, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Themecontext.jsx';
import '../../../index.css';

function Navigation({ isScrolled }) {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'nav-scrolled' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="relative">
                <Sparkles
                  className="w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ color: 'var(--accent)' }}
                />
              </div>
              <span
                className="text-xl sm:text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                AI Upskill
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#how-it-works"
                className="nav-link flex items-center gap-2 text-sm font-medium transition-all duration-300 group"
                onMouseEnter={() => setHoveredLink('how')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <BarChart3
                  className="w-4 h-4 transition-all duration-300"
                  style={{ color: hoveredLink === 'how' ? 'var(--accent)' : undefined }}
                />
                <span className="relative">
                  How it Works
                  <span
                    className="absolute -bottom-1 left-0 w-full h-0.5 transform origin-left transition-transform duration-300"
                    style={{
                      background: 'var(--accent)',
                      transform: hoveredLink === 'how' ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                </span>
              </a>

              {/* Theme toggle */}
              <button
                onClick={toggle}
                className="theme-toggle"
                aria-label="Toggle theme"
              >
                {theme === 'light'
                  ? <Moon className="w-4 h-4" />
                  : <Sun className="w-4 h-4" />
                }
              </button>

              {/* CTA */}
              <button
                onClick={() => navigate('/login')}
                className="group relative px-6 py-2.5 rounded-full overflow-hidden"
              >
                <div
                  className="absolute inset-0 animate-gradient-x"
                  style={{
                    background: 'linear-gradient(90deg, #1e3a8a, #2563eb, #1e3a8a)',
                    backgroundSize: '200% 100%',
                  }}
                />
                <span className="relative flex items-center gap-2 text-sm font-semibold text-white">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{ background: 'var(--bg-subtle)' }}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-5">
                  <span
                    className="absolute left-0 block w-5 h-0.5 transform transition-all duration-300"
                    style={{
                      background: 'var(--text-secondary)',
                      top: isMobileMenuOpen ? '8px' : '4px',
                      transform: isMobileMenuOpen ? 'rotate(45deg)' : 'none',
                    }}
                  />
                  <span
                    className="absolute left-0 block w-5 h-0.5 transition-all duration-300"
                    style={{
                      background: 'var(--text-secondary)',
                      top: '10px',
                      opacity: isMobileMenuOpen ? 0 : 1,
                    }}
                  />
                  <span
                    className="absolute left-0 block w-5 h-0.5 transform transition-all duration-300"
                    style={{
                      background: 'var(--text-secondary)',
                      top: isMobileMenuOpen ? '8px' : '16px',
                      transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'none',
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{ background: 'rgba(0,0,0,0.3)' }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`mobile-menu-panel absolute right-0 top-0 bottom-0 w-64 shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20 space-y-4">
            {[
              { href: '#features',    label: 'Features'     },
              { href: '#how-it-works',label: 'How it Works' },
            ].map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                className="mobile-menu-link block py-2 text-sm font-medium transition-colors duration-300"
                style={{ animation: isMobileMenuOpen ? `slideIn 0.4s ease-out ${idx * 0.08}s both` : 'none' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <button
              className="w-full mt-6 px-6 py-3 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)' }}
              onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { Navigation };


import {
  Brain, Target, TrendingUp, Map, Award, Clock,
  ChevronRight, Users, BookOpen,
  CheckCircle, AlertCircle
} from 'lucide-react';

function DashboardSection({ isVisible }) {
  return (
    <section
      id="dashboard"
      data-section
      className={`py-24 px-4 sm:px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 shadow-sm w-fit mx-auto"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Live Career Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Your Personal
            <span
              style={{
                background: 'linear-gradient(135deg, var(--accent), #1e40af)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {' '}Career Dashboard
            </span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Real-time insights, progress tracking, and personalized recommendations all in one place.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          {/* Header bar */}
          <div
            className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Career Intelligence Dashboard</h3>
              <span
                className="px-3 py-1 text-xs font-medium rounded-full hidden sm:inline"
                style={{ background: 'var(--green-subtle)', color: 'var(--green)' }}
              >
                Live
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm hidden sm:inline" style={{ color: 'var(--text-muted)' }}>Last updated: 2 min ago</span>
              <button
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-all"
                style={{ background: 'var(--accent)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
              >
                Refresh Data
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Top stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Profile Strength',  value: '85%',  icon: Award,    colorKey: 'accent',  change: '+12%' },
                { label: 'Market Value',       value: '$145k',icon: TrendingUp,colorKey: 'green',   change: '+8.3%' },
                { label: 'Role Matches',       value: '156',  icon: Target,   colorKey: 'purple',  change: '+23' },
                { label: 'Learning Progress',  value: '68%',  icon: BookOpen, colorKey: 'orange',  change: '+15%' },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                const bg = {
                  accent: 'var(--accent-subtle)',
                  green:  'var(--green-subtle)',
                  purple: 'var(--purple-subtle)',
                  orange: 'var(--orange-subtle)',
                }[stat.colorKey];
                const color = `var(--${stat.colorKey})`;
                return (
                  <div
                    key={idx}
                    className="rounded-xl p-4 transition-all hover:-translate-y-0.5"
                    style={{ background: 'var(--bg-subtle)', boxShadow: 'var(--shadow-sm)' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg" style={{ background: bg }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="text-xs font-medium" style={{ color: 'var(--green)' }}>{stat.change}</span>
                    </div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left col */}
              <div className="lg:col-span-2 space-y-6">
                {/* Skills Matrix */}
                <div
                  className="rounded-xl p-6"
                  style={{
                    background: 'var(--accent-subtle)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                      <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Skills Matrix</h4>
                    </div>
                    <button className="text-sm flex items-center gap-1 transition-colors" style={{ color: 'var(--accent)' }}>
                      View all <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { skill: 'Python',          level: 92, demand: 'High',      demandColor: 'accent' },
                      { skill: 'React',           level: 78, demand: 'High',      demandColor: 'accent' },
                      { skill: 'TypeScript',      level: 65, demand: 'Medium',    demandColor: 'muted'  },
                      { skill: 'Machine Learning',level: 45, demand: 'Very High', demandColor: 'green'  },
                      { skill: 'AWS',             level: 38, demand: 'High',      demandColor: 'accent' },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.skill}</span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                background: item.demandColor === 'green' ? 'var(--green-subtle)' : item.demandColor === 'muted' ? 'var(--bg-muted)' : 'var(--accent-subtle)',
                                color:      item.demandColor === 'green' ? 'var(--green)'        : item.demandColor === 'muted' ? 'var(--text-muted)': 'var(--accent)',
                              }}
                            >
                              {item.demand}
                            </span>
                          </div>
                          <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{item.level}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-muted)' }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${item.level}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Paths */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Map className="w-5 h-5" style={{ color: 'var(--purple)' }} />
                      <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Recommended Career Paths</h4>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ background: 'var(--purple-subtle)', color: 'var(--purple)' }}
                    >
                      AI-powered
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { role: 'Senior AI Engineer',          match: 94, salary: '$165k', growth: '+47%' },
                      { role: 'Machine Learning Specialist', match: 87, salary: '$152k', growth: '+52%' },
                      { role: 'Data Science Lead',           match: 82, salary: '$178k', growth: '+38%' },
                    ].map((job, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer"
                        style={{ background: 'var(--bg-subtle)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-muted)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-subtle)'}
                      >
                        <div>
                          <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{job.role}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{job.salary}</span>
                            <span className="text-xs font-medium" style={{ color: 'var(--green)' }}>{job.growth}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>{job.match}% match</span>
                          <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right col */}
              <div className="space-y-6">
                {/* Market Trends */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: 'var(--orange-subtle)', border: '1px solid var(--border)' }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5" style={{ color: 'var(--orange)' }} />
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Market Trends</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { skill: 'AI/ML',             trend: '+156%' },
                      { skill: 'Cloud Native',      trend: '+89%'  },
                      { skill: 'Data Engineering',  trend: '+67%'  },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.skill}</span>
                        <span className="text-sm font-bold" style={{ color: 'var(--green)' }}>{item.trend}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 flex items-center justify-between text-sm" style={{ borderTop: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Salary trend</span>
                    <span className="font-bold" style={{ color: 'var(--green)' }}>+12.5%</span>
                  </div>
                </div>

                {/* Roadmap */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5" style={{ color: 'var(--green)' }} />
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Current Roadmap</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { course: 'Advanced Machine Learning', progress: 65, due: '2 weeks' },
                      { course: 'System Design',             progress: 40, due: '1 month' },
                      { course: 'MLOps Fundamentals',        progress: 25, due: '3 weeks' },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span style={{ color: 'var(--text-secondary)' }}>{item.course}</span>
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.due}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-muted)' }}>
                          <div className="h-full rounded-full" style={{ width: `${item.progress}%`, background: 'var(--green)' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="w-full mt-4 text-sm flex items-center justify-center gap-1 py-2 transition-colors"
                    style={{ color: 'var(--accent)' }}
                  >
                    View full roadmap <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Next move */}
                <div
                  className="rounded-xl p-6 text-white"
                  style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)' }}
                >
                  <h4 className="font-semibold text-lg mb-2">Ready for your next move?</h4>
                  <p className="text-sm text-blue-100 mb-4">We've identified 8 new roles matching your updated profile.</p>
                  <button
                    className="w-full font-medium py-2 rounded-lg transition-all text-blue-700"
                    style={{ background: '#fff' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                  >
                    Review Matches
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: 'var(--green)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Profile complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" style={{ color: 'var(--amber)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>3 skill gaps identified</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>21 companies viewing your profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { DashboardSection };

import {      } from 'lucide-react';

const features = [
  {
    title: 'AI Skill Extraction',
    description: 'Advanced AI analyzes your resume, LinkedIn, and GitHub to map your complete skill profile.',
    icon: Brain,
    iconBg: 'var(--purple-subtle)',
    iconColor: 'var(--purple)',
    stats: [{ label: 'Skills Mapped', value: '45+' }, { label: 'Accuracy', value: '94%' }],
    highlight: 'Instant skill inventory',
    accentBar: 'var(--purple)',
  },
  {
    title: 'Career Fit Scoring',
    description: 'AI matches your profile against thousands of roles to find your best career paths.',
    icon: Target,
    iconBg: 'var(--accent-subtle)',
    iconColor: 'var(--accent)',
    stats: [{ label: 'Role Matches', value: '156' }, { label: 'Top Match', value: '92%' }],
    highlight: '87% average match rate',
    accentBar: 'var(--accent)',
  },
  {
    title: 'Market Intelligence',
    description: 'Real-time salary data, skill demand trends, and growth projections for your field.',
    icon: TrendingUp,
    iconBg: 'var(--orange-subtle)',
    iconColor: 'var(--orange)',
    stats: [{ label: 'Trending Skills', value: '23' }, { label: 'Market Growth', value: '+47%' }],
    highlight: 'Updated daily',
    accentBar: 'var(--orange)',
  },
  {
    title: 'Smart Roadmaps',
    description: 'Personalized learning paths with courses, projects, and milestones to reach your goals.',
    icon: Map,
    iconBg: 'var(--green-subtle)',
    iconColor: 'var(--green)',
    stats: [{ label: 'Learning Hours', value: '120+' }, { label: 'Time to Goal', value: '6mo' }],
    highlight: 'AI-optimized path',
    accentBar: 'var(--green)',
  },
];

function FeaturesSection({ isVisible }) {
  return (
    <section
      id="features"
      data-section
      className={`py-24 px-4 sm:px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge mb-6 mx-auto w-fit">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span>Powered by Advanced AI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Intelligence That
            <span
              style={{
                background: 'linear-gradient(135deg, var(--accent), #1e40af)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {' '}Accelerates Your Career
            </span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Four powerful engines working together to give you clarity, direction, and a proven path forward.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-xl)'; e.currentTarget.style.borderColor = 'var(--card-hover-border)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="p-3 rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ background: feature.iconBg }}
                    >
                      <Icon className="w-6 h-6" style={{ color: feature.iconColor }} />
                    </div>
                    <div className="flex gap-4">
                      {feature.stats.map((stat, i) => (
                        <div key={i} className="text-right">
                          <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>

                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: 'var(--bg-subtle)' }}
                  >
                    <Award className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{feature.highlight}</span>
                  </div>
                </div>

                {/* Bottom accent bar on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: feature.accentBar }}
                />
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { label: 'Skills Analyzed', value: '10K+', icon: Brain },
              { label: 'Career Paths',    value: '500+', icon: Target },
              { label: 'Data Points',     value: '1.2M', icon: BarChart3 },
              { label: 'Users Placed',    value: '15K+', icon: Users },
            ].map(({ label, value, icon: StatIcon }, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: 'var(--bg-subtle)' }}>
                  <StatIcon className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                </div>
                <div>
                  <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>Trusted by professionals</span>{' '}
            from Google, Microsoft, and 200+ leading companies
          </p>
        </div>
      </div>
    </section>
  );
}

export { FeaturesSection };

import {  Mail, Heart } from 'lucide-react';
import { FiGithub } from "react-icons/fi";
import { CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { Link } from 'react-router-dom';

function FooterSection({ isVisible }) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <>
      {/* Final CTA Section */}
      <section
        id="final-cta"
        data-section
        className={`py-24 px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ background: 'var(--bg-surface)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge mb-6 mx-auto w-fit">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span>Start Your Journey Today</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Ready to Accelerate
            <span
              style={{
                background: 'linear-gradient(135deg, var(--accent), #1e40af)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {' '}Your Career?
            </span>
          </h2>

          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Join 10,000+ professionals who've already discovered their ideal career path with AI-powered insights.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            {[
              { label: 'Active Users', value: '10K+' },
              { label: 'Avg. Salary Increase', value: '32%' },
              { label: 'Success Rate', value: '94%' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/login" className="btn-primary">
              Get Started Free
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <button className="btn-outline">View Pricing</button>
          </div>

          {/* <div className="mt-8 flex items-center justify-center gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span>✨ No credit card required</span>
            <span className="w-1 h-1 rounded-full" style={{ background: 'var(--text-muted)' }} />
            <span>⚡ Takes 2 minutes</span>
            <span className="w-1 h-1 rounded-full" style={{ background: 'var(--text-muted)' }} />
            <span>🎯 Cancel anytime</span>
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }} className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  AI Upskill
                </span>
              </div>
              <p className="text-sm mb-4 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
                Empowering professionals to navigate their careers with AI-powered intelligence and personalized roadmaps.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: CiTwitter, href: '#', label: 'Twitter' },
                  { icon: CiLinkedin, href: '#', label: 'LinkedIn' },
                  { icon: FiGithub, href: '#', label: 'GitHub' },
                  { icon: Mail, href: '#', label: 'Email' }
                ].map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      className="social-icon"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {['Product', 'Resources', 'Company', 'Legal'].map((section) => (
              <div key={section}>
                <h4 className="font-semibold mb-4 text-sm" style={{ color: 'var(--text-primary)' }}>{section}</h4>
                <ul className="space-y-3">
                  {(section === 'Product' ? ['Features', 'Pricing', 'How it Works', 'Dashboard'] :
                    section === 'Resources' ? ['Blog', 'Guides', 'Case Studies', 'API'] :
                    section === 'Company' ? ['About', 'Careers', 'Press', 'Contact'] :
                    ['Privacy', 'Terms', 'Security', 'Cookies']
                  ).map((item) => (
                    <li key={item}>
                      <a href="#" className="footer-link">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border)' }}>
            <form onSubmit={handleSubscribe} className="flex items-center gap-3">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button 
                  type="submit"
                  className="newsletter-btn"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <p className="text-sm flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
              © {currentYear} AI Upskill. Made with
              <Heart className="w-3 h-3 text-red-500 fill-current" />
              for career growth
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export { FooterSection };

import {      FileText } from 'lucide-react';

function HeroSection({ isVisible }) {
  return (
    <section
      id="hero"
      data-section
      className={`relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ background: 'var(--bg-surface)' }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, var(--accent) 2px, transparent 2px)',
          backgroundSize: '50px 50px',
        }}
      />
      {/* Top gradient wash */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(to bottom, var(--accent-subtle) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto pt-24 pb-16 w-full">

        {/* ── Split layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="flex flex-col">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 w-fit"
              style={{ background: 'var(--accent-subtle)', border: '1px solid var(--border)' }}
            >
              <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--accent-text)' }}>
                AI-Powered Career Intelligence
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Your AI Career
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--accent), #1e40af)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {' '}Co-Pilot
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed max-w-lg" style={{ color: 'var(--text-secondary)' }}>
              Discover your strongest skills, identify market gaps, and accelerate your career with intelligent AI-powered insights.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="btn-primary">
                Get Started Free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="btn-outline">View Demo</button>
            </div>

            {/* Stats strip */}
            <div
              className="mt-12 flex flex-wrap items-center gap-6 sm:gap-8 pt-8 hero-stats"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {[
                { value: '12,000+', label: 'Professionals' },
                { value: '421',     label: 'Jobs matched'  },
                { value: '94%',     label: 'Accuracy rate' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – Dashboard mockup */}
          <div className="relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.08) 0%, transparent 70%)' }}
            />

            <div
              className="card relative w-full max-w-sm sm:max-w-md"
              style={{ borderRadius: '1.5rem' }}
            >
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>Career Score</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    94 <span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>/ 100</span>
                  </p>
                </div>
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="var(--bg-muted)" strokeWidth="5" />
                  <circle
                    cx="32" cy="32" r="26" fill="none"
                    stroke="var(--accent)" strokeWidth="5"
                    strokeDasharray={`${(94/100)*2*Math.PI*26} ${2*Math.PI*26}`}
                    strokeLinecap="round" transform="rotate(-90 32 32)"
                  />
                  <text x="32" y="36" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">94%</text>
                </svg>
              </div>

              {/* Skill bars */}
              <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Top Skills</p>
                <div className="space-y-3">
                  {[
                    { label: 'Python',  pct: 95 },
                    { label: 'React',   pct: 82 },
                    { label: 'Node.js', pct: 74 },
                  ].map(({ label, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{pct}%</span>
                      </div>
                      <div className="skill-bar-track w-full h-1.5">
                        <div className="skill-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matches */}
              <div className="px-6 py-4">
                <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Top Matches</p>
                <div className="space-y-2">
                  {[
                    { role: 'AI Engineer',    match: '94%', growth: '+47%' },
                    { role: 'ML Engineer',    match: '87%', growth: '+32%' },
                    { role: 'Data Scientist', match: '81%', growth: '+28%' },
                  ].map(({ role, match, growth }) => (
                    <div
                      key={role}
                      className="flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors duration-150"
                      style={{ background: 'var(--bg-subtle)' }}
                      onMouseEnter={e => e.currentTarget.style.background='var(--accent-subtle)'}
                      onMouseLeave={e => e.currentTarget.style.background='var(--bg-subtle)'}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-subtle)' }}>
                          <Award className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                        </div>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold" style={{ color: 'var(--green)' }}>{growth}</span>
                        <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{match}</span>
                        <ChevronRight className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <div
                  className="flex items-center gap-2 p-3 rounded-md text-white text-sm font-semibold justify-center cursor-pointer transition-colors"
                  style={{ background: 'var(--accent)' }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--accent-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background='var(--accent)'}
                >
                  <Sparkles className="w-4 h-4" />
                  Analyse my resume
                </div>
              </div>

              {/* Floating badge top-right */}
              <div
                className="absolute -top-3 -right-3 text-white text-xs font-bold px-3 py-1.5 shadow-lg"
                style={{ background: 'var(--green)', borderRadius: '999px' }}
              >
                ✓ 421 jobs matched
              </div>

              {/* Floating badge bottom-left */}
              <div
                className="absolute -bottom-4 -left-4 px-4 py-2.5 flex items-center gap-2 shadow-xl"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '1rem' }}
              >
                <AlertCircle className="w-4 h-4" style={{ color: 'var(--amber)' }} />
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>4 skill gaps found</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>ML, Cloud, DevOps, Design</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="mt-24 sm:mt-28">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Your Skills Intelligence</h2>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Updated in real-time</span>
          </div>

          {/* Responsive bento */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Technical Skills */}
            <div
              className="card flex flex-col justify-between overflow-hidden md:col-span-5"
              style={{ borderRadius: '.75rem', borderLeft: '4px solid var(--accent)' }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Technical Skills</h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>12 identified · 85% match</p>
                  </div>
                  <div className="p-2 rounded-md" style={{ background: 'var(--accent-subtle)' }}>
                    <FileText className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Python',  pct: 95 },
                    { label: 'React',   pct: 82 },
                    { label: 'Node.js', pct: 74 },
                  ].map(({ label, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{pct}%</span>
                      </div>
                      <div className="skill-bar-track w-full h-1.5 mt-1">
                        <div className="skill-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 py-3" style={{ background: 'var(--accent-subtle)', borderTop: '1px solid var(--border)' }}>
                <span className="text-xs font-medium" style={{ color: 'var(--accent-text)' }}>View all 12 skills →</span>
              </div>
            </div>

            {/* Market Demand */}
            <div
              className="card relative overflow-hidden md:col-span-4"
              style={{ borderRadius: '.75rem' }}
            >
              <TrendingUp className="absolute -bottom-4 -right-4 opacity-[0.07]" style={{ width: 96, height: 96, color: 'var(--green)' }} />
              <div className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Market Demand</h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Trending roles · +156% growth</p>
                  </div>
                  <div className="p-2 rounded-md" style={{ background: 'var(--green-subtle)' }}>
                    <TrendingUp className="w-5 h-5" style={{ color: 'var(--green)' }} />
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { role: 'AI Engineer',    pct: '+47%', bar: 78 },
                    { role: 'Data Scientist', pct: '+32%', bar: 60 },
                    { role: 'ML Engineer',    pct: '+28%', bar: 52 },
                  ].map(({ role, pct, bar }) => (
                    <div key={role}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{role}</span>
                        <span className="text-xs font-medium" style={{ color: 'var(--green)' }}>{pct}</span>
                      </div>
                      <div className="w-full h-1 rounded-md" style={{ background: 'var(--bg-muted)' }}>
                        <div className="h-full rounded-md" style={{ width: `${bar}%`, background: 'var(--green)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Match */}
            <div className="card flex flex-col md:col-span-3" style={{ borderRadius: '.75rem' }}>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Career Match</h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Top 3 roles for you</p>
                  </div>
                  <div className="p-2 rounded-md" style={{ background: 'var(--purple-subtle)' }}>
                    <Award className="w-5 h-5" style={{ color: 'var(--purple)' }} />
                  </div>
                </div>
                <div className="flex justify-center py-2">
                  <div
                    className="flex items-center justify-center flex-col"
                    style={{ width: 80, height: 80, borderRadius: '50%', border: `3px solid var(--purple)`, background: 'var(--purple-subtle)' }}
                  >
                    <span className="text-2xl font-bold leading-none" style={{ color: 'var(--text-primary)' }}>94</span>
                    <span className="text-[10px] font-medium" style={{ color: 'var(--purple)' }}>% match</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { role: 'AI Specialist', pct: '94%' },
                    { role: 'ML Engineer',   pct: '87%' },
                  ].map(({ role, pct }) => (
                    <div key={role} className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{role}</span>
                      <span className="text-xs font-medium" style={{ color: 'var(--purple)' }}>{pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skill Gaps – full width */}
            <div className="card md:col-span-12" style={{ borderRadius: '.75rem' }}>
              <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="p-2 rounded-md" style={{ background: 'var(--amber-subtle)' }}>
                    <AlertCircle className="w-5 h-5" style={{ color: 'var(--amber)' }} />
                  </div>
                  <div>
                    <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Skill Gaps</h3>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>4 areas to improve</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-8 shrink-0" style={{ background: 'var(--border)' }} />
                <div className="flex flex-wrap gap-2 flex-1">
                  {[
                    { label: 'Machine Learning',   tag: 'Priority',     amber: true },
                    { label: 'Cloud Architecture', tag: 'Recommended',  amber: true },
                    { label: 'System Design',      tag: 'Nice to have', amber: false },
                    { label: 'DevOps',             tag: 'Nice to have', amber: false },
                  ].map(({ label, tag, amber }) => (
                    <div
                      key={label}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md"
                      style={{
                        background: amber ? 'var(--amber-subtle)' : 'var(--bg-subtle)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</span>
                      <span className="text-xs" style={{ color: amber ? 'var(--amber)' : 'var(--text-muted)' }}>{tag}</span>
                    </div>
                  ))}
                </div>
                <button className="shrink-0 text-sm font-medium whitespace-nowrap transition-colors" style={{ color: 'var(--amber)' }}>
                  View learning path →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Career Intelligence Summary ── */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Stat cards */}
          <div className="flex flex-col gap-4 md:col-span-4">
            {[
              { icon: <Users className="w-5 h-5" style={{ color: 'var(--accent)' }} />,   iconBg: 'var(--accent-subtle)',  value: '8.5',  label: 'Years Experience', sub: '+2.3 above market', subColor: 'var(--green)' },
              { icon: <TrendingUp className="w-5 h-5" style={{ color: 'var(--green)' }} />, iconBg: 'var(--green-subtle)',  value: '$145k', label: 'Market Value',    sub: 'Top 15% percentile', subColor: 'var(--green)' },
              { icon: <Clock className="w-5 h-5" style={{ color: 'var(--purple)' }} />,    iconBg: 'var(--purple-subtle)', value: '92%',  label: 'Growth Potential', sub: 'Next 12 months', subColor: 'var(--green)' },
            ].map(({ icon, iconBg, value, label, sub, subColor }) => (
              <div key={label} className="card flex items-center gap-4 p-5" style={{ borderRadius: '.5rem' }}>
                <div className="p-2 rounded-md shrink-0" style={{ background: iconBg }}>{icon}</div>
                <div>
                  <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{value}</span>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{label}</p>
                  <p className="text-xs mt-0.5" style={{ color: subColor }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary card */}
          <div className="card flex flex-col justify-between overflow-hidden md:col-span-5" style={{ borderRadius: '.75rem' }}>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Career Intelligence Summary</h3>
              <div className="flex items-center justify-around py-4 flex-wrap gap-4">
                {[
                  { label: 'Skills matched', pct: 85, color: 'var(--accent)' },
                  { label: 'Market fit',     pct: 92, color: 'var(--green)'  },
                  { label: 'Role readiness', pct: 78, color: 'var(--purple)' },
                ].map(({ label, pct, color }) => {
                  const r = 28, circ = 2 * Math.PI * r, dash = (pct / 100) * circ;
                  return (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <svg width="72" height="72" viewBox="0 0 72 72">
                        <circle cx="36" cy="36" r={r} fill="none" stroke="var(--bg-muted)" strokeWidth="5" />
                        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
                          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 36 36)" />
                        <text x="36" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">{pct}%</text>
                      </svg>
                      <span className="text-xs text-center leading-tight max-w-[60px]" style={{ color: 'var(--text-muted)' }}>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="px-6 py-4 flex flex-wrap items-center gap-2" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
              <Award className="w-5 h-5 shrink-0" style={{ color: 'var(--green)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Your skills match 421 high-paying jobs</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>48 roles need 1–2 more skills</span>
            </div>
          </div>

          {/* Next move card */}
          <div
            className="flex flex-col justify-between shadow-lg text-white md:col-span-3"
            style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', borderRadius: '1.25rem' }}
          >
            <div className="p-6 flex flex-col gap-4 flex-1">
              <h4 className="font-semibold text-lg mb-1">Your Next Move</h4>
              <p className="text-blue-100 text-sm">Based on your profile, we recommend focusing on AI/ML skills</p>
              <div className="flex flex-col gap-3 mt-auto">
                <button className="w-full text-sm px-4 py-2.5 rounded-md transition-colors text-left" style={{ background: 'rgba(255,255,255,.15)' }}>
                  📊 View Career Roadmap →
                </button>
                <button className="w-full text-sm px-4 py-2.5 rounded-md transition-colors text-left" style={{ background: 'rgba(255,255,255,.15)' }}>
                  🎯 Explore Recommended Roles
                </button>
              </div>
            </div>
            <div className="px-6 py-3" style={{ background: 'rgba(0,0,0,.2)', borderTop: '1px solid rgba(255,255,255,.1)', borderRadius: '0 0 1.25rem 1.25rem' }}>
              <span className="text-xs text-blue-200">Personalized for you · Updated daily</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export { HeroSection };
import { Upload, FileSearch, MapPin,    } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Connect Your Profile',
    description: 'Link your resume, LinkedIn, or GitHub. Our AI instantly analyzes your experience, skills, and career trajectory.',
    icon: Upload,
    iconBg: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    benefits: ['Resume parsing', 'LinkedIn integration', 'GitHub analysis'],
    time: 'Takes 2 minutes',
  },
  {
    number: '02',
    title: 'Get Your Intelligence Report',
    description: 'Receive a comprehensive breakdown of your skills, and personalized career recommendations.',
    icon: FileSearch,
    iconBg: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    benefits: ['Skill gap analysis', 'Salary benchmarks', 'Role matches'],
    time: 'Instant results',
  },
  {
    number: '03',
    title: 'Execute Your Roadmap',
    description: 'Follow your AI-generated learning path with curated courses, projects, and milestones.',
    icon: MapPin,
    iconBg: 'linear-gradient(135deg, #16a34a, #15803d)',
    benefits: ['Personalized curriculum', 'Progress tracking', 'Career coaching'],
    time: '6-month roadmap',
  },
];

function HowItWorks({ isVisible }) {
  return (
    <section
      id="how-it-works"
      data-section
      className={`py-24 px-4 sm:px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge mb-6 mx-auto w-fit">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span>Simple 3-Step Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            From Profile to
            <span
              style={{
                background: 'linear-gradient(135deg, var(--accent), #1e40af)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {' '}Career Clarity
            </span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Get from where you are to where you want to be in three intelligent steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line – desktop only */}
          <div className="hidden md:block absolute top-[88px] left-[18%] right-[18%] h-px" style={{ background: 'var(--border)' }}>
            <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full -translate-y-1/2" style={{ background: 'var(--accent)' }} />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-y-1/2 -translate-x-1/2" style={{ background: 'var(--accent)' }} />
            <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full -translate-y-1/2" style={{ background: 'var(--accent)' }} />
          </div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                <div
                  className="rounded-2xl p-6 sm:p-8 transition-all duration-300 group-hover:-translate-y-2"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-md)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-xl)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                >
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: step.iconBg }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: 'var(--bg-surface)',
                        border: '2px solid var(--accent)',
                        color: 'var(--accent)',
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{step.description}</p>

                  <div className="space-y-2">
                    {step.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 shrink-0" style={{ color: 'var(--green)' }} />
                        <span style={{ color: 'var(--text-secondary)' }}>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow to next step */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full items-center justify-center shadow-md"
                      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                    >
                      <ArrowRight className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}
                  >
                    {step.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div
            className="inline-flex flex-wrap items-center gap-4 px-6 py-3 rounded-full"
            style={{ background: 'var(--bg-subtle)' }}
          >
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>10,000+</span> professionals already accelerated their careers
            </span>
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              Start your journey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { label: 'Profiles Analyzed', value: '50K+' },
            { label: 'Roadmaps Created',  value: '25K+' },
            { label: 'Avg. Salary Increase', value: '32%' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { HowItWorks };