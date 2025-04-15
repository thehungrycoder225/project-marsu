import goals from './goals';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './sdgnav.css';

const GoalMarquee = ({ goals }) => (
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

GoalMarquee.propTypes = {
  goals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const SDGNav = () => {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleGoalClick = (goal) => {
    setSelectedGoals((prevSelectedGoals) =>
      prevSelectedGoals.includes(goal)
        ? prevSelectedGoals.filter((g) => g !== goal)
        : [...prevSelectedGoals, goal]
    );
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
