import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useScrollPosition } from '../../hooks/hooks';

// Example: Replace with real logo/icon paths per college
const collegeLogos = {
  cics: '/public/logo.png',
  ceng: '/public/logo.png',
  cass: '/public/logo.png',
  cit: '/public/logo.png',
  cba: '/public/logo.png',
  coed: '/public/logo.png',
};

const navLinks = [
  {
    label: 'About',
    to: (key) => `/colleges/${key}/about`,
    tooltip: 'About the college',
  },
  {
    label: 'Programs',
    to: (key) => `/colleges/${key}/programs`,
    tooltip: 'Degree programs offered',
  },
  {
    label: 'Faculty',
    to: (key) => `/colleges/${key}/faculty`,
    tooltip: 'Meet the faculty',
  },
  {
    label: 'News',
    to: (key) => `/colleges/${key}/news`,
    tooltip: 'Latest news',
  },
  {
    label: 'Awards',
    to: (key) => `/colleges/${key}/awards`,
    tooltip: 'College awards',
  },
  {
    label: 'Research',
    to: (key) => `/colleges/${key}/research`,
    tooltip: 'Research projects',
  },
  {
    label: 'Contact',
    to: (key) => `/colleges/${key}/contact`,
    tooltip: 'Contact information',
  },
];

export default function CollegeNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const { collegeKey } = useParams();
  const location = useLocation();
  const logo = collegeLogos[collegeKey] || '/public/logo.png';

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <header
      className={classNames(
        scrollPosition > 0 ? 'shadow-lg' : 'shadow-none bg-transparent',
        'sticky top-0 z-30 transition-shadow w-full bg-white/60 backdrop-blur-lg border-b border-gray-200'
      )}
    >
      <nav
        aria-label='College Navigation'
        className='mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8'
      >
        <div className='flex items-center gap-2'>
          <Link
            to={`/colleges/${collegeKey}`}
            className='flex items-center gap-2'
          >
            <img
              alt='College Logo'
              src={logo}
              className='h-12 w-12 rounded-full object-contain'
            />
            <span className='sr-only'>College Home</span>
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className='inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-[var(--primary-700)]'
            aria-label='Open main menu'
          >
            <Bars3Icon aria-hidden='true' className='h-6 w-6' />
          </button>
        </div>
        <div className='hidden lg:flex gap-x-6'>
          {navLinks.map((link) => {
            const to = link.to(collegeKey);
            const isActive = location.pathname === to;
            return (
              <Link
                key={link.label}
                to={to}
                className={classNames(
                  'relative font-semibold px-3 py-2 transition-all text-sm',
                  isActive
                    ? 'nav-active' // text and underline via CSS
                    : 'text-gray-900 hover:text-[var(--primary-700)]'
                )}
                aria-current={isActive ? 'page' : undefined}
                title={link.tooltip}
                style={
                  isActive
                    ? { borderBottom: '2px solid var(--primary-700)' }
                    : {}
                }
              >
                {link.label}
                {isActive && (
                  <span className='nav-indicator absolute left-1/2 -bottom-1 w-2 h-2 rounded-full -translate-x-1/2 animate-bounce' />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Mobile Drawer */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className='lg:hidden'
      >
        <div className='fixed inset-0 z-40 bg-black/30' aria-hidden='true' />
        <DialogPanel className='fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white/90 p-6 overflow-y-auto shadow-xl'>
          <div className='flex items-center justify-between mb-6'>
            <Link
              to={`/colleges/${collegeKey}/about`}
              className='flex items-center gap-2 '
            >
              <img
                alt='College Logo'
                src={
                  collegeKey in collegeLogos
                    ? collegeLogos[collegeKey]
                    : '/public/logo.png'
                }
                className='h-10 w-10 rounded-full object-contain'
              />
              <span className='sr-only'>College Home</span>
            </Link>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(false)}
              className='rounded-md p-2 text-gray-700 hover:bg-gray-200'
              aria-label='Close menu'
            >
              <XMarkIcon aria-hidden='true' className='h-6 w-6' />
            </button>
          </div>
          <div className='flex flex-col gap-4'>
            {navLinks.map((link) => {
              const to = link.to(collegeKey);
              const isActive = location.pathname === to;
              return (
                <Link
                  key={link.label}
                  to={to}
                  className={classNames(
                    'font-semibold px-3 py-2 transition-all ',
                    isActive
                      ? 'nav-active'
                      : 'text-gray-900 hover:text-[var(--primary-700)]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  title={link.tooltip}
                  onClick={() => setMobileMenuOpen(false)}
                  style={
                    isActive
                      ? { borderBottom: '1px solid var(--primary-700)' }
                      : {}
                  }
                >
                  {link.label}
                  {isActive && (
                    <span className='nav-indicator absolute left-1/2 -bottom-1 w-2 h-2  -translate-x-1/2 animate-bounce' />
                  )}
                </Link>
              );
            })}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
