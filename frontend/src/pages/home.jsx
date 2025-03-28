import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import Header from "../components/header.jsx";
import ListMessages from '../components/listMessages.jsx';

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all messages when the component mounts
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setAllMessages(data);
      setFilteredMessages(data); // Initially show all messages
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      setFilteredMessages(allMessages); // Reset to all messages if search is empty
    } else {
      const filtered = allMessages.filter((message) =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  };

  // Handle real-time search as user types
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredMessages(allMessages);
    } else {
      const filtered = allMessages.filter((message) =>
        message.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <Header />
      <section className='w-full h-1/2 flex justify-center items-center flex-col gap-3 bg-yellow-200'>
        <h1 className='text-3xl mb-3 font-bold'>
          Find the message of <span className='font-bold text-red-500'>Someone</span>. Is it here?
        </h1>
        <form onSubmit={handleSubmit} className='flex md:w-1/2 w-full gap-2 p-2 md:p-0'>
          <div className='outline-1 rounded-lg w-3/4 flex items-center p-3 gap-1 bg-white'>
            <FaSearch />
            <input
              type="text"
              placeholder='Search someone'
              className='h-full w-full outline-none ml-2'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button
            type="submit"
            className='font-bold outline-1 bg-purple-300 w-1/4 rounded-lg'
          >
            Find Someone
          </button>
        </form>
      </section>
      <section className='w-full h-1/2'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ListMessages messages={filteredMessages} />
        )}
      </section>
    </div>
  );
};

export default Home;
