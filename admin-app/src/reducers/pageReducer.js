import { pageConstants } from "../actions/constants"

const initState={
    error:null,
    loading:false,
    pages:[]
}

const PageReducer=(state=initState,action)=>{
    switch(action.type){
        case pageConstants.ADD_NEW_PAGE_REQUEST:
            state={
                ...state,
                loading:true
            }
        case pageConstants.ADD_NEW_PAGE_SUCCESS:
            state={
                ...state,
                pages:action.payload.pages,
                loading:false
            }
        case pageConstants.ADD_NEW_PAGE_FAILURE:
            state={
                ...state,
                error:action.payload.error,
                loading:false
            }
    }
    return state
}

export default PageReducer