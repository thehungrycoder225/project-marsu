import './App.css';
import LandingPage from './pages/LandingPage';
import SGDPage from './pages/SGDPage';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/sgd' element={<SGDPage />} />
        {/* <Route path='*' element={<NoMatch />} /> */}
      </Routes>
    </>
  );
}

export default App;
