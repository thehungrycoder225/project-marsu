import { useColleges } from '../hooks/useColleges';
import { useState } from 'react';

function AlumniList({ collegeKey }) {
  const { colleges, alumni, loading, error } = useColleges();
  const [search, setSearch] = useState('');
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
  // Filter alumni for this college
  const collegeAlumni = alumni.filter(
    (a) => String(a.collegeId) === String(college?.id)
  );
  // Filter by search
  const filteredAlumni = collegeAlumni.filter(
    (a) =>
      (a.name?.[lang] || a.name || '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (a.career?.[lang] || a.career || '')
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!college) return <div>No alumni found for this college.</div>;

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Alumni</h2>
      <input
        type='text'
        placeholder='Search alumni...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='border px-2 py-1 rounded mb-4 w-full md:w-64'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {filteredAlumni.map((a) => (
          <div key={a.id} className='p-4 border rounded'>
            <img
              src={a.image || 'https://placehold.co/100x100'}
              alt={a.name?.[lang] || a.name}
              className='w-20 h-20 object-cover rounded-full mb-2'
            />
            <h3 className='font-semibold'>{a.name?.[lang] || a.name}</h3>
            <p className='text-sm text-gray-600'>
              {a.career?.[lang] || a.career}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlumniList;
