import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  
  const closeNav = () => {
    setIsNavOpen(false);
  }

  return (
    <header className="main-header">
      <nav className="main-nav" aria-label="Main navigation">
        <div className="logo">
          <NavLink to="/" aria-label="YoungRights Trail Home" onClick={closeNav}>
            <img src="/assets/images/youngrights-trail-logo.svg" alt="YoungRights Trail Logo" className="logo-image" />
          </NavLink>
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
            <NavLink to="/" className={({isActive}) => "nav-link" + (isActive ? " active" : "")} role="menuitem" onClick={closeNav}>Home</NavLink>
          </li>
          <li role="none">
            <NavLink to="/stories" className={({isActive}) => "nav-link" + (isActive ? " active" : "")} role="menuitem" onClick={closeNav}>Stories</NavLink>
          </li>
          <li role="none">
            <NavLink to="/rights-guide" className={({isActive}) => "nav-link" + (isActive ? " active" : "")} role="menuitem" onClick={closeNav}>Rights Guide</NavLink>
          </li>
          <li role="none">
            <NavLink to="/quizzes" className={({isActive}) => "nav-link" + (isActive ? " active" : "")} role="menuitem" onClick={closeNav}>Quiz</NavLink>
          </li>
          <li role="none">
            <NavLink to="/rights-map" className={({isActive}) => "nav-link" + (isActive ? " active" : "")} role="menuitem" onClick={closeNav}>Global Map</NavLink>
          </li>
          <li role="none">
            <NavLink to="/news" className={({isActive}) => "nav-link" + (isActive ? " active" : "")} role="menuitem" onClick={closeNav}>News</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
