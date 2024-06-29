const asyncHandler=require("express-async-handler");

//automatic execute try catch block as middle ware for error handling
const jwt=require('jsonwebtoken')

//Importing Mongoose model
const User=require("../models/user.Model");
const Chat=require('../models/chats.Model')
const checkUser=asyncHandler(async(req,res)=>{
    const token=req.header("Authorization")
    if(!token){
        return res.status(401).send({
            success:false,
            message:"Unauthorized"
        })
    }
    const jwtToken=token.replace("Bearer ","")
   
    const user=await jwt.verify(jwtToken,'Secret')
    
    if(user){

        const userdb=await User.findOne({username:user.username})

        if(userdb){
            let last=[]
            
             for await (name of userdb.friends){
                const chat=await Chat.findOne({roomname:userdb.username+" "+name})
                
                if(chat.chats){
                    
                    last.push({name:name,last:chat.chats.splice(-1)})
                    
                }else{
                    last.push({name:name,last:''})
                }
            }
            console.log(last)
            
        res.status(200).send({
            success:true,
            id:user._id,
            username:userdb.username,
            usermail:userdb.email,
            friends:userdb.friends,
            last:last
        })}else{
            res.status(401).send({success:false})
        }
    }

})

module.exports={checkUser}