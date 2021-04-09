import { registrationConstant } from "../actions/constants";

const initState={
    error:null,
    message:'',
    loading:false
}

const registerReducer=(state=initState,action) =>{
    
    // eslint-disable-next-line default-case
    switch(action.type){
        case registrationConstant.REGISTER_REQUEST:
            state={
                ...state,
                loading:true,
            }
            break;
        case registrationConstant.REGISTER_SUCCESS:
            state={
                ...state,
                loading:false,
                message:action.payload.message
            }
            break;
        case registrationConstant.REGISTER_FAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
    }
    console.log(action)
    return state

} 

export default registerReducer