import React from 'react';

const IndividualMessage = () => {
    console.log('Individual Item Clicked');
}

const AllMessageCompo = ({ messages, onMessageClick }) => {
  console.log('Received messages in AllMessageCompo:', messages);


  return (
    <div className="message-component">
      <h2>All Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index} onClick={() => onMessageClick(message)}>
            <div className="image-message-content" onClick={() => IndividualMessage()}>
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
