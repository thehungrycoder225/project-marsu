import { useColleges } from '../hooks/useColleges';
import { useParams } from 'react-router-dom';

function ResearchDetail() {
  const { collegeKey, researchId } = useParams();
  const { research, loading, error } = useColleges();
  const lang = 'en';
  const item = research.find((r) => String(r.id) === String(researchId));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Research project not found.</div>;

  return (
    <div className='max-w-xl mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-2'>
        {item.title?.[lang] || item.title}
      </h2>
      <p className='text-xs text-gray-500 mb-2'>Year: {item.publicationYear}</p>
      <div className='mb-2'>Authors: {item.authors?.join(', ')}</div>
      <div className='mb-2'>Indices: {item.indices?.join(', ')}</div>
      <div className='text-sm'>{item.abstract?.[lang] || item.abstract}</div>
    </div>
  );
}

export default ResearchDetail;
