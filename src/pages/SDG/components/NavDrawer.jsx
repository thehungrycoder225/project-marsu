   {/* Navigation Drawer Toggle Button */}
        <button
          onClick={() => setIsNavDrawerOpen(!isNavDrawerOpen)}
          className={`fixed top-1/2 right-0 transform -translate-y-1/2 z-50 w-12 h-16 bg-gradient-to-b from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-xl transition-all duration-300 ${
            showScrollNav
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-4 pointer-events-none'
          } ${isNavDrawerOpen ? 'rounded-l-xl' : 'rounded-l-xl'}`}
          aria-label='Toggle navigation drawer'
        >
          <div className='flex flex-col items-center justify-center h-full'>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${isNavDrawerOpen ? 'rotate-180' : ''}`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            <div className='text-xs text-gray-900 mt-1 writing-mode-vertical transform rotate-180'>
              NAV
            </div>
          </div>
        </button>

        {/* Navigation Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
            isNavDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          {/* <div className='flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Quick Navigation
            </h2>
            <button
              onClick={() => setIsNavDrawerOpen(false)}
              className='p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200'
              aria-label='Close navigation drawer'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div> */}

          {/* Drawer Content */}
          {/* <div className='p-6 h-full overflow-y-auto'> */}
            {/* Section Progress Indicator */}
            {/* <div className='mb-6'>
              <div className='text-sm text-gray-600 mb-2'>Current Section</div>
              <div className='text-base font-medium text-primary-600 capitalize'>
                {activeSection.replace('sdg', '').toLowerCase() || 'Top'}
              </div>
            </div> */}

            {/* Navigation Links */}
            {/* <nav className='space-y-3'>
              <button
                onClick={() => {
                  scrollToSection('sdgForeword');
                  setIsNavDrawerOpen(false);
                }}
                className={`w-full flex items-center p-3 text-left rounded-lg transition-all duration-200 ${
                  activeSection === 'sdgForeword'
                    ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <svg
                  className='w-5 h-5 mr-3'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                  />
                </svg>
                <span>Foreword</span>
              </button>

              <button
                onClick={() => {
                  scrollToSection('sdgMission');
                  setIsNavDrawerOpen(false);
                }}
                className={`w-full flex items-center p-3 text-left rounded-lg transition-all duration-200 ${
                  activeSection === 'sdgMission'
                    ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <svg
                  className='w-5 h-5 mr-3'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>Mission & Values</span>
              </button>

              <button
                onClick={() => {
                  scrollToSection('sdgGoals');
                  setIsNavDrawerOpen(false);
                }}
                className={`w-full flex items-center p-3 text-left rounded-lg transition-all duration-200 ${
                  activeSection === 'sdgGoals'
                    ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <svg
                  className='w-5 h-5 mr-3'
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
                <span>SDG Goals</span>
              </button>

              <button
                onClick={() => {
                  scrollToSection('sdgFeatured');
                  setIsNavDrawerOpen(false);
                }}
                className={`w-full flex items-center p-3 text-left rounded-lg transition-all duration-200 ${
                  activeSection === 'sdgFeatured'
                    ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <svg
                  className='w-5 h-5 mr-3'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                  />
                </svg>
                <span>Featured Projects</span>
              </button>

              <button
                onClick={() => {
                  scrollToSection('sdgProjects');
                  setIsNavDrawerOpen(false);
                }}
                className={`w-full flex items-center p-3 text-left rounded-lg transition-all duration-200 ${
                  activeSection === 'sdgProjects'
                    ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <svg
                  className='w-5 h-5 mr-3'
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
                <span>All Projects</span>
              </button>

              <button
                onClick={() => {
                  scrollToSection('sdgPartnership');
                  setIsNavDrawerOpen(false);
                }}
                className={`w-full flex items-center p-3 text-left rounded-lg transition-all duration-200 ${
                  activeSection === 'sdgPartnership'
                    ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <svg
                  className='w-5 h-5 mr-3'
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
                <span>Partnerships</span>
              </button>
            </nav> */}

            {/* Back to Top Button */}
            {/* <div className='mt-8 pt-6 border-t border-gray-200'>
              <button
                onClick={() => {
                  scrollToTop();
                  setIsNavDrawerOpen(false);
                }}
                className='w-full flex items-center justify-center p-3 text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 rounded-lg transition-all duration-200 transform hover:scale-[1.02]'
              >
                <svg
                  className='w-5 h-5 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 10l7-7m0 0l7 7m-7-7v18'
                  />
                </svg>
                Back to Top
              </button>
            </div> */}
          {/* </div> */}
        {/* </div> */}

        {/* Drawer Overlay */}
        {/* {isNavDrawerOpen && (
          <div
            className='fixed inset-0 bg-black bg-opacity-25 z-30 transition-opacity duration-300'
            onClick={() => setIsNavDrawerOpen(false)}
          />
        )} */}
      {/* </div> */}