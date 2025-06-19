import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import PropTypes from 'prop-types';

// Mock data for hero slides
const heroSlides = [
  {
    id: 1,
    headline: 'Marinduque State University',
    subtitle: 'Your Gateway to Excellence',
    description: 'Empowering Minds. Shaping the Future.',
    image: '/images/landing-bg-1.jpg',
    cta: 'Explore MARSU',
    ctaLink: '#main-content',
    showCta: true,
  },
  {
    id: 2,
    headline: 'Innovate. Inspire. Impact.',
    subtitle: '',
    description:
      'Join a vibrant academic community dedicated to research and service.',
    image: '/images/landing-bg-2.jpg',
    showCta: false,
  },
  {
    id: 3,
    headline: 'A Home for Every Dreamer',
    subtitle: 'Diverse Programs. Limitless Opportunities.',
    description: '',
    image: '/images/landing-bg-3.jpg',
    showCta: false,
  },
];

function LandingHeroCarousel({ slides = heroSlides }) {
  return (
    <section className='relative w-full min-h-screen flex items-center justify-center overflow-hidden'>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect='fade'
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        className='w-full h-screen'
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id}>
            <div
              className='relative w-full h-screen flex items-center justify-center'
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(102,0,51,0.7) 0%, rgba(255,204,0,0.3) 100%), url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className='z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center text-white bg-black/10'>
                <h1 className='text-4xl md:text-6xl font-extrabold drop-shadow mb-4 animate-fade-in'>
                  {slide.headline}
                </h1>
                {slide.subtitle && (
                  <h2 className='text-xl md:text-2xl font-semibold mb-2 animate-fade-in delay-100'>
                    {slide.subtitle}
                  </h2>
                )}
                {slide.description && (
                  <p className='text-base md:text-lg max-w-2xl mx-auto mb-6 animate-fade-in delay-200'>
                    {slide.description}
                  </p>
                )}
                {slide.showCta && slide.cta && (
                  <a
                    href={slide.ctaLink}
                    className='inline-block bg-rose-700 hover:bg-rose-900 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 animate-fade-in delay-300'
                  >
                    {slide.cta}
                  </a>
                )}
              </div>
              <div className='absolute inset-0 bg-gradient-to-br from-rose-900/60 to-yellow-400/30 pointer-events-none' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

LandingHeroCarousel.propTypes = {
  slides: PropTypes.array,
};

export default LandingHeroCarousel;
