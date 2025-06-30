import { Link } from 'react-router-dom';
import { useColleges } from '../hooks/useColleges';
import { useState } from 'react';
import PropTypes from 'prop-types';

// Skeleton loader component
const ProgramCardSkeleton = () => (
  <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-pulse'>
    <div className='p-6'>
      <div className='h-6 bg-gray-200 rounded mb-2'></div>
      <div className='h-4 bg-gray-200 rounded mb-4'></div>
      <div className='flex justify-between items-center mb-4'>
        <div className='h-4 bg-gray-200 rounded w-20'></div>
        <div className='h-4 bg-gray-200 rounded w-16'></div>
      </div>
      <div className='h-10 bg-gray-200 rounded'></div>
    </div>
  </div>
);

// Error state component
const ErrorState = ({ onRetry }) => (
  <div className='col-span-full flex flex-col items-center justify-center py-16 px-4'>
    <div className='text-red-500 mb-4'>
      <svg
        className='w-16 h-16 mx-auto'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z'
        />
      </svg>
    </div>
    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
      Failed to load programs
    </h3>
    <p className='text-gray-600 mb-6 text-center max-w-md'>
      We encountered an error while loading the program offerings. Please try
      again.
    </p>
    <button
      onClick={onRetry}
      className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium'
    >
      Try Again
    </button>
  </div>
);

ErrorState.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

// Empty state component
const EmptyState = () => (
  <div className='col-span-full flex flex-col items-center justify-center py-16 px-4'>
    <div className='text-gray-400 mb-6'>
      <svg
        className='w-24 h-24 mx-auto'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
        />
      </svg>
    </div>
    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
      No Programs Available
    </h3>
    <p className='text-gray-600 text-center max-w-md'>
      There are currently no program offerings available. Please check back
      later or contact us for more information.
    </p>
  </div>
);

// Program comparison modal component
const ComparisonModal = ({ programs, onClose }) => {
  if (!programs.length) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl max-w-6xl max-h-[90vh] overflow-y-auto w-full'>
        <div className='sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center'>
          <h3 className='text-xl font-semibold'>Compare Programs</h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <div className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {programs.map((program) => (
              <div key={program.id} className='border rounded-lg p-4'>
                <img
                  src={
                    program.image ||
                    program.college?.imageUrl ||
                    'https://placehold.co/600x400'
                  }
                  alt={program.name}
                  className='w-full h-32 object-cover rounded-lg mb-4'
                />
                <h4 className='font-semibold text-lg mb-2'>{program.name}</h4>
                <div className='space-y-2 text-sm'>
                  <p>
                    <span className='font-medium'>College:</span>{' '}
                    {program.college?.name}
                  </p>
                  <p>
                    <span className='font-medium'>Duration:</span>{' '}
                    {program.duration || '4 years'}
                  </p>
                  <p>
                    <span className='font-medium'>Credits:</span>{' '}
                    {program.credits || '120 units'}
                  </p>
                  <p>
                    <span className='font-medium'>Degree:</span>{' '}
                    {program.degreeType || 'Bachelor&apos;s Degree'}
                  </p>
                  <p>
                    <span className='font-medium'>Status:</span>
                    <span
                      className={`ml-1 px-2 py-1 rounded-full text-xs ${
                        program.enrollmentStatus === 'Open'
                          ? 'bg-green-100 text-green-800'
                          : program.enrollmentStatus === 'Limited'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {program.enrollmentStatus || 'Open'}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ComparisonModal.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string,
      college: PropTypes.shape({
        name: PropTypes.string,
        imageUrl: PropTypes.string,
      }),
      duration: PropTypes.string,
      credits: PropTypes.string,
      degreeType: PropTypes.string,
      enrollmentStatus: PropTypes.string,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

const AllProgramOfferings = ({ collegeKey = null }) => {
  const { colleges, programs, loading, error } = useColleges();
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Combine programs with their college information
  const allPrograms =
    programs?.map((program) => {
      const college = colleges?.find((c) => c.programIds?.includes(program.id));
      return {
        ...program,
        college,
        name: program.name?.en || program.name,
        description: program.description?.en || program.description,
      };
    }) || [];

  // Filter programs by college if collegeKey is provided
  const collegePrograms = collegeKey
    ? allPrograms.filter((program) => {
        const college = program.college;
        return (
          college &&
          (college.slug === collegeKey ||
            (typeof college.shortName === 'object' &&
              Object.values(college.shortName).includes(collegeKey)) ||
            college.shortName === collegeKey ||
            String(college.id) === collegeKey)
        );
      })
    : allPrograms;

  // Filter programs based on search term
  const filteredPrograms = collegePrograms.filter((program) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      program.name?.toLowerCase().includes(searchLower) ||
      program.description?.toLowerCase().includes(searchLower) ||
      program.college?.name?.toLowerCase().includes(searchLower)
    );
  });

  const toggleProgramSelection = (program) => {
    setSelectedPrograms((prev) => {
      const isSelected = prev.some((p) => p.id === program.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== program.id);
      } else if (prev.length < 3) {
        return [...prev, program];
      }
      return prev;
    });
  };

  const getEnrollmentStatus = (program) => {
    // Simulate enrollment status (in real app, this would come from API)
    const statuses = ['Open', 'Limited', 'Closed'];
    const index = program.id ? program.id.toString().length % 3 : 0;
    return statuses[index];
  };

  const handleCompare = () => {
    if (selectedPrograms.length >= 2) {
      setShowComparison(true);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <section className='py-16 bg-gradient-to-br from-gray-50 to-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Program Offerings
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Discover our comprehensive range of academic programs designed to
              prepare you for success
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[...Array(6)].map((_, index) => (
              <ProgramCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='py-16 bg-gradient-to-br from-gray-50 to-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Program Offerings
            </h2>
          </div>
          <div className='grid grid-cols-1'>
            <ErrorState onRetry={handleRetry} />
          </div>
        </div>
      </section>
    );
  }

  if (!collegePrograms || collegePrograms.length === 0) {
    return (
      <section className='py-16 bg-gradient-to-br from-gray-50 to-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Program Offerings
            </h2>
          </div>
          <div className='grid grid-cols-1'>
            <EmptyState />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 bg-gradient-to-br from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            {collegeKey ? 'Program Offerings' : 'All Program Offerings'}
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            {collegeKey
              ? 'Explore our specialized programs designed to advance your career in this field'
              : 'Discover our comprehensive range of academic programs designed to prepare you for success across all colleges'}
          </p>
        </div>

        {/* Search Bar */}
        <div className='max-w-md mx-auto mb-8'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='h-5 w-5 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              type='text'
              placeholder='Search programs, colleges...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500'
            />
          </div>
        </div>

        {/* Compare Programs Bar */}
        {selectedPrograms.length > 0 && (
          <div className='mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
              <div className='flex items-center gap-2 flex-wrap'>
                <span className='text-blue-700 font-medium'>
                  {selectedPrograms.length} program
                  {selectedPrograms.length !== 1 ? 's' : ''} selected
                </span>
                {selectedPrograms.map((program) => (
                  <span
                    key={program.id}
                    className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1'
                  >
                    {program.name}
                    <button
                      onClick={() => toggleProgramSelection(program)}
                      className='text-blue-600 hover:text-blue-800 ml-1'
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => setSelectedPrograms([])}
                  className='text-blue-600 hover:text-blue-800 font-medium'
                >
                  Clear All
                </button>
                <button
                  onClick={handleCompare}
                  disabled={selectedPrograms.length < 2}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPrograms.length >= 2
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Compare Programs
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Programs Grid */}
        {filteredPrograms.length === 0 && searchTerm ? (
          <div className='text-center py-16'>
            <div className='text-gray-400 mb-4'>
              <svg
                className='w-16 h-16 mx-auto'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              No programs found
            </h3>
            <p className='text-gray-600 mb-4'>
              No programs match your search for &quot;{searchTerm}&quot;
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className='text-blue-600 hover:text-blue-700 font-medium'
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredPrograms.map((program) => {
              const isSelected = selectedPrograms.some(
                (p) => p.id === program.id
              );
              const enrollmentStatus = getEnrollmentStatus(program);

              return (
                <div
                  key={program.id}
                  className={`group bg-white rounded-xl shadow-lg hover:shadow-xl border transition-all duration-300 overflow-hidden transform hover:-translate-y-1 ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {/* Program Image */}
                  <div className='relative aspect-[16/9] overflow-hidden'>
                    <img
                      src={
                        program.image ||
                        program.college?.imageUrl ||
                        'https://placehold.co/600x400'
                      }
                      alt={program.name}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                    {/* Selection Checkbox */}
                    <div className='absolute top-4 right-4'>
                      <button
                        onClick={() => toggleProgramSelection(program)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className='w-4 h-4'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Enrollment Status Badge */}
                    <div className='absolute top-4 left-4'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          enrollmentStatus === 'Open'
                            ? 'bg-green-100 text-green-800'
                            : enrollmentStatus === 'Limited'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {enrollmentStatus}
                      </span>
                    </div>

                    {/* College Badge */}
                    <div className='absolute bottom-4 left-4'>
                      <span className='bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium'>
                        {program.college?.shortName?.en ||
                          program.college?.shortName}
                      </span>
                    </div>
                  </div>

                  {/* Program Content */}
                  <div className='p-6'>
                    <h3 className='text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>
                      {program.name}
                    </h3>
                    <p className='text-gray-600 mb-4 line-clamp-2'>
                      {program.description ||
                        `Comprehensive ${program.name} program designed to provide students with essential knowledge and skills.`}
                    </p>

                    {/* Program Details */}
                    <div className='flex flex-wrap gap-4 text-sm text-gray-500 mb-4'>
                      <div className='flex items-center gap-1'>
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        4 years
                      </div>
                      <div className='flex items-center gap-1'>
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          />
                        </svg>
                        120 units
                      </div>
                      <div className='flex items-center gap-1'>
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 14l9-5-9-5-9 5 9 5z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'
                          />
                        </svg>
                        Bachelor&apos;s
                      </div>
                    </div>

                    {/* College Info */}
                    <div className='mb-4 text-sm text-gray-600'>
                      <span className='font-medium'>
                        {program.college?.name}
                      </span>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={
                        program.college
                          ? `/colleges/${program.college.slug || program.college.shortName?.en?.toLowerCase()}/programs/${program.id}`
                          : '#'
                      }
                      className='block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md'
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Comparison Modal */}
        {showComparison && (
          <ComparisonModal
            programs={selectedPrograms.map((program) => ({
              ...program,
              duration: '4 years',
              credits: '120 units',
              degreeType: 'Bachelor&apos;s Degree',
              enrollmentStatus: getEnrollmentStatus(program),
            }))}
            onClose={() => setShowComparison(false)}
          />
        )}
      </div>
    </section>
  );
};

AllProgramOfferings.propTypes = {
  collegeKey: PropTypes.string,
};

export default AllProgramOfferings;
