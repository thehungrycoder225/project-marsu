import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ArrowUpRightIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../hooks/hooks';
import './navigation.css';

const universityLogo = '/logo.png'; // Update with your logo path

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  {
    name: 'Colleges',
    href: '/colleges',
    children: [
      { name: 'Arts & Sciences', href: '/colleges/cass' },
      { name: 'Business & Management', href: '/colleges/cbm' },
      { name: 'Engineering', href: '/colleges/ceng' },
      { name: 'Industrial Technology', href: '/colleges/cit' },
      { name: 'Education', href: '/colleges/ce' },
      { name: 'Hospitality Management', href: '/colleges/chm' },
      { name: 'Criminal Justice', href: '/colleges/ccje' },
      { name: 'Law', href: '/colleges/cl' },
      { name: 'Graduate School', href: '/colleges/gs' },
      { name: 'Agriculture', href: '/colleges/ca' },
      { name: 'Fisheries', href: '/colleges/cfas' },
      { name: 'Information & Computing Sciences', href: '/colleges/cics' },
    ],
  },
  { name: 'Research', href: '/research' },
  { name: 'News', href: '/news' },
];

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/marinduquestateuniversity',
    icon: <ArrowUpRightIcon className='inline h-4 w-4 ml-1' />,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: <ArrowUpRightIcon className='inline h-4 w-4 ml-1' />,
  },
  {
    name: 'Email',
    href: 'mailto:info@marsu.edu.ph',
    icon: <ArrowUpRightIcon className='inline h-4 w-4 ml-1' />,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const location = useLocation();

  // Accessibility controls (font size, contrast)
  // For demo: just toggles, you can wire up to context/state
  const [fontSize, setFontSize] = useState('text-base');
  const [highContrast, setHighContrast] = useState(false);

  return (
    <header
      className={classNames(
        scrollPosition > 0 ? 'shadow-lg' : 'shadow-none bg-transparent',
        'sticky top-0 z-40 transition-shadow w-full bg-white/60 backdrop-blur-lg border-b border-gray-200'
      )}
      style={highContrast ? { filter: 'contrast(1.5)' } : {}}
    >
      <nav
        aria-label='Main Navigation'
        className='mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8'
      >
        {/* Logo & Brand */}
        <div className='flex items-center gap-3'>
          <Link to='/' className='flex items-center gap-2'>
            <img
              src={universityLogo}
              alt='University Logo'
              className='h-12 w-12 rounded-full object-contain'
            />
            <span className='font-bold text-lg tracking-tight text-primary-900 hidden sm:inline'>
              Marinduque State University
            </span>
          </Link>
        </div>
        {/* Desktop Nav */}
        <div className='hidden lg:flex gap-x-6 items-center'>
          {navigation.map((item) =>
            item.children ? (
              <div className='relative group' key={item.name}>
                <button className='font-semibold px-3 py-2 text-sm text-gray-900 hover:text-[var(--primary-700)]'>
                  {item.name}
                </button>
                <div className='absolute left-0 mt-2 hidden group-hover:block bg-white/95 shadow-lg rounded-md min-w-[220px] border border-gray-100 z-20'>
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.href}
                      className={classNames(
                        'block px-4 py-2 text-sm hover:bg-gray-100',
                        location.pathname === child.href
                          ? 'font-bold text-[var(--primary-700)]'
                          : 'text-gray-900'
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  'font-semibold px-3 py-2 text-sm transition-all',
                  location.pathname === item.href
                    ? 'nav-active border-b-2 border-[var(--primary-700)]'
                    : 'text-gray-900 hover:text-[var(--primary-700)]'
                )}
                aria-current={
                  location.pathname === item.href ? 'page' : undefined
                }
              >
                {item.name}
              </Link>
            )
          )}
          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className='p-2 rounded-full hover:bg-gray-100 text-gray-700'
            aria-label='Open search'
          >
            <MagnifyingGlassIcon className='h-6 w-6' />
          </button>
          {/* Accessibility Icon */}
          <button
            onClick={() => setAccessOpen(true)}
            className='p-2 rounded-full hover:bg-gray-100 text-gray-700'
            aria-label='Accessibility options'
          >
            <AdjustmentsHorizontalIcon className='h-6 w-6' />
          </button>
          {/* User/Profile Icon */}
          <button
            className='p-2 rounded-full hover:bg-gray-100 text-gray-700'
            aria-label='User menu'
          >
            <UserCircleIcon className='h-7 w-7' />
          </button>
        </div>
        {/* Mobile Menu Button */}
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
            <Link to='/' className='flex items-center gap-2'>
              <img
                src={universityLogo}
                alt='University Logo'
                className='h-10 w-10 rounded-full object-contain'
              />
              <span className='font-bold text-base tracking-tight text-primary-900'>
                MARSU
              </span>
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
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className='mb-2'>
                  <span className='block font-semibold text-gray-700 mb-1'>
                    {item.name}
                  </span>
                  <div className='ml-2 flex flex-col gap-1'>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className={classNames(
                          'block px-2 py-1 rounded hover:bg-gray-100',
                          location.pathname === child.href
                            ? 'font-bold text-[var(--primary-700)]'
                            : 'text-gray-900'
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    'block px-2 py-2 rounded hover:bg-gray-100 font-semibold',
                    location.pathname === item.href
                      ? 'text-[var(--primary-700)]'
                      : 'text-gray-900'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className='mt-4 border-t pt-4 flex flex-col gap-2'>
              <span className='font-semibold text-gray-700'>Quick Links</span>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-sm text-[var(--primary-700)] hover:underline'
                >
                  {link.name} {link.icon}
                </a>
              ))}
              <a
                href='tel:+63421234567'
                className='flex items-center gap-2 text-sm text-[var(--primary-700)] hover:underline'
              >
                Call Us <ArrowUpRightIcon className='inline h-4 w-4 ml-1' />
              </a>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      {/* Search Dialog */}
      <Dialog open={searchOpen} onClose={setSearchOpen} className='z-50'>
        <div className='fixed inset-0 bg-black/40' aria-hidden='true' />
        <DialogPanel className='fixed top-1/4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-white p-6 rounded-xl shadow-xl'>
          <div className='flex items-center gap-2 mb-4'>
            <MagnifyingGlassIcon className='h-6 w-6 text-gray-500' />
            <input
              type='text'
              placeholder='Search...'
              className='w-full border-none outline-none text-lg bg-transparent'
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              aria-label='Close search'
            >
              <XMarkIcon className='h-6 w-6 text-gray-400' />
            </button>
          </div>
          <div className='text-gray-500 text-sm'>
            Type to search site content...
          </div>
        </DialogPanel>
      </Dialog>
      {/* Accessibility Dialog */}
      <Dialog open={accessOpen} onClose={setAccessOpen} className='z-50'>
        <div className='fixed inset-0 bg-black/40' aria-hidden='true' />
        <DialogPanel className='fixed top-1/4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs bg-white p-6 rounded-xl shadow-xl'>
          <div className='mb-4 flex items-center gap-2'>
            <AdjustmentsHorizontalIcon className='h-6 w-6 text-gray-500' />
            <span className='font-semibold text-lg'>Accessibility Options</span>
          </div>
          <div className='flex flex-col gap-3'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Font Size
              </label>
              <div className='flex gap-2'>
                <button
                  onClick={() => setFontSize('text-sm')}
                  className={classNames(
                    'px-2 py-1 rounded',
                    fontSize === 'text-sm' ? 'bg-primary-100' : 'bg-gray-100'
                  )}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('text-base')}
                  className={classNames(
                    'px-2 py-1 rounded',
                    fontSize === 'text-base' ? 'bg-primary-100' : 'bg-gray-100'
                  )}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('text-lg')}
                  className={classNames(
                    'px-2 py-1 rounded',
                    fontSize === 'text-lg' ? 'bg-primary-100' : 'bg-gray-100'
                  )}
                >
                  A+
                </button>
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Contrast
              </label>
              <div className='flex gap-2'>
                <button
                  onClick={() => setHighContrast(false)}
                  className={classNames(
                    'px-2 py-1 rounded',
                    !highContrast ? 'bg-primary-100' : 'bg-gray-100'
                  )}
                >
                  Normal
                </button>
                <button
                  onClick={() => setHighContrast(true)}
                  className={classNames(
                    'px-2 py-1 rounded',
                    highContrast ? 'bg-primary-100' : 'bg-gray-100'
                  )}
                >
                  High
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
