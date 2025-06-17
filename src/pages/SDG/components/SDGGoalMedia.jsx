import React from 'react';
import PropTypes from 'prop-types';

const SDGGoalMedia = ({ media }) => {
  if (!media || media.length === 0) return null;
  return (
    <div className='sdg-media-gallery grid grid-cols-1 md:grid-cols-2 gap-4 my-6'>
      {media.map((item, idx) => (
        <div
          key={idx}
          className='sdg-media-item rounded-lg overflow-hidden shadow'
        >
          {item.type === 'image' && (
            <img
              src={item.src}
              alt={item.alt || ''}
              className='w-full h-auto object-cover'
            />
          )}
          {item.type === 'video' && (
            <video controls className='w-full h-auto'>
              <source src={item.src} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          )}
          {item.type === 'infographic' && (
            <img
              src={item.src}
              alt={item.alt || ''}
              className='w-full h-auto object-cover'
            />
          )}
        </div>
      ))}
    </div>
  );
};

SDGGoalMedia.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['image', 'video', 'infographic']).isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
};

export default SDGGoalMedia;
