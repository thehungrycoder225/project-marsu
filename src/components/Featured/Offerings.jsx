import { Link } from 'react-router-dom';
import { useColleges } from '../../hooks/useColleges';

function Offerings({ collegeKey }) {
  const { colleges, programs, loading, error } = useColleges();
  const lang = 'en';

  // Find the college by slug/shortName/id (support both string and object for shortName)
  const college = colleges.find(
    (col) =>
      col.slug === collegeKey ||
      (typeof col.shortName === 'object' &&
        Object.values(col.shortName).includes(collegeKey)) ||
      col.shortName === collegeKey ||
      String(col.id) === collegeKey
  );

  // Get programIds from the college
  const programIds = college?.programIds || [];
  // Get the program objects for this college
  const collegePrograms = programs.filter((p) => programIds.includes(p.id));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!college) return <div>No offerings available for this college.</div>;
  if (!collegePrograms.length) {
    return <div>No offerings available for this college.</div>;
  }

  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4'>
      <div className='sm:col-span-1 md:col-span-1 mb-4'>
        <h2 className='text-2xl font-bold mb-4'>Program Offerings</h2>
        <p className='text-gray-700 text-sm'>
          Explore our diverse range of programs designed to equip you with the
          skills and knowledge needed for a successful career.
        </p>
      </div>
      <div className='md:col-span-2 sm:col-span-1'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4'>
          {collegePrograms.map((offering) => (
            <div key={offering.id} className=''>
              {/* Use a placeholder image if none provided */}
              <img
                src={offering.imageUrl || 'https://placehold.co/600x400'}
                alt={offering.name?.[lang] || offering.name}
                className='w-full h-48 object-cover rounded-t-lg mb-4'
              />
              <h3 className='text-md font-semibold'>
                {offering.name?.[lang] || offering.name}
              </h3>
              <p className='text-gray-700 text-sm'>
                {offering.description?.[lang] || offering.description || ''}
              </p>
              {/* If you have a program details page, link to it here */}
              {offering.link && (
                <Link
                  to={offering.link}
                  className='text-blue-500 mt-2 inline-block'
                >
                  Learn More
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Offerings;
