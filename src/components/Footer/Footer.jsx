import './Footer/footer.css';

function Footer() {
  const navigation = {
    solutions: [
      { name: 'Gov.ph', href: '#' },
      { name: 'Open Data Portal', href: '#' },
      { name: 'Official Gazette', href: '#' },
    ],
    support: [
      { name: 'Office of The President', href: '#' },
      { name: 'Office of The Vice President', href: '#' },
      { name: 'Department of Education', href: '#' },
      { name: 'Department of Health', href: '#' },
      { name: 'Department of Science and Technology', href: '#' },
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
        href: '#',
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
        href: '#',
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
    ],
  };

  return (
    <footer className='footer-container'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='space-y-8'>
            <img
              src='../logo.png'
              alt=''
              className='footer-logo w-auto mx-auto'
            />
            <p className='text-sm leading-6 text-white'>
              Marinduque State University is a premier university in the
              Philippines, dedicated to providing quality education and
              fostering innovation and research.
            </p>
            <div className='flex space-x-6'>
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='text-white hover:text-amber-500'
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
            &copy; 2024 Marinduque State University
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
