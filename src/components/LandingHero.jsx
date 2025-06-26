import PropTypes from 'prop-types';

/**
 * LandingHero - Dedicated hero section for the landing page.
 * Modern, mobile-first, accessible, and fully styled with Tailwind CSS.
 * Navigation is handled at the app level to allow for overlay behavior.
 */
function LandingHero({
  title = 'Marinduque State University',
  subtitle = 'Your Gateway to Excellence',
  description = 'Empowering Minds. Shaping the Future.',
  image = '/logo.png', // Use public root logo
}) {
  return (
    <section className='relative w-full min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 flex flex-col items-center justify-center'>
      {/* Hero Content */}
      <div className='flex flex-col md:flex-row items-center justify-between max-w-7xl w-full px-6 lg:px-8 gap-12 pt-20 md:pt-24'>
        <div className='flex-1 flex flex-col items-center md:items-start text-center md:text-left'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-rose-900 mb-6 drop-shadow-sm leading-tight'>
            {title}
          </h1>
          <h2 className='text-2xl md:text-3xl font-semibold text-blue-900 mb-4'>
            {subtitle}
          </h2>
          <p className='text-lg md:text-xl text-gray-700 mb-8 max-w-2xl leading-relaxed'>
            {description}
          </p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <a
              href='#main-content'
              className='inline-block bg-rose-700 hover:bg-rose-900 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400 transform hover:scale-105'
            >
              Explore MARSU
            </a>
            <a
              href='/about'
              className='inline-block bg-white hover:bg-gray-50 text-rose-700 font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400 border border-rose-200 transform hover:scale-105'
            >
              Learn More
            </a>
          </div>
        </div>
        <div className='flex-1 flex items-center justify-center'>
          <div className='relative'>
            <img
              src={image}
              alt='Marinduque State University Logo'
              className='w-64 md:w-80 lg:w-96 h-auto object-contain drop-shadow-2xl animate-fade-in'
              loading='eager'
            />
            {/* Decorative elements */}
            <div className='absolute -top-4 -right-4 w-16 h-16 bg-rose-200 rounded-full opacity-50 animate-pulse' />
            <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-pulse delay-75' />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
        <div className='w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-gray-400 rounded-full animate-pulse mt-2' />
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
