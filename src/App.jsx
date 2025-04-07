import { lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDynamicTheme } from './hooks/useDynamicTheme';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const SGDPage = lazy(() => import('./pages/SGDPage'));
const SDGGoalDetail = lazy(() => import('./pages/SDGGoalDetail'));
const SGDProject = lazy(() => import('./pages/SGDProject'));
const Colleges = lazy(() => import('./pages/College'));
const PageNotFound = lazy(() => import('./pages/404'));

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
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
