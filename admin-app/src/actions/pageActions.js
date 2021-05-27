import axiosInstance from "../helpers/axios"
import { pageConstants } from "./constants"

export const CreateNewPage =(form)=>{
    return async dispatch  =>{
        dispatch({type:pageConstants.ADD_NEW_PAGE_REQUEST})
        try{
            const res = await axiosInstance.post('/page/create',form)
            if(res.status===200){
                dispatch({
                    type:pageConstants.ADD_NEW_PAGE_SUCCESS,
                    payload:{
                        pages:res.data.page
                    }
                })
            }
            else{
                dispatch({
                    type:pageConstants.ADD_NEW_PAGE_FAILURE,
                    payload:{
                        error:res.data.error
                    }
                })
            }
        }catch(error){
            console.log(error)
        }
    }
} 