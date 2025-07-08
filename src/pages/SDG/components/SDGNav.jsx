import goals from './goals';
import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const GoalItem = ({ goal, isActive, index }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={isMobile ? 'mb-2' : 'mb-3'}
    >
      <Link
        to={goal.link}
        className={`
          block relative group rounded-xl overflow-hidden
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2
          ${
            isActive
              ? 'ring-2 ring-amber-500 shadow-lg scale-105'
              : 'hover:ring-1 hover:ring-gray-300'
          }
          ${isMobile ? 'active:scale-95' : ''}
        `}
      >
        <div className='relative'>
          <img
            src={goal.image}
            alt={goal.alt}
            className={`
              w-full h-auto transition-all duration-300
              ${
                isActive
                  ? 'brightness-110 contrast-110'
                  : 'group-hover:brightness-110 group-hover:contrast-105'
              }
            `}
            loading='lazy'
          />

          {/* Active indicator */}
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`absolute border-2 border-white shadow-md bg-amber-500 rounded-full ${
                isMobile
                  ? 'top-0.5 right-0.5 w-2.5 h-2.5'
                  : 'top-1 right-1 w-3 h-3'
              }`}
            />
          )}

          {/* Hover overlay */}
          <div
            className={`
            absolute inset-0 bg-gradient-to-t from-black/20 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            ${isActive ? 'opacity-100' : ''}
          `}
          />
        </div>
      </Link>
    </motion.div>
  );
};

GoalItem.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

const SDGNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentGoalId, setCurrentGoalId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Extract current goal ID from URL
  useEffect(() => {
    const pathMatch = location.pathname.match(/\/sdg-center\/goal\/(\d+)/);
    if (pathMatch) {
      setCurrentGoalId(parseInt(pathMatch[1]));
    } else {
      setCurrentGoalId(null);
    }
  }, [location.pathname]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      const currentIndex = goals.findIndex((goal) => goal.id === currentGoalId);

      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentIndex > 0) {
            const prevGoal = goals[currentIndex - 1];
            window.location.href = prevGoal.link;
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (currentIndex < goals.length - 1) {
            const nextGoal = goals[currentIndex + 1];
            window.location.href = nextGoal.link;
          }
          break;
        case 'Home':
          e.preventDefault();
          window.location.href = goals[0].link;
          break;
        case 'End':
          e.preventDefault();
          window.location.href = goals[goals.length - 1].link;
          break;
      }
    },
    [isOpen, currentGoalId]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Touch gesture handling for mobile
  const handleTouchStart = useCallback(
    (e) => {
      if (!isMobile) return;
      const touchStartX = e.touches[0].clientX;

      const handleTouchMove = (e) => {
        const touchCurrentX = e.touches[0].clientX;
        const deltaX = touchCurrentX - touchStartX;

        // Swipe right to close (threshold: 50px)
        if (deltaX > 50) {
          setIsOpen(false);
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        }
      };

      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    [isMobile]
  );

  // Close drawer on mobile when navigating
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [currentGoalId, isMobile, isOpen]);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={toggleDrawer}
        className={`
          fixed z-50 rounded-full
          bg-white/90 backdrop-blur-sm border border-gray-200/50
          shadow-lg hover:shadow-xl transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-amber-500/50
          ${isOpen ? 'bg-amber-50' : ''}
          ${
            isMobile
              ? 'top-4 right-4 p-4 w-14 h-14'
              : 'top-4 right-4 p-3 w-12 h-12'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close SDG Navigation' : 'Open SDG Navigation'}
      >
        <motion.svg
          width={isMobile ? '24' : '20'}
          height={isMobile ? '24' : '20'}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={isOpen ? 'text-amber-600' : 'text-gray-600'}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <path d='M18 6L6 18M6 6l12 12' />
          ) : (
            <>
              <circle cx='12' cy='12' r='3' />
              <path d='M12 1v6m0 6v6' />
              <path d='m21 12-6-3-6 3-6-3' />
            </>
          )}
        </motion.svg>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: isMobile ? 30 : 25,
              stiffness: isMobile ? 300 : 200,
            }}
            onTouchStart={handleTouchStart}
            className={`
              fixed top-0 right-0 h-full z-50
              bg-white/95 backdrop-blur-md border-l border-gray-200/50
              shadow-2xl overflow-hidden
              ${isMobile ? 'w-20 pb-safe-bottom' : 'w-24 sm:w-28'}
            `}
            style={{
              paddingBottom: isMobile ? 'env(safe-area-inset-bottom)' : '0',
            }}
          >
            {/* Header */}
            <div
              className={`border-b border-gray-200/50 ${isMobile ? 'p-2' : 'p-4'}`}
            >
              <div className='text-center'>
                <div
                  className={`font-semibold text-gray-600 uppercase tracking-wider ${
                    isMobile ? 'text-xs' : 'text-xs'
                  }`}
                >
                  SDG Goals
                </div>
                <div
                  className={`text-gray-500 mt-1 ${isMobile ? 'text-xs' : 'text-xs'}`}
                >
                  {goals.length} Goals
                </div>
              </div>
            </div>

            {/* Goals List */}
            <div
              className={`overflow-y-auto scroll-smooth ${
                isMobile ? 'p-2' : 'p-3'
              } ${currentGoalId ? 'pb-32' : 'pb-6'}`}
              style={{
                scrollSnapType: 'y mandatory',
                height: currentGoalId
                  ? isMobile
                    ? 'calc(100% - 130px)'
                    : 'calc(100% - 140px)'
                  : isMobile
                    ? 'calc(100% - 70px)'
                    : 'calc(100% - 80px)',
              }}
            >
              {goals.map((goal, index) => (
                <div key={goal.id} style={{ scrollSnapAlign: 'start' }}>
                  <GoalItem
                    goal={goal}
                    isActive={goal.id === currentGoalId}
                    index={index}
                  />
                </div>
              ))}
            </div>

            {/* Mobile Swipe Indicator */}
            {isMobile && (
              <div className='absolute top-2 left-1/2 transform -translate-x-1/2'>
                <div className='w-8 h-1 bg-gray-300 rounded-full'></div>
              </div>
            )}

            {/* Keyboard Shortcuts Hint */}
            {currentGoalId && !isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='absolute bottom-4 left-3 right-3 text-center bg-white/95 backdrop-blur-sm border-t border-gray-200/50 pt-3'
              >
                <div className='text-xs text-gray-500 bg-gray-100/80 rounded-lg p-2'>
                  <div className='font-medium mb-1'>Navigation</div>
                  <div className='space-y-1'>
                    <div>↑↓ Navigate</div>
                    <div>Esc Close</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mobile Instructions */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='absolute bottom-4 left-2 right-2 text-center'
              >
                <div className='text-xs text-gray-500 bg-gray-100/80 rounded-lg p-2'>
                  <div className='font-medium mb-1'>Swipe right to close</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SDGNav;
