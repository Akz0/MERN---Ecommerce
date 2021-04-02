const express = require("express");
const User = require("../controllers/user");
const UserSchema =require('../models/user')
const UserRoutes=express.Router()

UserRoutes.post('/signin',(req,res,next)=>{
    
})

UserRoutes.post('/signup',User.UserController)

module.exports=UserRoutes