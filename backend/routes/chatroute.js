const express =require("express");
const {addchat,getchat}=require('../controllers/chatController')
const router=express.Router();
router.use('/add',addchat)
router.use('/get',getchat)
module.exports=router;