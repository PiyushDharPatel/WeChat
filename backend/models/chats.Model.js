const mongoose =require("mongoose");

const userSchema=new mongoose.Schema({
    roomname:{
        type:String,
        required:true,
        unique:true,
    },
   
    chats:Array,
    date:Date,
    
},{timestamps:false});

module.exports=mongoose.model("chat",userSchema);