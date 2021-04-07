const express = require('express')
const env=require('dotenv')
const bodyParser=require('body-parser')
const { urlencoded } = require('body-parser')
const mongoose=require('mongoose')
const path=require('path')

// routes
const authUserRoutes = require('./routes/authUser')
const { AdminRoutes } = require('./routes/admin/authAdmin')
const CategoryRoutes = require('./routes/category')
const ProductRoutes = require('./routes/product')
const CartRoutes = require('./routes/cart')

env.config()
const app=express()
app.use(bodyParser());

//connect to the database hosted on mongodb cloud - atlas
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ecommersitemern.md89i.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('Database Connected')
})

app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use('/api',authUserRoutes)
app.use('/api',AdminRoutes)
app.use('/api',CategoryRoutes)
app.use('/api',ProductRoutes)
app.use('/api',CartRoutes)

app.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'hello ,server is running'
    })
})

app.post('/data',(req,res,next)=>{
    res.status(200).json({
        message:req.body
    })
})

app.listen(process.env.PORT,(req,res)=>{
    console.log('Server : ', process.env.PORT)
})