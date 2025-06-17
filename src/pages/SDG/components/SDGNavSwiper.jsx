import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';

const SDGNavSwiper = ({ goals }) => (
  <div className='w-full py-4'>
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
            <div className='rounded-full bg-white/70 shadow-lg p-2 mb-2 transition-transform group-hover:scale-110'>
              <img
                src={goal.image}
                alt={goal.alt}
                className='w-16 h-16 object-contain'
              />
            </div>
            <span className='text-xs text-center font-medium text-gray-700 group-hover:text-blue-700 transition'>
              {goal.alt}
            </span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default SDGNavSwiper;
