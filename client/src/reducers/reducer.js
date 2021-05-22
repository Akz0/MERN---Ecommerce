import { combineReducers } from "redux"
import categoryReducer from "./categoryReducer"
import ProductsReducer from "./productsReducer"


const RootReducer=combineReducers({
    category:categoryReducer,
    products:ProductsReducer
})


export default RootReducer
