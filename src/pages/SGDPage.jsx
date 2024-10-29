import HeroComponent from '../components/Hero';
import Section from '../components/Section';
import logo from '../assets/sgd-logo.png';
import './sgd.css';
import { Container } from 'react-bootstrap';

function SGDPage() {
  return (
    <>
      <HeroComponent
        brand={logo}
        titleText={'sgd_title'}
        title='Sustainable Goals Development Center'
        description='Marinduque State University is committed to eradicating poverty and promoting sustainable development through education, research, and extension services.'
      />
      <Container>
        <Section>
          <div className='sgd_content'>
            <div className='sgd_content--image--container'>
              <img src='avatar-pres.png' alt='President Avatar' />
            </div>
            <div className='sgd_content--text--container'>
              <h3 className='sgd_heading'>
                Empowering change for sustainable future
              </h3>
              <p className='fs-4 fw-light'>
                Join us in our comitment to drive mearningful change, inspire
                global collaboration, and promote sustainable development.
                Together let's build a sustainable future for all.
              </p>
            </div>
          </div>
        </Section>
        <Section></Section>
      </Container>
    </>
  );
}

export default SGDPage;
