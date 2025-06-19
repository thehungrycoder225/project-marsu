import { useState, useEffect } from 'react';
import './splash.css';

const mascots = ['logo.png'];

function Splash({ onReady = false }) {
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
  const [progress, setProgress] = useState(0);
  const [mascot, setMascot] = useState(mascots[0]);

  // Only show splash if not seen in last 24h
  useEffect(() => {
    setMascot(mascots[Math.floor(Math.random() * mascots.length)]);
    const lastSplash = localStorage.getItem('marsu_splash_last');
    if (
      lastSplash &&
      Date.now() - parseInt(lastSplash, 10) < 24 * 60 * 60 * 1000
    ) {
      if (typeof onReady === 'function') onReady();
      return;
    }
    // Animate progress bar
    let prog = 0;
    const progInterval = setInterval(() => {
      prog += Math.random() * 15 + 5;
      setProgress((p) => Math.min(100, Math.max(p, prog)));
      if (prog >= 100) clearInterval(progInterval);
    }, 300);
    // Cycle messages
    const msgInterval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 1000);
    // Hide splash when ready
    if (onReady) {
      setProgress(100);
      clearInterval(progInterval);
    }
    return () => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
    };
  }, [onReady]);

  useEffect(() => {
    if (progress >= 100) {
      localStorage.setItem('marsu_splash_last', Date.now().toString());
    }
  }, [progress]);

  return (
    <div className='splash-container splash-fade-in' aria-live='polite'>
      <div>
        <img className='splash_img' src={mascot} alt='MarSU Logo or Mascot' />
      </div>
      <div className='loading-screen'>
        <div className='spinner'></div>
        <div className='loading-message'>{messages[messageIndex]}</div>
        <div className='progress-bar-bg' aria-label='Loading progress'>
          <div
            className='progress-bar-fill'
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            role='progressbar'
          />
        </div>
      </div>
      <div className='splash-animated-bg'></div>
    </div>
  );
}

export default Splash;
