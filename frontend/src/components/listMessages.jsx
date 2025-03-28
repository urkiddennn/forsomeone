import React, { useState } from 'react';

const ListMessages = ({ messages }) => {
  const [selectedMessage, setSelectedMessage] = useState(null); // Track which message's modal is open

  if (!messages || messages.length === 0) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center bg-white'>
        <p>No messages found.</p>
      </div>
    );
  }

  // Truncate message if longer than 50 characters
  const truncateMessage = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Open modal with the selected message
  const openModal = (message) => {
    setSelectedMessage(message);
  };

  // Close modal
  const closeModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className='w-full h-screen flex flex-col items-center bg-white p-3'>
      <h1 className='text-2xl font-bold self-start'>Messages</h1>
      <ul className='w-full p-10 flex gap-10 flex-wrap'>
        {messages.map((message) => (
          <div
            className='w-60 h-48 outline-2 rounded-lg flex items-center justify-center flex-col cursor-pointer hover:bg-gray-100'
            key={message._id}
            onClick={() => openModal(message)} // Open modal on click
          >
            <img
              src={message.avatar}
              alt={`${message.name}'s avatar`}
              className='w-32 h-32'
            />
            <div className='text-center'>
              <p><strong>To:</strong> {message.name}</p>
              <p><strong>Message:</strong> {truncateMessage(message.post)}</p>
            </div>
          </div>
        ))}
      </ul>

      {/* Modal */}
      {selectedMessage && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto'>
            <h2 className='text-xl font-bold mb-4'>Message Details</h2>
            <div className='flex items-center gap-4 mb-4'>
              <img
                src={selectedMessage.avatar}
                alt={`${selectedMessage.name}'s avatar`}
                className='w-16 h-16 rounded-full'
              />
              <p><strong>To:</strong> {selectedMessage.name}</p>
            </div>
            <p><strong>Message:</strong> {selectedMessage.post}</p>
            <button
              className='mt-4 bg-red-300 text-white px-4 py-2 rounded-lg'
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListMessages;
