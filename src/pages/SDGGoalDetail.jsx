import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import goals from './goals';
import projects from './projects';
import NavBack from '../components/NavBack';
import SDGNav from './SDGNav';
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

      <SDGNav />
      <div className='container'>
        <div
          className='goal-detail'
          style={{
            background: `
            linear-gradient( to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            url(${`sdg/sdg-bg-${goal.id}.png`}) center/cover no-repeat`,
          }}
        >
          <div className='goal-images'>
            <img src={goal.image} alt={goal.alt} className='sdg_detail_icon' />
            <img src={goal.logo} alt={goal.alt} className='sdg_detail_logo' />
          </div>
          <div className='goal-text-container'>
            <h3 className='sdg_detail_subtitle'>{goal.subtitle}</h3>
            {goal.statement.map((statement, index) => (
              <p
                key={index}
                className=' fs-4 fw-light sgd_description text-justify'
              >
                {statement.text}
              </p>
            ))}
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
                              src={`${project.image}`}
                              alt={project.title}
                              className='sgd_card--image'
                            />

                            <h4 className='sgd_card--title'>{project.title}</h4>

                            {/* <p className='sgd_card--description'>
                              {project.description}
                            </p> */}
                            <div className='sgd_card--tags'>
                              {project.tags.map((tag) =>
                                tag.icons.map((icon, index) => (
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
