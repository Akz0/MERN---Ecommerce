const mongoose=require('mongoose')
const PageSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    banners:[
        {
            img:{
                type:String,
                href:String
            },
            navigateTo:{type:String}
        }
    ],
    products:[
        {
            img:{type:String},
            navigateTo:{type:String}
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
    }
},{timestamps:true})

module.exports= mongoose.model('PageSchema',PageSchema)