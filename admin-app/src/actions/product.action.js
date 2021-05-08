import axiosInstance from "../helpers/axios"

export const CreateNewProduct=(form)=>{
    return async dispatch=>{
        const res =  await axiosInstance.post('product/create',form)
        console.log(res)
    }
}