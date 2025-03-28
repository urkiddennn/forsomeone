import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaBackspace } from "react-icons/fa";

function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    const handleCreatePost = () => {
        navigate("/post")
    }

    const handleBack = () => {
        navigate("/")
    }

    return (

        <header className='w-full h-18 fixed   top-0 left-0 border-b-2 flex flex-row-reverse pr-10 pl-10 justify-between bg-white items-center'>
             <button
                className='w-32 h-12 bg-yellow-200 font-bold border-2 rounded-lg'
                onClick={handleCreatePost}
            >
                Create post
            </button>
            {location.pathname === "/post" && (
                <button
                    className='outline-2 p-3 w-32 h-12 bg-white rounded-lg flex items-center gap-3 justify-between text-lg font-bold'
                    onClick={handleBack}
                >
                    <FaBackspace size={"2em"} />
                    Back
                </button>
            )}

        </header>
    )
}

export default Header
    