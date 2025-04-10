import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import App from './App.jsx';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </StrictMode>
);
