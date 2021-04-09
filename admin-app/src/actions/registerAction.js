import axiosInstance from "../helpers/axios"
import {registrationConstant } from "./constants"

export const signup=(user)=>{
    //remove this after testing

    return async (dispatch)=>{

        dispatch({
            type:registrationConstant.REGISTER_REQUEST,
            payload:{
                ...user
            },
        })

        const res=await axiosInstance.post('./admin/signup',{
            ...user
        })

        if(res.status===201){
            const {message} = res.data
            dispatch({
                type:registrationConstant.REGISTER_SUCCESS,
                payload:{
                    message
                }    
            })
        }else{
            if(res.status===400){
                dispatch({
                    type:registrationConstant.REGISTER_FAILURE,
                    payload:{
                        error:res.data.error
                    }
                })
            }
        }
        
    }
    
}
