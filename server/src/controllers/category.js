const Category=require('../models/category')
const slugify=require('slugify')
const shortID=require('shortid')

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
        slug:`${slugify(req.body.name)}-${shortID.generate()}`
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
exports.EditCategories=async(req,res)=>{

    const {_id,name,parentId,type}=req.body
    const updatedCategories=[]
    if(name instanceof Array){
        
        for(let i=0;i<name.length;i++){
            const category={
                name:name[i],
                slug:`${slugify(name[i])}-${shortID.generate()}`
            }
            if(type[i]){
                category.type=type[i]
            }
            if(parentId[i]!==""){
                category.parentID=parentId[i]
            }

            const updatedCategory= await Category.findOneAndUpdate({_id:_id[i]},category,{new:true})
            updatedCategories.push(updatedCategory)
        }
        return res.status(201).json({updatedCategories:req.body})
    }else{
        const category={
            name,type
        }
        if(parentId!==""){
            category.parentID=parentId
        }
        const updatedCategory= await Category.findOneAndUpdate({_id:_id},category,{new:true})
        updatedCategories.push(updatedCategory)
        return res.status(201).json({updatedCategories:req.body})
    }
}

exports.DeleteCategories=async (req,res)=>{
    const {ids}=req.body.payload
    const deletedCategories=[]
    for(let  i=0;i<ids.length;i++){
        const deletedCategory=await Category.findOneAndDelete({_id:ids[i]._id})
        deletedCategories.push(deletedCategory)
    }
    if(deletedCategories.length===ids.length){
        res.status(201).json({
            deletedCategories:deletedCategories,
            message:'Deletion Successfull'
        })
    }
    else{
        res.status(400).json({
            message:'Deletion unsuccessfull'
        })
    }
    
}
 