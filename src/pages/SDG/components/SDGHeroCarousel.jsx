import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import PropTypes from 'prop-types';

// SDG Hero slides data
const sdgHeroSlides = [
  {
    id: 1,
    headline: 'From the HEART, to the World',
    subtitle: 'Sustainability and Innovation @MarSU',
    description:
      "Marinduque State University reaffirms its unwavering commitment to the United Nations' 2030 Agenda for Sustainable Development and the attainment of the 17 Sustainable Development Goals.",
    image: '/sdg/sdg-bg-1.png',
    cta: 'Explore Our Impact',
    ctaLink: '#sdgGoals',
    showCta: true,
    theme: 'poverty',
  },
  {
    id: 2,
    headline: 'Education for Sustainable Future',
    subtitle: 'Quality Education for All',
    description:
      'We believe education is the foundation for sustainable development. Through innovative teaching and research, we empower students to become agents of change.',
    image: '/sdg/sdg-bg-4.png',
    cta: 'Learn More',
    ctaLink: '#sdgMission',
    showCta: true,
    theme: 'education',
  },
  {
    id: 3,
    headline: 'Climate Action & Innovation',
    subtitle: 'Leading Environmental Stewardship',
    description:
      'Our research and community initiatives focus on climate resilience, sustainable practices, and environmental conservation for Marinduque and beyond.',
    image: '/sdg/sdg-bg-13.png',
    cta: 'View Projects',
    ctaLink: '#sdgProjects',
    showCta: true,
    theme: 'climate',
  },
  {
    id: 4,
    headline: 'Partnerships for the Goals',
    subtitle: 'Collaboration for Global Impact',
    description:
      'Through strategic partnerships and knowledge sharing, we strengthen our initiatives and amplify our impact on sustainable development.',
    image: '/sdg/sdg-bg-17.png',
    cta: 'Join Our Mission',
    ctaLink: '#sdgPartnership',
    showCta: true,
    theme: 'partnership',
  },
];

// Statistics counter component
const StatCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

function SDGHeroCarousel({ slides = sdgHeroSlides }) {
  return (
    <section className='relative w-full min-h-screen flex items-center justify-center overflow-hidden'>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect='fade'
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet sgd-hero-bullet',
          bulletActiveClass:
            'swiper-pagination-bullet-active sgd-hero-bullet-active',
        }}
        navigation={{
          nextEl: '.sgd-hero-next',
          prevEl: '.sgd-hero-prev',
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        className='w-full h-screen sgd-hero-swiper'
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className='relative w-full h-screen flex items-center justify-center'
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(102,0,51,0.85) 0%, rgba(186,57,55,0.7) 50%, rgba(255,169,122,0.4) 100%), url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
              }}
            >
              {/* Animated background elements */}
              <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-4 -left-4 w-72 h-72 bg-white/5 rounded-full animate-pulse'></div>
                <div className='absolute top-1/4 right-1/4 w-48 h-48 bg-yellow-400/10 rounded-full animate-bounce-slow'></div>
                <div className='absolute bottom-1/4 left-1/4 w-32 h-32 bg-rose-300/15 rounded-full animate-pulse delay-1000'></div>
              </div>

              <div className='container mx-auto px-4 z-10'>
                <div className='grid lg:grid-cols-12 gap-8 items-center min-h-screen py-20'>
                  {/* Content Section */}
                  <div className='lg:col-span-7 text-white space-y-6'>
                    <div className='space-y-4'>
                      <h1 className='text-4xl md:text-6xl font-extrabold leading-tight animate-fade-in'>
                        <span className='block text-yellow-400 text-lg md:text-xl font-semibold mb-2 animate-fade-in delay-100'>
                          {slide.subtitle}
                        </span>
                        {slide.headline}
                      </h1>

                      <p className='text-lg md:text-xl leading-relaxed max-w-2xl animate-fade-in delay-200 text-gray-100'>
                        {slide.description}
                      </p>
                    </div>

                    {/* Call to Action */}
                    {slide.showCta && slide.cta && (
                      <div className='flex flex-wrap gap-4 animate-fade-in delay-300'>
                        <a
                          href={slide.ctaLink}
                          className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300'
                        >
                          {slide.cta}
                          <svg
                            className='ml-2 w-5 h-5'
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
                        </a>
                        <a
                          href='#sdgForeword'
                          className='inline-flex items-center px-8 py-4 border-2 border-white/30 hover:border-white text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20'
                        >
                          Learn More
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Visual/Stats Section */}
                  <div className='lg:col-span-5 text-white'>
                    <div className='grid grid-cols-2 gap-6 animate-fade-in delay-400'>
                      <div className='text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20'>
                        <div className='text-3xl md:text-4xl font-bold text-yellow-400 mb-2'>
                          <StatCounter end={17} />
                        </div>
                        <div className='text-sm md:text-base font-semibold'>
                          SDG Goals
                        </div>
                      </div>

                      <div className='text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20'>
                        <div className='text-3xl md:text-4xl font-bold text-yellow-400 mb-2'>
                          <StatCounter end={25} suffix='+' />
                        </div>
                        <div className='text-sm md:text-base font-semibold'>
                          Active Projects
                        </div>
                      </div>

                      <div className='text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20'>
                        <div className='text-3xl md:text-4xl font-bold text-yellow-400 mb-2'>
                          <StatCounter end={5000} suffix='+' />
                        </div>
                        <div className='text-sm md:text-base font-semibold'>
                          Students Impacted
                        </div>
                      </div>

                      <div className='text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20'>
                        <div className='text-3xl md:text-4xl font-bold text-yellow-400 mb-2'>
                          <StatCounter end={2030} />
                        </div>
                        <div className='text-sm md:text-base font-semibold'>
                          Target Year
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
                <a
                  href='#sdgForeword'
                  className='text-white/70 hover:text-white transition-colors'
                >
                  <svg
                    className='w-8 h-8'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 14l-7 7m0 0l-7-7m7 7V3'
                    />
                  </svg>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation arrows */}
      <button className='sgd-hero-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20'>
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
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>

      <button className='sgd-hero-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20'>
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
            d='M9 5l7 7-7 7'
          />
        </svg>
      </button>
    </section>
  );
}

SDGHeroCarousel.propTypes = {
  slides: PropTypes.array,
};

StatCounter.propTypes = {
  end: PropTypes.number.isRequired,
  duration: PropTypes.number,
  suffix: PropTypes.string,
};

export default SDGHeroCarousel;
