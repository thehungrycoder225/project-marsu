import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShareIcon } from '@heroicons/react/24/outline';
import MetaTags from './MetaTags';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Skeleton from './Skeleton';

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
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState('all');
  const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);
  const pageSize = 5;
  const lang = 'en';

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
        .catch((err) => {
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

  // Tag/search/filter/sort logic
  const allTags = Array.from(
    new Set(
      (universityNews || []).flatMap((news) => news.tags || []).filter(Boolean)
    )
  );
  const tagFilteredNews =
    selectedTag === 'all'
      ? universityNews || []
      : (universityNews || []).filter((news) =>
          (news.tags || []).includes(selectedTag)
        );
  const filteredNews = tagFilteredNews.filter(
    (news) =>
      (news.title?.[lang] || news.title || '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (news.content?.[lang] || news.content || '')
        .toLowerCase()
        .includes(search.toLowerCase())
  );
  const sortedNews = [...filteredNews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const paginatedNews = sortedNews.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const featuredNews = sortedNews.filter((news) => news.isFeatured);

  // Meta/share logic
  const handleShare = (news) => {
    const url = news.articleUrl || window.location.href;
    if (navigator.share) {
      navigator.share({ title: news.title?.[lang] || news.title, url });
    } else {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      );
    }
  };
  const isInternalUrl = (url) => url && url.startsWith('/news/');
  const metaNews = featuredNews[0] || sortedNews[0];
  const metaTitle =
    metaNews?.metaTitle ||
    metaNews?.title?.[lang] ||
    metaNews?.title ||
    'University News | Marinduque State University';
  const metaDescription =
    metaNews?.metaDescription ||
    metaNews?.description?.[lang] ||
    metaNews?.description ||
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
          <Skeleton width='100%' height='7rem' className='mb-2 rounded-lg' />
          <Skeleton width='100%' height='7rem' className='mb-2 rounded-lg' />
          <Skeleton width='100%' height='7rem' className='mb-2 rounded-lg' />
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

  // --- Main render (unchanged, but you can further tweak for mobile) ---
  return (
    <>
      <MetaTags
        title={metaTitle}
        description={metaDescription}
        image={metaImage}
        url={metaUrl}
        type='article'
      />
      {/* Tag Filter UI */}
      {/* <div className='mb-4 flex flex-wrap gap-2 items-center'>
        <span className='font-semibold'>Filter by tag:</span>
        <button
          onClick={() => setSelectedTag('all')}
          className={`px-2 py-1 rounded ${selectedTag === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-2 py-1 rounded ${selectedTag === tag ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            {tag}
          </button>
        ))}
      </div> */}
      {/* University News Carousel (Featured) */}

      {/* News Search & Filters */}
      <div
        className={
          compact
            ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
            : 'container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4'
        }
      >
        {featuredNews.length > 0 && (
          <div className='mb-8 sm:col-span-auto md:col-span-2'>
            <h2 className='text-2xl font-bold mb-4'>
              Featured University News
            </h2>
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              loop={true}
              className='rounded-lg shadow-lg'
            >
              {featuredNews.map((news) => (
                <SwiperSlide key={news.id}>
                  <div className='relative bg-white rounded-lg p-4 flex flex-col md:flex-row gap-4'>
                    {news.imgUrl && (
                      <img
                        src={news.imgUrl}
                        alt={news.title?.[lang] || news.title}
                        loading='lazy'
                        className='w-full md:w-1/3 h-48 object-cover rounded-lg mb-2 md:mb-0'
                      />
                    )}
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold mb-2'>
                        {news.title?.[lang] || news.title}
                      </h3>
                      <p className='text-gray-600 mb-2 text-sm'>
                        {news.description?.[lang]?.slice(0, 150) + '...' ||
                          news.description?.slice(0, 150) + '...'}
                      </p>
                      {news.author && (
                        <p className='text-xs text-gray-500 my-2'>
                          By {news.author} | {news.date}
                        </p>
                      )}
                      {news.tags && news.tags.length > 0 && (
                        <div className='flex flex-wrap gap-1 mb-2'>
                          {news.tags.map((tag) => (
                            <span
                              key={tag}
                              className='bg-gray-200 text-xs px-2 py-1 rounded'
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {news.articleUrl &&
                        (isInternalUrl(news.articleUrl) ? (
                          <Link
                            to={news.articleUrl}
                            className='text-[var(--primary-700)] font-bold text-sm hover:underline mr-2'
                          >
                            Read more
                          </Link>
                        ) : (
                          <a
                            href={news.articleUrl}
                            className='text-[var(--primary-700)] hover:underline mr-2'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            Read more
                          </a>
                        ))}
                      <button
                        className='text-xs text-gray-900 hover:text-gray-700 underline ml-2'
                        onClick={() => handleShare(news)}
                        title='Share this news'
                      >
                        <ShareIcon className='inline-block w-4 h-4 mr-1' />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        <div className='sm:col-span-auto md:col-span-1'>
          <h2 className='text-2xl font-bold mb-4'>Latest News</h2>
          <div className='grid grid-cols-1 gap-4'>
            <div className='overflow-y-auto max-h-60'>
              {paginatedNews.length > 0 ? (
                paginatedNews.map((news) => (
                  <div
                    key={news.id}
                    className={
                      compact ? 'mb-2 p-1 border-b' : 'mb-4 p-2 border-b'
                    }
                  >
                    {news.imgUrl && (
                      <img
                        src={news.imgUrl}
                        alt={news.title?.[lang] || news.title}
                        loading='lazy'
                        className={
                          compact
                            ? 'w-full h-32 object-cover mb-2 rounded'
                            : 'w-full h-60 object-cover mb-4 aspect-ratio-16/9 rounded'
                        }
                      />
                    )}
                    <h3
                      className={
                        compact
                          ? 'text-base font-bold mb-1'
                          : 'text-lg font-bold mb-2'
                      }
                    >
                      {news.title?.[lang] || news.title}
                    </h3>
                    <p className='text-gray-600 mb-2 text-sm'>
                      {news.description?.[lang] || news.description}
                    </p>
                    {news.author && (
                      <p className='text-xs text-gray-500 mb-2'>
                        By {news.author} | {news.date}
                      </p>
                    )}
                    {news.tags && news.tags.length > 0 && (
                      <div className='flex flex-wrap gap-1 mb-2'>
                        {news.tags.map((tag) => (
                          <span
                            key={tag}
                            className='bg-gray-200 text-xs px-2 py-1 rounded'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {news.articleUrl &&
                      (isInternalUrl(news.articleUrl) ? (
                        <Link
                          to={news.articleUrl}
                          className='text-[var(--primary-700)] font-bold text-sm hover:underline mr-2'
                        >
                          Read more
                        </Link>
                      ) : (
                        <a
                          href={news.articleUrl}
                          className='text-[var(--primary-700)] hover:underline mr-2'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Read more
                        </a>
                      ))}
                    <button
                      className='text-xs text-gray-900 hover:text-gray-700 underline ml-2'
                      onClick={() => handleShare(news)}
                      title='Share this news'
                    >
                      <ShareIcon className='inline-block w-4 h-4 mr-1' />
                    </button>
                  </div>
                ))
              ) : (
                <p>No news to display.</p>
              )}
            </div>
            {/* Pagination */}
            {sortedNews.length > pageSize && (
              <div className='flex gap-2 mt-2'>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className='px-2 py-1 border rounded disabled:opacity-50'
                >
                  Previous
                </button>
                <span className='text-sm'>Page {page}</span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page * pageSize >= sortedNews.length}
                  className='px-2 py-1 border rounded disabled:opacity-50'
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {sortedNews.length === 0 && (
        <p className='text-gray-500 mt-4'>
          No university news items available.
        </p>
      )}
    </>
  );
}

export default UniversityNews;
