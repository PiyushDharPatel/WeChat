import React from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useEffect,useState,useRef } from 'react';
import emoo from './emoo.svg'
const Main = ({name,handleSend,messages,setRec2,typ,handleactive,handleRemove}) => {
    const [inp,setInp]=useState() 
    const [trig,setTrig]=useState(true)
    const messagesEndRef = useRef(null)
    const input1=useRef()
    const [emoji,setEmoji]=useState(false)
    const [em,setEm]=useState('')
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(()=>{
    setRec2(name)
  },[name])
    useEffect(()=>{
        setTrig(!trig)     
    },[messages])
    useEffect(()=>{
        scrollToBottom()
    })
    useEffect(()=>{
        if(em){
          let ref=input1.current
          ref.focus()

          let start=(inp?inp.substring(0,ref.selectionStart):'')
          let end=(inp?inp.substring(ref.selectionStart):'')
          let text=start+em+end;
          
          
          setInp(text);

          setEm('')
          
        }
    },[em])
  return (
    <div className=' w-[70vw]   bg-gray-400 m-2'>
      <h1 className='text-2xl flex flex-row px-20 font-semibold p-1 bg-teal-300'>{name}{typ&&<div className='text-white ml-20 text-md '>typing....</div>}<button onClick={()=>{handleRemove(name)}} className='justify-center ml-auto mr-0 hover:brightness-105 hover:scale-105 hover:shadow-md hover:shadow-black transition-all duration-300 ease-in-out items-center rounded-full text-lg w-20 bg-red-300 h-9 '>Remove</button></h1>
      <ul className='flex flex-col h-[85vh] overflow-y-scroll w-full '>{messages.map((message)=>(message.sender===name?<li className='bg-white text-wrap w-96 h-auto flex flex-row m-2 p-2 self-start rounded-2xl'>{message.message}<div className=' text-xs ml-auto mr-0'>{new Date((new Date(message.date))-(new Date(message.date)).getTimezoneOffset()*60*1000).toISOString().split('T')[1].split(':')[0]+':'+new Date((new Date(message.date))-(new Date(message.date)).getTimezoneOffset()*60*1000).toISOString().split('T')[1].split(':')[1]}</div></li>:<li className='bg-teal-300 flex flex-row text-wrap w-96  h-auto m-2 p-2 self-end rounded-2xl'>{message.message}<div className=' text-xs ml-auto mr-1'>{new Date((new Date(message.date))-(new Date(message.date)).getTimezoneOffset()*60*1000).toISOString().split('T')[1].split(':')[0]+':'+new Date((new Date(message.date))-(new Date(message.date)).getTimezoneOffset()*60*1000).toISOString().split('T')[1].split(':')[1]}</div><div className='text-xs self-end'>{message.read?'Seen':'Sent'}</div></li>))}<div ref={messagesEndRef} /></ul>
      <div className='flex justify-center items-center flex-row h-16 bg-teal-400'><input type='text' placeholder='Enter Your Text' ref={input1} value={inp} onChange={(e)=>{setInp(e.target.value);handleactive(name);}} className='h-10 px-4 mx-4 w-[60vw] '/><div className='bottom-20 right-12 fixed '><EmojiPicker autoFocusSearch={false} open={emoji} onEmojiClick={(e)=>{setEm(e.emoji)}}/></div><img onClick={()=>{setEmoji(!emoji);if(!emoji){input1.current.focus()}}} className='h-6 cursor-pointer w-6' src={emoo}/><button onClick={()=>{handleSend(name,inp);setInp('')}} className='ml-5 rounded-xl w-16 h-8 bg-teal-300'>Send</button></div>
    </div>
  )
}

export default Main