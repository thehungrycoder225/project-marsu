import { Link } from 'react-router-dom';

const programs = [
  {
    id: 1,
    name: 'Program Offerings',
    description: 'Discover the various programs we offer to help you succeed.',
    imageUrl: 'https://placehold.co/600x400/png',
    href: `/colleges/collegeKey/program-offerings`,
  },
  {
    id: 2,
    name: 'Curriculum',
    description: 'Explore our curriculum and course offerings.',
    imageUrl: 'https://placehold.co/600x400/png',
    href: `/colleges/collegeKey/curriculum`,
  },
  {
    id: 3,
    name: 'Career Opportunities',
    description:
      'Learn about the career opportunities available to our graduates.',
    imageUrl: 'https://placehold.co/600x400/png',
    href: `/colleges/collegeKey/career-opportunities`,
  },
];

function Offerings() {
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='max-w-2xl text-left'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Explore Our Programs
          </h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>
            Discover the diverse range of programs we offer to help you achieve
            your academic and career goals.
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {programs.map((post) => (
            <article
              key={post.id}
              className='flex flex-col items-start justify-between'
            >
              <div className='relative w-full'>
                <img
                  src={post.imageUrl || ''}
                  alt={post.name || ''}
                  className='aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]'
                />
                <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
              </div>
              <div className='max-w-xl'>
                <div className='group relative'>
                  <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                    <a href={post.href || '#'}>
                      <span className='absolute inset-0' />
                      {post.name || ''}
                    </a>
                  </h3>
                  <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
                    {post.description || ''}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Offerings;
