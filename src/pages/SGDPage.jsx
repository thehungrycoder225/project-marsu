import { useState } from 'react';
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
    title: 'iUgnay Project',
    description:
      'iUgnay Project, is a project that aims to provide internet access to underprivileged villages in Marinduque. ',
    image: 'sgd/project/iugnay.jpg',
    link: '/sgd/project/1',
    tags: [
      {
        name: 'Industry, Innovation, and Infrastructure',
        image: 'sgd/E-WEB-Goal-09.png',
      },
    ],
  },
  {
    id: 2,
    title: 'Project 2',
    image: 'sgd/project/governance.jpg',
    description:
      'Project 2 is a project that aims to promote good governance and transparency in local government units.',
    link: '/sgd/project/2',
    tags: [
      {
        name: 'Peace, Justice, and Strong Institutions',
        image: 'sgd/E-WEB-Goal-16.png',
      },
    ],
  },
  {
    id: 3,
    title: 'Project 3',
    description:
      'Project 3 is a project that aims to promote sustainable tourism and protect the environment.',
    image: 'sgd/project/island.jpg',
    link: '/sgd/project/3',
    tags: [
      { name: 'Life Below Water', image: 'sgd/E-WEB-Goal-14.png' },
      { name: 'Life on Land', image: 'sgd/E-WEB-Goal-15.png' },
    ],
  },
  {
    id: 4,
    title: 'Project 4',
    description:
      'Project 4 is a project that aims to promote sustainable agriculture and provide livelihood opportunities to farmers.',
    image: 'sgd/project/eme.jpg',
    link: '/sgd/project/4',
    tags: [
      {
        name: 'Industry, Innovation, and Infrastructure',
        image: 'sgd/E-WEB-Goal-09.png',
      },
    ],
  },
  {
    id: 5,
    title: 'Project 5',
    description:
      'Project 5 is a project that aims to provide quality education to underprivileged children in Marinduque.',
    image: 'sgd/project/education.jpg',
    link: '/sgd/project/5',
    tags: [{ name: 'Quality Education', image: 'sgd/E-WEB-Goal-04.png' }],
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

const SGDPage = () => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleGoalClick = (goal) => {
    const newSelectedGoals = selectedGoals.includes(goal)
      ? selectedGoals.filter((g) => g !== goal)
      : [...selectedGoals, goal];

    setSelectedGoals(newSelectedGoals);

    const newFilteredProjects = projects.filter((project) =>
      newSelectedGoals.every((goal) =>
        project.tags.some((tag) => tag.name === goal)
      )
    );

    setFilteredProjects(newFilteredProjects);
  };
  return (
    <>
      <HeroComponent
        brand={logo}
        heroImage={'sgd_hero--brand'}
        titleText='sgd_title'
        heroPadding={'sgd_hero--padding'}
        title='Sustainable Goals Development Center'
        description='Marinduque State University stands as a beacon of hope and innovation, committed to advancing sustainable development goals in higher education.'
      />
      <Container>
        {/* <Section>
        <div className='sgd_content '>
          <div className='sgd_content--text--container'>
            <h3 className='sgd_heading'>
              Welcome to the Sustainable Goals Development Center
            </h3>
            <p className='fs-4 fw-light sgd_description'>
              We are dedicated to fostering a culture of sustainability,
              innovation, and social responsibility in our students, faculty,
              and staff. Through our programs, research initiatives, and
              community partnerships, we aim to create a sustainable future for
              all.
            </p>
          </div>
        </div>
      </Section> */}
        <Section>
          <div className='sgd_content bg-off-white box-shadow'>
            <img
              src='avatar-pres.png'
              alt='President Avatar'
              className='sgd_content--image'
            />
            <div className='sgd_content--text--container p-32 '>
              <h3 className='sgd_heading'>
                Empowering change for sustainable future
              </h3>
              <p className=' fs-4 fw-light sgd_description'>
                As we stand on the precipice of a new era, we must recognize the
                critical importance of sustainability in our efforts to provide
                exemplary higher education services. Our island province, with
                its unique environmental and cultural heritage, holds a distinct
                position in fostering an educational ecosystem that not only
                imparts knowledge but also cultivates a deep respect for our
                natural resources. By integrating sustainable practices into
                every facet of our curriculum and campus operations, we aim to
                empower our students to become stewards of the environment,
                champions of innovation, and leaders in their communities.
                Together, we can create a model of higher education that is both
                forward-thinking and firmly rooted in the principles of
                sustainability
              </p>
              <p className='fs-4 fw-light'>
                {'- Dr. Diosdado P. Zulueta, University President'}
              </p>
            </div>
          </div>
        </Section>
        <Section>
          <div className='sgd_content bg-muted'>
            <div className='sgd_content--text--container '>
              <h3 className='sgd_heading'>Our Mission</h3>
              <p className='fs-4 fw-light sgd_description'>
                Our mission is to integrate sustainability into every aspect of
                our academic and operational practices, ensuring that our
                students not only receive a world-class education but also
                become stewards of our natural resources. By fostering a culture
                of sustainability, we aim to equip our graduates with the
                knowledge and skills needed to drive positive change in their
                communities and beyond. Together, we can build a brighter, more
                sustainable future for Marinduque and the world.
              </p>
            </div>
          </div>
        </Section>
        <Section>
          <div className='sgd_content '>
            <div className='sgd_content--text--container'>
              <h3 className='sgd_heading'>
                Our commitment to the Sustainable Development Goals
              </h3>
              <p className='fs-4 fw-light sgd_description'>
                We are committed to the 17 Sustainable Development Goals (SDGs)
                to end poverty, protect the planet, and ensure prosperity for
                all. We are dedicated to achieving these goals by 2030.
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
          <div className='sgd_content p-32 box-shadow'>
            <div className='sgd_content--text--container'>
              <h3 className='sgd_heading'>
                Our programs for sustainable development
              </h3>
              <p className='fs-4 fw-light sgd_description'>
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
        <Section>
          <div className='sgd_content'>
            <div className='sgd_content--text--container'>
              <h3 className='sgd_heading'>MarSU Innovative Projects</h3>
              <div className='sgd__project--container'>
                {projects.map((project) => (
                  <>
                    <div key={project.id} className='sgd_card'>
                      <Link to={project.link}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className='sgd_card--image'
                        />

                        <h4 className='sgd_card--title'>{project.title}</h4>

                        <p className='sgd_card--description'>
                          {project.description}
                        </p>
                        <div className='sgd_card--tags'>
                          {project.tags.map((tag) => (
                            <img
                              key={tag.name}
                              src={tag.image}
                              alt={tag.name}
                              className='sgd_card--tag'
                            />
                          ))}
                        </div>
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </Section>
        <Section>
          <div className='sgd_content bg-muted '>
            <div className='sgd_content--text--container'>
              <h3 className='sgd_heading'>
                Get involved in our Sustainable Development Goals initiatives
              </h3>

              <p className='fs-4 fw-light sgd_description'>
                Join us in our commitment to the Sustainable Development Goals.
                Together, we can make a difference and build a sustainable
                future for all.
              </p>
              <Link to='/get-involved' className='btn btn-danger'>
                Join us now
              </Link>
            </div>
          </div>
        </Section>
      </Container>
      <Footer />
    </>
  );
};

export default SGDPage;
