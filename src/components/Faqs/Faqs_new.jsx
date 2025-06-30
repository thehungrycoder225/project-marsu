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

const Faqs = ({ collegeKey = 'default' }) => {
  const { faqs } = useFaqs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [votes, setVotes] = useState({});
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // FAQ Categories with icons
  const categories = [
    {
      id: 'all',
      name: 'All Questions',
      icon: QuestionMarkCircleIcon,
      color: 'gray',
    },
    {
      id: 'admissions',
      name: 'Admissions',
      icon: AcademicCapIcon,
      color: 'blue',
    },
    {
      id: 'academic',
      name: 'Academic',
      icon: DocumentTextIcon,
      color: 'green',
    },
    {
      id: 'financial',
      name: 'Financial',
      icon: CurrencyDollarIcon,
      color: 'yellow',
    },
    {
      id: 'student-life',
      name: 'Student Life',
      icon: UserGroupIcon,
      color: 'purple',
    },
    {
      id: 'general',
      name: 'General',
      icon: ChatBubbleLeftRightIcon,
      color: 'pink',
    },
  ];

  // Mock featured/popular FAQs (in real app, this would come from analytics)
  const featuredFaqIds = faqs.slice(0, 3).map((faq) => faq.id);

  // Enhanced FAQs with categories (mock data - in real app this would come from API)
  const enhancedFaqs = useMemo(() => {
    return faqs.map((faq, index) => ({
      ...faq,
      category: [
        'admissions',
        'academic',
        'financial',
        'student-life',
        'general',
      ][index % 5],
      isFeatured: featuredFaqIds.includes(faq.id),
      helpfulVotes: Math.floor(Math.random() * 50) + 10,
      totalVotes: Math.floor(Math.random() * 60) + 15,
    }));
  }, [faqs, featuredFaqIds]);

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    return enhancedFaqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [enhancedFaqs, searchTerm, selectedCategory]);

  // Get featured FAQs
  const featuredFaqs = enhancedFaqs.filter((faq) => faq.isFeatured);

  // Handle FAQ expansion
  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  // Handle voting
  const handleVote = (faqId, isHelpful) => {
    setVotes((prev) => ({
      ...prev,
      [faqId]: isHelpful,
    }));
  };

  // Handle question submission
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setSubmissionStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setSubmissionStatus('success');
      setNewQuestion('');
      setTimeout(() => {
        setSubmissionStatus(null);
        setShowSubmissionForm(false);
      }, 2000);
    }, 1000);
  };

  // Get category color classes
  const getCategoryColor = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    const colorMap = {
      gray: 'bg-gray-100 text-gray-700 border-gray-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      pink: 'bg-pink-100 text-pink-700 border-pink-200',
    };
    return colorMap[category?.color] || colorMap.gray;
  };

  // Related FAQs logic
  const getRelatedFaqs = (currentFaq) => {
    return enhancedFaqs
      .filter(
        (faq) =>
          faq.id !== currentFaq.id && faq.category === currentFaq.category
      )
      .slice(0, 2);
  };

  // Keyboard navigation
  const handleKeyDown = (e, faqId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFaq(faqId);
    }
  };

  return (
    <div className='bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60 p-8'>
      {/* Header Section */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>
          Frequently Asked Questions
        </h2>
        <p className='text-gray-600 max-w-2xl mx-auto mb-8'>
          Find answers to common questions about our programs, admissions, and
          campus life. Can't find what you're looking for? We're here to help!
        </p>

        {/* Search Bar */}
        <div className='max-w-md mx-auto mb-8'>
          <div className='relative'>
            <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              type='text'
              placeholder='Search FAQs...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm'
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className='flex flex-wrap justify-center gap-2 mb-8'>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedCategory === category.id
                    ? `${getCategoryColor(category.id)} ring-2 ring-offset-2`
                    : 'bg-white/70 text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
                style={{
                  ringColor:
                    selectedCategory === category.id
                      ? `var(--${collegeKey}-primary-500, #3b82f6)`
                      : undefined,
                }}
              >
                <Icon className='w-4 h-4' />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured FAQs */}
      {selectedCategory === 'all' && searchTerm === '' && (
        <div className='mb-12'>
          <h3 className='text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
            <HandThumbUpIcon className='w-5 h-5 text-yellow-500' />
            Popular Questions
          </h3>
          <div className='grid md:grid-cols-3 gap-4 mb-8'>
            {featuredFaqs.map((faq) => (
              <div
                key={`featured-${faq.id}`}
                className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200/60 cursor-pointer hover:shadow-md transition-all duration-300'
                onClick={() => toggleFaq(faq.id)}
              >
                <div className='flex items-start justify-between mb-2'>
                  <h4 className='font-medium text-gray-900 text-sm line-clamp-2'>
                    {faq.question}
                  </h4>
                  <span className='text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200 flex-shrink-0 ml-2'>
                    Popular
                  </span>
                </div>
                <p className='text-gray-600 text-xs line-clamp-2'>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ List */}
      <div className='space-y-4'>
        {filteredFaqs.map((faq) => {
          const isExpanded = expandedFaq === faq.id;
          const userVote = votes[faq.id];
          const relatedFaqs = getRelatedFaqs(faq);

          return (
            <div
              key={faq.id}
              className='bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300'
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFaq(faq.id)}
                onKeyDown={(e) => handleKeyDown(e, faq.id)}
                className='w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-xl'
                aria-expanded={isExpanded}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(faq.category)}`}
                      >
                        {
                          categories.find((cat) => cat.id === faq.category)
                            ?.name
                        }
                      </span>
                      {faq.isFeatured && (
                        <span className='text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200'>
                          Popular
                        </span>
                      )}
                    </div>
                    <h3 className='text-lg font-semibold text-gray-900 pr-4'>
                      {faq.question}
                    </h3>
                  </div>
                  <div className='flex-shrink-0'>
                    {isExpanded ? (
                      <ChevronUpIcon className='w-5 h-5 text-gray-500' />
                    ) : (
                      <ChevronDownIcon className='w-5 h-5 text-gray-500' />
                    )}
                  </div>
                </div>
              </button>

              {/* Answer Content */}
              {isExpanded && (
                <div
                  id={`faq-answer-${faq.id}`}
                  className='px-6 pb-6 animate-in slide-in-from-top-1 duration-200'
                >
                  <div className='border-t border-gray-200/60 pt-4'>
                    <p className='text-gray-700 leading-relaxed mb-6'>
                      {faq.answer}
                    </p>

                    {/* Voting Section */}
                    <div className='flex items-center justify-between mb-4'>
                      <div className='flex items-center gap-4'>
                        <span className='text-sm text-gray-600'>
                          Was this helpful?
                        </span>
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() => handleVote(faq.id, true)}
                            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
                              userVote === true
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-green-50 border border-gray-200'
                            }`}
                          >
                            {userVote === true ? (
                              <HandThumbUpSolid className='w-4 h-4' />
                            ) : (
                              <HandThumbUpIcon className='w-4 h-4' />
                            )}
                            Yes
                          </button>
                          <button
                            onClick={() => handleVote(faq.id, false)}
                            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
                              userVote === false
                                ? 'bg-red-100 text-red-700 border border-red-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-red-50 border border-gray-200'
                            }`}
                          >
                            {userVote === false ? (
                              <HandThumbDownSolid className='w-4 h-4' />
                            ) : (
                              <HandThumbDownIcon className='w-4 h-4' />
                            )}
                            No
                          </button>
                        </div>
                      </div>
                      <div className='text-xs text-gray-500'>
                        {faq.helpfulVotes} of {faq.totalVotes} found this
                        helpful
                      </div>
                    </div>

                    {/* Related FAQs */}
                    {relatedFaqs.length > 0 && (
                      <div className='border-t border-gray-200/60 pt-4'>
                        <h4 className='text-sm font-medium text-gray-900 mb-3'>
                          Related Questions
                        </h4>
                        <div className='space-y-2'>
                          {relatedFaqs.map((relatedFaq) => (
                            <button
                              key={relatedFaq.id}
                              onClick={() => toggleFaq(relatedFaq.id)}
                              className='block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors'
                            >
                              {relatedFaq.question}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredFaqs.length === 0 && (
        <div className='text-center py-12'>
          <QuestionMarkCircleIcon className='w-16 h-16 text-gray-300 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            No FAQs found
          </h3>
          <p className='text-gray-600 mb-6'>
            Try adjusting your search terms or category filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className='mt-12 grid md:grid-cols-2 gap-6'>
        {/* Contact Support */}
        <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200/60'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center'>
              <ChatBubbleLeftRightIcon className='w-5 h-5 text-white' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900'>
              Need More Help?
            </h3>
          </div>
          <p className='text-gray-600 mb-4'>
            Can't find the answer you're looking for? Our support team is here
            to help.
          </p>
          <div className='space-y-2'>
            <button className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
              Contact Support
            </button>
            <button className='w-full px-4 py-2 bg-white text-blue-500 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors'>
              Schedule a Call
            </button>
          </div>
        </div>

        {/* Submit Question */}
        <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200/60'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center'>
              <PlusIcon className='w-5 h-5 text-white' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900'>
              Suggest a Question
            </h3>
          </div>

          {!showSubmissionForm ? (
            <>
              <p className='text-gray-600 mb-4'>
                Have a question that's not listed? Help us improve by suggesting
                it.
              </p>
              <button
                onClick={() => setShowSubmissionForm(true)}
                className='w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
              >
                Submit Question
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmitQuestion} className='space-y-4'>
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder='What would you like to know?'
                className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-20'
                disabled={submissionStatus === 'submitting'}
              />
              <div className='flex gap-2'>
                <button
                  type='submit'
                  disabled={
                    !newQuestion.trim() || submissionStatus === 'submitting'
                  }
                  className='flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  {submissionStatus === 'submitting' ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      Submitting...
                    </>
                  ) : submissionStatus === 'success' ? (
                    <>
                      <CheckIcon className='w-4 h-4' />
                      Submitted!
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setShowSubmissionForm(false);
                    setNewQuestion('');
                    setSubmissionStatus(null);
                  }}
                  className='px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                  disabled={submissionStatus === 'submitting'}
                >
                  <XMarkIcon className='w-4 h-4' />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// PropTypes
Faqs.propTypes = {
  collegeKey: PropTypes.string,
};

export default Faqs;
