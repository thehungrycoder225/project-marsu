import { useColleges } from '../hooks/useColleges';
import { useParams } from 'react-router-dom';

function FacultyDetail() {
  const { collegeKey, facultyId } = useParams();
  const { colleges, faculty, loading, error } = useColleges();
  const lang = 'en';
  const member = faculty.find((f) => String(f.id) === String(facultyId));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!member) return <div>Faculty member not found.</div>;

  return (
    <div className='max-w-xl mx-auto p-4'>
      <img
        src={member.image || 'https://placehold.co/100x100'}
        alt={member.name?.[lang] || member.name}
        className='w-32 h-32 object-cover rounded-full mb-4'
      />
      <h2 className='text-2xl font-bold mb-2'>
        {member.name?.[lang] || member.name}
      </h2>
      <p className='text-md text-gray-600 mb-2'>
        {member.designation?.[lang] || member.designation}
      </p>
      <p className='text-xs text-gray-500 mb-2'>{member.email}</p>
      {member.publications && member.publications.length > 0 && (
        <div className='mt-4'>
          <h3 className='font-semibold mb-1'>Publications</h3>
          <ul className='list-disc pl-5 text-sm'>
            {member.publications.map((pub, idx) => (
              <li key={idx}>{pub}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FacultyDetail;
