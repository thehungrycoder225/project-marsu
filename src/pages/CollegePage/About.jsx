import { useParams, Link, useLocation } from 'react-router-dom';
import { useColleges } from '../../hooks/useColleges';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import CollegeNav from '../../components/CollegeNavigation/CollegeNav';
import AnimatedCounter from '../../components/AnimatedCounter';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function getCollegeKeyFromHash(location) {
  // Handles /#/colleges/:collegeKey/about or /colleges/:collegeKey/about
  const match = location.pathname.match(
    /colleges\/(.*?)\/(about|details|news|programs|faculty|awards|research|contact|staff|student-achievements|student-profile|student-organization|alumni|testimonials)/i
  );
  return match ? match[1] : '';
}

// Helper function to convert Google Drive view links to direct image links
function convertGoogleDriveUrl(url) {
  if (!url || !url.includes('drive.google.com')) return url;

  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

function CollegeAbout() {
  const { colleges, faculty, loading, error } = useColleges();
  const params = useParams();
  const location = useLocation();
  const lang = 'en';

  // Scroll animations - must be called before any early returns
  const [heroRef, heroVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [historyRef, historyVisible] = useScrollAnimation();
  const [goalsRef, goalsVisible] = useScrollAnimation();
  const [objectivesRef, objectivesVisible] = useScrollAnimation();
  const [facultyRef, facultyVisible] = useScrollAnimation();

  // Try to get collegeKey from params, fallback to hash/URL parsing
  let collegeKey = params.collegeKey;
  if (!collegeKey) {
    collegeKey = getCollegeKeyFromHash(location);
  }
  const key = (collegeKey || '').toLowerCase();

  if (loading)
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50'>
        <div className='text-center space-y-4'>
          <div className='w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin'></div>
          <div className='text-lg font-medium text-gray-600 animate-pulse'>
            Loading College Information...
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div
        className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50'
        role='alert'
      >
        <div className='glass-card p-8 text-center max-w-md mx-4'>
          <div className='text-red-500 mb-4'>
            <svg
              className='w-16 h-16 mx-auto'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <h2 className='text-xl font-semibold mb-2 text-gray-800'>
            Error Loading Content
          </h2>
          <p className='text-gray-600 mb-4'>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105'
          >
            Try Again
          </button>
        </div>
      </div>
    );

  const college = colleges.find((col) => {
    const slug = (col.slug || '').toLowerCase();
    const shortName = (col.shortName?.en || '').toLowerCase();
    const id = String(col.id);
    return slug === key || shortName === key || id === key;
  });

  if (!college)
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50'>
        <div className='glass-card p-8 text-center max-w-md mx-4'>
          <div className='text-gray-400 mb-4'>
            <svg
              className='w-16 h-16 mx-auto'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <h2 className='text-xl font-semibold mb-2 text-gray-800'>
            College Not Found
          </h2>
          <p className='text-gray-600 mb-4'>
            Could not find college with key:{' '}
            <span className='font-mono bg-gray-100 px-2 py-1 rounded text-sm'>
              {collegeKey}
            </span>
          </p>
          <Link
            to='/colleges'
            className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 inline-block'
          >
            Browse All Colleges
          </Link>
        </div>
      </div>
    );

  const profile = college.profile || {};
  const images = college.images || [];
  const stats = college.stats || {};
  const collegeFaculty = faculty
    .filter(
      (f) => f.collegeId === college.id && f.name && f.designation && f.id
    )
    .map((f) => ({
      ...f,
      // Clean up image URLs and handle Google Drive links
      image: f.image
        ? convertGoogleDriveUrl(f.image.replace(/^h+ttps:/, 'https:'))
        : '',
    }));

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      <CollegeNav />
      <div className='college-page-content max-w-7xl mx-auto px-4 py-8 space-y-12'>
        {/* Hero/Banner */}
        <div
          ref={heroRef}
          className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${
            heroVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {images.length > 0 ? (
            <Swiper
              modules={[Navigation, Scrollbar, Autoplay]}
              scrollbar={{ draggable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop
              className='w-full h-64 md:h-96 lg:h-[28rem]'
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={college.name?.[lang] || college.name?.en}
                    className='w-full h-64 md:h-96 lg:h-[28rem] object-cover'
                    loading='lazy'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className='w-full h-64 md:h-96 lg:h-[28rem] bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-xl'>
              <div className='text-center space-y-2'>
                <svg
                  className='w-16 h-16 mx-auto text-gray-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                    clipRule='evenodd'
                  />
                </svg>
                <p>No images available</p>
              </div>
            </div>
          )}
          <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8'>
            <div className='max-w-4xl'>
              <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight'>
                {college.name?.[lang] || college.name?.en}
              </h1>
              {college.shortDescription && (
                <p className='text-lg md:text-xl text-white/90 mt-4 max-w-2xl'>
                  {college.shortDescription[lang] ||
                    college.shortDescription.en}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stats/Highlights */}
        <div
          ref={statsRef}
          className={`transition-all duration-1000 delay-200 ${
            statsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='glass-card hover:glass-card-hover group cursor-pointer transform transition-all duration-300 hover:scale-105'>
              <div className='text-center space-y-2'>
                <div className='text-3xl md:text-4xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors'>
                  <AnimatedCounter
                    end={stats.founded || new Date().getFullYear() - 50}
                    trigger={statsVisible}
                    duration={2000}
                  />
                </div>
                <div className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
                  Founded
                </div>
              </div>
            </div>

            <div className='glass-card hover:glass-card-hover group cursor-pointer transform transition-all duration-300 hover:scale-105'>
              <div className='text-center space-y-2'>
                <div className='text-3xl md:text-4xl font-bold text-green-600 group-hover:text-green-700 transition-colors'>
                  <AnimatedCounter
                    end={stats.programs || college.programIds?.length || 15}
                    trigger={statsVisible}
                    duration={2500}
                  />
                </div>
                <div className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
                  Programs
                </div>
              </div>
            </div>

            <div className='glass-card hover:glass-card-hover group cursor-pointer transform transition-all duration-300 hover:scale-105'>
              <div className='text-center space-y-2'>
                <div className='text-3xl md:text-4xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors'>
                  {stats.accreditation || 'Level IV'}
                </div>
                <div className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
                  Accreditation
                </div>
              </div>
            </div>

            <div className='glass-card hover:glass-card-hover group cursor-pointer transform transition-all duration-300 hover:scale-105'>
              <div className='text-center space-y-2'>
                <div className='text-3xl md:text-4xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors'>
                  <AnimatedCounter
                    end={collegeFaculty.length || 25}
                    trigger={statsVisible}
                    duration={1500}
                  />
                </div>
                <div className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
                  Faculty
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* History */}
        {profile.history?.[lang] || profile.history?.en ? (
          <section
            ref={historyRef}
            className={`transition-all duration-1000 delay-300 ${
              historyVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className='glass-card-light p-8 md:p-10'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                    <path
                      fillRule='evenodd'
                      d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  Our History
                </h2>
              </div>
              <div className='prose prose-lg max-w-none text-gray-700 leading-relaxed'>
                <p className='whitespace-pre-line text-lg'>
                  {profile.history?.[lang] || profile.history?.en}
                </p>
              </div>
            </div>
          </section>
        ) : null}
        {/* Goals */}
        {profile.goals?.[lang] || profile.goals?.en ? (
          <section
            ref={goalsRef}
            className={`transition-all duration-1000 delay-400 ${
              goalsVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className='glass-card-light p-8 md:p-10'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent'>
                  Our Goals
                </h2>
              </div>
              <div className='prose prose-lg max-w-none text-gray-700 leading-relaxed'>
                <p className='whitespace-pre-line text-lg'>
                  {profile.goals?.[lang] || profile.goals?.en}
                </p>
              </div>
            </div>
          </section>
        ) : null}
        {/* Objectives */}
        {profile.objectives?.[lang] || profile.objectives?.en ? (
          <section
            ref={objectivesRef}
            className={`transition-all duration-1000 delay-500 ${
              objectivesVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className='glass-card-light p-8 md:p-10'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                  Our Objectives
                </h2>
              </div>
              <div className='prose prose-lg max-w-none text-gray-700 leading-relaxed'>
                <p className='whitespace-pre-line text-lg'>
                  {profile.objectives?.[lang] || profile.objectives?.en}
                </p>
              </div>
            </div>
          </section>
        ) : null}
        {/* Leadership */}
        <section
          ref={facultyRef}
          className={`transition-all duration-1000 delay-600 ${
            facultyVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-8'>
              <div className='w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z' />
                </svg>
              </div>
              <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'>
                Leadership Team
              </h2>
            </div>

            {collegeFaculty.length > 0 ? (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {collegeFaculty.map((f, index) => (
                  <div
                    key={f.id}
                    className={`glass-card hover:glass-card-hover group transform transition-all duration-500 ${
                      facultyVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${700 + index * 100}ms` }}
                  >
                    <div className='flex gap-6 items-start'>
                      <div className='relative'>
                        <img
                          src={
                            f.image ||
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="%23e5e7eb" viewBox="0 0 24 24"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E'
                          }
                          alt={f.name || 'Faculty Member'}
                          className='w-24 h-24 object-cover rounded-2xl border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300'
                          loading='lazy'
                          onError={(e) => {
                            e.target.src =
                              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="%23e5e7eb" viewBox="0 0 24 24"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E';
                          }}
                        />
                        <div className='absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full'></div>
                      </div>

                      <div className='flex-1 min-w-0'>
                        <h3 className='font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
                          {f.name || 'Faculty Member'}
                        </h3>
                        <p className='text-base font-medium text-blue-600 mb-1'>
                          {f.designation || 'Position'}
                        </p>
                        {f.academicrank && (
                          <p className='text-sm text-gray-500 mb-3'>
                            {f.academicrank}
                          </p>
                        )}
                        {f.email && f.email.trim() && (
                          <a
                            href={`mailto:${f.email}`}
                            className='inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <svg
                              className='w-4 h-4'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                              <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                            </svg>
                            {f.email}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='glass-card-light p-8 text-center'>
                <div className='text-gray-400 mb-4'>
                  <svg
                    className='w-16 h-16 mx-auto'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z' />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-gray-600 mb-2'>
                  No Faculty Information Available
                </h3>
                <p className='text-gray-500'>
                  Faculty information for this college will be available soon.
                </p>
              </div>
            )}
          </div>
        </section>
        {/* Call-to-Action Buttons */}
        <div className='flex flex-wrap gap-6 justify-center pt-8'>
          <Link
            to={`/colleges/${collegeKey}/programs`}
            className='group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg overflow-hidden'
          >
            <span className='relative z-10 flex items-center gap-2'>
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              Explore Programs
            </span>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </Link>

          <Link
            to={`/colleges/${collegeKey}/faculty`}
            className='group relative px-8 py-4 glass-card hover:glass-card-hover text-blue-600 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 overflow-hidden'
          >
            <span className='relative z-10 flex items-center gap-2'>
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z' />
              </svg>
              Meet Faculty
            </span>
          </Link>

          <Link
            to='/'
            className='group relative px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg border border-gray-300 hover:border-gray-400'
          >
            <span className='flex items-center gap-2'>
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M9.707 14.707a1 1 0 01-1.414 0L3.586 10l4.707-4.707a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
                  clipRule='evenodd'
                />
              </svg>
              Back to Home
            </span>
          </Link>
        </div>
        {/* Future Expansion: Alumni, Research, News, etc. */}
      </div>
    </div>
  );
}

export default CollegeAbout;
