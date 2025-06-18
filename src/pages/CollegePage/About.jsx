import { useParams, Link, useLocation } from 'react-router-dom';
import { useColleges } from '../../hooks/useColleges';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import CollegeNav from '../../components/CollegeNavigation/CollegeNav';
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

function CollegeAbout() {
  const { colleges, faculty, loading, error } = useColleges();
  const params = useParams();
  const location = useLocation();
  const lang = 'en';

  // Try to get collegeKey from params, fallback to hash/URL parsing
  let collegeKey = params.collegeKey;
  if (!collegeKey) {
    collegeKey = getCollegeKeyFromHash(location);
  }
  const key = (collegeKey || '').toLowerCase();

  if (loading) return <div className='text-center py-10'>Loading...</div>;
  if (error)
    return <div className='text-center py-10 text-red-600'>Error: {error}</div>;

  const college = colleges.find((col) => {
    const slug = (col.slug || '').toLowerCase();
    const shortName = (col.shortName?.en || '').toLowerCase();
    const id = String(col.id);
    return slug === key || shortName === key || id === key;
  });

  if (!college)
    return (
      <div className='text-center py-10 text-red-600'>
        College not found for key: <b>{collegeKey}</b>
      </div>
    );

  const profile = college.profile || {};
  const images = college.images || [];
  const stats = college.stats || {};
  const collegeFaculty = faculty.filter((f) => f.collegeId === college.id);

  return (
    <>
      <CollegeNav />
      <div className='max-w-5xl mx-auto px-4 py-8'>
        {/* Hero/Banner */}
        <div className='relative rounded-2xl overflow-hidden shadow-lg mb-8'>
          {images.length > 0 ? (
            <Swiper
              modules={[Navigation, Scrollbar]}
              scrollbar={{ draggable: true }}
              loop
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className='w-full h-64 md:h-96'
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={college.name?.[lang] || college.name?.en}
                    className='w-full h-64 md:h-96 object-cover'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className='w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center text-gray-500 text-xl'>
              No images available
            </div>
          )}
          <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6'>
            <h1 className='text-3xl md:text-4xl font-bold text-white drop-shadow'>
              {college.name?.[lang] || college.name?.en}
            </h1>
          </div>
        </div>
        {/* Stats/Highlights */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
          {/* Example stats, replace with real data if available */}
          <div className='bg-white/70 rounded-lg shadow p-4 text-center'>
            <div className='text-2xl font-bold'>{stats.founded || '—'}</div>
            <div className='text-xs text-gray-500'>Founded</div>
          </div>
          <div className='bg-white/70 rounded-lg shadow p-4 text-center'>
            <div className='text-2xl font-bold'>
              {stats.programs || college.programIds?.length || '—'}
            </div>
            <div className='text-xs text-gray-500'>Programs</div>
          </div>
          <div className='bg-white/70 rounded-lg shadow p-4 text-center'>
            <div className='text-2xl font-bold'>
              {stats.accreditation || '—'}
            </div>
            <div className='text-xs text-gray-500'>Accreditation Level</div>
          </div>
          <div className='bg-white/70 rounded-lg shadow p-4 text-center'>
            <div className='text-2xl font-bold'>{collegeFaculty.length}</div>
            <div className='text-xs text-gray-500'>Faculty</div>
          </div>
        </div>
        {/* History */}
        {profile.history?.[lang] || profile.history?.en ? (
          <section className='mb-8'>
            <h2 className='text-2xl font-bold mb-2 text-primary-700'>
              History
            </h2>
            <p className='text-gray-700 whitespace-pre-line'>
              {profile.history?.[lang] || profile.history?.en}
            </p>
          </section>
        ) : null}
        {/* Goals */}
        {profile.goals?.[lang] || profile.goals?.en ? (
          <section className='mb-8'>
            <h2 className='text-2xl font-bold mb-2 text-primary-700'>Goals</h2>
            <p className='text-gray-700 whitespace-pre-line'>
              {profile.goals?.[lang] || profile.goals?.en}
            </p>
          </section>
        ) : null}
        {/* Objectives */}
        {profile.objectives?.[lang] || profile.objectives?.en ? (
          <section className='mb-8'>
            <h2 className='text-2xl font-bold mb-2 text-primary-700'>
              Objectives
            </h2>
            <p className='text-gray-700 whitespace-pre-line'>
              {profile.objectives?.[lang] || profile.objectives?.en}
            </p>
          </section>
        ) : null}
        {/* Leadership */}
        {collegeFaculty.length > 0 && (
          <section className='mb-8'>
            <h2 className='text-2xl font-bold mb-2 text-primary-700'>
              Leadership
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {collegeFaculty.map((f) => (
                <div
                  key={f.id}
                  className='bg-white/70 rounded-lg shadow p-4 flex gap-4 items-center'
                >
                  <img
                    src={f.image}
                    alt={f.name?.[lang] || f.name?.en}
                    className='w-20 h-20 object-cover rounded-full border-2 border-primary-700'
                  />
                  <div>
                    <div className='font-bold text-lg'>
                      {f.name?.[lang] || f.name?.en}
                    </div>
                    <div className='text-sm text-gray-600'>
                      {f.designation?.[lang] || f.designation?.en}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {f.academicrank?.[lang] || f.academicrank?.en}
                    </div>
                    <a
                      className='text-xs text-[var(--primary-700)]'
                      href={`mailto:${f.email}`}
                      target='_blank'
                    >
                      {f.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Call-to-Action Buttons */}
        <div className='flex flex-wrap gap-4 justify-center mt-8'>
          <Link
            to={`/colleges/${collegeKey}/programs`}
            className='bg-gray-900 text-white px-6 py-2 rounded-sm shadow hover:text-[var(--primary-700)] transition-all font-semibold'
          >
            See Programs
          </Link>
          <Link
            to={`/colleges/${collegeKey}/faculty`}
            className='bg-white/80 text-primary-700 px-6 py-2 rounded-sm shadow hover:bg-blue-50 transition-all font-semibold'
          >
            See Faculty
          </Link>
          <Link
            to='/'
            className='bg-gray-200 text-gray-700 px-6 py-2 rounded-sm shadow hover:bg-gray-300 transition-all font-semibold'
          >
            Back to Homepage
          </Link>
        </div>
        {/* Future Expansion: Alumni, Research, News, etc. */}
      </div>
    </>
  );
}

export default CollegeAbout;
