const asyncHandler=require("express-async-handler");
const User=require("../models/user.Model")
const Chat=require("../models/chats.Model")
const addchat=asyncHandler(async(req,res)=>{
    const {user1,user2,message,read}=req.body
    let date=(new Date())
    
    const chat1=await Chat.findOne({roomname:user1+" "+user2})
    const chat2=await Chat.findOne({roomname:user2+" "+user1})
    const ml1=chat1.chats
    ml1.push({sender:user1,message:message,read:read,date:date})
    chat1.overwrite(Object.assign(chat1.toObject(),{chats:ml1}))
    const ml2=chat2.chats
    ml2.push({sender:user1,message:message,read:read,date:date})
    chat2.overwrite(Object.assign(chat2.toObject(),{chats:ml2}))
    await chat1.save()
    await chat2.save()
    res.status(200).send({success:true})
})
const getchat=asyncHandler(async(req,res)=>{
    const {user1,user2}=req.body
    const chat1=await Chat.findOne({roomname:user1+" "+user2})
    const chat2=await Chat.findOne({roomname:user2+" "+user1})
    let cl1=[]
    chat2.chats.forEach((item)=>{
        
            cl1.push({sender:item.sender,message:item.message,read:true,date:item.date})
        
    })
    chat2.overwrite(Object.assign(chat2.toObject(),{chats:cl1}))
    await chat2.save()
    res.status(200).send({data:chat1.chats})
})
module.exports={addchat,getchat}