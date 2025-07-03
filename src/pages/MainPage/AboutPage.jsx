import Nav from '../../components/Navigation';
import Footer from '../../components/Footer';
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Parallax } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';

// Import Heroicons
import {
  ClockIcon,
  EyeIcon,
  FlagIcon,
  HeartIcon,
  StarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  TrophyIcon,
  PhoneIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

// Icon mapping for tabs using Heroicons
const getTabIcon = (iconType, className = 'w-5 h-5') => {
  const iconMap = {
    history: ClockIcon,
    vision: EyeIcon,
    goals: FlagIcon,
    values: HeartIcon,
    quality: StarIcon,
    mandates: DocumentTextIcon,
    councils: UserGroupIcon,
    milestones: TrophyIcon,
    contact: PhoneIcon,
  };

  const IconComponent = iconMap[iconType] || ClockIcon;
  return <IconComponent className={className} />;
};

const TABS = [
  {
    id: 'history',
    label: 'History',
    icon: 'history',
    description: "Learn about our university's rich heritage and founding",
    group: 'about',
    keywords: ['history', 'founding', 'heritage', 'past', 'establishment'],
  },
  {
    id: 'vision-mission',
    label: 'Vision-Mission',
    icon: 'vision',
    description: 'Our guiding principles and future aspirations',
    group: 'about',
    keywords: ['vision', 'mission', 'goals', 'future', 'purpose'],
  },
  {
    id: 'goals',
    label: 'Goals & Objectives',
    icon: 'goals',
    description: 'Strategic objectives and institutional targets',
    group: 'strategy',
    keywords: ['goals', 'objectives', 'targets', 'strategy', 'plans'],
  },
  {
    id: 'core-values',
    label: 'Core Values',
    icon: 'values',
    description: 'Fundamental values that guide our institution',
    group: 'about',
    keywords: ['values', 'principles', 'ethics', 'integrity', 'excellence'],
  },
  {
    id: 'quality-policy',
    label: 'Quality Policy',
    icon: 'quality',
    description: 'Our commitment to excellence and quality assurance',
    group: 'policy',
    keywords: ['quality', 'policy', 'standards', 'assurance', 'excellence'],
  },
  {
    id: 'mandates',
    label: 'Mandates & Charter',
    icon: 'mandates',
    description: 'Official mandates and institutional charter',
    group: 'policy',
    keywords: ['mandates', 'charter', 'official', 'legal', 'authority'],
  },
  {
    id: 'councils',
    label: 'University Councils',
    icon: 'councils',
    description: 'Governing bodies and administrative councils',
    group: 'governance',
    keywords: ['councils', 'governance', 'administration', 'leadership'],
  },
  {
    id: 'milestones',
    label: 'Milestones',
    icon: 'milestones',
    description: 'Key achievements and important milestones',
    group: 'achievements',
    keywords: ['milestones', 'achievements', 'awards', 'recognition'],
  },
  {
    id: 'contact',
    label: 'Contact Us',
    icon: 'contact',
    description: 'Get in touch with our university offices',
    group: 'contact',
    keywords: ['contact', 'address', 'phone', 'email', 'location'],
  },
];

// Tab groups for responsive organization
const TAB_GROUPS = {
  about: { label: 'About Us', color: 'blue' },
  strategy: { label: 'Strategy', color: 'green' },
  policy: { label: 'Policies', color: 'purple' },
  governance: { label: 'Governance', color: 'indigo' },
  achievements: { label: 'Achievements', color: 'yellow' },
  contact: { label: 'Contact', color: 'gray' },
};

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className='animate-pulse space-y-4'>
    <div className='h-8 bg-gray-200 rounded w-3/4'></div>
    <div className='space-y-2'>
      <div className='h-4 bg-gray-200 rounded'></div>
      <div className='h-4 bg-gray-200 rounded w-5/6'></div>
      <div className='h-4 bg-gray-200 rounded w-4/6'></div>
    </div>
    <div className='space-y-2'>
      <div className='h-4 bg-gray-200 rounded w-3/4'></div>
      <div className='h-4 bg-gray-200 rounded w-full'></div>
      <div className='h-4 bg-gray-200 rounded w-2/3'></div>
    </div>
  </div>
);

// Search Component
const SearchBox = ({ onSearch, searchTerm }) => (
  <div className='relative mb-4'>
    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
      <svg
        className='h-4 w-4 text-gray-400'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
    </div>
    <input
      type='text'
      placeholder='Search sections...'
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      className='w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent'
    />
  </div>
);

// Recent Tabs Component
const RecentTabs = ({ recentTabs, onTabSelect }) => {
  if (recentTabs.length === 0) return null;

  return (
    <div className='mb-4 px-4'>
      <div className='text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider'>
        Recently Viewed
      </div>
      <div className='flex flex-wrap gap-1'>
        {recentTabs.slice(0, 3).map((tabId) => {
          const tab = TABS.find((t) => t.id === tabId);
          if (!tab) return null;
          return (
            <button
              key={tabId}
              onClick={() => onTabSelect(tabId)}
              className='text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors duration-150 flex items-center space-x-1'
            >
              {getTabIcon(tab.icon, 'w-3 h-3')}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Tab Preview Tooltip
const TabPreview = ({ tab, isVisible }) => (
  <div
    className={`absolute z-50 mt-2 p-2 text-center  text-gray-500 text-xs max-w-xs transition-opacity duration-200 ${
      isVisible ? 'opacity-0' : 'opacity-0 pointer-events-none'
    }`}
  >
    <div className='flex items-center mb-1'>
      {/* <div className='mr-2 text-white'>{getTabIcon(tab.icon, 'w-4 h-4')}</div> */}
      <span className='font-medium'>{tab.label}</span>
    </div>
    {/* <p className='text-xs text-gray-300'>{tab.description}</p> */}
  </div>
);

// Breadcrumb Component
const Breadcrumb = ({ activeTab, onNavigate }) => {
  const activeTabData = TABS.find((tab) => tab.id === activeTab);
  const groupData = TAB_GROUPS[activeTabData?.group];

  return (
    <nav className='flex items-center space-x-2 text-sm text-gray-600 mb-4'>
      <button
        onClick={() => onNavigate(TABS[0].id)}
        className='hover:text-[var(--primary-700)] transition-colors'
      >
        About
      </button>
      <span className='text-gray-400'>/</span>
      {/* {groupData && (
        <>
          <span className='text-gray-500'>{groupData.label}</span>
          <span className='text-gray-400'>/</span>
        </>
      )} */}
      <span className='text-[var(--primary-700)] font-medium'>
        {activeTabData?.label}
      </span>
    </nav>
  );
};

function AboutPage() {
  // Enhanced state management
  const [activeTab, setActiveTab] = useState(() => {
    // Only use localStorage for tab persistence, ignore URL hash to prevent navigation issues
    const savedTab = localStorage.getItem('aboutPage-activeTab');
    return savedTab && TABS.some((tab) => tab.id === savedTab)
      ? savedTab
      : TABS[0].id;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [recentTabs, setRecentTabs] = useState(() => {
    const saved = localStorage.getItem('aboutPage-recentTabs');
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('aboutPage-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Data fetching state
  const [aboutData, setAboutData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  // Filtered tabs based on search
  const filteredTabs = useMemo(() => {
    if (!searchTerm) return TABS;
    const lowercaseSearch = searchTerm.toLowerCase();
    return TABS.filter(
      (tab) =>
        tab.label.toLowerCase().includes(lowercaseSearch) ||
        tab.description.toLowerCase().includes(lowercaseSearch) ||
        tab.keywords.some((keyword) =>
          keyword.toLowerCase().includes(lowercaseSearch)
        )
    );
  }, [searchTerm]);

  // Enhanced tab switching with loading state
  const handleTabChange = useCallback(
    (tabId) => {
      if (tabId === activeTab) return;

      setIsLoading(true);

      // Simulate content loading (remove this in production if content is static)
      setTimeout(() => {
        setActiveTab(tabId);
        setIsLoading(false);

        // Update localStorage
        localStorage.setItem('aboutPage-activeTab', tabId);

        // Update recent tabs
        setRecentTabs((prev) => {
          const newRecent = [tabId, ...prev.filter((id) => id !== tabId)].slice(
            0,
            5
          );
          localStorage.setItem(
            'aboutPage-recentTabs',
            JSON.stringify(newRecent)
          );
          return newRecent;
        });

        // Always set hash to 'about' to prevent navigation issues with specific tabs
        const url = new URL(window.location);
        url.hash = 'about';
        // Remove any tab query parameters to prevent issues when navigating to other pages
        url.searchParams.delete('tab');
        window.history.replaceState(null, '', url.toString());

        // Scroll to top of content area instead of searching for elements
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 150); // Short delay for smooth UX
    },
    [activeTab]
  );

  // Toggle favorites
  const toggleFavorite = useCallback((tabId) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(tabId)
        ? prev.filter((id) => id !== tabId)
        : [...prev, tabId];
      localStorage.setItem('aboutPage-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  // Data fetching functions
  const fetchAboutData = useCallback(async (forceRefresh = false) => {
    try {
      setDataLoading(true);
      setDataError(null);

      // Check cache first (unless forcing refresh)
      if (!forceRefresh) {
        const cachedData = localStorage.getItem('aboutPage-data');
        const cachedTimestamp = localStorage.getItem(
          'aboutPage-data-timestamp'
        );

        if (cachedData && cachedTimestamp) {
          const cacheAge = Date.now() - parseInt(cachedTimestamp);
          const cacheValidityPeriod = 24 * 60 * 60 * 1000; // 24 hours

          if (cacheAge < cacheValidityPeriod) {
            setAboutData(JSON.parse(cachedData));
            setLastFetched(new Date(parseInt(cachedTimestamp)));
            setDataLoading(false);
            return;
          }
        }
      }

      // Fetch fresh data
      const response = await fetch('/data/marsu-resources/Resources.json');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const aboutSection = data.about || {};

      // Cache the data
      localStorage.setItem('aboutPage-data', JSON.stringify(aboutSection));
      localStorage.setItem('aboutPage-data-timestamp', Date.now().toString());

      setAboutData(aboutSection);
      setLastFetched(new Date());
    } catch (error) {
      console.error('Failed to fetch about data:', error);
      setDataError(error.message);

      // Try to use cached data as fallback
      const cachedData = localStorage.getItem('aboutPage-data');
      if (cachedData) {
        setAboutData(JSON.parse(cachedData));
        const cachedTimestamp = localStorage.getItem(
          'aboutPage-data-timestamp'
        );
        if (cachedTimestamp) {
          setLastFetched(new Date(parseInt(cachedTimestamp)));
        }
      }
    } finally {
      setDataLoading(false);
    }
  }, []);

  // Refresh data manually
  const handleRefreshData = useCallback(() => {
    fetchAboutData(true);
  }, [fetchAboutData]);

  // Helper function to get data from JSON structure
  const getTabDataFromJson = useCallback(
    (tabId) => {
      if (!aboutData || !Array.isArray(aboutData)) return null;

      // Map tab IDs to JSON structure keys
      const tabMapping = {
        history: 'history',
        'vision-mission': 'MissionAndVision',
        goals: 'GoalsAndObjectives',
        'core-values': 'CoreValues',
        'quality-policy': 'QualityPolicy',
        mandates: 'Mandates',
        councils: 'Councils',
        milestones: 'Milestones',
        contact: 'Contact',
      };

      const jsonKey = tabMapping[tabId];
      if (!jsonKey) return null;

      // Find the item with the matching key
      const item = aboutData.find((item) => item[jsonKey]);
      return item ? item[jsonKey] : null;
    },
    [aboutData]
  );

  // Helper function to parse history timeline
  const parseHistoryTimeline = useCallback((historyText) => {
    if (!historyText) return [];

    const eras = [
      {
        id: 'foundation',
        title: 'Foundation Era',
        period: '1952-1975',
        color: 'primary',
        icon: WrenchScrewdriverIcon,
        description: 'The beginning of our educational journey',
      },
      {
        id: 'expansion',
        title: 'Expansion Era',
        period: '1975-1990',
        color: 'secondary',
        icon: ChartBarIcon,
        description: 'Growth and diversification of programs',
      },
      {
        id: 'college',
        title: 'College Era',
        period: '1990-2019',
        color: 'info',
        icon: AcademicCapIcon,
        description: 'Development as a state college',
      },
      {
        id: 'university',
        title: 'University Era',
        period: '2019-Present',
        color: 'success',
        icon: BuildingLibraryIcon,
        description: 'Achievement of university status',
      },
    ];

    // Extract key events with dates
    const keyEvents = [
      {
        year: '1952',
        title: 'Marinduque School of Arts and Trades (MSAT) Established',
        era: 'foundation',
      },
      { year: '1975', title: 'Bachelor Programs Introduced', era: 'expansion' },
      {
        year: '1983',
        title:
          'Converted to Marinduque Institute of Science and Technology (MIST)',
        era: 'expansion',
      },
      {
        year: '1990',
        title: 'Became Marinduque State College',
        era: 'college',
      },
      {
        year: '1992',
        title: 'Multi-Campus System Established',
        era: 'college',
      },
      {
        year: '2019',
        title: 'Republic Act No. 11334 Signed',
        era: 'university',
      },
      {
        year: '2024',
        title: 'Officially Became Marinduque State University',
        era: 'university',
      },
    ];

    return { eras, keyEvents };
  }, []);

  // Helper function to render content with fallback
  const renderTabContent = useCallback(
    (tabId) => {
      const tabInfo = TABS.find((tab) => tab.id === tabId);
      if (!tabInfo) return null;

      // Get data from JSON or use fallback
      const jsonData = getTabDataFromJson(tabId);
      const hasJsonData = jsonData && Object.keys(jsonData).length > 0;

      return (
        <section id={tabId}>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-2xl font-bold text-[var(--primary-700)]'>
              {tabInfo.label}
            </h2>
            {dataError && (
              <div className='flex items-center text-amber-600 text-sm'>
                <svg
                  className='w-4 h-4 mr-1'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.98-.833-2.75 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
                Using cached data
              </div>
            )}
          </div>

          {hasJsonData ? (
            <div className='space-y-6'>
              {/* History Section */}
              {tabId === 'history' && jsonData.description && (
                <div className='space-y-8'>
                  {/* Description Header */}
                  <div className='text-center'>
                    <div className='bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/20 border border-[var(--color-primary)]/30 rounded-lg p-6'>
                      <p className='text-[var(--color-primary)] font-medium text-lg'>
                        {jsonData.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className='bg-white rounded-lg border border-gray-200 p-6'>
                    <h3 className='text-xl font-bold text-gray-800 mb-6 text-center'>
                      Our Transformation Journey
                    </h3>
                    <div className='flex items-center justify-between mb-8'>
                      {[
                        { name: 'MSAT', year: '1952', color: 'primary' },
                        { name: 'MIST', year: '1983', color: 'secondary' },
                        { name: 'MSC', year: '1990', color: 'info' },
                        { name: 'MarSU', year: '2024', color: 'success' },
                      ].map((stage, index) => (
                        <div
                          key={stage.name}
                          className='flex flex-col items-center flex-1'
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm 
                            ${
                              stage.color === 'primary'
                                ? 'bg-[var(--color-primary)]'
                                : stage.color === 'secondary'
                                  ? 'bg-[var(--color-secondary)] text-black'
                                  : stage.color === 'info'
                                    ? 'bg-[var(--color-info)]'
                                    : 'bg-[var(--color-success)]'
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className='mt-2 text-center'>
                            <div className='font-bold text-gray-800 text-sm'>
                              {stage.name}
                            </div>
                            <div className='text-xs text-gray-600'>
                              {stage.year}
                            </div>
                          </div>
                          {index < 3 && (
                            <div
                              className='hidden md:block absolute h-1 bg-gray-300 top-6 left-1/2 transform -translate-y-1/2'
                              style={{
                                width: 'calc(25% - 24px)',
                                marginLeft: '24px',
                              }}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Parallax Timeline using Swiper */}
                  <div className='bg-gradient-to-br from-[var(--color-bg-light)] to-gray-100 rounded-xl border border-gray-200 p-8 overflow-hidden relative'>
                    {/* Background decorative elements */}
                    <div className='absolute inset-0 opacity-5'>
                      <div className='absolute top-0 left-0 w-32 h-32 bg-[var(--color-primary)] rounded-full blur-3xl'></div>
                      <div className='absolute bottom-0 right-0 w-24 h-24 bg-[var(--color-secondary)] rounded-full blur-2xl'></div>
                    </div>

                    <div className='relative z-10'>
                      <h3 className='text-2xl font-bold text-gray-800 mb-2 text-center'>
                        Journey Through Time
                      </h3>
                      <p className='text-gray-600 text-center mb-8'>
                        Explore the evolution of our institution through
                        immersive storytelling
                      </p>

                      <Swiper
                        modules={[Navigation, Pagination, Autoplay, Parallax]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{
                          nextEl: '.swiper-button-next-custom',
                          prevEl: '.swiper-button-prev-custom',
                        }}
                        pagination={{
                          clickable: true,
                          el: '.swiper-pagination-custom',
                          renderBullet: function (index, className) {
                            return (
                              '<span class="' +
                              className +
                              ' !bg-[var(--color-primary)] !w-3 !h-3 !mx-1"></span>'
                            );
                          },
                        }}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        parallax={true}
                        speed={800}
                        breakpoints={{
                          768: { slidesPerView: 1.2, spaceBetween: 30 },
                          1024: { slidesPerView: 1.5, spaceBetween: 40 },
                        }}
                        className='history-parallax-swiper !pb-12'
                      >
                        {parseHistoryTimeline(jsonData.events).eras.map(
                          (era, index) => (
                            <SwiperSlide key={era.id}>
                              <div className='relative h-96 rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white'>
                                {/* Parallax Background */}
                                <div
                                  className={`absolute inset-0 transition-all duration-700
                                ${
                                  era.color === 'primary'
                                    ? 'bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-500)] to-[var(--color-primary-600)]'
                                    : era.color === 'secondary'
                                      ? 'bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-secondary-500)] to-[var(--color-secondary-900)]'
                                      : era.color === 'info'
                                        ? 'bg-gradient-to-br from-[var(--color-info)] via-blue-600 to-blue-700'
                                        : 'bg-gradient-to-br from-[var(--color-success)] via-green-600 to-green-700'
                                }`}
                                  data-swiper-parallax='-200'
                                >
                                  {/* Decorative Pattern */}
                                  <div className='absolute inset-0 opacity-10'>
                                    <div className='absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-xl'></div>
                                    <div className='absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-lg'></div>
                                    <div className='absolute top-1/2 left-1/2 w-40 h-40 bg-white rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2'></div>
                                  </div>
                                </div>

                                {/* Content Container */}
                                <div className='relative z-10 h-full flex flex-col p-8 text-white'>
                                  {/* Era Icon and Title */}
                                  <div
                                    className='text-center mb-6'
                                    data-swiper-parallax='-100'
                                  >
                                    <div
                                      className='text-white mb-4 filter drop-shadow-lg flex justify-center'
                                      data-swiper-parallax='-50'
                                    >
                                      <era.icon
                                        className={`w-16 h-16 ${era.color === 'secondary' ? 'text-[var(--color-text-dark)]' : 'text-white'}`}
                                      />
                                    </div>
                                    <h4
                                      className={`text-3xl font-bold mb-2 drop-shadow-md ${era.color === 'secondary' ? 'text-[var(--color-text-dark)]' : 'text-white'}`}
                                    >
                                      {era.title}
                                    </h4>
                                    <div
                                      className={`inline-block backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border ${era.color === 'secondary' ? 'bg-black/20 border-black/30 text-[var(--color-text-dark)]' : 'bg-white/20 border-white/30 text-white'}`}
                                    >
                                      {era.period}
                                    </div>
                                  </div>

                                  {/* Era Description */}
                                  <div
                                    className='flex-1 flex flex-col justify-center'
                                    data-swiper-parallax='-150'
                                  >
                                    <p
                                      className={`text-center text-lg font-medium leading-relaxed mb-6 drop-shadow-sm max-w-md mx-auto ${era.color === 'secondary' ? 'text-[var(--color-text-dark)]' : 'text-white'}`}
                                    >
                                      {era.description}
                                    </p>

                                    {/* Key Achievements for this Era */}
                                    <div className='space-y-3 max-w-sm mx-auto'>
                                      {parseHistoryTimeline(jsonData.events)
                                        .keyEvents.filter(
                                          (event) => event.era === era.id
                                        )
                                        .slice(0, 3) // Show only top 3 events for clean design
                                        .map((event, eventIndex) => (
                                          <div
                                            key={eventIndex}
                                            className={`flex items-center space-x-3 backdrop-blur-sm rounded-lg px-4 py-2 border ${era.color === 'secondary' ? 'bg-black/10 border-black/20' : 'bg-white/10 border-white/20'}`}
                                            data-swiper-parallax={`-${50 + eventIndex * 25}`}
                                          >
                                            <div
                                              className={`w-2 h-2 rounded-full flex-shrink-0 ${era.color === 'secondary' ? 'bg-[var(--color-text-dark)]' : 'bg-white'}`}
                                            ></div>
                                            <div>
                                              <div
                                                className={`font-bold text-sm ${era.color === 'secondary' ? 'text-[var(--color-text-dark)]' : 'text-white'}`}
                                              >
                                                {event.year}
                                              </div>
                                              <div
                                                className={`text-xs leading-tight ${era.color === 'secondary' ? 'text-[var(--color-text-dark)] opacity-80' : 'text-white opacity-90'}`}
                                              >
                                                {event.title}
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                    </div>
                                  </div>

                                  {/* Bottom Navigation Hint */}
                                  <div
                                    className='text-center mt-4'
                                    data-swiper-parallax='-75'
                                  >
                                    <div
                                      className={`inline-flex items-center space-x-2 text-xs opacity-75 ${era.color === 'secondary' ? 'text-[var(--color-text-dark)]' : 'text-white'}`}
                                    >
                                      <span>
                                        Slide {index + 1} of{' '}
                                        {
                                          parseHistoryTimeline(jsonData.events)
                                            .eras.length
                                        }
                                      </span>
                                      <svg
                                        className='w-4 h-4'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                      >
                                        <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth={2}
                                          d='M9 5l7 7-7 7'
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          )
                        )}

                        {/* Custom Navigation Buttons */}
                        <div className='swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 group'>
                          <svg
                            className='w-5 h-5 text-[var(--color-primary)] group-hover:text-[var(--color-primary-hover)] transform group-hover:scale-110 transition-all duration-300'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15 19l-7-7 7-7'
                            />
                          </svg>
                        </div>
                        <div className='swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 group'>
                          <svg
                            className='w-5 h-5 text-[var(--color-primary)] group-hover:text-[var(--color-primary-hover)] transform group-hover:scale-110 transition-all duration-300'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 5l7 7-7 7'
                            />
                          </svg>
                        </div>
                      </Swiper>

                      {/* Custom Pagination */}
                      <div className='swiper-pagination-custom mt-6 flex justify-center'></div>
                    </div>
                  </div>

                  {/* Detailed History Text */}
                  {jsonData.events && (
                    <div className='bg-[var(--color-bg-light)] rounded-lg p-6'>
                      <h3 className='text-xl font-bold text-[var(--color-primary)] mb-4'>
                        Complete Historical Account
                      </h3>
                      <div className='prose max-w-none'>
                        {jsonData.events.split('\n').map(
                          (paragraph, index) =>
                            paragraph.trim() && (
                              <p
                                key={index}
                                className='text-[var(--color-text)] leading-relaxed mb-4 text-justify'
                              >
                                {paragraph.trim()}
                              </p>
                            )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mission and Vision Section */}
              {tabId === 'vision-mission' && (
                <div className='space-y-8'>
                  {/* Header */}
                  <div className='text-center mb-8'>
                    <p className='text-[var(--color-text)] text-sm font-medium tracking-wide uppercase mb-2'>
                      Our Purpose
                    </p>
                    <h3 className='text-2xl font-bold text-[var(--color-primary)]'>
                      Vision & Mission
                    </h3>
                  </div>

                  {/* Vision and Mission Cards */}
                  <div className='grid md:grid-cols-2 gap-8'>
                    {jsonData.Vision && (
                      <div className='group'>
                        <div className='relative bg-white border border-gray-200 rounded-xl p-8 h-full transition-all duration-300 hover:shadow-lg hover:border-[var(--color-primary)]/30'>
                          {/* Icon */}
                          <div className='w-12 h-12 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300'>
                            <EyeIcon className='w-6 h-6 text-[var(--color-primary)]' />
                          </div>

                          {/* Title */}
                          <h4 className='text-xl font-bold text-[var(--color-primary)] mb-4'>
                            Vision
                          </h4>

                          {/* Content */}
                          <p className='text-[var(--color-text)] leading-relaxed text-base'>
                            {jsonData.Vision.description}
                          </p>

                          {/* Decorative element */}
                          <div className='absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent rounded-bl-full'></div>
                        </div>
                      </div>
                    )}

                    {jsonData.Mission && (
                      <div className='group'>
                        <div className='relative bg-white border border-gray-200 rounded-xl p-8 h-full transition-all duration-300 hover:shadow-lg hover:border-[var(--color-secondary)]/60'>
                          {/* Icon */}
                          <div className='w-12 h-12 bg-[var(--color-secondary)]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[var(--color-secondary)]/30 transition-colors duration-300'>
                            <FlagIcon className='w-6 h-6 text-[var(--color-secondary-900)]' />
                          </div>

                          {/* Title */}
                          <h4 className='text-xl font-bold text-[var(--color-secondary-900)] mb-4'>
                            Mission
                          </h4>

                          {/* Content */}
                          <p className='text-[var(--color-text)] leading-relaxed text-base'>
                            {jsonData.Mission.description}
                          </p>

                          {/* Decorative element */}
                          <div className='absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[var(--color-secondary)]/10 to-transparent rounded-bl-full'></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Optional: Simple divider or quote */}
                  <div className='text-center py-8'>
                    <div className='max-w-2xl mx-auto'>
                      <div className='h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent mb-6'></div>
                      <p className='text-[var(--color-text)] text-sm italic'>
                        &ldquo;Empowering minds, transforming communities, building the future&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Goals and Objectives Section */}
              {tabId === 'goals' && jsonData.goal && (
                <div className='space-y-6'>
                  <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                    Strategic Goals & Objectives
                  </h3>
                  <div className='grid gap-6'>
                    {jsonData.goal.map((goal, index) => (
                      <div
                        key={goal.id}
                        className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'
                      >
                        <div className='flex items-start space-x-4'>
                          <div className='flex-shrink-0 w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold'>
                            {index + 1}
                          </div>
                          <div className='flex-1 space-y-3'>
                            <h4 className='text-xl font-bold text-gray-800'>
                              {goal.title}
                            </h4>
                            <p className='text-gray-600 leading-relaxed'>
                              {goal.description}
                            </p>
                            {goal.objectives && (
                              <div className='space-y-2'>
                                <h5 className='font-semibold text-gray-700'>
                                  Key Objectives:
                                </h5>
                                <div className='pl-4 space-y-2'>
                                  {goal.objectives.split('\n').map(
                                    (objective, objIndex) =>
                                      objective.trim() && (
                                        <div
                                          key={objIndex}
                                          className='flex items-start space-x-2'
                                        >
                                          <span className='text-primary-500 text-sm mt-1'>
                                            •
                                          </span>
                                          <p className='text-gray-600 text-sm leading-relaxed'>
                                            {objective.trim()}
                                          </p>
                                        </div>
                                      )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Values Section */}
              {tabId === 'core-values' && (
                <div className='space-y-6'>
                  {jsonData.description && (
                    <div className='text-center'>
                      <p className='text-xl text-gray-700 leading-relaxed'>
                        {jsonData.description}
                      </p>
                    </div>
                  )}
                  {jsonData.values && (
                    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                      {jsonData.values.map((value, index) => (
                        <div
                          key={index}
                          className='bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow'
                        >
                          <div className='w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4'>
                            {value.letter}
                          </div>
                          <h4 className='font-bold text-primary-800 text-lg mb-2'>
                            {value.letter}
                          </h4>
                          <p className='text-primary-700 font-medium'>
                            {value.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quality Policy Section */}
              {tabId === 'quality-policy' && (
                <div className='space-y-6'>
                  {jsonData.description && (
                    <div className='bg-gray-50 border border-gray-200 rounded-lg p-6'>
                      <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                        Quality Policy Statement
                      </h3>
                      <div className='prose max-w-none'>
                        {jsonData.description.split('\n').map(
                          (paragraph, index) =>
                            paragraph.trim() && (
                              <p
                                key={index}
                                className='text-gray-700 leading-relaxed mb-3'
                              >
                                {paragraph.trim()}
                              </p>
                            )
                        )}
                      </div>
                    </div>
                  )}
                  {jsonData.fivePointAgenda && (
                    <div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
                      <h3 className='text-lg font-semibold text-blue-800 mb-4'>
                        Five-Point Agenda
                      </h3>
                      <div className='space-y-3'>
                        {jsonData.fivePointAgenda.split('\n').map(
                          (point, index) =>
                            point.trim() && (
                              <div
                                key={index}
                                className='flex items-start space-x-3'
                              >
                                <span className='flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold'>
                                  {point.match(/^\d+/)?.[0] || index + 1}
                                </span>
                                <p className='text-blue-700 leading-relaxed'>
                                  {point.replace(/^\d+\.\s*/, '')}
                                </p>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Generic fallback for other sections */}
              {![
                'history',
                'vision-mission',
                'goals',
                'core-values',
                'quality-policy',
              ].includes(tabId) && (
                <div className='space-y-4'>
                  {Object.entries(jsonData).map(([key, value]) => (
                    <div key={key}>
                      <h3 className='text-lg font-semibold text-gray-800 mb-2 capitalize'>
                        {key.replace(/[-_]/g, ' ')}
                      </h3>
                      {Array.isArray(value) ? (
                        <ul className='list-disc list-inside text-gray-600 space-y-1'>
                          {value.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className='text-gray-700 leading-relaxed'>{value}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className='bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6'>
              <div className='flex items-start space-x-3'>
                <div className='flex-shrink-0'>
                  <svg
                    className='w-6 h-6 text-blue-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-blue-800 mb-1'>
                    Content Coming Soon
                  </h3>
                  <p className='text-sm text-blue-600'>
                    {tabInfo.description} - This section is currently being
                    updated with fresh content. Check back soon for the latest
                    information.
                  </p>
                  <div className='mt-3 flex items-center space-x-2 text-xs text-blue-500'>
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span>We&apos;re working on it!</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Show last updated timestamp if available */}
          {lastFetched && hasJsonData && (
            <div className='mt-6 pt-4 border-t border-gray-200'>
              <p className='text-xs text-gray-500 flex items-center space-x-1'>
                <svg
                  className='w-3 h-3'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>
                  Last updated: {lastFetched.toLocaleDateString()} at{' '}
                  {lastFetched.toLocaleTimeString()}
                </span>
              </p>
            </div>
          )}
        </section>
      );
    },
    [dataError, lastFetched, getTabDataFromJson, parseHistoryTimeline]
  );

  // Set initial hash to 'about' when component mounts
  useEffect(() => {
    // Always set hash to 'about' for clean navigation
    const url = new URL(window.location);
    url.hash = 'about';
    url.searchParams.delete('tab');
    window.history.replaceState(null, '', url.toString());
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchAboutData();
  }, [fetchAboutData]);

  // Remove deep linking effect since we're using localStorage only
  // This prevents navigation issues with browser back button

  // Keyboard navigation for tabs
  const tabListRef = useRef(null);
  const handleTabKeyDown = (e) => {
    const idx = TABS.findIndex((tab) => tab.id === activeTab);
    if (e.key === 'ArrowRight') {
      handleTabChange(TABS[(idx + 1) % TABS.length].id);
    } else if (e.key === 'ArrowLeft') {
      handleTabChange(TABS[(idx - 1 + TABS.length) % TABS.length].id);
    } else if (e.key === 'Home') {
      handleTabChange(TABS[0].id);
    } else if (e.key === 'End') {
      handleTabChange(TABS[TABS.length - 1].id);
    }
  };

  // Remove hash update effect since we're keeping hash as 'about' always
  // This prevents navigation issues when using browser back button

  // --- Scrollspy: update active tab on scroll ---
  useEffect(() => {
    const handleScroll = () => {
      // Disable scrollspy for tab-based interface
      // Users should control tab switching manually
      return;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, isLoading]);

  // --- Section animation: fade/slide in on tab change ---
  const [sectionAnim, setSectionAnim] = useState('');
  useEffect(() => {
    setSectionAnim('animate-fadein');
    const timeout = setTimeout(() => setSectionAnim(''), 500);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  // --- Back to Top button state ---
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Custom styles for the parallax timeline
  const timelineStyles = `
    .history-parallax-swiper .swiper-slide {
      transform-style: preserve-3d;
    }
    
    .history-parallax-swiper .swiper-button-prev-custom:hover,
    .history-parallax-swiper .swiper-button-next-custom:hover {
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
    
    .history-parallax-swiper [data-swiper-parallax] {
      transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .swiper-pagination-custom .swiper-pagination-bullet {
      transition: all 0.3s ease;
      background: var(--color-primary) !important;
      opacity: 0.6;
    }
    
    .swiper-pagination-custom .swiper-pagination-bullet-active {
      background: var(--color-primary) !important;
      opacity: 1;
      transform: scale(1.2);
    }
  `;

  return (
    <>
      {/* Inject custom styles */}
      <style dangerouslySetInnerHTML={{ __html: timelineStyles }} />

      <Nav />
      <main className='mx-auto max-w-7xl px-4 sm:py-8 lg:px-8 '>
        {/* Mobile Tabs - Full width with underline */}
        <div className='md:hidden w-full fixed top-[4.5rem] left-0 z-30 bg-white border-b border-gray-200 shadow-sm'>
          {/* Search bar for mobile */}
          {/* <div className='px-4 py-2 border-b border-gray-100'>
            <SearchBox searchTerm={searchTerm} onSearch={setSearchTerm} />
          </div> */}

          {/* Mobile tab navigation */}
          <div className='relative'>
            <div
              className='flex overflow-x-auto scrollbar-hide'
              role='tablist'
              aria-label='About page sections'
              ref={tabListRef}
              tabIndex={0}
              onKeyDown={handleTabKeyDown}
            >
              {filteredTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`relative flex-shrink-0 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-400)] ${
                    activeTab === tab.id
                      ? 'text-[var(--primary-700)] bg-[var(--primary-50)]'
                      : 'text-gray-600 hover:text-[var(--primary-700)] hover:bg-gray-50'
                  }`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                  role='tab'
                  aria-selected={activeTab === tab.id}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                >
                  <span className='flex items-center space-x-2'>
                    {getTabIcon(tab.icon, 'w-4 h-4')}
                    <span>{tab.label}</span>
                    {favorites.includes(tab.id) && (
                      <span className='text-yellow-500 text-sm'>⭐</span>
                    )}
                  </span>
                  {/* Active tab underline */}
                  {activeTab === tab.id && (
                    <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary-700)] transition-all duration-200' />
                  )}
                  {/* Hover preview */}
                  <TabPreview tab={tab} isVisible={hoveredTab === tab.id} />
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Desktop Full-width Tabs with Underline */}
        <div className='hidden md:block w-full'>
          <div className='sticky top-[4.5rem] z-30 bg-white border-b  mb-8'>
            {/* Enhanced header with search and shortcuts */}
            <div className='px-6 py-4 border-b border-gray-100'>
              <div className='flex items-center justify-between gap-4'>
                <div>
                  <p className='text-sm text-gray-500'>
                    Learn About Marinduque State University
                  </p>
                  <h2 className='text-2xl font-bold text-[var(--primary-700)] mt-1'>
                    Our vision, heritage, values, and the people that shape our
                    future
                  </h2>
                  {/* Data status indicator */}
                  {dataError && (
                    <div className='mt-2 flex items-center text-amber-600 text-sm'>
                      <svg
                        className='w-4 h-4 mr-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.98-.833-2.75 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                        />
                      </svg>
                      Unable to load latest content, showing cached version
                    </div>
                  )}
                </div>
                {/* Search box */}
                {/* <div className='flex-1 max-w-md'>
                  <SearchBox searchTerm={searchTerm} onSearch={setSearchTerm} />
                </div> */}

                {/* Quick actions */}
                <div className='flex items-center space-x-4'>
                  {/* Data refresh button */}
                  <button
                    onClick={handleRefreshData}
                    disabled={dataLoading}
                    className='flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-[var(--primary-700)] hover:bg-gray-50 rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
                    title='Refresh content data'
                  >
                    <svg
                      className={`w-4 h-4 ${dataLoading ? 'animate-spin' : ''}`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                      />
                    </svg>
                    <span className='hidden sm:inline'>Refresh</span>
                  </button>

                  {/* Recent tabs */}
                  {recentTabs.length > 0 && (
                    <div className='flex items-center space-x-2'>
                      <span className='text-xs text-gray-500 font-medium'>
                        Recent:
                      </span>
                      <div className='flex space-x-1'>
                        {recentTabs.slice(0, 3).map((tabId) => {
                          const tab = TABS.find((t) => t.id === tabId);
                          if (!tab) return null;
                          return (
                            <button
                              key={tabId}
                              onClick={() => handleTabChange(tabId)}
                              className='text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors duration-150'
                              title={tab.description}
                            >
                              {getTabIcon(tab.icon, 'w-3 h-3')}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Favorites */}
                  {/* {favorites.length > 0 && (
                    <div className='flex items-center space-x-2'>
                      <span className='text-xs text-gray-500 font-medium'>
                        Favorites:
                      </span>
                      <div className='flex space-x-1'>
                        {favorites.slice(0, 4).map((tabId) => {
                          const tab = TABS.find((t) => t.id === tabId);
                          if (!tab) return null;
                          return (
                            <button
                              key={tabId}
                              onClick={() => handleTabChange(tabId)}
                              className='text-xs px-2 py-1 bg-yellow-100 hover:bg-yellow-200 rounded-full text-yellow-800 transition-colors duration-150'
                              title={tab.description}
                            >
                              {getTabIcon(tab.icon, 'w-3 h-3')}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>

            {/* Full-width tab navigation - Auto-fit all tabs */}
            <div className='relative'>
              <div
                className='flex w-full px-6'
                role='tablist'
                aria-label='About page sections'
                ref={tabListRef}
                tabIndex={0}
                onKeyDown={handleTabKeyDown}
              >
                {filteredTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    onMouseEnter={() => setHoveredTab(tab.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className={`relative flex-1 min-w-0 px-3 py-4 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-400)] group ${
                      activeTab === tab.id
                        ? 'text-[var(--primary-700)] bg-[var(--primary-50)]'
                        : 'text-gray-600 hover:text-[var(--primary-700)] hover:bg-gray-50'
                    }`}
                    aria-current={activeTab === tab.id ? 'page' : undefined}
                    role='tab'
                    aria-selected={activeTab === tab.id}
                    tabIndex={activeTab === tab.id ? 0 : -1}
                  >
                    <div className='flex flex-col items-center space-y-2'>
                      <div className='flex items-center space-x-1'>
                        {getTabIcon(tab.icon, 'w-5 h-5')}
                        {/* {favorites.includes(tab.id) && (
                          <span className='text-yellow-500 text-xs'>⭐</span>
                        )} */}
                        {/* Loading indicator */}
                        {/* {activeTab === tab.id && isLoading && (
                          <div className='animate-spin rounded-full h-3 w-3 border-2 border-[var(--primary-700)] border-t-transparent'></div>
                        )} */}
                      </div>
                      <span className='text-xs text-center leading-tight truncate w-full'>
                        {tab.label}
                      </span>
                      {/* Favorite toggle button - only show on hover */}
                      {/* <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(tab.id);
                        }}
                        className='opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-yellow-500 text-xs absolute top-1 right-1'
                        title={
                          favorites.includes(tab.id)
                            ? 'Remove from favorites'
                            : 'Add to favorites'
                        }
                      >
                        {favorites.includes(tab.id) ? '★' : '☆'}
                      </button> */}
                    </div>

                    {/* Active tab underline */}
                    {activeTab === tab.id && (
                      <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary-700)] transition-all duration-200' />
                    )}

                    {/* Hover preview */}
                    <TabPreview tab={tab} isVisible={hoveredTab === tab.id} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb navigation */}
        <div className='w-full px-4 md:px-6 mt-4 mb-2'>
          <Breadcrumb activeTab={activeTab} onNavigate={handleTabChange} />
        </div>
        {/* Content */}
        <div className='w-full flex justify-center px-4 md:px-6'>
          <section
            className={`max-w-6xl w-full bg-white p-8 mb-12 mt-20 md:mt-4 transition-all duration-500 ${sectionAnim}`}
          >
            {/* Content with loading state */}
            {isLoading || dataLoading ? (
              <SkeletonLoader />
            ) : (
              <div className='transform transition-all duration-300 ease-out'>
                {renderTabContent(activeTab)}
              </div>
            )}

            {/* Tab navigation at bottom for mobile */}
            <div className=' mt-8 pt-6 border-t border-gray-200'>
              <div className='flex justify-between items-center'>
                {TABS.findIndex((tab) => tab.id === activeTab) > 0 && (
                  <button
                    onClick={() => {
                      const currentIndex = TABS.findIndex(
                        (tab) => tab.id === activeTab
                      );
                      handleTabChange(TABS[currentIndex - 1].id);
                    }}
                    className='flex items-center px-4 py-2 text-sm text-[var(--primary-700)] hover:bg-[var(--primary-50)] rounded-lg transition-colors'
                  >
                    <svg
                      className='w-4 h-4 mr-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 19l-7-7 7-7'
                      />
                    </svg>
                    Previous
                  </button>
                )}
                <div className='flex-1'></div>
                {TABS.findIndex((tab) => tab.id === activeTab) <
                  TABS.length - 1 && (
                  <button
                    onClick={() => {
                      const currentIndex = TABS.findIndex(
                        (tab) => tab.id === activeTab
                      );
                      handleTabChange(TABS[currentIndex + 1].id);
                    }}
                    className='flex items-center px-4 py-2 text-sm text-[var(--primary-700)] hover:bg-[var(--primary-50)] rounded-lg transition-colors'
                  >
                    Next
                    <svg
                      className='w-4 h-4 ml-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='fixed bottom-6 right-6 z-50 bg-[var(--primary-700)] text-white rounded-full shadow-lg p-3 hover:bg-[var(--primary-800)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-400)]'
            aria-label='Back to Top'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 15l7-7 7 7'
              />
            </svg>
          </button>
        )}
      </main>
      <Footer />
    </>
  );
}

export default AboutPage;

// Add these CSS classes to your global CSS file (index.css or App.css):
/*
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.animate-fadein {
  opacity: 0;
  transform: translateY(8px);
  animation: fadein 0.5s forwards;
}

@keyframes fadein {
  to {
    opacity: 1;
    transform: none;
  }
}

.animate-slide-up {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.3s forwards;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

History Timeline Swiper Customization
.history-timeline-swiper {
  padding: 20px 0 50px 0;
}

.history-timeline-swiper .swiper-button-next,
.history-timeline-swiper .swiper-button-prev {
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: var(--primary-600);
}

.history-timeline-swiper .swiper-button-next:after,
.history-timeline-swiper .swiper-button-prev:after {
  font-size: 16px;
  font-weight: bold;
}

.history-timeline-swiper .swiper-pagination {
  bottom: 10px;
}

.history-timeline-swiper .swiper-pagination-bullet {
  background: var(--primary-500);
  opacity: 0.5;
  width: 10px;
  height: 10px;
}

.history-timeline-swiper .swiper-pagination-bullet-active {
  opacity: 1;
  transform: scale(1.2);
}
*/
