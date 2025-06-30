import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import PropTypes from 'prop-types';

const HeroSection = ({ images, collegeName, collegeKey }) => {
  return (
    <div className='relative rounded-2xl overflow-hidden shadow-xl mb-8 group'>
      {images.length > 0 ? (
        <Swiper
          modules={[Navigation, Scrollbar, Autoplay]}
          navigation={true}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={images.length > 1}
          className='w-full h-64 md:h-96'
          aria-label='College image carousel'
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <LazyImage
                src={img}
                alt={`${collegeName} - Image ${idx + 1}`}
                className='w-full h-64 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='w-full h-64 md:h-96 bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 flex items-center justify-center text-primary-600 text-xl relative overflow-hidden'>
          {/* Animated background patterns */}
          <div className='absolute inset-0 opacity-10'>
            <div className='absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse'></div>
            <div className='absolute top-20 right-20 w-16 h-16 bg-white rounded-full animate-pulse animation-delay-1000'></div>
            <div className='absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse animation-delay-2000'></div>
            <div className='absolute bottom-10 right-1/3 w-24 h-24 bg-white rounded-full animate-pulse animation-delay-3000'></div>
          </div>

          <div className='text-center z-10'>
            <svg
              className='w-20 h-20 mx-auto mb-6 opacity-50 animate-bounce'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                clipRule='evenodd'
              />
            </svg>
            <p className='text-lg font-medium'>College Images Coming Soon</p>
            <p className='text-sm opacity-75 mt-2'>
              Discover our beautiful campus
            </p>
          </div>
        </div>
      )}

      {/* Enhanced overlay with gradient and content */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'>
        <div className='absolute bottom-0 left-0 w-full p-6 md:p-8'>
          <div className='max-w-4xl'>
            <h1 className='text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4 animate-fade-in-up'>
              {collegeName}
            </h1>
            <p className='text-white/90 text-lg md:text-xl mb-6 drop-shadow animate-fade-in-up animation-delay-500'>
              Discover excellence in education and innovation
            </p>

            {/* Call-to-action buttons */}
            <div className='flex flex-wrap gap-4 animate-fade-in-up animation-delay-1000'>
              <Link
                to={`/colleges/${collegeKey}/programs`}
                className='bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-black/20'
              >
                Explore Programs
              </Link>
              <Link
                to={`/colleges/${collegeKey}/faculty`}
                className='bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20'
              >
                Meet Faculty
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute top-4 right-4 opacity-20'>
        <div className='w-16 h-16 border-2 border-white rounded-full animate-ping'></div>
      </div>
      <div className='absolute bottom-4 right-4 opacity-20'>
        <div className='w-12 h-12 border-2 border-white rounded-full animate-pulse'></div>
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  images: PropTypes.array.isRequired,
  collegeName: PropTypes.string.isRequired,
  collegeKey: PropTypes.string.isRequired,
};

export default HeroSection;
