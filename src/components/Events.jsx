import './events.css';

function Events() {
  const events = [
    {
      id: 1,
      title: 'Event 1',
      content: 'Last day of Dropping of Subjects',
      day: 'Friday',
      date: 'Sept 13',
    },
    {
      id: 2,
      title: 'Event 2',
      content: 'Start of Midterm Examination ',
      day: 'Wednesday',
      date: 'Sept 25',
    },
    {
      id: 3,
      title: 'Event 3',
      content: 'Health and Wellness Break',
      day: 'Monday',
      date: 'Sept 30',
    },
    {
      id: 4,
      title: 'Event 4',
      content: 'Start of MAR-SU Olympics',
      day: 'Monday',
      date: 'Oct 14',
    },
    {
      id: 5,
      title: 'Event 5',
      content: 'Deadline of Admission for 2nd Semester Requirements',
      day: 'Friday',
      date: 'Nov 8',
    },
    {
      id: 6,
      title: 'Event 6',
      content: 'Opening of Online Admission for 2nd Semester Transferees',
      day: 'Monday',
      date: 'Nov 11',
    },
    {
      id: 7,
      title: 'Event 7',
      content: 'Start of Final Examination',
      day: 'Monday',
      date: 'Nov 27',
    },
    {
      id: 8,
      title: 'Event 8',
      content: 'Start of Christmas Break',
      day: 'Monday',
      date: 'Dec 1',
    },
  ];
  return (
    <div className='events-section'>
      <h3>Upcoming Events</h3>
      <div className='events-container'>
        {events.map((event) => (
          <div key={event.id} className='event-card'>
            <div className='event-card-header'>
              <h4>{event.day}</h4>
              <span> {event.date}</span>
            </div>
            <div className='event-card-body'>
              <p>{event.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=''>
        <button href='#' className='btn btn-lg text-center'>
          More Events Soon &gt;
        </button>
      </div>
    </div>
  );
}

export default Events;

// Moved to shared components folder
