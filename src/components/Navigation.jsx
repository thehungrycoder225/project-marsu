import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ArrowUpRightIcon,
  AdjustmentsHorizontalIcon,
  HomeIcon,
  InformationCircleIcon,
  AcademicCapIcon,
  BeakerIcon,
  ChevronDownIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../hooks/hooks';
import './navigation.css';

const universityLogo = '/logo.png'; // Update with your logo path

const navigation = [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon,
    description: 'Return to homepage',
  },
  {
    name: 'About',
    href: '/about',
    icon: InformationCircleIcon,
    description: 'Learn about our university',
  },
  {
    name: 'Colleges',
    href: '/colleges',
    icon: AcademicCapIcon,
    description: 'Explore our academic colleges',
    children: [
      {
        name: 'Arts & Sciences',
        href: '/colleges/cass',
        description: 'Liberal arts, sciences, and humanities programs',
        category: 'Core Academics',
      },
      {
        name: 'Business & Management',
        href: '/colleges/cbm',
        description: 'Business administration and management studies',
        category: 'Professional',
      },
      {
        name: 'Engineering',
        href: '/colleges/ceng',
        description: 'Engineering and technology programs',
        category: 'Technical',
      },
      {
        name: 'Industrial Technology',
        href: '/colleges/cit',
        description: 'Applied technology and industrial skills',
        category: 'Technical',
      },
      {
        name: 'Education',
        href: '/colleges/ce',
        description: 'Teacher education and pedagogy',
        category: 'Professional',
      },
      {
        name: 'Hospitality Management',
        href: '/colleges/chm',
        description: 'Tourism and hospitality industry programs',
        category: 'Professional',
      },
      {
        name: 'Criminal Justice',
        href: '/colleges/ccje',
        description: 'Law enforcement and criminal justice studies',
        category: 'Professional',
      },
      {
        name: 'Law',
        href: '/colleges/cl',
        description: 'Legal studies and jurisprudence',
        category: 'Professional',
      },
      {
        name: 'Graduate School',
        href: '/colleges/gs',
        description: 'Advanced degree and research programs',
        category: 'Advanced Studies',
      },
      {
        name: 'Agriculture',
        href: '/colleges/ca',
        description: 'Agricultural sciences and farming technology',
        category: 'Applied Sciences',
      },
      {
        name: 'Fisheries',
        href: '/colleges/cfas',
        description: 'Marine and aquatic sciences',
        category: 'Applied Sciences',
      },
      {
        name: 'Information & Computing Sciences',
        href: '/colleges/cics',
        description: 'Computer science and information technology',
        category: 'Technical',
      },
    ],
  },
  {
    name: 'Research',
    href: '/research',
    icon: BeakerIcon,
    description: 'Discover our research initiatives',
  },
];

const quickActions = [
  {
    name: 'Call University',
    href: 'tel:+63421234567',
    icon: PhoneIcon,
    color: 'text-green-600',
  },
  {
    name: 'Email Us',
    href: 'mailto:info@marsu.edu.ph',
    icon: EnvelopeIcon,
    color: 'text-blue-600',
  },
  {
    name: 'Campus Location',
    href: 'https://maps.google.com',
    icon: MapPinIcon,
    color: 'text-red-600',
  },
];

const additionalLinks = [
  {
    name: 'SDG Center',
    href: '/sdg-center ',
    icon: UserCircleIcon,
    description: 'Sustainable Development Goals initiatives',
  },
  {
    name: 'Library',
    href: '/library',
    icon: MagnifyingGlassIcon,
    description: 'Access our digital and physical library resources',
  },
  {
    name: 'GAD Portal',
    href: '/gad-portal',
    icon: UserCircleIcon,
    description: 'Gender and Development initiatives',
  },
];

// Group colleges by category for mega menu
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const location = useLocation();

  // Check if we're on the homepage
  const isHomepage = location.pathname === '/';

  // Adjust scroll threshold for homepage overlay behavior
  const scrollThreshold = isHomepage ? 100 : 20;

  // Accessibility controls (font size, contrast)
  const [fontSize, setFontSize] = useState('text-base');
  const [highContrast, setHighContrast] = useState(false);

  return (
    <header
      className={classNames(
        // Homepage: fully transparent until scrolled, then becomes solid
        // Other pages: always semi-transparent/solid
        isHomepage
          ? scrollPosition > 100
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/30 shadow-lg'
            : scrollPosition > 20
              ? 'bg-white/20 backdrop-blur-sm border-b border-white/10 shadow-sm'
              : 'bg-transparent backdrop-blur-none border-b border-transparent shadow-none'
          : scrollPosition > 20
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/30 shadow-lg'
            : 'bg-white/90 backdrop-blur-lg border-b border-gray-200/20 shadow-md',
        'fixed top-0 z-50 transition-all duration-500 ease-out w-full'
      )}
      style={highContrast ? { filter: 'contrast(1.5)' } : {}}
    >
      <nav
        aria-label='Main Navigation'
        className={classNames(
          'mx-auto flex max-w-7xl items-center justify-between py-6 px-6 lg:px-8 transition-all duration-500',
          // Homepage text coloring for overlay effect
          isHomepage
            ? scrollPosition > 100
              ? 'text-gray-900'
              : scrollPosition > 20
                ? 'text-gray-900'
                : 'text-gray-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
            : 'text-gray-900'
        )}
      >
        {/* Left Side - Desktop Nav Links */}
        <div className='hidden lg:flex gap-x-1 items-center flex-1'>
          {navigation.map((item) =>
            item.children ? (
              <div className='relative group' key={item.name}>
                <button
                  className={classNames(
                    'font-medium px-5 py-3 text-sm rounded-xl transition-all duration-500 flex items-center gap-2.5 group hover:scale-[1.02] active:scale-[0.98] relative',
                    isHomepage
                      ? scrollPosition > 20
                        ? 'text-gray-900 hover:text-[var(--primary-700)]'
                        : 'text-gray-50 hover:text-gray-50/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                      : 'text-gray-900 hover:text-[var(--primary-700)]'
                  )}
                >
                  <item.icon className='h-4 w-4 group-hover:scale-110 transition-transform duration-300' />
                  {item.name}
                  <ChevronDownIcon className='h-3.5 w-3.5 transition-all duration-300 group-hover:rotate-180 group-hover:scale-110' />
                  {/* Underline on hover */}
                  <div
                    className={classNames(
                      'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-4/5 transition-all duration-300 ease-out',
                      isHomepage && scrollPosition <= 20
                        ? 'bg-white/90'
                        : 'bg-[var(--primary-700)]'
                    )}
                  />
                </button>

                {/* Flyout Menu */}
                <div className='absolute left-0 mt-2 w-72 z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out'>
                  <div className='bg-white/95 backdrop-blur-lg shadow-xl rounded-xl border border-gray-200/60 py-3 overflow-hidden'>
                    {/* Menu items with staggered animation effect */}
                    {item.children.map((child, index) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className={classNames(
                          'block px-4 py-3 text-sm transition-all duration-200 hover:bg-gray-50/80 hover:translate-x-1 group/item',
                          location.pathname === child.href
                            ? 'text-[var(--primary-700)] bg-[var(--primary-50)] font-semibold border-r-2 border-[var(--primary-700)]'
                            : 'text-gray-700 hover:text-[var(--primary-700)]'
                        )}
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <span className='group-hover/item:translate-x-1 transition-transform duration-200'>
                            {child.name}
                          </span>
                          <ArrowUpRightIcon className='h-3 w-3 opacity-0 group-hover/item:opacity-100 transition-all duration-200 text-gray-400' />
                        </div>
                      </Link>
                    ))}

                    {/* Subtle footer */}
                    <div className='mt-2 pt-2 border-t border-gray-100'>
                      <Link
                        to='/colleges'
                        className='flex items-center gap-2 px-4 py-2 text-xs text-gray-500 hover:text-[var(--primary-600)] transition-colors duration-200'
                      >
                        <span>View all colleges</span>
                        <ArrowUpRightIcon className='h-3 w-3' />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  'font-medium px-5 py-3 text-sm transition-all duration-500 rounded-xl flex items-center gap-2.5 group relative hover:scale-[1.02] active:scale-[0.98]',
                  location.pathname === item.href
                    ? isHomepage && scrollPosition <= 20
                      ? 'text-gray-50 scale-[1.02] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                      : 'text-[var(--primary-700)] scale-[1.02]'
                    : isHomepage
                      ? scrollPosition > 20
                        ? 'text-gray-900 hover:text-[var(--primary-700)]'
                        : 'text-gray-50 hover:text-gray-50/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                      : 'text-gray-900 hover:text-[var(--primary-700)]'
                )}
                aria-current={
                  location.pathname === item.href ? 'page' : undefined
                }
              >
                <item.icon className='h-4 w-4 group-hover:scale-110 transition-transform duration-300' />
                {item.name}
                {/* Active underline */}
                {location.pathname === item.href ? (
                  <div
                    className={classNames(
                      'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5',
                      isHomepage && scrollPosition <= 20
                        ? 'bg-white/90'
                        : 'bg-[var(--primary-700)]'
                    )}
                  />
                ) : (
                  /* Hover underline */
                  <div
                    className={classNames(
                      'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-4/5 transition-all duration-300 ease-out',
                      isHomepage && scrollPosition <= 20
                        ? 'bg-white/90'
                        : 'bg-[var(--primary-700)]'
                    )}
                  />
                )}
              </Link>
            )
          )}
        </div>
        {/* Center - Logo & Brand */}
        <div className='flex items-center gap-3 lg:flex-shrink-0 group'>
          <Link
            to='/'
            className='flex items-center gap-3 transition-all duration-300 group-hover:scale-105'
          >
            <div className='relative'>
              <img
                src={universityLogo}
                alt='University Logo'
                className='h-14 w-14 rounded-full object-contain ring-2 ring-white/20 group-hover:ring-[var(--primary-200)] transition-all duration-300'
              />
              <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
            <span className='font-bold text-xl tracking-tight text-primary-900 hidden lg:inline xl:hidden transition-all duration-300 group-hover:text-[var(--primary-700)]'>
              MARSU
            </span>
          </Link>
        </div>

        <div className='hidden lg:flex gap-x-1 items-center justify-end flex-1'>
          {/* Additional Links */}
          {additionalLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href.trim()}
              className={classNames(
                'font-medium px-5 py-3 text-sm transition-all duration-500 rounded-xl flex items-center gap-2.5 group relative hover:scale-[1.02] active:scale-[0.98]',
                location.pathname === link.href.trim()
                  ? isHomepage && scrollPosition <= 20
                    ? 'text-gray-50 scale-[1.02] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                    : 'text-[var(--primary-700)] scale-[1.02]'
                  : isHomepage
                    ? scrollPosition > 20
                      ? 'text-gray-900 hover:text-[var(--primary-700)]'
                      : 'text-gray-50 hover:text-gray-50/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                    : 'text-gray-900 hover:text-[var(--primary-700)]'
              )}
              aria-current={
                location.pathname === link.href.trim() ? 'page' : undefined
              }
            >
              <link.icon className='h-4 w-4 group-hover:scale-110 transition-transform duration-300' />
              {link.name}
              {/* Active underline */}
              {location.pathname === link.href.trim() ? (
                <div
                  className={classNames(
                    'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5',
                    isHomepage && scrollPosition <= 20
                      ? 'bg-white/90'
                      : 'bg-[var(--primary-700)]'
                  )}
                />
              ) : (
                <div
                  className={classNames(
                    'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-4/5 transition-all duration-300 ease-out',
                    isHomepage && scrollPosition <= 20
                      ? 'bg-white/90'
                      : 'bg-[var(--primary-700)]'
                  )}
                />
              )}
            </Link>
          ))}

          {/* Accessibility Button */}
          <button
            type='button'
            onClick={() => setAccessOpen(true)}
            className={classNames(
              'ml-2 px-4 py-3 rounded-xl flex items-center gap-2.5 font-medium text-sm transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] bg-gray-100 hover:bg-gray-200 text-gray-700',
              isHomepage && scrollPosition <= 20
                ? 'bg-white/10 text-gray-50 hover:bg-white/20'
                : ''
            )}
            aria-label='Accessibility options'
          >
            <AdjustmentsHorizontalIcon className='h-5 w-5' />
            <span className='hidden xl:inline'>Accessibility</span>
          </button>
        </div>
        {/* Mobile Menu Button */}
        <div className='flex lg:hidden'>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className={classNames(
              'inline-flex items-center justify-center rounded-md p-2 transition-all duration-500',
              isHomepage
                ? scrollPosition > 20
                  ? 'text-gray-700 hover:text-[var(--primary-700)]'
                  : 'text-gray-50 hover:text-gray-50/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                : 'text-gray-700 hover:text-[var(--primary-700)]'
            )}
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
          <div className='flex flex-col gap-2'>
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className='mb-4'>
                  <div className='flex items-center gap-2 font-semibold text-gray-700 mb-3 px-2'>
                    <item.icon className='h-5 w-5 text-[var(--primary-700)]' />
                    <span>{item.name}</span>
                  </div>

                  {/* Mobile Simple Menu */}
                  <div className='ml-4 space-y-1'>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className={classNames(
                          'block px-3 py-2 rounded-lg text-sm transition-colors',
                          location.pathname === child.href
                            ? 'font-bold text-[var(--primary-700)] bg-[var(--primary-50)]'
                            : 'text-gray-600 hover:text-[var(--primary-700)] hover:bg-gray-50'
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
                    'flex items-center gap-3 px-3 py-3 rounded-lg font-semibold transition-colors',
                    location.pathname === item.href
                      ? 'text-[var(--primary-700)] bg-[var(--primary-50)]'
                      : 'text-gray-900 hover:text-[var(--primary-700)] hover:bg-gray-50'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className='h-5 w-5' />
                  {item.name}
                </Link>
              )
            )}

            {/* Quick Actions */}
            <div className='mt-6 pt-6 border-t border-gray-200'>
              <h3 className='font-semibold text-gray-700 mb-3 px-2'>
                Quick Actions
              </h3>
              <div className='space-y-2'>
                {quickActions.map((action) => (
                  <a
                    key={action.name}
                    href={action.href}
                    target={
                      action.href.startsWith('http') ? '_blank' : undefined
                    }
                    rel={
                      action.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className={classNames(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-50',
                      action.color
                    )}
                  >
                    <action.icon className='h-5 w-5' />
                    {action.name}
                    {action.href.startsWith('http') && (
                      <ArrowUpRightIcon className='h-3 w-3 ml-auto' />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      {/* Accessibility Dialog */}
      <Dialog open={accessOpen} onClose={setAccessOpen} className='z-50'>
        <div
          className='fixed inset-0 bg-black/40 backdrop-blur-sm'
          aria-hidden='true'
        />
        <DialogPanel className='fixed top-1/4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-gray-200/60'>
          <div className='mb-6 flex items-center gap-3'>
            <div className='p-2 bg-[var(--primary-100)] rounded-lg'>
              <AdjustmentsHorizontalIcon className='h-6 w-6 text-[var(--primary-700)]' />
            </div>
            <div>
              <h3 className='font-bold text-lg text-gray-900'>Accessibility</h3>
              <p className='text-sm text-gray-600'>Customize your experience</p>
            </div>
          </div>

          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Font Size
              </label>
              <div className='flex gap-2'>
                {['text-sm', 'text-base', 'text-lg'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={classNames(
                      'flex-1 px-4 py-2 rounded-lg font-medium transition-all',
                      fontSize === size
                        ? 'bg-[var(--primary-700)] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {size === 'text-sm'
                      ? 'A-'
                      : size === 'text-base'
                        ? 'A'
                        : 'A+'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Contrast
              </label>
              <div className='flex gap-2'>
                {[false, true].map((contrast) => (
                  <button
                    key={contrast.toString()}
                    onClick={() => setHighContrast(contrast)}
                    className={classNames(
                      'flex-1 px-4 py-2 rounded-lg font-medium transition-all',
                      highContrast === contrast
                        ? 'bg-[var(--primary-700)] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {contrast ? 'High' : 'Normal'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className='mt-6 pt-6 border-t border-gray-200'>
            <button
              onClick={() => setAccessOpen(false)}
              className='w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors'
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
