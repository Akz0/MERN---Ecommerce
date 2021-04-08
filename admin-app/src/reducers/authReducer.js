
import { authConstant } from '../actions/constants'

const initState={
    token:null,
    user:{
        firstName:'',
        lastName:'',
        email:'',
        picture:'',
        role:'',
    },
    authenticate:false,
    authenticating:false
}

const authReducer=(state=initState,action) =>{
    
    // eslint-disable-next-line default-case
    switch(action.type){
        case authConstant.LOGIN_REQUEST:
            state={
                ...state,
                authenticating:true,
            }
            break;
        case authConstant.LOGIN_SUCCESS:
            state={
                ...state,
                user:action.payload.user,
                token:action.payload.token,
                authenticate:true,
                authenticating:false,
            }
            break;
    }
    console.log(action)
    return state

} 

export default authReducer
