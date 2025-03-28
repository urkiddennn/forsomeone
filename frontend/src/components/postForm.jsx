import React, { useState } from 'react'

const PostForm = ({ onSubmit }) => { // onSubmit is destructured from props
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (typeof onSubmit === 'function') {
      onSubmit({ name, message })
      setName('')
      setMessage('')
    } else {
      console.error('onSubmit is not a function')
    }
  }

  return (
    <div className='md:w-1/4 w-full  outline-2 rounded-lg p-3 flex flex-col justify-center items-center bg-white gap-2'>
      <h1 className='font-bold text-lg'>Add message to someone</h1>

      <input
        type="text"
        placeholder='Name of someone'
        id="name"
        className='w-full h-12 outline-2 rounded-lg p-2'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        name="message"
        id="message"
        className='w-full h-32 outline-2 rounded-lg p-2'
        placeholder='Message to someone'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className='outline-2 p-3 text-lg font-bold rounded-lg w-32 bg-red-300'
        onClick={handleSubmit}
      >
        Post
      </button>
    </div>
  )
}

export default PostForm
