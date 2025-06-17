import { useColleges } from '../hooks/useColleges';
import { useParams } from 'react-router-dom';

function StudentProfileDetail() {
  const { collegeKey, profileId } = useParams();
  const { studentProfiles, loading, error } = useColleges();
  const profile = studentProfiles.find(
    (p) => String(p.id) === String(profileId)
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Student profile not found.</div>;

  return (
    <div className='max-w-xl mx-auto p-4'>
      <img
        src={profile.image || 'https://placehold.co/100x100'}
        alt=''
        className='w-32 h-32 object-cover rounded-full mb-4'
      />
      <h2 className='text-2xl font-bold mb-2'>Student Profile</h2>
      <p className='text-md text-gray-600 mb-2'>
        Program ID: {profile.programId}
      </p>
      <p className='text-md text-gray-600 mb-2'>Rate: {profile.rate}</p>
      <p className='text-md text-gray-600 mb-2'>
        Enrollment Growth: {profile.growth}
      </p>
      <p className='text-md text-gray-600 mb-2'>
        Employability: {profile.employability}
      </p>
    </div>
  );
}

export default StudentProfileDetail;
