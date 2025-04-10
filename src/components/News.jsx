import { m } from 'framer-motion';
import { P } from 'storybook/internal/components';

function NewsEvents({ collegeKey }) {
  // Mock data for College News
  const mockCollegeNews = {
    cics: [
      {
        id: 1,
        imgUrl: 'https://placehold.co/600x400',
        title: 'New Research Lab Inaugurated',
        date: '2025-04-01',
        content:
          'The College of Information and Computing Sciences has inaugurated a new state-of-the-art research lab to foster innovation.',
        articleUrl: 'https://example.com/news1', // Added articleUrl for consistency nested in the college url
        isFeatured: true,
      },
      {
        id: 2,
        imgUrl: 'https://placehold.co/600x400', // Added imgUrl for consistency
        title: 'Annual Science Fair Announced',
        date: '2025-03-15',
        content:
          'The annual science fair will be held on May 10th, showcasing projects from students and faculty.',
        articleUrl: 'https://example.com/news2', // Added articleUrl for consistency

        isFeatured: false,
      },

      {
        id: 3,
        imgUrl: 'https://placehold.co/600x400',
        title: 'Guest Lecture on AI',
        date: '2025-02-20',
        content:
          'A guest lecture on the latest advancements in AI will be held on March 5th.',
        articleUrl: 'https://example.com/news3',
        isFeatured: false,
      },
    ],
    cass: [
      {
        id: 1,
        title: 'Summit on Media and Technology',
        date: '2025-03-20',
        content:
          'The College of Arts and Social Sciences will host a summit on media and technology on March 20th.',
        imgUrl: '',
        isFeatured: false,
      },
      {
        id: 2,
        title: 'Theater Workshop',
        date: '2025-02-28',
        content:
          'A workshop on Theater will be conducted by alumni  on March 5th.',
        imgUrl: '',
        isFeatured: false,
      },
      {
        id: 3,
        title: 'Art Exhibition 2025',
        date: '2025-04-15',
        content:
          'The College of Arts and Social Sciences will hold an art exhibition showcasing student works on April 15th.',
        imgUrl: '',
        isFeatured: false,
      },
    ],
  };
  return (
    <div className='p-6'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6'>News</h2>
      {/* Featured News Section */}
      <div className='featured-news mb-8'>
        {!collegeKey ||
        !mockCollegeNews[collegeKey] ||
        mockCollegeNews[collegeKey].length === 0 ? (
          <p className='text-gray-600'>No news available</p>
        ) : (
          mockCollegeNews[collegeKey].map((news) => {
            if (news.isFeatured) {
              return (
                <div
                  key={news.id}
                  className='news-item bg-white  rounded-lg overflow-hidden mb-6'
                >
                  {news.imgUrl && (
                    <img
                      src={news.imgUrl}
                      alt={news.title}
                      className='w-full h-64 object-cover'
                    />
                  )}
                  <div className='py-6'>
                    <h3 className='text-2xl font-semibold text-gray-800 mb-2'>
                      {news.title}
                    </h3>
                    <p className='text-gray-600 mb-4'>{news.content}</p>
                    <a
                      href={news.articleUrl}
                      className='text-blue-500 hover:underline font-medium'
                    >
                      Read more
                    </a>
                  </div>
                </div>
              );
            }
            return null;
          })
        )}
      </div>

      {/* Related Articles Section */}
      <div className='related-articles grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {!mockCollegeNews[collegeKey] ||
        mockCollegeNews[collegeKey].length === 0
          ? null
          : mockCollegeNews[collegeKey].map((news) => {
              if (!news.isFeatured) {
                return (
                  <div
                    key={news.id}
                    className='news-item bg-white rounded-lg overflow-hidden'
                  >
                    {news.imgUrl && (
                      <img
                        src={news.imgUrl}
                        alt={news.title}
                        className='w-full h-40 object-cover'
                      />
                    )}
                    <div className='py-4'>
                      <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                        {news.title}
                      </h3>
                      <p className='text-gray-600 text-sm mb-3'>
                        {news.content}
                      </p>
                      <a
                        href={news.articleUrl}
                        className='text-blue-500 hover:underline text-sm font-medium'
                      >
                        Read more
                      </a>
                    </div>
                  </div>
                );
              }
              return null;
            })}
      </div>
    </div>
  );
}

export default NewsEvents;
