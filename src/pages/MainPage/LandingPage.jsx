import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

import Navigation from '../../components/Navigation';
import LandingHeroCarousel from '../../components/LandingHeroCarousel';
import UniversityNews from '../../components/UniversityNews';
import SectionComponent from '../../components/Section';
import Events from '../../components/Events/Events';
import './landing.css';
import CampusLife from '../../components/CLife/CLife';
import Footer from '../../components/Footer';
import Splash from '../../components/Splash';
import Linkages from '../../components/Linkages';
import UniversityStats from '../../components/UniversityStats';
import PlaylistSection from '../../components/PlaylistSection'; // Import the new PlaylistSection component

function LandingPage() {
  return (
    <div>
      <Navigation />
      <LandingHeroCarousel />
      <UniversityStats />
      <div className='mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8'>
        <SectionComponent>
          <UniversityNews />
        </SectionComponent>
        <SectionComponent bg='bg-gradient-to-t from-bg-gray-50 to bg-gray-100/20'>
          <CampusLife />
        </SectionComponent>
        <SectionComponent>
          <Events />
        </SectionComponent>
        <SectionComponent>
          {/* How to create a flex that will change the orientation on the smaller screen */}
          <div className='flex flex-col md:flex-row justify-center items-center rounded-lg bg-gradient-to-t from-bg-amber-50 to bg-amber-100/20 p-6 text-white max-w-7xl mx-auto gap-4'>
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
