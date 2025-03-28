import React, { useState, useEffect } from 'react';

const ListMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }

      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center bg-white'>
        <p>Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center bg-white'>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-white'>
      <h1 className='text-2xl font-bold mb-4'>Messages</h1>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul className='w-1/2 space-y-4'>
          {messages.map((message) => (
            <li
              key={message._id}
              className='p-4 border rounded-lg shadow-sm bg-gray-50 flex items-start gap-4'
            >
              <img
                src={message.avatar}
                alt={`${message.name}'s avatar`}
                className='w-12 h-12 rounded-full'
              />
              <div>
                <p><strong>To:</strong> {message.name}</p>
                <p><strong>Message:</strong> {message.post}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListMessages;
