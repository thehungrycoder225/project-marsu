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
                <h3 className='sgd_heading'>{project.title}</h3>
                <p className='fs-4 fw-light sgd_description'>
                  {project.description}
                </p>
              </div>
            </div>
            <div className='col-md-6'>
              <h3 className='sgd_heading'>SGD Goals</h3>
              {project.tags.map((tag, index) => (
                <img
                  key={index}
                  src={tag.image}
                  alt={tag.name}
                  className='project-tag-image'
                />
              ))}
            </div>
          </div>
        </Section>
        <Section>
          {/* abstract */}
          <div className='row bg-white '>
            <div className='col-md-12'>
              <div className='sgd_content--text--container'>
                <h3 className='sgd_heading'>Abstract</h3>
                <p className='fs-4 fw-light sgd_description'>
                  {project.abstract}
                </p>
              </div>
            </div>
          </div>
          {/* overview */}
          <div className='row bg-white box-shadow'>
            <div className='col-md-12'>
              <div className='sgd_content--text--container'>
                <h3 className='sgd_heading'>Overview</h3>
                <p className='fs-4 fw-light sgd_description'>
                  {project.overview}
                </p>
              </div>
            </div>
          </div>
          {/* objectives */}
          <div className='row bg-white box-shadow'>
            <div className='col-md-12'>
              <h3 className='sgd_heading'>Objectives</h3>
              <ul>
                {project.objectives.map((objective, index) => (
                  <p className='fs-4 fw-light sgd_description' key={index}>
                    {objective}
                  </p>
                ))}
              </ul>
            </div>
          </div>
        </Section>
        <Section>
          <div className='row bg-muted'>
            <div className='col-md-6'>
              <h3 className='sgd_heading'>Environment</h3>
              {project.environment.map((env, index) => (
                <div key={index}>
                  <ul>
                    <li>Nature: {env.nature}</li>

                    <li>Industry: {env.industry}</li>

                    <li>Government: {env.government}</li>
                  </ul>
                </div>
              ))}
            </div>
            <div className='col-md-6'>
              <h3 className='sgd_heading'>Resources</h3>
              <ul>
                <li>
                  <>Human:</> {project.resources[0].human.join(', ')}
                </li>
                <li>
                  <>Financial:</> {project.resources[0].financial.join(', ')}
                </li>
                <li>
                  <>Technical:</> {project.resources[0].technical.join(', ')}
                </li>
              </ul>
            </div>
          </div>
        </Section>
        <Section>
          <div className='row bg-muted'>
            <div className='col-md-12'>
              <h3 className='sgd_heading'>Mechanism</h3>
              {project.mechanism.map((mech, index) => (
                <div key={index}>
                  <ul>
                    <li>Planning: {mech.planning} </li>
                    <li>Implementation: {mech.implementation}</li>
                    <li>Monitoring: {mech.monitoring}</li>
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
                <h3 className='sgd_heading'>Content</h3>
                <p>{project.content}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sgd_heading'>Key Points</h3>
                <ul>
                  {project.waypoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sgd_heading'>Launch Date</h3>
                <p>{project.launchd}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sgd_heading'>Proponent</h3>
                <p>{project.proponent}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sgd_heading'>Progress</h3>
                <p>{project.progress}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sgd_heading'>Problems</h3>
                <p>{project.problems}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sgd_heading'>Solution</h3>
                <p>{project.solution}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sgd_heading'>Completion</h3>
                <p>{project.completion}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sgd_heading'>Impact</h3>
                <ul>
                  {project.impact.map((impact, index) => (
                    <p key={index}>{impact}</p>
                  ))}
                </ul>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sgd_heading'>Output</h3>
                <p>{project.output}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3>Costing</h3>
                <p>{project.costing}</p>
              </div>
            </div>
            <div className='row p-32'>
              <div className='col-md-12'>
                <h3 className='sgd_heading'>Future Plans</h3>
                <p>{project.future}</p>
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
