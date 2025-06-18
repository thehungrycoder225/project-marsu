import { useParams } from 'react-router-dom';
import { useColleges } from '../../hooks/useColleges';
import Faqs from '../../components/Faqs/Faqs';
import Hero from '../../components/Hero/Hero';
import Offerings from '../../components/Featured/Offerings';
import News from '../../components/News';
import Navigation from '../../components/CollegeNavigation/CollegeNav';
import Section from '../../components/Section';
import CollegeAwards from '../../components/CollegeAwards';
// import './College.css';

function Colleges() {
  const { colleges, loading, error } = useColleges();
  const { collegeKey } = useParams();
  // For localization, fallback to 'en'
  const lang = 'en';

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Find by slug/shortName (collegeKey from URL)
  const college = colleges.find(
    (col) =>
      col.slug === collegeKey ||
      col.shortName.en === collegeKey ||
      String(col.id) === collegeKey
  );

  if (!college) {
    return <div>College not found</div>;
  }

  const profile = college.profile || {};
  const awards = profile.awards || [];

  return (
    <div className='college-page '>
      <Navigation />
      <Hero
        title={college.name?.[lang] || college.name?.en || college.name}
        tagline={profile.tagline?.[lang] || profile.tagline?.en || ''}
        description={profile.history?.[lang] || profile.history?.en || ''}
        imageSrc={college.imageSrc}
        imageAlt={college.imageAlt}
        imagePosition={college.imagePosition}
        imageWidth={college.imageWidth}
        imageHeight={college.imageHeight}
      />
      <div className='college-container mx-auto max-w-7xl '>
        {/* College News */}
        <Section>
          <News collegeKey={collegeKey} />
        </Section>
        {/* College Programs */}
        <Section>
          <Offerings collegeKey={collegeKey} />
        </Section>
        {/* College Awards - only if present */}
        {awards.length > 0 && (
          <Section>
            <CollegeAwards awards={awards} lang={lang} />
          </Section>
        )}

        {/* Message from the Dean - only if present */}
        {profile.deanMessage?.[lang] && (
          <Section>
            <h2>Message from the Dean</h2>
            <p>{profile.deanMessage[lang]}</p>
          </Section>
        )}
        <Section>
          <Faqs />
        </Section>
        {/* Student Activities - placeholder if no data */}
        <Section>
          <h2>Student Activities</h2>
          <p>No student activities available at this time.</p>
        </Section>
        {/* Success Stories - placeholder if no data */}
        <Section>
          <h2>Success Stories</h2>
          <p>No success stories available at this time.</p>
        </Section>
      </div>
    </div>
  );
}

export default Colleges;
