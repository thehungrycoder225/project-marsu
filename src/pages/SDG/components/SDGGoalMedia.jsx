import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  PhotoIcon,
  VideoCameraIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const MediaLightbox = ({ media, currentIndex, onClose, onNext, onPrev }) => {
  const currentItem = media[currentIndex];

  if (!currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors'
        >
          <XMarkIcon className='w-6 h-6 text-white' />
        </button>

        {/* Navigation Buttons */}
        {media.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className='absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors'
            >
              <ChevronLeftIcon className='w-6 h-6 text-white' />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className='absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors'
            >
              <ChevronRightIcon className='w-6 h-6 text-white' />
            </button>
          </>
        )}

        {/* Media Content */}
        <motion.div
          className='max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {currentItem.type === 'image' && (
            <img
              src={currentItem.src}
              alt={currentItem.alt || ''}
              className='max-w-full max-h-full object-contain rounded-lg shadow-2xl'
            />
          )}
          {currentItem.type === 'video' && (
            <video
              controls
              className='max-w-full max-h-full rounded-lg shadow-2xl'
              autoPlay
            >
              <source src={currentItem.src} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          )}
          {currentItem.type === 'infographic' && (
            <img
              src={currentItem.src}
              alt={currentItem.alt || ''}
              className='max-w-full max-h-full object-contain rounded-lg shadow-2xl'
            />
          )}
        </motion.div>

        {/* Media Info */}
        <div className='absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-4 text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='font-semibold'>
                {currentItem.title || 'Media Item'}
              </h3>
              {currentItem.description && (
                <p className='text-sm text-gray-300 mt-1'>
                  {currentItem.description}
                </p>
              )}
            </div>
            <div className='text-sm text-gray-300'>
              {currentIndex + 1} of {media.length}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

MediaLightbox.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['image', 'video', 'infographic']).isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      thumbnail: PropTypes.string,
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

const SDGGoalMedia = ({ media }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!media || media.length === 0) {
    return (
      <div className='text-center py-12'>
        <PhotoIcon className='w-16 h-16 text-gray-400 mx-auto mb-4' />
        <p className='text-gray-500 text-lg'>
          No media available for this goal.
        </p>
      </div>
    );
  }

  const categories = [
    { id: 'all', label: 'All Media', icon: FunnelIcon },
    { id: 'image', label: 'Images', icon: PhotoIcon },
    { id: 'video', label: 'Videos', icon: VideoCameraIcon },
    { id: 'infographic', label: 'Infographics', icon: ChartBarIcon },
  ];

  const filteredMedia =
    selectedCategory === 'all'
      ? media
      : media.filter((item) => item.type === selectedCategory);

  const openLightbox = (index) => {
    const actualIndex = media.findIndex(
      (item) => item === filteredMedia[index]
    );
    setLightboxIndex(actualIndex);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const nextMedia = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % media.length);
    }
  };

  const prevMedia = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === 0 ? media.length - 1 : lightboxIndex - 1
      );
    }
  };

  return (
    <div className='sdg-media-gallery'>
      {/* Category Filter */}
      <div className='mb-8'>
        <div className='flex flex-wrap gap-3 justify-center'>
          {categories.map((category) => {
            const Icon = category.icon;
            const count =
              category.id === 'all'
                ? media.length
                : media.filter((item) => item.type === category.id).length;

            if (count === 0 && category.id !== 'all') return null;

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white/20 backdrop-blur-sm text-gray-700 hover:bg-white/30 hover:text-gray-900'
                }`}
              >
                <Icon className='w-4 h-4' />
                <span>{category.label}</span>
                <span className='bg-white/20 px-2 py-1 rounded-full text-xs'>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Media Grid */}
      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        layout
      >
        <AnimatePresence>
          {filteredMedia.map((item, idx) => (
            <motion.div
              key={`${item.src}-${idx}`}
              className='group relative bg-white/70 backdrop-blur rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer'
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(idx)}
            >
              {/* Media Preview */}
              <div className='aspect-[4/3] relative overflow-hidden'>
                {item.type === 'image' && (
                  <img
                    src={item.src}
                    alt={item.alt || ''}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                )}
                {item.type === 'video' && (
                  <>
                    <video
                      className='w-full h-full object-cover'
                      poster={item.thumbnail}
                    >
                      <source src={item.src} type='video/mp4' />
                    </video>
                    <div className='absolute inset-0 bg-black/20 flex items-center justify-center'>
                      <VideoCameraIcon className='w-12 h-12 text-white drop-shadow-lg' />
                    </div>
                  </>
                )}
                {item.type === 'infographic' && (
                  <>
                    <img
                      src={item.src}
                      alt={item.alt || ''}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                    <div className='absolute top-2 right-2'>
                      <div className='bg-gradient-to-r from-green-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium'>
                        Infographic
                      </div>
                    </div>
                  </>
                )}

                {/* Hover Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                {/* View Button */}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg'>
                    <PhotoIcon className='w-6 h-6 text-gray-700' />
                  </div>
                </div>
              </div>

              {/* Media Info */}
              {(item.title || item.description) && (
                <div className='p-4'>
                  {item.title && (
                    <h3 className='font-semibold text-gray-800 mb-1'>
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p className='text-sm text-gray-600 line-clamp-2'>
                      {item.description}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredMedia.length === 0 && selectedCategory !== 'all' && (
        <motion.div
          className='text-center py-12'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className='text-gray-400 mb-4'>
            {categories.find((c) => c.id === selectedCategory)?.icon && (
              <div className='w-16 h-16 mx-auto mb-4'>
                {(() => {
                  const Icon = categories.find(
                    (c) => c.id === selectedCategory
                  ).icon;
                  return <Icon className='w-full h-full' />;
                })()}
              </div>
            )}
          </div>
          <p className='text-gray-500 text-lg'>
            No {selectedCategory} content available for this goal.
          </p>
        </motion.div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <MediaLightbox
          media={media}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextMedia}
          onPrev={prevMedia}
        />
      )}
    </div>
  );
};

SDGGoalMedia.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['image', 'video', 'infographic']).isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      thumbnail: PropTypes.string,
    })
  ),
};

export default SDGGoalMedia;
