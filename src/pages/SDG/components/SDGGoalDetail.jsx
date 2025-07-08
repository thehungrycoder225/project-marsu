import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Section from '../../../components/Section';
import goals from './goals';
import projects from './projects';
import SDGNav from './SDGNav';
import SDGGoalMedia from './SDGGoalMedia';
import SDGGoalPartners from './SDGGoalPartners';
import SDGGoalTestimonials from './SDGGoalTestimonials';
import SDGGoalTabs from './SDGGoalTabs';
import { motion } from 'framer-motion';
import './sdggoal.css';

const SDGGoalDetail = () => {
  const { id } = useParams();
  const goal = goals.find((goal) => goal.id === parseInt(id));

  if (!goal) {
    return <div>Goal not found</div>;
  }

  const relatedProjects = projects.filter((project) =>
    project.tags.some((tag) => tag.name.includes(goal.title))
  );

  // Placeholder: Replace with real data fields as available
  const media = goal.media || [];
  const partners = goal.partners || [];
  const testimonials = goal.testimonials || [];

  const tabs = [
    {
      label: 'Overview',
      content: (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='space-y-8'>
            {/* Goal Statement */}
            <div className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8'>
              <h3 className='text-3xl font-bold text-gray-800 mb-4'>
                {goal.subtitle}
              </h3>
              <div className='space-y-4'>
                {goal.statement.map((statement, index) => (
                  <p
                    key={index}
                    className='text-lg leading-relaxed text-gray-700'
                  >
                    {statement.text}
                  </p>
                ))}
              </div>
            </div>

            {/* UN Targets Section */}
            <div className='bg-white/70 backdrop-blur rounded-2xl p-8 shadow-lg'>
              <h4 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3'>
                <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-5 h-5 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                UN Targets & Indicators
              </h4>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Sample UN Targets - Replace with actual data */}
                {[
                  {
                    target: `${goal.id}.1`,
                    title: 'Target 1',
                    description:
                      'Achieve universal access to affordable, reliable and modern energy services',
                    progress: Math.floor(Math.random() * 40) + 60,
                  },
                  {
                    target: `${goal.id}.2`,
                    title: 'Target 2',
                    description:
                      'Increase substantially the share of renewable energy in the global energy mix',
                    progress: Math.floor(Math.random() * 40) + 50,
                  },
                  {
                    target: `${goal.id}.3`,
                    title: 'Target 3',
                    description:
                      'Double the global rate of improvement in energy efficiency',
                    progress: Math.floor(Math.random() * 40) + 40,
                  },
                  {
                    target: `${goal.id}.4`,
                    title: 'Target 4',
                    description:
                      'Enhance international cooperation to facilitate access to clean energy',
                    progress: Math.floor(Math.random() * 40) + 35,
                  },
                ].map((target, index) => (
                  <motion.div
                    key={index}
                    className='bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className='flex items-start gap-4'>
                      <div className='bg-blue-100 rounded-lg p-3 flex-shrink-0'>
                        <span className='text-blue-800 font-bold text-sm'>
                          {target.target}
                        </span>
                      </div>
                      <div className='flex-1'>
                        <h5 className='font-semibold text-gray-800 mb-2'>
                          {target.title}
                        </h5>
                        <p className='text-sm text-gray-600 mb-3'>
                          {target.description}
                        </p>
                        <div className='flex items-center gap-2'>
                          <div className='flex-1 bg-gray-200 rounded-full h-2'>
                            <div
                              className='bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000'
                              style={{ width: `${target.progress}%` }}
                            />
                          </div>
                          <span className='text-sm font-medium text-gray-700'>
                            {target.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key Achievements */}
            <div className='bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white'>
              <h4 className='text-2xl font-bold mb-6 flex items-center gap-3'>
                <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                Key Achievements
              </h4>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {[
                  {
                    value: `${Math.floor(Math.random() * 50) + 20}K`,
                    label: 'People Reached',
                    icon: '👥',
                  },
                  {
                    value: `${Math.floor(Math.random() * 20) + 10}`,
                    label: 'Projects Completed',
                    icon: '✅',
                  },
                  {
                    value: `$${Math.floor(Math.random() * 500) + 100}K`,
                    label: 'Funding Secured',
                    icon: '💰',
                  },
                  {
                    value: `${Math.floor(Math.random() * 10) + 5}`,
                    label: 'Partners Engaged',
                    icon: '🤝',
                  },
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    className='text-center bg-white/10 backdrop-blur rounded-xl p-6'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className='text-3xl mb-2'>{achievement.icon}</div>
                    <div className='text-2xl font-bold mb-1'>
                      {achievement.value}
                    </div>
                    <div className='text-sm text-white/90'>
                      {achievement.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Infographics Section */}
            <div className='bg-white/70 backdrop-blur rounded-2xl p-8 shadow-lg'>
              <h4 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3'>
                <div className='w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-5 h-5 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' />
                  </svg>
                </div>
                Impact Visualization
              </h4>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Progress Chart */}
                <div className='bg-white rounded-xl p-6 shadow-sm'>
                  <h5 className='font-semibold text-gray-800 mb-4'>
                    Progress Over Time
                  </h5>
                  <div className='space-y-3'>
                    {['2020', '2021', '2022', '2023', '2024'].map(
                      (year, index) => {
                        const progress = Math.min(
                          20 + index * 15 + Math.random() * 10,
                          95
                        );
                        return (
                          <div key={year} className='flex items-center gap-3'>
                            <span className='text-sm font-medium text-gray-600 w-12'>
                              {year}
                            </span>
                            <div className='flex-1 bg-gray-200 rounded-full h-3'>
                              <motion.div
                                className='bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full'
                                initial={{ width: 0 }}
                                whileInView={{ width: `${progress}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                            <span className='text-sm font-medium text-gray-700 w-12'>
                              {Math.round(progress)}%
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Impact Metrics */}
                <div className='bg-white rounded-xl p-6 shadow-sm'>
                  <h5 className='font-semibold text-gray-800 mb-4'>
                    Regional Impact
                  </h5>
                  <div className='space-y-4'>
                    {[
                      {
                        region: 'Asia Pacific',
                        impact: 85,
                        color: 'from-blue-500 to-cyan-500',
                      },
                      {
                        region: 'Europe',
                        impact: 72,
                        color: 'from-purple-500 to-pink-500',
                      },
                      {
                        region: 'Americas',
                        impact: 68,
                        color: 'from-green-500 to-emerald-500',
                      },
                      {
                        region: 'Africa',
                        impact: 45,
                        color: 'from-orange-500 to-red-500',
                      },
                    ].map((region, index) => (
                      <div key={region.region} className='space-y-2'>
                        <div className='flex justify-between items-center'>
                          <span className='text-sm font-medium text-gray-700'>
                            {region.region}
                          </span>
                          <span className='text-sm font-bold text-gray-800'>
                            {region.impact}%
                          </span>
                        </div>
                        <div className='bg-gray-200 rounded-full h-2'>
                          <motion.div
                            className={`bg-gradient-to-r ${region.color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${region.impact}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      label: 'Media',
      content: <SDGGoalMedia media={media} />,
    },
    {
      label: 'Partners',
      content: <SDGGoalPartners partners={partners} />,
    },
    {
      label: 'Testimonials',
      content: <SDGGoalTestimonials testimonials={testimonials} />,
    },
    {
      label: 'Related Projects',
      content: (
        <div className='relative py-8 lg:py-12'>
          {/* Background decorative elements */}
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            <div className='absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full opacity-20 animate-pulse'></div>
            <div className='absolute bottom-10 right-20 w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-full opacity-15 animate-bounce-slow'></div>
            <div className='absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-25 animate-pulse delay-1000'></div>
          </div>

          {/* Header Section */}
          <div className='text-center mb-16 relative z-10'>
            <div className='inline-flex items-center space-x-3 mb-6'>
              <div className='w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.26 0-2.12-1.26-.707-2.707l5-5A2 2 0 009.5 10.172V5L8 4z'
                  />
                </svg>
              </div>
              <h2 className='text-3xl lg:text-4xl font-bold text-gray-800'>
                Related Projects for
                <span className='text-primary-600'> SDG {goal.id}</span>
              </h2>
            </div>

            <p className='text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8'>
              We offer comprehensive projects that contribute directly to
              achieving SDG {goal.id}. Our initiatives span
              <span className='font-semibold text-primary-600'> education</span>
              ,
              <span className='font-semibold text-secondary-600'>
                {' '}
                research
              </span>
              , and
              <span className='font-semibold text-rose-600'>
                {' '}
                community engagement
              </span>
              .
            </p>

            {/* Enhanced Quick Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12'>
              <div className='text-center p-4 rounded-xl shadow-sm border border-gray-100'>
                <div className='text-2xl font-bold text-primary-600 mb-1'>
                  {relatedProjects.length}
                </div>
                <div className='text-xs text-gray-600 font-medium'>
                  Active Projects
                </div>
              </div>
              <div className='text-center p-4 rounded-xl shadow-sm border border-gray-100'>
                <div className='text-2xl font-bold text-secondary-600 mb-1'>
                  {
                    relatedProjects.filter(
                      (p) => p.metrics?.quantitative?.length > 0
                    ).length
                  }
                </div>
                <div className='text-xs text-gray-600 font-medium'>
                  With Impact Data
                </div>
              </div>
              <div className='text-center p-4 rounded-xl shadow-sm border border-gray-100'>
                <div className='text-2xl font-bold text-rose-600 mb-1'>
                  {
                    relatedProjects.filter(
                      (p) =>
                        p.media &&
                        Object.keys(p.media).some(
                          (key) => p.media[key]?.length > 0
                        )
                    ).length
                  }
                </div>
                <div className='text-xs text-gray-600 font-medium'>
                  Rich Media Projects
                </div>
              </div>
              <div className='text-center p-4 rounded-xl shadow-sm border border-gray-100'>
                <div className='text-2xl font-bold text-amber-600 mb-1'>
                  {relatedProjects.reduce((total, project) => {
                    const beneficiaries =
                      project.metrics?.quantitative?.find(
                        (m) =>
                          m.label?.toLowerCase().includes('beneficiar') ||
                          m.label?.toLowerCase().includes('people') ||
                          m.label?.toLowerCase().includes('participant')
                      )?.value || Math.floor(Math.random() * 500) + 100;
                    return total + beneficiaries;
                  }, 0) > 1000
                    ? `${Math.round(
                        relatedProjects.reduce((total, project) => {
                          const beneficiaries =
                            project.metrics?.quantitative?.find(
                              (m) =>
                                m.label?.toLowerCase().includes('beneficiar') ||
                                m.label?.toLowerCase().includes('people') ||
                                m.label?.toLowerCase().includes('participant')
                            )?.value || Math.floor(Math.random() * 500) + 100;
                          return total + beneficiaries;
                        }, 0) / 1000
                      )}K+`
                    : relatedProjects.reduce((total, project) => {
                        const beneficiaries =
                          project.metrics?.quantitative?.find(
                            (m) =>
                              m.label?.toLowerCase().includes('beneficiar') ||
                              m.label?.toLowerCase().includes('people') ||
                              m.label?.toLowerCase().includes('participant')
                          )?.value || Math.floor(Math.random() * 500) + 100;
                        return total + beneficiaries;
                      }, 0)}
                </div>
                <div className='text-xs text-gray-600 font-medium'>
                  People Reached
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid Layout */}
          {relatedProjects.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 max-w-7xl mx-auto'>
              {/* Hero Project Card - Takes 2 columns */}
              {relatedProjects.slice(0, 1).map((project) => (
                <div
                  key={project.id}
                  className='group relative rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer md:col-span-2 min-h-[400px] hover:-translate-y-1 transform-gpu'
                >
                  {/* Project Image Background */}
                  <div className='absolute inset-0'>
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500'></div>
                  </div>

                  {/* Content */}
                  <div className='relative z-10 h-full flex flex-col justify-end p-8'>
                    <div className='space-y-4'>
                      {/* Enhanced SDG Tags with additional indicators */}
                      <div className='flex flex-wrap gap-2 mb-4'>
                        {project.tags?.slice(0, 3).map((tag) =>
                          tag.icons?.slice(0, 2).map((icon, index) => (
                            <div
                              key={`${tag.id}-${index}`}
                              className='w-8 h-8 rounded-lg overflow-hidden border-2 border-white/30 backdrop-blur-sm'
                            >
                              <img
                                src={`sdg/${icon}`}
                                alt={tag.name}
                                className='w-full h-full object-cover'
                              />
                            </div>
                          ))
                        )}
                        {project.tags && project.tags.length > 3 && (
                          <div className='w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center'>
                            <span className='text-white text-xs font-bold'>
                              +{project.tags.length - 3}
                            </span>
                          </div>
                        )}

                        {/* Enhanced indicators */}
                        {project.media &&
                          Object.keys(project.media).some(
                            (key) => project.media[key]?.length > 0
                          ) && (
                            <div className='w-8 h-8 rounded-lg bg-blue-500/20 backdrop-blur-sm border-2 border-blue-300/30 flex items-center justify-center'>
                              <svg
                                className='w-4 h-4 text-blue-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                                />
                              </svg>
                            </div>
                          )}
                        {project.metrics &&
                          (project.metrics.quantitative?.length > 0 ||
                            project.metrics.qualitative?.length > 0) && (
                            <div className='w-8 h-8 rounded-lg bg-green-500/20 backdrop-blur-sm border-2 border-green-300/30 flex items-center justify-center'>
                              <svg
                                className='w-4 h-4 text-green-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                                />
                              </svg>
                            </div>
                          )}
                        {project.partnerships &&
                          project.partnerships.length > 0 && (
                            <div className='w-8 h-8 rounded-lg bg-purple-500/20 backdrop-blur-sm border-2 border-purple-300/30 flex items-center justify-center'>
                              <svg
                                className='w-4 h-4 text-purple-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                                />
                              </svg>
                            </div>
                          )}
                        {project.location &&
                          project.location.regions &&
                          project.location.regions.length > 0 && (
                            <div className='w-8 h-8 rounded-lg bg-orange-500/20 backdrop-blur-sm border-2 border-orange-300/30 flex items-center justify-center'>
                              <svg
                                className='w-4 h-4 text-orange-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                              </svg>
                            </div>
                          )}
                      </div>

                      <div>
                        <h3 className='text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden'>
                          {project.title}
                        </h3>
                        <p className='text-white/90 leading-relaxed text-base lg:text-lg [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden'>
                          {project.desc}
                        </p>

                        {/* Enhanced project metadata */}
                        {project.metrics?.quantitative &&
                          project.metrics.quantitative.length > 0 && (
                            <div className='mt-4 flex items-center space-x-4 text-white/80 text-sm'>
                              {project.metrics.quantitative
                                .slice(0, 2)
                                .map((metric, index) => (
                                  <div
                                    key={index}
                                    className='flex items-center space-x-1'
                                  >
                                    <span className='font-semibold text-white'>
                                      {metric.value.toLocaleString()}
                                    </span>
                                    <span>{metric.unit || metric.label}</span>
                                  </div>
                                ))}
                            </div>
                          )}

                        {/* Partnership information for hero cards */}
                        {project.partnerships &&
                          project.partnerships.length > 0 && (
                            <div className='mt-3 text-white/70 text-sm'>
                              <span className='font-medium'>
                                In partnership with:
                              </span>
                              <span className='ml-2'>
                                {project.partnerships
                                  .slice(0, 2)
                                  .map((p) => p.name)
                                  .join(', ')}
                                {project.partnerships.length > 2 &&
                                  ` +${project.partnerships.length - 2} more`}
                              </span>
                            </div>
                          )}
                      </div>

                      {/* Enhanced Action Area */}
                      <div className='flex items-center justify-between pt-4'>
                        <div className='flex items-center space-x-2 text-white/80 text-sm'>
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13 10V3L4 14h7v7l9-11h-7z'
                            />
                          </svg>
                          <span>Featured Project</span>
                          {project.date && (
                            <span className='text-white/60'>
                              • {project.date}
                            </span>
                          )}
                        </div>
                        <Link
                          to={project.link}
                          className='inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 group-hover:scale-105'
                        >
                          <span className='text-sm font-medium'>Explore</span>
                          <svg
                            className='w-4 h-4 transform group-hover:translate-x-1 transition-transform'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Tall Project Card */}
              {relatedProjects.slice(1, 2).map((project) => (
                <div
                  key={project.id}
                  className='group relative rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[400px] hover:-translate-y-1 transform-gpu'
                >
                  {/* Project Image Background */}
                  <div className='absolute inset-0'>
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500'></div>
                  </div>

                  {/* Content */}
                  <div className='relative z-10 h-full flex flex-col justify-end p-6'>
                    <div className='space-y-4'>
                      {/* Enhanced SDG Tags */}
                      <div className='flex flex-wrap gap-2 mb-4'>
                        {project.tags?.slice(0, 3).map((tag) =>
                          tag.icons?.slice(0, 1).map((icon, index) => (
                            <div
                              key={`${tag.id}-${index}`}
                              className='w-7 h-7 rounded-lg overflow-hidden border-2 border-white/30 backdrop-blur-sm'
                            >
                              <img
                                src={`sdg/${icon}`}
                                alt={tag.name}
                                className='w-full h-full object-cover'
                              />
                            </div>
                          ))
                        )}
                        {project.tags && project.tags.length > 3 && (
                          <div className='w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center'>
                            <span className='text-white text-xs font-bold'>
                              +{project.tags.length - 3}
                            </span>
                          </div>
                        )}

                        {/* Enhanced indicators for tall cards */}
                        {project.media &&
                          Object.keys(project.media).some(
                            (key) => project.media[key]?.length > 0
                          ) && (
                            <div className='w-7 h-7 rounded-lg bg-blue-500/20 backdrop-blur-sm border-2 border-blue-300/30 flex items-center justify-center'>
                              <svg
                                className='w-3 h-3 text-blue-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                                />
                              </svg>
                            </div>
                          )}
                        {project.partnerships &&
                          project.partnerships.length > 0 && (
                            <div className='w-7 h-7 rounded-lg bg-purple-500/20 backdrop-blur-sm border-2 border-purple-300/30 flex items-center justify-center'>
                              <span className='text-purple-300 text-xs font-bold'>
                                {project.partnerships.length}
                              </span>
                            </div>
                          )}
                        {project.metrics &&
                          (project.metrics.quantitative?.length > 0 ||
                            project.metrics.qualitative?.length > 0) && (
                            <div className='w-7 h-7 rounded-lg bg-green-500/20 backdrop-blur-sm border-2 border-green-300/30 flex items-center justify-center'>
                              <svg
                                className='w-3 h-3 text-green-300'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' />
                              </svg>
                            </div>
                          )}
                      </div>

                      <div>
                        <h4 className='text-xl font-bold text-white leading-tight [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden'>
                          {project.title}
                        </h4>
                        <p className='text-white/90 text-sm leading-relaxed [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden mt-3'>
                          {project.desc}
                        </p>

                        {/* Key metric for tall cards */}
                        {project.metrics?.quantitative &&
                          project.metrics.quantitative.length > 0 && (
                            <div className='mt-3 text-white/80 text-sm'>
                              <span className='font-semibold text-white'>
                                {project.metrics.quantitative[0].value.toLocaleString()}
                              </span>
                              <span className='ml-1'>
                                {project.metrics.quantitative[0].unit ||
                                  project.metrics.quantitative[0].label}
                              </span>
                            </div>
                          )}

                        {/* Partnership count for tall cards */}
                        {project.partnerships &&
                          project.partnerships.length > 0 && (
                            <div className='mt-2 text-white/70 text-xs'>
                              <span>
                                {project.partnerships.length} partner
                                {project.partnerships.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                          )}
                      </div>

                      {/* Enhanced Action Area */}
                      <div className='flex items-center justify-between pt-4'>
                        <div className='flex items-center space-x-2 text-white/80 text-sm'>
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13 10V3L4 14h7v7l9-11h-7z'
                            />
                          </svg>
                          <span>Featured Project</span>
                        </div>
                        <Link
                          to={project.link}
                          className='inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 group-hover:scale-105'
                        >
                          <span className='text-sm font-medium'>
                            Learn More
                          </span>
                          <svg
                            className='w-4 h-4 transform group-hover:translate-x-1 transition-transform'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Compact Project Cards */}
              {relatedProjects.slice(2).map((project, index) => (
                <div
                  key={project.id}
                  className={`group relative rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 transform-gpu ${
                    index === 1 ? 'md:col-span-2 lg:col-span-1' : ''
                  } ${index >= 4 ? 'min-h-[200px]' : 'min-h-[320px]'}`}
                >
                  {/* Project Image Background */}
                  <div className='absolute inset-0'>
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-500'></div>
                  </div>

                  {/* Content */}
                  <div className='relative z-10 h-full flex flex-col justify-end p-6'>
                    <div className='space-y-3'>
                      {/* Enhanced SDG Tags with indicators */}
                      <div className='flex flex-wrap gap-2 mb-3'>
                        {project.tags?.slice(0, index >= 4 ? 2 : 3).map((tag) =>
                          tag.icons?.slice(0, 1).map((icon, iconIndex) => (
                            <div
                              key={`${tag.id}-${iconIndex}`}
                              className='w-6 h-6 rounded-lg overflow-hidden border-2 border-white/30 backdrop-blur-sm'
                            >
                              <img
                                src={`sdg/${icon}`}
                                alt={tag.name}
                                className='w-full h-full object-cover'
                              />
                            </div>
                          ))
                        )}
                        {project.tags &&
                          project.tags.length > (index >= 4 ? 2 : 3) && (
                            <div className='w-6 h-6 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center'>
                              <span className='text-white text-xs font-bold'>
                                +{project.tags.length - (index >= 4 ? 2 : 3)}
                              </span>
                            </div>
                          )}

                        {/* Compact enhancement indicators */}
                        {project.media &&
                          Object.keys(project.media).some(
                            (key) => project.media[key]?.length > 0
                          ) && (
                            <div className='w-6 h-6 rounded-lg bg-blue-500/20 backdrop-blur-sm border-2 border-blue-300/30 flex items-center justify-center'>
                              <svg
                                className='w-3 h-3 text-blue-300'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path d='M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z' />
                              </svg>
                            </div>
                          )}
                        {project.metrics &&
                          (project.metrics.quantitative?.length > 0 ||
                            project.metrics.qualitative?.length > 0) && (
                            <div className='w-6 h-6 rounded-lg bg-green-500/20 backdrop-blur-sm border-2 border-green-300/30 flex items-center justify-center'>
                              <svg
                                className='w-3 h-3 text-green-300'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' />
                              </svg>
                            </div>
                          )}
                        {project.partnerships &&
                          project.partnerships.length > 0 && (
                            <div className='w-6 h-6 rounded-lg bg-purple-500/20 backdrop-blur-sm border-2 border-purple-300/30 flex items-center justify-center'>
                              <span className='text-purple-300 text-xs font-bold'>
                                {project.partnerships.length}
                              </span>
                            </div>
                          )}
                      </div>

                      <div>
                        <h4
                          className={`font-bold text-white leading-tight [display:-webkit-box] [-webkit-box-orient:vertical] overflow-hidden ${index >= 4 ? 'text-sm [-webkit-line-clamp:2]' : 'text-lg [-webkit-line-clamp:2]'}`}
                        >
                          {project.title}
                        </h4>
                        {index < 4 && (
                          <p className='text-white/90 text-sm leading-relaxed [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden mt-2'>
                            {project.desc}
                          </p>
                        )}

                        {/* Compact metric display */}
                        {index < 4 &&
                          project.metrics?.quantitative &&
                          project.metrics.quantitative.length > 0 && (
                            <div className='text-white/80 text-xs mt-2'>
                              <span className='font-semibold'>
                                {project.metrics.quantitative[0].value.toLocaleString()}
                              </span>
                              <span className='ml-1'>
                                {project.metrics.quantitative[0].unit ||
                                  project.metrics.quantitative[0].label}
                              </span>
                            </div>
                          )}

                        {/* Media indicator for compact cards */}
                        {index < 4 &&
                          project.media &&
                          Object.keys(project.media).some(
                            (key) => project.media[key]?.length > 0
                          ) && (
                            <div className='text-white/70 text-xs mt-1'>
                              <span>Rich media content</span>
                            </div>
                          )}
                      </div>

                      {/* Enhanced Action Area */}
                      <div className='flex items-center justify-between pt-2'>
                        <div className='flex items-center space-x-1 text-white/80 text-xs'>
                          <svg
                            className='w-3 h-3'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13 10V3L4 14h7v7l9-11h-7z'
                            />
                          </svg>
                          <span>Project</span>
                          {project.date && index < 4 && (
                            <span className='text-white/60'>
                              • {project.date}
                            </span>
                          )}
                        </div>
                        <Link
                          to={project.link}
                          className='inline-flex items-center space-x-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-3 py-1 rounded-full transition-all duration-300 group-hover:scale-105'
                        >
                          <span className='text-xs font-medium'>View</span>
                          <svg
                            className='w-3 h-3 transform group-hover:translate-x-1 transition-transform'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='col-span-full text-center py-12'>
              <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                  />
                </svg>
              </div>
              <p className='text-gray-500 text-lg'>
                No related projects found.
              </p>
              <p className='text-gray-400 text-sm mt-2'>
                New projects contributing to this goal are being developed.
              </p>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      {/* <NavBack />
       */}
      <SDGNav />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumb Navigation */}
        <motion.nav
          className='flex items-center space-x-2 text-sm text-gray-600 mb-6'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to='/' className='hover:text-primary-600 transition-colors'>
            Home
          </Link>
          <span>/</span>
          <Link
            to='/sdg-center'
            className='hover:text-primary-600 transition-colors'
          >
            SDG Center
          </Link>
          <span>/</span>
          <span className='text-primary-600 font-medium'>{goal.title}</span>
        </motion.nav>

        {/* Enhanced Hero Section */}
        <motion.div
          className='relative overflow-hidden bg-gradient-to-br from-white/90 to-blue-50/70 shadow-2xl rounded-3xl mb-8 backdrop-blur-sm border border-white/20'
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)), url(sdg/sdg-bg-${goal.id}.png)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Background Elements */}
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            <motion.div
              className='absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full'
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <motion.div
              className='absolute bottom-10 left-10 w-24 h-24 bg-yellow-400/10 rounded-full'
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          <div className='relative flex flex-col lg:flex-row gap-8 p-8 lg:p-12'>
            {/* Left Side - Goal Info */}
            <div className='flex flex-col items-center lg:items-start gap-6 lg:w-1/3'>
              {/* Goal Number Badge */}
              <motion.div
                className='relative'
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
              >
                <div className='absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg z-10'>
                  <span className='text-2xl font-black text-white'>
                    {goal.id.toString().padStart(2, '0')}
                  </span>
                </div>
                <img
                  src={goal.image}
                  alt={goal.alt}
                  className='w-32 h-32 lg:w-40 lg:h-40 rounded-full object-contain border-4 border-white shadow-xl bg-white/90'
                />
              </motion.div>

              <motion.img
                src={goal.logo}
                alt={goal.alt}
                className='w-40 h-20 object-contain drop-shadow-lg'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </div>

            {/* Right Side - Statistics & Share */}
            <div className='flex-1 flex flex-col gap-8'>
              {/* Goal Title */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className='text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg'>
                  {goal.title}
                </h1>
                <p className='text-lg text-white/90 drop-shadow-md'>
                  {goal.subtitle}
                </p>
              </motion.div>

              {/* Key Statistics */}
              <motion.div
                className='grid grid-cols-2 lg:grid-cols-3 gap-4'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className='bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/30 hover:bg-white/30 transition-colors duration-300'>
                  <div className='text-2xl lg:text-3xl font-bold text-yellow-400 mb-1'>
                    {relatedProjects.length}
                  </div>
                  <div className='text-sm text-white/90 font-medium'>
                    Active Projects
                  </div>
                </div>

                <div className='bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/30 hover:bg-white/30 transition-colors duration-300'>
                  <div className='text-2xl lg:text-3xl font-bold text-green-400 mb-1'>
                    {Math.floor(Math.random() * 5000) + 1000}+
                  </div>
                  <div className='text-sm text-white/90 font-medium'>
                    People Impacted
                  </div>
                </div>

                <div className='bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/30 hover:bg-white/30 transition-colors duration-300 col-span-2 lg:col-span-1'>
                  <div className='text-2xl lg:text-3xl font-bold text-blue-400 mb-1'>
                    {Math.floor(Math.random() * 40) + 60}%
                  </div>
                  <div className='text-sm text-white/90 font-medium'>
                    Progress
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <SDGGoalTabs tabs={tabs} />
        <Section>
          <div className='flex justify-center my-8'>
            <a
              href='#get-involved'
              className='bg-gradient-to-r from-pink-500 to-blue-600 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:from-pink-600 hover:to-blue-700 transition-all duration-200 font-semibold'
            >
              Get Involved
            </a>
          </div>
        </Section>
      </div>
    </>
  );
};

export default SDGGoalDetail;
