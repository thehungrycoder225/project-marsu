import './navigation.css';
import {
  Popover,
  PopoverGroup,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { useScrollPosition } from '../hooks/hooks';
import { Link } from 'react-router-dom';

const Navigation = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  // navigation items
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    // Colleges with dropdown items
    {
      name: 'Colleges',
      href: '/colleges',
      children: [
        { name: 'College of Arts and Sciences', href: '/colleges/cass' },
        { name: 'College of Business and Management', href: '/colleges/cbm' },
        { name: 'College of Engineering', href: '/colleges/ceng' },
        { name: 'College of Industrial Technology', href: '/colleges/cit' },
        { name: 'College of Education', href: '/colleges/ce' },
        { name: 'College of Hospitality Management', href: '/colleges/chm' },
        {
          name: 'College of Criminal Justice Education',
          href: '/colleges/ccje',
        },
        { name: 'College of Law', href: '/colleges/cl' },
        { name: 'Graduate School', href: '/colleges/gs' },
        { name: 'College of Agriculture', href: '/colleges/ca' },
        { name: 'College of Fisheries', href: '/colleges/cfas' },
        {
          name: 'College of Information and Computing Sciences',
          href: '/colleges/cics',
        },
      ],
    },
  ];

  const scrollPosition = useScrollPosition();
  return (
    <>
      <Popover
        className={classNames(
          scrollPosition > 0
            ? 'shadow py-4 ease-in-out transition-all hover:shadow-lg'
            : 'shadow-none',
          'sticky top-0 z-20 bg-primary-900 transition-shadow duration-300'
        )}
      >
        {/* Main Responsive Navigation with Logo Using Tailwind Glassmorphism */}
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
              {/* Mobile menu button*/}
            </div>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='hidden sm:block sm:ml-6'>
                <div className='flex space-x-4'>
                  {navigation.map((item) => (
                    <PopoverGroup key={item.name}>
                      <PopoverButton
                        as={Link}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-primary-700 text-white'
                            : 'text-gray-300 hover:bg-primary-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </PopoverButton>
                      {item.children && (
                        <PopoverPanel className='absolute z-10 mt-2 w-screen max-w-xs rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.href}
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                              {child.name}
                            </Link>
                          ))}
                        </PopoverPanel>
                      )}
                    </PopoverGroup>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default Navigation;
