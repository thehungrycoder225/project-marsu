import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './landing.css';

import NavigationExample from '../../components/Navigation';
import HeroComponent from '../../components/Hero';
import NewsComponent from '../../components/News';
import SectionComponent from '../../components/Section';
import Events from '../../components/Events/Events';
import './landing.css';
import CampusLife from '../../components/CLife/CLife';
import Footer from '../../components/Footer';
import Splash from '../../components/Splash';
import Linkages from '../../components/Linkages';

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

      <div className='landing-page-container mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8'>
        <SectionComponent>
          <NewsComponent />
        </SectionComponent>
        <SectionComponent>
          <>
            <div className='flex justify-center items-center bg-rose-950 rounded-lg p-6 text-white'>
              <div className='flex flex-col gap-4 justify-center p-4 '>
                <h3 className='text-2xl/3 font-bold'>Hello Mr. President</h3>
                <p className='text-sm'>
                  In a significant move to further the growth and development of
                  Marinduque State University, the University President has
                  taken a hands-on approach by creating a video message that
                  emphasizes the institution future goals and strategic vision.
                </p>
                <a
                  href='https://www.youtube.com/watch?v=9nl3yYgp-9I'
                  className='text-sm hover:text-amber-500'
                  target='_blank'
                  rel='noopener noreferrer'
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
        <SectionComponent>
          <CampusLife />
        </SectionComponent>
        <SectionComponent>
          <Events />
        </SectionComponent>
        <SectionComponent>
          {/* How to create a flex that will change the orientation on the smaller screen */}
          <div className='flex flex-col md:flex-row justify-center items-center rounded-lg p-6 text-white max-w-7xl mx-auto gap-4'>
            <div className=''>
              <img
                src='sdg-logo.png'
                className='sgd_landing_img aspect-ratio-4x3 cover-full max-w-sm'
                alt='Marinduque State University SDG Logo'
              />
            </div>
            <div className='flex flex-col max-w-7xl gap-4 p-4 '>
              <h3 className='text-2xl font-bold text-rose-950'>
                Marinduque State University Sustainable Development Goals
                Center!
              </h3>
              <p className='text-sm text-slate-950'>
                Explore our innovative programs and projects to generate
                long-term change, develop community involvement, and raise
                awareness of the Sustainable Development Goals.
              </p>
              <Link
                className='bg-rose-950 hover:bg-rose-700 text-white text-sm py-2 px-4 rounded max-w-sm w-fit'
                to='/sdg'
              >
                Explore SDG Center
              </Link>
            </div>
          </div>
        </SectionComponent>
        <Linkages />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
