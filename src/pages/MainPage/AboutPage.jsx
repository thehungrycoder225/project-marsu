import Nav from '../../components/Navigation';
import Footer from '../../components/Footer';
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';

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
    className={`absolute z-50 mt-2 p-3 bg-black text-white text-sm rounded-lg shadow-lg max-w-xs transition-opacity duration-200 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
  >
    <div className='flex items-center mb-1'>
      <div className='mr-2 text-white'>{getTabIcon(tab.icon, 'w-4 h-4')}</div>
      <span className='font-medium'>{tab.label}</span>
    </div>
    <p className='text-xs text-gray-300'>{tab.description}</p>
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
      {groupData && (
        <>
          <span className='text-gray-500'>{groupData.label}</span>
          <span className='text-gray-400'>/</span>
        </>
      )}
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
  // Section content as components for clarity
  const tabContent = {
    history: (
      <section id='history'>
        <h2 className='text-2xl font-bold mb-2 text-[var(--primary-700)]'>
          History
        </h2>
        <p className='text-gray-700'>[Insert university history here]</p>
      </section>
    ),
    'vision-mission': (
      <section id='vision-mission'>
        <h2 className='text-2xl font-bold mb-2 text-[var(--primary-700)]'>
          Vision-Mission
        </h2>
        <p className='text-gray-700'>[Insert vision and mission here]</p>
      </section>
    ),
    goals: (
      <section id='goals'>
        <h2 className='text-2xl font-bold mb-2 text-[var(--primary-700)]'>
          Goals & Objectives
        </h2>
        <p className='text-gray-700'>[Insert goals and objectives here]</p>
      </section>
    ),
    'core-values': (
      <section id='core-values'>
        <h2 className='text-2xl font-bold mb-2 text-[var(--primary-700)]'>
          Core Values
        </h2>
        <ul className='list-disc list-inside text-gray-600 space-y-1'>
          <li>Integrity</li>
          <li>Excellence</li>
          <li>Innovation</li>
          <li>Service</li>
          <li>Respect</li>
          <li>Collaboration</li>
        </ul>
      </section>
    ),
    'quality-policy': (
      <section id='quality-policy'>
        <h2 className='text-2xl font-bold mb-2 text-[var(--primary-700)]'>
          Quality Policy
        </h2>
        <p className='text-gray-700'>[Insert quality policy here]</p>
      </section>
    ),
    mandates: (
      <section id='mandates'>
        <h2 className='text-2xl font-bold mb-2 text-[var(--primary-700)]'>
          Mandates & Charter
        </h2>
        <p className='text-gray-700'>[Insert mandates and charter here]</p>
      </section>
    ),
    councils: (
      <section id='councils'>
        <h2 className='text-2xl font-bold mb-2 text-[var(--primary-700)]'>
          University Councils
        </h2>
        <p className='text-gray-700'>[Insert university councils here]</p>
      </section>
    ),
    milestones: (
      <section id='milestones'>
        <h2 className='text-2xl font-bold mb-2 text-[var(--primary-700)]'>
          Milestones
        </h2>
        <p className='text-gray-700'>[Insert milestones here]</p>
      </section>
    ),
    contact: (
      <section id='contact'>
        <h2 className='text-2xl font-bold mb-2 text-[var(--primary-700)]'>
          Contact Us
        </h2>
        <p className='text-gray-700'>[Insert contact information here]</p>
      </section>
    ),
  };

  // Set initial hash to 'about' when component mounts
  useEffect(() => {
    // Always set hash to 'about' for clean navigation
    const url = new URL(window.location);
    url.hash = 'about';
    url.searchParams.delete('tab');
    window.history.replaceState(null, '', url.toString());
  }, []);

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

  return (
    <>
      <Nav />
      <main className='mx-auto max-w-7xl px-4 sm:py-8 lg:px-8 '>
        {/* Mobile Tabs - Full width with underline */}
        <div className='w-full md:hidden fixed top-[4.5rem] left-0 z-30 bg-white border-b border-gray-200 shadow-sm'>
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
                </div>
                {/* Search box */}
                {/* <div className='flex-1 max-w-md'>
                  <SearchBox searchTerm={searchTerm} onSearch={setSearchTerm} />
                </div> */}

                {/* Quick actions */}
                <div className='flex items-center space-x-4'>
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
                  {favorites.length > 0 && (
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
                  )}
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
                        {favorites.includes(tab.id) && (
                          <span className='text-yellow-500 text-xs'>⭐</span>
                        )}
                        {/* Loading indicator */}
                        {activeTab === tab.id && isLoading && (
                          <div className='animate-spin rounded-full h-3 w-3 border-2 border-[var(--primary-700)] border-t-transparent'></div>
                        )}
                      </div>
                      <span className='text-xs text-center leading-tight truncate w-full'>
                        {tab.label}
                      </span>
                      {/* Favorite toggle button - only show on hover */}
                      <button
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
                      </button>
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
        <Breadcrumb activeTab={activeTab} onNavigate={handleTabChange} />
        {/* Content */}
        <div className='w-full flex justify-center px-4 md:px-6'>
          <section
            className={`max-w-6xl w-full bg-white p-8 mb-12 mt-20 md:mt-4 transition-all duration-500 ${sectionAnim}`}
          >
            {/* Content with loading state */}
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <div className='transform transition-all duration-300 ease-out'>
                {tabContent[activeTab]}
              </div>
            )}

            {/* Tab navigation at bottom for mobile */}
            <div className='md:hidden mt-8 pt-6 border-t border-gray-200'>
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
*/
