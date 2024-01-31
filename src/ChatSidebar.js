import React from 'react';

const ChatSidebar = ({ selectedChat }) => {
  return (
    <div className="chat-sidebar">
      {/* Render the full chat between the two persons based on the selectedChat */}
      <h2>{selectedChat.name}'s Chat</h2>
      {/* Render the messages, time, etc. */}
    </div>
  );
};

export default ChatSidebar;
