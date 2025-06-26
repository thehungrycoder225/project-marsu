import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import {
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  BeakerIcon,
  BuildingLibraryIcon,
  UsersIcon,
  GlobeAltIcon,
  TrophyIcon,
  HandRaisedIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';
import { icons } from 'storybook/internal/components';

const statIcons = {
  totalStudents: <UserGroupIcon className='w-10 h-10 text-rose-700' />,
  totalFaculty: <AcademicCapIcon className='w-10 h-10 text-amber-500' />,
  totalPrograms: <BookOpenIcon className='w-10 h-10 text-blue-600' />,
  totalResearchProjects: <BeakerIcon className='w-10 h-10 text-green-600' />,
  totalCampuses: <BuildingLibraryIcon className='w-10 h-10 text-purple-600' />,
  totalAlumni: <UsersIcon className='w-10 h-10 text-pink-600' />,
  totalInternationalStudents: (
    <GlobeAltIcon className='w-10 h-10 text-cyan-600' />
  ),
  totalScholarships: <TrophyIcon className='w-10 h-10 text-yellow-500' />,
  totalCommunityOutreach: (
    <HandRaisedIcon className='w-10 h-10 text-lime-600' />
  ),
  totalPublications: <DocumentTextIcon className='w-10 h-10 text-slate-600' />,
};

const statLabels = {
  totalStudents: 'Students',
  totalFaculty: 'Faculty',
  totalPrograms: 'Programs',
  totalResearchProjects: 'Research Projects',
  totalCampuses: 'Campuses',
  totalAlumni: 'Alumni',
  totalInternationalStudents: 'International Students',
  totalScholarships: 'Scholarships',
  totalCommunityOutreach: 'Community Outreach',
  totalPublications: 'Publications',
};

const defaultStats = [
  {
    id: 1,
    description: 'Home to over 10,000 Students',
    count: 10000,
  },
  {
    id: 2,
    description: 'Over 32 years of Academic Excellence',
    count: 32,
  },
  {
    id: 3,
    description: 'ISO 9001:2015 Certified',
    imageUrl: '/images/iso-9001.png', // Example image URL
  },
  {
    id: 4,
    description: 'Over 3 campuses across Marinduque',
    count: 3,
  },
  {
    id: 5,
    description: 'Philippine Quality Awardee',
    imageUrl: '/images/philippine-quality-award.png',
  },
  {
    id: 6,
    description: 'Rank 1500+ in QS World University Rankings',
    count: 1500,
  },
];

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let increment = end / 40;
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count.toLocaleString()}</span>;
}

// Modern StatCard supporting count, image badge, description, accent, and tooltip
function StatCard({ count, description, imageUrl, accent }) {
  return (
    <div
      className={`group bg-white rounded-md shadow-sm flex flex-col items-center justify-center text-center px-4 py-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus-within:shadow-lg focus-within:-translate-y-1 outline-none cursor-default min-h-[140px] relative 
      }`}
      tabIndex={0}
      aria-label={description}
    >
      {imageUrl ? (
        <span className='flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 mb-2 border border-slate-200 dark:border-slate-700'>
          <img src={imageUrl} alt='' className='w-8 h-8 object-contain' />
        </span>
      ) : count !== undefined ? (
        <span className='text-lg font-semibold text-slate-900 mt-1'>
          <AnimatedCounter value={count} />
        </span>
      ) : null}
      <span
        className='text-xs font-medium text-slate-600 dark:text-slate-600 mt-2 tracking-wide'
        title={description}
      >
        {description}
      </span>
      {/* Tooltip on hover/focus */}
      <span className='absolute left-1/2 -translate-x-1/2 bottom-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none bg-slate-800 text-white text-xs rounded px-2 py-1 transition-opacity z-10 whitespace-nowrap'>
        {description}
      </span>
    </div>
  );
}

const UniversityStats = ({ stats }) => {
  const statArray = stats && Array.isArray(stats) ? stats : defaultStats;

  return (
    <>
      <div className='p-5 shadow-sm bg-gradient-to-t from-bg-amber-50 to bg-amber-100/20 w-full max-w-7xl rounded-2xl mx-auto my-4'>
        <section className='w-full max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 py-6 px-2 animate-fade-in'>
          <div className='flex-1 min-w-[220px]'>
            <h2 className='text-2xl md:text-3xl font-extrabold text-[var(--color-primary)] mb-1 flex items-center gap-2'>
              MarSU: Your Gateway to Excellence
              {/* Optionally add logo here: <img src="/logo.png" alt="MSU Logo" className="w-7 h-7 inline-block align-middle" /> */}
            </h2>
            <div className='text-sm md:text-base text-[var(--color-secondary-900)] font-semibold mb-1 tracking-wide'>
              Excellence, Innovation, Impact
            </div>
          </div>
          <div className='flex-1 min-w-[220px] md:text-left text-slate-700 text-sm md:text-base'>
            Discover Marinduque State University, a premier institution
            dedicated to academic excellence, innovation, and community impact.
            With a rich history and a commitment to quality education, we
            empower students to shape the future.
            {/* <div className='mt-3'>
              <a
                href='/about'
                className='inline-block px-4 py-2 rounded bg-rose-600 text-white font-semibold text-xs md:text-sm shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition'
              >
                Learn More About MSU
              </a>
            </div> */}
          </div>
        </section>
        <section className='university-stats w-full max-w-5xl mx-auto py-6 px-2'>
          <div className='hidden md:grid grid-cols-2 lg:grid-cols-6 gap-6'>
            {statArray.map((stat, idx) => (
              <StatCard
                key={stat.id || idx}
                count={stat.count}
                description={stat.description}
                imageUrl={stat.imageUrl}
                accent={!!stat.imageUrl}
              />
            ))}
          </div>
          <div className='md:hidden'>
            <div className='flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700'>
              {statArray.map((stat, idx) => (
                <div
                  className='min-w-[140px] flex-shrink-0'
                  key={stat.id || idx}
                >
                  <StatCard
                    count={stat.count}
                    description={stat.description}
                    imageUrl={stat.imageUrl}
                    accent={!!stat.imageUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UniversityStats;
