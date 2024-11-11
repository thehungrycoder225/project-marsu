import { useParams } from 'react-router-dom';
import Section from '../components/Section';
import { Container } from 'react-bootstrap';
import PageNotFound from './404';
import projects from './projects'; // Ensure this path is correct
import Footer from '../components/Footer';
import NavBack from '../components/NavBack';

const SGDProject = () => {
  const { id, title } = useParams();
  const project = projects.find(
    (project) => project.id === parseInt(id) && project.title
  );

  if (!project) {
    return <PageNotFound />;
  }

  return (
    <>
      <NavBack />
      <Container className='flow-content'>
        <Section>
          <img
            src={project.image}
            alt={project.title}
            className='feature_image '
          />
        </Section>
        <Section>
          <div className=' bg-glass  box-shadow align-items-center'>
            <div className='sdg_project--content'>
              <div className='sgd_content-logo'>
                <img src={project.logo} alt={project.title} />
              </div>
              <div className=''>
                <div className='sgd_content--text--container'>
                  <h3 className='sdg_project--title'>{project.title}</h3>
                  <p className='sdg_project--subtitle'>{project.subtitle}</p>
                  <p className='sdg_project--description'>{project.desc}</p>
                  <div className='flex justify-between text-base w-100 flex-auto'>
                    <p>
                      {' '}
                      Author:{' '}
                      <span className='sdg_project--author'>
                        {project.author}
                      </span>{' '}
                    </p>{' '}
                    <p>
                      Date:{' '}
                      <span className='sdg_project--date'>{project.date}</span>
                    </p>
                  </div>
                  <div className='sdg_project--tags'>
                    {project.tags.map((tag) =>
                      tag.icons.map((icon, index) => (
                        <img
                          key={`${tag.id}-${index}`}
                          src={`sdg/project/goals/${icon}`}
                          alt={tag.name}
                          className='sdg_project--icon'
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
        <Section>
          <div className='sgd_project '>
            {project.contents.map((content, index) => (
              <div key={index} className='flow-content'>
                {content.background && (
                  <div className='bg-white flow-content'>
                    <h4 className='sdg_project--heading'>Background</h4>
                    <p className='sdg_project--description'>
                      {content.background}
                    </p>
                  </div>
                )}
                {content.highlights && (
                  <div className='bg-muted flow-content flow-content'>
                    <h4 className='sdg_project--heading'>Highlights</h4>
                    <ul>
                      {content.highlights.map((highlight, idx) => (
                        <li key={idx} className='sdg_project--description'>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {content.impact && (
                  <div className='bg-white flow-content'>
                    <h4 className='sdg_project--heading'>Impact</h4>
                    <ul className='flow-content'>
                      {content.impact.map((impact, idx) => (
                        <li key={idx} className='sdg_project--description'>
                          {impact}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {content.outcomes && (
                  <div className='bg-muted flow-content'>
                    <h4 className='sdg_project--heading'>Outcomes</h4>
                    <ul className='flow-content'>
                      {content.outcomes.map((outcome, idx) => (
                        <li key={idx} className='sdg_project--description'>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {content.plans && (
                  <div className='bg-white flow-content'>
                    <h4 className='sdg_project--heading'>Future Plans</h4>
                    <ul className='flow-content'>
                      {content.plans.map((plan, idx) => (
                        <li key={idx} className='sdg_project--description'>
                          {plan}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
        <Section>
          <div className=' bg-muted flow-content'>
            <h4 className='sdg_project--heading'>Conclusion</h4>
            <p className='sdg_project--description'>{project.conclusion}</p>
          </div>
        </Section>
        <Section>
          <div className=' bg-white flow-content'>
            <h4 className='sdg_project--heading'>Call to Action</h4>
            <p className='sdg_project--description'>{project.cta}</p>{' '}
          </div>
        </Section>
        <Section>
          <div className='bg-muted box-shadow flow-content'>
            <h4 className='sdg_project--heading'>Gallery</h4>
            <div className='sdg_project--gallery'>
              {project.gallery.map((img, index) => (
                <div key={index} className=''>
                  <img src={img.image} alt={project.title} className='' />
                </div>
              ))}
            </div>
          </div>
        </Section>
      </Container>
      <Section>
        <div className='bg-animation'>
          <div id='stars'></div>
          <div id='stars2'></div>
          <div id='stars3'></div>
          <div id='stars4'></div>
        </div>
      </Section>
      <Section>
        <div className='area'>
          <ul className='circles'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default SGDProject;
