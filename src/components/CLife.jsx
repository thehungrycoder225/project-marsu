import './clife.css';

const clifeImages = [
  {
    id: 1,
    url: '../images/Arts 1.png',
    title: 'Campus Life 1',
  },
  {
    id: 2,
    url: '../images/Arts 2.png',
    title: 'Campus Life 2',
  },
  {
    id: 3,
    url: '../images/CWTS 1.png',
    title: 'Campus Life 3',
  },
  {
    id: 4,
    url: '../images/CWTS 2.png',
    title: 'Campus Life 4',
  },
  {
    id: 5,
    url: '../images/Instruments 1.png',
    title: 'Campus Life 5',
  },
  {
    id: 6,
    url: '../images/Instruments 2.png',
    title: 'Campus Life 6',
  },
  {
    id: 7,
    url: '../images/ROTC 1.png',
    title: 'Campus Life 7',
  },
  {
    id: 8,
    url: '../images/ROTC 2.png',
    title: 'Campus Life 8',
  },
];

function CampusLife() {
  return (
    <div className='clife-section'>
      <h3 className='clife-title'>Campus Life</h3>
      <p className='clife-subtitle'>
        Experience vibrant CampusLife where education meets{' '}
        <span>community</span>, <span>creativity</span>, and <span>growth</span>
      </p>
      <div className='clife-gallery'>
        {clifeImages.map((image) => (
          <div key={image.id} className='clife-image'>
            <img src={image.url} alt={image.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CampusLife;
