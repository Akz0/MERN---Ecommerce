const slugify  = require("slugify");
const shortid=require('shortid')
const Product = require("../models/product");
const Category = require("../models/category");

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

exports.getProductsBySlug=(req,res)=>{
    const {slug}=req.params
    Category.findOne({slug:slug}).select('_id name').exec((error,category)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(category){
            Product.find({category:category._id}).exec((error,products)=>{
                if(error){
                    return res.status(400).json({error})
                }
                if(products.length>0){   
                    res.status(200).json({
                    products
                    })
                }
            })
        }
    })
}