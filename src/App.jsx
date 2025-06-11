import { lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDynamicTheme } from './hooks/useDynamicTheme';

const LandingPage = lazy(() => import('./pages/MainPage/LandingPage'));
const SGDPage = lazy(() => import('./pages/SDG/SGDPage'));
const SDGGoalDetail = lazy(
  () => import('./pages/SDG/components/SDGGoalDetail')
);
const SGDProject = lazy(() => import('./pages/SDG/components/SGDProject'));
const Colleges = lazy(() => import('./pages/CollegePage/College'));
const PageNotFound = lazy(() => import('./pages/404/404'));
const NewsDetail = lazy(() => import('./pages/CollegePage/NewsDetail'));

function App() {
  useDynamicTheme();

  return (
    <Suspense fallback={<div className='text-center mt-10'>Loading...</div>}>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/sdg' element={<SGDPage />} />
        <Route path='/sdg/project/:id/:title' element={<SGDProject />} />
        <Route path='/sdg/goal/:id' element={<SDGGoalDetail />} />
        {/* FLAT ROUTES for HashRouter compatibility */}
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
          path='/colleges/:collegeKey/collaborations'
          element={<div>College Collaborations</div>}
        />
        <Route
          path='/colleges/:collegeKey/partners'
          element={<div>College Partners</div>}
        />
        <Route
          path='/colleges/:collegeKey/resources'
          element={<div>College Resources</div>}
        />
        <Route
          path='/colleges/:collegeKey/contact'
          element={<div>College Contact</div>}
        />
        <Route
          path='/colleges/:collegeKey/about'
          element={<div>College About</div>}
        />
        <Route
          path='/colleges/:collegeKey/*'
          element={<div>College Not Found</div>}
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
