const express=require('express')
const { addItemToCart} = require('../controllers/cart')
const { requireSignin, validateUser } = require('../validators/userAdminAuth')

const CartRoutes=express.Router()
CartRoutes.post('/user/cart/add',requireSignin,validateUser,addItemToCart)
//CartRoutes.get('/user/cart/getcart',)

module.exports=CartRoutes