const { Router } = require("express");
const express = require("express");
const User = require("../../controllers/admin/authAdmin");
const UserSchema =require('../../models/user');
const { SignUpValidation, isRequestValid,requireSignin, SignInValidation } = require("../../validators/userAdminAuth");
const UserRoutes=express.Router()

UserRoutes.post('/admin/signin',SignInValidation,isRequestValid,User.Signin)
UserRoutes.post('/admin/signup',SignUpValidation,isRequestValid,User.UserController)
UserRoutes.post('/admin/signout',User.Signout)

UserRoutes.post('/admin/profile',requireSignin,(req,res)=>{
    res.status(200).json({
        admin:'profile'
    })
})

exports.AdminRoutes=UserRoutes