const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const userRouter=require('./routes/userRoutes')
const checkRouter=require('./routes/checkroute')
const chatRouter=require('./routes/chatroute')
const asyncHandler=require("express-async-handler");
const User=require('./models/user.Model')

const connectDb = require("./configure/dbConnection");
const cors=require('cors');
connectDb()

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors:{
        origin:"*"
    }
 });
let  mapi=new Map()
let mapi2=new Map()
io.on("connection", (socket) => {
  
    
  socket.on('ehlo',async(name)=>{
    mapi[name.user]=socket.id;
    mapi2[socket.id]=name.user
    console.log(mapi2)
    
    name.friends.forEach(
    (item)=>{socket.to(mapi[item]).emit('refresh2',name.user)}
  )
    let arr=[]
    if(name.friends){
    name.friends.forEach(element => {
      if(mapi[element]){
        arr.push(element)
      }
    });
    socket.emit('getonline',arr)}
    //console.log(name)
  })
  socket.on('geton',(name)=>{
    let arr=[]
    if(name.friends){
    name.friends.forEach(element => {
      if(mapi[element]){
        arr.push(element)
      }
    });
    socket.emit('getonline',arr)}
  })
  socket.emit('message',"Welcome User");
  socket.on('join', function(room) {
    // socket.join(room.user1+room.user2);
    // mapi[room.user2].join(room.user1+room.user2)
    // mapi[room.user2].emit('message',"You joined")
    // const clients = io.sockets.adapter.rooms.get(room.user1+room.user2);
    // console.log("hi")
    // console.log(clients)
});
socket.on('send',(data)=>{
  console.log("hi")
  socket.to(mapi[data.reciever]).emit('recieve',{sender:data.sender,message:data.message,date:(new Date())})
  
})
socket.on('activity',async(name)=>{
  console.log(name.name)
  if(mapi[name.name]){socket.to(mapi[name.name]).emit('activityr',mapi2[socket.id])}
})
socket.on('add',(user)=>{
  socket.to(mapi[user]).emit('add2')
})
socket.on('disconnect', async() => {
  let user=mapi2[socket.id]
  
  mapi2[socket.id]=''
  
  mapi[user]=''
  
  const jus=await User.findOne({username:user})
  if(jus&&jus.friends){jus.friends.forEach(
    (item)=>{socket.to(mapi[item]).emit('refresh',user)}
  )}
});
});
app.use(express.json());
app.use(
  cors({
      origin:"*"
  })
)
app.use('/user',userRouter);
app.post("/api/checkall",asyncHandler(async(req,res,next)=>{
  const {username,usermail}=req.body
  if(username){
  const data=await User.findOne({username:username})
  if(data){
      
      res.status(200).send({success:true}) }else{
          res.status(200).send({success:false})
      } }else{
      
      const data=await User.findOne({email:usermail})
      if(data){
      res.status(200).send({success:true}) }else{
          res.status(200).send({success:false})
      } 
  }
}))
app.use("/logged",checkRouter)
app.use("/chat",chatRouter)
httpServer.listen(8080);
