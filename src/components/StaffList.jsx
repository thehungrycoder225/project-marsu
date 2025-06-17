import { useColleges } from '../hooks/useColleges';

function StaffList({ collegeKey }) {
  const { colleges, staff, loading, error } = useColleges();
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
  // Filter staff for this college
  const collegeStaff = staff.filter(
    (s) => String(s.collegeId) === String(college?.id)
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!college) return <div>No staff found for this college.</div>;

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Staff</h2>
      <input
        type='text'
        placeholder='Search staff...'
        className='border px-2 py-1 rounded mb-4 w-full md:w-64'
        // Add search logic if needed
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {collegeStaff.map((s) => (
          <div key={s.id} className='p-4 border rounded'>
            <img
              src={s.image || 'https://placehold.co/100x100'}
              alt={s.name?.[lang] || s.name}
              className='w-20 h-20 object-cover rounded-full mb-2'
            />
            <h3 className='font-semibold'>{s.name?.[lang] || s.name}</h3>
            <p className='text-sm text-gray-600'>
              {s.designation?.[lang] || s.designation}
            </p>
            <p className='text-xs text-gray-500'>{s.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaffList;
