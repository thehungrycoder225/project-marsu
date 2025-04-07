import './App.css';
import LandingPage from './pages/LandingPage';
import PageNotFound from './pages/404';
import SGDPage from './pages/SGDPage';
import SDGGoalDetail from './pages/SDGGoalDetail';
import SGDProject from './pages/SGDProject';
import Colleges from './pages/College';
import { Routes, Route } from 'react-router-dom';
import { useDynamicTheme } from './hooks/useDynamicTheme';

function App() {
  useDynamicTheme();

  return (
    <>
      {' '}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/sdg' element={<SGDPage />} />
        <Route path='/sdg/project/:id/:title' element={<SGDProject />} />
        <Route path='/sdg/goal/:id' element={<SDGGoalDetail />} />
        {/* Colleges Route */}
        <Route path='/colleges/:collegeKey' element={<Colleges />}>
          <Route path='details' element={<div>College Details</div>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
