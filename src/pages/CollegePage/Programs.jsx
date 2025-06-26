import { useParams, Link, useLocation } from 'react-router-dom';
import { useColleges } from '../../hooks/useColleges';
import CollegeNav from '../../components/CollegeNavigation/CollegeNav';

function getCollegeKeyFromHash(location) {
  // Handles /#/colleges/:collegeKey/about or /colleges/:collegeKey/about
  const match = location.pathname.match(
    /colleges\/(.*?)\/(about|details|news|programs|faculty|awards|research|contact|staff|student-achievements|student-profile|student-organization|alumni|testimonials)/i
  );
  return match ? match[1] : '';
}

function CollegePrograms() {
  const { colleges, programs: allPrograms, loading, error } = useColleges();
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

  // --- PROGRAMS DATA ---
  const programs = (college.programIds || [])
    .map((pid) => allPrograms.find((p) => p.id === pid))
    .filter(Boolean);

  return (
    <>
      <CollegeNav />
      <div className='college-page-content max-w-6xl mx-auto px-4 py-8'>
        <h1
          className='text-2xl md:text-2xl font-bold mb-6'
          style={{ color: '#323232' }}
        >
          {college.name?.[lang] || college.name?.en} Programs
        </h1>
        {/* Program Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {programs.length > 0 ? (
            programs.map((program, idx) => (
              <div
                key={idx}
                className='bg-white/80 rounded-lg shadow-lg p-6 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-shadow relative'
                style={{ borderColor: 'var(--primary-700)' }}
              >
                {program.image && (
                  <img
                    src={program.image}
                    alt={program.name?.[lang] || program.name?.en}
                    className='w-full h-40 object-cover rounded mb-4 border border-gray-200'
                  />
                )}
                <h2
                  className='text-xl font-bold mb-2'
                  style={{ color: '#323232' }}
                >
                  {program.name?.[lang] || program.name?.en}
                </h2>
                <div className='mb-2 text-sm text-gray-600'>
                  {program.degreeType} • {program.accreditation} •{' '}
                  {program.modality}
                </div>
                <div className='mb-2 text-gray-700 text-sm line-clamp-3'>
                  {program.description?.[lang] || program.description?.en}
                </div>
                {program.coordinator && (
                  <div className='flex items-center gap-2 mt-2'>
                    {program.coordinator.image && (
                      <img
                        src={program.coordinator.image}
                        alt={program.coordinator.name}
                        className='w-8 h-8 rounded-full border'
                      />
                    )}
                    <div>
                      <div className='text-xs font-semibold'>
                        {program.coordinator.name}
                      </div>
                      <a
                        href={`mailto:${program.coordinator.email}`}
                        className='text-xs text-[var(--primary-700)]'
                      >
                        {program.coordinator.email}
                      </a>
                    </div>
                  </div>
                )}
                <Link
                  to={`/colleges/${collegeKey}/programs/${program.key || idx + 1}`}
                  className='mt-4 inline-block bg-[var(--primary-700)] text-white px-2 py-2 rounded shadow hover:bg-[var(--primary-500)] hover:text-[var(--primary-700)] text-sm transition-colors font-semibold text-center'
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <div className='col-span-full text-center text-gray-500'>
              No programs found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CollegePrograms;
