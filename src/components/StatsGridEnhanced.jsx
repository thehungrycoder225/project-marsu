import { useScrollAnimations } from '../hooks/useScrollAnimation';
import { useTheme } from '../hooks/useTheme';
import AnimatedCounter from './AnimatedCounter';
import PropTypes from 'prop-types';

const StatsCard = ({ icon, value, label, delay = 0 }) => {
  const { getRef, isVisible } = useScrollAnimations(1);
  const { getGlassStyle, currentTheme } = useTheme();

  return (
    <div
      ref={getRef(0)}
      className={`relative overflow-hidden rounded-2xl p-6 text-center transform transition-all duration-700 hover-lift hover-glow group cursor-pointer mobile-touch-feedback ${
        isVisible(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        ...getGlassStyle(0.15),
      }}
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, 
            rgba(${currentTheme.primary.r}, ${currentTheme.primary.g}, ${currentTheme.primary.b}, 0.1),
            rgba(${currentTheme.secondary.r}, ${currentTheme.secondary.g}, ${currentTheme.secondary.b}, 0.1),
            rgba(${currentTheme.accent.r}, ${currentTheme.accent.g}, ${currentTheme.accent.b}, 0.1))`,
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute top-2 right-2 w-8 h-8 rounded-full opacity-10 animate-float group-hover:animate-particle-float"
        style={{
          background: `radial-gradient(circle, rgba(${currentTheme.accent.r}, ${currentTheme.accent.g}, ${currentTheme.accent.b}, 0.3) 0%, transparent 70%)`,
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Enhanced Icon Container */}
        <div className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 theme-glass-secondary`}>
          <div className="absolute inset-0 rounded-full animate-morph opacity-20"
            style={{
              background: `conic-gradient(from 0deg, rgba(${currentTheme.primary.r}, ${currentTheme.primary.g}, ${currentTheme.primary.b}, 0.2), transparent, rgba(${currentTheme.primary.r}, ${currentTheme.primary.g}, ${currentTheme.primary.b}, 0.2))`,
            }}
          />
          <div className="relative z-10">{icon}</div>
        </div>
        
        {/* Animated Value */}
        <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-100 dark:to-white">
          {typeof value === 'number' && value > 0 ? (
            <AnimatedCounter end={value} duration={2000} />
          ) : (
            value || '—'
          )}
        </div>
        
        {/* Enhanced Label */}
        <div className="text-sm font-medium text-gray-600 dark:text-gray-300 tracking-wide">
          {label}
        </div>

        {/* Subtle shine effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`,
          }}
        />
      </div>
    </div>
  );
};

const StatsGrid = ({ stats, collegeFaculty, college }) => {
  const statsData = [
    {
      icon: (
        <svg className='w-8 h-8 text-blue-600 dark:text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
        </svg>
      ),
      value: stats.founded || '—',
      label: 'Founded'
    },
    {
      icon: (
        <svg className='w-8 h-8 text-emerald-600 dark:text-emerald-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
        </svg>
      ),
      value: parseInt(stats.programs) || parseInt(college.programIds?.length) || 0,
      label: 'Programs'
    },
    {
      icon: (
        <svg className='w-8 h-8 text-amber-600 dark:text-amber-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' />
        </svg>
      ),
      value: stats.accreditation ? `Level ${stats.accreditation}` : '—',
      label: 'Accreditation'
    },
    {
      icon: (
        <svg className='w-8 h-8 text-purple-600 dark:text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
        </svg>
      ),
      value: collegeFaculty.length,
      label: 'Faculty Members'
    }
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          delay={index * 150}
        />
      ))}
    </div>
  );
};

StatsCard.propTypes = {
  icon: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

StatsGrid.propTypes = {
  stats: PropTypes.object.isRequired,
  collegeFaculty: PropTypes.array.isRequired,
  college: PropTypes.object.isRequired,
};

export { StatsCard, StatsGrid };
export default StatsGrid;
