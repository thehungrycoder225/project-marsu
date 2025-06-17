import { useColleges } from '../hooks/useColleges';

function FeaturedTestimonial({ collegeKey }) {
  const { colleges, alumniTestimonials, loading, error } = useColleges();
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
  // Filter testimonials for this college's alumni
  const alumniIds = college ? college.alumniIds || [] : [];
  const testimonials = alumniTestimonials.filter((t) =>
    alumniIds.includes(t.alumniId)
  );
  // Show only the first/featured testimonial
  const featured = testimonials[0];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!college || !featured)
    return <div>No testimonial available for this college.</div>;

  return (
    <div className='p-4 border rounded bg-gray-50'>
      <h2 className='text-2xl font-bold mb-4'>Featured Alumni Testimonial</h2>
      <img
        src={featured.image || 'https://placehold.co/100x100'}
        alt={featured.name?.[lang] || featured.name}
        className='w-20 h-20 object-cover rounded-full mb-2'
      />
      <h3 className='font-semibold'>
        {featured.name?.[lang] || featured.name}
      </h3>
      <p className='text-sm'>{featured.story?.[lang] || featured.story}</p>
    </div>
  );
}

export default FeaturedTestimonial;
