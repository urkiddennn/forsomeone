import React, { useState } from 'react';

const PostForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const maxChars = 25;

  const handleMessageChange = (e) => {
    const newMessage = e.target.value;
    if (newMessage.length <= maxChars) {
      setMessage(newMessage);
    } else {
      setMessage(newMessage.slice(0, maxChars));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Validation
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!message.trim()) {
      setError('Message is required');
      return;
    }

    if (typeof onSubmit === 'function') {
      onSubmit({ name, message });
      setName('');
      setMessage('');
    } else {
      console.error('onSubmit is not a function');
    }
  };

  return (
    <div className='md:w-1/4 w-full outline-2 rounded-lg p-3 flex flex-col justify-center items-center bg-white gap-2'>
      <h1 className='font-bold text-lg'>Add message to someone</h1>

      {error && (
        <p className='text-red-500 text-sm'>{error}</p> // Display error message
      )}

      <input
        type="text"
        placeholder='Name of someone'
        id="name"
        className={`w-full h-12 outline-2 rounded-lg p-2 ${error && !name.trim() ? 'border-red-500' : ''}`}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        name="message"
        id="message"
        className={`w-full h-32 outline-2 rounded-lg p-2 ${error && !message.trim() ? 'border-red-500' : ''}`}
        placeholder='Message to someone'
        value={message}
        onChange={handleMessageChange}
        maxLength={maxChars}
      />
      <p className='text-sm text-gray-500'>{message.length}/{maxChars}</p>

      <button
        className='outline-2 p-3 text-lg font-bold rounded-lg w-32 bg-red-300'
        onClick={handleSubmit}
      >
        Post
      </button>
    </div>
  );
};

export default PostForm;
