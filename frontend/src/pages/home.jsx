import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import Header from "../components/header.jsx"
import ListMessages from '../components/listMessages.jsx';
export const home = () => {

    const [user, newUser] = useState();

    const handleSubmit = async()=>{

    }
    return (
        <div className=' w-full h-screen flex flex-col justify-center items-center'>
            <Header/>
            <section className='w-full h-1/2 flex justify-center items-center flex-col gap-3 bg-yellow-200'>
                <h1 className='text-3xl mb-3 font-bold'>
                    Find the message of  <span className='font-bold text-red-500 '> Someone</span>. Is it here?
                </h1>
                <div className='flex w-1/2 gap-2'>

                <div className='outline-1 rounded-lg w-3/4 flex items-center p-3 gap-1 bg-white'>
                <FaSearch/>
                <input  type="text" placeholder='search someone' className='h-full w-full outline-none ml-2'/>

                </div>
                <button className='font-bold outline-1 bg-purple-300 w-1/4 rounded-lg'> Find Someone</button>
                </div>

            </section>
            <section className='w-full h-1/2'>
                <ListMessages/>

            </section>
        </div>

    )
}


export default home;
