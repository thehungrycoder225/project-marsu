import { useParams, Link, useLocation } from 'react-router-dom';
import { useColleges } from '../../hooks/useColleges';
import CollegeNav from '../../components/CollegeNavigation/CollegeNav';
import { useState } from 'react';
import MetaTags from '../../components/MetaTags';

function ProgramDetail() {
  const { colleges, programs, loading, error } = useColleges();
  const params = useParams();
  const location = useLocation();
  const lang = 'en';
  const [activeLang, setActiveLang] = useState(lang);
  const [openYear, setOpenYear] = useState(null);

  const { collegeKey, programId } = params;
  // Try to get collegeKey from params, fallback to hash/URL parsing
  let key = collegeKey;
  if (!key) {
    // fallback for hash-based routing
    const match = location.pathname.match(
      /colleges\/(.*?)\/(about|details|news|programs|faculty|awards|research|contact|staff|student-achievements|student-profile|student-organization|alumni|testimonials)/i
    );
    key = match ? match[1] : '';
  }
  key = (key || '').toLowerCase();
  const college = colleges.find((col) => {
    const slug = (col.slug || '').toLowerCase();
    const shortName = (col.shortName?.en || '').toLowerCase();
    const id = String(col.id);
    return slug === key || shortName === key || id === key;
  });
  const program = programs.find((p) => String(p.id) === String(programId));

  if (loading) return <div className='text-center py-10'>Loading...</div>;
  if (error)
    return <div className='text-center py-10 text-red-600'>Error: {error}</div>;
  if (!college || !program)
    return (
      <div className='text-center py-10 text-red-600'>Program not found.</div>
    );

  // Hero image fallback
  const heroImage = program.image || college.images?.[0] || null;
  // Coordinator logic
  const coordinator = (college.faculty || []).find(
    (f) =>
      f.designation?.en?.toLowerCase().includes('program head') &&
      f.designation?.en?.toLowerCase().includes(program.name?.en?.toLowerCase())
  );
  // Meta tags
  const metaTitle = `${program.name?.[activeLang] || program.name?.en} | ${college.name?.[activeLang] || college.name?.en}`;
  const metaDescription =
    program.description?.[activeLang] || program.description?.en || '';
  const metaImage = heroImage;

  return (
    <>
      <MetaTags
        title={metaTitle}
        description={metaDescription}
        image={metaImage}
      />
      <CollegeNav />
      <div className='college-page-content max-w-4xl mx-auto px-4 py-8'>
        <div className='flex flex-wrap items-center justify-between mb-4'>
          <Link
            to={`/colleges/${collegeKey}/programs`}
            className='text-[var(--primary-700)] hover:underline'
          >
            &larr; Back to Programs
          </Link>
          {/* Language toggle */}
          {/* <div className='flex gap-2'>
            <button
              onClick={() => setActiveLang('en')}
              className={`px-2 py-1 rounded ${activeLang === 'en' ? 'bg-[var(--primary-700)] text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              EN
            </button>
            <button
              onClick={() => setActiveLang('fil')}
              className={`px-2 py-1 rounded ${activeLang === 'fil' ? 'bg-[var(--primary-700)] text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              FIL
            </button>
          </div> */}
        </div>
        {/* Hero/Header */}
        {heroImage && (
          <div className='w-full h-48 md:h-64 rounded-xl overflow-hidden mb-6 relative'>
            <img
              src={heroImage}
              alt={program.name?.[activeLang] || program.name?.en}
              className='w-full h-full object-cover'
            />
            <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4'>
              <h1 className='text-3xl md:text-4xl font-bold text-white drop-shadow'>
                {program.name?.[activeLang] || program.name?.en}
              </h1>
              <div className='flex gap-2 mt-2'>
                {program.degreeType && (
                  <span className='bg-white/80 text-[var(--primary-700)] px-2 py-1 rounded text-xs font-semibold'>
                    {program.degreeType}
                  </span>
                )}
                {program.accreditation && (
                  <span className='bg-white/80 text-green-700 px-2 py-1 rounded text-xs font-semibold'>
                    Accreditation: {program.accreditation}
                  </span>
                )}
                {program.status && (
                  <span className='bg-white/80 text-blue-700 px-2 py-1 rounded text-xs font-semibold'>
                    {program.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Description */}
        {program.description?.[activeLang] || program.description?.en ? (
          <p className='mb-4 text-gray-700'>
            {program.description?.[activeLang] || program.description?.en}
          </p>
        ) : null}
        {/* Curriculum Accordion (screen only) */}
        {program.curriculum && program.curriculum.length > 0 && (
          <section className='mb-8 print:hidden'>
            <div className='flex flex-wrap items-center justify-between mb-2 gap-2'>
              <h2 className='text-2xl font-bold text-primary-700'>
                Curriculum
                {program.version && (
                  <span className='ml-2 text-xs text-gray-500 font-normal'>
                    v{program.version} • {new Date().toLocaleDateString()}
                  </span>
                )}
              </h2>
              <button
                className='text-xs text-[var(--primary-700)] underline hover:text-[var(--primary-800)] transition'
                onClick={() => window.print()}
                type='button'
                aria-label='Download or print curriculum'
              >
                Download/Print Curriculum
              </button>
            </div>
            <div className='divide-y divide-gray-200 rounded-lg border border-gray-100 bg-white/80 shadow'>
              {program.curriculum.map((year, yIdx) => (
                <div key={yIdx}>
                  <button
                    className={`w-full flex justify-between items-center py-3 px-4 font-semibold text-left focus:outline-none focus:bg-gray-100 transition ${
                      openYear === yIdx ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => setOpenYear(openYear === yIdx ? null : yIdx)}
                    type='button'
                    aria-expanded={openYear === yIdx}
                    aria-controls={`curriculum-year-${yIdx}`}
                  >
                    <span>{year.year}</span>
                    <span
                      className='inline-block w-5 h-5 flex items-center justify-center text-lg'
                      aria-hidden='true'
                    >
                      {openYear === yIdx ? (
                        <svg
                          width='20'
                          height='20'
                          fill='none'
                          viewBox='0 0 20 20'
                        >
                          <path
                            d='M6 10h8'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                          />
                        </svg>
                      ) : (
                        <svg
                          width='20'
                          height='20'
                          fill='none'
                          viewBox='0 0 20 20'
                        >
                          <path
                            d='M10 6v8M6 10h8'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                  <div
                    id={`curriculum-year-${yIdx}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      openYear === yIdx ? 'max-h-[1000px] pl-6 pb-4' : 'max-h-0'
                    }`}
                    aria-hidden={openYear !== yIdx}
                  >
                    {openYear === yIdx &&
                      year.semesters &&
                      year.semesters.map((sem, sIdx) => (
                        <div key={sIdx} className='mb-3'>
                          <h4 className='font-semibold text-primary-700 mb-1'>
                            {sem.name}
                          </h4>
                          <ul className='list-disc ml-6 space-y-1'>
                            {sem.courses &&
                              sem.courses.map((course, cIdx) => (
                                <li
                                  key={cIdx}
                                  className='text-sm flex flex-wrap items-baseline gap-1'
                                >
                                  <span className='font-medium'>
                                    {course.name?.[activeLang] ||
                                      course.name?.en ||
                                      course.courseName}
                                  </span>
                                  <span className='text-xs text-gray-500'>
                                    ({course.code || course.courseCode})
                                  </span>
                                  <span className='text-xs text-gray-500'>
                                    • {course.units} unit
                                    {course.units > 1 ? 's' : ''}
                                  </span>
                                  {course.prerequisite && (
                                    <span className='text-xs text-gray-400'>
                                      | Prereq: {course.prerequisite}
                                    </span>
                                  )}
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Print-friendly full curriculum (hidden on screen, visible on print) */}
        {program.curriculum && program.curriculum.length > 0 && (
          <section className='mb-8 hidden print:block'>
            <h2 className='text-2xl font-bold mb-2 text-primary-700'>
              Curriculum
            </h2>
            {program.curriculum.map((year, yIdx) => (
              <div key={yIdx} className='mb-4'>
                <h3 className='text-lg font-semibold mb-1'>{year.year}</h3>
                {year.semesters &&
                  year.semesters.map((sem, sIdx) => (
                    <div key={sIdx} className='mb-2'>
                      <h4 className='font-semibold'>{sem.name}</h4>
                      <ul className='list-disc ml-6'>
                        {sem.courses &&
                          sem.courses.map((course, cIdx) => (
                            <li key={cIdx} className='text-sm'>
                              {course.name?.[activeLang] ||
                                course.name?.en ||
                                course.courseName}{' '}
                              ({course.code || course.courseCode}) -{' '}
                              {course.units} units
                              {course.prerequisite && (
                                <span className='text-xs text-gray-500'>
                                  {' '}
                                  | Prereq: {course.prerequisite}
                                </span>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
              </div>
            ))}
          </section>
        )}
        {/* Outcomes */}
        {program.outcomes && program.outcomes.length > 0 && (
          <section className='mb-8'>
            <h2 className='text-2xl font-bold mb-2 text-primary-700'>
              Program Outcomes
            </h2>
            <ul className='list-disc ml-6'>
              {program.outcomes.map((out, idx) => (
                <li key={idx} className='mb-1'>
                  <span className='font-bold'>
                    {out.code ? out.code + ' ' : ''}
                  </span>
                  {out[activeLang] || out.en || out.description}
                </li>
              ))}
            </ul>
          </section>
        )}
        {/* Career Opportunities */}
        {program.careerOpportunities &&
          program.careerOpportunities.length > 0 && (
            <section className='mb-8'>
              <h2 className='text-2xl font-bold mb-2 text-primary-700'>
                Career Opportunities
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {program.careerOpportunities.map((career, idx) => (
                  <div
                    key={idx}
                    className='bg-white/80 rounded p-4 shadow border border-gray-100 flex flex-col gap-1'
                  >
                    <span className='font-semibold'>
                      {career.career?.[activeLang] || career.career?.en}
                    </span>
                    {career.description?.[activeLang] ||
                    career.description?.en ? (
                      <span className='text-gray-600'>
                        {career.description?.[activeLang] ||
                          career.description?.en}
                      </span>
                    ) : null}
                    {career.salaryRange && (
                      <span className='text-xs text-gray-500'>
                        Salary: {career.salaryRange}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        {/* Study Plans */}
        {program.studyPlans && program.studyPlans.length > 0 && (
          <section className='mb-8'>
            <h2 className='text-2xl font-bold mb-2 text-primary-700'>
              Study Plans
            </h2>
            <div className='divide-y divide-gray-200'>
              {program.studyPlans.map((plan, idx) => (
                <details key={idx} className='py-2'>
                  <summary className='cursor-pointer font-semibold'>
                    {plan.title?.[activeLang] ||
                      plan.title?.en ||
                      `Plan ${idx + 1}`}
                  </summary>
                  <div className='pl-4'>
                    {plan[activeLang] || plan.en || plan.description}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}
        {/* Coordinator/Contact */}
        {coordinator && (
          <section className='mb-8'>
            <h2 className='text-2xl font-bold mb-2 text-primary-700'>
              Program Head
            </h2>
            <div className='flex items-center gap-4 bg-white/80 rounded p-4 shadow border border-gray-100'>
              {coordinator.image && (
                <img
                  src={coordinator.image}
                  alt={coordinator.name?.[activeLang] || coordinator.name?.en}
                  className='w-16 h-16 rounded-full border'
                />
              )}
              <div>
                <div className='font-bold'>
                  {coordinator.name?.[activeLang] || coordinator.name?.en}
                </div>
                <div className='text-sm text-gray-600'>
                  {coordinator.designation?.[activeLang] ||
                    coordinator.designation?.en}
                </div>
                <a
                  href={`mailto:${coordinator.email}`}
                  className='text-xs text-[var(--primary-700)]'
                >
                  {coordinator.email}
                </a>
                <button className='ml-4 px-3 py-1 bg-[var(--primary-700)] text-white rounded text-xs font-semibold hover:bg-[var(--primary-800)]'>
                  Book a Consultation
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default ProgramDetail;
