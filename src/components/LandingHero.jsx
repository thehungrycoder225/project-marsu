import PropTypes from 'prop-types';

/**
 * LandingHero - Dedicated hero section for the landing page.
 * Modern, mobile-first, accessible, and fully styled with Tailwind CSS.
 */
function LandingHero({
  title = 'Marinduque State University',
  subtitle = 'Your Gateway to Excellence',
  description = 'Empowering Minds. Shaping the Future.',
  image = '/logo.png', // Use public root logo
}) {
  return (
    <section className='w-full bg-gradient-to-br from-rose-50 to-blue-50 py-12 md:py-20 flex flex-col items-center justify-center'>
      <div className='flex flex-col md:flex-row items-center justify-between max-w-7xl w-full px-4 gap-8'>
        <div className='flex-1 flex flex-col items-center md:items-start text-center md:text-left'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-rose-900 mb-4 drop-shadow-sm'>
            {title}
          </h1>
          <h2 className='text-xl md:text-2xl font-semibold text-blue-900 mb-2'>
            {subtitle}
          </h2>
          <p className='text-base md:text-lg text-gray-700 mb-6 max-w-xl'>
            {description}
          </p>
          <a
            href='#main-content'
            className='inline-block bg-rose-700 hover:bg-rose-900 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400'
          >
            Explore MARSU
          </a>
        </div>
        <div className='flex-1 flex items-center justify-center'>
          <img
            src={image}
            alt='Marinduque State University Logo'
            className='w-48 md:w-64 h-auto object-contain drop-shadow-lg animate-fade-in'
            loading='eager'
          />
        </div>
      </div>
    </section>
  );
}

LandingHero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default LandingHero;
