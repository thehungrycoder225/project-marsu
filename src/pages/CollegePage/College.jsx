import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useColleges } from '../../hooks/useColleges';
import Faqs from '../../components/Faqs/Faqs';
import Hero from '../../components/Hero/Hero';
import Offerings from '../../components/Featured/Offerings';
import News from '../../components/News';
import Navigation from '../../components/CollegeNavigation/CollegeNav';
import Section from '../../components/Section';
import { Dialog, DialogPanel } from '@headlessui/react';
import {
  TrophyIcon,
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import './college.css';

function Colleges() {
  const { colleges, loading, error } = useColleges();
  const { collegeKey } = useParams();
  const [selectedAward, setSelectedAward] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'timeline'
  // For localization, fallback to 'en'
  const lang = 'en';

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Find by slug/shortName (collegeKey from URL)
  const college = colleges.find(
    (col) =>
      col.slug === collegeKey ||
      col.shortName.en === collegeKey ||
      String(col.id) === collegeKey
  );

  if (!college) {
    return <div>College not found</div>;
  }

  const profile = college.profile || {};
  const awards = profile.awards || [];

  return (
    <div className='college-page '>
      <Navigation />
      <Hero
        title={college.name?.[lang] || college.name?.en || college.name}
        tagline={profile.tagline?.[lang] || profile.tagline?.en || ''}
        description={profile.history?.[lang] || profile.history?.en || ''}
        imageSrc={
          college.collegeKey
            ? college.imageUrl
            : 'https://placehold.co/1200x600'
        }
        imageAlt={college.imageAlt}
        imagePosition={college.imagePosition}
        imageWidth={college.imageWidth}
        imageHeight={college.imageHeight}
      />
      <div className='college-container mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8'>
        {/* College News */}
        <Section>
          <News collegeKey={collegeKey} />
        </Section>
        {/* College Programs */}
        <Section>
          <Offerings collegeKey={collegeKey} />
        </Section>
        {/* College Awards - Enhanced with glassmorphic design */}
        <Section>
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-3xl font-bold text-gray-900'>
              Awards & Recognition
            </h2>
            {awards.length > 0 && (
              <div className='flex gap-2 bg-white/60 backdrop-blur-sm rounded-lg p-1 border border-gray-200/60'>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    viewMode === 'timeline'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Timeline
                </button>
              </div>
            )}
          </div>

          {awards.length > 0 ? (
            viewMode === 'grid' ? (
              /* Grid View */
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {awards.map((award) => (
                  <div
                    key={award.id}
                    onClick={() => setSelectedAward(award)}
                    className='group cursor-pointer bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200/60 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80 will-change-transform'
                    style={{
                      borderColor: `var(--${collegeKey}-primary-700, #660033)15`,
                    }}
                  >
                    <div className='flex items-center gap-4 mb-4'>
                      <div
                        className='w-12 h-12 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300'
                        style={{
                          background: `linear-gradient(135deg, var(--${collegeKey}-primary-700, #660033)20, var(--${collegeKey}-primary-700, #660033)10)`,
                          border: `2px solid var(--${collegeKey}-primary-700, #660033)30`,
                        }}
                      >
                        <TrophyIcon
                          className='w-6 h-6 group-hover:rotate-12 transition-transform duration-300'
                          style={{
                            color: `var(--${collegeKey}-primary-700, #660033)`,
                          }}
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2'>
                          {award.title?.[lang] ||
                            award.title?.en ||
                            award.title}
                        </h3>
                        <div className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
                          <CalendarIcon className='w-4 h-4' />
                          <span>{award.year}</span>
                        </div>
                      </div>
                    </div>

                    <p className='text-gray-600 text-sm line-clamp-3 mb-4'>
                      {award.description?.[lang] ||
                        award.description?.en ||
                        award.description}
                    </p>

                    <div className='flex items-center justify-between'>
                      <span
                        className='text-xs font-medium px-3 py-1 rounded-full'
                        style={{
                          background: `var(--${collegeKey}-primary-700, #660033)10`,
                          color: `var(--${collegeKey}-primary-700, #660033)`,
                        }}
                      >
                        Click for details
                      </span>
                      <div
                        className='w-0 h-0.5 bg-current group-hover:w-8 transition-all duration-300'
                        style={{
                          color: `var(--${collegeKey}-primary-700, #660033)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Timeline View */
              <div className='relative'>
                <div className='absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300'></div>
                <div className='space-y-8'>
                  {awards
                    .sort((a, b) => b.year - a.year)
                    .map((award) => (
                      <div
                        key={award.id}
                        className='relative flex items-start gap-6'
                      >
                        <div
                          className='absolute left-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-10'
                          style={{
                            background: `linear-gradient(135deg, var(--${collegeKey}-primary-700, #660033), var(--${collegeKey}-primary-600, #80004d))`,
                          }}
                        >
                          <TrophyIcon className='w-4 h-4 text-white' />
                        </div>

                        <div
                          className='ml-12 bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200/60 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer flex-1'
                          onClick={() => setSelectedAward(award)}
                          style={{
                            borderColor: `var(--${collegeKey}-primary-700, #660033)15`,
                          }}
                        >
                          <div className='flex items-center justify-between mb-3'>
                            <h3 className='font-semibold text-lg text-gray-900'>
                              {award.title?.[lang] ||
                                award.title?.en ||
                                award.title}
                            </h3>
                            <div className='flex items-center gap-2 text-sm text-gray-600'>
                              <CalendarIcon className='w-4 h-4' />
                              <span className='font-medium'>{award.year}</span>
                            </div>
                          </div>

                          <p className='text-gray-600 line-clamp-2'>
                            {award.description?.[lang] ||
                              award.description?.en ||
                              award.description}
                          </p>

                          <div className='mt-4 flex items-center justify-between'>
                            <span
                              className='text-xs font-medium px-3 py-1 rounded-full'
                              style={{
                                background: `var(--${collegeKey}-primary-700, #660033)10`,
                                color: `var(--${collegeKey}-primary-700, #660033)`,
                              }}
                            >
                              Click for details
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )
          ) : (
            /* Empty State */
            <div className='text-center py-12 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60'>
              <div
                className='w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center'
                style={{
                  background: `linear-gradient(135deg, var(--${collegeKey}-primary-700, #660033)20, var(--${collegeKey}-primary-700, #660033)10)`,
                }}
              >
                <TrophyIcon
                  className='w-8 h-8'
                  style={{ color: `var(--${collegeKey}-primary-700, #660033)` }}
                />
              </div>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                No Awards Yet
              </h3>
              <p className='text-gray-600 max-w-md mx-auto'>
                This college is working hard on achieving recognition and
                awards. Great things are coming soon!
              </p>
            </div>
          )}

          {/* Award Details Modal */}
          <Dialog
            open={!!selectedAward}
            onClose={() => setSelectedAward(null)}
            className='relative z-50'
          >
            <div
              className='fixed inset-0 bg-black/30 backdrop-blur-sm'
              aria-hidden='true'
            />
            <div className='fixed inset-0 flex items-center justify-center p-4'>
              <DialogPanel className='bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200/60 shadow-2xl max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto'>
                {selectedAward && (
                  <>
                    <div className='flex items-center justify-between mb-6'>
                      <div className='flex items-center gap-4'>
                        <div
                          className='w-16 h-16 rounded-full flex items-center justify-center shadow-lg'
                          style={{
                            background: `linear-gradient(135deg, var(--${collegeKey}-primary-700, #660033), var(--${collegeKey}-primary-600, #80004d))`,
                          }}
                        >
                          <TrophyIcon className='w-8 h-8 text-white' />
                        </div>
                        <div>
                          <h2 className='text-2xl font-bold text-gray-900'>
                            Award Details
                          </h2>
                          <div className='flex items-center gap-2 text-gray-600 mt-1'>
                            <CalendarIcon className='w-4 h-4' />
                            <span>Awarded in {selectedAward.year}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedAward(null)}
                        className='p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors'
                      >
                        <XMarkIcon className='w-6 h-6' />
                      </button>
                    </div>

                    <div className='space-y-6'>
                      <div>
                        <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                          {selectedAward.title?.[lang] ||
                            selectedAward.title?.en ||
                            selectedAward.title}
                        </h3>
                        <div
                          className='inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium'
                          style={{
                            background: `var(--${collegeKey}-primary-700, #660033)15`,
                            color: `var(--${collegeKey}-primary-700, #660033)`,
                          }}
                        >
                          <ClockIcon className='w-4 h-4' />
                          Year {selectedAward.year}
                        </div>
                      </div>

                      <div>
                        <h4 className='font-medium text-gray-900 mb-2'>
                          Description
                        </h4>
                        <p className='text-gray-700 leading-relaxed'>
                          {selectedAward.description?.[lang] ||
                            selectedAward.description?.en ||
                            selectedAward.description}
                        </p>
                      </div>

                      {selectedAward.icon && (
                        <div>
                          <h4 className='font-medium text-gray-900 mb-2'>
                            Award Medal
                          </h4>
                          <img
                            src={selectedAward.icon}
                            alt='Award Medal'
                            className='w-20 h-20 object-contain rounded-lg shadow-md'
                          />
                        </div>
                      )}
                    </div>

                    <div className='mt-8 flex justify-end'>
                      <button
                        onClick={() => setSelectedAward(null)}
                        className='px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95'
                        style={{
                          background: `linear-gradient(135deg, var(--${collegeKey}-primary-700, #660033), var(--${collegeKey}-primary-600, #80004d))`,
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </>
                )}
              </DialogPanel>
            </div>
          </Dialog>
        </Section>

        {/* Message from the Dean - only if present */}
        {profile.deanMessage?.[lang] && (
          <Section>
            <h2>Message from the Dean</h2>
            <p>{profile.deanMessage[lang]}</p>
          </Section>
        )}
        <Section>
          <Faqs />
        </Section>
        {/* Student Activities - placeholder if no data */}
        <Section>
          <h2>Student Activities</h2>
          <p>No student activities available at this time.</p>
        </Section>
        {/* Success Stories - placeholder if no data */}
        <Section>
          <h2>Success Stories</h2>
          <p>No success stories available at this time.</p>
        </Section>
      </div>
    </div>
  );
}

export default Colleges;
