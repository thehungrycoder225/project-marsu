import './App.css';
import LandingPage from './pages/LandingPage';
import PageNotFound from './pages/404';
import SGDPage from './pages/SGDPage';
import SGDProject from './pages/SGDProject';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/sgd' element={<SGDPage />} />
        <Route path='/sgd/project/:id' element={<SGDProject />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
