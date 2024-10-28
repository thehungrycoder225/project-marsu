import './linkages.css';
import Marquee from 'react-fast-marquee';

const partners = [
  { img: 'partners/partner (1).jpg', alt: 'aaacu' },
  { img: 'partners/partner (2).jpg', alt: 'ched' },
  { img: 'partners/partner (3).jpg', alt: 'dost' },
  { img: 'partners/partner (4).jpg', alt: 'dswd' },
  { img: 'partners/partner (5).jpg', alt: 'dswd' },
  { img: 'partners/partner (6).jpg', alt: 'dswd' },
  { img: 'partners/partner (7).jpg', alt: 'dswd' },
  { img: 'partners/partner (8).jpg', alt: 'dswd' },
  { img: 'partners/partner (9).jpg', alt: 'dswd' },
  { img: 'partners/partner (10).jpg', alt: 'dswd' },
  { img: 'partners/partner (11).jpg', alt: 'dswd' },
  { img: 'partners/partner (12).jpg', alt: 'dswd' },
  { img: 'partners/partner (13).jpg', alt: 'dswd' },
  { img: 'partners/partner (14).jpg', alt: 'dswd' },
  { img: 'partners/partner (15).jpg', alt: 'dswd' },
  { img: 'partners/partner (16).jpg', alt: 'dswd' },
  { img: 'partners/partner (17).jpg', alt: 'dswd' },
  { img: 'partners/partner (18).jpg', alt: 'dswd' },
  { img: 'partners/partner (19).jpg', alt: 'dswd' },
  { img: 'partners/partner (20).jpg', alt: 'dswd' },
  { img: 'partners/partner (21).jpg', alt: 'dswd' },
  { img: 'partners/partner (1).png', alt: 'dswd' },
  { img: 'partners/partner (2).png', alt: 'dswd' },
  { img: 'partners/partner (3).png', alt: 'dswd' },
  { img: 'partners/partner (4).png', alt: 'dswd' },
  { img: 'partners/partner (5).png', alt: 'dswd' },
  { img: 'partners/partner (6).png', alt: 'dswd' },
  { img: 'partners/partner (7).png', alt: 'dswd' },
  { img: 'partners/partner (8).png', alt: 'dswd' },
  { img: 'partners/partner (9).png', alt: 'dswd' },
  { img: 'partners/partner (10).png', alt: 'dswd' },
  { img: 'partners/partner (11).png', alt: 'dswd' },
  { img: 'partners/partner (12).png', alt: 'dswd' },
  { img: 'partners/partner (13).png', alt: 'dswd' },
  { img: 'partners/partner (14).png', alt: 'dswd' },
];

// function Marquee({ partners, reverse }) {
//   return (
//     <section
//       className={reverse ? 'enable-animation-reverse' : 'enable-animation'}
//     >
//       <div className='marquee'>
//         <div className='marquee_content'>
//           {partners.map((partner, index) => (
//             <div key={index} className='marquee_item'>
//               <img src={partner.img} alt={partner.alt} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

function PartnersComponent() {
  return (
    <div className='linkages'>
      <div className='linkages_content'>
        <h3 className='linkages_title'>Our Partners</h3>
        <p className='linkages_description'>
          At Marinduque State University, our robust industry partnerships
          facilitate the development of industry-aligned curricula, while our
          institutional affiliations foster vital networks that enhance the
          quality of education we provide. Through strategic collaborations with
          both private and government sectors, we are committed to delivering
          exceptional educational experiences to our students.
        </p>
      </div>
      {/* <Marquee partners={partners.slice(0, 21)} />
      <Marquee partners={partners.slice(21)} reverse /> */}
      <div className='marquee'>
        <Marquee speed={50}>
          {partners.map((partner, index) => (
            <div key={index} className='marquee_item'>
              <img
                src={partner.img}
                alt={partner.alt}
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
                alt={partner.alt}
                className='linkages_image'
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default PartnersComponent;
