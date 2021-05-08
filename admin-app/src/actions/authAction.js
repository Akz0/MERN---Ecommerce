import axiosInstance from "../helpers/axios"
import { authConstant } from "./constants"

export const login=(user)=>{
    //remove this after testing
    console.log(user)
    return async (dispatch)=>{

        dispatch({
            type:authConstant.LOGIN_REQUEST,
            payload:{
                ...user
            },
        })

        const res=await axiosInstance.post('./admin/signin',{
            ...user
        })

        if(res.status===200){
            const {token,user} = res.data
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))
            dispatch({
                type:authConstant.LOGIN_SUCCESS,
                payload:{
                    token,user
                }    
            })
        }else{
            if(res.status===400){
                dispatch({
                    type:authConstant.LOGIN_FAILURE,
                    payload:{
                        error:res.data.error
                    }
                })
            }
        }
        
    }
    
}


export const isUserLoggedIn=()=>{
    return async dispatch=>{
        const token=localStorage.getItem('token')
        if(token){
            const user=JSON.parse(localStorage.getItem('user'))
            dispatch({
                type:authConstant.LOGIN_SUCCESS,
                payload:{
                    token,user
                }
            })
        }else{
            dispatch({
                type:authConstant.LOGIN_FAILURE,
                payload:{
                    error:'Log In Required'
                }
            })
        }
    }
}

export const LogOut=()=>{
    return async dispatch =>{

        dispatch({type:authConstant.LOGOUT_REQUEST})
        const res = await axiosInstance.post('./admin/signout')

        if(res.status===200){
            localStorage.clear()
            dispatch({
                type:authConstant.LOGOUT_SUCCESS
            })
        }
        else{
            dispatch({
                type:authConstant.LOGOUT_FAILURE,
                payload:{error:res.data.error}
            })
        }
        
    }
}