const mongoose=require('mongoose')
const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    img:{type:String},
    parentID:{
        type:String,
    }

},{timestamps:true})

module.exports= mongoose.model('CategorySchema',CategorySchema)