import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SDGGoalTabs = ({ tabs }) => {
  const [active, setActive] = useState(0);
  return (
    <div className='sdg-tabs my-6'>
      <div className='flex gap-2 border-b mb-4'>
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-4 py-2 font-medium rounded-t transition border-b-2 ${active === idx ? 'border-blue-600 bg-white/70' : 'border-transparent bg-gray-100/60 hover:bg-white/80'}`}
            onClick={() => setActive(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className='sdg-tab-content'>{tabs[active].content}</div>
    </div>
  );
};

SDGGoalTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default SDGGoalTabs;
