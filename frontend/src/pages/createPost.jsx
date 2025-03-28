// createPost.jsx
import React from 'react'
import Header from "../components/header.jsx"
import PostForm from '../components/postForm.jsx';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate("/")
  }

  const handlePostSubmit = async (postData) => {
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Post created successfully:', result)
        navigate('/') // Navigate back to home after successful post
      } else {
        console.error('Failed to create post:', response.status)
      }
    } catch (error) {
      console.error('Error submitting post:', error)
    }
  }

  return (
    <div className='w-full h-screen md:p-0 p-3 flex flex-col justify-center items-center bg-purple-300'>
      <Header />

      <div className='w-full h-1/2 flex items-center justify-center'>
        <PostForm onSubmit={handlePostSubmit} />
      </div>
    </div>
  )
}

export default CreatePost
