import axiosInstance from "../helpers/axios";
import { categoryConstant } from "./constants";

export const getAllCategory=()=>{
    return async dispatch=>{
        dispatch({
            type:categoryConstant.GET_ALL_CATEGORIES_REQUEST
        })
        const res= await axiosInstance.get('category/getcategory');
        if(res.status===200){
            const {category}=res.data
            console.log(res)
            dispatch({
                type:categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
                payload:{
                    categories:category
                }
            })
        }
        else{
            dispatch({
                type:categoryConstant.GET_ALL_CATEGORIES_FAILURE,
                payload:{
                    error:res.data.error
                }
            })
        }

    }
}
