import { useScrollAnimations } from '../hooks/useScrollAnimation';
import PropTypes from 'prop-types';

const StatsCard = ({ icon, value, label, delay = 0 }) => {
  const { getRef, isVisible } = useScrollAnimations(1);

  return (
    <div
      ref={getRef(0)}
      className={`bg-white/80 backdrop-blur rounded-lg shadow-md p-6 text-center transform transition-all duration-700 hover:scale-105 hover:shadow-lg border border-white/20 group ${
        isVisible(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className='flex flex-col items-center'>
        {/* Icon */}
        <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-200 transition-colors'>
          {icon}
        </div>

        {/* Value with count-up animation */}
        <div className='text-2xl font-bold text-primary-700 mb-1'>
          {value || '—'}
        </div>

        {/* Label */}
        <div className='text-xs text-gray-600 font-medium'>{label}</div>
      </div>
    </div>
  );
};

const StatsGrid = ({ stats, collegeFaculty, college }) => {
  const statsData = [
    {
      icon: (
        <svg
          className='w-6 h-6 text-primary-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
      ),
      value: stats.founded || '—',
      label: 'Founded',
    },
    {
      icon: (
        <svg
          className='w-6 h-6 text-primary-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
          />
        </svg>
      ),
      value: stats.programs || college.programIds?.length || '—',
      label: 'Programs',
    },
    {
      icon: (
        <svg
          className='w-6 h-6 text-primary-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
          />
        </svg>
      ),
      value: stats.accreditation ? `Level ${stats.accreditation}` : '—',
      label: 'Accreditation Level',
    },
    {
      icon: (
        <svg
          className='w-6 h-6 text-primary-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
      ),
      value: collegeFaculty.length,
      label: 'Faculty Members',
    },
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          delay={index * 100}
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
