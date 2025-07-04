import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import SDGHeroCarousel from './components/SDGHeroCarousel';
import Footer from '../../components/Footer';
import Section from '../../components/Section';
import projects from './components/projects';
import goals from './components/goals';
import SDGNavSwiper from './components/SDGNavSwiper';
import './sgd.css';

const SGDPage = () => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  // const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleGoalClick = (goal) => {
    const newSelectedGoals = selectedGoals.includes(goal)
      ? selectedGoals.filter((g) => g !== goal)
      : [...selectedGoals, goal];

    setSelectedGoals(newSelectedGoals);

    // if (newSelectedGoals.length === 0) {
    //   setFilteredProjects(projects);
    // } else {
    //   const newFilteredProjects = projects.filter((project) =>
    //     newSelectedGoals.every((goal) =>
    //       project.tags.some((tag) => tag.name === goal)
    //     )
    //   );
    //   setFilteredProjects(newFilteredProjects);
    // }
  };
  return (
    <>
      <SDGHeroCarousel />
      <Container>
        <Section id='sdgForeword'>
          <div className='sgd_content bg-off-white box-shadow'>
            <img
              src='avatar-pres.png'
              alt='President Avatar'
              className='sgd_content--image'
            />
            <div className='sgd_content--text--container  '>
              <h2 className='sgd_heading'>A Commitment from the HEART</h2>
              <p className=' fs-4 fw-light sgd_description text-justify'>
                Guided by our commitment to the United Nations&apos; 2030
                Sustainable Development Goals, Marinduque State University
                envisions a future where education, innovation and collaboration
                converge to create a meaningful, lasting impact. At the core of
                our mission lies a collective dedication to advancing
                sustainable solutions, pioneering technologies, and cultivating
                a culture of inclusivity and resilience.
              </p>
              <p className=' fs-4 fw-light sgd_description text-justify'>
                The journey toward these global goals demands an unwavering
                collaboration across our entire academic community. Faculty
                members, students, researchers, and administrative staff all
                play vital roles in addressing the world&apos;s most pressing
                challenges. Together, we are building interdisciplinary pathways
                that lead to sustainable practices, community-centered
                solutions, and transformative research, empowering our
                institution to be a pillar of sustainable development in the
                region.
              </p>
              <p className=' fs-4 fw-light sgd_description text-justify'>
                As we embark on this vital journey, we reaffirm our commitment
                to fostering partnerships and encouraging knowledge sharing that
                will strengthen our initiatives. Through education, research,
                and community engagement, Marinduque State University pledges to
                be at the forefront of sustainable action, fully dedicated to
                shaping a more inclusive, resilient, and sustainable future for
                all.
              </p>
              <p className='fs-4 fw-light'>
                {'- Prof. Diosdado P. Zulueta, DPA'}
                <span className='d-block fs-5 fw-light px-3'>
                  University President
                </span>
              </p>
            </div>
          </div>
        </Section>
        <Section id='sdgMission'>
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
        <Section id='sdgGoals'>
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
            <SDGNavSwiper goals={goals} />
          </div>
        </Section>
        <Section>
          <div className='sgd_content  box-shadow'>
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
            <Section>
              <div className='sgd__gallery'>
                {projects.slice(0, 8).map((project) => (
                  <img
                    key={project.id}
                    src={`${project.image}`}
                    alt={project.title}
                    className='sgd_gallery--image'
                  />
                ))}
              </div>
            </Section>
          </div>
        </Section>
        <Section id='sdgProjects'>
          <div className='sgd_content'>
            <div className='sgd_content--text--container'>
              <h3 className='sgd_heading'>MarSU Innovative Projects</h3>
              <div className='sgd__project--container'>
                {projects.map((project) => (
                  <div key={project.id} className='sgd_card'>
                    <Link to={project.link}>
                      <img
                        src={`${project.image}`}
                        alt={project.title}
                        className='sgd_card--image'
                      />

                      <h4 className='sgd_card--title'>{project.title}</h4>

                      <p className='sgd_card--description'>{project.desc}</p>
                      <div className='sgd_card--tags'>
                        {project.tags.map((tag) =>
                          tag.icons.map((icons, index) => (
                            <img
                              key={`${tag.id}-${index}`}
                              src={`sdg/${icons}`}
                              alt={tag.name}
                              className='sgd_card--tag'
                            />
                          ))
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
        <Section id='sdgPartnership'>
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
              <Link to='mailto:president@marsu.edu.ph' className='btn_sgd'>
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
