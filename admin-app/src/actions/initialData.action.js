import axiosInstance from "../helpers/axios"
import { categoryConstant, initialDataConstant,productsContants } from "./constants"

export const getInitialData=()=>{
    return async dispatch =>{
        dispatch({type: initialDataConstant.GET_ALL_INITIALDATA_SUCCESS})
        const res = await axiosInstance.get('/initialData')
        if(res.status===200){
            const {categories,products}=res.data;
            dispatch({
                type:categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
                payload:{
                    categories
                }
            })
            dispatch({
                type:productsContants.GET_ALL_PRODUCTS_SUCCESS,
                payload:{
                    products
                }
            })
        }
        console.log(res)
    }
}