import React from 'react';

const AllMessageCompo = ({ messages }) => {
  console.log(messages); // Log received messages

  return (
    <div className="message-component">
      <h2>Unread Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <div className="image-message-content">
                {message.image && <img src={message.image} alt={message.name} className='image-style' />}
             <div className="message-content">
                <h5>{message.name}</h5>
                <p>{message.description}</p>
              </div>
              <p>{message.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllMessageCompo;
