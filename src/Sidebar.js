// Sidenav.js

import React, { useState, useEffect } from 'react';
import './App.css';
import AllMessageCompo from './AllMessageCompo';
import DraftCompo from './DraftCompo';
import UnreadComp from './UnreadComp';
import Image from './Assets/woman.jpg';
import IndividualMessageSidebar from './IndividualMessageSidebar ';

const Sidenav = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [subSubmenuVisible, setSubSubmenuVisible] = useState(false);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setSubSubmenuVisible(true); // Open the subsubmenubar when a message is clicked
  };

  const closeIndividualMessage = () => {
    setSelectedMessage(null);
    setSubSubmenuVisible(false); // Close the subsubmenubar when the individual message is closed
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    setSubmenuVisible(false);
    setSubSubmenuVisible(false);
    setSelectedCategory('all');
  };

  const toggleSubmenu = () => {
    setSubmenuVisible(!submenuVisible);
    setSubSubmenuVisible(false);
  };

  const toggleSubSubmenu = (category) => {
    setSubSubmenuVisible(!subSubmenuVisible);
    setSelectedCategory(category);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setSubmenuVisible(false);
    setSubSubmenuVisible(false);
    setSelectedCategory('all');
  };

  const messages = {
    all: [
      { name: 'John Doe', description: 'Hello there! I have seen all...', image: Image, time: '12:30pm' },
      { name: 'Jane Smith', description: 'How are you? I hope...', image: Image, time: '2:45pm' },
    ],
    unread: [
      { name: 'Alice', description: 'New message! hey I have....', image: Image, time: '12:30pm' },
    ],
    important: [
      { name: 'Bob', description: 'Important message,... ', image: Image, time: '2:45pm' },
    ],
    drafts: [
      { name: 'Charlie', description: 'Draft in progress....', image: Image, time: '2:45pm' },
    ],
  };

  useEffect(() => {
    console.log('Fetching data for category:', selectedCategory);
  }, [selectedCategory]);

  const renderComponent = () => {
    switch (selectedCategory) {
      case 'all':
        return <AllMessageCompo messages={messages.all} onMessageClick={handleMessageClick} />;
      case 'unread':
        return <UnreadComp messages={messages.unread} />;
      case 'drafts':
        return <DraftCompo messages={messages.drafts} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="hamburger-icon" onClick={toggleMenu}>
        &#9776;
      </div>

      <div className={`sidebar ${menuVisible ? 'open' : ''}`}>
        <div className="close-btn" onClick={closeMenu}>
          &times;
        </div>
        <ul>
          <i className="fab fa-whatsapp icons fa-2x iconsWhatsapp"></i>
          <li>
            <div onClick={toggleSubmenu}>
              <i className="fab fa-facebook-messenger fa-2x iconsMess"></i>
            </div>
            {submenuVisible && (
              <div className={`submenubar ${menuVisible ? 'open' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Inbox</h3>
                  <i className="fa-solid fa-user-plus fa-lg iconsWhatsapp"></i>
                </div>
                <ul>
                  <li onClick={() => toggleSubSubmenu('all')} className={selectedCategory === 'all' ? 'selected-category' : ''}>All Messages</li>
                  <li onClick={() => toggleSubSubmenu('unread')} className={selectedCategory === 'unread' ? 'selected-category' : ''}>Unread</li>
                  <li onClick={() => toggleSubSubmenu('drafts')} className={selectedCategory === 'drafts' ? 'selected-category' : ''}>Drafts</li>
                </ul>
              </div>
            )}

            {subSubmenuVisible && (
              <div className={`subsubmenubar ${menuVisible ? 'open' : ''}`}>
                {selectedMessage ? (
                  <IndividualMessageSidebar message={selectedMessage} onClose={closeIndividualMessage} />
                ) : (
                  <div>
                  {renderComponent()}
                </div>
                          )}
              </div>
            )}
          </li>
          <i className="fab fa-skype fa-2x iconSkype"></i>
          <li>
            <i className="fab fa-instagram fa-2x iconsInsta"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
