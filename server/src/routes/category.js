const express=require('express')
const multer=require('multer')
const path=require('path')
const shortid=require('shortid')
const { CreateCategory, fetchCategory, EditCategories, DeleteCategories } = require('../controllers/category')
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


const CategoryRoutes=express.Router()
CategoryRoutes.post('/category/create',requireSignin,validateAdmin,uploads.single('categoryImage'),CreateCategory)
CategoryRoutes.post('/category/edit',requireSignin,validateAdmin,uploads.single('categoryImage'),EditCategories)
CategoryRoutes.post('/category/delete',requireSignin,validateAdmin,uploads.single('categoryImage'),DeleteCategories)
CategoryRoutes.get('/category/getcategory',fetchCategory)

module.exports=CategoryRoutes