import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './landing.css';

import Navigation from '../../components/Navigation';
import LandingHeroCarousel from '../../components/LandingHeroCarousel';
import UniversityNews from '../../components/UniversityNews';
import SectionComponent from '../../components/Section';
import Events from '../../components/Events/Events';
import './landing.css';
import CampusLife from '../../components/CLife/CLife';
import Footer from '../../components/Footer';
import Splash from '../../components/Splash';
import Linkages from '../../components/Linkages';
import UniversityStats from '../../components/UniversityStats';
import PlaylistSection from '../../components/PlaylistSection'; // Import the new PlaylistSection component
import goals from '../SDG/components/goals'; // Import SDG goals data

function LandingPage() {
  return (
    <div>
      <Navigation />
      <LandingHeroCarousel />
      <UniversityStats />
      <div className='mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8'>
        <SectionComponent>
          <UniversityNews />
        </SectionComponent>
        <SectionComponent bg='bg-gradient-to-t from-bg-gray-50 to bg-gray-100/20'>
          <CampusLife />
        </SectionComponent>
        <SectionComponent>
          <Events />
        </SectionComponent>
        <SectionComponent>
          {/* Enhanced SDG Center Section */}
          <div className='relative overflow-hidden'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 pointer-events-none'>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                className='absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl'
                style={{
                  background: `linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))`,
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.08, scale: 1 }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
                className='absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl'
                style={{
                  background: `linear-gradient(to top right, var(--color-secondary), var(--color-primary-500))`,
                }}
              />
            </div>

            <div className='relative bg-gradient-to-br from-white via-blue-50/30 to-green-50/20 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden'>
              {/* Floating SDG icons background */}
              <div className='absolute inset-0 pointer-events-none opacity-5'>
                {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 0.3, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 1 }}
                    className='absolute w-16 h-16 rounded-lg transform rotate-12'
                    style={{
                      top: `${Math.random() * 80}%`,
                      left: `${Math.random() * 80}%`,
                      background: `linear-gradient(to bottom right, var(--color-primary), var(--color-primary-600))`,
                    }}
                  />
                ))}
              </div>

              <div className='relative p-8 lg:p-12'>
                <div className='grid lg:grid-cols-2 gap-12 items-center'>
                  {/* Left side - Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className='space-y-8'
                  >
                    {/* Header */}
                    <div className='space-y-4'>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-full text-sm font-medium text-gray-700'
                      >
                        <div
                          className='w-2 h-2 rounded-full animate-pulse'
                          style={{ background: 'var(--color-primary)' }}
                        />
                        Sustainable Development Goals Center
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className='text-4xl lg:text-5xl font-bold leading-tight'
                      >
                        <span
                          className='bg-gradient-to-r bg-clip-text text-transparent'
                          style={{
                            backgroundImage: `linear-gradient(to right, var(--color-primary), var(--color-primary-600), var(--color-secondary))`,
                          }}
                        >
                          Building a Sustainable Future
                        </span>
                        <br />
                        <span className='text-gray-800'>Together</span>
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className='text-lg text-gray-600 leading-relaxed max-w-xl'
                      >
                        Discover our comprehensive initiatives that drive
                        meaningful change, foster community engagement, and
                        advance the United Nations Sustainable Development Goals
                        through innovative research, education, and
                        partnerships.
                      </motion.p>
                    </div>

                    {/* Statistics */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className='grid grid-cols-3 gap-6'
                    >
                      {[
                        {
                          number: '17',
                          label: 'SDG Goals',
                          color: 'var(--color-primary)',
                        },
                        {
                          number: '25+',
                          label: 'Active Projects',
                          color: 'var(--color-primary-500)',
                        },
                        {
                          number: '50K+',
                          label: 'Lives Impacted',
                          color: 'var(--color-secondary)',
                        },
                      ].map((stat, index) => (
                        <div key={stat.label} className='text-center'>
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{
                              delay: 0.6 + index * 0.1,
                              duration: 0.5,
                            }}
                            className='text-2xl lg:text-3xl font-bold mb-1'
                            style={{ color: stat.color }}
                          >
                            {stat.number}
                          </motion.div>
                          <div className='text-sm text-gray-600 font-medium'>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </motion.div>

                    {/* Action buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      className='flex flex-col sm:flex-row gap-4'
                    >
                      <Link
                        to='/sdg-center'
                        className='group relative inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
                        style={{
                          background: `linear-gradient(to right, var(--color-primary), var(--color-primary-600))`,
                        }}
                      >
                        <span className='relative z-10'>
                          Explore SDG Center
                        </span>
                        <div
                          className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                          style={{
                            background: `linear-gradient(to right, var(--color-primary-500), var(--color-primary))`,
                          }}
                        />
                        <svg
                          className='ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300'
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
                    </motion.div>
                  </motion.div>

                  {/* Right side - Visual elements */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className='relative'
                  >
                    {/* Main SDG logo with enhanced styling */}
                    <div className='relative'>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className='relative z-10'
                      >
                        <div className='relative group'>
                          <img
                            src='sdg-logo.png'
                            className='w-full max-w-md mx-auto group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105'
                            alt='Marinduque State University SDG Logo'
                          />
                        </div>
                      </motion.div>

                      {/* Floating elements around the logo */}
                      <motion.div
                        initial={{ opacity: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className='absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg'
                        style={{
                          background: `linear-gradient(to bottom right, var(--color-secondary), #e6b800)`,
                        }}
                      >
                        #SDG
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className='absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100'
                      >
                        <div className='flex items-center gap-3'>
                          <div
                            className='w-3 h-3 rounded-full animate-pulse'
                            style={{ background: 'var(--color-primary)' }}
                          />
                          <span className='text-sm font-semibold text-gray-700'>
                            Active Impact
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Mini SDG goals preview */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                      className='mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30'
                    >
                      <h4 className='text-lg font-semibold text-gray-800 mb-4'>
                        Featured SDG Goals
                      </h4>
                      <div className='grid grid-cols-4 gap-3'>
                        {goals.slice(0, 4).map((goal, index) => (
                          <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 1 + index * 0.1,
                              duration: 0.4,
                            }}
                            className='relative group cursor-pointer'
                          >
                            <Link to={goal.link} className='block'>
                              <div className='w-full aspect-square rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg'>
                                <img
                                  src={goal.image}
                                  alt={goal.alt}
                                  className='w-full h-full object-cover'
                                />
                              </div>
                              {/* Tooltip on hover */}
                              <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10'>
                                {goal.title}
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                      <p className='text-xs text-gray-600 mt-3 text-center'>
                        And {goals.length - 4} more goals in action
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </SectionComponent>
        <Linkages />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
