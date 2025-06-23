import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';
import './events.css';

const getLang = () => navigator.language?.slice(0, 2) || 'en';

function Events() {
  const [events, setEvents] = useState([]);
  const [lang] = useState(getLang());
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [themeTag, setThemeTag] = useState('');
  const [error, setError] = useState(null);

  useDynamicTheme(themeTag);

  useEffect(() => {
    fetch('/data/marsu-resources/Resources.json')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || []);
      })
      .catch(() => setError('Failed to load events.'));
  }, []);

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

  // Filtering and searching
  const filteredEvents = events.filter((event) => {
    const matchesFilter =
      filter === 'all' ||
      event.category === filter ||
      event.tags?.includes(filter);
    const matchesSearch =
      !search ||
      event.title?.[lang]?.toLowerCase().includes(search.toLowerCase()) ||
      event.description?.[lang]?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Unique categories/tags for filter dropdown
  const categories = Array.from(
    new Set(events.flatMap((e) => [e.category, ...(e.tags || [])]))
  );

  // Swiper pagination: group by month if yearlong, else by 4 per page
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const eventsByMonth = {};
  filteredEvents.forEach((ev) => {
    const d = new Date(ev.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!eventsByMonth[key]) eventsByMonth[key] = [];
    // Sort events byMonth on ascending date order
    ev.date = d; // Store date as Date object for sorting
    ev.day = {
      en: d.toLocaleDateString('en-US', { weekday: 'long' }),
      fil: d.toLocaleDateString('fil-PH', { weekday: 'long' }),
    };
    ev.title = {
      en: ev.title?.en || ev.title?.fil || 'Untitled Event',
      fil: ev.title?.fil || ev.title?.en || 'Untitled Event',
    };
    ev.description = {
      en: ev.description?.en || ev.description?.fil || 'No description',
      fil: ev.description?.fil || ev.description?.en || 'Walang paglalarawan',
    };
    ev.isFeatured = ev.isFeatured || false;
    ev.isTrending = ev.isTrending || false;
    ev.tags = ev.tags || [];
    ev.id = ev.id || `event-${d.getTime()}`; // Ensure unique ID
    ev.category = ev.category || 'General';
    ev.imageUrl = ev.imageUrl || '/default-event-image.jpg'; // Fallback image
    ev.imageAlt = ev.imageAlt || 'Event Image'; // Fallback alt text
    ev.author = ev.author || 'Marinduque State University'; // Fallback author
    ev.authorUrl = ev.authorUrl || 'https://www.marsu.edu.ph'; // Fallback author URL
    ev.authorImage = ev.authorImage || '/default-author-image.jpg'; // Fallback author image
    ev.authorImageAlt = ev.authorImageAlt || 'Author Image'; // Fallback author
    // Push event into the month key
    eventsByMonth[key].push(ev);
  });

  // After all events are grouped, sort the month keys in ascending order (year, then month)
  const monthKeys = Object.keys(eventsByMonth)
    .map((key) => {
      const [year, month] = key.split('-').map(Number);
      return { key, year, month };
    })
    .sort((a, b) => (a.year !== b.year ? a.year - b.year : a.month - b.month))
    .map((item) => item.key);

  // Sort events within each month by ascending date
  monthKeys.forEach((key) => {
    eventsByMonth[key].sort((a, b) => a.date - b.date);
  });
  if (events.length === 0 && !error)
    return <div className='text-center py-8'>Loading events...</div>;
  if (events.length === 0 && error)
    return <div className='text-red-600 text-center py-4'>{error}</div>;

  if (error)
    return <div className='text-red-600 text-center py-4'>{error}</div>;

  return (
    <section className='w-full max-w-7xl  mx-auto'>
      <h3 className='text-2xl md:text-3xl font-bold text-center mb-4 text-primary-700'>
        Upcoming Events
      </h3>
      <div className='flex flex-col md:flex-row gap-2 md:gap-4 mb-6 items-center justify-between'>
        <input
          type='text'
          placeholder={
            lang === 'fil' ? 'Maghanap ng event...' : 'Search events...'
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border rounded px-3 py-2 w-full md:w-1/2 text-sm'
          aria-label='Search events'
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='border rounded px-3 py-2 text-sm'
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
      </div>
      {monthKeys.length === 0 && (
        <div className='col-span-full text-center text-gray-500 py-8'>
          {lang === 'fil' ? 'Walang event na natagpuan.' : 'No events found.'}
        </div>
      )}
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        pagination={{ clickable: true }}
        className='mb-6'
        aria-label='Events Carousel'
      >
        {monthKeys.map((key) => {
          const [year, month] = key.split('-').map(Number);
          const isCurrentMonth = year === currentYear && month === currentMonth;
          return (
            <SwiperSlide key={key}>
              <div
                className={`rounded-xl p-2 ${
                  isCurrentMonth ? 'ring-4 ring-primary-700' : ''
                } bg-gray-50 h-full flex flex-col`}
              >
                <div className='mb-2 text-center font-bold text-lg text-primary-700'>
                  {new Date(year, month).toLocaleString(lang, {
                    month: 'long',
                    year: 'numeric',
                  })}
                  {isCurrentMonth && (
                    <span className='ml-2 px-2 py-0.5 bg-primary-700 text-white text-xs rounded-full'>
                      {lang === 'fil' ? 'Kasalukuyang Buwan' : 'Current Month'}
                    </span>
                  )}
                </div>
                <div className='flex flex-col gap-3'>
                  {eventsByMonth[key].map((event) => (
                    <div
                      key={event.id}
                      className={`flex flex-col bg-white rounded-xl shadow-md p-4 border transition-all ${
                        event.isFeatured
                          ? 'border-[var(--color-primary-600)]'
                          : event.isTrending
                            ? 'border-amber-600'
                            : 'border-gray-200'
                      }`}
                      tabIndex={0}
                      aria-label={event.title?.[lang] || event.title?.en}
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent('event_click', {
                            detail: { id: event.id },
                          })
                        )
                      }
                    >
                      <div className='flex items-center justify-between mb-2'>
                        <h4 className='text-lg font-semibold text-primary-700'>
                          {event.day?.[lang] || event.day?.en}
                        </h4>
                        <span className='text-sm text-gray-600 font-medium'>
                          {new Date(event.date).toLocaleDateString(lang, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className='flex-1'>
                        <p className='text-base font-bold mb-1'>
                          {event.title?.[lang] || event.title?.en}
                        </p>
                        <p className='text-gray-600 text-sm mb-2'>
                          {event.description?.[lang] || event.description?.en}
                        </p>
                      </div>
                      <div className='flex flex-wrap gap-1 mt-2'>
                        {event.tags?.map((tag) => (
                          <span
                            key={tag}
                            className='bg-primary-100 text-primary-700 rounded px-2 py-0.5 text-xs font-medium'
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      {(event.isFeatured || event.isTrending) && (
                        <span
                          className={`mt-2 inline-block text-xs font-bold ${
                            event.isFeatured
                              ? 'text-primary-700'
                              : 'text-[var(--color-secondary)]'
                          }`}
                        >
                          {event.isFeatured
                            ? lang === 'fil'
                              ? 'Tampok'
                              : 'Featured'
                            : lang === 'fil'
                              ? 'Trending'
                              : 'Trending'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default Events;
