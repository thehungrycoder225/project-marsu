import { useParams, Link } from 'react-router-dom';
import { useColleges } from '../hooks/useColleges';
import MetaTags from './MetaTags';
import { ShareIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function UniversityNewsDetail() {
  const { newsId } = useParams();
  const { universityNews, loading, error } = useColleges();
  const [lang, setLang] = useState('en');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const news = (universityNews || []).find(
    (n) => String(n.id) === String(newsId)
  );

  if (!news) return <div>News article not found.</div>;

  const metaTitle =
    news.metaTitle || news.title?.[lang] || news.title || 'University News';
  const metaDescription =
    news.metaDescription || news.description?.[lang] || news.description || '';
  const metaImage = news.metaImage || news.imgUrl || '/logo.png';
  const metaUrl = news.articleUrl || window.location.href;

  const handleShare = () => {
    const url = news.articleUrl || window.location.href;
    if (navigator.share) {
      navigator.share({ title: news.title?.[lang] || news.title, url });
    } else {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      );
    }
  };

  return (
    <div className='max-w-3xl mx-auto py-8 px-4'>
      <MetaTags
        title={metaTitle}
        description={metaDescription}
        image={metaImage}
        url={metaUrl}
        type='article'
      />
      <Link
        to='/'
        className='text-primary-700 hover:underline mb-4 inline-block'
      >
        &larr; Back to Homepage
      </Link>
      <div className='flex justify-between items-center mb-2'>
        <h1 className='text-3xl font-bold mb-2'>
          {news.title?.[lang] || news.title}
        </h1>
        <button
          className='text-xs text-gray-900 hover:text-gray-700 underline ml-2'
          onClick={handleShare}
          title='Share this news'
        >
          <ShareIcon className='inline-block w-5 h-5 mr-1' /> Share
        </button>
      </div>
      <div className='text-sm text-gray-500 mb-4'>
        {news.author && <span>By {news.author}</span>}{' '}
        {news.date && <span> | {news.date}</span>}
      </div>
      {news.imgUrl && (
        <img
          src={news.imgUrl}
          alt={news.title?.[lang] || news.title}
          className='w-full h-64 object-cover rounded mb-4'
          loading='lazy'
        />
      )}
      {news.tags && news.tags.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-4'>
          {news.tags.map((tag) => (
            <span key={tag} className='bg-gray-200 text-xs px-2 py-1 rounded'>
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className='prose max-w-none mb-6'>
        <p>{news.description?.[lang] || news.description}</p>
        <div className='mt-4 whitespace-pre-line'>
          {news.content?.[lang] || news.content}
        </div>
      </div>
      {/* Language toggle if multi-language is available */}
      {news.title?.fil && (
        <div className='mb-4'>
          <button
            onClick={() => setLang(lang === 'en' ? 'fil' : 'en')}
            className='px-3 py-1 rounded bg-primary-600 text-white text-xs'
          >
            {lang === 'en' ? 'Tingnan sa Filipino' : 'View in English'}
          </button>
        </div>
      )}

      {/* Gallery */}
      {news.gallery && news.gallery.length > 0 && (
        <div className='mb-4'>
          <h2 className='text-xl font-bold mb-2'>Gallery</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {news.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery image ${index + 1}`}
                className='w-full h-64 object-cover rounded'
                loading='lazy'
              />
            ))}
          </div>
        </div>
      )}
      {/* Related news */}
      <hr className='my-8' />
      <h2 className='text-xl font-bold mb-4'>Related News</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {(universityNews || [])
          .filter((n) => n.id !== news.id)
          .slice(0, 4)
          .map((related) => (
            <Link
              key={related.id}
              to={`/news/${related.id}`}
              className='block bg-white rounded-lg shadow p-4 hover:shadow-md transition'
            >
              <h3 className='font-semibold mb-1'>
                {related.title?.[lang] || related.title}
              </h3>
              <p className='text-xs text-gray-500 mb-1'>{related.date}</p>
              <p className='text-sm'>
                {related.description?.[lang]?.slice(0, 80) ||
                  related.description?.slice(0, 80)}
                ...
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default UniversityNewsDetail;
