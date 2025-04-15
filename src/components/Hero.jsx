import './Hero/hero.css';

import PropTypes from 'prop-types';

function HeroComponent({
  title,
  subtitle,
  description,
  brand,
  titleText,
  subText,
  desText,
  heroImage,
  heroPadding,
}) {
  return (
    <div className={`hero ${heroPadding}`}>
      <div className={heroImage}>
        <img src={brand} alt='logo' />
      </div>
      <div className='hero-text'>
        <h1 className={titleText}>{title}</h1>
        <p className={subText}>{subtitle}</p>
        <p className={desText}>{description}</p>
      </div>
    </div>
  );
}

HeroComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HeroComponent;
