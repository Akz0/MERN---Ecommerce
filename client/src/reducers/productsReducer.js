import { productsContants } from "../actions/constants"

const initState={
    
}
const ProductsReducer=(state=initState,aciton)=>{
    switch(aciton.type){
        case productsContants.GET_PRODUCTS_BY_SLUG_SUCCESS:
            state={
                ...state,
                products:aciton.payload.products
            }
    }
    return state
}
export default ProductsReducer