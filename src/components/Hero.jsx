import './hero.css';
import logo from '../assets/logo.png';
import PropTypes from 'prop-types';

function HeroComponent({ title, description }) {
  return (
    <div className='hero'>
      <div className='hero-image'>
        <img src={logo} alt='logo' />
      </div>
      <div className='hero-text'>
        <h1>{title}</h1>
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
