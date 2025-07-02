import { useColleges } from '../hooks/useColleges';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ShareIcon,
  BookmarkIcon,
  TagIcon,
  CalendarIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

function NewsEvents({ collegeKey }) {
  const { colleges, loading, error } = useColleges();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [bookmarkedNews, setBookmarkedNews] = useState(new Set());
  const [imageLoading, setImageLoading] = useState(new Set());
  const [isInfiniteScrolling, setIsInfiniteScrolling] = useState(false);
  const [expandedNews, setExpandedNews] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const pageSize = 5;
  const lang = 'en';

  // Memoize college lookup for performance
  const college = useMemo(
    () =>
      colleges.find(
        (col) =>
          col.slug === collegeKey ||
          (typeof col.shortName === 'object' &&
            Object.values(col.shortName).includes(collegeKey)) ||
          col.shortName === collegeKey ||
          String(col.id) === collegeKey
      ),
    [colleges, collegeKey]
  );

  // Memoize news data processing
  const { categories, sortedNews, featuredNews } = useMemo(() => {
    const newsData = college && college.news ? college.news : [];

    // Extract unique categories
    const uniqueCategories = [
      ...new Set(newsData.flatMap((news) => news.tags || [])),
    ];

    // Filter by category only (search removed for now)
    const filtered = newsData.filter((news) => {
      const matchesCategory =
        !selectedCategory ||
        (news.tags && news.tags.includes(selectedCategory));

      return matchesCategory;
    });

    // Sort by date (desc)
    const sorted = [...filtered].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Featured news
    const featured = sorted.filter((news) => news.isFeatured);

    return {
      categories: uniqueCategories,
      sortedNews: sorted,
      featuredNews: featured,
    };
  }, [college, selectedCategory]);

  // Infinite scroll implementation
  const displayedNews = useMemo(() => {
    if (isInfiniteScrolling) {
      return sortedNews.slice(0, page * pageSize);
    }
    return sortedNews.slice((page - 1) * pageSize, page * pageSize);
  }, [sortedNews, page, pageSize, isInfiniteScrolling]);

  // Bookmark functionality
  const toggleBookmark = useCallback((newsId) => {
    setBookmarkedNews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(newsId)) {
        newSet.delete(newsId);
      } else {
        newSet.add(newsId);
      }
      // Save to localStorage
      localStorage.setItem('bookmarkedNews', JSON.stringify([...newSet]));
      return newSet;
    });
  }, []);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedNews');
    if (saved) {
      setBookmarkedNews(new Set(JSON.parse(saved)));
    }
  }, []);

  // Image loading handler
  const handleImageLoad = useCallback((newsId) => {
    setImageLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(newsId);
      return newSet;
    });
  }, []);

  // Enhanced share handler with better error handling
  const handleShare = useCallback(
    async (news) => {
      const url = news.articleUrl || window.location.href;
      const title = news.title?.[lang] || news.title;

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

  // Helper to determine if articleUrl is internal
  const isInternalUrl = useCallback(
    (url) => url && url.startsWith('/colleges/'),
    []
  );

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

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className='animate-pulse'>
      <div className='h-60 bg-gray-300 rounded mb-4'></div>
      <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
      <div className='h-4 bg-gray-300 rounded w-1/2 mb-2'></div>
      <div className='h-3 bg-gray-300 rounded w-1/4'></div>
    </div>
  );

  if (loading) {
    return (
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-2'>
          <div className='h-8 bg-gray-300 rounded w-32 mb-4 animate-pulse'></div>
          <SkeletonLoader />
        </div>
        <div>
          <div className='h-8 bg-gray-300 rounded w-32 mb-4 animate-pulse'></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='mb-4 p-4 border-b animate-pulse'>
              <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
              <div className='h-3 bg-gray-300 rounded w-1/2 mb-2'></div>
              <div className='h-3 bg-gray-300 rounded w-1/4'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto p-6 text-center'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
          <h3 className='text-lg font-semibold text-red-800 mb-2'>
            Unable to Load News
          </h3>
          <p className='text-red-600 mb-4'>
            We&apos;re having trouble loading the news content. Please try again
            later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className='container mx-auto p-6 text-center'>
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
          <h3 className='text-lg font-semibold text-yellow-800 mb-2'>
            College Not Found
          </h3>
          <p className='text-yellow-600'>
            No news content is available for this college at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      {/* Header Section with Filters */}
      <div className='container mx-auto px-4 py-6'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            {college.name?.[lang] || college.name} News
          </h1>
          <p className='text-gray-600'>
            Stay updated with the latest news and events
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className='mb-6'>
            <div className='flex flex-wrap gap-2'>
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  !selectedCategory
                    ? 'bg-[var(--primary-600)] text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-300 hover:border-[var(--primary-300)] hover:text-[var(--primary-600)]'
                }`}
              >
                All News
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-[var(--primary-600)] text-white shadow-lg'
                      : 'bg-white text-gray-600 border border-gray-300 hover:border-[var(--primary-300)] hover:text-[var(--primary-600)]'
                  }`}
                >
                  <TagIcon className='w-4 h-4 inline mr-1' />
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Featured News Section */}
          <div className='lg:col-span-2'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold text-gray-900'>
                Featured News
              </h2>
              <div className='h-0.5 bg-gradient-to-r from-[var(--primary-500)] to-transparent flex-1 ml-4'></div>
            </div>

            <div className='space-y-8'>
              {featuredNews.length > 0 ? (
                featuredNews.map((news, index) => (
                  <article
                    key={news.id}
                    className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                      index === 0 ? 'border-2 border-[var(--primary-200)]' : ''
                    }`}
                    role='article'
                    aria-labelledby={`featured-news-${news.id}`}
                  >
                    {news.imgUrl && (
                      <div className='relative overflow-hidden'>
                        {imageLoading.has(news.id) && (
                          <div className='absolute inset-0 bg-gray-300 animate-pulse'></div>
                        )}
                        <img
                          src={news.imgUrl}
                          alt={news.title?.[lang] || news.title}
                          className='w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500'
                          loading='lazy'
                          onLoad={() => handleImageLoad(news.id)}
                          onError={() => handleImageLoad(news.id)}
                        />
                        {bookmarkedNews.has(news.id) && (
                          <div className='absolute top-4 right-4 bg-yellow-400 rounded-full p-2'>
                            <BookmarkSolidIcon className='w-5 h-5 text-white' />
                          </div>
                        )}
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

                      <h3
                        id={`featured-news-${news.id}`}
                        className='text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[var(--primary-600)] transition-colors'
                      >
                        {news.title?.[lang] || news.title}
                      </h3>

                      <p className='text-gray-600 mb-4 leading-relaxed'>
                        {(
                          news.description?.[lang] ||
                          news.description ||
                          ''
                        ).slice(0, 200)}
                        {(news.description?.[lang] || news.description || '')
                          .length > 200 && '...'}
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
                              onClick={() => setSelectedCategory(tag)}
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
                          aria-label={`Share ${news.title?.[lang] || news.title}`}
                        >
                          <ShareIcon className='w-4 h-4 mr-1' />
                          Share
                        </button>
                      </div>

                      {news.fullContent && (
                        <details className='mt-4'>
                          <summary className='cursor-pointer text-sm text-[var(--primary-600)] hover:text-[var(--primary-700)] font-medium'>
                            Show full content
                          </summary>
                          <div className='mt-3 p-4 bg-gray-50 rounded-lg text-sm leading-relaxed'>
                            {news.fullContent?.[lang] || news.fullContent}
                          </div>
                        </details>
                      )}
                    </div>
                  </article>
                ))
              ) : (
                <div className='text-center py-12'>
                  <div className='text-gray-400 mb-4'>
                    <svg
                      className='w-16 h-16 mx-auto'
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
                  <p className='text-gray-500 text-lg'>
                    No featured news to display
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Latest News Sidebar */}
          <div className='lg:col-span-1'>
            <div className='sticky top-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Latest News
                </h2>
                <button
                  onClick={() => setIsInfiniteScrolling(!isInfiniteScrolling)}
                  className='text-sm text-[var(--primary-600)] hover:text-[var(--primary-700)] font-medium'
                  title={
                    isInfiniteScrolling
                      ? 'Switch to pagination'
                      : 'Switch to infinite scroll'
                  }
                >
                  {isInfiniteScrolling ? 'Pagination' : 'Infinite'}
                </button>
              </div>

              <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
                <div
                  className={`space-y-0 ${isInfiniteScrolling ? 'max-h-96 overflow-y-auto' : ''}`}
                >
                  {displayedNews.length > 0 ? (
                    displayedNews.map((news, index) => (
                      <article
                        key={news.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          index !== displayedNews.length - 1
                            ? 'border-b border-gray-100'
                            : ''
                        }`}
                        role='article'
                        aria-labelledby={`latest-news-${news.id}`}
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

                        <h3
                          id={`latest-news-${news.id}`}
                          className='font-semibold text-gray-900 mb-2 hover:text-[var(--primary-600)] transition-colors cursor-pointer'
                        >
                          {news.title?.[lang] || news.title}
                        </h3>

                        <p className='text-sm text-gray-600 mb-3 leading-relaxed'>
                          {(
                            news.description?.[lang] ||
                            news.description ||
                            ''
                          ).slice(0, 100)}
                          {(news.description?.[lang] || news.description || '')
                            .length > 100 && '...'}
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
                                onClick={() => setSelectedCategory(tag)}
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
                            aria-label={`Share ${news.title?.[lang] || news.title}`}
                          >
                            <ShareIcon className='w-4 h-4' />
                          </button>
                        </div>

                        {news.fullContent && (
                          <details className='mt-2'>
                            <summary className='cursor-pointer text-xs text-[var(--primary-600)] hover:text-[var(--primary-700)] font-medium'>
                              Show more
                            </summary>
                            <div className='mt-2 p-3 bg-gray-50 rounded text-xs leading-relaxed'>
                              {news.fullContent?.[lang] || news.fullContent}
                            </div>
                          </details>
                        )}
                      </article>
                    ))
                  ) : (
                    <div className='p-6 text-center'>
                      <p className='text-gray-500'>No news to display</p>
                    </div>
                  )}
                </div>

                {/* Enhanced Pagination */}
                {!isInfiniteScrolling && sortedNews.length > pageSize && (
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

                {/* Load More for Infinite Scroll */}
                {isInfiniteScrolling &&
                  displayedNews.length < sortedNews.length && (
                    <div className='p-4 bg-gray-50 border-t border-gray-100'>
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        className='w-full px-4 py-2 text-sm bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors'
                      >
                        Load More News
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
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
              {selectedCategory
                ? `No news found in the "${selectedCategory}" category. Try selecting a different category or view all news.`
                : 'No news items are currently available for this college. Check back later for updates.'}
            </p>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory('')}
                className='mt-4 px-6 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors'
              >
                View All News
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
NewsEvents.propTypes = {
  collegeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default NewsEvents;
