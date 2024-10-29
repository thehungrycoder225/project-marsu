import './hero.css';

import PropTypes from 'prop-types';

function HeroComponent({ title, description, brand, titleText, heroImage }) {
  return (
    <div className='hero'>
      <div className={heroImage}>
        <img src={brand} alt='logo' />
      </div>
      <div className='hero-text'>
        <h1 className={titleText}>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

HeroComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HeroComponent;
