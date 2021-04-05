const express=require('express')
const { CreateCategory, fetchCategory } = require('../controllers/category')
const { validateAdmin, requireSignin } = require('../validators/userAdminAuth')

const CategoryRoutes=express.Router()
CategoryRoutes.post('/category/create',requireSignin,validateAdmin,CreateCategory)
CategoryRoutes.get('/category/getcategory',fetchCategory)

module.exports=CategoryRoutes