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
      const response = await fetch('https://forsomeone-five.vercel.app/api/post', { // Changed to /api/post
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Post created successfully:', result);
        navigate('/');
      } else {
        // Check if response is JSON before parsing
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Failed to create post';
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } else {
          const text = await response.text();
          console.error('Non-JSON response:', text);
        }
        throw new Error(`${errorMessage} (Status: ${response.status})`);
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
