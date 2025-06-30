import { useState } from 'react';
import PropTypes from 'prop-types';

const FacultyModal = ({ faculty, isOpen, onClose }) => {
  if (!isOpen || !faculty) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        {/* Background overlay */}
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='w-full'>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
                  aria-label='Close modal'
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

                {/* Faculty photo and basic info */}
                <div className='flex flex-col sm:flex-row gap-4 mb-6'>
                  <img
                    src={faculty.image || '/default-avatar.png'}
                    alt={`${faculty.name} profile photo`}
                    className='w-24 h-24 object-cover rounded-full border-4 border-primary-200 shadow-md mx-auto sm:mx-0 flex-shrink-0'
                    onError={(e) => {
                      e.target.src = '/default-avatar.png';
                    }}
                  />
                  <div className='text-center sm:text-left'>
                    <h3 className='text-xl font-bold text-gray-900 mb-1'>
                      {faculty.name}
                    </h3>
                    <p className='text-primary-600 font-medium mb-1'>
                      {faculty.designation}
                    </p>
                    {faculty.academicrank && (
                      <p className='text-gray-600 text-sm mb-2'>
                        {faculty.academicrank}
                      </p>
                    )}
                    {faculty.email && (
                      <a
                        href={`mailto:${faculty.email}`}
                        className='text-primary-700 hover:text-primary-900 hover:underline text-sm transition-colors'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {faculty.email}
                      </a>
                    )}
                  </div>
                </div>

                {/* Educational Attainment */}
                {faculty.educationalAttainment &&
                  faculty.educationalAttainment.length > 0 && (
                    <div className='mb-4'>
                      <h4 className='text-lg font-semibold text-gray-800 mb-2'>
                        Educational Background
                      </h4>
                      <ul className='space-y-1'>
                        {faculty.educationalAttainment.map((edu, index) => (
                          <li key={index} className='text-gray-600 text-sm'>
                            • {edu}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Publications */}
                {faculty.publication && faculty.publication.length > 0 && (
                  <div className='mb-4'>
                    <h4 className='text-lg font-semibold text-gray-800 mb-2'>
                      Publications
                    </h4>
                    <ul className='space-y-2'>
                      {faculty.publication.map((pub, index) => (
                        <li
                          key={index}
                          className='text-gray-600 text-sm bg-gray-50 p-2 rounded'
                        >
                          {pub}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modal footer */}
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              onClick={onClose}
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FacultyCard = ({ faculty, lang = 'en' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if faculty member has leadership designation
  const leadershipRoles = [
    'dean',
    'associate dean',
    'program head',
    'research coordinator',
    'extension coordinator',
    'osas coordinator',
    'ojt coordinator',
  ];

  const hasLeadershipRole = () => {
    if (!faculty.designation) return false;

    const designation = (
      faculty.designation[lang] ||
      faculty.designation.en ||
      faculty.designation
    ).toLowerCase();
    return leadershipRoles.some((role) => designation.includes(role));
  };

  const shouldShowModal = hasLeadershipRole();

  const handleCardClick = () => {
    if (shouldShowModal) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className={`bg-white/80 backdrop-blur rounded-lg shadow-md p-6 flex gap-4 items-center transform transition-all duration-300 hover:scale-102 hover:shadow-lg border border-white/20 ${
          shouldShowModal ? 'cursor-pointer hover:bg-white/90' : ''
        }`}
        role='article'
        aria-labelledby={`faculty-${faculty.id}-name`}
        onClick={handleCardClick}
      >
        <img
          src={faculty.image}
          alt={`${faculty.name?.[lang] || faculty.name?.en || faculty.name} profile photo`}
          className='w-20 h-20 object-cover rounded-full border-3 border-primary-200 shadow-md flex-shrink-0'
          loading='lazy'
          onError={(e) => {
            e.target.src = '/default-avatar.png';
          }}
        />
        <div className='flex-1 min-w-0'>
          <h3
            id={`faculty-${faculty.id}-name`}
            className='font-bold text-lg text-gray-900 mb-1'
          >
            {faculty.name?.[lang] || faculty.name?.en || faculty.name}
          </h3>
          <p className='text-sm text-primary-600 font-medium mb-1'>
            {faculty.designation?.[lang] ||
              faculty.designation?.en ||
              faculty.designation}
          </p>
          <p className='text-xs text-gray-600 mb-2'>
            {faculty.academicrank?.[lang] ||
              faculty.academicrank?.en ||
              faculty.academicrank}
          </p>
          {faculty.email && (
            <a
              className='text-xs text-primary-700 hover:text-primary-900 hover:underline transition-colors break-all'
              href={`mailto:${faculty.email}`}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Email ${faculty.name?.[lang] || faculty.name?.en || faculty.name}`}
              onClick={(e) => e.stopPropagation()}
            >
              {faculty.email}
            </a>
          )}
          {shouldShowModal && (
            <div className='mt-2'>
              <span className='text-xs text-primary-500 bg-primary-50 px-2 py-1 rounded'>
                Click for details
              </span>
            </div>
          )}
        </div>
      </div>

      <FacultyModal
        faculty={faculty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

FacultyModal.propTypes = {
  faculty: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    designation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    academicrank: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    email: PropTypes.string,
    image: PropTypes.string,
    educationalAttainment: PropTypes.array,
    publication: PropTypes.array,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

FacultyCard.propTypes = {
  faculty: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    designation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    academicrank: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    email: PropTypes.string,
    image: PropTypes.string,
    educationalAttainment: PropTypes.array,
    publication: PropTypes.array,
  }).isRequired,
  lang: PropTypes.string,
};

export { FacultyModal, FacultyCard };
export default FacultyCard;
