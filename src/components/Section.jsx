import Skeleton from '../components/Skeleton';

function Section({ children, id, bg, loading }) {
  return (
    <section className={`mx-auto max-w-7xl px-4 sm:py-8 lg:px-8 ${bg}`} id={id}>
      {loading ? (
        <div className='py-8'>
          <Skeleton width='100%' height='8rem' />
        </div>
      ) : (
        children
      )}
    </section>
  );
}

export default Section;
