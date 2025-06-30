import { Link } from 'react-router-dom';
import { useColleges } from '../../hooks/useColleges';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowTopRightOnSquareIcon,
  InformationCircleIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ChevronRightIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Offerings({ collegeKey }) {
  const { colleges, programs, faculty, loading, error } = useColleges();
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'cards'
  const lang = 'en';

  // Check if mobile/tablet
  const isMobile = window.innerWidth < 768;

  // Find the college by slug/shortName/id (support both string and object for shortName)
  const college = colleges.find(
    (col) =>
      col.slug === collegeKey ||
      (typeof col.shortName === 'object' &&
        Object.values(col.shortName).includes(collegeKey)) ||
      col.shortName === collegeKey ||
      String(col.id) === collegeKey
  );

  // Get programIds from the college
  const programIds = college?.programIds || [];
  // Get the program objects for this college
  const collegePrograms = programs.filter((p) => programIds.includes(p.id));

  // Get faculty for this college
  const collegeFaculty =
    faculty?.filter((f) => f.collegeId === college?.id) || [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!college) return <div>No offerings available for this college.</div>;
  if (!collegePrograms.length) {
    return <div>No offerings available for this college.</div>;
  }

  // Get featured faculty for each program (random selection for demo)
  const getFeaturedFaculty = () => {
    return collegeFaculty.slice(0, 2); // Get first 2 faculty members
  };

  // Mock statistics (placeholder for future real data)
  const getStatistics = () => ({
    enrollment: Math.floor(Math.random() * 200) + 50,
    graduationRate: Math.floor(Math.random() * 30) + 70,
    employmentRate: Math.floor(Math.random() * 20) + 80,
  });

  // Enhanced program card component
  const ProgramCard = ({ offering, isSwiper = false }) => {
    const stats = getStatistics();
    const featuredFaculty = getFeaturedFaculty();

    return (
      <div
        className={`group cursor-pointer bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80 will-change-transform overflow-hidden ${
          isSwiper ? 'h-full' : ''
        }`}
        style={{
          borderColor: `var(--${collegeKey}-primary-700, #660033)15`,
        }}
      >
        {/* Program Image */}
        <div className='relative overflow-hidden'>
          <img
            src={offering.imageUrl || 'https://placehold.co/600x400'}
            alt={offering.name?.[lang] || offering.name}
            className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          <div className='absolute top-4 right-4'>
            <div
              className='w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30'
              style={{
                background: `linear-gradient(135deg, var(--${collegeKey}-primary-700, #660033)20, var(--${collegeKey}-primary-700, #660033)10)`,
              }}
            >
              <AcademicCapIcon className='w-5 h-5 text-white' />
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className='p-6'>
          <div className='flex items-start justify-between mb-3'>
            <h3 className='text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2'>
              {offering.name?.[lang] || offering.name}
            </h3>
            {offering.version && (
              <span
                className='text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ml-2'
                style={{
                  background: `var(--${collegeKey}-primary-700, #660033)10`,
                  color: `var(--${collegeKey}-primary-700, #660033)`,
                }}
              >
                {offering.version}
              </span>
            )}
          </div>

          <p className='text-gray-600 text-sm line-clamp-3 mb-4'>
            {offering.description?.[lang] ||
              offering.description ||
              'Comprehensive program designed to prepare students for success in their chosen field.'}
          </p>

          {/* Statistics */}
          <div className='grid grid-cols-3 gap-2 mb-4'>
            <div className='text-center p-2 bg-white/50 rounded-lg'>
              <div className='flex items-center justify-center mb-1'>
                <UserGroupIcon className='w-4 h-4 text-gray-600' />
              </div>
              <div className='text-sm font-medium text-gray-900'>
                {stats.enrollment}
              </div>
              <div className='text-xs text-gray-500'>Students</div>
            </div>
            <div className='text-center p-2 bg-white/50 rounded-lg'>
              <div className='flex items-center justify-center mb-1'>
                <ChartBarIcon className='w-4 h-4 text-gray-600' />
              </div>
              <div className='text-sm font-medium text-gray-900'>
                {stats.graduationRate}%
              </div>
              <div className='text-xs text-gray-500'>Graduation</div>
            </div>
            <div className='text-center p-2 bg-white/50 rounded-lg'>
              <div className='flex items-center justify-center mb-1'>
                <ChartBarIcon className='w-4 h-4 text-gray-600' />
              </div>
              <div className='text-sm font-medium text-gray-900'>
                {stats.employmentRate}%
              </div>
              <div className='text-xs text-gray-500'>Employment</div>
            </div>
          </div>

          {/* Featured Faculty */}
          {featuredFaculty.length > 0 && (
            <div className='mb-4'>
              <div className='text-xs font-medium text-gray-600 mb-2'>
                Featured Faculty
              </div>
              <div className='flex -space-x-2'>
                {featuredFaculty.map((member) => (
                  <div
                    key={member.id}
                    className='w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden relative'
                    title={member.name}
                  >
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div
                        className='w-full h-full flex items-center justify-center text-xs font-medium'
                        style={{
                          background: `var(--${collegeKey}-primary-700, #660033)20`,
                        }}
                      >
                        {member.name?.charAt(0) || 'F'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex gap-2'>
            <button
              className='flex-1 px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 text-sm'
              style={{
                background: `linear-gradient(135deg, var(--${collegeKey}-primary-700, #660033), var(--${collegeKey}-primary-600, #80004d))`,
              }}
            >
              <span className='flex items-center justify-center gap-2'>
                <ArrowTopRightOnSquareIcon className='w-4 h-4' />
                Apply Now
              </span>
            </button>
            <button
              className='px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 text-sm border border-gray-200'
              style={{
                background: `var(--${collegeKey}-primary-700, #660033)10`,
                color: `var(--${collegeKey}-primary-700, #660033)`,
              }}
            >
              <InformationCircleIcon className='w-4 h-4' />
            </button>
          </div>

          {/* Learn More Link */}
          {offering.link && (
            <Link
              to={offering.link}
              className='mt-3 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline'
              style={{ color: `var(--${collegeKey}-primary-700, #660033)` }}
            >
              Learn More
              <ChevronRightIcon className='w-4 h-4' />
            </Link>
          )}
        </div>
      </div>
    );
  };

  // PropTypes for ProgramCard
  ProgramCard.propTypes = {
    offering: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      imageUrl: PropTypes.string,
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      version: PropTypes.string,
      description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      link: PropTypes.string,
    }).isRequired,
    isSwiper: PropTypes.bool,
  };

  return (
    <div className='space-y-6'>
      {/* Breadcrumb Navigation */}
      <nav className='flex items-center space-x-2 text-sm text-gray-600'>
        <HomeIcon className='w-4 h-4' />
        <span>Home</span>
        <ChevronRightIcon className='w-4 h-4' />
        <span>Colleges</span>
        <ChevronRightIcon className='w-4 h-4' />
        <span className='capitalize'>
          {college.name?.[lang] || college.name}
        </span>
        <ChevronRightIcon className='w-4 h-4' />
        <span className='text-gray-900 font-medium'>Programs</span>
      </nav>

      {/* Header with View Mode Toggle */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>
            Program Offerings
          </h2>
          <p className='text-gray-600 max-w-2xl'>
            Explore our diverse range of programs designed to equip you with the
            skills and knowledge needed for a successful career in your chosen
            field.
          </p>
        </div>

        {/* View Mode Toggle - Hidden on Mobile */}
        <div className='hidden md:flex gap-2 bg-white/60 backdrop-blur-sm rounded-lg p-1 border border-gray-200/60'>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              viewMode === 'grid'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Squares2X2Icon className='w-4 h-4' />
            Grid
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              viewMode === 'cards'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ViewColumnsIcon className='w-4 h-4' />
            Cards
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              viewMode === 'list'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ListBulletIcon className='w-4 h-4' />
            List
          </button>
        </div>
      </div>

      {/* Mobile Swiper View */}
      {isMobile ? (
        <div className='md:hidden'>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className='!pb-12'
          >
            {collegePrograms.map((offering) => (
              <SwiperSlide key={offering.id}>
                <ProgramCard offering={offering} isSwiper={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        /* Desktop Views */
        <>
          {viewMode === 'grid' && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {collegePrograms.map((offering) => (
                <ProgramCard key={offering.id} offering={offering} />
              ))}
            </div>
          )}

          {viewMode === 'cards' && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {collegePrograms.map((offering) => (
                <ProgramCard key={offering.id} offering={offering} />
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className='space-y-6'>
              {collegePrograms.map((offering) => {
                const stats = getStatistics();

                return (
                  <div
                    key={offering.id}
                    className='group bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200/60 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]'
                    style={{
                      borderColor: `var(--${collegeKey}-primary-700, #660033)15`,
                    }}
                  >
                    <div className='flex gap-6'>
                      <img
                        src={
                          offering.imageUrl || 'https://placehold.co/200x150'
                        }
                        alt={offering.name?.[lang] || offering.name}
                        className='w-32 h-24 object-cover rounded-lg flex-shrink-0'
                      />
                      <div className='flex-1'>
                        <div className='flex items-start justify-between mb-2'>
                          <h3 className='text-xl font-semibold text-gray-900'>
                            {offering.name?.[lang] || offering.name}
                          </h3>
                          {offering.version && (
                            <span
                              className='text-xs font-medium px-2 py-1 rounded-full'
                              style={{
                                background: `var(--${collegeKey}-primary-700, #660033)10`,
                                color: `var(--${collegeKey}-primary-700, #660033)`,
                              }}
                            >
                              {offering.version}
                            </span>
                          )}
                        </div>
                        <p className='text-gray-600 mb-4 line-clamp-2'>
                          {offering.description?.[lang] ||
                            offering.description ||
                            'Comprehensive program designed to prepare students for success.'}
                        </p>

                        <div className='flex items-center justify-between'>
                          <div className='flex gap-4 text-sm text-gray-600'>
                            <span className='flex items-center gap-1'>
                              <UserGroupIcon className='w-4 h-4' />
                              {stats.enrollment} students
                            </span>
                            <span className='flex items-center gap-1'>
                              <ChartBarIcon className='w-4 h-4' />
                              {stats.graduationRate}% graduation
                            </span>
                          </div>

                          <div className='flex gap-2'>
                            <button
                              className='px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 text-sm'
                              style={{
                                background: `linear-gradient(135deg, var(--${collegeKey}-primary-700, #660033), var(--${collegeKey}-primary-600, #80004d))`,
                              }}
                            >
                              Apply Now
                            </button>
                            <button
                              className='px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm'
                              style={{
                                background: `var(--${collegeKey}-primary-700, #660033)10`,
                                color: `var(--${collegeKey}-primary-700, #660033)`,
                              }}
                            >
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// PropTypes definitions
Offerings.propTypes = {
  collegeKey: PropTypes.string.isRequired,
};

export default Offerings;
