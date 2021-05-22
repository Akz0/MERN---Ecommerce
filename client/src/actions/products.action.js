import axiosInstance from "../helpers/axios"
import { productsContants } from "./constants"

export const getProductsBySlug=(slug)=>{
    return async dispatch=>{
        const res= await axiosInstance.get('/product/'+slug)
        if(res.status===200){
            dispatch({
                type:productsContants.GET_PRODUCTS_BY_SLUG_SUCCESS,
                payload:{
                    products:res.data
                }
            })
            console.log(res)
        }
        else{
            // dispatch({
            //     type:productsContants.GET_PRODUCTS_BY_SLUG_FAILURE,
            // })
        }
    }
}