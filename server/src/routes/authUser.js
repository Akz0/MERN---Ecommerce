const { Router } = require("express");
const  {check} = require('express-validator')
const express = require("express");
const User = require("../controllers/authUser");
const UserSchema =require('../models/user');
const { SignUpValidation, isRequestValid, requireSignin,SignInValidation } = require("../validators/userAdminAuth");
const UserRoutes=express.Router()

UserRoutes.post('/signin',SignInValidation,isRequestValid,User.Signin)
UserRoutes.post('/signup',SignUpValidation, isRequestValid ,User.UserController)
UserRoutes.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({
        user:'profile'
    })
})

module.exports=UserRoutes