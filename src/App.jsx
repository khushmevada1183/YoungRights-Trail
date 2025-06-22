import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Stories from '@/pages/Stories';
import Quizzes from '@/pages/Quizzes';
import RightsMap from '@/pages/RightsMap';
import RightsGuide from '@/pages/RightsGuide';
import News from '@/pages/News';
import '@/styles/animations.css';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/rights-map" element={<RightsMap />} />
          <Route path="/rights-guide" element={<RightsGuide />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App; 