import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import SDGHeroCarousel from './components/SDGHeroCarousel';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import projects from './components/projects';
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

            <div className='bg-white  overflow-hidden relative'>
              {/* Top accent bar */}
              <div className='h-2 bg-gradient-to-r from-rose-600 via-yellow-400 to-green-500'></div>

              <div className='grid lg:grid-cols-12 gap-8 p-8 lg:p-12'>
                {/* President Image Section */}
                <div className='lg:col-span-4 flex flex-col items-center lg:items-start space-y-6'>
                  <div className='relative group'>
                    {/* Image container with modern effects */}
                    <div className='relative p-1 bg-gradient-to-br from-rose-500 via-yellow-400 to-green-500 rounded-2xl shadow-xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl'>
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
                    <div className='flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full border border-blue-200'>
                      <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-xs font-bold'>UN</span>
                      </div>
                      <span className='text-blue-700 text-sm font-semibold'>
                        SDG Partner
                      </span>
                    </div>
                    <div className='flex items-center space-x-2 bg-gradient-to-r from-green-50 to-green-100 px-4 py-2 rounded-full border border-green-200'>
                      <div className='w-6 h-6 bg-green-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-xs font-bold'>★</span>
                      </div>
                      <span className='text-green-700 text-sm font-semibold'>
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
                        <span className='font-semibold text-green-600'>
                          {' '}
                          pioneering technologies
                        </span>
                        , and cultivating a culture of
                        <span className='font-semibold text-blue-600'>
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
                        <span className='font-semibold text-purple-600'>
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
          <div ref={missionRef} className='relative py-16 lg:py-20'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-20 left-10 w-32 h-32 bg-primary-100 opacity-10 rounded-full'></div>
              <div className='absolute bottom-10 right-20 w-24 h-24 bg-secondary-100 opacity-15 rounded-full'></div>
              <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-primary-300 opacity-20 rounded-full'></div>
            </div>

            {/* Header Section */}
            <div className='text-center mb-16 relative z-10'>
              <div className='inline-flex items-center space-x-3 mb-6'>
                <h2 className='text-xl lg:text-2xl font-bold text-gray-800'>
                  Our
                  <span className='text-primary-500'> Mission</span>
                </h2>
              </div>
              <p className='text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
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
              <div className='text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                <div className='text-2xl lg:text-3xl font-bold text-primary-500 mb-2'>
                  100%
                </div>
                <div className='text-sm text-gray-600 font-medium'>
                  Programs with SDG Integration
                </div>
              </div>
              <div className='text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                <div className='text-2xl lg:text-3xl font-bold text-secondary-500 mb-2'>
                  25+
                </div>
                <div className='text-sm text-gray-600 font-medium'>
                  Research Projects
                </div>
              </div>
              <div className='text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                <div className='text-2xl lg:text-3xl font-bold text-primary-300 mb-2'>
                  50+
                </div>
                <div className='text-sm text-gray-600 font-medium'>
                  Community Partners
                </div>
              </div>
              <div className='text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
                <div className='text-2xl lg:text-3xl font-bold text-secondary-700 mb-2'>
                  2030
                </div>
                <div className='text-sm text-gray-600 font-medium'>
                  Carbon Neutral Goal
                </div>
              </div>
              <div className='text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow col-span-2 lg:col-span-1'>
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
                <h3 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-6'>
                  Our <span className='text-primary-500'>H.E.A.R.T.</span>{' '}
                  Values
                </h3>
                <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                  Five core pillars that drive our commitment to sustainable
                  development and educational excellence.
                </p>
              </div>

              {/* Sophisticated Three-Column Bento Grid Layout */}
              <div className='bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto auto-rows-fr'>
                {/* Hero Card - Holistic Education (Main feature, spans 2x2) */}
                <div
                  className={`bento-card bento-hero group relative bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-10 hover:shadow-xl transition-all duration-500 cursor-pointer lg:col-span-2 lg:row-span-2 min-h-[400px] overflow-hidden ${
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
                      <div className='flex flex-col items-end space-y-2'>
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
                        <h4 className='bento-title text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight'>
                          Holistic Education
                        </h4>
                        <p className='bento-subtitle text-sm font-semibold text-primary-600 mb-6 uppercase tracking-wider'>
                          H.E.A.R.T. Foundation
                        </p>
                      </div>

                      <p className='bento-description text-gray-700 leading-relaxed text-lg lg:text-xl font-medium'>
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
                        <div className='bento-stat-value text-5xl font-black text-primary-600'>
                          100%
                        </div>
                        <div className='text-right'>
                          <div className='bento-stat-label text-sm font-bold text-gray-600 uppercase tracking-wide'>
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
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-shimmer'></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tall Card - Excellence in Research */}
                <div
                  className={`bento-card group relative bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-8 hover:shadow-xl transition-all duration-500 cursor-pointer lg:row-span-2 min-h-[400px] overflow-hidden ${
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

                    <div className='flex-grow space-y-4'>
                      <div>
                        <h4 className='bento-title text-2xl font-bold text-gray-900 mb-2 tracking-tight'>
                          Excellence in Research
                        </h4>
                        <p className='bento-subtitle text-xs font-semibold text-secondary-600 mb-4 uppercase tracking-wider'>
                          Innovation & Discovery
                        </p>
                      </div>

                      <p className='bento-description text-gray-600 leading-relaxed text-sm'>
                        Pioneering research in sustainable technologies and
                        environmental solutions that address global challenges.
                      </p>

                      {expandedMissionCard === 2 && (
                        <div className='space-y-3 animate-fadeIn'>
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

                    <div className='mt-auto space-y-3'>
                      <div className='flex items-baseline space-x-2'>
                        <div className='bento-stat-value text-4xl font-black text-secondary-600'>
                          25+
                        </div>
                        <div className='bento-stat-label text-xs font-bold text-gray-500 uppercase'>
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

                {/* Compact Card - Authentic Community */}
                <div
                  className={`bento-card group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[180px] overflow-hidden ${
                    expandedMissionCard === 3
                      ? 'ring-2 ring-primary-300 shadow-2xl'
                      : ''
                  }`}
                  onClick={() =>
                    setExpandedMissionCard(expandedMissionCard === 3 ? null : 3)
                  }
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500'></div>

                  <div className='relative h-full flex flex-col'>
                    <div className='flex items-center justify-between mb-4'></div>

                    <div className='flex-grow'>
                      <h4 className='bento-title text-lg font-bold text-gray-900 mb-1'>
                        Authentic Community
                      </h4>
                      <p className='bento-subtitle text-xs font-semibold text-orange-600 mb-3 uppercase tracking-wide'>
                        Partnership
                      </p>
                      <p className='bento-description text-gray-600 text-sm leading-relaxed'>
                        Building meaningful partnerships with local and global
                        communities.
                      </p>
                    </div>

                    <div className='mt-4'>
                      <div className='flex items-baseline space-x-2'>
                        <div className='bento-stat-value text-2xl font-black text-orange-500'>
                          50+
                        </div>
                        <div className='bento-stat-label text-xs font-medium text-gray-500'>
                          Partners
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compact Card - Responsible Stewardship */}
                <div
                  className={`bento-card group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[180px] overflow-hidden ${
                    expandedMissionCard === 4
                      ? 'ring-2 ring-green-500 shadow-2xl'
                      : ''
                  }`}
                  onClick={() =>
                    setExpandedMissionCard(expandedMissionCard === 4 ? null : 4)
                  }
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500'></div>

                  <div className='relative h-full flex flex-col'>
                    <div className='flex items-center justify-between mb-4'></div>

                    <div className='flex-grow'>
                      <h4 className='bento-title text-lg font-bold text-gray-900 mb-1'>
                        Responsible Stewardship
                      </h4>
                      <p className='bento-subtitle text-xs font-semibold text-green-600 mb-3 uppercase tracking-wide'>
                        Leadership
                      </p>
                      <p className='bento-description text-gray-600 text-sm leading-relaxed'>
                        Leading by example in environmental stewardship and
                        sustainable operations.
                      </p>
                    </div>

                    <div className='mt-4'>
                      <div className='flex items-baseline space-x-2'>
                        <div className='bento-stat-value text-2xl font-black text-green-600'>
                          2030
                        </div>
                        <div className='bento-stat-label text-xs font-medium text-gray-500'>
                          Goal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wide Feature Card - Transformative Impact */}
                <div
                  className={`bento-card bento-wide group relative bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-8 hover:shadow-xl transition-all duration-500 cursor-pointer md:col-span-2 lg:col-span-2 min-h-[220px] overflow-hidden ${
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
                          <h4 className='bento-title text-2xl lg:text-3xl font-bold text-gray-900 mb-2 tracking-tight'>
                            Transformative Impact
                          </h4>
                          <p className='bento-subtitle text-sm font-semibold text-primary-900 mb-4 uppercase tracking-wider'>
                            Global Change
                          </p>
                        </div>

                        <p className='bento-description text-gray-700 leading-relaxed text-base lg:text-lg'>
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

                      <div className='lg:text-right lg:flex-shrink-0 space-y-3'>
                        <div className='bento-stat-value text-4xl lg:text-5xl font-black text-primary-900'>
                          5000+
                        </div>
                        <div className='bento-stat-label text-sm font-bold text-gray-600 uppercase tracking-wide'>
                          Students Impacted Annually
                        </div>
                        <div className='w-full lg:w-32 bg-gray-200 rounded-full h-3'>
                          <div
                            className='bg-gradient-to-r from-primary-900 to-primary-700 h-3 rounded-full transition-all duration-1000'
                            style={{ width: '80%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            {/* <div className='mb-16'>
              <div className='text-center mb-12'>
                <h3 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
                  Our Sustainability Journey
                </h3>
                <p className='text-lg text-gray-600'>
                  Key milestones in our commitment to the SDGs
                </p>
              </div>

              <div className='relative'>
               
                <div className='absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-500 rounded-full'></div>

                <div className='space-y-12'>
                  {[
                    {
                      year: '2020',
                      title: 'SDG Commitment',
                      description: 'Official commitment to UN 2030 Agenda',
                    },
                    {
                      year: '2022',
                      title: 'H.E.A.R.T. Integration',
                      description:
                        'Full curriculum integration with SDG principles',
                    },
                    {
                      year: '2024',
                      title: 'Carbon Neutral Plan',
                      description:
                        'Launch of comprehensive sustainability roadmap',
                    },
                    {
                      year: '2030',
                      title: 'SDG Achievement',
                      description:
                        'Target completion of all sustainable development goals',
                    },
                  ].map((milestone, index) => (
                    <div
                      key={index}
                      className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    >
                      <div
                        className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}
                      >
                        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-200'>
                          <div className='text-2xl font-bold text-primary-500 mb-2'>
                            {milestone.year}
                          </div>
                          <h4 className='text-xl font-semibold text-gray-800 mb-2'>
                            {milestone.title}
                          </h4>
                          <p className='text-gray-600'>
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                      <div className='relative w-8 h-8 bg-white border-4 border-primary-500 rounded-full flex-shrink-0 mx-4'>
                        <div className='absolute inset-1 bg-primary-500 rounded-full'></div>
                      </div>
                      <div className='w-full lg:w-5/12'></div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}

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
          <div className='relative py-16 lg:py-20'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-10 right-10 w-40 h-40 bg-primary-100 opacity-10 rounded-full animate-pulse'></div>
              <div className='absolute bottom-20 left-10 w-32 h-32 bg-secondary-100 opacity-15 rounded-full animate-bounce-slow'></div>
              <div className='absolute top-1/2 right-1/4 w-24 h-24 bg-primary-300 opacity-20 rounded-full animate-pulse delay-1000'></div>
            </div>

            {/* Header Section */}
            <div className='text-center mb-16 relative z-10 animate-slide-in-up'>
              <div className='inline-flex items-center space-x-3 mb-8'>
                <div className='w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg'>
                  <span className='text-white text-sm font-bold'>UN</span>
                </div>
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
                  <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
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
                  <div className='w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4'>
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
                  <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
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
                  <div className='flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200'>
                    <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                    <span className='text-sm font-medium text-blue-700'>
                      Click to explore
                    </span>
                  </div>
                  <div className='flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full border border-green-200'>
                    <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                    <span className='text-sm font-medium text-green-700'>
                      View initiatives
                    </span>
                  </div>
                  <div className='flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full border border-purple-200'>
                    <div className='w-3 h-3 bg-purple-500 rounded-full'></div>
                    <span className='text-sm font-medium text-purple-700'>
                      Track progress
                    </span>
                  </div>
                </div>
              </div>

              <SDGNavSwiper goals={goals} />
            </div>
          </div>
        </Section>
        <Section>
          <div className='sgd_content  box-shadow'>
            <div className='sgd_content--text--container'>
              <h3 className='sgd_heading'>
                Our programs for sustainable development
              </h3>
              <p className='text-lg md:text-xl font-light sgd_description'>
                We offer programs that promote sustainable development and
                contribute to the achievement of the SDGs. Our programs focus on
                education, research, and extension services.
              </p>
            </div>
            <Section>
              <div className='sgd__gallery'>
                {projects.slice(0, 8).map((project) => (
                  <img
                    key={project.id}
                    src={`${project.image}`}
                    alt={project.title}
                    className='sgd_gallery--image'
                  />
                ))}
              </div>
            </Section>
          </div>
        </Section>
        <Section id='sdgProjects'>
          <div className='sgd_content'>
            <div className='sgd_content--text--container'>
              <h3 className='sgd_heading'>MarSU Innovative Projects</h3>
              <div className='sgd__project--container'>
                {projects.map((project) => (
                  <div key={project.id} className='sgd_card'>
                    <Link to={project.link}>
                      <img
                        src={`${project.image}`}
                        alt={project.title}
                        className='sgd_card--image'
                      />

                      <h4 className='sgd_card--title'>{project.title}</h4>

                      <p className='sgd_card--description'>{project.desc}</p>
                      <div className='sgd_card--tags'>
                        {project.tags.map((tag) =>
                          tag.icons.map((icons, index) => (
                            <img
                              key={`${tag.id}-${index}`}
                              src={`sdg/${icons}`}
                              alt={tag.name}
                              className='sgd_card--tag'
                            />
                          ))
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
        <Section id='sdgPartnership'>
          <div className='sgd_content bg-muted '>
            <div className='sgd_content--text--container'>
              <h3 className='sgd_heading'>
                Get involved in our Sustainable Development Goals initiatives
              </h3>

              <p className='text-lg md:text-xl font-light sgd_description'>
                Join us in our commitment to the Sustainable Development Goals.
                Together, we can make a difference and build a sustainable
                future for all.
              </p>
              <Link to='mailto:president@marsu.edu.ph' className='btn_sgd'>
                Join us now
              </Link>
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
};

export default SGDPage;
