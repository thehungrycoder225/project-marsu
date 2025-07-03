import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import PropTypes from 'prop-types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SDGNavSwiperSimple = ({ goals }) => {
  return (
    <div className='w-full py-8'>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        className='sdg-swiper'
      >
        {goals.map((goal) => (
          <SwiperSlide key={goal.id}>
            <div className='flex flex-col items-center p-8'>
              <img
                src={goal.image}
                alt={goal.alt}
                className='w-full h-auto max-w-[200px] object-contain hover:scale-105 transition-transform duration-300'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

SDGNavSwiperSimple.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      statement: PropTypes.array,
    })
  ).isRequired,
};

export default SDGNavSwiperSimple;
