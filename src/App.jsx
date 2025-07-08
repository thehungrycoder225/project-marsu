import { lazy, Suspense, useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDynamicTheme } from './hooks/useDynamicTheme';
import { HelmetProvider } from 'react-helmet-async';
const UniversityNewsDetail = lazy(
  () => import('./components/UniversityNewsDetail')
);
const LandingPage = lazy(() => import('./pages/MainPage/LandingPage'));
const AboutPage = lazy(() => import('./pages/MainPage/AboutPage'));
const SGDPage = lazy(() => import('./pages/SDG/SGDPage'));
const SDGGoalDetail = lazy(
  () => import('./pages/SDG/components/SDGGoalDetail')
);
const SGDProject = lazy(() => import('./pages/SDG/components/SGDProject'));
const Colleges = lazy(() => import('./pages/CollegePage/College'));
const PageNotFound = lazy(() => import('./pages/404/404'));
const NewsDetail = lazy(() => import('./pages/CollegePage/NewsDetail'));
const CollegeAbout = lazy(() => import('./pages/CollegePage/About'));
const CollegePrograms = lazy(() => import('./pages/CollegePage/Programs'));
const ProgramDetail = lazy(() => import('./pages/CollegePage/ProgramDetail'));
const Splash = lazy(() => import('./components/Splash'));

function App() {
  useDynamicTheme();
  const [showSplash, setShowSplash] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    // Only show splash if not seen in last 24h
    const lastSplash = localStorage.getItem('marsu_splash_last');
    if (
      !lastSplash ||
      Date.now() - parseInt(lastSplash, 10) > 24 * 60 * 60 * 1000
    ) {
      setShowSplash(true);
    } else {
      setSplashDone(true);
    }
  }, []);

  // Handler for Splash adaptive ready
  const handleSplashReady = () => {
    setShowSplash(false);
    setSplashDone(true);
  };

  if (showSplash && !splashDone) {
    return <Splash onReady={handleSplashReady} />;
  }

  return (
    <HelmetProvider>
      <Suspense fallback={<Splash onReady={handleSplashReady} />}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/news/:newsId' element={<UniversityNewsDetail />} />
          <Route path='/sdg-center' element={<SGDPage />} />
          <Route
            path='/sdg-center/project/:id/:title'
            element={<SGDProject />}
          />
          <Route path='/sdg-center/goal/:id' element={<SDGGoalDetail />} />
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
            element={<CollegePrograms />}
          />
          <Route
            path='/colleges/:collegeKey/programs/:programId'
            element={<ProgramDetail />}
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
