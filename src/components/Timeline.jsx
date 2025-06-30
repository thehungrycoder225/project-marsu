import { useScrollAnimation } from '../hooks/useScrollAnimation';
import PropTypes from 'prop-types';

const Timeline = ({ content, title = 'History' }) => {
  const [timelineRef, isVisible] = useScrollAnimation();

  // Parse the content into timeline items (assuming it's structured with years or periods)
  const parseTimelineContent = (text) => {
    if (!text) return [];

    // Split by common patterns for years (e.g., "1985", "In 1990", etc.)
    const yearPattern = /(\b(?:19|20)\d{2}\b|In \d{4}|Since \d{4})/gi;
    const sections = text
      .split(yearPattern)
      .filter((section) => section.trim());

    const timelineItems = [];
    for (let i = 0; i < sections.length; i += 2) {
      const year = sections[i]?.trim();
      const description = sections[i + 1]?.trim();

      if (year && description) {
        timelineItems.push({
          year: year.replace(/^In\s+/i, '').replace(/^Since\s+/i, ''),
          description: description,
        });
      }
    }

    // If no year patterns found, create a single timeline item
    if (timelineItems.length === 0 && text.trim()) {
      timelineItems.push({
        year: 'Established',
        description: text.trim(),
      });
    }

    return timelineItems;
  };

  const timelineItems = parseTimelineContent(content);

  if (!content || timelineItems.length === 0) {
    return (
      <section className='mb-8' aria-labelledby='history-heading'>
        <h2
          id='history-heading'
          className='text-2xl font-bold mb-4 text-primary-700 border-b-2 border-primary-200 pb-2'
        >
          {title}
        </h2>
        <div className='bg-white/80 backdrop-blur rounded-lg shadow-md p-6 border border-white/20'>
          <p className='text-gray-700 leading-relaxed whitespace-pre-line'>
            {content}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={timelineRef}
      className={`mb-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      aria-labelledby='history-heading'
      id='history-section'
    >
      <h2
        id='history-heading'
        className='text-2xl font-bold mb-6 text-primary-700 border-b-2 border-primary-200 pb-2'
      >
        {title}
      </h2>

      <div className='relative bg-white/80 backdrop-blur rounded-lg shadow-md p-6 border border-white/20'>
        {/* Timeline line */}
        <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200'></div>

        <div className='space-y-8'>
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-start gap-6 transition-all duration-700 delay-${index * 100} ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4'
              }`}
            >
              {/* Timeline dot */}
              <div className='relative z-10 flex-shrink-0'>
                <div className='w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-md'></div>
                {/* Pulse animation */}
                <div className='absolute -top-1 -left-1 w-6 h-6 bg-primary-200 rounded-full animate-ping opacity-25'></div>
              </div>

              {/* Content */}
              <div className='flex-1 min-w-0'>
                <div className='bg-gradient-to-r from-primary-50 to-white rounded-lg p-4 shadow-sm border border-primary-100'>
                  <h3 className='text-lg font-semibold text-primary-700 mb-2'>
                    {item.year}
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Timeline.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
};

export default Timeline;
