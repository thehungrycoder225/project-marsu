import { Link } from 'react-router-dom';

const offeringsData = [
  {
    cics: [
      {
        id: 1,
        title: 'Bachelor of Science in Computer Science',
        description:
          'A comprehensive program focusing on software development, algorithms, and data structures.',
        imageUrl: 'https://placehold.co/600x400',
        link: '/programs/cs',
      },
      {
        id: 2,
        title: 'Bachelor of Science in Information Technology',
        description:
          'A program designed to equip students with the skills needed for IT management and support.',
        imageUrl: 'https://placehold.co/600x400',
        link: '/programs/it',
      },
      {
        id: 3,
        title: 'Bachelor of Science in Information Systems',
        description:
          'A program that combines business and technology to prepare students for careers in information systems.',
        imageUrl: 'https://placehold.co/600x400',
        link: '/programs/is',
      },
      {
        id: 4,
        title: 'Bachelor of Science in Data Science',
        description:
          'A program focusing on data analysis, machine learning, and statistical methods.',
        imageUrl: 'https://placehold.co/600x400',
        link: '/programs/data-science',
      },
    ],
    cass: [
      {
        id: 1,
        title: 'Bachelor of Arts in Communication',
        description:
          'A program that explores the principles of communication and media studies.',
        imageUrl: 'https://placehold.co/600x400',
        link: '/programs/communication',
      },
      {
        id: 2,
        title: 'Bachelor of Arts in Psychology',
        description:
          'A program focusing on the scientific study of behavior and mental processes.',
        imageUrl: 'https://placehold.co/600x400',
        link: '/programs/psychology',
      },
    ],
    // Add more colleges and their offerings as needed
    cba: [
      {
        id: 1,
        title: 'Bachelor of Science in Business Administration',
        description:
          'A program that provides a strong foundation in business principles and practices.',
        imageUrl: 'https://placehold.co/600x400',
        link: '/programs/business-administration',
      },
      {
        id: 2,
        title: 'Bachelor of Science in Accountancy',
        description:
          'A program designed to prepare students for a career in accounting and finance.',
        imageUrl: 'https://placehold.co/600x400',
        link: '/programs/accountancy',
      },
    ],
    gs: [
      {
        id: 1,
        title: 'Master in Information Technology',

        description:
          'A program that prepares students for advanced careers in IT and management.',
        imageUrl: 'https://placehold.co/600x400',
        link: '/programs/master-it',
      },
    ],
  },
];

function Offerings({ collegeKey }) {
  const offerings = offeringsData[0][collegeKey];
  if (!offerings) {
    return <div>No offerings available for this college.</div>;
  } else {
    return (
      <div className=''>
        <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>
          Programs Offered
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {offerings.map((offering) => (
            <div
              key={offering.id}
              className='bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300'
            >
              <img
                src={offering.imageUrl}
                alt={offering.title}
                className='w-full h-48 object-cover rounded-t-lg mb-4'
              />
              <h3 className='text-xl font-semibold'>{offering.title}</h3>
              <p className='text-gray-700'>{offering.description}</p>
              <Link
                to={offering.link}
                className='text-blue-500 mt-2 inline-block'
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Offerings;
