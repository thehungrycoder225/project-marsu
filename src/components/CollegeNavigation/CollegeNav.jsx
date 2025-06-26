import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Dialog, DialogPanel } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  UserGroupIcon,
  AcademicCapIcon,
  NewspaperIcon,
  InformationCircleIcon,
  BookOpenIcon,
  UsersIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
import { useScrollPosition } from '../../hooks/hooks';

// College data with theming and info
const collegeData = {
  cics: {
    name: 'Information & Computing Sciences',
    shortName: 'CICS',
    logo: '/images/cics-temp-logo.png',
    theme: {
      primary: '#6ec207', // Original bright green
      secondary: '#ffeb00', // Original yellow
      accent: '#7edc2a', // Supporting green
    },
    stats: {
      students: '1,200+',
      programs: '8',
      faculty: '45',
    },
    contact: {
      phone: '+63 42 123 4567',
      email: 'cics@marsu.edu.ph',
      location: 'CICS Building, Main Campus',
    },
  },
  cass: {
    name: 'Arts & Sciences',
    shortName: 'CASS',
    logo: '/images/cass-logo.png',
    theme: {
      primary: '#ff5d99', // Original pink
      secondary: '#e91e63', // Supporting pink tone
      accent: '#ff6daa', // Light pink
    },
    stats: {
      students: '800+',
      programs: '12',
      faculty: '60',
    },
    contact: {
      phone: '+63 42 123 4568',
      email: 'cass@marsu.edu.ph',
      location: 'CASS Building, Main Campus',
    },
  },
  ceng: {
    name: 'Engineering',
    shortName: 'CENG',
    logo: '/images/ceng-logo.png',
    theme: {
      primary: '#ff6600', // Original orange
      secondary: '#e65100', // Supporting orange tone
      accent: '#ff7f00', // Light orange
    },
    stats: {
      students: '1,500+',
      programs: '6',
      faculty: '75',
    },
    contact: {
      phone: '+63 42 123 4569',
      email: 'ceng@marsu.edu.ph',
      location: 'Engineering Complex, Main Campus',
    },
  },
  cit: {
    name: 'Industrial Technology',
    shortName: 'CIT',
    logo: '/images/cit-logo.png',
    theme: {
      primary: '#fac937', // Original gold
      secondary: '#f57f17', // Supporting amber tone
      accent: '#f0e68c', // Light gold
    },
    stats: {
      students: '900+',
      programs: '5',
      faculty: '40',
    },
    contact: {
      phone: '+63 42 123 4570',
      email: 'cit@marsu.edu.ph',
      location: 'CIT Building, Main Campus',
    },
  },
  ce: {
    name: 'Education',
    shortName: 'CE',
    logo: '/images/ce-logo.png',
    theme: {
      primary: '#2d80d2', // Original blue (from coed)
      secondary: '#1976d2', // Supporting blue tone
      accent: '#3f9be0', // Light blue
    },
    stats: {
      students: '1,100+',
      programs: '4',
      faculty: '55',
    },
    contact: {
      phone: '+63 42 123 4571',
      email: 'ce@marsu.edu.ph',
      location: 'Education Building, Main Campus',
    },
  },
  chm: {
    name: 'Hospitality Management',
    shortName: 'CHM',
    logo: '/images/chm-logo.png',
    theme: {
      primary: '#02d8e9', // Original cyan
      secondary: '#00acc1', // Supporting cyan tone
      accent: '#1ee0f2', // Light cyan
    },
    stats: {
      students: '650+',
      programs: '3',
      faculty: '25',
    },
    contact: {
      phone: '+63 42 123 4572',
      email: 'chm@marsu.edu.ph',
      location: 'CHM Building, Main Campus',
    },
  },
  ccje: {
    name: 'Criminal Justice Education',
    shortName: 'CCJE',
    logo: '/images/ccje-logo.png',
    theme: {
      primary: '#800000', // Original dark red
      secondary: '#d32f2f', // Supporting red tone
      accent: '#9b0000', // Medium red
    },
    stats: {
      students: '750+',
      programs: '2',
      faculty: '30',
    },
    contact: {
      phone: '+63 42 123 4573',
      email: 'ccje@marsu.edu.ph',
      location: 'CCJE Building, Main Campus',
    },
  },
  cl: {
    name: 'Law',
    shortName: 'CL',
    logo: '/images/cl-logo.png',
    theme: {
      primary: '#652483', // Original purple
      secondary: '#7b1fa2', // Supporting purple tone
      accent: '#7a2b9c', // Light purple
    },
    stats: {
      students: '300+',
      programs: '1',
      faculty: '20',
    },
    contact: {
      phone: '+63 42 123 4574',
      email: 'cl@marsu.edu.ph',
      location: 'Law Building, Main Campus',
    },
  },
  gs: {
    name: 'Graduate School',
    shortName: 'GS',
    logo: '/images/gs-logo.png',
    theme: {
      primary: '#660020', // Original deep maroon
      secondary: '#ec8305', // Original complementary gold
      accent: '#80002a', // Medium maroon
    },
    stats: {
      students: '400+',
      programs: '15',
      faculty: '35',
    },
    contact: {
      phone: '+63 42 123 4575',
      email: 'gs@marsu.edu.ph',
      location: 'Graduate School Building, Main Campus',
    },
  },
  ca: {
    name: 'Agriculture',
    shortName: 'CA',
    logo: '/images/ca-logo.png',
    theme: {
      primary: '#125c13', // Original forest green
      secondary: '#2e7d32', // Supporting green tone
      accent: '#1a6f1a', // Light green
    },
    stats: {
      students: '600+',
      programs: '4',
      faculty: '35',
    },
    contact: {
      phone: '+63 42 123 4576',
      email: 'ca@marsu.edu.ph',
      location: 'Agriculture Campus, Torrijos',
    },
  },
  cfas: {
    name: 'Fisheries & Aquatic Sciences',
    shortName: 'CFAS',
    logo: '/images/cfas-logo.png',
    theme: {
      primary: '#02d8e9', // Original cyan
      secondary: '#0097a7', // Supporting teal tone
      accent: '#1ee0f2', // Light cyan
    },
    stats: {
      students: '350+',
      programs: '3',
      faculty: '20',
    },
    contact: {
      phone: '+63 42 123 4577',
      email: 'cfas@marsu.edu.ph',
      location: 'Marine Campus, Mogpog',
    },
  },
  // Add more colleges as needed
  default: {
    name: 'College',
    shortName: 'COL',
    logo: '/logo.png',
    theme: {
      primary: 'var(--primary-700)',
      secondary: 'var(--primary-800)',
      accent: 'var(--primary-500)',
    },
    stats: {
      students: 'N/A',
      programs: 'N/A',
      faculty: 'N/A',
    },
    contact: {
      phone: '+63 42 123 4567',
      email: 'info@marsu.edu.ph',
      location: 'Main Campus',
    },
  },
};

const navLinks = [
  {
    label: 'News',
    to: (key) => `/colleges/${key}/news`,
    tooltip: 'Latest news',
    icon: NewspaperIcon,
  },
  {
    label: 'About',
    to: (key) => `/colleges/${key}/about`,
    tooltip: 'About the college',
    icon: InformationCircleIcon,
  },
  {
    label: 'Programs',
    to: (key) => `/colleges/${key}/programs`,
    tooltip: 'Degree programs offered',
    icon: BookOpenIcon,
  },
  {
    label: 'Faculty',
    to: (key) => `/colleges/${key}/faculty`,
    tooltip: 'Meet the faculty',
    icon: UsersIcon,
  },
  {
    label: 'Research',
    to: (key) => `/colleges/${key}/research`,
    tooltip: 'Research projects',
    icon: BeakerIcon,
  },
];

export default function CollegeNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const { collegeKey } = useParams();
  const location = useLocation();

  // Get college data with fallback
  const college = collegeData[collegeKey] || collegeData.default;

  // Check if we're on the college homepage (e.g., /colleges/cics vs /colleges/cics/about)
  const isCollegeHomepage = location.pathname === `/colleges/${collegeKey}`;

  // Quick actions for this college
  const quickActions = [
    {
      name: 'Call College',
      href: `tel:${college.contact.phone}`,
      icon: PhoneIcon,
      color: 'text-green-600',
    },
    {
      name: 'Email College',
      href: `mailto:${college.contact.email}`,
      icon: EnvelopeIcon,
      color: 'text-blue-600',
    },
    {
      name: 'Visit Campus',
      href: '#location',
      icon: MapPinIcon,
      color: 'text-red-600',
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <header
      className={classNames(
        // Adopt main nav glassmorphic styling with college homepage overlay behavior
        isCollegeHomepage
          ? scrollPosition > 100
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/30 shadow-lg'
            : scrollPosition > 20
              ? 'bg-white/20 backdrop-blur-sm border-b border-white/10 shadow-sm'
              : 'bg-transparent backdrop-blur-none border-b border-transparent shadow-none'
          : scrollPosition > 20
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/30 shadow-lg'
            : 'bg-white/90 backdrop-blur-lg border-b border-gray-200/20 shadow-md',
        'fixed z-40 transition-all duration-500 ease-out w-full will-change-auto'
      )}
      style={{
        '--college-primary': college.theme.primary,
        '--college-secondary': college.theme.secondary,
        '--college-accent': college.theme.accent,
      }}
    >
      <nav
        aria-label='College Navigation'
        className={classNames(
          'mx-auto flex max-w-7xl items-center justify-between py-6 px-6 lg:px-8 transition-all duration-500',
          // College homepage text coloring for overlay effect (matching main nav pattern)
          isCollegeHomepage
            ? scrollPosition > 100
              ? 'text-gray-900'
              : scrollPosition > 20
                ? 'text-gray-900'
                : 'text-gray-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
            : 'text-gray-900'
        )}
      >
        {/* Left Side - College Logo & Info */}
        <div className='flex items-center gap-4 flex-1'>
          <div className='relative group'>
            <Link
              to={`/colleges/${collegeKey}`}
              className='flex items-center gap-3 transition-all duration-300 group-hover:scale-105 will-change-transform'
            >
              <div className='relative'>
                <img
                  alt={`${college.name} Logo`}
                  src={college.logo}
                  className='h-14 w-14 rounded-full object-contain ring-2 ring-white/20 group-hover:ring-[var(--college-primary)]/30 transition-all duration-300'
                />
                <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>
              <div className='hidden lg:block'>
                <h1
                  className={classNames(
                    'font-bold text-lg tracking-tight group-hover:text-[var(--college-primary)] transition-colors duration-300',
                    isCollegeHomepage
                      ? scrollPosition > 20
                        ? 'text-gray-900'
                        : 'text-gray-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                      : 'text-gray-900'
                  )}
                >
                  {college.shortName}
                </h1>
                <p
                  className={classNames(
                    'text-sm truncate max-w-48',
                    isCollegeHomepage
                      ? scrollPosition > 20
                        ? 'text-gray-600'
                        : 'text-gray-50/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                      : 'text-gray-600'
                  )}
                >
                  {college.name}
                </p>
              </div>
            </Link>
          </div>

          {/* College Info Dropdown */}
          <div className='relative group hidden lg:block'>
            {/* <button
              onClick={() => setCollegeInfoOpen(!collegeInfoOpen)}
              className={classNames(
                'flex items-center gap-2 px-3 py-2 text-sm font-medium hover:text-[var(--college-primary)] rounded-lg hover:bg-gray-50/80 transition-all duration-300 group will-change-transform',
                isCollegeHomepage
                  ? scrollPosition > 20
                    ? 'text-gray-700'
                    : 'text-gray-50/90 hover:text-gray-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                  : 'text-gray-700'
              )}
            >
              <InformationCircleIcon className='h-4 w-4' />
              <span>Quick Info</span>
              <ChevronDownIcon className='h-3 w-3 transition-transform duration-300 group-hover:rotate-180' />
            </button> */}

            {/* Info Flyout */}
            <div className='absolute left-0 mt-2 w-80 z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out'>
              <div className='bg-white/95 backdrop-blur-lg shadow-xl rounded-xl border border-gray-200/60 p-4 overflow-hidden'>
                <h3 className='font-semibold text-gray-900 mb-3'>
                  {college.name}
                </h3>

                <div className='grid grid-cols-3 gap-4 mb-4'>
                  <div className='text-center'>
                    <UserGroupIcon className='h-6 w-6 mx-auto mb-1 text-[var(--college-primary)]' />
                    <div className='text-sm font-medium text-gray-900'>
                      {college.stats.students}
                    </div>
                    <div className='text-xs text-gray-600'>Students</div>
                  </div>
                  <div className='text-center'>
                    <AcademicCapIcon className='h-6 w-6 mx-auto mb-1 text-[var(--college-primary)]' />
                    <div className='text-sm font-medium text-gray-900'>
                      {college.stats.programs}
                    </div>
                    <div className='text-xs text-gray-600'>Programs</div>
                  </div>
                  <div className='text-center'>
                    <UserGroupIcon className='h-6 w-6 mx-auto mb-1 text-[var(--college-primary)]' />
                    <div className='text-sm font-medium text-gray-900'>
                      {college.stats.faculty}
                    </div>
                    <div className='text-xs text-gray-600'>Faculty</div>
                  </div>
                </div>

                <div className='space-y-2 pt-3 border-t border-gray-100'>
                  {quickActions.map((action) => (
                    <a
                      key={action.name}
                      href={action.href}
                      className={classNames(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-50',
                        action.color
                      )}
                    >
                      <action.icon className='h-4 w-4' />
                      {action.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Navigation Links */}
        <div className='hidden lg:flex gap-1'>
          {navLinks.map((link) => {
            const to = link.to(collegeKey);
            const isActive = location.pathname === to;
            return (
              <Link
                key={link.label}
                to={to}
                className={classNames(
                  ' px-5 py-3 text-sm transition-ease-in-out duration-300  flex items-center gap-2.5 group relative hover:scale-[1.02] active:scale-[0.98] will-change-transform',
                  isActive
                    ? isCollegeHomepage && scrollPosition <= 20
                      ? 'text-gray-50 scale-[1.02] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                      : 'text-[var(--college-primary)] scale-[1.02]'
                    : isCollegeHomepage
                      ? scrollPosition > 20
                        ? 'text-gray-900 hover:text-[var(--college-primary)]'
                        : 'text-gray-50 hover:text-gray-50/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                      : 'text-gray-900 hover:text-[var(--college-primary)]'
                )}
                aria-current={isActive ? 'page' : undefined}
                title={link.tooltip}
              >
                <link.icon className='h-4 w-4 group-hover:scale-110 transition-transform duration-200' />
                {link.label}
                {/* Active/Hover underline - adaptive colors matching main nav exactly */}
                {isActive ? (
                  <div
                    className={classNames(
                      'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 transition-all duration-300 ease-out',
                      isCollegeHomepage && scrollPosition <= 20
                        ? 'bg-white/90'
                        : 'bg-[var(--college-primary)]'
                    )}
                  />
                ) : (
                  <div
                    className={classNames(
                      'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-4/5 transition-all duration-300 ease-out will-change-transform',
                      isCollegeHomepage && scrollPosition <= 20
                        ? 'bg-white/90'
                        : 'bg-[var(--college-primary)]'
                    )}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side - Quick Actions & Mobile Menu */}
        <div className='flex items-center gap-x-1 justify-end'>
          {/* Desktop Quick Actions */}
          <div className='hidden lg:flex gap-x-1'>
            {quickActions.slice(0, 2).map((action) => (
              <a
                key={action.name}
                href={action.href}
                className={classNames(
                  'p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group relative hover:text-[var(--college-primary)] will-change-transform',
                  isCollegeHomepage
                    ? scrollPosition > 20
                      ? 'text-gray-700'
                      : 'text-gray-50/90 hover:text-gray-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                    : 'text-gray-700'
                )}
                title={action.name}
              >
                <action.icon className='h-5 w-5 group-hover:scale-110 transition-transform duration-300' />
                {/* Subtle hover indicator - adaptive colors */}
                <div
                  className={classNames(
                    'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-3/4 transition-all duration-300 ease-out will-change-transform',
                    isCollegeHomepage && scrollPosition <= 20
                      ? 'bg-white/90'
                      : 'bg-[var(--college-primary)]'
                  )}
                />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className='flex lg:hidden'>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(true)}
              className={classNames(
                'inline-flex items-center justify-center rounded-md p-2 hover:text-[var(--college-primary)] transition-all duration-300',
                isCollegeHomepage
                  ? scrollPosition > 20
                    ? 'text-gray-700'
                    : 'text-gray-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'
                  : 'text-gray-700'
              )}
              aria-label='Open main menu'
            >
              <Bars3Icon aria-hidden='true' className='h-6 w-6' />
            </button>
          </div>
        </div>
      </nav>
      {/* Enhanced Mobile Drawer - Matching Main Nav */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className='lg:hidden'
      >
        <div className='fixed inset-0 z-40 bg-black/30' aria-hidden='true' />
        <DialogPanel className='fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white/90 p-6 overflow-y-auto shadow-xl'>
          <div className='flex items-center justify-between mb-6'>
            <Link
              to={`/colleges/${collegeKey}`}
              className='flex items-center gap-2'
              onClick={() => setMobileMenuOpen(false)}
            >
              <img
                alt={`${college.name} Logo`}
                src={college.logo}
                className='h-10 w-10 rounded-full object-contain'
              />
              <span className='font-bold text-base tracking-tight text-primary-900'>
                {college.shortName}
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
            {/* Navigation Links */}
            {navLinks.map((link) => {
              const to = link.to(collegeKey);
              const isActive = location.pathname === to;
              return (
                <Link
                  key={link.label}
                  to={to}
                  className={classNames(
                    'flex items-center gap-3 px-3 py-3 rounded-lg font-semibold transition-colors',
                    isActive
                      ? 'text-[var(--college-primary)] bg-[var(--college-primary)]/10'
                      : 'text-gray-900 hover:text-[var(--college-primary)] hover:bg-gray-50'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className='h-5 w-5' />
                  {link.label}
                </Link>
              );
            })}

            {/* Back to All Colleges */}
            <div className='mt-4 pt-4 border-t border-gray-200'>
              <Link
                to='/colleges'
                className='flex items-center gap-3 px-3 py-3 rounded-lg text-gray-900 hover:text-[var(--college-primary)] hover:bg-gray-50 font-semibold transition-colors'
                onClick={() => setMobileMenuOpen(false)}
              >
                <ArrowLeftIcon className='h-5 w-5' />
                All Colleges
              </Link>
            </div>

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
                    className={classNames(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-50',
                      action.color
                    )}
                  >
                    <action.icon className='h-5 w-5' />
                    {action.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
