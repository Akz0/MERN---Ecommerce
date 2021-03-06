const UserSchema = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const UserController=(req,res)=>{
    UserSchema.findOne({email:req.body.email}).exec(async (error,user)=>{
        if(user) return res.status(400).json({
            message:  "Admin Already Exists"
        })
        const {firstName,lastName,username,email,password}=req.body
        const hash_password= await bcrypt.hash(password,10)
        const _newUser=  new UserSchema ({firstName,lastName,username:Math.random().toString(),email,hash_password,role:'admin'})
        _newUser.save((error,data)=>{
            if(error){
                console.log(error)
                return res.status(400).json({
                    message: "Something went wrong. Please Try again."
                })
            }
            if(data){
                return res.status(201).json({
                    message: 'Admin Created Successfully'
                })
            }
        })
    }) 
}

const Signin=(req,res)=>{
    UserSchema.findOne({email:req.body.email}).exec((error,user)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(user){
            if(user.authenticate(req.body.password)  &&  user.role==='admin'){
                const token =   jwt.sign({_id:user._id,role:user.role},process.env.JWT_KEY, {expiresIn:'20h'})
                const {_id,firstName,lastName,email,role,fullName}=user
                res.cookie('token',token,{expiresIn:'20h'})
                res.status(200).json({token,user:{_id,firstName,lastName,email,role,fullName}})
            }
        }
        else{
            return res.status(400).json({message: "Invalid Username or Password" })
        }
    })
}

const Signout=(req,res)=>{
    res.clearCookie('token')
    res.status(200).json({
        message:'Sign Out Successful'
    })
}


exports.UserController=UserController
exports.Signin=Signin 
exports.Signout=Signout