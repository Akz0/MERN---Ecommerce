const Category=require('../models/category')
const slugify=require('slugify')

function createCategoriesList(categories,parentID=null){
    let newList=[]
    let category
    if(parentID == null){
        category=categories.filter(cat=>cat.parentID==undefined)
    }else{
        category=categories.filter(cat=>cat.parentID==parentID)
    }
    for(let cat of category){
        newList.push({
            _id:cat._id,
            name:cat.name,
            slug:cat.slug,
            parentId:cat.parentID,
            children:createCategoriesList(categories,cat._id)
        })
    }

    return newList
}

exports.CreateCategory=(req,res)=>{

    let categoryObj={
        name:req.body.name,
        slug:slugify(req.body.name)
    }

    if(req.file){
        categoryObj.img=  process.env.API +'/public/' + req.file.filename
    }

    if(req.body.parentId){
        
        categoryObj.parentID=req.body.parentId;
        
    }
    const newCategory =  new Category(categoryObj)
    newCategory.save((error,category)=>{
        if(error) return res.status(400).json({error})
        if(category)  {
            
            return res.status(200).json({
                message:'Category added Backend',
                category:category
            })
        }
    })
}

exports.fetchCategory=(req,res)=>{
    Category.find({}).exec((error,categories)=>{
        
        if(error) return res.status(400).json({error})
        if(categories) 
        {   
            const categoryList =  createCategoriesList(categories)
            return res.status(200).json({
            category:categoryList
        })
    }
        
    })
}

 