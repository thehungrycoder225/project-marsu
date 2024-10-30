import { useParams } from 'react-router-dom';
import Section from '../components/Section';
import { Container } from 'react-bootstrap';
import PageNotFound from './404';
import projects from './projects'; // Ensure this path is correct

const SGDProject = () => {
  const { id } = useParams();
  const project = projects.find((project) => project.id === parseInt(id));

  if (!project) {
    return <PageNotFound />;
  }

  return (
    <Container>
      <Section>
        <img
          src={project.image}
          alt={project.title}
          className='feature_image '
        />
      </Section>
      <Section>
        <div className='row'>
          <div className='col-md-6'>
            <div className='sgd_content--text--contaier'>
              <h3 className='sgd_heading'>{project.title}</h3>
              <p className='fs-4 fw-light sgd_description'>
                {project.description}
              </p>
            </div>
          </div>
          <div className='col-md-6'>
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
        <div className='row'>
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
        <div className='row'>
          <div className='col-md-12 p-32'>
            <div className='sgd_content--text--container'>
              <h3 className='sgd_heading'>Overview</h3>
              <p className='fs-4 fw-light sgd_description'>
                {project.overview}
              </p>
            </div>
          </div>
        </div>
        {/* objectives */}
        <div className='row'>
          <div className='col-md-12'>
            <h3 className='sgd_heading'>Objectives</h3>
            <ul>
              {project.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section>
        <div className='row'>
          <div className='col-md-6'>
            <h3 className='sgd_heading'>Environment</h3>
            {project.environment.map((env, index) => (
              <p key={index}>
                <b>Nature:</b> {env.nature}
                <br />
                <b>Industry:</b> {env.industry}
                <br />
                <b>Government:</b> {env.government}
              </p>
            ))}
          </div>
          <div className='col-md-6'>
            <h3 className='sgd_heading'>Resources</h3>
            <ul>
              <li>
                <b>Human:</b> {project.resources[0].human.join(', ')}
              </li>
              <li>
                <b>Financial:</b> {project.resources[0].financial.join(', ')}
              </li>
              <li>
                <b>Technical:</b> {project.resources[0].technical.join(', ')}
              </li>
            </ul>
          </div>
        </div>
      </Section>
      <Section>
        <div className='row'>
          <div className='col-md-12'>
            <h3>Mechanism</h3>
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
        <div className='row'>
          <div className='col-md-12'>
            <h2>Content</h2>
            <p>{project.content}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Key Points</h2>
            <ul>
              {project.waypoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Launch Date</h2>
            <p>{project.launchd}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Proponent</h2>
            <p>{project.proponent}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Progress</h2>
            <p>{project.progress}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Problems</h2>
            <p>{project.problems}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Solution</h2>
            <p>{project.solution}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Completion</h2>
            <p>{project.completion}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Impact</h2>
            <ul>
              {project.impact.map((impact, index) => (
                <li key={index}>{impact}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Output</h2>
            <p>{project.output}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Costing</h2>
            <p>{project.costing}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h2>Future Plans</h2>
            <p>{project.future}</p>
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default SGDProject;
