import { useState, useMemo } from 'react';
import { useFaqs } from '../../hooks/useFaqs';
import PropTypes from 'prop-types';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon as HandThumbUpSolid,
  HandThumbDownIcon as HandThumbDownSolid,
} from '@heroicons/react/24/solid';

const Faqs = () => {
  const { faqs } = useFaqs();

  return (
    <>
      <div className='bg-white'>
        <div>
          <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>
            Frequently asked questions
          </h2>
          <p className='mt-6 max-w-2xl  text-base leading-7 text-gray-600'>
            Have a different question and can’t find the answer you’re looking
            for? Reach out to our support team by{' '}
            <a href='#' className='font-semibold'>
              sending us an email
            </a>{' '}
            and we’ll get back to you as soon as we can.
          </p>
          <div className='mt-20'>
            <dl className='space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10'>
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className='text-base font-semibold leading-7 text-gray-900'>
                    {faq.question}
                  </dt>
                  <dd className='mt-2 text-base leading-7 text-gray-600'>
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
