import { combineReducers } from "redux"
import authReducer from "./authReducer"
import registerReducer from "./registerReducer"

const RootReducer=combineReducers({
    auth:authReducer,
    register:registerReducer
})


export default RootReducer
