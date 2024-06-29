import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
const Chat = ({name,handleClick,online,chat}) => {
    const [trig,setTrig]=useState(true)
    useEffect(()=>{
        console.log('nah')
        setTrig(!trig)
    },[online])
  return (
    <div onClick={()=>{
      console.log(name+'i')
        handleClick(name)
    }} className='w-full hover:bg-gradient-to-r from-slate-200 to-white transition-all duration-300 ease-in-out flex flex-row items-center px-4 h-16 bg-white '>
    {name}{chat[0]?chat[0].sender===name?<div className='ml-3'>{chat[0].message}</div>:<div className='ml-3'>you : {chat[0].message}</div>:''}
    {online.includes(name)?<div className='w-2 h-2 mr-0 ml-auto rounded-full bg-green-400'></div>:<div className='w-2 h-2 mr-0 ml-auto rounded-full bg-gray-400'></div>}
    </div>
  )
}

export default Chat
