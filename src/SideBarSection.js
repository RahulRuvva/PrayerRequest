import React, { useState } from 'react';
import './App.css'; // Make sure to create the corresponding CSS file for your styles

const SideBarSection = () => {
  const [menuVisible, setMenuVisible] = useState(false);


  const toggleMenu = () => {
    console.log("Praise JESUS");
    setMenuVisible(!menuVisible);
  };

 
  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div>
      <div className="hamburger-icon" onClick={toggleMenu}>
        &#9776; {/* Unicode character for the hamburger icon */}
      </div>

      <div className={`sidebar ${menuVisible ? 'open' : ''}`}>
        <div className="close-btn" onClick={closeMenu}>
          &times; 
        </div>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Service</li>
        </ul>
      </div>

    </div>
  );
}

export default SideBarSection;
