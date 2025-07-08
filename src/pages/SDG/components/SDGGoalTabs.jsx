import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const SkeletonLoader = () => (
  <div className='animate-pulse space-y-4'>
    <div className='h-4 bg-gray-300 rounded w-3/4'></div>
    <div className='h-4 bg-gray-300 rounded w-1/2'></div>
    <div className='h-4 bg-gray-300 rounded w-5/6'></div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
      <div className='h-32 bg-gray-300 rounded-lg'></div>
      <div className='h-32 bg-gray-300 rounded-lg'></div>
    </div>
  </div>
);

const SDGGoalTabs = ({ tabs }) => {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (newIndex) => {
    if (newIndex === active) return;

    setIsLoading(true);
    setTimeout(() => {
      setActive(newIndex);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className='sdg-tabs my-8'>
      {/* Enhanced Tab Navigation */}
      <div className='relative mb-8'>
        <div className='flex gap-1 bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20'>
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              className={`relative px-6 py-3 font-medium rounded-lg transition-all duration-300 flex-1 text-center ${
                active === idx
                  ? 'text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => handleTabChange(idx)}
            >
              {/* Active tab background */}
              {active === idx && (
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg'
                  layoutId='activeTab'
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Tab label */}
              <span className='relative z-10 font-semibold'>{tab.label}</span>

              {/* Active indicator */}
              {active === idx && (
                <motion.div
                  className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full'
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content with Animation */}
      <div className='sdg-tab-content min-h-[400px]'>
        <AnimatePresence mode='wait'>
          {isLoading ? (
            <motion.div
              key='loading'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SkeletonLoader />
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {tabs[active].content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

SDGGoalTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default SDGGoalTabs;
