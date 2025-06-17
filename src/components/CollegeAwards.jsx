import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/controller';

const highlightClass = (award) => {
  // Example: highlight recent or prestigious awards
  if (
    award.isFeatured ||
    (award.year && award.year >= new Date().getFullYear() - 1)
  ) {
    return 'border';
  }
  return 'border border-gray-200';
};

const CollegeAwards = ({ awards, lang }) => {
  if (!awards || awards.length === 0) return null;

  return (
    <section className='my-12'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>Awards</h2>
        <a href='/awards' className='text-blue-600 hover:underline font-medium'>
          See all awards
        </a>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        loop
        scrollbar={{ hide: true }}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className='awards-carousel'
      >
        {awards.map((award) => (
          <SwiperSlide key={award.id}>
            <motion.div
              className={`p-4 gap-4 align-super flex flex-col  ${highlightClass(award)}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={award.icon}
                alt={award.title?.[lang] || award.title?.en || award.title}
                className='object-contain w-16 h-16 '
              />
              <div className='flex flex-col flex-1  gap-2'>
                <div className='text-sm font-semibold '>
                  {award.title?.[lang] || award.title?.en || award.title}
                </div>

                <div className='text-xs  text-gray-700'>
                  {award.description?.[lang] ||
                    award.description?.en ||
                    award.description}
                </div>
                <div className='text-xs text-gray-500 mb-1'>{award.year}</div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CollegeAwards;
