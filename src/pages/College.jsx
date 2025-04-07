import { useParams } from 'react-router-dom';
import { useColleges } from '../hooks/useColleges';
import Faqs from '../components/Faqs/Faqs';
import Hero from '../components/Hero/Hero';
import Navigation from '../components/CollegeNavigation/CollegeNav';
import './College.css'; // Assuming you have some CSS for styling

function Colleges() {
  const { colleges, loading, error } = useColleges();
  const { collegeKey } = useParams();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const college = colleges.find((col) => col.key === collegeKey);

  if (!college) {
    return <div>College not found</div>;
  }

  return (
    <div className='college-page'>
      <Navigation />
      <Hero
        title={college.name}
        description={college.description}
        tagline={college.tagline}
        imageSrc={college.imageSrc}
        imageAlt={college.imageAlt}
        imagePosition={college.imagePosition}
        imageWidth={college.imageWidth}
        imageHeight={college.imageHeight}
      />
      <div className='college-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 shadow-none'>
        {/* College News */}
        <section>
          <h2>News</h2>
        </section>
        {/* College Events */}
        <section>{/* Add your college events content here */}</section>
        {/* College Programs */}
        <section>
          <div className='college-programs'>
            <h2 className='bold'>Programs Offered</h2>
            {/* <ul className='program-list'>
              {college.programs.map((program, index) => (
                <li key={index} className='program-item'>
                  {program}
                </li>
              ))}
            </ul> */}
          </div>
        </section>
        {/* Message from the Dean */}
        <section></section>
        <section>
          <Faqs />
        </section>
        {/* Student Activities */}
        <section>
          <h2>Student Activities</h2>
          {/* Add your student activities content here */}
        </section>
        {/* Success Stories */}
        <section>
          <h2>Success Stories</h2>
          {/* Add your success stories content here */}
        </section>
      </div>
    </div>
  );
}

export default Colleges;
