import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import 'swiper/css';

const highlightClass = (award) => {
  // Example: highlight recent or prestigious awards
  if (
    award.isFeatured ||
    (award.year && award.year >= new Date().getFullYear() - 1)
  ) {
    return 'border-2 border-yellow-400 bg-yellow-50 shadow-lg';
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
        spaceBetween={24}
        slidesPerView={1}
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
              className={`p-4 rounded-lg flex flex-col items-center ${highlightClass(award)}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={award.icon}
                alt={award.title?.[lang] || award.title?.en || award.title}
                className='w-16 h-16 mb-2 object-contain'
              />
              <div className='text-lg font-semibold text-center'>
                {award.title?.[lang] || award.title?.en || award.title}
              </div>
              <div className='text-sm text-gray-500 mb-1'>{award.year}</div>
              <div className='text-sm text-center text-gray-700'>
                {award.description?.[lang] ||
                  award.description?.en ||
                  award.description}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CollegeAwards;
