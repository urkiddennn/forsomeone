import React from 'react';
import Header from "../components/header.jsx";
import PostForm from '../components/postForm.jsx';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handlePostSubmit = async (postData) => {
    try {
      const response = await fetch('https://forsomeone-five.vercel.app/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Post created successfully:', result);
        navigate('/'); // Navigate back to home after successful post
      } else {
        const errorData = await response.json();
        console.error('Failed to create post:', response.status, errorData);
        // Optionally, you could pass this error back to PostForm via a callback
        throw new Error(errorData.error || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error submitting post:', error.message);
    }
  };

  return (
    <div className='w-full h-screen md:p-0 p-3 flex flex-col justify-center items-center bg-purple-300'>
      <Header />
      <div className='w-full h-1/2 flex items-center justify-center'>
        <PostForm onSubmit={handlePostSubmit} />
      </div>
    </div>
  );
}

export default CreatePost;
