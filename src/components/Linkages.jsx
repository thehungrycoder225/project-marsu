import { useEffect, useState } from 'react';
import './linkages.css';
import Marquee from 'react-fast-marquee';

function Linkages() {
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/marsu-resources/Resources.json')
      .then((res) => res.json())
      .then((data) => {
        setPartners(data.linkages || []);
      })
      .catch(() => setError('Failed to load partners.'));
  }, []);

  if (error) {
    return <div className='text-red-600 text-center py-4'>{error}</div>;
  }

  if (!partners.length) {
    return <div className='text-center py-4'>No partners available.</div>;
  }

  return (
    <div className='py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto'>
      <div className=''>
        <h3 className='text-2xl text-center mb-2 font-bold text-[var(--primary-700)]'>
          Our Partners
        </h3>
        <p className='text-md text-justify text-gray-700 mb-4'>
          At Marinduque State University, our robust industry partnerships
          facilitate the development of industry-aligned curricula, while our
          institutional affiliations foster vital networks that enhance the
          quality of education we provide. Through strategic collaborations with
          both private and government sectors, we are committed to delivering
          exceptional educational experiences to our students.
        </p>
      </div>
      <div className='marquee'>
        <Marquee speed={50}>
          {partners.map((partner, index) => (
            <div key={index} className='marquee_item'>
              <img
                src={partner.img}
                alt={partner.alt || 'Partner logo'}
                className='linkages_image'
              />
            </div>
          ))}
        </Marquee>
      </div>
      <div className='marquee'>
        <Marquee speed={50} direction='right'>
          {partners.map((partner, index) => (
            <div key={index} className='marquee_item'>
              <img
                src={partner.img}
                alt={partner.alt || 'Partner logo'}
                className='linkages_image'
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Linkages;
