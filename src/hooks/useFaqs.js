import { useState } from 'react';

export const useFaqs = () => {
  const [faqs] = useState([
    {
      id: 1,
      question: 'What are the eligibility requirements for enrollment?',
      answer:
        'To enroll in our program, you must be at least 18 years old and have a high school diploma or equivalent.',
    },
    {
      id: 2,
      question: 'What is the duration of the program?',
      answer: 'The program lasts for 12 weeks, with classes held twice a week.',
    },
    {
      id: 3,
      question: 'Is financial aid available?',
      answer:
        'Yes, we offer various financial aid options to eligible students. Please contact our admissions office for more information.',
    },
    {
      id: 4,
      question: 'What is the class size?',
      answer:
        'Our classes typically have a maximum of 20 students to ensure personalized attention.',
    },
    {
      id: 5,
      question: 'What is the teaching method used in the program?',
      answer:
        'We use a combination of lectures, hands-on training, and real-world projects to ensure a comprehensive learning experience.',
    },
    {
      id: 6,
      question: 'Are there any prerequisites for the program?',
      answer:
        'No, there are no prerequisites for our program. We welcome students from all backgrounds.',
    },
  ]);

  return { faqs };
};
