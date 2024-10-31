import goals from './goals';
import projects from './projects';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './sdgnav.css';
const SDGNav = () => {
  const GoalMarquee = ({ goals }) => (
    // <Marquee speed={50} pauseOnHover={1}>
    //   {goals.map((goal) => (
    //     <div key={goal.id} className='marquee_item'>
    //       <Link to={goal.link}>
    //         <img src={goal.image} alt={goal.alt} className='sgd_goal--images' />
    //       </Link>
    //     </div>
    //   ))}
    // </Marquee>
    <div className='scrollable-nav-container'>
      {goals.map((goal) => (
        <div key={goal.id} className='nav-marquee_item'>
          <Link to={goal.link}>
            <img
              src={goal.image}
              alt={goal.alt}
              className='nav-sgd_goal--images'
            />
          </Link>
        </div>
      ))}
    </div>
  );

  const [selectedGoals, setSelectedGoals] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleGoalClick = (goal) => {
    const newSelectedGoals = selectedGoals.includes(goal)
      ? selectedGoals.filter((g) => g !== goal)
      : [...selectedGoals, goal];

    setSelectedGoals(newSelectedGoals);

    if (newSelectedGoals.length === 0) {
      setFilteredProjects(projects);
    } else {
      const newFilteredProjects = projects.filter((project) =>
        newSelectedGoals.every((goal) =>
          project.tags.some((tag) => tag.name === goal)
        )
      );
      setFilteredProjects(newFilteredProjects);
    }
  };

  return (
    <>
      <div className='sgd_content'>
        <div className='marquee'>
          <GoalMarquee
            goals={goals}
            handleGoalClick={handleGoalClick}
            selectedGoals={selectedGoals}
          />
        </div>
      </div>
    </>
  );
};

export default SDGNav;
