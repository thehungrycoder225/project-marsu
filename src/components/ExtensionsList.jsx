import { useColleges } from '../hooks/useColleges';
import { useState } from 'react';

function ExtensionsList({ collegeKey }) {
  const { colleges, extensions, loading, error } = useColleges();
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
  // Filter extensions for this college
  const collegeExtensions = extensions.filter(
    (e) => String(e.collegeId) === String(college?.id)
  );
  // Filter by search
  const filteredExtensions = collegeExtensions.filter((e) =>
    (e.title?.[lang] || e.title || '')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!college) return <div>No extensions found for this college.</div>;

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Extension Projects</h2>
      <input
        type='text'
        placeholder='Search extensions...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='border px-2 py-1 rounded mb-4 w-full md:w-64'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {filteredExtensions.map((e) => (
          <div key={e.id} className='p-4 border rounded'>
            <h3 className='font-semibold'>{e.title?.[lang] || e.title}</h3>
            <p className='text-xs text-gray-500'>Year: {e.publicationYear}</p>
            <details className='mt-2'>
              <summary className='cursor-pointer text-xs text-gray-500'>
                Show Summary
              </summary>
              <div className='text-sm'>{e.abstract?.[lang] || e.abstract}</div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExtensionsList;
