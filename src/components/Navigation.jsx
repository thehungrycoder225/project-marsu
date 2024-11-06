import React, { useState } from 'react';
import './navigation.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = (menu) => {
    setMenuOpen(menuOpen === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-primary-900 nav-bar ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className='container mx-auto flex justify-between items-center p-4'>
        <div className='flex items-center gap-6'>
          <div className='nav-brand'>
            <Link to='/'>
              <img src='logo.png' alt='MarSU Logo' srcSet='logo.png' />
            </Link>
          </div>
          <div>
            <p className='nav-brand-text'>Marinduque State University</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
