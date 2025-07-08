import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  ChatBubbleLeftEllipsisIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// Enhanced TestimonialCard component with video support
const TestimonialCard = ({ testimonial, index, onVideoPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        onVideoPlay && onVideoPlay(index);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i}>
        {i < rating ? (
          <StarSolidIcon className='w-4 h-4 text-yellow-400' />
        ) : (
          <StarIcon className='w-4 h-4 text-gray-300' />
        )}
      </span>
    ));
  };

  return (
    <motion.div
      className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Video Testimonial */}
      {testimonial.videoSrc && (
        <div className='relative aspect-video bg-gray-900'>
          <video
            ref={videoRef}
            className='w-full h-full object-cover'
            poster={testimonial.thumbnail || testimonial.avatar}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            <source src={testimonial.videoSrc} type='video/mp4' />
          </video>

          {/* Video Controls */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <button
              onClick={handleVideoToggle}
              className='bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-4 transition-all duration-200 group-hover:scale-110'
            >
              {isPlaying ? (
                <PauseIcon className='w-8 h-8 text-white' />
              ) : (
                <PlayIcon className='w-8 h-8 text-white ml-1' />
              )}
            </button>
          </div>

          {/* Video Indicator */}
          <div className='absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1'>
            <SpeakerWaveIcon className='w-3 h-3' />
            Video
          </div>
        </div>
      )}

      <div className='p-6'>
        {/* Header */}
        <div className='flex items-start gap-4 mb-4'>
          <div className='relative'>
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className='w-14 h-14 rounded-full object-cover border-3 border-white shadow-lg'
            />
            {testimonial.verified && (
              <div className='absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1'>
                <svg
                  className='w-3 h-3 text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            )}
          </div>

          <div className='flex-1'>
            <div className='flex items-center justify-between'>
              <div>
                <h4 className='font-semibold text-gray-800'>
                  {testimonial.name}
                </h4>
                <p className='text-sm text-gray-500'>{testimonial.role}</p>
                {testimonial.organization && (
                  <p className='text-xs text-gray-400'>
                    {testimonial.organization}
                  </p>
                )}
              </div>

              {/* Rating */}
              {testimonial.rating && (
                <div className='flex items-center gap-1'>
                  {renderStars(testimonial.rating)}
                </div>
              )}
            </div>

            {/* Date */}
            {testimonial.date && (
              <p className='text-xs text-gray-400 mt-1'>{testimonial.date}</p>
            )}
          </div>
        </div>

        {/* Testimonial Content */}
        <div className='relative'>
          <svg
            className='absolute -top-2 -left-1 w-6 h-6 text-blue-200'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z' />
          </svg>
          <blockquote className='text-gray-700 italic leading-relaxed pl-6'>
            &quot;{testimonial.text}&quot;
          </blockquote>
        </div>

        {/* Impact Metrics */}
        {testimonial.impact && (
          <div className='mt-4 pt-4 border-t border-gray-100'>
            <div className='grid grid-cols-2 gap-3 text-center'>
              {testimonial.impact.map((metric, idx) => (
                <div key={idx} className='bg-gray-50 rounded-lg p-2'>
                  <div className='text-lg font-bold text-blue-600'>
                    {metric.value}
                  </div>
                  <div className='text-xs text-gray-600'>{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {testimonial.tags && (
          <div className='mt-4 flex flex-wrap gap-2'>
            {testimonial.tags.map((tag, idx) => (
              <span
                key={idx}
                className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    role: PropTypes.string,
    text: PropTypes.string.isRequired,
    videoSrc: PropTypes.string,
    thumbnail: PropTypes.string,
    verified: PropTypes.bool,
    organization: PropTypes.string,
    rating: PropTypes.number,
    date: PropTypes.string,
    impact: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
    featured: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onVideoPlay: PropTypes.func,
};

const SDGGoalTestimonials = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className='text-center py-12'>
        <ChatBubbleLeftEllipsisIcon className='w-16 h-16 text-gray-400 mx-auto mb-4' />
        <p className='text-gray-500 text-lg'>
          No testimonials available for this goal.
        </p>
        <p className='text-gray-400 text-sm mt-2'>
          Share your story and inspire others to take action.
        </p>
      </div>
    );
  }

  return (
    <div className='sdg-testimonials'>
      {/* Regular Testimonials Grid */}
      <div className='text-center mb-8'>
        <h3 className='text-2xl font-bold text-gray-800 mb-2'>
          Community Impact Stories
        </h3>
        <p className='text-gray-600'>
          Hear from people whose lives have been touched by our sustainable
          development initiatives
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {testimonials.map((testimonial, idx) => (
          <TestimonialCard key={idx} testimonial={testimonial} index={idx} />
        ))}
      </div>

      {/* Impact Summary */}
      <div className='mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center'>
        <h3 className='text-2xl font-bold mb-4'>Collective Impact</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <div className='text-3xl font-bold mb-2'>{testimonials.length}</div>
            <div className='text-blue-100'>Stories Shared</div>
          </div>
          <div>
            <div className='text-3xl font-bold mb-2'>
              {Math.round(
                (testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) /
                  testimonials.length) *
                  10
              ) / 10}
            </div>
            <div className='text-blue-100'>Average Rating</div>
          </div>
          <div>
            <div className='text-3xl font-bold mb-2'>
              {testimonials.filter((t) => t.videoSrc).length}
            </div>
            <div className='text-blue-100'>Video Testimonials</div>
          </div>
        </div>
      </div>
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
      videoSrc: PropTypes.string,
      thumbnail: PropTypes.string,
      verified: PropTypes.bool,
      organization: PropTypes.string,
      rating: PropTypes.number,
      date: PropTypes.string,
      impact: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
      tags: PropTypes.arrayOf(PropTypes.string),
      featured: PropTypes.bool,
    })
  ),
};

export default SDGGoalTestimonials;
