import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useColleges } from '../../hooks/useColleges';
import { Player } from '@lottiefiles/react-lottie-player';
import { useParams } from 'react-router-dom';

// Example hero media (images/videos)
const HERO_MEDIA = [
  { type: 'image', src: '', alt: 'President' },
  { type: 'image', src: '', alt: 'President Alt' },
  // { type: 'video', src: '/public/hero-video.mp4', alt: 'Campus Video' }, // Example for video
];

const collegeLabels = {
  cics: 'Crypto Knights',
  cit: 'Tech Titan',
  coed: 'Innovation Leader',
  // Add more colleges as needed
  default: 'College',
};

function Hero({
  title,
  tagline,
  themeColor = '#4f46e5',
  breadcrumbs = [],
  ctaLabel,
  description = '',
  collegeKey,
}) {
  // Animate entrance
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);
  // Theme switcher
  const [currentTheme, setCurrentTheme] = useState(themeColor);
  // Modal state
  const [showModal, setShowModal] = useState(false);
  // Accessibility: skip to content
  const skipRef = useRef();

  // Parallax effect (simple scroll listener)
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const bg = document.getElementById('hero-bg');
      if (bg) bg.style.backgroundPositionY = `${y * 0.3}px`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { colleges } = useColleges();
  // Always call useParams at the top level
  const params = useParams();
  // Use collegeKey prop if provided, otherwise fallback to params.collegeKey
  const key = collegeKey || params.collegeKey;
  // Find the college by slug/shortName/id (support both string and object for shortName)
  const college = colleges.find(
    (col) =>
      col.slug === key ||
      (typeof col.shortName === 'object' &&
        Object.values(col.shortName).includes(key)) ||
      col.shortName === key ||
      String(col.id) === key
  );

  // Temporary: Use the same logo resolution logic as CollegeNav for the hero background image
  const collegeLogos = {
    cics: '/public/images/cics-temp-logo.png',
    // Add more colleges as needed
    default: '/logo.png', // Fallback logo
  };
  const heroBgImg = key
    ? `/public/images/college-banner/${key}-hero.png`
    : '/public/images/college-banner/default-hero.png';

  // If you want to implement a fallback to JPG, you need to check if the PNG exists at runtime (e.g., via an <img onError> handler).
  // Use the same key for logo lookup as for hero image
  const logo = collegeLogos[key] || collegeLogos.default;

  // Lottie mascot mapping by collegeKey
  const mascotLotties = {
    cics: 'https://assets10.lottiefiles.com/packages/lf20_9wpyhdzo.json', // IT/CS mascot
    cit: 'https://assets10.lottiefiles.com/packages/lf20_2LdLki.json', // Example for another college
    coed: 'https://assets10.lottiefiles.com/packages/lf20_4kx2q32n.json', // Example for another college
    // Add more mappings as needed
    default: 'https://assets10.lottiefiles.com/packages/lf20_9wpyhdzo.json', // Fallback mascot
  };
  const mascotSrc = mascotLotties[key] || mascotLotties.default;

  // Fix: Dynamically resolve the label for CTA based on the resolved key
  const ctaLabelResolved = `Join the ${collegeLabels[key] || collegeLabels.default} Now`;

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
        className='relative w-full bg-gray-900 min-h-[60vh] flex flex-col justify-center items-center overflow-hidden'
        aria-label={`${title} hero section`}
        tabIndex={0}
      >
        {/* Background video with fallback */}
        <video
          className='absolute inset-0 -z-40 w-full h-full object-cover opacity-30'
          src='/public/hero-video.mp4'
          autoPlay
          loop
          muted
          playsInline
          aria-hidden='true'
        />
        {/* Animated gradient background */}
        <div
          className='absolute inset-0 -z-100 animate-gradient bg-gradient-to-tr from-[var(--primary-700)] via-[var(--theme-color)] to-[#323232] opacity-25'
          style={{ '--theme-color': themeColor }}
          aria-hidden='true'
        />
        {/* Fallback image background (first media) */}
        <img
          id='hero-bg-img'
          src={heroBgImg}
          alt={key ? `${key} hero image` : 'Hero background'}
          className='absolute inset-0 -z-100 h-full w-full object-cover opacity-40'
          aria-hidden='true'
        />
        {/* Glassmorphism overlay */}
        <div
          className='absolute inset-0 -z-10 bg-white/10 backdrop-blur-md'
          aria-hidden='true'
        />

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav
            className='absolute top-6 left-6 text-sm text-white/80 z-10'
            aria-label='Breadcrumb'
          >
            <ol className='flex space-x-2'>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className='flex items-center'>
                  {i > 0 && <span className='mx-1'>/</span>}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className='hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded px-1'
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className='font-semibold'>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Split layout */}
        <div className='relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl px-6 py-20 md:py-32 gap-10'>
          {/* Text content */}
          <div
            className={`flex-1 text-center md:text-left transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h1 className='text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-lg'>
              {title}
            </h1>
            <p className='mt-4 text-lg sm:text-2xl text-gray-200'>{tagline}</p>
            {/* CTA Button */}
            <div className='mt-10 flex justify-center md:justify-start'>
              <button
                className='rounded-md bg-[var(--primary-700)] hover:bg-[var(--primary-600)] px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--theme-color)] transition-colors duration-200'
                onClick={() => setShowModal(true)}
                aria-label={ctaLabel || ctaLabelResolved}
                tabIndex={0}
              >
                {ctaLabel || ctaLabelResolved}
              </button>
            </div>
            {/* Placeholder: Animated SVG/Lottie mascot */}
            <div
              className='absolute right-10 top-10 z-20 hidden md:block'
              aria-hidden='true'
            >
              {/* Lottie mascot animation */}
              <Player
                autoplay
                loop
                src={mascotSrc}
                style={{ height: '64px', width: '64px' }}
                aria-label='Mascot animation'
              />
            </div>
          </div>
          {/* Image/Media Swiper (split layout) */}
          <div
            className={`flex-1 flex justify-center items-center transition-all duration-700 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            {/* <Swiper
              modules={[Autoplay, Pagination, A11y]}
              spaceBetween={30}
              slidesPerView={1}
              loop
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              a11y={{ enabled: true }}
              aria-label='Hero Media'
              className='w-64 h-64 md:w-80 md:h-80 rounded-3xl shadow-2xl border-4 border-white/30 bg-white/10'
            >
              {HERO_MEDIA.map((media, i) => (
                <SwiperSlide
                  key={i}
                  className='flex justify-center items-center'
                >
                  {media.type === 'image' ? (
                    <img
                      src={logo}
                      alt={media.alt}
                      className='w-full h-full object-cover rounded-3xl'
                      loading='lazy'
                    />
                  ) : (
                    <video
                      src={media.src}
                      className='w-full h-full object-cover rounded-3xl'
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper> */}
            {/* Hero Logo */}
            <img
              src={logo}
              alt={`${key || 'default'} logo`}
              className='w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl'
              loading='lazy'
            />
          </div>
        </div>
        {/* Placeholder: Partner/Logo slider below hero */}
        {/* TODO: Insert partner/logo Swiper here */}

        {/* Placeholder: Parallax/scroll effects */}
        {/* TODO: Add parallax layers or scroll-based effects */}
        {/* Placeholder: Interactive CTA/modal/form */}
        {/* TODO: Enhance CTA with modal or feedback */}
        {/* Modal for CTA */}
        {showModal && (
          <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
            role='dialog'
            aria-modal='true'
          >
            <div className='bg-white rounded-lg p-8 max-w-md w-full relative'>
              <button
                className='absolute top-2 right-2 text-gray-500 hover:text-black'
                onClick={() => setShowModal(false)}
                aria-label='Close modal'
              >
                &times;
              </button>
              <h2 className='text-xl font-bold mb-4'>Inquire Now</h2>
              <form>
                <input
                  className='w-full mb-3 px-3 py-2 border rounded'
                  placeholder='Your Name'
                  required
                />
                <input
                  className='w-full mb-3 px-3 py-2 border rounded'
                  placeholder='Your Email'
                  type='email'
                  required
                />
                <textarea
                  className='w-full mb-3 px-3 py-2 border rounded'
                  placeholder='Your Message'
                  required
                />
                <button
                  type='submit'
                  className='w-full bg-[var(--theme-color)] text-white py-2 rounded font-semibold'
                  style={{ backgroundColor: currentTheme }}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
        {/* Placeholder: Advanced accessibility features */}
        {/* TODO: Add skip-to-content, ARIA live regions, etc. */}
      </section>
    </>
  );
}

export default Hero;
