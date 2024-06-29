import React from 'react'
import { useEffect,useState } from 'react'
import user from './user.jpg'
import api from '../API/api'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate()
    const check=()=>{
        const token = localStorage.getItem('token')
        if (!token) {
          
        } else {
          api.get('/logged', {
            headers: {
              Authorization: token
            }
          }).then(res => {
           
            if (res.data.success) {
              navigate('/Home')
              
                
      
            } else {
              localStorage.removeItem('token')
             
      
            }
          }).catch((err) => {
            localStorage.removeItem('token')
         
          })
        }
      }
      useEffect(() =>{   check()}, [])
    const handleClick=()=>{
        api.post('/user/login',{username:name,password:password}).then((res)=>{if(res.data.success){
            localStorage.setItem('token',res.data.token)
            navigate('/Home')
        }}).catch((err)=>{window.alert('Something went wrong, Enter Correct Credentials')})
    }
  return (
    <div className='h-screen w-screen bg-teal-200 flex flex-col items-center justify-center'>
     <div className='bg-white px-2 py-5 shadow-gray-800 shadow-lg flex flex-col items-center rounded-lg w-[30vw]'>
     <h1 className='text-3xl font-semibold'>Login</h1>
     <img src={user} className='h-32 mt-4 w-32 rounded-full'/>
     <div className='flex w-full flex-col p-2'>
     <label className='text-xl self-start font-semibold '>Enter User Name</label>
     <input value={name} onChange={(e)=>{setName(e.target.value)}} type='text' className='h-10 px-3 w-full bg-gray-100 rounded-md my-2'/>
     </div>
     <div className='flex w-full flex-col p-2'>
     <label className='text-xl self-start font-semibold '>Enter User Password</label>
     <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type='password' className='h-10 px-2 w-full bg-gray-100 rounded-md my-2'/>
     </div>
     
     <button onClick={()=>{handleClick()}} className='rounded-lg w-28 h-10 p-2 mt-2 transition-all duration-300 ease-in-out bg-teal-300 hover:brightness-105 hover:scale-105 hover:shadow-md hover:shadow-black'>Login</button>
     <div className='mt-2'>Not a User? <span onClick={()=>{navigate('/signin')}} className='text-blue-500 cursor-pointer'>Sign in</span></div>
     </div>
     
    </div>
  )
}

export default Login
