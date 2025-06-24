import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';

const getLang = () => navigator.language?.slice(0, 2) || 'en';

function CampusLife() {
  const [campusLife, setCampusLife] = useState([]);
  const [lang] = useState(getLang());
  const [themeTag, setThemeTag] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    author: '',
    tags: '',
  });
  const submitBtnRef = useRef(null);

  // Set dynamic theme based on tag
  useDynamicTheme(themeTag);

  useEffect(() => {
    fetch('/data/marsu-resources/Resources.json')
      .then((res) => res.json())
      .then((data) => {
        setCampusLife(data.campusLife || []);
      })
      .catch(() => setError('Failed to load campus life data.'));
  }, []);

  useEffect(() => {
    if (campusLife.length) {
      const featured = campusLife.find(
        (item) => item.isFeatured || item.isTrending
      );
      if (featured && featured.tags?.length) setThemeTag(featured.tags[0]);
    }
  }, [campusLife]);

  useEffect(() => {
    if (campusLife.length) {
      window.dispatchEvent(
        new CustomEvent('campuslife_view', {
          detail: { count: campusLife.length },
        })
      );
    }
  }, [campusLife]);

  // Accessibility: focus modal on open
  useEffect(() => {
    if (showModal && submitBtnRef.current) {
      submitBtnRef.current.focus();
    }
  }, [showModal]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent('campuslife_submit', { detail: { ...form } })
    );
    setShowModal(false);
    setForm({ title: '', description: '', imageUrl: '', author: '', tags: '' });
    alert(
      lang === 'fil' ? 'Salamat sa iyong kwento!' : 'Thank you for your story!'
    );
  };

  if (error)
    return <div className='text-red-600 text-center py-2'>{error}</div>;

  return (
    <>
      <h3 className='text-2xl md:text-2xl font-bold  mb-2 text-[var(--primary-700)] text-center'>
        Campus Life
      </h3>
      <p className='text-base md:text-lg text-center text-gray-700 mb-6'>
        {lang === 'fil'
          ? 'Makulay na buhay-campus kung saan nagtatagpo ang edukasyon, komunidad, at pag-unlad.'
          : 'Experience vibrant CampusLife where education meets community, creativity, and growth.'}
      </p>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        aria-label='Campus Life Stories Carousel'
        className='mb-6'
      >
        {campusLife.map((item) => (
          <SwiperSlide key={item.id}>
            <article
              className={`flex flex-col bg-white rounded-xl shadow-md p-4 mb-4 h-full border transition-all ${
                item.isFeatured
                  ? 'border-primary-700'
                  : item.isTrending
                    ? 'border-yellow-400'
                    : 'border-gray-200'
              }`}
              tabIndex={0}
              aria-label={item.title?.[lang] || item.title?.en}
            >
              <img
                src={item.imageUrl}
                alt={item.title?.[lang] || item.title?.en}
                className='w-full h-40 object-cover rounded-md mb-3'
                loading='lazy'
              />
              <div className='flex-1 flex flex-col'>
                <h4 className='text-lg font-semibold mb-1'>
                  {item.title?.[lang] || item.title?.en}
                </h4>
                <p className='text-gray-600 text-sm mb-2'>
                  {item.description?.[lang] || item.description?.en}
                </p>
                <div className='text-xs text-gray-500 mb-2'>
                  <span>{item.author}</span> |{' '}
                  <span>{new Date(item.date).toLocaleDateString(lang)}</span>
                </div>
                {item.tags && (
                  <div className='flex flex-wrap gap-1 mb-2'>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className='bg-primary-100 text-primary-700 rounded px-2 py-0.5 text-xs font-medium'
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                {item.submittedByUser && (
                  <button
                    className='mt-auto bg-primary-700 hover:bg-primary-800 text-white rounded px-3 py-1 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-700'
                    aria-label='Submit your story'
                    onClick={handleOpenModal}
                  >
                    {lang === 'fil'
                      ? 'Ipadala ang Kuwento'
                      : 'Submit Your Story'}
                  </button>
                )}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className='flex justify-end mb-4'>
        <button
          onClick={() => window.print()}
          aria-label='Print Campus Life'
          className='bg-primary-700 hover:bg-primary-800 text-white rounded px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-700'
        >
          🖨️ {lang === 'fil' ? 'I-print' : 'Print'}
        </button>
      </div> */}
      {/* Modal for user submission */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
          <form
            className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto flex flex-col gap-3'
            onSubmit={handleFormSubmit}
          >
            <h4 className='text-xl font-bold mb-2'>
              {lang === 'fil'
                ? 'Ibahagi ang Iyong Kuwento'
                : 'Share Your Campus Story'}
            </h4>
            <label className='flex flex-col text-sm font-medium'>
              {lang === 'fil' ? 'Pamagat' : 'Title'}
              <input
                name='title'
                value={form.title}
                onChange={handleFormChange}
                required
                className='mt-1 border rounded px-2 py-1'
              />
            </label>
            <label className='flex flex-col text-sm font-medium'>
              {lang === 'fil' ? 'Deskripsyon' : 'Description'}
              <textarea
                name='description'
                value={form.description}
                onChange={handleFormChange}
                required
                className='mt-1 border rounded px-2 py-1'
              />
            </label>
            <label className='flex flex-col text-sm font-medium'>
              {lang === 'fil' ? 'Larawan (URL)' : 'Image (URL)'}
              <input
                name='imageUrl'
                value={form.imageUrl}
                onChange={handleFormChange}
                className='mt-1 border rounded px-2 py-1'
              />
            </label>
            <label className='flex flex-col text-sm font-medium'>
              {lang === 'fil' ? 'May-akda' : 'Author'}
              <input
                name='author'
                value={form.author}
                onChange={handleFormChange}
                required
                className='mt-1 border rounded px-2 py-1'
              />
            </label>
            <label className='flex flex-col text-sm font-medium'>
              {lang === 'fil'
                ? 'Mga Tag (comma separated)'
                : 'Tags (comma separated)'}
              <input
                name='tags'
                value={form.tags}
                onChange={handleFormChange}
                className='mt-1 border rounded px-2 py-1'
              />
            </label>
            <div className='flex gap-2 justify-end mt-2'>
              <button
                type='submit'
                ref={submitBtnRef}
                className='bg-primary-700 hover:bg-primary-800 text-white rounded px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-700'
              >
                {lang === 'fil' ? 'Isumite' : 'Submit'}
              </button>
              <button
                type='button'
                onClick={handleCloseModal}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 rounded px-4 py-2 text-sm font-semibold'
              >
                {lang === 'fil' ? 'Kanselahin' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default CampusLife;
