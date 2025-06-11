import { useColleges } from '../hooks/useColleges';

function StudentOrganizationList({ collegeKey }) {
  const { colleges, studentOrganizations, loading, error } = useColleges();
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
  // Filter orgs for this college
  const orgs = studentOrganizations.filter(
    (o) => String(o.collegeId) === String(college?.id)
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!college)
    return <div>No student organizations found for this college.</div>;

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Student Organizations</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {orgs.map((o) => (
          <div key={o.id} className='p-4 border rounded'>
            <img
              src={o.image || 'https://placehold.co/100x100'}
              alt={o.name?.[lang] || o.name}
              className='w-20 h-20 object-cover rounded-full mb-2'
            />
            <h3 className='font-semibold'>{o.name?.[lang] || o.name}</h3>
            <p className='text-sm text-gray-600'>
              {o.designation?.[lang] || o.designation}
            </p>
            {/* Optionally list officers/members here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentOrganizationList;
