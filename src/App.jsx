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

function App() {
  useDynamicTheme();

  return (
    <Suspense fallback={<div className='text-center mt-10'>Loading...</div>}>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/sdg' element={<SGDPage />} />
        <Route path='/sdg/project/:id/:title' element={<SGDProject />} />
        <Route path='/sdg/goal/:id' element={<SDGGoalDetail />} />
        <Route path='/colleges/:collegeKey' element={<Colleges />}>
          <Route path='details' element={<div>College Details</div>} />
          <Route path='news' element={<div>College News</div>}>
            <Route path=':newsId' element={<div>College News Details</div>} />
          </Route>
          <Route path='events' element={<div>College Events</div>} />
          <Route path='projects' element={<div>College Projects</div>} />
          <Route path='research' element={<div>College Research</div>} />
          <Route
            path='collaborations'
            element={<div>College Collaborations</div>}
          />
          <Route path='partners' element={<div>College Partners</div>} />
          <Route path='resources' element={<div>College Resources</div>} />
          <Route path='contact' element={<div>College Contact</div>} />
          <Route path='about' element={<div>College About</div>} />
          <Route path='*' element={<div>College Not Found</div>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
