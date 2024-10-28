import { useState, useEffect } from 'react';
import './splash.css';

function Splash() {
  const messages = [
    'Shaping futures, one click at a time...',
    'Loading your gateway to academic excellence...',
    'Empowering minds, please wait...',
    'Bridging islands of knowledge, just a moment...',
    'Marinduque State University: Your journey begins here...',
    'Preparing a world-class education experience...',
    'Connecting you to a community of learners...',
    'Discovering opportunities, loading...',
    'Unlocking your potential, please hold on...',
    'Advancing education, one byte at a time...',
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className='splash-container splash-fade-in'>
      <div>
        <img className='splash_img ' src='logo.png' alt='MarSU Logo' />
      </div>
      <div className='loading-screen'>
        <div className='spinner'></div>
        <div className='loading-message'>{messages[messageIndex]}</div>
      </div>
    </div>
  );
}

export default Splash;
