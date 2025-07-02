import { useEffect, useState, useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TagIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarIconSolid,
  FireIcon as FireIconSolid,
} from '@heroicons/react/24/solid';

const getLang = () => navigator.language?.slice(0, 2) || 'en';

function Events() {
  const [events, setEvents] = useState([]);
  const [lang] = useState(getLang());
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [themeTag, setThemeTag] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'month', 'list'

  useDynamicTheme(themeTag);

  // Enhanced event data processing
  const processEventData = useCallback((rawEvents) => {
    return rawEvents.map((event, index) => {
      const eventDate = new Date(
        event.date || Date.now() + index * 24 * 60 * 60 * 1000
      );

      return {
        ...event,
        id: event.id || `event-${eventDate.getTime()}-${index}`,
        date: eventDate,
        title: {
          en: event.title?.en || event.title || `Event ${index + 1}`,
          fil: event.title?.fil || event.title || `Kaganapan ${index + 1}`,
        },
        description: {
          en:
            event.description?.en ||
            event.description ||
            'University event announcement',
          fil:
            event.description?.fil ||
            event.description ||
            'Anunsyo ng pampamilyang kaganapan',
        },
        category: event.category || 'Academic',
        tags: event.tags || ['University'],
        location: event.location || 'MARSU Campus',
        imageUrl: event.imageUrl || event.image || '/images/landing-bg-1.jpg',
        imageAlt: event.imageAlt || 'Event Image',
        isFeatured: event.isFeatured || false,
        isTrending: event.isTrending || false,
        organizer: event.organizer || 'Marinduque State University',
        registrationUrl: event.registrationUrl || null,
        capacity: event.capacity || null,
        isRegistrationRequired: event.isRegistrationRequired || false,
        eventType: event.eventType || 'General',
        priority: event.priority || 'normal', // 'high', 'normal', 'low'
      };
    });
  }, []);

  // Enhanced sharing functionality
  const handleShareEvent = useCallback(
    async (event, platform = 'copy') => {
      const shareUrl = `${window.location.origin}/#/events/${event.id}`;
      const shareTitle = event.title?.[lang] || event.title?.en;
      const shareText = `${shareTitle} - ${event.description?.[lang] || event.description?.en}`;

      switch (platform) {
        case 'facebook': {
          const fbParams = new URLSearchParams({
            u: shareUrl,
            quote: shareTitle,
            hashtag: '#MARSUEvents',
          });
          window.open(
            `https://www.facebook.com/sharer/sharer.php?${fbParams.toString()}`,
            'facebook-share',
            'width=626,height=436'
          );
          break;
        }
        case 'twitter': {
          const twitterText = `${shareText}\n\n${shareUrl} #MARSUEvents`;
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`,
            'twitter-share',
            'width=550,height=420'
          );
          break;
        }
        case 'copy': {
          try {
            await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
            // Show success notification
            const notification = document.createElement('div');
            notification.textContent =
              lang === 'fil' ? 'Nakopya sa clipboard!' : 'Copied to clipboard!';
            notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-primary, #1f2937);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          `;
            document.body.appendChild(notification);
            setTimeout(() => {
              if (document.body.contains(notification)) {
                document.body.removeChild(notification);
              }
            }, 3000);
          } catch (err) {
            console.error('Failed to copy:', err);
            alert(lang === 'fil' ? 'Nakopya sa clipboard!' : 'Link copied!');
          }
          break;
        }
      }
      setShowShareModal(false);
    },
    [lang]
  );

  useEffect(() => {
    setLoading(true);
    fetch('/data/marsu-resources/Resources.json')
      .then((res) => res.json())
      .then((data) => {
        const processedEvents = processEventData(data.events || []);
        setEvents(processedEvents);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load events.');
        setLoading(false);
      });
  }, [processEventData]);

  useEffect(() => {
    if (events.length) {
      const featured = events.find((e) => e.isFeatured || e.isTrending);
      if (featured && featured.tags?.length) setThemeTag(featured.tags[0]);
    }
  }, [events]);

  useEffect(() => {
    if (events.length) {
      window.dispatchEvent(
        new CustomEvent('events_view', { detail: { count: events.length } })
      );
    }
  }, [events]);

  // Enhanced filtering and searching
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesFilter =
        filter === 'all' ||
        event.category === filter ||
        event.eventType === filter ||
        event.tags?.includes(filter);

      const matchesSearch =
        !search ||
        [
          event.title?.[lang],
          event.title?.en,
          event.description?.[lang],
          event.description?.en,
          event.location,
          event.organizer,
          ...(event.tags || []),
        ].some((field) => field?.toLowerCase().includes(search.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [events, filter, search, lang]);

  // Enhanced categories for filtering
  const categories = useMemo(() => {
    const allCategories = new Set();
    events.forEach((event) => {
      if (event.category) allCategories.add(event.category);
      if (event.eventType) allCategories.add(event.eventType);
      event.tags?.forEach((tag) => allCategories.add(tag));
    });
    return Array.from(allCategories).sort();
  }, [events]);

  // Enhanced event grouping by month
  const eventsByMonth = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const grouped = {};

    filteredEvents.forEach((event) => {
      const eventDate = new Date(event.date);
      const key = `${eventDate.getFullYear()}-${eventDate.getMonth()}`;

      if (!grouped[key]) {
        grouped[key] = [];
      }

      // Add computed display properties
      const enhancedEvent = {
        ...event,
        day: {
          en: eventDate.toLocaleDateString('en-US', { weekday: 'long' }),
          fil: eventDate.toLocaleDateString('fil-PH', { weekday: 'long' }),
        },
        formattedDate: {
          short: eventDate.toLocaleDateString(lang, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          long: eventDate.toLocaleDateString(lang, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
        },
        isToday: eventDate.toDateString() === now.toDateString(),
        isPast: eventDate < now,
        isThisMonth:
          eventDate.getMonth() === currentMonth &&
          eventDate.getFullYear() === currentYear,
      };

      grouped[key].push(enhancedEvent);
    });

    // Sort events within each month
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    return grouped;
  }, [filteredEvents, lang]);

  // Sort month keys
  const monthKeys = useMemo(() => {
    return Object.keys(eventsByMonth)
      .map((key) => {
        const [year, month] = key.split('-').map(Number);
        return { key, year, month };
      })
      .sort((a, b) => (a.year !== b.year ? a.year - b.year : a.month - b.month))
      .map((item) => item.key);
  }, [eventsByMonth]);

  // Enhanced loading component with skeleton
  const LoadingState = () => (
    <div className='w-full max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row gap-4 mb-6 items-center justify-between'>
        <div className='h-8 bg-gray-300 rounded w-48 animate-pulse'></div>
        <div className='h-10 bg-gray-300 rounded w-full md:w-1/2 animate-pulse'></div>
        <div className='h-10 bg-gray-300 rounded w-32 animate-pulse'></div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-md p-6 animate-pulse'
            >
              <div className='h-4 bg-gray-300 rounded w-3/4 mb-4'></div>
              <div className='h-6 bg-gray-300 rounded w-full mb-2'></div>
              <div className='h-4 bg-gray-300 rounded w-5/6 mb-4'></div>
              <div className='flex gap-2'>
                <div className='h-6 bg-gray-300 rounded w-16'></div>
                <div className='h-6 bg-gray-300 rounded w-20'></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  // Loading and error states
  if (loading) return <LoadingState />;

  if (error) {
    return (
      <div className='w-full max-w-7xl mx-auto text-center py-12'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto'>
          <h3 className='text-lg font-semibold text-red-800 mb-2'>
            {lang === 'fil'
              ? 'Hindi Ma-load ang mga Event'
              : 'Failed to Load Events'}
          </h3>
          <p className='text-red-600 mb-4'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors'
          >
            {lang === 'fil' ? 'Subukan Muli' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className='w-full max-w-7xl mx-auto text-center py-12'>
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto'>
          <CalendarDaysIcon className='w-12 h-12 text-yellow-600 mx-auto mb-4' />
          <h3 className='text-lg font-semibold text-yellow-800 mb-2'>
            {lang === 'fil'
              ? 'Walang Available na Events'
              : 'No Events Available'}
          </h3>
          <p className='text-yellow-600'>
            {lang === 'fil'
              ? 'Magbalik sa ibang oras para sa mga bagong announcement.'
              : 'Check back later for new event announcements.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Enhanced Header with Modern Search and Filters */}
      <div className='mb-8'>
        <div className='text-center w-full flex justify-between mb-6'>
          <h2 className='text-2xl md:text-2xl font-bold text-[var(--color-primary)] mb-2'>
            {lang === 'fil' ? 'Mga Kaganapan' : 'University Events'}
          </h2>
          <p className='text-gray-600 text-lg'>
            {lang === 'fil'
              ? 'Mga announcement, akademikong kalendaryo, at aktibidad'
              : 'Announcements, academic calendar, and university activities'}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className='bg-white rounded-xl shadow-lg p-6 mb-6'>
          <div className='flex flex-col lg:flex-row gap-4 items-center'>
            {/* Search Input */}
            <div className='relative flex-1 w-full lg:w-auto'>
              <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type='text'
                placeholder={
                  lang === 'fil'
                    ? 'Maghanap ng event, lokasyon, o kategorya...'
                    : 'Search events, location, or category...'
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                aria-label='Search events'
              />
            </div>

            {/* Filter Dropdown */}
            <div className='relative w-full lg:w-auto lg:min-w-[200px]'>
              <FunnelIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className='w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white'
                aria-label='Filter events'
              >
                <option value='all'>
                  {lang === 'fil' ? 'Lahat ng Kategorya' : 'All Categories'}
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronRightIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-gray-400 pointer-events-none' />
            </div>

            {/* View Mode Toggle */}
            <div className='flex bg-gray-100 rounded-lg p-1'>
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'month'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <CalendarDaysIcon className='w-4 h-4 inline mr-1' />
                {lang === 'fil' ? 'Buwan' : 'Month'}
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <TagIcon className='w-4 h-4 inline mr-1' />
                {lang === 'fil' ? 'Lista' : 'List'}
              </button>
            </div>
          </div>

          {/* Results Summary */}
          {search && (
            <div className='mt-4 text-sm text-gray-600'>
              {lang === 'fil'
                ? `Natagpuan: ${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`
                : `Found: ${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`}
            </div>
          )}
        </div>
      </div>

      {/* No Events Message */}
      {monthKeys.length === 0 && (
        <div className='text-center py-12'>
          <CalendarDaysIcon className='w-16 h-16 text-gray-400 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-gray-600 mb-2'>
            {lang === 'fil' ? 'Walang event na natagpuan' : 'No events found'}
          </h3>
          <p className='text-gray-500'>
            {lang === 'fil'
              ? 'Subukan ang ibang search term o filter.'
              : 'Try adjusting your search or filter criteria.'}
          </p>
        </div>
      )}

      {/* Events Display */}
      {monthKeys.length > 0 && (
        <>
          {viewMode === 'month' ? (
            /* Month View with Enhanced Swiper */
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet bg-blue-500',
                bulletActiveClass:
                  'swiper-pagination-bullet-active bg-blue-600',
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                1024: { slidesPerView: 2 },
                1280: { slidesPerView: 3 },
              }}
              className='mb-8 relative'
              aria-label='Events Carousel'
            >
              {/* Custom Navigation Buttons */}
              <div className='swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors'>
                <ChevronLeftIcon className='w-5 h-5 text-gray-600' />
              </div>
              <div className='swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors'>
                <ChevronRightIcon className='w-5 h-5 text-gray-600' />
              </div>

              {monthKeys.map((key) => {
                const [year, month] = key.split('-').map(Number);
                const now = new Date();
                const isCurrentMonth =
                  year === now.getFullYear() && month === now.getMonth();

                return (
                  <SwiperSlide key={key}>
                    <div
                      className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 h-full border transition-all duration-300 ${
                        isCurrentMonth
                          ? ' shadow-xl'
                          : 'border-gray-200 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {/* Month Header */}
                      <div className='text-center mb-6'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                          {new Date(year, month).toLocaleString(lang, {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </h3>
                        {isCurrentMonth && (
                          <span className='inline-flex items-center px-3 py-1  text-[var(--color-primary)] text-sm font-medium rounded-full'>
                            <ClockIcon className='w-4 h-4 mr-1' />
                            {lang === 'fil'
                              ? 'Kasalukuyang Buwan'
                              : 'Current Month'}
                          </span>
                        )}
                      </div>

                      {/* Events List */}
                      <div className='space-y-4 max-h-96 overflow-y-auto custom-scrollbar'>
                        {eventsByMonth[key].map((event) => (
                          <div
                            key={event.id}
                            className={`group bg-white rounded-xl p-4 border transition-all duration-300 cursor-pointer hover:shadow-md ${
                              event.isFeatured
                                ? ''
                                : event.isTrending
                                  ? 'border-orange-500 ring-1 ring-orange-200'
                                  : event.isToday
                                    ? 'border-green-500 ring-1 ring-green-200'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => {
                              setSelectedEvent(event);
                              window.dispatchEvent(
                                new CustomEvent('event_click', {
                                  detail: { id: event.id },
                                })
                              );
                            }}
                          >
                            {/* Event Header */}
                            <div className='flex items-start justify-between mb-3'>
                              <div className='flex-1'>
                                <div className='flex items-center gap-2 mb-1'>
                                  <h4 className='font-semibold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors'>
                                    {event.day?.[lang] || event.day?.en}
                                  </h4>
                                  {event.isToday && (
                                    <span className='px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full'>
                                      {lang === 'fil' ? 'Ngayon' : 'Today'}
                                    </span>
                                  )}
                                </div>
                                <p className='text-sm text-gray-600 font-medium'>
                                  {event.formattedDate?.short}
                                </p>
                              </div>

                              {/* Action Buttons */}
                              <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedEvent(event);
                                    setShowShareModal(true);
                                  }}
                                  className='p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors'
                                  title={lang === 'fil' ? 'I-share' : 'Share'}
                                >
                                  <ShareIcon className='w-4 h-4' />
                                </button>
                              </div>
                            </div>

                            {/* Event Content */}
                            <div className='mb-3'>
                              <h5 className='font-bold text-gray-900 mb-1 line-clamp-2'>
                                {event.title?.[lang] || event.title?.en}
                              </h5>
                              <p className='text-gray-600 text-sm line-clamp-2 mb-2'>
                                {event.description?.[lang] ||
                                  event.description?.en}
                              </p>

                              {/* Location */}
                              {event.location && (
                                <div className='flex items-center text-sm text-gray-500 mb-2'>
                                  <MapPinIcon className='w-4 h-4 mr-1 flex-shrink-0' />
                                  <span className='truncate'>
                                    {event.location}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Event Tags and Status */}
                            <div className='flex items-center justify-between'>
                              <div className='flex flex-wrap gap-1'>
                                {event.tags?.slice(0, 2).map((tag) => (
                                  <span
                                    key={tag}
                                    className='inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-xs font-medium'
                                  >
                                    <TagIcon className='w-3 h-3 mr-1' />
                                    {tag}
                                  </span>
                                ))}
                                {event.tags?.length > 2 && (
                                  <span className='text-xs text-gray-500'>
                                    +{event.tags.length - 2}
                                  </span>
                                )}
                              </div>

                              {/* Priority/Status Indicators */}
                              <div className='flex items-center gap-1'>
                                {event.isFeatured && (
                                  <StarIconSolid
                                    className='w-4 h-4 text-blue-500'
                                    title={
                                      lang === 'fil' ? 'Tampok' : 'Featured'
                                    }
                                  />
                                )}
                                {event.isTrending && (
                                  <FireIconSolid
                                    className='w-4 h-4 text-orange-500'
                                    title={
                                      lang === 'fil' ? 'Sikat' : 'Trending'
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            /* List View */
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={`group bg-white rounded-xl shadow-lg border p-6 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
                    event.isFeatured
                      ? 'border-blue-500 ring-1 ring-blue-200'
                      : event.isTrending
                        ? 'border-orange-500 ring-1 ring-orange-200'
                        : event.isToday
                          ? 'border-green-500 ring-1 ring-green-200'
                          : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedEvent(event);
                    window.dispatchEvent(
                      new CustomEvent('event_click', {
                        detail: { id: event.id },
                      })
                    );
                  }}
                >
                  {/* Event Image */}
                  {event.imageUrl && (
                    <div className='mb-4 overflow-hidden rounded-lg'>
                      <img
                        src={event.imageUrl}
                        alt={event.imageAlt}
                        className='w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300'
                        loading='lazy'
                      />
                    </div>
                  )}

                  {/* Event Header */}
                  <div className='flex items-start justify-between mb-3'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-lg font-bold text-blue-600'>
                          {new Date(event.date).getDate()}
                        </span>
                        <div>
                          <p className='font-semibold text-gray-900'>
                            {event.day?.[lang] || event.day?.en}
                          </p>
                          <p className='text-sm text-gray-600'>
                            {new Date(event.date).toLocaleDateString(lang, {
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                        {event.isToday && (
                          <span className='px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full'>
                            {lang === 'fil' ? 'Ngayon' : 'Today'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Share Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                        setShowShareModal(true);
                      }}
                      className='p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors'
                      title={lang === 'fil' ? 'I-share' : 'Share'}
                    >
                      <ShareIcon className='w-5 h-5' />
                    </button>
                  </div>

                  {/* Event Content */}
                  <div className='mb-4'>
                    <h3 className='font-bold text-gray-900 mb-2 line-clamp-2'>
                      {event.title?.[lang] || event.title?.en}
                    </h3>
                    <p className='text-gray-600 text-sm line-clamp-3 mb-3'>
                      {event.description?.[lang] || event.description?.en}
                    </p>

                    {/* Location and Organizer */}
                    <div className='space-y-1'>
                      {event.location && (
                        <div className='flex items-center text-sm text-gray-500'>
                          <MapPinIcon className='w-4 h-4 mr-2 flex-shrink-0' />
                          <span className='truncate'>{event.location}</span>
                        </div>
                      )}
                      {event.organizer && (
                        <div className='flex items-center text-sm text-gray-500'>
                          <UserGroupIcon className='w-4 h-4 mr-2 flex-shrink-0' />
                          <span className='truncate'>{event.organizer}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event Footer */}
                  <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                    <div className='flex flex-wrap gap-1'>
                      {event.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className='inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-xs font-medium'
                        >
                          #{tag}
                        </span>
                      ))}
                      {event.tags?.length > 2 && (
                        <span className='text-xs text-gray-500'>
                          +{event.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Status Indicators */}
                    <div className='flex items-center gap-1'>
                      {event.isFeatured && (
                        <StarIconSolid
                          className='w-5 h-5 text-blue-500'
                          title={lang === 'fil' ? 'Tampok' : 'Featured'}
                        />
                      )}
                      {event.isTrending && (
                        <FireIconSolid
                          className='w-5 h-5 text-orange-500'
                          title={lang === 'fil' ? 'Sikat' : 'Trending'}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Share Modal */}
      {showShareModal && selectedEvent && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl shadow-2xl max-w-md w-full p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-gray-900'>
                {lang === 'fil' ? 'I-share ang Event' : 'Share Event'}
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className='p-1 text-gray-400 hover:text-gray-600 rounded-md'
              >
                <XMarkIcon className='w-6 h-6' />
              </button>
            </div>

            <div className='mb-4 p-3 bg-gray-50 rounded-lg'>
              <h4 className='font-medium text-gray-900 mb-1'>
                {selectedEvent.title?.[lang] || selectedEvent.title?.en}
              </h4>
              <p className='text-sm text-gray-600'>
                {selectedEvent.formattedDate?.long}
              </p>
            </div>

            <div className='grid grid-cols-1 gap-3'>
              <button
                onClick={() => handleShareEvent(selectedEvent, 'facebook')}
                className='flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              >
                <ShareIcon className='w-5 h-5' />
                Facebook
              </button>
              <button
                onClick={() => handleShareEvent(selectedEvent, 'twitter')}
                className='flex items-center justify-center gap-3 px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors'
              >
                <ShareIcon className='w-5 h-5' />
                Twitter
              </button>
              <button
                onClick={() => handleShareEvent(selectedEvent, 'copy')}
                className='flex items-center justify-center gap-3 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
              >
                <DocumentDuplicateIcon className='w-5 h-5' />
                {lang === 'fil' ? 'Kopyahin ang Link' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Events;
