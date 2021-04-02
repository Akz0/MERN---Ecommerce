const UserSchema = require('../models/user')

const UserController=(req,res,next)=>{
    UserSchema.findOne({email:req.body.email}).exec((error,user)=>{
        if(user) return res.status(400).json({
            message:  "User Already Exists"
        })
        const {firstName,lastName,username,email,password}=req.body
        const _newUser=  new UserSchema ({firstName,lastName,username:Math.random().toString(),email,password})
        _newUser.save((error,data)=>{
            if(error){
                console.log(error)
                return res.status(400).json({
                    message: "Something went wrong. Please Try again."
                })
            }
            if(data){
                return res.status(201).json({
                    message: 'User Created Successfully'
                })
            }
        })
    })
}

exports.UserController=UserController