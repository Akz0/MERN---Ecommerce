const Category=require('../../models/category')
const Product=require('../../models/product')


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


exports.initialData=async (req,res)=>{
    const categories= await Category.find({}).exec()
    const products= await Product.find({}).select('_id name slug price quantity category productPictures description').exec()

    res.status(200).json({
        categories:createCategoriesList(categories)
        ,products})
}