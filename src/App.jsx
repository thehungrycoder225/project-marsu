import { lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDynamicTheme } from './hooks/useDynamicTheme';
import { HelmetProvider } from 'react-helmet-async';

const LandingPage = lazy(() => import('./pages/MainPage/LandingPage'));
const SGDPage = lazy(() => import('./pages/SDG/SGDPage'));
const SDGGoalDetail = lazy(
  () => import('./pages/SDG/components/SDGGoalDetail')
);
const SGDProject = lazy(() => import('./pages/SDG/components/SGDProject'));
const Colleges = lazy(() => import('./pages/CollegePage/College'));
const PageNotFound = lazy(() => import('./pages/404/404'));
const NewsDetail = lazy(() => import('./pages/CollegePage/NewsDetail'));
const CollegeAbout = lazy(() => import('./pages/CollegePage/About'));

function App() {
  useDynamicTheme();

  return (
    <HelmetProvider>
      <Suspense fallback={<div className='text-center mt-10'>Loading...</div>}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/sdg' element={<SGDPage />} />
          <Route path='/sdg/project/:id/:title' element={<SGDProject />} />
          <Route path='/sdg/goal/:id' element={<SDGGoalDetail />} />
          {/* FLAT ROUTES for HashRouter compatibility, including all college sections */}
          <Route path='/colleges/:collegeKey' element={<Colleges />} />
          <Route
            path='/colleges/:collegeKey/details'
            element={<div>College Details</div>}
          />
          <Route
            path='/colleges/:collegeKey/news'
            element={<div>College News</div>}
          />
          <Route
            path='/colleges/:collegeKey/news/:newsId'
            element={<NewsDetail />}
          />
          <Route
            path='/colleges/:collegeKey/events'
            element={<div>College Events</div>}
          />
          <Route
            path='/colleges/:collegeKey/projects'
            element={<div>College Projects</div>}
          />
          <Route
            path='/colleges/:collegeKey/research'
            element={<div>College Research</div>}
          />
          <Route
            path='/colleges/:collegeKey/extensions'
            element={<div>College Extensions</div>}
          />
          <Route
            path='/colleges/:collegeKey/programs'
            element={<div>College Programs</div>}
          />
          <Route
            path='/colleges/:collegeKey/faculty'
            element={<div>College Faculty</div>}
          />
          <Route
            path='/colleges/:collegeKey/staff'
            element={<div>College Staff</div>}
          />
          <Route
            path='/colleges/:collegeKey/student-achievements'
            element={<div>Student Achievements</div>}
          />
          <Route
            path='/colleges/:collegeKey/student-profile'
            element={<div>Student Profile</div>}
          />
          <Route
            path='/colleges/:collegeKey/student-organization'
            element={<div>Student Organization</div>}
          />
          <Route
            path='/colleges/:collegeKey/alumni'
            element={<div>Alumni</div>}
          />
          <Route
            path='/colleges/:collegeKey/testimonials'
            element={<div>Alumni Testimonials</div>}
          />
          <Route
            path='/colleges/:collegeKey/about'
            element={<CollegeAbout />}
          />
          <Route
            path='/colleges/:collegeKey/*'
            element={<div>College Not Found</div>}
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
}

export default App;
