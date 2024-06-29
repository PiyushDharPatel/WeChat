const asyncHandler=require("express-async-handler");
const User=require("../models/user.Model")
const {hash,compare}=require('bcrypt')
const Chat=require("../models/chats.Model")
const jwt=require('jsonwebtoken')
const createUser=asyncHandler(async(req,res)=>{
    
    const {username, email,password}=req.body;
    console.log(req.body)
    if(!username||!email||!password){
        res.status(400).send(
            {
                success:false,
                message:"All fields are mandatory"
            }
        );
        
    }
    
    const code=await hash(password,10)
    
    let user=new User({
        email : email,
        username : username,
        password : code,  
        friends:[]
    
})
    const nuser=await user.save()
    const payload={
        username:username,
        id:nuser._id
       }
    
       const token = jwt.sign(payload,"Secret",{expiresIn:"24h"})
       return res.status(200).send({
        success:true,
        message:"Logged in Succesfully",
        token:"Bearer "+token
    })
});
const addFriend=asyncHandler(async(req,res)=>{
    const {username1,username2}=req.body
    const user1=await User.findOne({username:username1})
    const user2=await User.findOne({username:username2})
    let fl1=user1.friends
    if(!fl1.includes(username2)&&username1!=username2){fl1.push(username2);
    let fl2=user2.friends
    fl2.push(username1);
    user1.overwrite(Object.assign(user1.toObject(),{friends:fl1}))
    user2.overwrite(Object.assign(user2.toObject(),{friends:fl2}))
    await user1.save()
    await user2.save()
    const chat=new Chat({
        roomname:username1+" "+username2,
        chats:[]
    })
    const chat2=new Chat({
        roomname:username2+" "+username1,
        chats:[]
    })
    await chat.save()
    await chat2.save()
    return res.status(200).send({success:true,friends:fl1
        
    })

    }
    return res.status(200).send({success:false})

})
const remfriend=asyncHandler(async(req,res)=>{
    const {user,name}=req.body
    const doc=await User.findOne({username:user})
    let arr=doc.friends
    let ind=arr.indexOf(name)
    arr.splice(ind)
    console.log(arr)
    doc.overwrite(Object.assign(doc.toObject(),{friends:arr}))
    doc.save()
    const doc2=await User.findOne({username:name})
    let arr2=doc2.friends
    let ind2=arr2.indexOf(user)
    arr2.splice(ind2)
    console.log(arr2)
    doc2.overwrite(Object.assign(doc2.toObject(),{friends:arr2}))
    doc2.save()
    const del=await Chat.deleteOne({roomname:user+" "+name})
    const del2=await Chat.deleteOne({roomname:name+" "+user})
    res.status(200).send({success:true,friends:arr})
})
const checkUser=asyncHandler(async(req,res)=>{
    console.log('hi')
       const {username,password}=req.body
       
       const user=await User.findOne({username:username})
       if(!user){
        return res.status(400).send({
            success:false,
            message:"User not found"
        })
       }
       ans=await compare(password,user.password)
       if(!ans){
            return res.status(401).send({
                success:false,
                message:"Incorrect Password"
            })
       }
       
       const payload={
        username:user.username,
        id:user._id
       }
       const token = jwt.sign(payload,"Secret",{expiresIn:"24h"})
       return res.status(200).send({
        success:true,
        message:"Logged in Succesfully",
        token:"Bearer "+token
    })
})
module.exports={createUser,checkUser,addFriend,remfriend}