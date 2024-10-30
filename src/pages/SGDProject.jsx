import { useParams } from 'react-router-dom';
import Section from '../components/Section';
import { Container } from 'react-bootstrap';
import PageNotFound from './404';
import projects from './projects'; // Ensure this path is correct
import Footer from '../components/Footer';

const SGDProject = () => {
  const { id } = useParams();
  const project = projects.find((project) => project.id === parseInt(id));

  if (!project) {
    return <PageNotFound />;
  }

  return (
    <>
      <Container>
        <Section>
          <img
            src={project.image}
            alt={project.title}
            className='feature_image '
          />
        </Section>
        <Section>
          <div className='row bg-off-white '>
            <div className='col-md-6'>
              <div className='sgd_content--text--contaier'>
                <h3 className='sdg_project--title'>{project.title}</h3>
                <p className='sgd_project--description'>
                  {project.description}
                </p>
              </div>
            </div>
            <div className='col-md-6'>
              {project.tags.map((tag, index) =>
                tag.image.map((icon, index) => (
                  <img
                    key={`${tag.id}-${index}`}
                    src={`goals/${icon}`}
                    alt={tag.name}
                    className='sgd_card--tag'
                  />
                ))
              )}
            </div>
          </div>
        </Section>
        <Section>
          {/* abstract */}
          <div className='row bg-white '>
            <div className='col-md-12'>
              <div className='sgd_content--text--container'>
                <h3 className='sdg_project--title'>Abstract</h3>
                <p className='sgd_project--description'>{project.abstract}</p>
              </div>
            </div>
          </div>
          {/* overview */}
          <div className='row bg-white box-shadow'>
            <div className='col-md-12'>
              <div className='sgd_content--text--container'>
                <h3 className='sdg_project--title'>Overview</h3>
                <p className='sgd_project--description'>{project.overview}</p>
              </div>
            </div>
          </div>
          {/* objectives */}
          <div className='row bg-white box-shadow'>
            <div className='col-md-12'>
              <h3 className='sdg_project--title'>Objectives</h3>

              {project.objectives.map((objective, index) => (
                <div key={index}>
                  <ul>
                    <li className='sgd_project--description'> {objective}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>
        <Section>
          <div className='row bg-muted'>
            <div className='col-md-6'>
              <h3 className='sdg_project--title'>Environment</h3>
              {project.environment.map((env, index) => (
                <div key={index}>
                  <ul>
                    <li className='sgd_project--description'>
                      Nature: {env.nature}
                    </li>

                    <li className='sgd_project--description'>
                      Industry: {env.industry}
                    </li>

                    <li className='sgd_project--description'>
                      Government: {env.government}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <div className='col-md-6'>
              <h3 className='sdg_project--title'>Resources</h3>
              <ul>
                <li className='sgd_project--description'>
                  <>Human:</> {project.resources[0].human.join(', ')}
                </li>
                <li className='sgd_project--description'>
                  <>Financial:</> {project.resources[0].financial.join(', ')}
                </li>
                <li className='sgd_project--description'>
                  <>Technical:</> {project.resources[0].technical.join(', ')}
                </li>
              </ul>
            </div>
          </div>
        </Section>
        <Section>
          <div className='row bg-muted'>
            <div className='col-md-12'>
              <h3 className='sdg_project--title'>Mechanism</h3>
              {project.mechanism.map((mech, index) => (
                <div key={index}>
                  <ul>
                    <li className='sgd_project--description'>
                      Planning: {mech.planning}{' '}
                    </li>
                    <li className='sgd_project--description'>
                      Implementation: {mech.implementation}
                    </li>
                    <li className='sgd_project--description'>
                      Monitoring: {mech.monitoring}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>
        <Section>
          <div className='bg-white box-shadow'>
            <div className='row bg-white'>
              <div className='col-md-12'>
                <h3 className='sdg_project--title'>Content</h3>
                <p className='sgd_project--description'>{project.content}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sdg_project--title'>Key Points</h3>

                {project.waypoints.map((point, index) => (
                  <div key={index}>
                    <ul>
                      <li className='sgd_project--description'>{point} </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sdg_project--title'>Launch Date</h3>
                <p className='sgd_project--description'>{project.launchd}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sdg_project--title'>Proponent</h3>
                <p className='sgd_project--description'>{project.proponent}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sdg_project--title'>Progress</h3>
                <p className='sgd_project--description'>{project.progress}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sdg_project--title'>Problems</h3>
                <p className='sgd_project--description'>{project.problems}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sdg_project--title'>Solution</h3>
                <p className='sgd_project--description'>{project.solution}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sdg_project--title'>Completion</h3>
                <p className='sgd_project--description'>{project.completion}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sdg_project--title'>Impact</h3>

                {project.impact.map((impact, index) => (
                  <div key={index}>
                    <ul>
                      <li className='sgd_project--description'> {impact}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sdg_project--title'>Output</h3>
                <p className='sgd_project--description'>{project.output}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sdg_project--title'>Costing</h3>
                <p className='sgd_project--description'>{project.costing}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sdg_project--title'>Future Plans</h3>
                <p className='sgd_project--description'>{project.future}</p>
              </div>
            </div>
          </div>
        </Section>
      </Container>
      <Footer />
    </>
  );
};

export default SGDProject;
