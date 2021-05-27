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

export const createNewCategory=(form)=>{
    return async dispatch=>{
        dispatch({
            type:categoryConstant.ADD_NEW_CATEGORY_REQUEST
        })
        try{
            const res= await axiosInstance.post('category/create',form)
        
            if(res.status===200){
                console.log('Add New Category Response Ok,',res)
                dispatch({
                    type:categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
                    payload:{
                        category:res.data.category
                    }
                })
                return true
            }
            else{
                dispatch({
                    type:categoryConstant.ADD_NEW_CATEGORY_FAILURE,
                    payload:res.data.error
                })
                return false
            }
        }catch(error){
            console.log(error)
        }
        
    }
}


export const EditCategory=(form)=>{
    return async dispatch=>{
        dispatch({type:categoryConstant.EDIT_CATEGORIES_REQUEST})
        const res= await axiosInstance.post('category/edit',form)
        if(res.status===201){
            dispatch({
                type:categoryConstant.EDIT_CATEGORIES_SUCCESS
            })
            dispatch(getAllCategory())   
        }
        else{
            const {error}=res.data
            dispatch({
                type:categoryConstant.EDIT_CATEGORIES_FAILURE,
                payload:{error:error}
            })
            
        }
    }
}

export const DeleteCategory=(ids)=>{
    return async dispatch=>{
        dispatch({type:categoryConstant.DELETE_CATEGORIES_REQUEST})
        const res= await axiosInstance.post('category/delete',{
            payload:{
                ids
            }
        })
        if(res.status===200){
            dispatch({type:categoryConstant.DELETE_CATEGORIES_SUCCESS})
            dispatch(getAllCategory())
        }else{
            const {error}=res.data
            dispatch({
                type:categoryConstant.DELETE_CATEGORIES_FAILURE,
                payload:{error:error}
            
            })
        }
    }
}



