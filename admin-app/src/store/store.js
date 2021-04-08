import {applyMiddleware, createStore} from 'redux'
import RootReducer from '../reducers/reducer'
import thunk from 'redux-thunk'

const Store=createStore(RootReducer,applyMiddleware(thunk))

export default Store