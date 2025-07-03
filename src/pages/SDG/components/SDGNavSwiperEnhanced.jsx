import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import PropTypes from 'prop-types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SDGNavSwiperEnhanced = ({ goals }) => {
  const [hoveredGoal, setHoveredGoal] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('sdg-swiper-container');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const openModal = (goal) => {
    setSelectedGoal(goal);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGoal(null);
    document.body.style.overflow = 'unset';
  };

  const getGoalColor = (goalId) => sdgColors[goalId] || sdgColors[1];

  return (
    <>
      <div
        id='sdg-swiper-container'
        className={`w-full py-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
      >
        {/* Statistics Dashboard */}
        <div className='mb-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto'>
          <div className='text-center p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='text-2xl font-bold text-blue-600 mb-1'>17</div>
            <div className='text-sm text-gray-600'>Global Goals</div>
          </div>
          <div className='text-center p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='text-2xl font-bold text-green-600 mb-1'>95%</div>
            <div className='text-sm text-gray-600'>Progress</div>
          </div>
          <div className='text-center p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='text-2xl font-bold text-orange-600 mb-1'>50+</div>
            <div className='text-sm text-gray-600'>Initiatives</div>
          </div>
          <div className='text-center p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='text-2xl font-bold text-purple-600 mb-1'>2030</div>
            <div className='text-sm text-gray-600'>Target</div>
          </div>
        </div>

        {/* Enhanced Swiper Container */}
        <div className='relative bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100'>
          {/* Navigation hint */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center space-x-3'>
              <div className='w-3 h-3 bg-primary-500 rounded-full animate-pulse'></div>
              <span className='text-sm font-medium text-gray-600'>
                Navigate through all 17 Sustainable Development Goals
              </span>
            </div>
            <div className='hidden lg:flex items-center space-x-2 text-sm text-gray-500'>
              <span>Tap</span>
              <div className='w-1 h-1 bg-gray-400 rounded-full'></div>
              <span>Explore</span>
              <div className='w-1 h-1 bg-gray-400 rounded-full'></div>
              <span>Learn</span>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect='coverflow'
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={{
              nextEl: '.sdg-swiper-button-next',
              prevEl: '.sdg-swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              bulletClass: 'sdg-pagination-bullet',
              bulletActiveClass: 'sdg-pagination-bullet-active',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 20 },
              640: { slidesPerView: 3, spaceBetween: 24 },
              768: { slidesPerView: 4, spaceBetween: 24 },
              1024: { slidesPerView: 5, spaceBetween: 28 },
              1280: { slidesPerView: 6, spaceBetween: 32 },
            }}
            className='sdg-goals-swiper-enhanced'
            loop={true}
          >
            {goals.map((goal) => {
              const colors = getGoalColor(goal.id);
              return (
                <SwiperSlide key={goal.id}>
                  <div
                    className='flex flex-col items-center group transition-all duration-300 cursor-pointer'
                    onMouseEnter={() => setHoveredGoal(goal.id)}
                    onMouseLeave={() => setHoveredGoal(null)}
                    onClick={() => openModal(goal)}
                  >
                    {/* Goal Image Container */}
                    <div className='relative mb-4'>
                      {/* Animated background ring */}
                      <div
                        className='absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-500 scale-110'
                        style={{ backgroundColor: colors.primary }}
                      ></div>

                      {/* Main image container */}
                      <div
                        className='relative bg-white rounded-full p-3 shadow-lg border-2 border-transparent group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110'
                        style={{
                          borderColor:
                            hoveredGoal === goal.id
                              ? colors.primary
                              : 'transparent',
                          backgroundColor:
                            hoveredGoal === goal.id ? colors.light : 'white',
                        }}
                      >
                        <img
                          src={goal.image}
                          alt={goal.alt}
                          className='w-16 h-16 lg:w-20 lg:h-20 object-contain transition-transform duration-300'
                          onError={(e) => {
                            console.error(
                              `Failed to load image: ${goal.image}`
                            );
                            e.target.style.display = 'none';
                          }}
                        />

                        {/* Goal number badge */}
                        <div
                          className='absolute -top-2 -right-2 w-6 h-6 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md transition-colors'
                          style={{ backgroundColor: colors.primary }}
                        >
                          {goal.id}
                        </div>

                        {/* Hover overlay with progress indicator */}
                        {hoveredGoal === goal.id && (
                          <div
                            className='absolute inset-0 rounded-full border-4 animate-pulse'
                            style={{ borderColor: colors.primary }}
                          ></div>
                        )}
                      </div>
                    </div>

                    {/* Goal Title */}
                    <div className='text-center px-2'>
                      <span
                        className='text-xs lg:text-sm font-semibold transition-colors duration-300 leading-tight block'
                        style={{
                          color:
                            hoveredGoal === goal.id
                              ? colors.primary
                              : '#374151',
                        }}
                      >
                        {goal.alt}
                      </span>

                      {/* Animated underline */}
                      <div
                        className='h-0.5 mt-2 mx-auto transition-all duration-300'
                        style={{
                          width: hoveredGoal === goal.id ? '100%' : '0%',
                          backgroundColor: colors.primary,
                        }}
                      ></div>
                    </div>

                    {/* Quick preview on hover */}
                    {hoveredGoal === goal.id && (
                      <div className='absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-10 animate-fadeIn whitespace-nowrap'>
                        Click to explore SDG {goal.id}
                        <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45'></div>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className='sdg-swiper-button-prev absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-500 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 z-10 group'>
            <svg
              className='w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <button className='sdg-swiper-button-next absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-500 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 z-10 group'>
            <svg
              className='w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>

        {/* Progress indicator */}
        <div className='flex justify-center mt-6'>
          <div className='flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200'>
            <div className='w-2 h-2 bg-primary-500 rounded-full animate-pulse'></div>
            <span className='text-sm font-medium text-gray-600'>
              17 Goals for a Better World
            </span>
            <div className='w-2 h-2 bg-primary-500 rounded-full animate-pulse delay-500'></div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && selectedGoal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div
            className='bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className='relative p-6 text-white rounded-t-2xl'
              style={{ backgroundColor: getGoalColor(selectedGoal.id).primary }}
            >
              <button
                onClick={closeModal}
                className='absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors'
              >
                <svg
                  className='w-5 h-5'
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

              <div className='flex items-center space-x-4'>
                <div className='w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center'>
                  <span className='text-2xl font-bold'>{selectedGoal.id}</span>
                </div>
                <div>
                  <h3 className='text-2xl font-bold'>{selectedGoal.title}</h3>
                  <p className='text-white text-opacity-90 mt-1'>
                    {selectedGoal.alt}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className='p-6'>
              {/* SDG Image */}
              <div className='mb-6 text-center'>
                <img
                  src={selectedGoal.image}
                  alt={selectedGoal.alt}
                  className='w-32 h-32 mx-auto object-contain'
                />
              </div>

              {/* Description */}
              <div className='mb-6'>
                <h4 className='text-lg font-semibold text-gray-800 mb-3'>
                  Our Commitment
                </h4>
                <p className='text-gray-600 leading-relaxed'>
                  {selectedGoal.subtitle}
                </p>
              </div>

              {/* MarSU Initiatives */}
              <div className='mb-6'>
                <h4 className='text-lg font-semibold text-gray-800 mb-3'>
                  MarSU Initiatives
                </h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {marsuInitiatives[selectedGoal.id]?.map(
                    (initiative, index) => (
                      <div
                        key={index}
                        className='p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow'
                        style={{
                          backgroundColor: getGoalColor(selectedGoal.id).light,
                        }}
                      >
                        <div className='flex items-center space-x-3'>
                          <div
                            className='w-3 h-3 rounded-full'
                            style={{
                              backgroundColor: getGoalColor(selectedGoal.id)
                                .primary,
                            }}
                          ></div>
                          <span className='text-sm font-medium text-gray-700'>
                            {initiative}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Statement Preview */}
              {selectedGoal.statement && selectedGoal.statement.length > 0 && (
                <div className='mb-6'>
                  <h4 className='text-lg font-semibold text-gray-800 mb-3'>
                    Statement
                  </h4>
                  <p className='text-gray-600 leading-relaxed text-sm'>
                    {selectedGoal.statement[0].text.substring(0, 200)}...
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-3'>
                <button
                  className='flex-1 px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity'
                  style={{
                    backgroundColor: getGoalColor(selectedGoal.id).primary,
                  }}
                >
                  View Full Commitment
                </button>
                <button className='flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors'>
                  Related Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

SDGNavSwiperEnhanced.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      statement: PropTypes.array,
    })
  ).isRequired,
};

export default SDGNavSwiperEnhanced;
