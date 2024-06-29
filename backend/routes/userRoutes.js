const express =require("express");

const router=express.Router();
const{createUser,checkUser,addFriend,remfriend}=require("../controllers/userController");
//router.route("/register").post(createUser);
//router.route("/").post(checkUser);
router.use("/login",
    checkUser
)
router.use("/register",
    createUser
)
router.use("/addf",
    addFriend
)
router.use("/rem",
    remfriend
)
// router.route("/user/:id").put(updateUser).get(getUser).delete(deleteUser);
module.exports=router;
// router.post("/register",(req,res)=>{
//     let user=new UserModel({
//         username : req.body.username,
//         password : req.body.password
    
// })
//     user.save()
//     res.send({success : true})});



// router.post("/login",(req,res)=>{
//     res.json({message:"Current user information"});

// });
// router.post("/current",(req,res)=>{
//     res.json({message:"Register the User "});

// });
