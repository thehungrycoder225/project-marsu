import { useColleges } from '../hooks/useColleges';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShareIcon } from '@heroicons/react/24/outline';
import MetaTags from './MetaTags';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function UniversityNews({ compact = false }) {
  const { universityNews, loading, error } = useColleges();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState('all');
  const pageSize = 5;
  const lang = 'en';

  // Extract unique tags from all news
  const allTags = Array.from(
    new Set(
      (universityNews || []).flatMap((news) => news.tags || []).filter(Boolean)
    )
  );

  // Filter by tag
  const tagFilteredNews =
    selectedTag === 'all'
      ? universityNews || []
      : (universityNews || []).filter((news) =>
          (news.tags || []).includes(selectedTag)
        );

  // Filter by search
  const filteredNews = tagFilteredNews.filter(
    (news) =>
      (news.title?.[lang] || news.title || '')
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (news.content?.[lang] || news.content || '')
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // Sort by date (desc)
  const sortedNews = [...filteredNews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Pagination
  const paginatedNews = sortedNews.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Featured news
  const featuredNews = sortedNews.filter((news) => news.isFeatured);

  // Social share handler
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

  // Helper to determine if articleUrl is internal
  const isInternalUrl = (url) => url && url.startsWith('/news/');

  // For meta tags, use the first featured or latest news as the primary article
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!universityNews || universityNews.length === 0)
    return <div>No university news available.</div>;

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
      {featuredNews.length > 0 && (
        <div className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Featured University News</h2>
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
      {/* News Search & Filters */}
      <div
        className={
          compact
            ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
            : 'container mx-auto grid grid-cols-2 md:grid-cols-3 gap-4'
        }
      >
        <div className='col-span-auto md:col-span-2'>
          <h2 className='text-2xl font-bold mb-4'>Latest News</h2>
          <div className='grid grid-cols-1 gap-4'>
            <div className='overflow-y-auto max-h-96'>
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
