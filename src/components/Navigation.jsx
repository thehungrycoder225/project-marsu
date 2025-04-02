import './navigation.css';
import { Popover, PopoverButton, PopoverPanel} from '@headlessui/react'
import { useScrollPosition } from '../hooks/hooks';
import { Link } from 'react-router-dom'

const Navigation = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
 
  const scrollPosition = useScrollPosition()
  return (

    <>
    <Popover className={classNames(
        scrollPosition > 0 ? 'shadow bg-transparent' : 'shadow-none',
        'sticky top-0 z-20  bg-primary-900 transition-shadow',
      )}>
        <div className="flex justify-between items-center px-4 py-2 text-white">
        <Link to="/" className="text-lg font-bold text-decoration-none">My Website</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-400 text-decoration-none">Home</Link>
          <Link to="/about" className="hover:text-gray-400 text-decoration-none">About</Link>
          <Link to="/contact" className="hover:text-gray-400 text-decoration-none">Contact</Link>
        </div>
      </div>
      </Popover>
      
    </>
  );
};

export default Navigation;
