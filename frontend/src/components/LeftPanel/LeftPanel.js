import React from 'react'
import Chat from './Chat'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const LeftPanel = ({ispop6,setIspop6,friends,handleClick,online,chats,handleDis,krig}) => {
    const [trig,setTrig]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>{
        setTrig(!trig)
        console.log('hi')
        console.log(chats)
    },[chats])
    useEffect(()=>{
        setTrig(!trig)
    },[friends,krig])
    
  return (
    <div className='w-96 h-[100vh] m-1 bg-gray-100 flex flex-col'>
        <div className='text-2xl h-12 items-center flex flex-row px-4 font-semibold bg-teal-300 '> Chats <button onClick={()=>{setIspop6(true)}} className='justify-center ml-auto mr-0 hover:brightness-105 hover:scale-105 hover:shadow-md hover:shadow-black transition-all duration-300 ease-in-out items-center rounded-full text-lg w-16 bg-red-300 h-9 '>Add</button><button onClick={()=>{localStorage.removeItem('token');handleDis();navigate('/')}} className='justify-center ml-4 mr-2 hover:brightness-105 hover:scale-105 hover:shadow-md hover:shadow-black transition-all duration-300 ease-in-out items-center rounded-full text-lg w-20 bg-red-300 h-9 '>Logout</button></div>
        <ul className='my-2 mx-1'>
            {chats.map((item)=>(<li><Chat name={item.name}
            online={online}
            chat={item.last}
            handleClick={handleClick}/></li>))
            }
        </ul>
        
      
    </div>
  )
}

export default LeftPanel
