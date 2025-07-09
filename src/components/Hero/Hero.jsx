import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';

// Enhanced college-specific data with programs and social media
const collegeData = {
  cics: {
    label: 'Crypto Knights',
    headline:
      'Empowering Innovation at the College of Information and Computing Sciences',
    subheading:
      'Join us in advancing technology and research through cutting-edge programs in Computer Science, Information Technology, and Digital Innovation.',
    programs: [
      {
        title: 'Bachelor of Science in Computer Science',
        description:
          'Master programming, algorithms, and software development with industry-leading curriculum.',
        image: '/public/images/college-banner/cics-cs.jpg',
        link: '/programs/computer-science',
      },
      {
        title: 'Bachelor of Science in Information Technology',
        description:
          'Bridge technology and business through comprehensive IT management and systems design.',
        image: '/public/images/college-banner/cics-it.jpg',
        link: '/programs/information-technology',
      },
      {
        title: 'Bachelor of Science in Information Systems',
        description:
          'Optimize business processes through strategic information systems and data analytics.',
        image: '/public/images/college-banner/cics-is.jpg',
        link: '/programs/information-systems',
      },
    ],
    socialMedia: [
      {
        platform: 'Facebook',
        url: 'https://facebook.com/marsu-cics',
        icon: '📘',
      },
      {
        platform: 'Instagram',
        url: 'https://instagram.com/marsu-cics',
        icon: '📷',
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/school/marsu-cics',
        icon: '💼',
      },
      {
        platform: 'YouTube',
        url: 'https://youtube.com/marsu-cics',
        icon: '📺',
      },
    ],
  },
  cit: {
    label: 'Tech Titans',
    headline: 'Engineering Excellence at the College of Industrial Technology',
    subheading:
      'Shape the future through innovative engineering programs and hands-on technological advancement.',
    programs: [
      {
        title: 'Bachelor of Science in Industrial Engineering',
        description:
          'Optimize systems and processes for maximum efficiency and productivity.',
        image: '/public/images/college-banner/cit-ie.jpg',
        link: '/programs/industrial-engineering',
      },
      {
        title: 'Bachelor of Science in Mechanical Engineering',
        description:
          'Design and develop mechanical systems for the modern industrial world.',
        image: '/public/images/college-banner/cit-me.jpg',
        link: '/programs/mechanical-engineering',
      },
      {
        title: 'Bachelor of Science in Civil Engineering',
        description:
          'Build the infrastructure that supports communities and economic growth.',
        image: '/public/images/college-banner/cit-ce.jpg',
        link: '/programs/civil-engineering',
      },
    ],
    socialMedia: [
      {
        platform: 'Facebook',
        url: 'https://facebook.com/marsu-cit',
        icon: '📘',
      },
      {
        platform: 'Instagram',
        url: 'https://instagram.com/marsu-cit',
        icon: '📷',
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/school/marsu-cit',
        icon: '💼',
      },
      { platform: 'Twitter', url: 'https://twitter.com/marsu-cit', icon: '🐦' },
    ],
  },
  coed: {
    label: 'Innovation Leaders',
    headline: 'Inspiring Educational Excellence at the College of Education',
    subheading:
      'Develop passionate educators and innovative leaders who shape the future of learning and community development.',
    programs: [
      {
        title: 'Bachelor of Elementary Education',
        description:
          'Nurture young minds with comprehensive child development and pedagogy training.',
        image: '/public/images/college-banner/coed-elem.jpg',
        link: '/programs/elementary-education',
      },
      {
        title: 'Bachelor of Secondary Education',
        description:
          'Specialize in subject-specific teaching methods for adolescent learners.',
        image: '/public/images/college-banner/coed-sec.jpg',
        link: '/programs/secondary-education',
      },
      {
        title: 'Bachelor of Physical Education',
        description:
          'Promote health, wellness, and physical development through sports and fitness education.',
        image: '/public/images/college-banner/coed-pe.jpg',
        link: '/programs/physical-education',
      },
    ],
    socialMedia: [
      {
        platform: 'Facebook',
        url: 'https://facebook.com/marsu-coed',
        icon: '📘',
      },
      {
        platform: 'Instagram',
        url: 'https://instagram.com/marsu-coed',
        icon: '📷',
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/school/marsu-coed',
        icon: '💼',
      },
      {
        platform: 'YouTube',
        url: 'https://youtube.com/marsu-coed',
        icon: '📺',
      },
    ],
  },
  default: {
    label: 'Excellence',
    headline: 'Pursuing Academic Excellence at MARSU',
    subheading:
      'Committed to providing quality education and developing future leaders in various fields of study.',
    programs: [
      {
        title: 'Liberal Arts Program',
        description:
          'Develop critical thinking and communication skills across diverse disciplines.',
        image: '/public/images/college-banner/default-liberal.jpg',
        link: '/programs/liberal-arts',
      },
      {
        title: 'Business Administration',
        description:
          'Master business fundamentals and leadership principles for entrepreneurial success.',
        image: '/public/images/college-banner/default-business.jpg',
        link: '/programs/business-administration',
      },
    ],
    socialMedia: [
      { platform: 'Facebook', url: 'https://facebook.com/marsu', icon: '📘' },
      { platform: 'Instagram', url: 'https://instagram.com/marsu', icon: '📷' },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/school/marsu',
        icon: '💼',
      },
    ],
  },
};

function Hero({ title, tagline, breadcrumbs = [], ctaLabel, collegeKey }) {
  // Modal and UI state
  const [showModal, setShowModal] = useState(false);
  const [stickyButton, setStickyButton] = useState(false);

  // Accessibility: skip to content
  const skipRef = useRef();

  // Parallax effect and sticky button detection
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const bg = document.getElementById('hero-bg');
      if (bg) bg.style.backgroundPositionY = `${y * 0.3}px`;

      // Show sticky button after scrolling past hero
      setStickyButton(y > window.innerHeight * 0.7);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Always call useParams at the top level
  const params = useParams();
  // Use collegeKey prop if provided, otherwise fallback to params.collegeKey
  const key = collegeKey || params.collegeKey;

  // Get college-specific data and colors
  const currentCollegeData = collegeData[key] || collegeData.default;

  // Dynamic college color classes
  const getCollegeColors = (collegeKey) => {
    const colorMap = {
      cics: {
        primary: '#6ec207',
        primaryHover: '#7edc2a',
        secondary: '#ffeb00',
        cssVar: 'cics',
      },
      cit: {
        primary: '#fac937',
        primaryHover: '#f0e68c',
        secondary: '#f57f17',
        cssVar: 'cit',
      },
      coed: {
        primary: '#2d80d2',
        primaryHover: '#3f9be0',
        secondary: '#1976d2',
        cssVar: 'ce',
      },
      cass: {
        primary: '#ff5d99',
        primaryHover: '#ff6daa',
        secondary: '#e91e63',
        cssVar: 'cass',
      },
      ceng: {
        primary: '#ff6600',
        primaryHover: '#ff7f00',
        secondary: '#e65100',
        cssVar: 'ceng',
      },
      default: {
        primary: 'var(--color-primary)',
        primaryHover: 'var(--color-primary-hover)',
        secondary: 'var(--color-secondary)',
        cssVar: 'color',
      },
    };
    return colorMap[collegeKey] || colorMap.default;
  };

  const collegeColors = getCollegeColors(key);

  const heroBgImg = key
    ? `/public/images/college-banner/${key}-hero.png`
    : '/public/images/college-banner/default-hero.png';

  console.log('Hero background image:', heroBgImg, 'key:', key);

  return (
    <>
      {/* Accessibility: Skip to content */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only absolute top-2 left-2 bg-white text-black px-3 py-1 rounded z-50'
        ref={skipRef}
        tabIndex={0}
      >
        Skip to main content
      </a>
      <section
        id='hero-bg'
        className='relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex flex-col justify-center items-center overflow-hidden'
        aria-label={`${title} hero section`}
        tabIndex={0}
        style={{
          '--college-primary': collegeColors.primary,
          '--college-primary-hover': collegeColors.primaryHover,
          '--college-secondary': collegeColors.secondary,
        }}
      >
        {/* Background video with subtle overlay */}
        <video
          className='absolute inset-0 -z-30 w-full h-full object-cover opacity-15'
          src='/public/hero-video.mp4'
          autoPlay
          loop
          muted
          playsInline
          aria-hidden='true'
        />

        {/* Elegant gradient overlay */}
        <div
          className='absolute inset-0 -z-20 opacity-70'
          style={{
            background: `linear-gradient(135deg, ${collegeColors.primary}30, ${collegeColors.primary}20, ${collegeColors.secondary}15)`,
          }}
          aria-hidden='true'
        />

        {/* Fallback hero image */}
        <img
          id='hero-bg-img'
          src={heroBgImg}
          alt={key ? `${key} hero image` : 'Hero background'}
          className='absolute inset-0 -z-25 h-full w-full object-cover opacity-25'
          aria-hidden='true'
        />

        {/* Subtle overlay for text readability */}
        <div
          className='absolute inset-0 -z-10 bg-black/30'
          aria-hidden='true'
        />

        {/* Simple breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav
            className='absolute top-8 left-8 text-sm text-white/80 z-10'
            aria-label='Breadcrumb'
          >
            <ol className='flex space-x-2'>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className='flex items-center'>
                  {i > 0 && <span className='mx-2 text-white/50'>/</span>}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className='hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 rounded px-1 transition-colors duration-200'
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className='font-medium text-white'>
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Clean Hero Content */}
        <div className='relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-6 py-20 text-center'>
          {/* College Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className='inline-flex items-center px-6 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-8'
          >
            <span className='text-sm font-medium text-white/90 tracking-wide'>
              {currentCollegeData.label}
            </span>
          </motion.div>

          {/* Refined Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl'
          >
            {title || currentCollegeData.headline}
          </motion.h1>

          {/* Clean Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className='text-lg text-white/80 leading-relaxed mb-10 max-w-2xl'
          >
            {tagline || currentCollegeData.subheading}
          </motion.p>

          {/* Simplified CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className='flex flex-col sm:flex-row gap-4'
          >
            <button
              className='group px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/20 transition-all duration-300'
              style={{
                backgroundColor: collegeColors.primary,
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = collegeColors.primaryHover)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = collegeColors.primary)
              }
              onClick={() => setShowModal(true)}
              aria-label={ctaLabel || 'Explore Programs'}
            >
              <span className='flex items-center gap-2'>
                {ctaLabel || 'Explore Programs'}
                <svg
                  className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-200'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </span>
            </button>

            <button className='px-8 py-4 text-lg font-medium text-white border-2 border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/15 rounded-xl backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20'>
              Contact Admissions
            </button>
          </motion.div>
        </div>
        {/* Streamlined Programs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className='relative z-10 w-full max-w-6xl px-6 pb-16'
        >
          <div className='text-center mb-12'>
            <h2 className='text-2xl lg:text-3xl font-bold text-white mb-3'>
              Featured Programs
            </h2>
            <p className='text-white/70 text-lg'>
              Discover our flagship academic programs
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            {currentCollegeData.programs.slice(0, 3).map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer'
              >
                <div className='text-center'>
                  <div
                    className='w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl'
                    style={{
                      backgroundColor: `${collegeColors.primary}20`,
                      border: `2px solid ${collegeColors.primary}40`,
                    }}
                  >
                    📚
                  </div>
                  <h3 className='text-lg font-semibold text-white mb-3 group-hover:text-opacity-90 transition-all duration-200'>
                    {program.title}
                  </h3>
                  <p className='text-white/70 text-sm mb-4 leading-relaxed'>
                    {program.description}
                  </p>
                  <a
                    href={program.link}
                    className='inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200'
                    style={{
                      color: collegeColors.primary,
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = collegeColors.primaryHover)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = collegeColors.primary)
                    }
                  >
                    Learn More
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
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Refined Social Connection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className='relative z-10 w-full max-w-6xl px-6 pb-12'
        >
          <div className='flex flex-col sm:flex-row items-center justify-between bg-white/8 backdrop-blur-sm rounded-2xl p-8 border border-white/15'>
            <div className='text-center sm:text-left mb-6 sm:mb-0'>
              <h3 className='text-xl font-semibold text-white mb-2'>
                Stay Connected
              </h3>
              <p className='text-white/70'>
                Follow us for updates and student stories
              </p>
            </div>
            <div className='flex gap-4'>
              {currentCollegeData.socialMedia
                .slice(0, 4)
                .map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-12 h-12 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-110'
                    aria-label={`Follow us on ${social.platform}`}
                  >
                    <span className='text-lg'>{social.icon}</span>
                  </a>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Clean sticky CTA button */}
        <AnimatePresence>
          {stickyButton && (
            <motion.button
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className='fixed bottom-8 right-8 z-50 text-white px-6 py-3 rounded-full shadow-xl font-medium transition-all duration-300'
              style={{
                backgroundColor: collegeColors.primary,
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = collegeColors.primaryHover)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = collegeColors.primary)
              }
              onClick={() => setShowModal(true)}
              aria-label='Quick access to explore programs'
            >
              Explore Programs
            </motion.button>
          )}
        </AnimatePresence>
        {/* Clean Application Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'
              role='dialog'
              aria-modal='true'
              onClick={(e) =>
                e.target === e.currentTarget && setShowModal(false)
              }
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className='bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl'
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className='absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200'
                  onClick={() => setShowModal(false)}
                  aria-label='Close modal'
                >
                  ×
                </button>

                <div className='text-center mb-8'>
                  <div
                    className='w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4'
                    style={{
                      backgroundColor: `${collegeColors.primary}15`,
                    }}
                  >
                    <span className='text-2xl'>🎓</span>
                  </div>
                  <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                    Get Started Today
                  </h2>
                  <p className='text-gray-600'>
                    Connect with our admissions team to learn more about{' '}
                    {currentCollegeData.label}.
                  </p>
                </div>

                <form className='space-y-5'>
                  <div>
                    <input
                      className='w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base'
                      placeholder='Full Name'
                      style={{
                        '--tw-ring-color': collegeColors.primary,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = collegeColors.primary;
                        e.target.style.boxShadow = `0 0 0 3px ${collegeColors.primary}20`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                      required
                    />
                  </div>

                  <div>
                    <input
                      className='w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base'
                      placeholder='Email Address'
                      type='email'
                      onFocus={(e) => {
                        e.target.style.borderColor = collegeColors.primary;
                        e.target.style.boxShadow = `0 0 0 3px ${collegeColors.primary}20`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                      required
                    />
                  </div>

                  <div>
                    <select
                      className='w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base bg-white'
                      onFocus={(e) => {
                        e.target.style.borderColor = collegeColors.primary;
                        e.target.style.boxShadow = `0 0 0 3px ${collegeColors.primary}20`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option>Select a program</option>
                      {currentCollegeData.programs.map((program, index) => (
                        <option key={index} value={program.title}>
                          {program.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type='submit'
                    className='w-full text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl'
                    style={{
                      backgroundColor: collegeColors.primary,
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor =
                        collegeColors.primaryHover)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = collegeColors.primary)
                    }
                  >
                    Get Information
                  </button>

                  <p className='text-xs text-center text-gray-500 mt-4'>
                    We&apos;ll contact you within 24 hours
                  </p>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Placeholder: Advanced accessibility features */}
        {/* TODO: Add skip-to-content, ARIA live regions, etc. */}
      </section>
    </>
  );
}

Hero.propTypes = {
  title: PropTypes.string,
  tagline: PropTypes.string,
  breadcrumbs: PropTypes.array,
  ctaLabel: PropTypes.string,
  collegeKey: PropTypes.string,
};

export default Hero;
