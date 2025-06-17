import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const SDGGoalTestimonials = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;
  return (
    <div className='sdg-testimonials grid grid-cols-1 md:grid-cols-2 gap-6 my-6'>
      {testimonials.map((item, idx) => (
        <motion.div
          key={idx}
          className='sdg-testimonial-card bg-white/60 backdrop-blur rounded-lg shadow p-6'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
          <div className='flex items-center mb-3'>
            <img
              src={item.avatar}
              alt={item.name}
              className='w-12 h-12 rounded-full mr-3'
            />
            <div>
              <div className='font-semibold'>{item.name}</div>
              <div className='text-xs text-gray-500'>{item.role}</div>
            </div>
          </div>
          <div className='text-gray-700 italic'>“{item.text}”</div>
        </motion.div>
      ))}
    </div>
  );
};

SDGGoalTestimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      role: PropTypes.string,
      text: PropTypes.string.isRequired,
    })
  ),
};

export default SDGGoalTestimonials;
