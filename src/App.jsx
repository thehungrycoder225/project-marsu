import './App.css';
import LandingPage from './pages/LandingPage';
import PageNotFound from './pages/404';
import SGDPage from './pages/SGDPage';
import SDGGoalDetail from './pages/SDGGoalDetail';
import SGDProject from './pages/SGDProject';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <>
      {' '}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/sdg' element={<SGDPage />} />
        <Route path='/sdg/project/:id/:title' element={<SGDProject />} />
        <Route path='/sdg/goal/:id' element={<SDGGoalDetail />} />
        {/* Colleges Route */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
