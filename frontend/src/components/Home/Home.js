import React from 'react'
import { io } from "socket.io-client";
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftPanel from '../LeftPanel/LeftPanel';
import Main from '../RightPanel/Main'
import Login from '../Login/Login';
import api from '../API/api';

const Home = () => {
 const [ispop6,setIspop6]=useState(false)
 const [mann,setMann]=useState('')
 const [typ,setTyp]=useState(false)
 const [isuser,setIsuser]=useState(false)
 const [user,setUser]=useState('')
 const [rec,setRec]=useState('')
 const [onem,setOnem]=useState()
 

 const [activity,setActivity]=useState('')
 const [rec2,setRec2]=useState('')
 const [online,setOnline]=useState([])
 const [chats,setChats]=useState([])
 const [status,setStatus]=useState('')
 const [messages,setMessages]=useState([])
 const [isadded,setIsadded]=useState(true)
 const [adduser,setAdduser]=useState('')
 const [friends,setFriends]=useState([])
 const [trig,setTrig]=useState(true)
const [socket,setSocket]=useState()
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
        
        setUser(res.data.username)
        setFriends(res.data.friends)  
        setChats(res.data.last)
        const newsocket = io("http://localhost:8080",{username:res.data.username})
        setSocket(newsocket)

      } else {
        localStorage.removeItem('token')
       navigate('/')

      }
    }).catch((err) => {
      localStorage.removeItem('token')
      navigate('/')
    })
  }
}
const handleClick=(name)=>{
    socket.emit('join',{user1:user,user2:name})
    console.log(name+'k')
    setRec(name)
   
    api.post('/chat/get',{user1:user,user2:name}).then((res)=>{console.log(name);setMessages(res.data.data);}).catch((err)=>console.log(err))
}
useEffect(() =>{   check();
  
 
}, [])

useEffect(()=>{
  if(socket){then();}
},[socket,])
const then=()=>{socket.on('connect',function(){ 
  
  socket.emit('ehlo', {user:user,friends:friends});
});
  socket.on('getonline',(data)=>{
    setOnline(data)
  })
  socket.on('recieve',(data)=>{
    let ari=[]
    chats.forEach((e)=>{
      if(e.name===data.sender){
        let au=e
        au.last[0]=data
        ari.push(au)
      }else{
        ari.push(e)
      }
    })
    setChats(ari)
    
   
    if(data.sender){let arr=messages
      setOnem({sender:data.sender,message:data.message,date:data.date});
  }else{
    }})
  socket.on("message", (message) => {
    console.log(message); 
  });
  socket.on('refresh',(name)=>{
    socket.emit('geton',{friends:friends})
    
  })
  socket.on('activityr',(name)=>{
    console.log(name)
    setActivity(name)
  })
  socket.on('add2',()=>{
    check()
  })
  socket.on('refresh2',(name)=>{

    socket.emit('geton',{friends:friends})

    
  })
}
const handleactive=(name)=>{
  socket.emit('activity',{name})

}
const [krig,setKrig]=useState(true)
const handleRemove=(name)=>{
  api.post('/user/rem',{user:user,name:name}).then((res)=>{if(res.data.friends){setFriends(res.data.friends);};let arr=[];chats.forEach((item)=>{if(item.name!=name){arr.push(item)}});setChats(arr);setRec('');setKrig(!krig);socket.emit('add',name)}).catch((err)=>{console.log(err)})
}
useEffect(()=>{
  console.log(activity)
  if(activity&&activity===rec){
      setTyp(true)
      setActivity('')
      setTimeout(()=>{
        setTyp(false)
      },3000)
  }
},[activity])



const handleDis=()=>{
  socket.disconnect()
}
 useEffect(()=>{
  if(onem&&onem.sender===rec){let arr=messages
  arr.push(onem)
    setMessages(arr)
    setTrig(!trig)}
 },[onem])
  const handleSend=(name,message)=>{
    let read=false;
    if(online.includes(name)){
      read=true
    }
    socket.emit('send',{sender:user,reciever:name,message:message})
    let arr=messages
    let date=new Date(Date.now())
    console.log(date)
    arr.push({sender:user,message:message,read:read,date:date.toISOString()})
    setMessages(arr)
    
    let ari=[]
    chats.forEach((e)=>{
      if(e.name===name){
        let au=e
        au.last[0]={sender:user,message:message}
        ari.push(au)
      }else{
        ari.push(e)
      }
    })
    console.log(ari)
    setChats(ari)
    setTrig(!trig)
    api.post('chat/add',{user1:user,user2:name,message:message,read:read})
  }
  const handleAdd=()=>{
    console.log(user)
    api.post('/user/addf',{username1:user,username2:mann}).then((res)=>{if(res.data.success){let arr=chats;arr.push({name:mann,last:[]});socket.emit('geton',{friends:res.data.friends});setChats(arr);setFriends(res.data.friends);socket.emit('add',mann)};setAdduser('');setIsuser(false);setIsadded(!isadded);setIspop6(false)}).catch(()=>{window.alert('Something Went Wrong! Try Again.')})
  }
  const handlSearch=()=>{
    if(mann.length>0){
      api.post("/api/checkall",{
      username:mann,
      usermail:false
    },{
      headers: {
          'Content-Type': 'application/json'
      }
  }).then((res)=>{
      if(res.data.success){
        setIsuser(true)
        setAdduser(mann)
        console.log('hi')
      }
      else{
        setIsuser(true)
        setAdduser('')
      }
    }).catch((err)=>{
      setIsuser(true)
      setAdduser('')})
  
}else{
  window.alert('Enter an username first')
}
  
  }
  return (
    <div className='flex flex-row'>
      {ispop6&&<div className=' flex z-20 fixed h-full w-full bg-black bg-opacity-20 items-center justify-center'>
    <div className='bg-white w-[30vw] rounded-xl shadow-lg shadow-gray-600 items-center px-8 py-5 flex flex-col h-[35vh]'>
    <h1 className='text-xl self-start font-semibold'>Hello! enter the username of person you want to add</h1>
    <div className='flex mt-4 h-24 flex-col p-1'>
          <label className='font-semibold'>Username </label>
        <input type='text' value={mann} onChange={(e)=>{setMann(e.target.value)}} className='w-72 border-[1px] rounded-sm px-2 border-gray-500 border-solid h-10'/></div>
        {isuser&&<div className='bg-gray-100 m-2 h-10 w-full'>
          {adduser?<div>Name : {adduser}<button onClick={()=>{handleAdd()}} className='w-16 bg-teal-300 ml-10 rounded-full h-8 text-white font-semibold'>Add</button></div>:<div>No Such User Found</div>}
        </div>

        }
       
       <div  className='flex flex-row justify-between w-full h-14'><button onClick={()=>{handlSearch()}} className='w-28 h-10 bg-blue-700 text-white hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Submit</button>
       <button onClick={()=>{setAdduser('');setIsuser(false);setIspop6(false)}} className='w-28 h-10 bg-blue-700 text-white hover:brightness-75 transition-all duration-300 ease-in-out rounded-full'>Cancel</button>

       </div>
      </div>
      </div>}
      <LeftPanel
      ispop6={ispop6}
      setIspop6={setIspop6}
      friends={friends}
      handleClick={handleClick}
      online={online}
      handleDis={handleDis}
      chats={chats}
      krig={krig}
      />
      {rec&&<Main name={rec}
      messages={messages}
      setMessages={setMessages}
      status={status}
      handleSend={handleSend}
      rig={trig}
      setRec2={setRec2}
      typ={typ}
      handleactive={handleactive}
      handleRemove={handleRemove}
      
      />}
    </div>
  )
}

export default Home
