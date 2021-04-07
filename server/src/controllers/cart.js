const Cart = require("../models/cart")

exports.addItemToCart=(req,res)=>{

    Cart.findOne({user:req.user._id}).exec((error,cart)=>{
        if(error) if(error) return res.status(400).json({error})
        if(cart){
            
            const productId=req.body.cartItems.productId
            const exisitingProduct=cart.cartItems.find(c=> c.productId==productId)

            let condition,action,cartMessage

            if(exisitingProduct){
                condition = {user:req.user._id, "cartItems.productId": productId}
                action={
                    "$set":{
                        "cartItems.$":{
                            ...req.body.cartItems,
                            quantity: exisitingProduct.quantity + req.body.cartItems.quantity}
                    }
                }
                cartMessage = 'cart and product already exists, updated the product quantity'             
            }else{
                condition={user:req.user._id}
                action={
                    "$push":{
                        "cartItems":req.body.cartItems
                    }
                }
                cartMessage='cart already exists, added the new product'
            }

            Cart.findOneAndUpdate(condition,action).exec((error,_cart)=>{
                if(error) return res.status(400).json({error})
                if(_cart) return res.status(200).json({message:cartMessage,cart:_cart})
            })
            
            
        }
        else{
            const cart=new Cart({
                user:req.user._id,
                cartItems:[req.body.cartItems]
            })
        
            cart.save((error,cart)=>{
                if(error) return res.status(400).json({error})
                if(cart){
                    return res.status(200).json({
                        message:'Added new Cart',
                        cart})
                }
            })
        }
    })


    
}   