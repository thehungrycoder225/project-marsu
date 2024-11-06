import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { Link } from 'react-router-dom';
import './FloatingButton.css';

const FloatingButton = ({ goals }) => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(({ offset: [x, y] }) => {
    api.start({ x, y });
  });

  return (
    <animated.div {...bind()} style={{ x, y }} className='floating-button'>
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
    </animated.div>
  );
};

export default FloatingButton;
