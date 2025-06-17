// import { m } from 'framer-motion';
// import { P } from 'storybook/internal/components';
import { useColleges } from '../hooks/useColleges';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NewsEvents({ collegeKey }) {
  const { colleges, loading, error } = useColleges();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const lang = 'en';

  // Find the college by slug/shortName/id (support both string and object for shortName)
  const college = colleges.find(
    (col) =>
      col.slug === collegeKey ||
      (typeof col.shortName === 'object' &&
        Object.values(col.shortName).includes(collegeKey)) ||
      col.shortName === collegeKey ||
      String(col.id) === collegeKey
  );

  // News array should be in college.news or similar (adjust as needed)
  const allNews = college && college.news ? college.news : [];

  // Filter by search
  const filteredNews = allNews.filter(
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

  // Social share handler (basic)
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
  const isInternalUrl = (url) => url && url.startsWith('/colleges/');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!college) return <div>No news found for this college.</div>;

  return (
    <>
      {/* <div className='mb-4 flex flex-col md:flex-row gap-2 items-start md:items-center'>
        <input
          type='text'
          placeholder='Search news...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border px-2 py-1 rounded w-full md:w-64'
        />
      </div> */}
      <div className='container mx-auto grid grid-cols-2 md:grid-cols-3 gap-4'>
        <div className='col-span-auto md:col-span-2'>
          <h2 className='text-2xl font-bold mb-4'>Featured</h2>
          <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
            {featuredNews.length > 0 ? (
              featuredNews.map((news) => (
                <div key={news.id} className='relative'>
                  {news.imgUrl && (
                    <img
                      src={news.imgUrl}
                      alt={news.title?.[lang] || news.title}
                      className='w-full h-60 object-cover mb-4 aspect-ratio-16/9 rounded'
                    />
                  )}
                  <h3 className='text-lg font-semibold mb-2'>
                    {news.title?.[lang] || news.title}
                  </h3>
                  <p className='text-gray-600 mb-2 text-sm'>
                    {news.description?.[lang].slice(0, 150) + '...' ||
                      news.description.slice(0, 150) + '...'}
                  </p>
                  {news.author && (
                    <p className='text-xs text-gray-500 my-2'>
                      By {news.author}
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
                        className='text-blue-500 text text-sm hover:underline mr-2'
                      >
                        Read more
                      </Link>
                    ) : (
                      <a
                        href={news.articleUrl}
                        className='text-blue-500 hover:underline mr-2'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Read more
                      </a>
                    ))}
                  <button
                    className='text-xs text-blue-700 underline ml-2'
                    onClick={() => handleShare(news)}
                  >
                    Share
                  </button>
                  {/* Expand/collapse details */}
                  {news.fullContent && (
                    <details className='mt-2'>
                      <summary className='cursor-pointer text-xs text-gray-500'>
                        Show more
                      </summary>
                      <div className='text-sm'>
                        {news.fullContent?.[lang] || news.fullContent}
                      </div>
                    </details>
                  )}
                </div>
              ))
            ) : (
              <p>No featured news to display.</p>
            )}
          </div>
        </div>
        <div>
          <h2 className='text-2xl font-bold mb-4'>Latest News</h2>
          <div className='grid grid-cols-1 gap-4'>
            <div className='overflow-y-auto max-h-96'>
              {paginatedNews.length > 0 ? (
                paginatedNews.map((news) => (
                  <div key={news.id} className='mb-4 p-2 border-b'>
                    <h3 className='text-lg font-semibold mb-2'>
                      {news.title?.[lang] || news.title}
                    </h3>
                    <p className='text-gray-600 mb-2 text-sm'>
                      {news.description?.[lang] || news.description}
                    </p>
                    {news.author && (
                      <p className='text-xs text-gray-500'>By {news.author}</p>
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
                          className='text-blue-500 hover:underline mr-2'
                        >
                          Read more
                        </Link>
                      ) : (
                        <a
                          href={news.articleUrl}
                          className='text-blue-500 hover:underline mr-2'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Read more
                        </a>
                      ))}
                    <button
                      className='text-xs text-blue-700 underline ml-2'
                      onClick={() => handleShare(news)}
                    >
                      Share
                    </button>
                    {news.fullContent && (
                      <details className='mt-2'>
                        <summary className='cursor-pointer text-xs text-gray-500'>
                          Show more
                        </summary>
                        <div className='text-sm'>
                          {news.fullContent?.[lang] || news.fullContent}
                        </div>
                      </details>
                    )}
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
          No news items available for this college.
        </p>
      )}
    </>
  );
}
NewsEvents.propTypes = {
  collegeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default NewsEvents;
