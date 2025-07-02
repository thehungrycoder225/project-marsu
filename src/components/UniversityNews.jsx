import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ShareIcon,
  BookmarkIcon,
  TagIcon,
  CalendarIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import MetaTags from './MetaTags';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import './news.css';
import Skeleton from './Skeleton';
import PropTypes from 'prop-types';

function getNetworkDelay() {
  if (navigator.connection && navigator.connection.effectiveType) {
    switch (navigator.connection.effectiveType) {
      case '4g':
        return 200;
      case '3g':
        return 600;
      case '2g':
        return 1200;
      default:
        return 400;
    }
  }
  return 300;
}

const MOTIVATIONAL_QUOTES = [
  'Empowering Minds, Shaping the Future at Marinduque State University',
  'Excellence. Innovation. Service.',
  'Your Gateway to Success!',
  'Proudly Marinduqueño, Proudly MARSU!',
];

function UniversityNews({ compact = false }) {
  const [cachedNews, setCachedNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);
  const [search] = useState('');
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState('all');
  const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);
  const [bookmarkedNews, setBookmarkedNews] = useState(new Set());
  const [imageLoading, setImageLoading] = useState(new Set());
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef(null);
  const pageSize = 5;
  const lang = 'en';

  // Memoize news data processing for performance
  const { allTags, sortedNews, featuredNews } = useMemo(() => {
    const newsData = cachedNews || [];

    // Extract unique tags
    const uniqueTags = Array.from(
      new Set(newsData.flatMap((news) => news.tags || []).filter(Boolean))
    );

    // Filter by tag
    const tagFiltered =
      selectedTag === 'all'
        ? newsData
        : newsData.filter((news) => (news.tags || []).includes(selectedTag));

    // Filter by search (keeping for future use even though search UI is not implemented)
    const searchFiltered = tagFiltered.filter(
      (news) =>
        (news.headline?.[lang] || news.headline || '')
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (news.body?.[lang] || news.body || '')
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    // Sort by date
    const sorted = [...searchFiltered].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Featured news
    const featured = sorted.filter((news) => news.isFeatured);

    return {
      allTags: uniqueTags,
      sortedNews: sorted,
      featuredNews: featured,
    };
  }, [cachedNews, selectedTag, search, lang]);

  const paginatedNews = useMemo(
    () => sortedNews.slice((page - 1) * pageSize, page * pageSize),
    [sortedNews, page, pageSize]
  );

  // Bookmark functionality
  const toggleBookmark = useCallback((newsId) => {
    setBookmarkedNews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(newsId)) {
        newSet.delete(newsId);
      } else {
        newSet.add(newsId);
      }
      localStorage.setItem('bookmarkedNews', JSON.stringify([...newSet]));
      return newSet;
    });
  }, []);

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedNews');
    if (saved) {
      setBookmarkedNews(new Set(JSON.parse(saved)));
    }
  }, []);

  // Image loading handlers
  const handleImageLoad = useCallback((newsId) => {
    setImageLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(newsId);
      return newSet;
    });
  }, []);

  // Carousel control handlers
  const toggleAutoplay = useCallback(() => {
    setAutoplayEnabled((prev) => {
      const newState = !prev;
      if (swiperRef.current?.swiper) {
        if (newState) {
          swiperRef.current.swiper.autoplay.start();
        } else {
          swiperRef.current.swiper.autoplay.stop();
        }
      }
      return newState;
    });
  }, []);

  const goToSlide = useCallback((index) => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.target.tagName.toLowerCase() === 'input') return;

      switch (event.key) {
        case 'ArrowLeft':
          if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slidePrev();
          }
          break;
        case 'ArrowRight':
          if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideNext();
          }
          break;
        case ' ':
          event.preventDefault();
          toggleAutoplay();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [toggleAutoplay]);

  // Format date helper
  const formatDate = useCallback(
    (dateString) => {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString(
        lang === 'en' ? 'en-US' : 'fil-PH',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }
      );
    },
    [lang]
  );

  // Pick a random motivational quote on mount
  useEffect(() => {
    setQuote(
      MOTIVATIONAL_QUOTES[
        Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)
      ]
    );
  }, [retryKey]);

  // Try to load cached news from localStorage
  useEffect(() => {
    const cached = localStorage.getItem('universityNews');
    if (cached) {
      setCachedNews(JSON.parse(cached));
      setLoading(false);
    }
  }, [retryKey]);

  // Fetch news and cache it, with dynamic delay
  useEffect(() => {
    let didCancel = false;
    setLoading(true);
    setError(null);
    const delay = getNetworkDelay();
    setTimeout(() => {
      fetch('/data/marsu-resources/Resources.json')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch university news');
          return res.json();
        })
        .then((data) => {
          if (!didCancel) {
            localStorage.setItem(
              'universityNews',
              JSON.stringify(data.news || [])
            );
            setCachedNews(data.news || []);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!didCancel) {
            setError('Failed to load university news.');
            setLoading(false);
          }
        });
    }, delay);
    return () => {
      didCancel = true;
    };
  }, [retryKey]);

  const universityNews = cachedNews;

  // Enhanced share handler with better error handling
  const handleShare = useCallback(
    async (news) => {
      const url = news.articleUrl || window.location.href;
      const title = news.headline?.[lang] || news.headline;

      try {
        if (navigator.share && navigator.canShare({ title, url })) {
          await navigator.share({ title, url });
        } else {
          await navigator.clipboard.writeText(url);
          // You could add a toast notification here
          console.log('URL copied to clipboard');
        }
      } catch {
        // Fallback to Facebook share
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
          'width=550,height=350'
        );
      }
    },
    [lang]
  );
  const isInternalUrl = (url) => url && url.startsWith('/news/');
  const metaNews = featuredNews[0] || sortedNews[0];
  const metaheadline =
    metaNews?.metaheadline ||
    metaNews?.headline?.[lang] ||
    metaNews?.headline ||
    'University News | Marinduque State University';
  const metalead =
    metaNews?.metalead ||
    metaNews?.lead?.[lang] ||
    metaNews?.lead ||
    'Latest university-wide news and updates from Marinduque State University.';
  const metaImage = metaNews?.metaImage || metaNews?.imgUrl || '/logo.png';
  const metaUrl = metaNews?.articleUrl || window.location.href;

  // --- Loading state: skeleton, mobile-friendly, accessible ---
  if (loading) {
    return (
      <section
        className='py-8'
        aria-busy='true'
        aria-live='polite'
        role='status'
      >
        <div className='flex flex-col items-center gap-4 w-full max-w-2xl mx-auto px-2'>
          <Skeleton width='80%' height='2.5rem' className='mb-2' />
          <Skeleton width='100%' height='7rem' className='mb-2 rounded-md' />
          <Skeleton width='100%' height='7rem' className='mb-2 rounded-md' />
          <Skeleton width='100%' height='7rem' className='mb-2 rounded-md' />
          <div className='text-primary-700 font-semibold mt-4 text-center text-base md:text-lg'>
            {quote}
          </div>
        </div>
      </section>
    );
  }
  // --- Error state: accessible, retry ---
  if (error) {
    return (
      <section
        className='py-8 flex flex-col items-center gap-4'
        aria-live='assertive'
        role='alert'
      >
        <div className='text-red-600 font-semibold'>Error: {error}</div>
        <button
          onClick={() => setRetryKey((k) => k + 1)}
          className='px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700'
          aria-label='Retry loading news'
        >
          Retry
        </button>
      </section>
    );
  }
  if (!universityNews || universityNews.length === 0)
    return <div>No university news available.</div>;

  // --- Main render with enhanced design ---
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <MetaTags
        title={metaheadline}
        description={metalead}
        image={metaImage}
        url={metaUrl}
        type='article'
      />

      <div className={compact ? 'px-4 py-6' : 'container mx-auto px-4 py-8'}>
        {/* Header Section */}
        {!compact && (
          <div className='mb-8 text-center'>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>
              University News
            </h1>
            <p className='text-gray-600 text-lg'>
              Stay updated with the latest news from Marinduque State University
            </p>
          </div>
        )}

        {/* Main Content Grid */}
        <div
          className={
            compact
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'grid grid-cols-1 lg:grid-cols-3 gap-8'
          }
        >
          {/* Enhanced Featured News Carousel */}
          {featuredNews.length > 0 && (
            <div className={compact ? 'md:col-span-1' : 'lg:col-span-2'}>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Featured News
                </h2>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={toggleAutoplay}
                    className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
                    title={
                      autoplayEnabled ? 'Pause autoplay' : 'Start autoplay'
                    }
                    aria-label={
                      autoplayEnabled ? 'Pause autoplay' : 'Start autoplay'
                    }
                  >
                    {autoplayEnabled ? (
                      <PauseIcon className='w-4 h-4' />
                    ) : (
                      <PlayIcon className='w-4 h-4' />
                    )}
                  </button>
                </div>
              </div>

              <div className='relative group'>
                <Swiper
                  ref={swiperRef}
                  modules={[Autoplay, Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={featuredNews.length > 1}
                  autoplay={
                    autoplayEnabled
                      ? {
                          delay: 5000,
                          disableOnInteraction: false,
                          pauseOnMouseEnter: true,
                        }
                      : false
                  }
                  navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  onSlideChange={(swiper) =>
                    setCurrentSlide(swiper.activeIndex)
                  }
                  className='featured-news-swiper'
                >
                  {featuredNews.map((news) => (
                    <SwiperSlide key={news.id}>
                      <article className='bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]'>
                        {news.imgUrl && (
                          <div className='relative overflow-hidden h-64 md:h-80'>
                            {imageLoading.has(news.id) && (
                              <div className='absolute inset-0 bg-gray-300 animate-pulse'></div>
                            )}
                            <img
                              src={news.imgUrl}
                              alt={news.headline?.[lang] || news.headline}
                              loading='lazy'
                              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                              onLoad={() => handleImageLoad(news.id)}
                              onError={() => handleImageLoad(news.id)}
                            />
                            {bookmarkedNews.has(news.id) && (
                              <div className='absolute top-4 right-4 bg-yellow-400 rounded-full p-2'>
                                <BookmarkSolidIcon className='w-5 h-5 text-white' />
                              </div>
                            )}
                            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
                          </div>
                        )}

                        <div className='p-6'>
                          <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center text-sm text-gray-500'>
                              <CalendarIcon className='w-4 h-4 mr-1' />
                              <time dateTime={news.date}>
                                {formatDate(news.date)}
                              </time>
                            </div>
                            <button
                              onClick={() => toggleBookmark(news.id)}
                              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                              aria-label={
                                bookmarkedNews.has(news.id)
                                  ? 'Remove bookmark'
                                  : 'Add bookmark'
                              }
                            >
                              {bookmarkedNews.has(news.id) ? (
                                <BookmarkSolidIcon className='w-5 h-5 text-yellow-500' />
                              ) : (
                                <BookmarkIcon className='w-5 h-5 text-gray-400 hover:text-yellow-500' />
                              )}
                            </button>
                          </div>

                          <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-3 hover:text-[var(--primary-600)] transition-colors'>
                            {news.headline?.[lang] || news.headline}
                          </h3>

                          <p className='text-gray-600 mb-4 leading-relaxed'>
                            {(news.lead?.[lang] || news.lead || '').slice(
                              0,
                              200
                            )}
                            {(news.lead?.[lang] || news.lead || '').length >
                              200 && '...'}
                          </p>

                          {news.author && (
                            <div className='flex items-center text-sm text-gray-500 mb-4'>
                              <UserIcon className='w-4 h-4 mr-1' />
                              <span>By {news.author}</span>
                            </div>
                          )}

                          {news.tags && news.tags.length > 0 && (
                            <div className='flex flex-wrap gap-2 mb-4'>
                              {news.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--primary-100)] text-[var(--primary-700)] hover:bg-[var(--primary-200)] transition-colors cursor-pointer'
                                  onClick={() => setSelectedTag(tag)}
                                >
                                  <TagIcon className='w-3 h-3 mr-1' />
                                  {tag}
                                </span>
                              ))}
                              {news.tags.length > 3 && (
                                <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600'>
                                  +{news.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          )}

                          <div className='flex items-center justify-between'>
                            <div className='flex gap-2'>
                              {news.articleUrl &&
                                (isInternalUrl(news.articleUrl) ? (
                                  <Link
                                    to={news.articleUrl}
                                    className='inline-flex items-center px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors font-medium'
                                  >
                                    Read More
                                  </Link>
                                ) : (
                                  <a
                                    href={news.articleUrl}
                                    className='inline-flex items-center px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors font-medium'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                  >
                                    Read More
                                  </a>
                                ))}
                            </div>

                            <button
                              className='flex items-center px-3 py-2 text-gray-600 hover:text-[var(--primary-600)] hover:bg-gray-50 rounded-lg transition-colors'
                              onClick={() => handleShare(news)}
                              title='Share this news'
                              aria-label={`Share ${news.headline?.[lang] || news.headline}`}
                            >
                              <ShareIcon className='w-4 h-4 mr-1' />
                              Share
                            </button>
                          </div>
                        </div>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                {featuredNews.length > 1 && (
                  <>
                    <button
                      className='swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                      aria-label='Previous slide'
                    >
                      <ChevronLeftIcon className='w-6 h-6 text-gray-700' />
                    </button>
                    <button
                      className='swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                      aria-label='Next slide'
                    >
                      <ChevronRightIcon className='w-6 h-6 text-gray-700' />
                    </button>
                  </>
                )}
              </div>

              {/* Slide indicators */}
              {featuredNews.length > 1 && (
                <div className='flex justify-center mt-4 gap-2'>
                  {featuredNews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        currentSlide === index
                          ? 'bg-[var(--primary-600)] scale-125'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Enhanced Latest News Sidebar */}
          <div className={compact ? 'md:col-span-1' : 'lg:col-span-1'}>
            <div className='sticky top-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Latest News
                </h2>
              </div>

              <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
                <div className='space-y-0 max-h-96 overflow-y-auto'>
                  {paginatedNews.length > 0 ? (
                    paginatedNews.map((news, index) => (
                      <article
                        key={news.id}
                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                          index !== paginatedNews.length - 1
                            ? 'border-b border-gray-100'
                            : ''
                        }`}
                      >
                        <div className='flex justify-between items-start mb-2'>
                          <time
                            className='text-xs text-gray-500'
                            dateTime={news.date}
                          >
                            {formatDate(news.date)}
                          </time>
                          <button
                            onClick={() => toggleBookmark(news.id)}
                            className='p-1 hover:bg-gray-100 rounded transition-colors'
                            aria-label={
                              bookmarkedNews.has(news.id)
                                ? 'Remove bookmark'
                                : 'Add bookmark'
                            }
                          >
                            {bookmarkedNews.has(news.id) ? (
                              <BookmarkSolidIcon className='w-4 h-4 text-yellow-500' />
                            ) : (
                              <BookmarkIcon className='w-4 h-4 text-gray-400 hover:text-yellow-500' />
                            )}
                          </button>
                        </div>

                        <h3 className='font-semibold text-gray-900 mb-2 hover:text-[var(--primary-600)] transition-colors'>
                          {news.headline?.[lang] || news.headline}
                        </h3>

                        <p className='text-sm text-gray-600 mb-3 leading-relaxed'>
                          {(news.lead?.[lang] || news.lead || '').slice(0, 100)}
                          {(news.lead?.[lang] || news.lead || '').length >
                            100 && '...'}
                        </p>

                        {news.author && (
                          <div className='flex items-center text-xs text-gray-500 mb-2'>
                            <UserIcon className='w-3 h-3 mr-1' />
                            <span>{news.author}</span>
                          </div>
                        )}

                        {news.tags && news.tags.length > 0 && (
                          <div className='flex flex-wrap gap-1 mb-3'>
                            {news.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className='inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600 hover:bg-[var(--primary-100)] hover:text-[var(--primary-700)] transition-colors cursor-pointer'
                                onClick={() => setSelectedTag(tag)}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className='flex items-center justify-between'>
                          {news.articleUrl &&
                            (isInternalUrl(news.articleUrl) ? (
                              <Link
                                to={news.articleUrl}
                                className='text-[var(--primary-600)] hover:text-[var(--primary-700)] font-medium text-sm transition-colors'
                              >
                                Read more
                              </Link>
                            ) : (
                              <a
                                href={news.articleUrl}
                                className='text-[var(--primary-600)] hover:text-[var(--primary-700)] font-medium text-sm transition-colors'
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                Read more
                              </a>
                            ))}

                          <button
                            className='text-xs text-gray-500 hover:text-[var(--primary-600)] transition-colors p-1'
                            onClick={() => handleShare(news)}
                            title='Share this news'
                            aria-label={`Share ${news.headline?.[lang] || news.headline}`}
                          >
                            <ShareIcon className='w-4 h-4' />
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className='p-6 text-center'>
                      <p className='text-gray-500'>No news to display</p>
                    </div>
                  )}
                </div>

                {/* Enhanced Pagination */}
                {sortedNews.length > pageSize && (
                  <div className='p-4 bg-gray-50 border-t border-gray-100'>
                    <div className='flex items-center justify-between'>
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className='flex items-center px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        aria-label='Previous page'
                      >
                        <ChevronLeftIcon className='w-4 h-4 mr-1' />
                        Previous
                      </button>

                      <div className='flex items-center space-x-2'>
                        <span className='text-sm text-gray-600'>
                          Page {page} of{' '}
                          {Math.ceil(sortedNews.length / pageSize)}
                        </span>
                      </div>

                      <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page * pageSize >= sortedNews.length}
                        className='flex items-center px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        aria-label='Next page'
                      >
                        Next
                        <ChevronRightIcon className='w-4 h-4 ml-1' />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Empty State */}
        {sortedNews.length === 0 && (
          <div className='text-center py-16'>
            <div className='text-gray-400 mb-6'>
              <svg
                className='w-24 h-24 mx-auto'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1}
                  d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>
              No News Available
            </h3>
            <p className='text-gray-500 max-w-md mx-auto'>
              {selectedTag !== 'all'
                ? `No news found in the "${selectedTag}" category. Try selecting a different category or view all news.`
                : 'No university news items are currently available. Check back later for updates.'}
            </p>
            {selectedTag !== 'all' && (
              <button
                onClick={() => setSelectedTag('all')}
                className='mt-4 px-6 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors'
              >
                View All News
              </button>
            )}
          </div>
        )}

        {/* Keyboard Navigation Help */}
        {!compact && (
          <div className='mt-8 text-center text-sm text-gray-500'>
            <p>
              💡 Use arrow keys to navigate carousel, spacebar to pause/play
              autoplay
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

UniversityNews.propTypes = {
  compact: PropTypes.bool,
};

export default UniversityNews;
