import { useColleges } from '../hooks/useColleges';

function FacultyList({ collegeKey }) {
  const { colleges, faculty, loading, error } = useColleges();
  const lang = 'en';

  // Find the college
  const college = colleges.find(
    (col) =>
      col.slug === collegeKey ||
      (typeof col.shortName === 'object' &&
        Object.values(col.shortName).includes(collegeKey)) ||
      col.shortName === collegeKey ||
      String(col.id) === collegeKey
  );
  // Filter faculty for this college
  const collegeFaculty = faculty.filter(
    (f) => String(f.collegeId) === String(college?.id)
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!college) return <div>No faculty found for this college.</div>;

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Faculty</h2>
      <input
        type='text'
        placeholder='Search faculty...'
        className='border px-2 py-1 rounded mb-4 w-full md:w-64'
        // Add search logic if needed
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {collegeFaculty.map((f) => (
          <div key={f.id} className='p-4 border rounded'>
            <img
              src={f.image || 'https://placehold.co/100x100'}
              alt={f.name?.[lang] || f.name}
              className='w-20 h-20 object-cover rounded-full mb-2'
            />
            <h3 className='font-semibold'>{f.name?.[lang] || f.name}</h3>
            <p className='text-sm text-gray-600'>
              {f.designation?.[lang] || f.designation}
            </p>
            <p className='text-xs text-gray-500'>{f.email}</p>
            {f.publications && f.publications.length > 0 && (
              <details className='mt-2'>
                <summary className='cursor-pointer text-xs text-gray-500'>
                  Show Publications
                </summary>
                <ul className='text-xs'>
                  {f.publications.map((pub, idx) => (
                    <li key={idx}>{pub}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyList;
