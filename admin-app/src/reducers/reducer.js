import { combineReducers } from "redux"
import authReducer from "./authReducer"
import categoryReducer from "./categoryReducer"
import ProductReducer from "./productReducer"
import registerReducer from "./registerReducer"

const RootReducer=combineReducers({
    auth:authReducer,
    register:registerReducer,
    product:ProductReducer,
    // order:,
    category:categoryReducer,
})


export default RootReducer
