import './Footer/footer.css';
import { useState } from 'react';

function Footer() {
  const [showTop, setShowTop] = useState(false);
  // Show back-to-top button on scroll
  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      setShowTop(window.scrollY > 200);
    };
  }
  const navigation = {
    solutions: [
      { name: 'Gov.ph', href: 'https://www.gov.ph/' },
      { name: 'Open Data Portal', href: 'https://data.gov.ph/' },
      { name: 'Official Gazette', href: 'https://www.officialgazette.gov.ph/' },
    ],
    support: [
      { name: 'Office of The President', href: '#' },
      { name: 'Office of The Vice President', href: '#' },
      { name: 'Department of Education', href: 'https://www.deped.gov.ph/' },
      { name: 'Department of Health', href: 'https://doh.gov.ph/' },
      {
        name: 'Department of Science and Technology',
        href: 'https://www.dost.gov.ph/',
      },
    ],
    company: [
      { name: 'MarSU Priisms', href: '#' },
      { name: 'MarSU Student Portal', href: '#' },
      { name: 'MarSU Alumni Portal', href: '#' },
      { name: 'MarSU SDG Center', href: '#' },
      { name: 'MarSU Customer Satisfaction', href: '#' },
      { name: 'MarSU E-library', href: '#' },
    ],
    legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'About', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Accessibility', href: '#' },
      { name: 'Sitemap', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Feedback', href: '#' },
    ],
    social: [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/marinduquestateuniversity/',
        icon: (props) => (
          <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
            <path
              fillRule='evenodd'
              d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
              clipRule='evenodd'
            />
          </svg>
        ),
      },
      {
        name: 'YouTube',
        href: 'https://www.youtube.com/@MarinduqueStateUniversity',
        icon: (props) => (
          <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
            <path
              fillRule='evenodd'
              d='M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z'
              clipRule='evenodd'
            />
          </svg>
        ),
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/marsuphil',
        icon: (props) => (
          <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
            <path d='M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.1.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z' />
          </svg>
        ),
      },
    ],
  };
  const year = new Date().getFullYear();
  return (
    <footer className='footer-container relative'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      {/* Dynamic ticker/announcements */}
      <div className='w-full bg-amber-100 text-amber-900 text-xs py-2 px-4 animate-marquee whitespace-nowrap overflow-hidden'>
        <span>
          Announcement: Enrollment for AY {year}-{year + 1} is now open! | New
          programs launching soon! | Follow us on social media for updates.
          |{' '}
        </span>
      </div>
      <div className='mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='space-y-8'>
            <img
              src='/logo.png'
              alt='Marinduque State University Logo'
              className='footer-logo w-auto mx-auto'
            />
            <p className='text-sm leading-6 text-white'>
              Marinduque State University is a premier university in the
              Philippines, dedicated to providing quality education and
              fostering innovation and research.
            </p>
            <address className='not-italic text-xs text-white mt-2'>
              Boac Campus, Tanza, Boac, Marinduque, Philippines
              <br />
              Tel: (042) 332-2020 | Email: info@marsu.edu.ph
            </address>
            <div className='flex space-x-6'>
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='text-white hover:text-amber-500'
                  aria-label={item.name}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <span className='sr-only'>{item.name}</span>
                  <item.icon className='h-6 w-6' aria-hidden='true' />
                </a>
              ))}
            </div>
          </div>
          <div className='mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0'>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm font-semibold leading-6 text-amber-500'>
                  About GOVPH
                </h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className='text-sm leading-6 text-white hover:text-amber-500'
                        aria-label={item.name}
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-10 md:mt-0'>
                <h3 className='text-sm font-semibold leading-6 text-amber-500'>
                  Government Links
                </h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className='text-sm leading-6 text-white hover:text-amber-500'
                        aria-label={item.name}
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm font-semibold leading-6 text-amber-500'>
                  Quick Links
                </h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className='text-sm leading-6 text-white hover:text-amber-500'
                        aria-label={item.name}
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24'>
          <p className='text-xs leading-5 text-white-500 text-center'>
            &copy; {year} Marinduque State University
          </p>
        </div>
      </div>
      {/* Back to Top Button */}
      {showTop && (
        <button
          className='fixed bottom-6 right-6 z-50 bg-amber-500 text-white rounded-full p-3 shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200'
          aria-label='Back to top'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5 15l7-7 7 7'
            />
          </svg>
        </button>
      )}
    </footer>
  );
}

export default Footer;
