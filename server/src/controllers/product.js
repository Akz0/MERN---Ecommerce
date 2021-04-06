const slugify  = require("slugify");
const shortid=require('shortid')
const Product = require("../models/product");

exports.CreateProduct=(req,res)=>{
    
    
    const {name,price,description,quantity,category}=req.body
    
    let productPictures=[]

    if(req.files.length >0){
        productPictures=req.files.map(file=>{
            return {
                img:file.filename
            }
        })
    }
    const product =new Product({
        name,
        slug:slugify(name),
        price,quantity,description,productPictures,category,createdBy:req.user._id
    })

    product.save((error,product)=>{
        if(error) return res.status(200).json({error})
        if(product){
            res.status(200).json({product})
        }
    })
}