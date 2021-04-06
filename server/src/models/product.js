const mongoose=require('mongoose')
const ProductSchema = new mongoose.Schema({
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
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    offers:{
        type:Number
    },
    productPictures:[
        {img:{type:String}}
    ],
    reviews:[
        {
            userID:{type:mongoose.Schema.Types.ObjectId,
            ref:'User'},
            review:String
        }
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'CategorySchema',
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    updateAt:Date,

},{timestamps:true})

module.exports= mongoose.model('products',ProductSchema)