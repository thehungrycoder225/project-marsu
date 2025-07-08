import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';

const SDGNavSwiper = ({ goals }) => {
  // Add custom styles to the document head
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .sdg-nav-swiper .swiper-button-next,
      .sdg-nav-swiper .swiper-button-prev {
        width: 48px !important;
        height: 48px !important;
        background: rgba(31, 41, 55, 0.8) !important;
        border-radius: 50% !important;
        color: white !important;
        backdrop-filter: blur(12px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.3s ease !important;
        margin-top: 0 !important;
      }
      
      .sdg-nav-swiper .swiper-button-next:hover,
      .sdg-nav-swiper .swiper-button-prev:hover {
        background: rgba(17, 24, 39, 0.9) !important;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15) !important;
        transform: scale(1.05) !important;
      }
      
      .sdg-nav-swiper .swiper-button-next:after,
      .sdg-nav-swiper .swiper-button-prev:after {
        font-size: 18px !important;
        font-weight: bold !important;
      }
      
      .sdg-nav-swiper .swiper-button-disabled {
        opacity: 0.3 !important;
        cursor: not-allowed !important;
      }
      
      .sdg-nav-swiper .swiper-button-next {
        right: 8px !important;
      }
      
      .sdg-nav-swiper .swiper-button-prev {
        left: 8px !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className='w-full py-4 relative px-12'>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 8 },
        }}
        className='sdg-nav-swiper'
      >
        {goals.map((goal) => (
          <SwiperSlide key={goal.id}>
            <Link to={goal.link} className='flex flex-col items-center group'>
              <div className='shadow-lg mb-2 transition-transform group-hover:scale-110'>
                <img
                  src={goal.image}
                  alt={goal.alt}
                  className='w-16 h-16 object-contain'
                />
              </div>
              <span className='text-xs text-center font-medium text-gray-700 group-hover:text-[var(--color-primary)] transition'>
                {goal.alt}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SDGNavSwiper;
