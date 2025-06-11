import { useParams, Link, useNavigate } from 'react-router-dom';
import { useColleges } from '../../hooks/useColleges';

function NewsDetail() {
  const { collegeKey, newsId } = useParams();
  const { colleges, loading, error } = useColleges();
  const lang = 'en';
  const navigate = useNavigate();

  // Defensive: Wait for colleges to load before searching
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!colleges || colleges.length === 0)
    return <div>No college data available.</div>;

  // Find the college robustly
  const college = colleges.find(
    (col) =>
      col.slug === collegeKey ||
      (typeof col.shortName === 'object' &&
        Object.values(col.shortName).includes(collegeKey)) ||
      (typeof col.shortName === 'string' && col.shortName === collegeKey) ||
      String(col.id) === collegeKey
  );
  if (!college) return <div>College not found.</div>;

  // Defensive: Check for news array
  const newsArray = Array.isArray(college.news) ? college.news : [];
  const news = newsArray.find((n) => String(n.id) === String(newsId));
  if (!news) return <div>Article not found.</div>;

  // SEO meta tags (optional, for frameworks that support it)
  // document.title = news.title?.[lang] || news.title;

  return (
    <div className='max-w-3xl mx-auto py-8 px-4'>
      <button onClick={() => navigate(-1)} className='mb-4 text-blue-500'>
        &larr; Back
      </button>
      <h1 className='text-3xl font-bold mb-2'>
        {news.title?.[lang] || news.title}
      </h1>
      <div className='text-gray-500 text-sm mb-2'>
        {news.date} {news.author && `| ${news.author}`}
      </div>
      {news.tags && news.tags.length > 0 && (
        <div className='flex flex-wrap gap-1 mb-2'>
          {news.tags.map((tag) => (
            <span key={tag} className='bg-gray-200 text-xs px-2 py-1 rounded'>
              {tag}
            </span>
          ))}
        </div>
      )}
      {news.imgUrl && (
        <img
          src={news.imgUrl}
          alt={news.title?.[lang] || news.title}
          className='w-full h-64 object-cover rounded mb-4'
        />
      )}
      <div className='prose mb-4'>{news.content?.[lang] || news.content}</div>
      {/* Social sharing */}
      <div className='mb-4'>
        <button
          className='text-xs text-blue-700 underline mr-2'
          onClick={() => {
            const url = window.location.href;
            if (navigator.share) {
              navigator.share({ title: news.title?.[lang] || news.title, url });
            } else {
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
              );
            }
          }}
        >
          Share
        </button>
      </div>
      {/* Related articles */}
      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-2'>Related Articles</h2>
        <ul>
          {newsArray
            .filter((n) => String(n.id) !== String(news.id))
            .slice(0, 3)
            .map((related) => (
              <li key={related.id} className='mb-2'>
                <Link
                  to={`/colleges/${college.slug || college.shortName || college.id}/news/${related.id}`}
                  className='text-blue-500 hover:underline'
                >
                  {related.title?.[lang] || related.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default NewsDetail;
