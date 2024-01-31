import React, { useState } from 'react';
import './AboutSidenav.css'; // Create a corresponding CSS file

const AboutSidenav = ({ onClose }) => {
  const [aboutSubMenuVisible, setAboutSubMenuVisible] = useState(false);

  const toggleAboutSubMenu = () => {
    setAboutSubMenuVisible(!aboutSubMenuVisible);
  };

  return (
    <div className={`about-sidenav ${aboutSubMenuVisible ? 'open' : ''}`}>
      <div className="close-btn" onClick={onClose}>
        &times;
      </div>
      <ul>
        <li>Section A</li>
        <li>Section B</li>
        <li>Section C</li>
      </ul>
    </div>
  );
};

export default AboutSidenav;
