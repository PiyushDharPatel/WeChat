const express =require("express");
const{checkUser}=require("../controllers/checker");

const router=express.Router();
router.route("/").get(checkUser)

module.exports=router;