import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TableOfContents = ({ sections = [] }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -35% 0px',
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (sections.length === 0) return null;

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className='lg:hidden fixed top-1/2 right-4 z-40 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors'
        aria-label='Toggle table of contents'
      >
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>

      {/* Table of Contents */}
      <div
        className={`fixed top-1/2 right-6 transform -translate-y-1/2 z-30 transition-all duration-300 ${
          isVisible
            ? 'translate-x-0 opacity-100'
            : 'lg:translate-x-0 lg:opacity-100 translate-x-full opacity-0'
        }`}
      >
        <div className='bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs'>
          <h3 className='text-sm font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2'>
            Page Contents
          </h3>
          <nav className='space-y-2'>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollToSection(section.id);
                  setIsVisible(false);
                }}
                className={`block w-full text-left text-sm py-2 px-3 rounded transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-primary-100 text-primary-700 font-medium border-l-3 border-primary-500'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isVisible && (
        <div
          className='lg:hidden fixed inset-0 bg-black/20 z-20'
          onClick={() => setIsVisible(false)}
        />
      )}
    </>
  );
};

TableOfContents.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default TableOfContents;
