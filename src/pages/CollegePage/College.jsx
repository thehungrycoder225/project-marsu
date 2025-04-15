import { useParams } from 'react-router-dom';
import { useColleges } from '../../hooks/useColleges';
import Faqs from '../../components/Faqs/Faqs';
import Hero from '../../components/Hero/Hero';
import Offerings from '../../components/Featured/Offerings';
import News from '../../components/News';
import Navigation from '../../components/CollegeNavigation/CollegeNav';
import Section from '../../components/Section';
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
    <div className='college-page '>
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
      <div className='college-container mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8'>
        {/* College News */}
        <Section>
          <News collegeKey={collegeKey} />
        </Section>
        {/* College Events */}
        <Section>{/* Add your college events content here */}</Section>
        {/* College Programs */}
        <Section>
          <Offerings collegeKey={collegeKey} />
        </Section>
        {/* Message from the Dean */}
        <section></section>
        <Section>
          <Faqs />
        </Section>
        {/* Student Activities */}
        <Section>
          <h2>Student Activities</h2>
          {/* Add your student activities content here */}
        </Section>
        {/* Success Stories */}
        <Section>
          <h2>Success Stories</h2>
          {/* Add your success stories content here */}
        </Section>
      </div>
    </div>
  );
}

export default Colleges;
