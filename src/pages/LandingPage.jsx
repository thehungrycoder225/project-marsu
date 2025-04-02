import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

import NavigationExample from '../components/Navigation';
import HeroComponent from '../components/Hero';
import NewsComponent from '../components/News';
import SectionComponent from '../components/Section';
import Events from '../components/Events';
import './landing.css';
import { Container } from 'react-bootstrap';
import CampusLife from '../components/CLife';
import Footer from '../components/Footer';
import Splash from '../components/Splash';
import Linkages from '../components/Linkages';

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
      <NavigationExample />
      <HeroComponent
        title='Marinduque State University'
        brand={logo}
        heroPadding={'hero--padding '}
        heroImage='hero-image'
        description='Your Gateway to Excellence'
      />

      <NewsComponent />
      <Container>
        <SectionComponent>
          <>
            <div className='content landing-video-section'>
              <div className='p-5 w-100'>
                <h3 className=''>Hello Mr. President</h3>
                <p className='mb-5 fs-5'>
                  In a significant move to further the growth and development of
                  Marinduque State University, the University President has
                  taken a hands-on approach by creating a video message that
                  emphasizes the institution future goals and strategic vision.
                </p>
                <a
                  href='https://www.youtube.com/watch?v=9nl3yYgp-9I'
                  className=''
                >
                  Watch Series
                </a>
              </div>
              <div className='video-container'>
                <iframe
                  width='560'
                  height='314'
                  src='https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmarinduquestatecollege%2Fvideos%2F1411789209494537%2F&show_text=false&width=560&t=0'
                  allowfullscreen='true'
                  allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
                ></iframe>
              </div>
            </div>
          </>
        </SectionComponent>
        <Events />
        <CampusLife />
        <SectionComponent>
          <>
            <div className='sgd_landing sgd_landing_card'>
              <div className='row align-items-center'>
                <div className='col-md-3'>
                  <img src='sdg-logo.png' className='sgd_landing_img' alt='' />
                </div>
                <div className='col-md-6'>
                  <h3 className='linkages_title text-start fs-2'>
                    Marinduque State University Sustainable Development Goals
                    Center!
                  </h3>
                  <p>
                    Explore our innovative programs and projects to generate
                    long-term change, develop community involvement, and raise
                    awareness of the Sustainable Development Goals.
                  </p>
                </div>
                <div className='col-md-3'>
                  <Link className='btn_sgd' to='/sdg'>
                    {'Explore->'}
                  </Link>
                </div>
              </div>
            </div>
          </>
        </SectionComponent>
        <Linkages />
      </Container>
      <Footer />
    </div>
  );
}

export default LandingPage;
