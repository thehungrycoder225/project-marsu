import React, { useState, useEffect } from 'react';
import HeroComponent from '../components/Hero';
import NewsComponent from '../components/News';
import SectionComponent from '../components/Section';
import Events from '../components/Events';
import './landing.css';
import { Container } from 'react-bootstrap';
import CampusLife from '../components/CLife';
import Footer from '../components/Footer';
import Splash from '../components/Splash';

function LandingPage() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <div>
      <HeroComponent
        title='Marinduque State University'
        description='Your Gateway to Excellence'
      />

      <NewsComponent />
      <Container>
        <SectionComponent>
          <>
            <div className='content landing-video-section'>
              <div className='p-5 w-100'>
                <h3 className='mb-3'>Hello Mr. President</h3>
                <p className='mb-5'>
                  In a significant move to further the growth and development of
                  Marinduque State University, the University President has
                  taken a hands-on approach by creating a video message that
                  emphasizes the institution future goals and strategic vision.
                </p>
                <a
                  href='https://www.youtube.com/watch?v=9nl3yYgp-9I'
                  className='btn btn-warning btn-lg p-3 mt-5'
                >
                  Watch Series
                </a>
              </div>
              <div className='video-container'>
                <iframe
                  width='560'
                  height='314'
                  src='https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmarinduquestatecollege%2Fvideos%2F1411789209494537%2F&show_text=false&width=560&t=0'
                  scrolling='no'
                  frameBorder={0}
                  allowfullscreen='true'
                  allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
                ></iframe>
              </div>
            </div>
          </>
        </SectionComponent>
        <Events />
        <CampusLife />
      </Container>
      <Footer />
    </div>
  );
}

export default LandingPage;
