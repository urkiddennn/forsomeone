import React from 'react';

const ListMessages = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center bg-white'>
        <p>No messages found.</p>
      </div>
    );
  }

  return (
    <div className='w-full h-screen flex flex-col items-center bg-white p-3'>
      <h1 className='text-2xl font-bold self-start'>Messages</h1>
      <ul className='w-full p-10 flex gap-10 flex-wrap'> {/* Added flex-wrap for better layout */}
        {messages.map((message) => (
          <div
            className='w-60 h-48 outline-2 rounded-lg flex items-center justify-center flex-col'
            key={message._id} // Fixed key to use _id from MongoDB
          >
            <img
              src={message.avatar}
              alt={`${message.name}'s avatar`}
              className='w-32 h-32'
            />
            <div>
              <p><strong>To:</strong> {message.name}</p>
              <p><strong>Message:</strong> {message.post}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListMessages;
