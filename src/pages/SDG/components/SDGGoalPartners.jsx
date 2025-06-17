import React from 'react';
import PropTypes from 'prop-types';

const SDGGoalPartners = ({ partners }) => {
  if (!partners || partners.length === 0) return null;
  return (
    <div className='sdg-partners flex flex-wrap gap-4 my-6'>
      {partners.map((partner, idx) => (
        <a
          key={idx}
          href={partner.link}
          target='_blank'
          rel='noopener noreferrer'
          className='sdg-partner-card bg-white/40 backdrop-blur rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition'
        >
          <img
            src={partner.logo}
            alt={partner.name}
            className='w-20 h-20 object-contain mb-2'
          />
          <span className='font-medium text-center text-gray-700'>
            {partner.name}
          </span>
        </a>
      ))}
    </div>
  );
};

SDGGoalPartners.propTypes = {
  partners: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      link: PropTypes.string,
    })
  ),
};

export default SDGGoalPartners;
