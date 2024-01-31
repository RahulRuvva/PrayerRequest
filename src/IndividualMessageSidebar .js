// IndividualMessageSidebar.js

import React from 'react';

const IndividualMessageSidebar = ({ message, onClose }) => {
  return (
    <div className="individual-message-sidebar">
      <div className="close-btn" onClick={onClose}>
        &times;
      </div>
      <div>
        <img src={message.image} alt={message.name} className='image-style' />
        <h3>{message.name}'s Details</h3>
        <p>{message.description}</p>
        <p>Time: {message.time}</p>
      </div>
    </div>
  );
};

export default IndividualMessageSidebar;
