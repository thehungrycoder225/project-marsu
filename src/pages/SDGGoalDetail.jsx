import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import goals from './goals'; // Adjust the import path as needed
import projects from './projects'; // Adjust the import path as needed
import NavBack from '../components/NavBack';
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

  return (
    <>
      <NavBack />

      <div className='container'>
        <h1>{goal.title}</h1>
        <div className='goal-detail'>
          <div>
            <img src={goal.image} alt={goal.alt} />
          </div>
          <div>
            <p>{goal.description}</p>
          </div>
        </div>
        <div className='related-projects'>
          <Section>
            <div className='sgd_content'>
              <div className='sgd_content--text--container'>
                <h3 className='sgd_heading'>Related Projects</h3>
                <div className='sgd__project--container'>
                  {relatedProjects.length > 0 ? (
                    relatedProjects.map((project) => (
                      <>
                        <div key={project.id} className='sgd_card'>
                          <Link to={project.link}>
                            <img
                              src={`sdg/project/${project.image}`}
                              alt={project.title}
                              className='sgd_card--image'
                            />

                            <h4 className='sgd_card--title'>{project.title}</h4>

                            <p className='sgd_card--description'>
                              {project.description}
                            </p>
                            <div className='sgd_card--tags'>
                              {project.tags.map((tag) =>
                                tag.image.map((icon, index) => (
                                  <img
                                    key={`${tag.id}-${index}`}
                                    src={`sdg/${icon}`}
                                    alt={tag.name}
                                    className='sgd_card--tag'
                                  />
                                ))
                              )}
                            </div>
                          </Link>
                        </div>
                      </>
                    ))
                  ) : (
                    <p>No related projects found.</p>
                  )}
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

export default SDGGoalDetail;
