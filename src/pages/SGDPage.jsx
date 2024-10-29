import HeroComponent from '../components/Hero';
import Section from '../components/Section';
import logo from '../assets/sgd-logo.png';
import './sgd.css';
import Marquee from 'react-fast-marquee';
import { Container } from 'react-bootstrap';

const goals = [
  {
    id: 1,
    image: 'sgd/E-WEB-Goal-01.png',
    alt: 'No Poverty',
  },
  {
    id: 2,
    image: 'sgd/E-WEB-Goal-02.png',
    alt: 'Zero Hunger',
  },
  {
    id: 3,
    image: 'sgd/E-WEB-Goal-03.png',
    alt: 'Good Health and Well-being',
  },
  {
    id: 4,
    image: 'sgd/E-WEB-Goal-04.png',
    alt: 'Quality Education',
  },
  {
    id: 5,
    image: 'sgd/E-WEB-Goal-05.png',
    alt: 'Gender Equality',
  },
  {
    id: 6,
    image: 'sgd/E-WEB-Goal-06.png',
    alt: 'Clean Water and Sanitation',
  },
  {
    id: 7,
    image: 'sgd/E-WEB-Goal-07.png',
    alt: 'Affordable and Clean Energy',
  },
  {
    id: 8,
    image: 'sgd/E-WEB-Goal-08.png',
    alt: 'Decent Work and Economic Growth',
  },
  {
    id: 9,
    image: 'sgd/E-WEB-Goal-09.png',
    alt: 'Industry, Innovation, and Infrastructure',
  },
  {
    id: 10,
    image: 'sgd/E-WEB-Goal-10.png',
    alt: 'Reduced Inequality',
  },
  {
    id: 11,
    image: 'sgd/E-WEB-Goal-11.png',
    alt: 'Sustainable Cities and Communities',
  },
  {
    id: 12,
    image: 'sgd/E-WEB-Goal-12.png',
    alt: 'Responsible Consumption and Production',
  },
  {
    id: 13,
    image: 'sgd/E-WEB-Goal-13.png',
    alt: 'Climate Action',
  },
  {
    id: 14,
    image: 'sgd/E-WEB-Goal-14.png',
    alt: 'Life Below Water',
  },
  {
    id: 15,
    image: 'sgd/E-WEB-Goal-15.png',
    alt: 'Life on Land',
  },
  {
    id: 16,
    image: 'sgd/E-WEB-Goal-16.png',
    alt: 'Peace, Justice, and Strong Institutions',
  },
  {
    id: 17,
    image: 'sgd/E-WEB-Goal-17.png',
    alt: 'Partnerships for the Goals',
  },
];

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
          <div className='sgd_content box-shadow'>
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
        <Section>
          <div className='sgd_content'>
            <div className='sgd_content--text--container'>
              <h3 className='sgd_heading'>
                Our commitment to the Sustainable Development Goals
              </h3>
              <p className='fs-4 fw-light'>
                We are committed to the 17 Sustainable Development Goals (SDGs)
                to end poverty, protect the planet, and ensure prosperity for
                all. We are dedicated to achieving these goals by 2030.
              </p>
            </div>
            <div className='marquee'>
              <Marquee speed={50}>
                {goals.map((goal, index) => (
                  <div key={index} className='marquee_item'>
                    <img
                      src={goal.image}
                      alt={goal.alt}
                      className='sgd_goal--images '
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </Section>
      </Container>
    </>
  );
}

export default SGDPage;
