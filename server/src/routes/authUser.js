const { Router } = require("express");
const express = require("express");
const User = require("../controllers/authUser");
const UserSchema =require('../models/user')
const UserRoutes=express.Router()

UserRoutes.post('/signin',User.Signin)
UserRoutes.post('/signup',User.UserController)
UserRoutes.post('/profile',User.requireSignin,(req,res)=>{
    res.status(200).json({
        user:'profile'
    })
})

module.exports=UserRoutes