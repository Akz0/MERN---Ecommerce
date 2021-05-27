
const pageSchema = require("../../models/pageSchema")

exports.CreatePage=(req,res)=>{
    const {banners,products}=req.files
    if(banners && banners.length>0){
        req.body.banners=banners.map((banner,index)=>{
            return  ({
                img:`${process.env.API}/public/${banner.filename}`,
                navigateTo:`/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
            })
        })
    }

    if(products && products.lenth>0){
        req.body.products=products.map((banner,index)=>{
            return  ({
                img:`${process.env.API}/public/${products.filename}`,
                navigateTo:`/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
            })
        })
    }

    req.body.createdBy=req.user._id
    const page=new pageSchema(req.body)
    page.save((error,page)=>{
        if(error) return res.status(400).json({error})
        if(page){
            return res.status(200).json({page})
        }
    })
}