import axios from 'axios'
import { LogOut } from '../actions'
import Store from '../store/store'
import { api } from '../urlConfig'

const token = localStorage.getItem('token')

const axiosInstance=axios.create({
    baseURL: api,
    headers:{
        'Authorization': token ? `Bearer ${token}`:''
    }
})

axiosInstance.interceptors.request.use((request)=>{
    const {auth}=Store.getState()
    if(auth.token){
        request.headers.Authorization=`Bearer ${token}`
    }
    return request
})
axiosInstance.interceptors.response.use((response)=>{
    return response
},error=>{
    console.log(error.response)
    const {status}=error.response
    if(status===500){
        Store.dispatch(LogOut())
    }
    return Promise.reject(error)
})
export default axiosInstance