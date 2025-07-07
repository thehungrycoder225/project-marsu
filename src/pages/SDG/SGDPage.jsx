import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import SDGHeroCarousel from './components/SDGHeroCarousel';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import projects, {
  getHeroProject,
  getTallProject,
  getCompactProjects,
  getFeaturedByOrder,
  getProjectsWithMedia,
  getProjectsWithMetrics,
} from './components/projects';
import goals from './components/goals';
import SDGNavSwiper from './components/SDGNavSwiper';
import './sgd.css';

const SGDPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedMissionCard, setExpandedMissionCard] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const forewordRef = useRef(null);
  const missionRef = useRef(null);

  // Get featured projects dynamically
  const featuredProjects = getFeaturedByOrder();
  const heroProject = featuredProjects.hero || getHeroProject();
  const tallProject = featuredProjects.tall || getTallProject();
  const compactProjects =
    featuredProjects.compact.length > 0
      ? featuredProjects.compact
      : getCompactProjects();

  // Enhanced statistics for the enhanced projects
  const projectsWithMedia = getProjectsWithMedia();
  const projectsWithMetrics = getProjectsWithMetrics();
  const totalBeneficiaries = projects.reduce((total, project) => {
    const metrics = project.metrics?.quantitative || [];
    const beneficiaryMetrics = metrics.filter(
      (m) =>
        m.category === 'reach' ||
        m.category === 'capacity-building' ||
        m.category === 'education'
    );
    return (
      total +
      beneficiaryMetrics.reduce((sum, metric) => sum + (metric.value || 0), 0)
    );
  }, 0);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const currentForewordRef = forewordRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === currentForewordRef && entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (currentForewordRef) {
      observer.observe(currentForewordRef);
    }

    return () => {
      if (currentForewordRef) {
        observer.unobserve(currentForewordRef);
      }
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const testimonials = [
      {
        name: 'Maria Santos',
        role: 'Environmental Science Student',
        quote:
          "MarSU's commitment to sustainability has transformed how I view my role as a future environmental scientist.",
      },
      {
        name: 'Dr. Juan Cruz',
        role: 'Research Faculty',
        quote:
          'Our interdisciplinary approach to SDGs creates meaningful research opportunities that impact our community.',
      },
      {
        name: 'Ana Rodriguez',
        role: 'Community Partner',
        quote:
          "The university's extension programs have brought real sustainable solutions to our local communities.",
      },
    ];

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'Environmental Science Student',
      quote:
        "MarSU's commitment to sustainability has transformed how I view my role as a future environmental scientist.",
    },
    {
      name: 'Dr. Juan Cruz',
      role: 'Research Faculty',
      quote:
        'Our interdisciplinary approach to SDGs creates meaningful research opportunities that impact our community.',
    },
    {
      name: 'Ana Rodriguez',
      role: 'Community Partner',
      quote:
        "The university's extension programs have brought real sustainable solutions to our local communities.",
    },
  ];

  return (
    <>
      <SDGHeroCarousel />
      <div className='container mx-auto px-4 lg:px-8'>
        <Section id='sdgForeword'>
          <div
            ref={forewordRef}
            className={`relative overflow-hidden transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
          >
            {/* Background Decorative Elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-rose-100 to-yellow-100 rounded-full opacity-20 animate-pulse'></div>
              <div className='absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-full opacity-30 animate-bounce-slow'></div>
              <div className='absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-25 animate-pulse delay-500'></div>
            </div>

            <div className='overflow-hidden relative py-4 lg:py-8'>
              {/* Top accent bar */}
              <div className='h-2 bg-gradient-to-r from-rose-900 via-rose-500 to-amber-500'></div>

              <div className='grid lg:grid-cols-12 gap-8 p-8 lg:p-12'>
                {/* President Image Section */}
                <div className='lg:col-span-4 flex flex-col items-center lg:items-start space-y-6'>
                  <div className='relative group'>
                    {/* Image container with modern effects */}
                    <div className='relative p-1 bg-gradient-to-br from-rose-900 via-rose-500 to-amber-500 rounded-2xl shadow-xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl'>
                      <img
                        src='avatar-pres.png'
                        alt='President Avatar'
                        className='w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-xl'
                      />
                      {/* Floating badge */}
                    </div>
                  </div>

                  {/* Verification badges */}
                  <div className='flex flex-wrap gap-3 justify-center lg:justify-start'>
                    <div className='flex items-center space-x-2 bg-gradient-to-r from-rose-50 to-rose-100 px-4 py-2 rounded-full border border-blue-200'>
                      <div className='w-6 h-6 bg-rose-900 rounded-full flex items-center justify-center'>
                        <span className='text-white text-xs font-bold'>UN</span>
                      </div>
                      <span className='text-rose-700 text-sm font-semibold'>
                        SDG Partner
                      </span>
                    </div>
                    <div className='flex items-center space-x-2 bg-gradient-to-r from-amber-50 to-amber-100 px-4 py-2 rounded-full border border-amber-200'>
                      <div className='w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-xs font-bold'>★</span>
                      </div>
                      <span className='text-amber-700 text-sm font-semibold'>
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className='lg:col-span-8 space-y-6'>
                  {/* Quote opening */}
                  <div className='relative'>
                    <div className='absolute -top-4 -left-4 text-6xl lg:text-8xl text-rose-200 font-serif leading-none'>
                      &ldquo;
                    </div>
                    <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 relative z-10 mb-6'>
                      A Commitment from the
                      <span className='bg-gradient-to-r from-rose-600 to-yellow-500 bg-clip-text text-transparent'>
                        {' '}
                        HEART
                      </span>
                    </h2>
                  </div>

                  {/* Quote content */}
                  <div className='space-y-4 text-gray-700 leading-relaxed'>
                    <p className='text-md lg:text-lg font-light relative'>
                      Guided by our commitment to the
                      <span className='relative inline-block px-2 py-1 mx-1 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded font-semibold text-gray-800'>
                        United Nations&apos; 2030 Sustainable Development Goals
                      </span>
                      , Marinduque State University envisions a future where
                      education, innovation and collaboration converge to create
                      a meaningful, lasting impact.
                    </p>

                    <div
                      className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-32 opacity-75'}`}
                    >
                      <p className='text-md lg:text-lg font-light'>
                        At the core of our mission lies a collective dedication
                        to advancing
                        <span className='font-semibold text-rose-600'>
                          {' '}
                          sustainable solutions
                        </span>
                        ,
                        <span className='font-semibold text-amber-600'>
                          {' '}
                          pioneering technologies
                        </span>
                        , and cultivating a culture of
                        <span className='font-semibold text-gray-600'>
                          {' '}
                          inclusivity and resilience
                        </span>
                        .
                      </p>

                      <p className='text-md lg:text-lg font-light'>
                        The journey toward these global goals demands an
                        unwavering collaboration across our entire academic
                        community. Faculty members, students, researchers, and
                        administrative staff all play vital roles in addressing
                        the world&apos;s most pressing challenges.
                      </p>

                      <p className='text-md lg:text-lg font-light'>
                        As we embark on this vital journey, we reaffirm our
                        commitment to fostering partnerships and encouraging
                        knowledge sharing that will strengthen our initiatives.
                        Through
                        <span className='font-semibold text-gray-600'>
                          {' '}
                          education, research, and community engagement
                        </span>
                        , Marinduque State University pledges to be at the
                        forefront of sustainable action.
                      </p>
                    </div>

                    {/* Read More/Less Button */}
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className='inline-flex items-center space-x-2 text-rose-600 hover:text-rose-700 font-semibold transition-colors duration-200 group'
                    >
                      <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} group-hover:translate-x-1`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Signature section */}
                  <div className='border-t border-gray-200 pt-6 mt-8'>
                    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0'>
                      <div>
                        <p className='text-xl font-semibold text-gray-800'>
                          Prof. Diosdado P. Zulueta, DPA
                        </p>
                        <p className='text-base text-gray-600 font-medium'>
                          University President
                        </p>
                        <p className='text-sm text-gray-500'>
                          Marinduque State University
                        </p>
                      </div>

                      {/* Quote closing */}
                      <div className='relative'>
                        <div className='text-4xl lg:text-6xl text-rose-200 font-serif leading-none'>
                          &rdquo;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
        <Section id='sdgMission'>
          <div ref={missionRef} className='relative py-4 lg:py-8'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-20 left-10 w-32 h-32 bg-primary-100 opacity-10 rounded-full'></div>
              <div className='absolute bottom-10 right-20 w-24 h-24 bg-secondary-100 opacity-15 rounded-full'></div>
              <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-primary-300 opacity-20 rounded-full'></div>
            </div>

            {/* Header Section */}
            <div className='text-center mb-16 relative z-10'>
              <div className='inline-flex items-center space-x-3 mb-6'>
                <h2 className='text-xl lg:text-2xl font-bold text-rose-800'>
                  Our
                  <span className='text-primary-500'> Mission</span>
                </h2>
              </div>
              <p className='text-md lg:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed'>
                To integrate sustainability into every aspect of our academic
                and operational practices, creating{' '}
                <span className='font-semibold text-primary-500'>
                  stewards of change
                </span>{' '}
                for a better world.
              </p>
            </div>

            {/* Mission Statistics Bar */}
            <div className='grid grid-cols-2 lg:grid-cols-5 gap-4 mb-16'>
              <div className='text-center py-6 rounded-lg  shadow-sm hover:shadow-md transition-shadow'>
                <div className='text-2xl lg:text-3xl font-bold text-primary-500 mb-2'>
                  100%
                </div>
                <div className='text-sm text-gray-600 font-medium'>
                  Programs with SDG Integration
                </div>
              </div>
              <div className='text-center py-6 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
                <div className='text-2xl lg:text-3xl font-bold text-secondary-500 mb-2'>
                  25+
                </div>
                <div className='text-sm text-gray-600 font-medium'>
                  Research Projects
                </div>
              </div>
              <div className='text-center py-6 rounded-lg  shadow-sm hover:shadow-md transition-shadow'>
                <div className='text-2xl lg:text-3xl font-bold text-primary-300 mb-2'>
                  50+
                </div>
                <div className='text-sm text-gray-600 font-medium'>
                  Community Partners
                </div>
              </div>
              <div className='text-center py-6 rounded-lg  shadow-sm hover:shadow-md transition-shadow'>
                <div className='text-2xl lg:text-3xl font-bold text-secondary-700 mb-2'>
                  2030
                </div>
                <div className='text-sm text-gray-600 font-medium'>
                  Carbon Neutral Goal
                </div>
              </div>
              <div className='text-center py-6 rounded-lg  shadow-sm hover:shadow-md transition-shadow col-span-2 lg:col-span-1'>
                <div className='text-2xl lg:text-3xl font-bold text-primary-900 mb-2'>
                  5K+
                </div>
                <div className='text-sm text-gray-600 font-medium'>
                  Students Impacted
                </div>
              </div>
            </div>

            {/* H.E.A.R.T. Mission Focus Areas - Bento Style */}
            <div className='mb-16'>
              <div className='text-center mb-16'>
                <h3 className='text-md lg:text-xl font-bold text-gray-800 mb-6'>
                  Our <span className='text-primary-500'>H.E.A.R.T.</span>{' '}
                  Values
                </h3>
                <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                  Five core pillars that drive our commitment to sustainable
                  development and educational excellence.
                </p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 max-w-7xl mx-auto'>
                <div
                  className={`group relative rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-10 hover:shadow-xl transition-all duration-500 cursor-pointer lg:col-span-2 min-h-[400px] overflow-hidden bg-white hover:-translate-y-1 transform-gpu ${
                    expandedMissionCard === 1
                      ? 'ring-2 ring-primary-500 shadow-2xl scale-[1.02]'
                      : ''
                  }`}
                  onClick={() =>
                    setExpandedMissionCard(expandedMissionCard === 1 ? null : 1)
                  }
                >
                  {/* Background gradient overlay */}
                  <div className='absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500'></div>

                  <div className='relative h-full flex flex-col'>
                    <div className='flex items-start justify-between mb-8'>
                      <div className='flex flex-col items-center space-y-2'>
                        <button className='text-gray-400 hover:text-primary-600 transition-colors p-2 hover:bg-primary-50 rounded-lg'>
                          <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d={
                                expandedMissionCard === 1
                                  ? 'M6 18L18 6M6 6l12 12'
                                  : 'M12 6v6m0 0v6m0-6h6m-6 0H6'
                              }
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className='flex-grow space-y-6'>
                      <div>
                        <h4 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight'>
                          Holistic Education
                        </h4>
                        <p className='text-sm font-semibold text-primary-600 mb-6 uppercase tracking-wider'>
                          H.E.A.R.T. Foundation
                        </p>
                      </div>

                      <p className='text-gray-700 leading-relaxed text-lg lg:text-xl font-medium'>
                        Integrating sustainability into every aspect of our
                        curriculum, ensuring graduates become stewards of our
                        natural resources and champions of sustainable
                        development.
                      </p>

                      {expandedMissionCard === 1 && (
                        <div className='space-y-4 animate-fadeIn'>
                          <div className='grid grid-cols-2 gap-4'>
                            <div className='bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-primary-100'>
                              <div className='text-2xl font-bold text-primary-600 mb-1'>
                                15+
                              </div>
                              <div className='text-sm text-gray-600'>
                                Academic Programs
                              </div>
                            </div>
                            <div className='bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-primary-100'>
                              <div className='text-2xl font-bold text-primary-600 mb-1'>
                                50+
                              </div>
                              <div className='text-sm text-gray-600'>
                                Expert Faculty
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='mt-8 space-y-4'>
                      <div className='flex items-center justify-between'>
                        <div className='text-2xl font-black text-primary-600'>
                          100%
                        </div>
                        <div className='text-right'>
                          <div className='text-sm font-bold text-gray-600 uppercase tracking-wide'>
                            SDG Integration
                          </div>
                          <div className='text-xs text-gray-500 mt-1'>
                            Across all programs
                          </div>
                        </div>
                      </div>
                      <div className='relative'>
                        <div className='w-full bg-gray-200 rounded-full h-3'>
                          <div
                            className='bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-1000 ease-out'
                            style={{ width: '100%' }}
                          ></div>
                        </div>
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse'></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tall Card - Excellence in Research */}
                <div
                  className={`group relative rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-8 hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[400px] overflow-hidden bg-white hover:-translate-y-1 transform-gpu ${
                    expandedMissionCard === 2
                      ? 'ring-2 ring-secondary-500 shadow-2xl'
                      : ''
                  }`}
                  onClick={() =>
                    setExpandedMissionCard(expandedMissionCard === 2 ? null : 2)
                  }
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-secondary-50 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500'></div>

                  <div className='relative h-full flex flex-col'>
                    <div className='flex items-start justify-between mb-6'>
                      <button className='text-gray-400 hover:text-secondary-600 transition-colors p-2 hover:bg-secondary-50 rounded-lg'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d={
                              expandedMissionCard === 2
                                ? 'M6 18L18 6M6 6l12 12'
                                : 'M12 6v6m0 0v6m0-6h6m-6 0H6'
                            }
                          />
                        </svg>
                      </button>
                    </div>

                    <div className='flex-grow space-y-8'>
                      <div>
                        <h4 className='text-2xl font-bold text-gray-900 mb-2 tracking-tight'>
                          Excellence in Research
                        </h4>
                        <p className='text-xs font-semibold text-secondary-600 mb-4 uppercase tracking-wider'>
                          Innovation & Discovery
                        </p>
                      </div>

                      <p className='text-gray-600 leading-relaxed text-sm'>
                        Pioneering research in sustainable technologies and
                        environmental solutions that address global challenges.
                      </p>

                      {expandedMissionCard === 2 && (
                        <div className='space-y-4 animate-fadeIn'>
                          {[
                            'Climate Change Adaptation',
                            'Renewable Energy Systems',
                            'Marine Conservation',
                          ].map((item, index) => (
                            <div
                              key={index}
                              className='flex items-center text-sm text-gray-600 bg-white/60 rounded-lg p-3 border border-secondary-100'
                            >
                              <div className='w-3 h-3 bg-secondary-500 rounded-full mr-3 animate-pulse'></div>
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className='mt-4 space-y-4'>
                      <div className='flex items-baseline space-x-2'>
                        <div className='text-4xl font-black text-secondary-600'>
                          25+
                        </div>
                        <div className='text-xs font-bold text-gray-500 uppercase'>
                          Projects
                        </div>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full transition-all duration-1000'
                          style={{ width: '75%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compact Card Group 2fr */}
                <div className='flex flex-col gap-4 md:col-span-2 lg:col-span-1'>
                  {/* Compact Card - Authentic Community */}
                  <div
                    className={`group relative rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[220px] overflow-hidden bg-white hover:-translate-y-1 transform-gpu ${
                      expandedMissionCard === 3
                        ? 'ring-2 ring-primary-300 shadow-2xl'
                        : ''
                    }`}
                    onClick={() =>
                      setExpandedMissionCard(
                        expandedMissionCard === 3 ? null : 3
                      )
                    }
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-rose-50 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500'></div>

                    <div className='relative h-full flex flex-col'>
                      <div className='flex items-center justify-between mb-4'></div>

                      <div className='flex-grow'>
                        <h4 className='text-lg font-bold text-gray-900 mb-1'>
                          Authentic Community
                        </h4>
                        <p className='text-xs font-semibold text-rose-900 mb-3 uppercase tracking-wide'>
                          Partnership
                        </p>
                        <p className='text-gray-600 text-sm leading-relaxed'>
                          Building meaningful partnerships with local and global
                          communities.
                        </p>
                      </div>

                      <div className='mt-4'>
                        <div className='flex items-baseline space-x-2'>
                          <div className='text-2xl font-black text-rose-900'>
                            50+
                          </div>
                          <div className='text-xs font-medium text-gray-500'>
                            Partners
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Compact Card - Responsible Stewardship */}
                  <div
                    className={`group relative rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[180px] overflow-hidden bg-white hover:-translate-y-1 transform-gpu ${
                      expandedMissionCard === 4
                        ? 'ring-2 ring-amber-500 shadow-2xl'
                        : ''
                    }`}
                    onClick={() =>
                      setExpandedMissionCard(
                        expandedMissionCard === 4 ? null : 4
                      )
                    }
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500'></div>

                    <div className='relative h-full flex flex-col'>
                      <div className='flex items-center justify-between mb-4'></div>

                      <div className='flex-grow'>
                        <h4 className='text-lg font-bold text-gray-900 mb-1'>
                          Responsible Stewardship
                        </h4>
                        <p className='text-xs font-semibold text-amber-600 mb-3 uppercase tracking-wide'>
                          Leadership
                        </p>
                        <p className='text-gray-600 text-sm leading-relaxed'>
                          Leading by example in environmental stewardship and
                          sustainable operations.
                        </p>
                      </div>

                      <div className='mt-4'>
                        <div className='flex items-baseline space-x-2'>
                          <div className='text-2xl font-black text-amber-600'>
                            2030
                          </div>
                          <div className='text-xs font-medium text-gray-500'>
                            Goal
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wide Feature Card - Transformative Impact */}
                <div
                  className={`group relative rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-8 hover:shadow-xl transition-all duration-500 cursor-pointer md:col-span-2 lg:col-span-2 min-h-[220px] overflow-hidden bg-white hover:-translate-y-1 transform-gpu ${
                    expandedMissionCard === 5
                      ? 'ring-2 ring-primary-900 shadow-2xl'
                      : ''
                  }`}
                  onClick={() =>
                    setExpandedMissionCard(expandedMissionCard === 5 ? null : 5)
                  }
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-primary-900/5 to-primary-600/5 group-hover:from-primary-900/10 group-hover:to-primary-600/10 transition-all duration-500'></div>

                  <div className='relative h-full flex flex-col'>
                    <div className='flex items-start justify-between mb-6'>
                      <button className='text-gray-400 hover:text-primary-800 transition-colors p-2 hover:bg-primary-50 rounded-lg'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d={
                              expandedMissionCard === 5
                                ? 'M6 18L18 6M6 6l12 12'
                                : 'M12 6v6m0 0v6m0-6h6m-6 0H6'
                            }
                          />
                        </svg>
                      </button>
                    </div>

                    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between flex-grow space-y-6 lg:space-y-0'>
                      <div className='lg:flex-1 lg:pr-8 space-y-4'>
                        <div>
                          <h4 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-2 tracking-tight'>
                            Transformative Impact
                          </h4>
                          <p className='text-sm font-semibold text-primary-900 mb-4 uppercase tracking-wider'>
                            Global Change
                          </p>
                        </div>

                        <p className='text-gray-700 leading-relaxed text-base lg:text-lg'>
                          Creating lasting positive change that extends from
                          Marinduque to the global community through innovative
                          education and sustainable practices.
                        </p>

                        {expandedMissionCard === 5 && (
                          <div className='grid grid-cols-3 gap-4 animate-fadeIn'>
                            <div className='text-center p-3 bg-primary-50 rounded-lg border border-primary-100'>
                              <div className='text-xl font-bold text-primary-900'>
                                95%
                              </div>
                              <div className='text-xs text-gray-600'>
                                Graduate Employment
                              </div>
                            </div>
                            <div className='text-center p-3 bg-primary-50 rounded-lg border border-primary-100'>
                              <div className='text-xl font-bold text-primary-900'>
                                12
                              </div>
                              <div className='text-xs text-gray-600'>
                                Countries Reached
                              </div>
                            </div>
                            <div className='text-center p-3 bg-primary-50 rounded-lg border border-primary-100'>
                              <div className='text-xl font-bold text-primary-900'>
                                25+
                              </div>
                              <div className='text-xs text-gray-600'>
                                Awards Won
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className='bg-gray-50 rounded-lg p-8 lg:p-12'>
              <div className='text-center mb-8'>
                <h3 className='text-3xl font-bold text-gray-800 mb-4'>
                  Voices of Impact
                </h3>
                <p className='text-lg text-gray-600'>
                  Hear from our community about our mission in action
                </p>
              </div>

              <div className='relative max-w-4xl mx-auto'>
                <div className='text-center'>
                  <div className='text-6xl text-primary-300 mb-4'>&ldquo;</div>
                  <p className='text-xl lg:text-2xl text-gray-700 mb-6 leading-relaxed'>
                    {testimonials[currentTestimonial].quote}
                  </p>
                  <div>
                    <div className='font-semibold text-gray-800 text-lg'>
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className='text-gray-600'>
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>

                {/* Testimonial navigation dots */}
                <div className='flex justify-center space-x-2 mt-8'>
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        index === currentTestimonial
                          ? 'bg-primary-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            {/* <div className='text-center mt-16'>
              <div className='inline-flex flex-col lg:flex-row gap-4'>
                <button className='px-8 py-4 bg-primary-500 hover:bg-primary-900 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300'>
                  <span className='flex items-center space-x-2'>
                    <span>Explore Our Programs</span>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  </span>
                </button>
                <button className='px-8 py-4 border-2 border-primary-500 hover:border-primary-900 text-primary-500 hover:text-primary-900 font-semibold rounded-lg transition-all duration-300'>
                  Join Our Research
                </button>
              </div>
            </div> */}
          </div>
        </Section>
        <Section id='sdgGoals'>
          <div className='relative py-8 lg:py-12'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-10 right-10 w-40 h-40 bg-primary-100 opacity-10 rounded-full animate-pulse'></div>
              <div className='absolute bottom-20 left-10 w-32 h-32 bg-secondary-100 opacity-15 rounded-full animate-bounce-slow'></div>
              <div className='absolute top-1/2 right-1/4 w-24 h-24 bg-primary-300 opacity-20 rounded-full animate-pulse delay-1000'></div>
            </div>

            {/* Header Section */}
            <div className='text-center mb-16 relative z-10 animate-slide-in-up'>
              <div className='inline-flex items-center space-x-3 mb-8'>
                <h2 className='text-2xl lg:text-xl font-bold text-gray-800'>
                  Our commitment to the
                  <span className='text-primary-500'>
                    {' '}
                    Sustainable Development Goals
                  </span>
                </h2>
              </div>

              <p className='text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8'>
                We are committed to the{' '}
                <span className='font-semibold text-primary-500'>
                  17 Sustainable Development Goals (SDGs)
                </span>{' '}
                to end poverty, protect the planet, and ensure prosperity for
                all. We are dedicated to achieving these goals by{' '}
                <span className='font-bold text-primary-600'>2030</span>.
              </p>

              {/* Enhanced Goals Statistics */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12'>
                <div className='stats-card text-center p-4 bg-white rounded-2xl transition-all duration-300'>
                  <div className='w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-white text-2xl font-bold'>17</span>
                  </div>
                  <div className='text-xs font-bold text-gray-800 mb-2'>
                    Global Goals
                  </div>
                  <div className='text-xs text-gray-600 font-medium'>
                    Addressing world&apos;s challenges
                  </div>
                </div>

                <div className='stats-card text-center p-8 bg-white rounded-2xl transition-all duration-300'>
                  <div className='w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-white text-2xl font-bold'>7</span>
                  </div>
                  <div className='text-xs font-bold text-gray-800 mb-2'>
                    Years Left
                  </div>
                  <div className='text-xs text-gray-600 font-medium'>
                    Until 2030 deadline
                  </div>
                </div>

                <div className='stats-card text-center p-8 bg-white rounded-2xl transition-all duration-300'>
                  <div className='w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-white text-lg font-bold'>100%</span>
                  </div>
                  <div className='text-xs font-bold text-gray-800 mb-2'>
                    Our Commitment
                  </div>
                  <div className='text-sm text-gray-600 font-medium'>
                    Full integration across programs
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced SDG Goals Navigation */}
            <div className='relative animate-slide-in-up'>
              <div className='text-center mb-12'>
                <h3 className='text-2xl lg:text-3xl font-bold text-gray-800 mb-4'>
                  Explore the <span className='text-primary-500'>17 Goals</span>
                </h3>
                <p className='text-lg text-gray-600 max-w-3xl mx-auto mb-6'>
                  Each goal represents a critical area where MarSU is making a
                  tangible impact. Click on any goal to discover our specific
                  initiatives, progress, and commitment to creating positive
                  change.
                </p>

                {/* Interactive legend */}
                <div className='flex flex-wrap justify-center gap-4 mb-8'>
                  <div className='flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full border border-rose-200'>
                    <div className='w-3 h-3 bg-rose-900 rounded-full'></div>
                    <span className='text-sm font-medium text-rose-900'>
                      Click to explore
                    </span>
                  </div>
                  <div className='flex items-center space-x-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-200'>
                    <div className='w-3 h-3 bg-amber-500 rounded-full'></div>
                    <span className='text-sm font-medium text-amber-700'>
                      View initiatives
                    </span>
                  </div>
                </div>
              </div>

              <SDGNavSwiper goals={goals} />
            </div>
          </div>
        </Section>
        <Section id='sdgFeatured'>
          {/* Enhanced SDG Featured Section with Bento Layout */}
          <div className='relative py-8 lg:py-12'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full opacity-20 animate-pulse'></div>
              <div className='absolute bottom-10 right-20 w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-full opacity-15 animate-bounce-slow'></div>
              <div className='absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-25 animate-pulse delay-1000'></div>
            </div>

            {/* Header Section */}
            <div className='text-center mb-16 relative z-10'>
              <div className='inline-flex items-center space-x-3 mb-6'>
                <div className='w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.26 0-2.12-1.26-.707-2.707l5-5A2 2 0 009.5 10.172V5L8 4z'
                    />
                  </svg>
                </div>
                <h2 className='text-3xl lg:text-4xl font-bold text-gray-800'>
                  Our Programs for
                  <span className='text-primary-600'>
                    {' '}
                    Sustainable Development
                  </span>
                </h2>
              </div>

              <p className='text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8'>
                We offer comprehensive programs that promote sustainable
                development and contribute directly to achieving the SDGs. Our
                initiatives span
                <span className='font-semibold text-primary-600'>
                  {' '}
                  education
                </span>
                ,
                <span className='font-semibold text-secondary-600'>
                  {' '}
                  research
                </span>
                , and
                <span className='font-semibold text-rose-600'>
                  {' '}
                  extension services
                </span>
                .
              </p>

              {/* Enhanced Quick Stats */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12'>
                <div className='text-center p-4 rounded-xl shadow-sm border border-gray-100'>
                  <div className='text-2xl font-bold text-primary-600 mb-1'>
                    {projects.length}
                  </div>
                  <div className='text-xs text-gray-600 font-medium'>
                    Active Projects
                  </div>
                </div>
                <div className='text-center p-4 rounded-xl shadow-sm border border-gray-100'>
                  <div className='text-2xl font-bold text-secondary-600 mb-1'>
                    {projectsWithMetrics.length}
                  </div>
                  <div className='text-xs text-gray-600 font-medium'>
                    With Impact Data
                  </div>
                </div>
                <div className='text-center p-4 rounded-xl shadow-sm border border-gray-100'>
                  <div className='text-2xl font-bold text-rose-600 mb-1'>
                    {projectsWithMedia.length}
                  </div>
                  <div className='text-xs text-gray-600 font-medium'>
                    Rich Media Projects
                  </div>
                </div>
                <div className='text-center p-4 rounded-xl shadow-sm border border-gray-100'>
                  <div className='text-2xl font-bold text-amber-600 mb-1'>
                    {totalBeneficiaries > 1000
                      ? `${Math.round(totalBeneficiaries / 1000)}K+`
                      : totalBeneficiaries}
                  </div>
                  <div className='text-xs text-gray-600 font-medium'>
                    People Reached
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Grid Layout */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 max-w-7xl mx-auto'>
              {/* Hero Project Card - Takes 2 columns */}
              {[heroProject].filter(Boolean).map((project) => (
                <div
                  key={project.id}
                  className='group relative rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer md:col-span-2 min-h-[400px] hover:-translate-y-1 transform-gpu'
                >
                  {/* Project Image Background */}
                  <div className='absolute  inset-0'>
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-full object-cover  transition-transform duration-700 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500'></div>
                  </div>

                  {/* Content */}
                  <div className='relative z-10 h-full flex flex-col justify-end p-8'>
                    <div className='space-y-4'>
                      {/* Enhanced SDG Tags with additional indicators */}
                      <div className='flex flex-wrap gap-2 mb-4'>
                        {project.tags?.slice(0, 3).map((tag) =>
                          tag.icons?.slice(0, 2).map((icon, index) => (
                            <div
                              key={`${tag.id}-${index}`}
                              className='w-8 h-8 rounded-lg overflow-hidden border-2 border-white/30 backdrop-blur-sm'
                            >
                              <img
                                src={`sdg/${icon}`}
                                alt={tag.name}
                                className='w-full h-full object-cover'
                              />
                            </div>
                          ))
                        )}
                        {project.tags && project.tags.length > 3 && (
                          <div className='w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center'>
                            <span className='text-white text-xs font-bold'>
                              +{project.tags.length - 3}
                            </span>
                          </div>
                        )}

                        {/* Enhanced indicators */}
                        {project.media &&
                          Object.keys(project.media).some(
                            (key) => project.media[key]?.length > 0
                          ) && (
                            <div className='w-8 h-8 rounded-lg bg-blue-500/20 backdrop-blur-sm border-2 border-blue-300/30 flex items-center justify-center'>
                              <svg
                                className='w-4 h-4 text-blue-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                                />
                              </svg>
                            </div>
                          )}
                        {project.metrics &&
                          (project.metrics.quantitative?.length > 0 ||
                            project.metrics.qualitative?.length > 0) && (
                            <div className='w-8 h-8 rounded-lg bg-green-500/20 backdrop-blur-sm border-2 border-green-300/30 flex items-center justify-center'>
                              <svg
                                className='w-4 h-4 text-green-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                                />
                              </svg>
                            </div>
                          )}
                        {project.partnerships &&
                          project.partnerships.length > 0 && (
                            <div className='w-8 h-8 rounded-lg bg-purple-500/20 backdrop-blur-sm border-2 border-purple-300/30 flex items-center justify-center'>
                              <svg
                                className='w-4 h-4 text-purple-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                                />
                              </svg>
                            </div>
                          )}
                        {project.location &&
                          project.location.regions &&
                          project.location.regions.length > 0 && (
                            <div className='w-8 h-8 rounded-lg bg-orange-500/20 backdrop-blur-sm border-2 border-orange-300/30 flex items-center justify-center'>
                              <svg
                                className='w-4 h-4 text-orange-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                              </svg>
                            </div>
                          )}
                      </div>

                      <div>
                        <h3 className='text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden'>
                          {project.title}
                        </h3>
                        <p className='text-white/90 leading-relaxed text-base lg:text-lg [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden'>
                          {project.desc}
                        </p>

                        {/* Enhanced project metadata */}
                        {project.metrics?.quantitative &&
                          project.metrics.quantitative.length > 0 && (
                            <div className='mt-4 flex items-center space-x-4 text-white/80 text-sm'>
                              {project.metrics.quantitative
                                .slice(0, 2)
                                .map((metric, index) => (
                                  <div
                                    key={index}
                                    className='flex items-center space-x-1'
                                  >
                                    <span className='font-semibold text-white'>
                                      {metric.value.toLocaleString()}
                                    </span>
                                    <span>{metric.unit || metric.label}</span>
                                  </div>
                                ))}
                            </div>
                          )}

                        {/* Partnership information for hero cards */}
                        {project.partnerships &&
                          project.partnerships.length > 0 && (
                            <div className='mt-3 text-white/70 text-sm'>
                              <span className='font-medium'>
                                In partnership with:
                              </span>
                              <span className='ml-2'>
                                {project.partnerships
                                  .slice(0, 2)
                                  .map((p) => p.name)
                                  .join(', ')}
                                {project.partnerships.length > 2 &&
                                  ` +${project.partnerships.length - 2} more`}
                              </span>
                            </div>
                          )}
                      </div>

                      {/* Enhanced Action Area */}
                      <div className='flex items-center justify-between pt-4'>
                        <div className='flex items-center space-x-2 text-white/80 text-sm'>
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13 10V3L4 14h7v7l9-11h-7z'
                            />
                          </svg>
                          <span>Featured Project</span>
                          {project.date && (
                            <span className='text-white/60'>
                              • {project.date}
                            </span>
                          )}
                        </div>
                        <Link
                          to={project.link}
                          className='inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 group-hover:scale-105'
                        >
                          <span className='text-sm font-medium'>Explore</span>
                          <svg
                            className='w-4 h-4 transform group-hover:translate-x-1 transition-transform'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Tall Project Card */}
              {[tallProject].filter(Boolean).map((project) => (
                <div
                  key={project.id}
                  className='group relative rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[400px] hover:-translate-y-1 transform-gpu'
                >
                  {/* Project Image Background */}
                  <div className='absolute inset-0'>
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500'></div>
                  </div>

                  {/* Content */}
                  <div className='relative z-10 h-full flex flex-col justify-end p-6'>
                    <div className='space-y-4'>
                      {/* Enhanced SDG Tags */}
                      <div className='flex flex-wrap gap-2 mb-4'>
                        {project.tags?.slice(0, 3).map((tag) =>
                          tag.icons?.slice(0, 1).map((icon, index) => (
                            <div
                              key={`${tag.id}-${index}`}
                              className='w-7 h-7 rounded-lg overflow-hidden border-2 border-white/30 backdrop-blur-sm'
                            >
                              <img
                                src={`sdg/${icon}`}
                                alt={tag.name}
                                className='w-full h-full object-cover'
                              />
                            </div>
                          ))
                        )}
                        {project.tags && project.tags.length > 3 && (
                          <div className='w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center'>
                            <span className='text-white text-xs font-bold'>
                              +{project.tags.length - 3}
                            </span>
                          </div>
                        )}

                        {/* Enhanced indicators for tall cards */}
                        {project.media &&
                          Object.keys(project.media).some(
                            (key) => project.media[key]?.length > 0
                          ) && (
                            <div className='w-7 h-7 rounded-lg bg-blue-500/20 backdrop-blur-sm border-2 border-blue-300/30 flex items-center justify-center'>
                              <svg
                                className='w-3 h-3 text-blue-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                                />
                              </svg>
                            </div>
                          )}
                        {project.partnerships &&
                          project.partnerships.length > 0 && (
                            <div className='w-7 h-7 rounded-lg bg-purple-500/20 backdrop-blur-sm border-2 border-purple-300/30 flex items-center justify-center'>
                              <span className='text-purple-300 text-xs font-bold'>
                                {project.partnerships.length}
                              </span>
                            </div>
                          )}
                        {project.metrics &&
                          (project.metrics.quantitative?.length > 0 ||
                            project.metrics.qualitative?.length > 0) && (
                            <div className='w-7 h-7 rounded-lg bg-green-500/20 backdrop-blur-sm border-2 border-green-300/30 flex items-center justify-center'>
                              <svg
                                className='w-3 h-3 text-green-300'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' />
                              </svg>
                            </div>
                          )}
                      </div>

                      <div>
                        <h4 className='text-xl font-bold text-white leading-tight [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden'>
                          {project.title}
                        </h4>
                        <p className='text-white/90 text-sm leading-relaxed [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden mt-3'>
                          {project.desc}
                        </p>

                        {/* Key metric for tall cards */}
                        {project.metrics?.quantitative &&
                          project.metrics.quantitative.length > 0 && (
                            <div className='mt-3 text-white/80 text-sm'>
                              <span className='font-semibold text-white'>
                                {project.metrics.quantitative[0].value.toLocaleString()}
                              </span>
                              <span className='ml-1'>
                                {project.metrics.quantitative[0].unit ||
                                  project.metrics.quantitative[0].label}
                              </span>
                            </div>
                          )}

                        {/* Partnership count for tall cards */}
                        {project.partnerships &&
                          project.partnerships.length > 0 && (
                            <div className='mt-2 text-white/70 text-xs'>
                              <span>
                                {project.partnerships.length} partner
                                {project.partnerships.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                          )}
                      </div>

                      {/* Enhanced Action Area */}
                      <div className='flex items-center justify-between pt-4'>
                        <div className='flex items-center space-x-2 text-white/80 text-sm'>
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13 10V3L4 14h7v7l9-11h-7z'
                            />
                          </svg>
                          <span>Featured Project</span>
                        </div>
                        <Link
                          to={project.link}
                          className='inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 group-hover:scale-105'
                        >
                          <span className='text-sm font-medium'>
                            Learn More
                          </span>
                          <svg
                            className='w-4 h-4 transform group-hover:translate-x-1 transition-transform'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Compact Project Cards */}
              {compactProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group relative rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 transform-gpu ${
                    index === 1 ? 'md:col-span-2 lg:col-span-1' : ''
                  } ${index >= 4 ? 'min-h-[200px]' : 'min-h-[320px]'}`}
                >
                  {/* Project Image Background */}
                  <div className='absolute inset-0'>
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500'></div>
                  </div>

                  {/* Content */}
                  <div className='relative z-10 h-full flex flex-col justify-end p-6'>
                    <div className='space-y-3'>
                      {/* Enhanced SDG Tags with indicators */}
                      <div className='flex flex-wrap gap-2 mb-3'>
                        {project.tags?.slice(0, index >= 4 ? 2 : 3).map((tag) =>
                          tag.icons?.slice(0, 1).map((icon, iconIndex) => (
                            <div
                              key={`${tag.id}-${iconIndex}`}
                              className='w-6 h-6 rounded-lg overflow-hidden border-2 border-white/30 backdrop-blur-sm'
                            >
                              <img
                                src={`sdg/${icon}`}
                                alt={tag.name}
                                className='w-full h-full object-cover'
                              />
                            </div>
                          ))
                        )}
                        {project.tags &&
                          project.tags.length > (index >= 4 ? 2 : 3) && (
                            <div className='w-6 h-6 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center'>
                              <span className='text-white text-xs font-bold'>
                                +{project.tags.length - (index >= 4 ? 2 : 3)}
                              </span>
                            </div>
                          )}

                        {/* Compact enhancement indicators */}
                        {project.media &&
                          Object.keys(project.media).some(
                            (key) => project.media[key]?.length > 0
                          ) && (
                            <div className='w-6 h-6 rounded-lg bg-blue-500/20 backdrop-blur-sm border-2 border-blue-300/30 flex items-center justify-center'>
                              <svg
                                className='w-3 h-3 text-blue-300'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path d='M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z' />
                              </svg>
                            </div>
                          )}
                        {project.metrics &&
                          (project.metrics.quantitative?.length > 0 ||
                            project.metrics.qualitative?.length > 0) && (
                            <div className='w-6 h-6 rounded-lg bg-green-500/20 backdrop-blur-sm border-2 border-green-300/30 flex items-center justify-center'>
                              <svg
                                className='w-3 h-3 text-green-300'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' />
                              </svg>
                            </div>
                          )}
                        {project.partnerships &&
                          project.partnerships.length > 0 && (
                            <div className='w-6 h-6 rounded-lg bg-purple-500/20 backdrop-blur-sm border-2 border-purple-300/30 flex items-center justify-center'>
                              <span className='text-purple-300 text-xs font-bold'>
                                {project.partnerships.length}
                              </span>
                            </div>
                          )}
                      </div>

                      <div>
                        <h4
                          className={`font-bold text-white leading-tight [display:-webkit-box] [-webkit-box-orient:vertical] overflow-hidden ${index >= 4 ? 'text-sm [-webkit-line-clamp:2]' : 'text-lg [-webkit-line-clamp:2]'}`}
                        >
                          {project.title}
                        </h4>
                        {index < 4 && (
                          <p className='text-white/90 text-sm leading-relaxed [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden mt-2'>
                            {project.desc}
                          </p>
                        )}

                        {/* Compact metric display */}
                        {index < 4 &&
                          project.metrics?.quantitative &&
                          project.metrics.quantitative.length > 0 && (
                            <div className='text-white/80 text-xs mt-2'>
                              <span className='font-semibold'>
                                {project.metrics.quantitative[0].value.toLocaleString()}
                              </span>
                              <span className='ml-1'>
                                {project.metrics.quantitative[0].unit ||
                                  project.metrics.quantitative[0].label}
                              </span>
                            </div>
                          )}

                        {/* Media indicator for compact cards */}
                        {index < 4 &&
                          project.media &&
                          Object.keys(project.media).some(
                            (key) => project.media[key]?.length > 0
                          ) && (
                            <div className='text-white/70 text-xs mt-1'>
                              <span>Rich media content</span>
                            </div>
                          )}
                      </div>

                      {/* Enhanced Action Area */}
                      <div className='flex items-center justify-between pt-2'>
                        <div className='flex items-center space-x-1 text-white/80 text-xs'>
                          <svg
                            className='w-3 h-3'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13 10V3L4 14h7v7l9-11h-7z'
                            />
                          </svg>
                          <span>Project</span>
                          {project.date && index < 4 && (
                            <span className='text-white/60'>
                              • {project.date}
                            </span>
                          )}
                        </div>
                        <Link
                          to={project.link}
                          className='inline-flex items-center space-x-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-3 py-1 rounded-full transition-all duration-300 group-hover:scale-105'
                        >
                          <span className='text-xs font-medium'>View</span>
                          <svg
                            className='w-3 h-3 transform group-hover:translate-x-1 transition-transform'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            {/* <div className='text-center mt-16'>
              <Link
                to='#sdgProjects'
                className='inline-flex items-center space-x-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
              >
                <span>Explore All Projects</span>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </Link>
            </div> */}
          </div>
        </Section>
        <Section id='sdgProjects'>
          {/* Enhanced MarSU Innovative Projects Section with Bento Layout */}
          <div className='relative py-8 lg:py-12'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full opacity-20 animate-pulse'></div>
              <div className='absolute bottom-10 right-20 w-24 h-24 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full opacity-15 animate-pulse delay-1000'></div>
              <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-full opacity-25 animate-pulse delay-500'></div>
            </div>

            {/* Header Section */}
            <div className='text-center mb-16 relative z-10'>
              <div className='inline-flex items-center space-x-3 mb-6'>
                <h2 className='text-3xl lg:text-4xl font-bold text-gray-800'>
                  MarSU
                  <span className=''> Innovative Projects</span>
                </h2>
              </div>

              <p className='text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8'>
                Discover our groundbreaking initiatives that are making a real
                difference in our communities and beyond. Each project
                represents our commitment to
                <span className='font-semibold text-secondary-600'>
                  {' '}
                  innovation
                </span>
                ,
                <span className='font-semibold text-primary-600'>
                  {' '}
                  sustainability
                </span>
                , and
                <span className='font-semibold text-rose-600'>
                  {' '}
                  positive impact
                </span>
                .
              </p>

              {/* Project Stats */}
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12'>
                <div className='text-center p-4  rounded-xl border border-gray-100'>
                  <div className='text-2xl font-bold text-secondary-600 mb-1'>
                    {projects.length}
                  </div>
                  <div className='text-xs text-gray-600 font-medium'>
                    Total Projects
                  </div>
                </div>
                <div className='text-center p-4  rounded-xl border border-gray-100'>
                  <div className='text-2xl font-bold text-primary-600 mb-1'>
                    5+
                  </div>
                  <div className='text-xs text-gray-600 font-medium'>
                    Research Areas
                  </div>
                </div>
                <div className='text-center p-4  rounded-xl border border-gray-100 col-span-2 md:col-span-1'>
                  <div className='text-2xl font-bold text-rose-600 mb-1'>
                    100+
                  </div>
                  <div className='text-xs text-gray-600 font-medium'>
                    Lives Impacted
                  </div>
                </div>
              </div>
            </div>

            {/* Innovation Stats */}
            <div className='mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 lg:p-12'>
              <div className='text-center mb-8'>
                <h3 className='text-2xl font-bold text-gray-800 mb-4'>
                  Our Research Impact
                </h3>
                <p className='text-gray-600 max-w-2xl mx-auto'>
                  Measuring the tangible outcomes of our innovative projects and
                  research initiatives.
                </p>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-secondary-600 mb-2'>
                    25+
                  </div>
                  <div className='text-sm text-gray-600 font-medium'>
                    Publications
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-primary-600 mb-2'>
                    15
                  </div>
                  <div className='text-sm text-gray-600 font-medium'>
                    Awards
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-rose-600 mb-2'>
                    50+
                  </div>
                  <div className='text-sm text-gray-600 font-medium'>
                    Collaborations
                  </div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-amber-600 mb-2'>
                    1000+
                  </div>
                  <div className='text-sm text-gray-600 font-medium'>
                    Beneficiaries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
        <Section id='sdgPartnership'>
          {/* Enhanced Partnership Section */}
          <div className='relative py-8 lg:py-12'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full opacity-10 animate-pulse'></div>
              <div className='absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full opacity-15 animate-pulse delay-1000'></div>
            </div>

            <div className='relative z-10 max-w-6xl mx-auto'>
              {/* Header */}
              <div className='text-center mb-12'>
                <div className='inline-flex items-center space-x-3 mb-6'>
                  <div className='w-12 h-12 bg-gradient-to-br from-primary-500 to-rose-500 rounded-full flex items-center justify-center'>
                    <svg
                      className='w-6 h-6 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>
                  </div>
                  <h2 className='text-3xl lg:text-4xl font-bold text-gray-800'>
                    Join Our
                    <span className='text-[var(--primary-500)] font-semibold'>
                      {' '}
                      SDG Movement
                    </span>
                  </h2>
                </div>

                <p className='text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8'>
                  Get involved in our Sustainable Development Goals initiatives.
                  Together, we can make a difference and build a sustainable
                  future for all.
                  <span className='font-semibold text-primary-600'>
                    {' '}
                    Your contribution matters
                  </span>
                  .
                </p>
              </div>

              {/* Main Call to Action Card */}
              <div className='bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-3xl border border-gray-200 shadow-xl p-8 lg:p-12 mb-12 relative overflow-hidden'>
                {/* Background pattern */}
                <div className='absolute inset-0 opacity-5'>
                  <div className='absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl'></div>
                  <div className='absolute bottom-0 left-0 w-48 h-48 bg-secondary-500 rounded-full blur-2xl'></div>
                </div>

                <div className='relative z-10 grid lg:grid-cols-2 gap-8 items-center'>
                  <div className='space-y-6'>
                    <h3 className='text-2xl lg:text-3xl font-bold text-gray-800'>
                      Be Part of the Change
                    </h3>
                    <p className='text-gray-700 leading-relaxed text-lg'>
                      Whether you&apos;re a researcher, student, community
                      leader, or organization, there are multiple ways to
                      collaborate with us in achieving the SDGs. Together, we
                      can create lasting impact.
                    </p>

                    {/* Partnership Options */}
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-primary-100'>
                        <div className='text-primary-600 font-semibold text-sm mb-1'>
                          Research
                        </div>
                        <div className='text-xs text-gray-600'>
                          Collaborative studies
                        </div>
                      </div>
                      <div className='bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-secondary-100'>
                        <div className='text-secondary-600 font-semibold text-sm mb-1'>
                          Community
                        </div>
                        <div className='text-xs text-gray-600'>
                          Local partnerships
                        </div>
                      </div>
                      <div className='bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-rose-100'>
                        <div className='text-rose-600 font-semibold text-sm mb-1'>
                          Education
                        </div>
                        <div className='text-xs text-gray-600'>
                          Knowledge sharing
                        </div>
                      </div>
                      <div className='bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-amber-100'>
                        <div className='text-amber-600 font-semibold text-sm mb-1'>
                          Innovation
                        </div>
                        <div className='text-xs text-gray-600'>
                          Tech solutions
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='text-center lg:text-right'>
                    <Link
                      to='mailto:president@marsu.edu.ph'
                      className='inline-flex items-center space-x-3 bg-[var(--primary-500)]  hover:from-[var(--primary-600)] hover:to-[var(--secondary-600)] text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group'
                    >
                      <span>Join Us Now</span>
                      <svg
                        className='w-5 h-5 group-hover:translate-x-1 transition-transform'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                      </svg>
                    </Link>

                    <div className='mt-4 text-sm text-gray-600'>
                      <span>Connect with our SDG team</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div className='grid md:grid-cols-3 gap-6'>
                <div className='text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                  <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg
                      className='w-6 h-6 text-primary-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  <h4 className='font-semibold text-gray-800 mb-2'>Email Us</h4>
                  <p className='text-sm text-gray-600'>
                    Get in touch directly with our SDG coordination team
                  </p>
                </div>

                <div className='text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                  <div className='w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg
                      className='w-6 h-6 text-secondary-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  </div>
                  <h4 className='font-semibold text-gray-800 mb-2'>
                    Visit Campus
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Schedule a meeting at our Marinduque campus
                  </p>
                </div>

                <div className='text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                  <div className='w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg
                      className='w-6 h-6 text-rose-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                      />
                    </svg>
                  </div>
                  <h4 className='font-semibold text-gray-800 mb-2'>
                    Start a Conversation
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Discuss partnership opportunities and collaborations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
};

export default SGDPage;
