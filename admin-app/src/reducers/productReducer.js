import { productsContants } from "../actions/constants";

const initialState={
    products:[]
}
const ProductReducer = (state=initialState,action) => {
    // eslint-disable-next-line default-case
    switch(action.type){
        case productsContants.GET_ALL_PRODUCTS_SUCCESS:
            state={
                ...state,
                products:action.payload.products
            }
            break
        case productsContants.GET_ALL_PRODUCTS_FAILURE:
            state={
                ...initialState,
            }
            break
        case productsContants.GET_ALL_PRODUCTS_REQUEST:
            state={
                ...initialState,
            }
            break
    }
    return state
}

export default ProductReducer