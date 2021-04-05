const mongoose=require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        max:30
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        max:30
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        max:30
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    hash_password:{
        type:String,
        required:true,
        min:6
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    contact:{
        type:String
    },
    profilePicture:{
        type:String,
    },
},{timeStamps:true})

UserSchema.virtual('password').set(function(password){
    this.hash_password=bcrypt.hashSync(password,10)
})
UserSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})
UserSchema.methods = {
    authenticate : function(password){
        return bcrypt.compareSync(password,this.hash_password)
    }
}

module.exports=mongoose.model('Users',UserSchema)