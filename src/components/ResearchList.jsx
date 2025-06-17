import { useColleges } from '../hooks/useColleges';
import { useState } from 'react';

function ResearchList({ collegeKey }) {
  const { colleges, research, loading, error } = useColleges();
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
  // Filter research for this college
  const collegeResearch = research.filter(
    (r) => String(r.collegeId) === String(college?.id)
  );
  // Filter by search
  const filteredResearch = collegeResearch.filter(
    (r) =>
      (r.title?.[lang] || r.title || '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (r.authors?.join(', ') || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!college) return <div>No research found for this college.</div>;

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Research</h2>
      <input
        type='text'
        placeholder='Search research...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='border px-2 py-1 rounded mb-4 w-full md:w-64'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {filteredResearch.map((r) => (
          <div key={r.id} className='p-4 border rounded'>
            <h3 className='font-semibold'>{r.title?.[lang] || r.title}</h3>
            <p className='text-xs text-gray-500'>Year: {r.publicationYear}</p>
            <p className='text-xs text-gray-500'>
              Authors: {r.authors?.join(', ')}
            </p>
            <details className='mt-2'>
              <summary className='cursor-pointer text-xs text-gray-500'>
                Show Abstract
              </summary>
              <div className='text-sm'>{r.abstract?.[lang] || r.abstract}</div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResearchList;
