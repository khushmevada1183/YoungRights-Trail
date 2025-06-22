import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  
  const closeNav = () => {
    setIsNavOpen(false);
  }
  
  const handleNavClick = (path) => (e) => {
    e.preventDefault();
    // Close the mobile nav
    setIsNavOpen(false);
    
    // If we're already on this page, just scroll to top smoothly
    if (window.location.pathname === path) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      // Otherwise navigate to the new page and then scroll
      navigate(path);
      // Small delay to ensure navigation completes first
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  }

  return (
    <header className="main-header">
      <nav className="main-nav" aria-label="Main navigation">
        <div className="logo">
          <a href="/" aria-label="YoungRights Trail Home" onClick={handleNavClick("/")}>
            <img src="/assets/images/youngrights-trail-logo.svg" alt="YoungRights Trail Logo" className="logo-image" />
          </a>
        </div>
        <button 
          className="nav-toggle" 
          aria-label="Toggle navigation" 
          aria-expanded={isNavOpen}
          onClick={handleToggle}
        >
          <span className="nav-toggle-icon"></span>
        </button>
        <ul className={`nav-links ${isNavOpen ? 'active' : ''}`} role="menubar">
          <li role="none">
            <a href="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"} role="menuitem" onClick={handleNavClick("/")}>Home</a>
          </li>
          <li role="none">
            <a href="/stories" className={window.location.pathname === "/stories" ? "nav-link active" : "nav-link"} role="menuitem" onClick={handleNavClick("/stories")}>Stories</a>
          </li>
          <li role="none">
            <a href="/rights-guide" className={window.location.pathname === "/rights-guide" ? "nav-link active" : "nav-link"} role="menuitem" onClick={handleNavClick("/rights-guide")}>Rights Guide</a>
          </li>
          <li role="none">
            <a href="/quizzes" className={window.location.pathname === "/quizzes" ? "nav-link active" : "nav-link"} role="menuitem" onClick={handleNavClick("/quizzes")}>Quiz</a>
          </li>
          <li role="none">
            <a href="/rights-map" className={window.location.pathname === "/rights-map" ? "nav-link active" : "nav-link"} role="menuitem" onClick={handleNavClick("/rights-map")}>Global Map</a>
          </li>
          <li role="none">
            <a href="/news" className={window.location.pathname === "/news" ? "nav-link active" : "nav-link"} role="menuitem" onClick={handleNavClick("/news")}>News</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
