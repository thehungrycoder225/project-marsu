import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Marquee from 'react-fast-marquee';
import HeroComponent from '../components/Hero';
import Footer from '../components/Footer';
import Section from '../components/Section';
import logo from '../assets/sgd-logo.png';
import './sgd.css';

const goals = [
  {
    id: 1,
    image: 'sgd/E-WEB-Goal-01.png',
    alt: 'No Poverty',
    link: '/sgd/no-poverty',
  },
  {
    id: 2,
    image: 'sgd/E-WEB-Goal-02.png',
    alt: 'Zero Hunger',
    link: '/sgd/zero-hunger',
  },
  {
    id: 3,
    image: 'sgd/E-WEB-Goal-03.png',
    alt: 'Good Health and Well-being',
    link: '/sgd/good-health',
  },
  {
    id: 4,
    image: 'sgd/E-WEB-Goal-04.png',
    alt: 'Quality Education',
    link: 'sgd/quality-education',
  },
  {
    id: 5,
    image: 'sgd/E-WEB-Goal-05.png',
    alt: 'Gender Equality',
    link: '/sgd/gender-equality',
  },
  {
    id: 6,
    image: 'sgd/E-WEB-Goal-06.png',
    alt: 'Clean Water and Sanitation',
    link: '/sgd/clean-water',
  },
  {
    id: 7,
    image: 'sgd/E-WEB-Goal-07.png',
    alt: 'Affordable and Clean Energy',
    link: '/sgd/affordable-energy',
  },
  {
    id: 8,
    image: 'sgd/E-WEB-Goal-08.png',
    alt: 'Decent Work and Economic Growth',
    link: '/sgd/decent-work',
  },
  {
    id: 9,
    image: 'sgd/E-WEB-Goal-09.png',
    alt: 'Industry, Innovation, and Infrastructure',
    link: '/sgd/industry-innovation',
  },
  {
    id: 10,
    image: 'sgd/E-WEB-Goal-10.png',
    alt: 'Reduced Inequality',
    link: '/sgd/reduced-inequality',
  },
  {
    id: 11,
    image: 'sgd/E-WEB-Goal-11.png',
    alt: 'Sustainable Cities and Communities',
    link: '/sgd/sustainable-cities',
  },
  {
    id: 12,
    image: 'sgd/E-WEB-Goal-12.png',
    alt: 'Responsible Consumption and Production',
    link: '/sgd/responsible-consumption',
  },
  {
    id: 13,
    image: 'sgd/E-WEB-Goal-13.png',
    alt: 'Climate Action',
    link: '/sgd/climate-action',
  },
  {
    id: 14,
    image: 'sgd/E-WEB-Goal-14.png',
    alt: 'Life Below Water',
    link: '/sgd/life-below-water',
  },
  {
    id: 15,
    image: 'sgd/E-WEB-Goal-15.png',
    alt: 'Life on Land',
    link: '/sgd/life-on-land',
  },
  {
    id: 16,
    image: 'sgd/E-WEB-Goal-16.png',
    alt: 'Peace, Justice, and Strong Institutions',
    link: '/sgd/peace-justice',
  },
  {
    id: 17,
    image: 'sgd/E-WEB-Goal-17.png',
    alt: 'Partnerships for the Goals',
    link: '/sgd/partnerships-goals',
  },
];

const projects = [
  {
    id: 1,
    title: 'Project 1',
    image: 'images/sgd_projects/chicken.jpg',
    link: '/projects/project1',
  },
  {
    id: 2,
    title: 'Project 2',
    image: 'images/sgd_projects/governance.jpg',
    link: '/projects/project2',
  },
  {
    id: 3,
    title: 'Project 3',
    image: 'images/sgd_projects/island.jpg',
    link: '/projects/project3',
  },
  {
    id: 4,
    title: 'Project 4',
    image: 'images/sgd_projects/iugnay.jpg',
    link: '/projects/project4',
  },
  {
    id: 5,
    title: 'Project 5',
    image: 'images/sgd_projects/education.jpg',
    link: '/projects/project5',
  },
];

const GoalMarquee = ({ goals }) => (
  <Marquee speed={50} pauseOnHover={1}>
    {goals.map((goal) => (
      <div key={goal.id} className='marquee_item'>
        <Link to={goal.link}>
          <img src={goal.image} alt={goal.alt} className='sgd_goal--images' />
        </Link>
      </div>
    ))}
  </Marquee>
);

const SGDPage = () => (
  <>
    <HeroComponent
      brand={logo}
      titleText='sgd_title'
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
              Join us in our commitment to drive meaningful change, inspire
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
              We are committed to the 17 Sustainable Development Goals (SDGs) to
              end poverty, protect the planet, and ensure prosperity for all. We
              are dedicated to achieving these goals by 2030.
            </p>
          </div>
        </div>
        <div className='sgd_content'>
          <div className='marquee'>
            <GoalMarquee goals={goals} />
          </div>
        </div>
      </Section>
      <Section>
        <div className='sgd_content'>
          <div className='sgd_content--text--container'>
            <h3 className='sgd_heading'>
              Our programs for sustainable development
            </h3>
            <p className='fs-4 fw-light'>
              We offer programs that promote sustainable development and
              contribute to the achievement of the SDGs. Our programs focus on
              education, research, and extension services.
            </p>
          </div>
          <div className='sgd__gallery'>
            {projects.map((project) => (
              <>
                <img
                  src={project.image}
                  alt={project.title}
                  className='sgd_gallery--image'
                />
              </>
            ))}
          </div>
        </div>
      </Section>
    </Container>
    <Footer />
  </>
);

export default SGDPage;
