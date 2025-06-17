import { useColleges } from '../hooks/useColleges';
import { useState } from 'react';

function StudentAchievementsList({ collegeKey }) {
  const { colleges, studentAchievements, loading, error } = useColleges();
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
  // Filter achievements for this college
  const collegeAchievements = studentAchievements.filter(
    (a) => String(a.collegeId) === String(college?.id)
  );
  // Filter by search
  const filteredAchievements = collegeAchievements.filter((a) =>
    (a.type?.[lang] || a.type || '')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!college)
    return <div>No student achievements found for this college.</div>;

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Student Achievements</h2>
      <input
        type='text'
        placeholder='Search achievements...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='border px-2 py-1 rounded mb-4 w-full md:w-64'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {filteredAchievements.map((a) => (
          <div key={a.id} className='p-4 border rounded'>
            <h3 className='font-semibold'>{a.type?.[lang] || a.type}</h3>
            <p className='text-sm'>{a.description?.[lang] || a.description}</p>
            {a.image && (
              <img
                src={a.image}
                alt=''
                className='w-32 h-20 object-cover mt-2'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentAchievementsList;
