const { Router } = require("express");
const express = require("express");
const User = require("../../controllers/admin/authAdmin");
const UserSchema =require('../../models/user')
const UserRoutes=express.Router()

UserRoutes.post('/admin/signin',User.Signin)
UserRoutes.post('/admin/signup',User.UserController)

UserRoutes.post('/admin/profile',User.requireSignin,(req,res)=>{
    res.status(200).json({
        admin:'profile'
    })
})

exports.AdminRoutes=UserRoutes