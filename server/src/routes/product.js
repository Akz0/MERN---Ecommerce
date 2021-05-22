const express=require('express')
const multer=require('multer')
const shortid=require('shortid')
const path=require('path')

const { CreateCategory, fetchCategory } = require('../controllers/category')
const { CreateProduct, getProductsBySlug } = require('../controllers/product')
const { validateAdmin, requireSignin } = require('../validators/userAdminAuth')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+ '-' + file.originalname)
    }
})
   
let uploads = multer({ storage: storage })

const ProductRoutes=express.Router()
ProductRoutes.post('/product/create',requireSignin,validateAdmin,uploads.array('productPicture'),CreateProduct)
ProductRoutes.get('/product/:slug',getProductsBySlug)

module.exports=ProductRoutes