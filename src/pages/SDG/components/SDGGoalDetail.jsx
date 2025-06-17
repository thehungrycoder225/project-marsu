import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Section from '../../../components/Section';
import goals from './goals';
import projects from './projects';
import NavBack from '../../../components/NavBack';
import SDGNav from './SDGNav';
import SDGGoalMedia from './SDGGoalMedia';
import SDGGoalPartners from './SDGGoalPartners';
import SDGGoalTestimonials from './SDGGoalTestimonials';
import SDGGoalShare from './SDGGoalShare';
import SDGGoalTabs from './SDGGoalTabs';
import { motion } from 'framer-motion';
import './sdggoal.css';

const SDGGoalDetail = () => {
  const { id } = useParams();
  const goal = goals.find((goal) => goal.id === parseInt(id));

  if (!goal) {
    return <div>Goal not found</div>;
  }

  const relatedProjects = projects.filter((project) =>
    project.tags.some((tag) => tag.name.includes(goal.title))
  );

  // Placeholder: Replace with real data fields as available
  const media = goal.media || [];
  const partners = goal.partners || [];
  const testimonials = goal.testimonials || [];

  const tabs = [
    {
      label: 'Overview',
      content: (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='flex flex-col gap-4'>
            <h3 className='text-2xl font-bold text-primary-700 mb-2'>
              {goal.subtitle}
            </h3>
            {goal.statement.map((statement, index) => (
              <p
                key={index}
                className='text-lg font-light text-justify text-gray-700'
              >
                {statement.text}
              </p>
            ))}
          </div>
        </motion.div>
      ),
    },
    {
      label: 'Media',
      content: <SDGGoalMedia media={media} />,
    },
    {
      label: 'Partners',
      content: <SDGGoalPartners partners={partners} />,
    },
    {
      label: 'Testimonials',
      content: <SDGGoalTestimonials testimonials={testimonials} />,
    },
    {
      label: 'Related Projects',
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {relatedProjects.length > 0 ? (
            relatedProjects.map((project) => (
              <div
                key={project.id}
                className='bg-white/70 backdrop-blur rounded-xl shadow-lg p-6 flex flex-col gap-4 hover:scale-105 transition-transform'
              >
                <Link to={project.link} className='flex flex-col h-full'>
                  <img
                    src={`${project.image}`}
                    alt={project.title}
                    className='rounded-lg object-cover aspect-[4/3] mb-3'
                  />
                  <h4 className='text-lg font-bold text-primary-700 mb-1'>
                    {project.title}
                  </h4>
                  <div className='flex flex-wrap gap-2 mt-auto'>
                    {project.tags.map((tag) =>
                      tag.icons.map((icon, index) => (
                        <img
                          key={`${tag.id}-${index}`}
                          src={`sdg/${icon}`}
                          alt={tag.name}
                          className='w-8 h-8 object-contain'
                        />
                      ))
                    )}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>No related projects found.</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <NavBack />
      <SDGNav />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <motion.div
          className='relative flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-white/80 to-blue-50/60 shadow-xl rounded-2xl p-8 mb-8 backdrop-blur'
          style={{
            backgroundImage: `linear-gradient( to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${`sdg/sdg-bg-${goal.id}.png`})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='flex flex-col items-center md:items-start gap-4 md:w-1/4'>
            <img
              src={goal.image}
              alt={goal.alt}
              className='w-24 h-24 md:w-32 md:h-32 rounded-full object-contain border-4 border-white shadow'
            />
            <img
              src={goal.logo}
              alt={goal.alt}
              className='w-32 h-16 object-contain'
            />
          </div>
          <div className='flex-1 w-full'>
            <SDGGoalShare title={goal.title} />
          </div>
        </motion.div>
        <SDGGoalTabs tabs={tabs} />
        <Section>
          <div className='flex justify-center my-8'>
            <a
              href='#get-involved'
              className='bg-gradient-to-r from-pink-500 to-blue-600 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:from-pink-600 hover:to-blue-700 transition-all duration-200 font-semibold'
            >
              Get Involved
            </a>
          </div>
        </Section>
      </div>
    </>
  );
};

export default SDGGoalDetail;
