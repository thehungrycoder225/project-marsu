import './AppLoader.css';
const mascot = '/logo.png';
const QUOTES = [
  'Empowering Minds, Shaping the Future at Marinduque State University',
  'Excellence. Innovation. Service.',
  'Your Gateway to Success!',
  'Proudly Marinduqueño, Proudly MARSU!',
  'Loading your academic journey...',
];

function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

export default function AppLoader({ onCancel }) {
  const quote = getRandomQuote();
  return (
    <div
      className='app-loader-glass'
      role='status'
      aria-live='polite'
      tabIndex={0}
    >
      <div className='app-loader-content'>
        {/* Mascot or spinner */}
        <div className='app-loader-spinner'>
          <img
            src={mascot}
            alt='Mascot'
            className='app-loader-mascot'
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className='app-loader-spinner-fallback' />
        </div>
        <div className='app-loader-quote'>{quote}</div>
        <button className='app-loader-cancel' onClick={onCancel} tabIndex={0}>
          Skip Loading
        </button>
      </div>
    </div>
  );
}
